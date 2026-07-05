/**
 * HMAC-signed session tokens for the PIN gate.
 *
 * Token format: "<expiresAtMs>.<hexSignature>" where the signature is
 * HMAC-SHA256 over "acis-session.<expiresAtMs>" with the server secret.
 * A hand-set cookie value cannot pass verification, and tokens expire.
 *
 * Uses only Web Crypto so it runs in both the Node runtime (API route)
 * and the edge runtime (middleware) without runtime directives, which
 * have crashed Netlify edge functions before.
 */

const TOKEN_PREFIX = "acis-session";

function getSecret(): string {
  const secret = process.env.AUTH_SECRET || process.env.SITE_PIN;
  if (!secret) {
    throw new Error("Neither AUTH_SECRET nor SITE_PIN is configured");
  }
  return secret.trim();
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array | null {
  if (hex.length % 2 !== 0 || /[^0-9a-f]/i.test(hex)) return null;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

export async function createSessionToken(maxAgeSeconds: number): Promise<string> {
  const expiresAt = Date.now() + maxAgeSeconds * 1000;
  const key = await importHmacKey(getSecret());
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${TOKEN_PREFIX}.${expiresAt}`)
  );
  return `${expiresAt}.${toHex(signature)}`;
}

export async function verifySessionToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;
  const dotIndex = token.indexOf(".");
  if (dotIndex <= 0) return false;
  const expiresAtRaw = token.slice(0, dotIndex);
  const signatureHex = token.slice(dotIndex + 1);

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  const signature = fromHex(signatureHex);
  if (!signature) return false;

  let key: CryptoKey;
  try {
    key = await importHmacKey(getSecret());
  } catch {
    return false;
  }
  return crypto.subtle.verify(
    "HMAC",
    key,
    signature as unknown as ArrayBuffer,
    new TextEncoder().encode(`${TOKEN_PREFIX}.${expiresAtRaw}`)
  );
}

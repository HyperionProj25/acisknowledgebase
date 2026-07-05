import next from "eslint-config-next";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...next,
  ...nextTypescript,
  {
    ignores: [".next/**", "node_modules/**", "public/**", "scripts/**"],
  },
];

export default eslintConfig;

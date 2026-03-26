import contentData from '../../docs/content.json';

export interface Leader {
  name: string;
  title: string;
}

export interface Meta {
  company: string;
  product: string;
  product_short: string;
  entity_type: string;
  version: string;
  date: string;
  leadership: {
    ceo: Leader;
    coo: Leader;
    chairman: Leader;
  };
}

export interface Layer {
  name: string;
  description: string;
  status: string;
}

export interface KeyStat {
  value: string;
  label: string;
}

export interface Overview {
  headline: string;
  subheadline: string;
  positioning: string;
  layers: Layer[];
  key_stats: KeyStat[];
  problem: {
    headline: string;
    cost: string;
    gap: string;
    annual_spend: string;
  };
}

export interface DataFlowNode {
  id: string;
  label: string;
  detail_label: string;
  volume?: string;
  years?: string;
  description: string;
  icon: string;
}

export interface RLTriad {
  concept: string;
  definition: string;
  acis_mapping: string;
}

export interface RLExplainer {
  comparison: string;
  analogy: string;
  triad: RLTriad[];
  ppo: string;
  episodes: string;
  timesteps: string;
}

export interface Threshold {
  min?: number;
  max?: number;
  color: string;
  label: string;
}

export interface StateVectorFeature {
  index: number;
  code_name: string;
  display_name: string;
  icon: string;
  short_description: string;
  long_description: string;
  why_it_matters: string;
  example: string;
  thresholds: { normal: Threshold; elevated: Threshold; high: Threshold } | null;
  category: string;
  limitation_note?: string;
}

export interface OutcomeLabel {
  code_name: string;
  display_name: string;
  type: string;
  description: string;
}

export interface RewardValue {
  id: string;
  situation: string;
  reward: number;
  slider_min: number;
  slider_max: number;
  slider_step: number;
  category: string;
  rationale: string;
  color: string;
}

export interface Preset {
  label: string;
  description: string;
  values: Record<string, number>;
}

export interface RewardFunction {
  values: RewardValue[];
  presets: Record<string, Preset>;
  tuning_history: string;
  key_insight: string;
}

export interface TrainingAnnotation {
  step: number;
  label: string;
}

export interface Training {
  timesteps: number;
  algorithm: string;
  library: string;
  training_split: string;
  test_split: string;
  reward_curve: {
    start: number;
    plateau: number;
    oscillation_range: number[];
    inflection_point_steps: number;
    annotations: TrainingAnnotation[];
  };
  explanation: string;
  why_500k: string;
}

export interface ValidationCriterion {
  id: string;
  name: string;
  description: string;
  result: string;
  percentage_change?: number;
  early_value?: number;
  late_value?: number;
  pre_injury_rate?: number;
  healthy_rate?: number;
  differential_percent?: number;
  count?: number;
  examples?: string[];
  passed: boolean;
  explanation: string;
}

export interface Baseline {
  name: string;
  score: number;
}

export interface Validation {
  criteria: ValidationCriterion[];
  baselines: Baseline[];
}

export interface Limitation {
  title: string;
  description: string;
  severity: string;
  icon: string;
}

export interface RoadmapItem {
  milestone: string;
  description: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export interface WalkthroughPitcher {
  name: string;
  team: string;
  opponent: string;
  date: string;
  season_velo: number;
  season_spin: number;
  era: number;
  game_score: { home: number; away: number };
  inning_start: number;
}

export interface AtBatSnapshot {
  at_bat: number;
  inning: number;
  velo_drop: number;
  spin_drop: number;
  pitch_count: number;
  acwr: number;
  score_diff: number;
}

export interface WalkthroughRecommendation {
  at_bat: number;
  inning: number;
  action: string;
  trigger_features: string[];
  explanation: string;
}

export interface WalkthroughOutcome {
  days_later: number;
  il_reason: string;
  il_duration: string;
}

export interface Walkthrough {
  pitcher: WalkthroughPitcher;
  at_bat_progression: AtBatSnapshot[];
  recommendation: WalkthroughRecommendation;
  outcome: WalkthroughOutcome;
  scene_titles: string[];
}

export interface Content {
  meta: Meta;
  overview: Overview;
  data_flow: { nodes: DataFlowNode[] };
  rl_explainer: RLExplainer;
  state_vector: StateVectorFeature[];
  outcome_labels: OutcomeLabel[];
  reward_function: RewardFunction;
  training: Training;
  validation: Validation;
  limitations: Limitation[];
  roadmap: RoadmapItem[];
  glossary: GlossaryTerm[];
  walkthrough: Walkthrough;
}

const content: Content = contentData as Content;

export default content;

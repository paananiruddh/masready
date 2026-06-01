import { readFileSync } from "fs";
import { resolve } from "path";

export interface FeatureEntry {
  id: string;
  label: string;
  publicLabel: string;
  enabledInDemo: boolean;
  routes: string[];
  expectedPublicCopy: string[];
  forbiddenPublicCopy: string[];
}

export function loadFeatureManifest(): FeatureEntry[] {
  const filePath = resolve(__dirname, "../../fixtures/feature-manifest.json");
  return JSON.parse(readFileSync(filePath, "utf-8")) as FeatureEntry[];
}

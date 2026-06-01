import { readFileSync } from "fs";
import { resolve } from "path";

export interface PublicPage {
  path: string;
  name: string;
  required: boolean;
}

export function loadPageManifest(): PublicPage[] {
  const filePath = resolve(__dirname, "../../fixtures/public-pages.json");
  return JSON.parse(readFileSync(filePath, "utf-8")) as PublicPage[];
}

export function requiredPages(): PublicPage[] {
  return loadPageManifest().filter((p) => p.required);
}

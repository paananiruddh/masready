import { readFileSync } from "fs";
import { resolve } from "path";

export interface ForbiddenTerm {
  term: string;
  allowedPaths: string[];
  reason: string;
}

export function loadForbiddenTerms(): ForbiddenTerm[] {
  const filePath = resolve(__dirname, "../../fixtures/forbidden-public-terms.json");
  return JSON.parse(readFileSync(filePath, "utf-8")) as ForbiddenTerm[];
}

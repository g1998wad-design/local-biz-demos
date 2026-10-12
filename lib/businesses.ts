import fs from "fs";
import path from "path";

export type Business = {
  slug: string;
  business_id: string;
  name: string;
  category: string;
  tagline: string;
  about: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  services: string[];
  accentColor: string;
  hadExistingWebsite: boolean;
  existingWebsiteUrl: string;
};

const DATA_DIR = path.join(process.cwd(), "data", "businesses");

export function getAllBusinessSlugs(): string[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function getBusiness(slug: string): Business | null {
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Business;
}

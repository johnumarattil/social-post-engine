import { loadBrandConfig } from "@social-post-engine/shared";

export function getLogo(): string {
  return loadBrandConfig().brand.logoDataUri;
}

export function getBrandName(): string {
  return loadBrandConfig().brand.name;
}

export function getBrandWebsite(): string {
  return loadBrandConfig().brand.website;
}

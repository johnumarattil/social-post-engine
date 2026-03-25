// brand.config.example.ts — Copy to brand.config.ts and customize for your brand.
// This file ships with WahResume values as a working demo.

import type { BrandConfig } from "@social-post-engine/shared";

const LOGO_SVG = `<svg width="384" height="384" viewBox="0 0 384 384" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<path d="M61.6031 137.92C59.2677 127.4 59.6263 116.461 62.6456 106.117C65.6649 95.7731 71.247 86.3588 78.8746 78.7473C86.5021 71.1357 95.928 65.5732 106.278 62.5756C116.629 59.578 127.568 59.2424 138.083 61.5997C143.87 52.5485 151.843 45.0999 161.266 39.9403C170.689 34.7807 181.26 32.0763 192.003 32.0763C202.746 32.0763 213.317 34.7807 222.74 39.9403C232.163 45.0999 240.136 52.5485 245.923 61.5997C256.454 59.2321 267.412 59.5663 277.779 62.5711C288.146 65.576 297.584 71.154 305.217 78.7862C312.849 86.4184 318.427 95.8569 321.432 106.224C324.437 116.591 324.771 127.549 322.403 138.08C331.454 143.867 338.903 151.84 344.062 161.263C349.222 170.686 351.926 181.256 351.926 192C351.926 202.743 349.222 213.313 344.062 222.737C338.903 232.16 331.454 240.132 322.403 245.92C324.76 256.434 324.425 267.374 321.427 277.724C318.43 288.075 312.867 297.501 305.256 305.128C297.644 312.756 288.23 318.338 277.886 321.357C267.542 324.376 256.603 324.735 246.083 322.4C240.303 331.486 232.324 338.966 222.885 344.149C213.446 349.331 202.851 352.049 192.083 352.049C181.315 352.049 170.72 349.331 161.281 344.149C151.842 338.966 143.863 331.486 138.083 322.4C127.568 324.757 116.629 324.421 106.278 321.424C95.928 318.426 86.5021 312.864 78.8746 305.252C71.247 297.641 65.6649 288.226 62.6456 277.882C59.6263 267.538 59.2677 256.599 61.6031 246.08C52.4824 240.308 44.9697 232.322 39.7639 222.867C34.558 213.412 31.8281 202.793 31.8281 192C31.8281 181.206 34.558 170.588 39.7639 161.132C44.9697 151.677 52.4824 143.692 61.6031 137.92Z" fill="#262626" stroke="white" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M144 192L176 224L240 160" stroke="#5EE9B5" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs><clipPath id="clip0"><rect width="384" height="384" fill="white"/></clipPath></defs>
</svg>`;

export const config: BrandConfig = {
  brand: {
    name: "WahResume",
    website: "wahresume.com",
    logoDataUri: `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString("base64")}`,
  },
  linkedin: {
    showcaseId: "106692113",
  },
  captions: {
    brandHashtag: "#WahResume",
    categoryHashtags: {
      "job-search": ["#JobSearch", "#CareerTips"],
      "resume-writing": ["#Resume", "#ResumeTips"],
      "interview-prep": ["#InterviewTips", "#CareerTips"],
      "career-growth": ["#CareerGrowth", "#Career"],
      "cover-letter": ["#CoverLetter", "#CareerTips"],
    },
    maxHashtags: 3,
  },
  autopublish: {
    linkedin: {
      queueMin: 10,
      seedBatch: 90,
    },
    instagram: {
      queueMin: 10,
      seedBatch: 120,
    },
  },
};

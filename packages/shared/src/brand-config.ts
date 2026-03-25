export interface BrandConfig {
  brand: {
    /** Display name shown on generated images */
    name: string;
    /** Website URL shown in image footers */
    website: string;
    /** Logo as a data URI (SVG or PNG base64) */
    logoDataUri: string;
  };
  linkedin: {
    /** LinkedIn showcase/company page ID for autopublish */
    showcaseId: string;
  };
  captions: {
    /** Primary brand hashtag (e.g. "#YourBrand") */
    brandHashtag: string;
    /** Category-specific hashtag pools */
    categoryHashtags: Record<string, string[]>;
    /** Maximum hashtags per post */
    maxHashtags: number;
  };
  autopublish: {
    linkedin: {
      /** Minimum pending posts before seeding triggers */
      queueMin: number;
      /** Number of posts to seed in one batch */
      seedBatch: number;
    };
    instagram: {
      /** Minimum pending posts before seeding triggers */
      queueMin: number;
      /** Number of posts to seed in one batch */
      seedBatch: number;
    };
  };
}

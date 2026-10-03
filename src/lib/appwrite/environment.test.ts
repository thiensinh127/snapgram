import { describe, expect, it } from "vitest";
import { readAppwriteConfig } from "./environment";

describe("readAppwriteConfig", () => {
  it("names missing Appwrite variables in its error", () => {
    expect(() => readAppwriteConfig({})).toThrow(
      "Missing Appwrite environment variables: VITE_APPWRITE_URL"
    );
  });

  it("returns a complete configuration", () => {
    const config = readAppwriteConfig({
      VITE_APPWRITE_URL: "https://cloud.appwrite.io/v1",
      VITE_APPWRITE_PROJECT_ID: "project",
      VITE_APPWRITE_DATABASE_ID: "database",
      VITE_APPWRITE_STORAGE_ID: "storage",
      VITE_APPWRITE_USER_COLLECTION_ID: "users",
      VITE_APPWRITE_POST_COLLECTION_ID: "posts",
      VITE_APPWRITE_SAVES_COLLECTION_ID: "saves",
      VITE_APPWRITE_BUCKET_ID: "bucket",
    });

    expect(config.url).toBe("https://cloud.appwrite.io/v1");
    expect(config.bucketId).toBe("bucket");
  });
});

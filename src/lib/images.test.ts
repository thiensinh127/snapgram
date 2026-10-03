import { describe, expect, it } from "vitest";
import { getPostImageUrl } from "./images";

describe("getPostImageUrl", () => {
  it("adds requested dimensions to an Appwrite image URL", () => {
    expect(
      getPostImageUrl("https://cloud.example/v1/storage/buckets/posts/files/a/view", 720)
    ).toContain("width=720");
  });

  it("preserves existing query parameters", () => {
    expect(getPostImageUrl("https://cloud.example/image?project=snapgram", 720)).toBe(
      "https://cloud.example/image?project=snapgram&width=720"
    );
  });
});

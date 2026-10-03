import { describe, expect, it } from "vitest";
import { replacePostInDocuments } from "./postCache";

describe("replacePostInDocuments", () => {
  it("replaces only the matching cached post", () => {
    const result = replacePostInDocuments(
      [
        { $id: "first", caption: "unchanged" },
        { $id: "second", caption: "old" },
      ],
      { $id: "second", caption: "new" }
    );

    expect(result).toEqual([
      { $id: "first", caption: "unchanged" },
      { $id: "second", caption: "new" },
    ]);
  });
});

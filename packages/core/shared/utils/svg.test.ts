import { describe, it, expect, vi } from "vitest";

import { encodeSvgToBase64, encodeSvgToUri, toSvgDataUrl } from "./svg";

describe("svg utils", () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>';

  beforeEach(() => {
    // btoa is not available in node by default in some environments, but vitest usually has it.
    // If not, we stub it.
    if (typeof btoa === "undefined") {
      vi.stubGlobal("btoa", (str: string) => Buffer.from(str, "binary").toString("base64"));
    }
  });

  describe("encodeSvgToBase64", () => {
    it("should return a base64 encoded data URL", () => {
      const result = encodeSvgToBase64(svg);
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);

      const b64Part = result.split(",")[1];
      const decoded = Buffer.from(b64Part, "base64").toString();
      expect(decoded).toContain("<svg");
    });
  });

  describe("encodeSvgToUri", () => {
    it("should return a URI encoded data URL", () => {
      const result = encodeSvgToUri(svg);
      expect(result).toMatch(/^data:image\/svg\+xml,/);
      expect(result).toContain("%22"); // double quotes encoded
    });
  });

  describe("toSvgDataUrl", () => {
    it("should use URI encoding by default", () => {
      expect(toSvgDataUrl(svg)).toBe(encodeSvgToUri(svg));
    });

    it("should use base64 encoding if requested", () => {
      expect(toSvgDataUrl(svg, true)).toBe(encodeSvgToBase64(svg));
    });
  });
});

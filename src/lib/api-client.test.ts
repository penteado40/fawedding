import { describe, it, expect } from "vitest";
import { rsvpsPath } from "./api-client";

describe("rsvpsPath", () => {
  it("returns the base RSVP path scoped to the configured wedding", () => {
    expect(rsvpsPath()).toBe("/weddings/1/rsvps");
  });

  it("appends the given suffix to the scoped path", () => {
    expect(rsvpsPath("/42/resend-email")).toBe("/weddings/1/rsvps/42/resend-email");
  });
});

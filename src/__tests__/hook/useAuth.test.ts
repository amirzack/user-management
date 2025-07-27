import { describe, it } from "node:test";

describe("useAuth", () => {
  it("should login successfully", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.login({
        email: "test@test.com",
        password: "password",
      });
    });

    expect(result.current.isAuthenticated).toBe(true);
  });
});

import type { ReactElement } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfirmedGuestsList } from "./ConfirmedGuestsList";
import { makeAuthClient } from "@/lib/api-client";

vi.mock("@/lib/api-client", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api-client")>("@/lib/api-client");
  return {
    ...actual,
    makeAuthClient: vi.fn(),
  };
});

function renderWithClient(ui: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe("ConfirmedGuestsList", () => {
  const getMock = vi.fn();
  const postMock = vi.fn();

  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
    vi.mocked(makeAuthClient).mockReturnValue({
      get: getMock,
      post: postMock,
      put: vi.fn(),
      delete: vi.fn(),
    });
  });

  it("fetches confirmed guests from the wedding-scoped path", async () => {
    getMock.mockResolvedValue({ data: [] });

    renderWithClient(<ConfirmedGuestsList token="tok" />);

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith("/weddings/1/rsvps");
    });
  });

  it("shows a resend button for a guest whose email failed, and triggers resend on click", async () => {
    getMock.mockResolvedValue({
      data: [
        {
          id: 42,
          name: "Maria",
          email: "maria@example.com",
          phone: "11999999999",
          emailStatus: "FAILED",
          emailSentAt: null,
          emailError: "SMTP timeout",
        },
      ],
    });
    postMock.mockResolvedValue({});

    renderWithClient(<ConfirmedGuestsList token="tok" />);

    const resendButton = await screen.findByRole("button", { name: /reenviar/i });
    fireEvent.click(resendButton);

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith("/weddings/1/rsvps/42/resend-email", {});
    });
  });

  it("does not show a resend button for a guest whose email was sent", async () => {
    getMock.mockResolvedValue({
      data: [
        {
          id: 7,
          name: "João",
          email: "joao@example.com",
          phone: "11988888888",
          emailStatus: "SENT",
          emailSentAt: "2026-01-01T00:00:00Z",
          emailError: null,
        },
      ],
    });

    renderWithClient(<ConfirmedGuestsList token="tok" />);

    await screen.findByText("João");
    expect(screen.queryByRole("button", { name: /reenviar/i })).not.toBeInTheDocument();
  });
});

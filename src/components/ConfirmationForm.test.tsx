import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ConfirmationForm } from "./ConfirmationForm";
import { apiClient } from "@/lib/api-client";

vi.mock("@/lib/api-client", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api-client")>("@/lib/api-client");
  return {
    ...actual,
    apiClient: { post: vi.fn() },
  };
});

describe("ConfirmationForm", () => {
  beforeEach(() => {
    vi.mocked(apiClient.post).mockReset();
  });

  it("submits the RSVP to the wedding-scoped path with the form payload", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({});
    render(<ConfirmationForm />);

    fireEvent.change(screen.getByLabelText(/nome completo/i), {
      target: { value: "Maria" },
    });
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: "maria@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/telefone/i), {
      target: { value: "11999999999" },
    });

    fireEvent.click(screen.getByRole("button", { name: /confirmar presença/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith("/weddings/1/rsvps", {
        name: "Maria",
        email: "maria@example.com",
        phone: "11999999999",
      });
    });
  });

  it("shows an error message without crashing when the submission fails", async () => {
    vi.mocked(apiClient.post).mockRejectedValue(new Error("network error"));
    render(<ConfirmationForm />);

    fireEvent.change(screen.getByLabelText(/nome completo/i), {
      target: { value: "Maria" },
    });
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: "maria@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/telefone/i), {
      target: { value: "11999999999" },
    });

    fireEvent.click(screen.getByRole("button", { name: /confirmar presença/i }));

    expect(
      await screen.findByText(/não foi possível confirmar sua presença/i)
    ).toBeInTheDocument();
  });
});

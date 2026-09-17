import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MotionGlobalConfig } from "framer-motion";
import { I18nProvider } from "@/i18n";
import QuoteWizard from "@/components/QuoteWizard";
import { nl } from "@/locales/nl";

MotionGlobalConfig.skipAnimations = true;

const s = nl.quote.steps;
const renderWizard = () =>
  render(
    <I18nProvider defaultLocale="nl">
      <MemoryRouter>
        <QuoteWizard />
      </MemoryRouter>
    </I18nProvider>,
  );

describe("QuoteWizard", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: true })));
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("walks through all six steps, posts the lead and shows the WhatsApp thank-you", async () => {
    renderWizard();

    expect(screen.getByText(s.work.q)).toBeInTheDocument();
    fireEvent.click(screen.getByText(s.work.options[0].l));

    await screen.findByText(s.property.q);
    fireEvent.click(screen.getByText(s.property.options[0].l));

    await screen.findByText(s.scope.q);
    fireEvent.click(screen.getByText(s.scope.options[0].l));
    fireEvent.click(screen.getByText(s.scope.options[1].l));
    fireEvent.click(screen.getByRole("button", { name: nl.quote.next }));

    await screen.findByText(s.timing.q);
    fireEvent.click(screen.getByText(s.timing.options[0].l));

    await screen.findByText(s.location.q);
    fireEvent.change(screen.getByLabelText(s.location.postcode), { target: { value: "1068 wr" } });
    fireEvent.change(screen.getByLabelText(s.location.city), { target: { value: "Amsterdam" } });
    fireEvent.click(screen.getByRole("button", { name: nl.quote.next }));

    await screen.findByText(s.contact.q);
    fireEvent.change(screen.getByLabelText(s.contact.name), { target: { value: "Jan de Vries" } });
    fireEvent.change(screen.getByLabelText(s.contact.phone), { target: { value: "612345678" } });
    expect((screen.getByLabelText(s.contact.phone) as HTMLInputElement).value).toBe("+31 6 1234 5678");
    fireEvent.click(screen.getByRole("button", { name: nl.quote.submit }));

    await screen.findByText(nl.quote.thanks.title.replace("{name}", "Jan"));

    const wa = screen.getByRole("link", { name: new RegExp(nl.quote.thanks.waBtn) }) as HTMLAnchorElement;
    expect(wa.href).toContain("tintim.link/whatsapp");
    expect(decodeURIComponent(wa.href)).toContain("Binnenschilderwerk");

    expect(fetch).toHaveBeenCalledTimes(1);
    const [, init] = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string);
    expect(body).toMatchObject({
      name: "Jan de Vries",
      phone: "+31 6 1234 5678",
      service: "Binnenschilderwerk",
      property: "Appartement",
      scope: "Muren & plafonds, Kozijnen & deuren",
      timing: "Zo snel mogelijk",
      postcode: "1068 WR",
      city: "Amsterdam",
      source: "offerte-wizard",
    });
  });

  it("blocks progress on empty required fields and rejects an invalid phone number", async () => {
    renderWizard();
    fireEvent.click(screen.getByText(s.work.options[1].l));
    await screen.findByText(s.property.q);
    fireEvent.click(screen.getByText(s.property.options[1].l));
    await screen.findByText(s.scope.q);

    fireEvent.click(screen.getByRole("button", { name: nl.quote.next }));
    expect(screen.getByRole("alert")).toHaveTextContent(nl.quote.required);
    expect(screen.getByText(s.scope.q)).toBeInTheDocument();

    fireEvent.click(screen.getByText(s.scope.options[2].l));
    fireEvent.click(screen.getByRole("button", { name: nl.quote.next }));
    await screen.findByText(s.timing.q);
    fireEvent.click(screen.getByText(s.timing.options[1].l));
    await screen.findByText(s.location.q);
    fireEvent.change(screen.getByLabelText(s.location.postcode), { target: { value: "1012 AB" } });
    fireEvent.change(screen.getByLabelText(s.location.city), { target: { value: "Amsterdam" } });
    fireEvent.click(screen.getByRole("button", { name: nl.quote.next }));
    await screen.findByText(s.contact.q);

    fireEvent.change(screen.getByLabelText(s.contact.name), { target: { value: "Piet" } });
    fireEvent.change(screen.getByLabelText(s.contact.phone), { target: { value: "+31 6 12" } });
    fireEvent.click(screen.getByRole("button", { name: nl.quote.submit }));
    expect(screen.getByRole("alert")).toHaveTextContent(nl.quote.phoneInvalid);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("lets the user go back to a previous step without losing answers", async () => {
    renderWizard();
    fireEvent.click(screen.getByText(s.work.options[3].l));
    await screen.findByText(s.property.q);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(nl.quote.back) }));
    await screen.findByText(s.work.q);
    expect(screen.getByText(s.work.options[3].l).closest("button")).toHaveAttribute("aria-pressed", "true");
  });
});

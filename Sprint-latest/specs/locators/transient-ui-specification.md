# Transient UI & Resilience Specification

## 1. Identified Transient Hazards

| Item ID | Target Page / Flow | Hazard Type | Frequency | Detection Locator | Safe Handling Strategy |
|---|---|---|---|---|---|
| TR-001 | App Shell / Global | Push Notifications (OneSignal) | Intermittent | `**/*onesignal*` | Abort network route in `hooks.ts` at context initialization: `await context.route('**/*onesignal*', r => r.abort())` |
| TR-002 | Post-Login / Dashboard | "Welcome aboard!" Onboarding Modal | Intermittent / First-run | `div.ui.modal, button:has-text("Dismiss"), button.close, i.close.icon` | Conditional non-blocking check: `if (await isVisible({ timeout: 2000 })) click()` |
| TR-003 | All Routes | Native JavaScript Dialogs | Unexpected | `page.on('dialog')` | Auto-dismiss event listener registered on page creation: `page.on('dialog', d => d.dismiss().catch(() => {}))` |
| TR-004 | Deals / Invoices Table | Async Hydration / Spinner | Dynamic | `div.ui.active.loader, div.spinner` | Playwright auto-waiting for target element visibility (`waitFor({ state: 'visible' })`) without arbitrary sleep |

## 2. Recommended Helper Methods for Automation

```typescript
/**
 * Dismisses transient onboarding modals, cookie banners, or setup overlays
 * using non-blocking conditional if logic.
 */
export async function dismissTransientOverlays(page: Page): Promise<void> {
  const dismissLocators = [
    page.locator('div.ui.modal button:has-text("Dismiss")'),
    page.locator('div.ui.modal i.close.icon'),
    page.locator('button.close-modal'),
    page.locator('div.actions button.ui.button:has-text("Cancel")')
  ];

  for (const locator of dismissLocators) {
    if (await locator.isVisible({ timeout: 1500 }).catch(() => false)) {
      await locator.click({ force: true }).catch(() => {});
    }
  }
}
```

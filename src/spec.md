# Specification

## Summary
**Goal:** Store inquiry/booking form submissions in the backend and provide a private office/admin URL to securely view all received inquiries.

**Planned changes:**
- Persist inquiry form submissions in the Motoko backend canister state (including name, email, event type, preferred date, message, and created timestamp).
- Keep the existing successful-submit UI behavior after a backend-persisted submission.
- Add a separate office/admin route (e.g., `#/office`) that lists all inquiries in a table/list with key fields and a clear “Office Inquiries” heading.
- Do not add any visible navigation/link in the client-facing UI that reveals the office/admin page.
- Require Internet Identity login to access the office/admin page, and enforce backend authorization so only allowed identities can list inquiries.
- Show clear UI messaging for login required and access denied cases (English).
- Display, on the office/admin page, the two URLs (client website and office inquiries) derived from the current origin (not hard-coded).

**User-visible outcome:** Clients can submit inquiries on the public site as before, while office staff can visit a separate private URL, log in with Internet Identity, and view all inquiries stored in the backend (including across devices/browsers).

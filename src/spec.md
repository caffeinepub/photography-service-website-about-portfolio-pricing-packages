# Specification

## Summary
**Goal:** Update the site-wide brand name, remove the public “My Inquiries” experience, and make the inquiry form submit reliably without local inquiry persistence.

**Planned changes:**
- Replace all user-facing occurrences of “The Stories By Vows” (including case variants) with “The Stories Behind VOWS” across navigation, footer, About section, and any other UI text.
- Remove the “My Inquiries” / “Received Inquiries” public UX: delete the NavBar link, remove the post-submit “View Sent Inquiries” button, and disable or reroute the `#/received-inquiries` route to a normal public page or a simple not-found fallback.
- Prevent inquiry submission while the backend actor is loading/unavailable (e.g., disable submit) to avoid the “Failed to submit inquiry. Please try again.” error under normal operation, and ensure successful submission shows the existing success state.
- Clear any previously stored inquiries from localStorage (key: `sent-inquiries`) and stop saving new inquiries to localStorage.

**User-visible outcome:** The site consistently shows the updated brand name, users no longer see or can navigate to “My Inquiries/Received Inquiries,” and booking/inquiry submissions succeed reliably without showing the prior failure message or storing inquiries locally.

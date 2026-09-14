// Every absolute URL the site publishes — canonical tags, Open Graph, structured
// data, robots.txt and the sitemap — is built from this one value. The domain used
// to be typed out in 29 places across 9 files; a single one left stale tells search
// engines the page belongs to a different site, so there is now only one to change.
export const SITE_URL = 'https://baggagechecker.com';

// The address the legal pages tell people to write to. A privacy policy has to name a
// working contact, so this must be a mailbox that is actually read.
export const CONTACT_EMAIL = 'privacy@baggagechecker.com';

// Shown as the "last updated" date on the legal pages. Bump it whenever their wording
// changes, not on every deploy — the date is a claim about the text, not the build.
export const LEGAL_UPDATED = 'September 2026';

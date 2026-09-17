// Public endpoint only. Never place a Resend API key in browser code.
// Point this to a server-side endpoint (e.g. Cloudflare Worker / Vercel Function)
// that validates the payload and calls Resend securely.
window.FLYPIG_SITE_CONFIG = {
  managedServiceEndpoint: ""
};
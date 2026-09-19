export default {
  async scheduled(_event, env) {
    for (const endpoint of [env.PRODUCTION_ENDPOINT, env.PREVIEW_ENDPOINT]) {
      const response = await fetch(endpoint, { method: 'POST', headers: { Authorization: `Bearer ${env.CONTACT_RECOVERY_TOKEN}` } });
      if (!response.ok) throw new Error(`Contact recovery returned HTTP ${response.status}`);
    }
  },
  fetch() { return new Response('Not found', { status: 404 }); },
};

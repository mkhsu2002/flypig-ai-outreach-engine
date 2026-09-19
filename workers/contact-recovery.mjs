export default {
  async scheduled(_event, env) {
    const failures = [];
    for (const endpoint of [env.PRODUCTION_ENDPOINT, env.PREVIEW_ENDPOINT]) {
      try {
        const response = await fetch(endpoint, { method: 'POST', signal: AbortSignal.timeout(30000), headers: {
          Authorization: `Bearer ${env.CONTACT_RECOVERY_TOKEN}`, 'User-Agent': 'FlyPig-Contact-Recovery/1.0',
        } });
        if (!response.ok) failures.push(`HTTP ${response.status}`);
      } catch { failures.push('network_error'); }
    }
    if (failures.length) throw new Error(`Contact recovery failed: ${failures.join(', ')}`);
  },
  fetch() { return new Response('Not found', { status: 404 }); },
};

import { recover } from '../../server/contact.mjs';

export const onRequest = ({ request, env }) => recover(request, env);

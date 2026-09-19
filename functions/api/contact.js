import { submit } from '../../server/contact.mjs';

export const onRequestPost = ({ request, env }) => submit(request, env);

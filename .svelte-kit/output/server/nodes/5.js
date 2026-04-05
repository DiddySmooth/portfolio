import * as server from '../entries/pages/blog/_slug_/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/[slug]/+page.server.js";
export const imports = ["_app/immutable/nodes/5.dhgtPbho.js","_app/immutable/chunks/B_8hqEmp.js","_app/immutable/chunks/DwYFcQ4T.js","_app/immutable/chunks/C7HZ6YVH.js"];
export const stylesheets = [];
export const fonts = [];

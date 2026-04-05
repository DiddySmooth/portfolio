import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.1_dwFkXa.js","_app/immutable/chunks/B_8hqEmp.js","_app/immutable/chunks/DwYFcQ4T.js","_app/immutable/chunks/C7HZ6YVH.js"];
export const stylesheets = [];
export const fonts = [];

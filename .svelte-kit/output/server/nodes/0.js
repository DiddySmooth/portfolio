import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.U3NbvFyC.js","_app/immutable/chunks/B_8hqEmp.js","_app/immutable/chunks/DwYFcQ4T.js","_app/immutable/chunks/DXIJif5j.js","_app/immutable/chunks/Bz7WM8Gi.js"];
export const stylesheets = ["_app/immutable/assets/0.C94JAEjI.css"];
export const fonts = [];

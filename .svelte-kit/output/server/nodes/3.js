

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BwrW6-Ok.js","_app/immutable/chunks/B_8hqEmp.js","_app/immutable/chunks/DwYFcQ4T.js","_app/immutable/chunks/C7HZ6YVH.js"];
export const stylesheets = [];
export const fonts = [];

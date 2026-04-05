export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["profile.jpg"]),
	mimeTypes: {".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.DlX144NM.js",app:"_app/immutable/entry/app.Ch5BvTRR.js",imports:["_app/immutable/entry/start.DlX144NM.js","_app/immutable/chunks/Bz7WM8Gi.js","_app/immutable/chunks/B_8hqEmp.js","_app/immutable/entry/app.Ch5BvTRR.js","_app/immutable/chunks/B_8hqEmp.js","_app/immutable/chunks/DwYFcQ4T.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/about","/blog","/blog/__data.json","/contact","/blog/building-this-portfolio","/blog/building-this-portfolio/__data.json","/blog/plex-request-form","/blog/plex-request-form/__data.json","/blog/migrating-react-to-angular","/blog/migrating-react-to-angular/__data.json","/blog/aspnet-apis-azure-pipelines","/blog/aspnet-apis-azure-pipelines/__data.json"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

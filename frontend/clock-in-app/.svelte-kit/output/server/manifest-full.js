export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.DOJFRyWm.js","app":"_app/immutable/entry/app.Cvb2Ebrr.js","imports":["_app/immutable/entry/start.DOJFRyWm.js","_app/immutable/chunks/entry.Bzv_ecEr.js","_app/immutable/chunks/runtime.DsElAt5n.js","_app/immutable/chunks/index-client.ovL9DGOz.js","_app/immutable/entry/app.Cvb2Ebrr.js","_app/immutable/chunks/runtime.DsElAt5n.js","_app/immutable/chunks/render.BBjidX4z.js","_app/immutable/chunks/disclose-version.BNdWgO9i.js","_app/immutable/chunks/props.CqkPnZL0.js","_app/immutable/chunks/index-client.ovL9DGOz.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["cartas.json","cartas_antes_corregir.json","cartas_fluir_es_pt.json","cartas_ludopoiesis_naturaleza_fluir_viejo.json","cartas_naturaleza_es_pt2.json","img/F01.png","img/F01_pt.png","img/F02.png","img/F02_pt.png","img/F03.png","img/F03_pt.png","img/F04.png","img/F04_pt.png","img/F05.png","img/F05_pt.png","img/F06.png","img/F06_pt.png","img/F07.png","img/F07_pt.png","img/F08.png","img/F08_pt.png","img/F09.png","img/F09_pt.png","img/F10.png","img/F10_pt.png","img/F11.png","img/F11_pt.png","img/F12.png","img/F12_pt.png","img/F13.png","img/F13_pt.png","img/F14.png","img/F14_pt.png","img/F15.png","img/F15_pt.png","img/F16.png","img/F16_pt.png","img/F17.png","img/F17_pt.png","img/F18.png","img/F18_pt.png","img/F19.png","img/F19_pt.png","img/F20.png","img/F20_pt.png","img/F21.png","img/F21_pt.png","img/F22.png","img/F22_pt.png","img/F23.png","img/F23_pt.png","img/F24.png","img/F24_pt.png","img/F25.png","img/F25_pt.png","img/F26.png","img/F26_pt.png","img/F27.png","img/F27_pt.png","img/F28.png","img/F28_pt.png","img/F29.png","img/F29_pt.png","img/F30.png","img/F30_pt.png","img/F31.png","img/F31_pt.png","img/F32.png","img/F32_pt.png","img/F33.png","img/F33_pt.png","img/F34.png","img/F34_pt.png","img/F35.png","img/F35_pt.png","img/F36.png","img/F36_pt.png","img/F37.png","img/F37_pt.png","img/F38.png","img/F38_pt.png","img/F39.png","img/F39_pt.png","img/F40.png","img/F40_pt.png","img/F41.png","img/F41_pt.png","img/F42.png","img/F42_pt.png","img/F43.png","img/F43_pt.png","img/F44.png","img/F44_pt.png","img/F45.png","img/F45_pt.png","img/F46.png","img/F46_pt.png","img/F47.png","img/F47_pt.png","img/F48.png","img/F48_pt.png","img/F49.png","img/F49_pt.png","img/F50.png","img/F50_pt.png","img/F51.png","img/F51_pt.png","img/F52.png","img/F52_pt.png","img/F53.png","img/F53_pt.png","img/F54.png","img/F54_pt.png","img/F55.png","img/F55_pt.png","img/F56.png","img/F56_pt.png","img/F57.png","img/F57_pt.png","img/F58.png","img/F58_pt.png","img/F59.png","img/F59_pt.png","img/F60.png","img/F60_pt.png","img/F61.png","img/F61_pt.png","img/F62.png","img/F62_pt.png","img/F63.png","img/F63_pt.png","img/F64.png","img/F64_pt.png","img/F65.png","img/F65_pt.png","img/F66.png","img/F66_pt.png","img/F67.png","img/F67_pt.png","img/F68.png","img/F68_pt.png","img/F69.png","img/F69_pt.png","img/N01.png","img/N01_pt.png","img/N02.png","img/N02_pt.png","img/N03.png","img/N03_pt.png","img/N04.png","img/N04_pt.png","img/N05.png","img/N05_pt.png","img/N06.png","img/N06_pt.png","img/N07.png","img/N07_pt.png","img/N08.png","img/N08_pt.png","img/N09.png","img/N09_pt.png","img/N10.png","img/N10_pt.png","img/N11.png","img/N11_pt.png","img/N12.png","img/N12_pt.png","img/N13.png","img/N13_pt.png","img/N14.png","img/N14_pt.png","img/N15.png","img/N15_pt.png","img/N16.png","img/N16_pt.png","img/N17.png","img/N17_pt.png","img/N18.png","img/N18_pt.png","img/N19.png","img/N19_pt.png","img/N20.png","img/N20_pt.png","img/N21.png","img/N21_pt.png","img/N22.png","img/N22_pt.png","img/N23.png","img/N23_pt.png","img/N24.png","img/N24_pt.png","img/N25.png","img/N25_pt.png","img/N26.png","img/N26_pt.png","img/N27.png","img/N27_pt.png","img/N28.png","img/N28_pt.png","img/N29.png","img/N29_pt.png","img/N30.png","img/N30_pt.png","img/N31.png","img/N31_pt.png","img/N32.png","img/N32_pt.png","img/N33.png","img/N33_pt.png","img/N34.png","img/N34_pt.png","img/N35.png","img/N35_pt.png","img/N36.png","img/N36_pt.png","img/N37.png","img/N37_pt.png","img/N38.png","img/N38_pt.png","img/N39.png","img/N39_pt.png","img/N40.png","img/N40_pt.png","img/N41.png","img/N41_pt.png","img/N42.png","img/N42_pt.png","img/N43.png","img/N43_pt.png","img/N44.png","img/N44_pt.png","img/N45.png","img/N45_pt.png","img/N46.png","img/N46_pt.png","img/N47.png","img/N47_pt.png","img/N48.png","img/N48_pt.png","img/N49.png","img/N49_pt.png","img/N50.png","img/N50_pt.png","img/N51.png","img/N51_pt.png","img/N52.png","img/N52_pt.png","img/N53.png","img/N53_pt.png","img/N54.png","img/N54_pt.png","img/N55.png","img/N55_pt.png","img/N56.png","img/N56_pt.png","img/N57.png","img/N57_pt.png","img/N58.png","img/N58_pt.png","img/N59.png","img/N59_pt.png","img/N60.png","img/N60_pt.png","img/N61.png","img/N61_pt.png","img/N62.png","img/N62_pt.png","img/N63.png","img/N63_pt.png","img/N64.png","img/N64_pt.png","img/N65.png","img/N65_pt.png","img/N66.png","img/N66_pt.png","img/N67.png","img/N67_pt.png","img/N68.png","img/N68_pt.png","img/N69.png","img/N69_pt.png","img/README.md","img/T01.png","img/T01_pt.png","img/T02.png","img/T02_pt.png","img/T03.png","img/T03_pt.png","img/T04.png","img/T04_pt.png","img/T05.png","img/T05_pt.png","img/T06.png","img/T06_pt.png","img/T07.png","img/T07_pt.png","img/T08.png","img/T08_pt.png","img/T09.png","img/T09_pt.png","img/T10.png","img/T10_pt.png","img/T11.png","img/T11_pt.png","img/T12.png","img/T12_pt.png","img/T13.png","img/T13_pt.png","img/T14.png","img/T14_pt.png","img/T15.png","img/T15_pt.png","img/T16.png","img/T16_pt.png","img/T17.png","img/T17_pt.png","img/T18.png","img/T18_pt.png","img/T19.png","img/T19_pt.png","img/T20.png","img/T20_pt.png","img/T21.png","img/T21_pt.png","img/T22.png","img/T22_pt.png","img/T23.png","img/T23_pt.png","img/T24.png","img/T24_pt.png","img/T25.png","img/T25_pt.png","img/T26.png","img/T26_pt.png","img/T27.png","img/T27_pt.png","img/T28.png","img/T28_pt.png","img/T29.png","img/T29_pt.png","img/T30.png","img/T30_pt.png","img/T31.png","img/T31_pt.png","img/T32.png","img/T32_pt.png","img/T33.png","img/T33_pt.png","img/T34.png","img/T34_pt.png","img/T35.png","img/T35_pt.png","img/T36.png","img/T36_pt.png","img/T37.png","img/T37_pt.png","img/T38.png","img/T38_pt.png","img/T39.png","img/T39_pt.png","img/T40.png","img/T40_pt.png","img/T41.png","img/T41_pt.png","img/T42.png","img/T42_pt.png","img/T43.png","img/T43_pt.png","img/T44.png","img/T44_pt.png","img/T45.png","img/T45_pt.png","img/T46.png","img/T46_pt.png","img/T47.png","img/T47_pt.png","img/T48.png","img/T48_pt.png","img/T49.png","img/T49_pt.png","img/T50.png","img/T50_pt.png","img/T51.png","img/T51_pt.png","img/T52.png","img/T52_pt.png","img/T53.png","img/T53_pt.png","img/T54.png","img/T54_pt.png","img/T55.png","img/T55_pt.png","img/T56.png","img/T56_pt.png","img/T57.png","img/T57_pt.png","img/T58.png","img/T58_pt.png","img/T59.png","img/T59_pt.png","img/T60.png","img/T60_pt.png","img/T61.png","img/T61_pt.png","img/T62.png","img/T62_pt.png","img/T63.png","img/T63_pt.png","img/T64.png","img/T64_pt.png","img/T65.png","img/T65_pt.png","img/T66.png","img/T66_pt.png","img/T67.png","img/T67_pt.png","img/T68.png","img/T68_pt.png","img/T69.png","img/T69_pt.png","img/iconos/README.md","img/iconos/fluir_icono.png","img/iconos/fluir_icono_apagado.png","img/iconos/icono_fluir.png","img/iconos/icono_fluir_apagado.png","img/iconos/icono_naturaleza.png","img/iconos/icono_naturaleza_apagado.png","img/iconos/icono_tecnologia.png","img/iconos/icono_tecnologia_apagado.png","img/iconos/icono_tecnologia_apagado_mala.png","img/iconos/icono_tecnologia_mala.png","img/iconos/naturaleza_icono.png","img/iconos/naturaleza_icono_apagado.png","img/readme","jsconfig.json","manifest.json","package.json","service-worker.js","textos.json"]),
	mimeTypes: {".json":"application/json",".png":"image/png",".md":"text/markdown",".js":"text/javascript"},
	_: {
		client: {start:"_app/immutable/entry/start.D0_piZ6M.js",app:"_app/immutable/entry/app.BTXALhWo.js",imports:["_app/immutable/entry/start.D0_piZ6M.js","_app/immutable/chunks/C0vsHj4G.js","_app/immutable/chunks/DuSW7asp.js","_app/immutable/chunks/VBFvlmmS.js","_app/immutable/entry/app.BTXALhWo.js","_app/immutable/chunks/DuSW7asp.js","_app/immutable/chunks/BiHBEveS.js","_app/immutable/chunks/b3-Pe2so.js","_app/immutable/chunks/DXT5HSOw.js","_app/immutable/chunks/VBFvlmmS.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/three-card",
				pattern: /^\/three-card\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

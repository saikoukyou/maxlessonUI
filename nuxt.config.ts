// https://v3.nuxtjs.org/api/configuration/nuxt.config
// import PayPal from './plugins/paypal.js'
// import { defineNuxtConfig } from 'nuxt';
// import type { DefineNuxtConfig } from 'nuxt/config'
// import { defineNuxtConfig } from 'nuxt3' // 对于 Nuxt 3，通常是这样导入

// @ts-ignore
export default defineNuxtConfig ({
 //@ts-ignore
	app: {
					head: {
									titleTemplate: "%s - BizCHINA | ビズチャイナ",
									title: "オンライン中国語のビズチャイナ【100円で7日間体験】",
									charset: "utf-8",
									htmlAttrs: {
													lang: "ja",
									},
									meta: [
													{ name: "keywords", content: "BizCHINA,ビズチャイナ,中国語,オンライン中国語,中国語研修,中国語レッスン" },
													{
																	name: "description",
																	content: "オンライン中国語教室で、WeChat、Teamsや独自のWeb教室を使って受講できます。約300名の講師が在籍。朝6時から深夜1時まで。ネット利用に特化した無料教材。1レッスン333円から受講可能。",
													},
													{
																	name: "google-site-verification",
																	content: "Os4GAlGDqWBNXvgECCMGpymilOVOgGym4oEdt06mW7I",
													},
													// { 'http-equiv': "Content-Security-Policy", content: "upgrade-insecure-requests" }
									],
									link: [
													{
																	rel: "icon",
																	href: "https://www.bizchina.jp/img/favicon.ico",
													},
									],
									script: [
													{
																	src: 'https://js.pay.jp/v2/pay.js',
																	defer: true
													},
									],
					},
	},

 css: [
					"~/assets/css/main.css",
					"~/assets/css/header.css",
					"~/assets/css/reset.css",
					"~/assets/css/style.css",
					"~/assets/css/styleUI.css",
					"~/assets/css/teacher.scss",
					"~/assets/css/student.css",
	],

 // buildModules: [],
	//"nuxt-paypal",
	modules: [
					"nuxt-windicss",
					"nuxt-vue3-google-signin",
					"@nuxtjs/seo",
					// "nuxt-tiptap-editor",
					'@pinia/nuxt',
					'@pinia-plugin-persistedstate/nuxt',
					'nuxtjs-naive-ui'
					// "@nuxt/image"
	],

 // paypal: {
	// 	clientId: 'AXIJmyJWSYTs6MAG0yYJi1RvW4P9xDswqYH6N_kH57Yp0bTh3EHxbquHFdjeUwNnPUNqrjFhxLgLbc62',
	// },
	// pinia: {
	// 	autoImports: [// 自动引入 `defineStore()`
	// 		'defineStore',
	// 		// 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
	// 		// ['defineStore', 'definePiniaStore'],
	// 	],
	// 	// storesDirs: ['./stores/**']
	// },
	// piniaPersistedstate: {
	// 	// cookieOptions: {
	// 	// 	sameSite: 'strict',
	// 	// 	maxAge: 14400,
	// 	// },
	// 	storage: 'localStorage'
	// },
	piniaPersistedstate: {
					cookieOptions: {
									sameSite: 'none', // 改为 None
									secure: true, // 确保在 HTTPS 下
									maxAge: 14400,
					},
					storage: 'localStorage' // + 持久化
	},

 googleSignIn: {
					clientId: '525715698058-cotr7t6j2sp2ap1d1dou3t2av84n9amc.apps.googleusercontent.com',
	},

 build: {
					transpile:
									process.env.NODE_ENV === "production"
													? [
																					"naive-ui",
																					"vueuc",
																					"@css-render/vue3-ssr",
																					"@juggle/resize-observer",
																					"date-fns",
																					"date-fns-tz"
															]
													: ["@juggle/resize-observer"],
	},

 vite: {
					optimizeDeps: {
									include:
													process.env.NODE_ENV === "development"
																	? ["naive-ui", "vueuc"]//, "date-fns-tz/esm/formatInTimeZone"
																	: [],
					},
	},

 imports: {
					dirs: ["apis"],
	},

 // cookies: {
	// 	// ...其他配置项...
	// 	sameSite: 'None' // 设置 sameSite 属性为 None
	// },
	nitro: {
					prerender: {
									crawlLinks: false,
									failOnError: false,
					},
	  // devProxy: {
	  //   "/api": {
	  //     target: "http://localhost",
	  //     changeOrigin: true,
	  //   }
	  // }
	},

 // tiptap: {
	// 	prefix: "Tiptap", //prefix for Tiptap imports, composables not included
	// 	lowlight: {
	// 		theme: "github-dark",
	// 	},
	// },
	// plugins: [
	// 	{ src: '~/plugins/cropper', ssr: false }
	// ],
	// nuxt-auth-sanctum options (also configurable via environment variables)
	// sanctum: {
	// 	baseUrl: 'http://localhost:80', // Laravel API
	// },
	// env: {
	// 	// 指定要加载的环境文件
	// 	// 注意：这将覆盖 `.env` 文件中的同名变量
	// 	// 例如，加载 `.env.development` 文件
	// 	dotenv: {
	// 		path: '.env',
	// 		safe: true, // 设置为 true 以防止意外加载未定义的变量
	// 	},
	// },
	runtimeConfig: {
					public: {
									payjpKey: process.env.PAYJP_PUBLIC_KEY, // 客户端可访问
									agoraKey: process.env.AGORA_KEY,
					},
					private: {
									payjpSecretKey: process.env.PAYJP_SECRET_KEY, // 仅服务器端可访问
					},
	},

 compatibilityDate: "2025-07-19",
});
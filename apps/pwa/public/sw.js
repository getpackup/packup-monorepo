if (!self.define) {
  let e,
    s = {}
  const a = (a, c) => (
    (a = new URL(a + '.js', c).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = a), (e.onload = s), document.head.appendChild(e)
        } else (e = a), importScripts(a), s()
      }).then(() => {
        let e = s[a]
        if (!e) throw new Error(`Module ${a} didn’t register its module`)
        return e
      })
  )
  self.define = (c, i) => {
    const n = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (s[n]) return
    let t = {}
    const r = (e) => a(e, n),
      d = { module: { uri: n }, exports: t, require: r }
    s[n] = Promise.all(c.map((e) => d[e] || r(e))).then((e) => (i(...e), t))
  }
}
define(['./workbox-6a1bf588'], function (e) {
  'use strict'
  importScripts('fallback-12Ym2N2fZxnSmTavz42ar.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/12Ym2N2fZxnSmTavz42ar/_buildManifest.js',
          revision: '2b541a02f11fe1cc54f1650a28f36601',
        },
        {
          url: '/_next/static/12Ym2N2fZxnSmTavz42ar/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/799.d9f2cb7bb9f24c37.js', revision: 'd9f2cb7bb9f24c37' },
        {
          url: '/_next/static/chunks/799.d9f2cb7bb9f24c37.js.map',
          revision: 'caeb858bee691f8e8f514dfcb671fbbd',
        },
        {
          url: '/_next/static/chunks/ajs-destination.9d9b3c57d60e22c8.js',
          revision: '9d9b3c57d60e22c8',
        },
        {
          url: '/_next/static/chunks/ajs-destination.9d9b3c57d60e22c8.js.map',
          revision: '96ad2c214d061140c8c0e1fabacae8be',
        },
        {
          url: '/_next/static/chunks/auto-track.cd20eb71f1de7ac8.js',
          revision: 'cd20eb71f1de7ac8',
        },
        {
          url: '/_next/static/chunks/auto-track.cd20eb71f1de7ac8.js.map',
          revision: '733c382a5a8f1073af09e2d03ce8fc2b',
        },
        { url: '/_next/static/chunks/framework-e5adfaff77b3e6e9.js', revision: 'e5adfaff77b3e6e9' },
        {
          url: '/_next/static/chunks/framework-e5adfaff77b3e6e9.js.map',
          revision: '267b321924413e5ed4c92d044faf55c5',
        },
        {
          url: '/_next/static/chunks/legacyVideos.b69459435e0b36df.js',
          revision: 'b69459435e0b36df',
        },
        {
          url: '/_next/static/chunks/legacyVideos.b69459435e0b36df.js.map',
          revision: '92fd4f33d6204bdda0dfd4955b0958b6',
        },
        { url: '/_next/static/chunks/main-98314c0236d61ea2.js', revision: '98314c0236d61ea2' },
        {
          url: '/_next/static/chunks/main-98314c0236d61ea2.js.map',
          revision: '40c93e50f0912bfe09c2f43c1cab9c55',
        },
        {
          url: '/_next/static/chunks/middleware.f079f5e62dcb66e2.js',
          revision: 'f079f5e62dcb66e2',
        },
        {
          url: '/_next/static/chunks/middleware.f079f5e62dcb66e2.js.map',
          revision: '160d265f14a0308d844d09512c209b3a',
        },
        { url: '/_next/static/chunks/pages/404-de90bea2fb0d1ee9.js', revision: 'de90bea2fb0d1ee9' },
        {
          url: '/_next/static/chunks/pages/404-de90bea2fb0d1ee9.js.map',
          revision: 'c24adb4317352e22b34bafe14de500c4',
        },
        {
          url: '/_next/static/chunks/pages/_error-f752e332d64a20a0.js',
          revision: 'f752e332d64a20a0',
        },
        {
          url: '/_next/static/chunks/pages/_error-f752e332d64a20a0.js.map',
          revision: '58e34c9112de905b2af36c8b33cb7875',
        },
        {
          url: '/_next/static/chunks/pages/_offline-bae7ef63d8dd2d54.js',
          revision: 'bae7ef63d8dd2d54',
        },
        {
          url: '/_next/static/chunks/pages/_offline-bae7ef63d8dd2d54.js.map',
          revision: '594c36f9597125fba94159b25c70c3ce',
        },
        {
          url: '/_next/static/chunks/pages/account-delete-b9999daf2c4117b0.js',
          revision: 'b9999daf2c4117b0',
        },
        {
          url: '/_next/static/chunks/pages/account-delete-b9999daf2c4117b0.js.map',
          revision: '92990460052fc886c8417f7e1d93f6b1',
        },
        {
          url: '/_next/static/chunks/pages/admin-2b2abd8e1b988cd0.js',
          revision: '2b2abd8e1b988cd0',
        },
        {
          url: '/_next/static/chunks/pages/admin-2b2abd8e1b988cd0.js.map',
          revision: '99f602501ffc8999af89db86debaf8b4',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list-6fc6481fe989bb4f.js',
          revision: '6fc6481fe989bb4f',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list-6fc6481fe989bb4f.js.map',
          revision: '294a725b187bdd26563ba97d52e71769',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/%5Bid%5D-3bdb05455a7c3840.js',
          revision: '3bdb05455a7c3840',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/%5Bid%5D-3bdb05455a7c3840.js.map',
          revision: '7d81fe93447713beef5062ab8e40b937',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/new-a65d4fa5799c41bf.js',
          revision: 'a65d4fa5799c41bf',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/new-a65d4fa5799c41bf.js.map',
          revision: 'c4f4af5d5930986b82213dcd74f46dc7',
        },
        {
          url: '/_next/static/chunks/pages/feedback-58448e05b16a36fb.js',
          revision: '58448e05b16a36fb',
        },
        {
          url: '/_next/static/chunks/pages/feedback-58448e05b16a36fb.js.map',
          revision: 'efbd2aeeff3dcdd6bece25a2a04de319',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-e67d64f12bc2a2f6.js',
          revision: 'e67d64f12bc2a2f6',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-e67d64f12bc2a2f6.js.map',
          revision: 'c49a45b84b696518b283a57e8dc3a2d3',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-a17fc3f03d34d4f8.js',
          revision: 'a17fc3f03d34d4f8',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-a17fc3f03d34d4f8.js.map',
          revision: '2b9692c5dffade8e8d0bb79d39885da0',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-5ccb4498a9f36ce2.js',
          revision: '5ccb4498a9f36ce2',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-5ccb4498a9f36ce2.js.map',
          revision: 'd099680fd2e4c3a01dbe43dda3967f09',
        },
        {
          url: '/_next/static/chunks/pages/index-1bbd6f4bffbbf157.js',
          revision: '1bbd6f4bffbbf157',
        },
        {
          url: '/_next/static/chunks/pages/index-1bbd6f4bffbbf157.js.map',
          revision: 'ef7c9793f034ace42241810dad4ab808',
        },
        {
          url: '/_next/static/chunks/pages/login-600b813ab9fec06c.js',
          revision: '600b813ab9fec06c',
        },
        {
          url: '/_next/static/chunks/pages/login-600b813ab9fec06c.js.map',
          revision: '0c2dc16afb8f49db44c3ed857e38e90d',
        },
        {
          url: '/_next/static/chunks/pages/login-with-password-9d201738ed28e0ed.js',
          revision: '9d201738ed28e0ed',
        },
        {
          url: '/_next/static/chunks/pages/login-with-password-9d201738ed28e0ed.js.map',
          revision: 'ff18e9ee990e1a46e6f6f63da454e5b5',
        },
        {
          url: '/_next/static/chunks/pages/logout-3f469fa2ae1ef5cf.js',
          revision: '3f469fa2ae1ef5cf',
        },
        {
          url: '/_next/static/chunks/pages/logout-3f469fa2ae1ef5cf.js.map',
          revision: '6dfc028a1ec157afdc127707f3855306',
        },
        {
          url: '/_next/static/chunks/pages/profile-930fa3171ad55a50.js',
          revision: '930fa3171ad55a50',
        },
        {
          url: '/_next/static/chunks/pages/profile-930fa3171ad55a50.js.map',
          revision: '8ddaa1702662674d966228a914f603d8',
        },
        {
          url: '/_next/static/chunks/pages/reset-password-5169b4b0671423f0.js',
          revision: '5169b4b0671423f0',
        },
        {
          url: '/_next/static/chunks/pages/reset-password-5169b4b0671423f0.js.map',
          revision: '50406982abb26e1de734c30e0f3b7362',
        },
        {
          url: '/_next/static/chunks/pages/signin-1c24852df9bddb83.js',
          revision: '1c24852df9bddb83',
        },
        {
          url: '/_next/static/chunks/pages/signin-1c24852df9bddb83.js.map',
          revision: '3d6fd8549c9a6f9bc572bac5853e3ac4',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-8f1e406e6662e169.js',
          revision: '8f1e406e6662e169',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-8f1e406e6662e169.js.map',
          revision: '2638a62ef5a02e96c22d37b44d52f338',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-b5002ba2f1e7c4b6.js',
          revision: 'b5002ba2f1e7c4b6',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-b5002ba2f1e7c4b6.js.map',
          revision: 'c1004c2702141af5b35d442e9788428e',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-9bf603b89f062164.js',
          revision: '9bf603b89f062164',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-9bf603b89f062164.js.map',
          revision: '34af30404c83b2b91946c2d4330cc5fd',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-bd1e36dc1074fabf.js',
          revision: 'bd1e36dc1074fabf',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-bd1e36dc1074fabf.js.map',
          revision: '2ec00563892acaade92454999ca4b329',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-bb4fd44fd1fb7990.js',
          revision: 'bb4fd44fd1fb7990',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-bb4fd44fd1fb7990.js.map',
          revision: '8c4f9b10ad318c3008da5bac9b45e29a',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-190955be92c37844.js',
          revision: '190955be92c37844',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-190955be92c37844.js.map',
          revision: '194c1e9788025f85e4b1fd6e9aab77fe',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-e9f0cff40ab13f58.js',
          revision: 'e9f0cff40ab13f58',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-e9f0cff40ab13f58.js.map',
          revision: '40fd0577a6de1a515a60f81e2cc5231d',
        },
        {
          url: '/_next/static/chunks/pages/user-mgmt-212610c80660d7a6.js',
          revision: '212610c80660d7a6',
        },
        {
          url: '/_next/static/chunks/pages/user-mgmt-212610c80660d7a6.js.map',
          revision: '7b9a32ba447ef2be190f3f98d499c00b',
        },
        {
          url: '/_next/static/chunks/pages/verify-email-1ee3065e23db74b5.js',
          revision: '1ee3065e23db74b5',
        },
        {
          url: '/_next/static/chunks/pages/verify-email-1ee3065e23db74b5.js.map',
          revision: '21d6590217d364c878932b41fdc06b8f',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/_next/static/chunks/queryString.6000ac9e4d9a2ea3.js',
          revision: '6000ac9e4d9a2ea3',
        },
        {
          url: '/_next/static/chunks/queryString.6000ac9e4d9a2ea3.js.map',
          revision: '925314abf65eb8ef95a0c1fd3ba3d743',
        },
        {
          url: '/_next/static/chunks/remoteMiddleware.15f568da81d5e2e0.js',
          revision: '15f568da81d5e2e0',
        },
        {
          url: '/_next/static/chunks/remoteMiddleware.15f568da81d5e2e0.js.map',
          revision: 'b0936898e930a762cffc8487c47b65ce',
        },
        {
          url: '/_next/static/chunks/schemaFilter.aa8651d3eda32f8e.js',
          revision: 'aa8651d3eda32f8e',
        },
        {
          url: '/_next/static/chunks/schemaFilter.aa8651d3eda32f8e.js.map',
          revision: '38c9ed7dd5f43d039e09d3aefd794c85',
        },
        { url: '/_next/static/chunks/webpack-e9e3c5059eae3388.js', revision: 'e9e3c5059eae3388' },
        {
          url: '/_next/static/chunks/webpack-e9e3c5059eae3388.js.map',
          revision: 'c10b526011da05e2cd202144c0c71f1f',
        },
        { url: '/_next/static/css/b6c6f79b62cb832c.css', revision: 'b6c6f79b62cb832c' },
        {
          url: '/_next/static/css/b6c6f79b62cb832c.css.map',
          revision: 'c166849bdf6c74bda8b67022709f5de5',
        },
        {
          url: '/_next/static/media/maskable_icon.8ff66286.png',
          revision: 'ed499377bf4acd3b54ed8182bb1dc84b',
        },
        { url: '/_offline', revision: '12Ym2N2fZxnSmTavz42ar' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: c }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const s = e.pathname
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    )
})
//# sourceMappingURL=sw.js.map

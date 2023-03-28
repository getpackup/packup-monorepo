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
  importScripts('fallback--X0m9-iXG0rvYgMuAnSve.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/-X0m9-iXG0rvYgMuAnSve/_buildManifest.js',
          revision: 'e1845d1e4124547aed490c431b9cb13d',
        },
        {
          url: '/_next/static/-X0m9-iXG0rvYgMuAnSve/_ssgManifest.js',
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
        { url: '/_next/static/chunks/pages/404-135e3b8a228e3ea3.js', revision: '135e3b8a228e3ea3' },
        {
          url: '/_next/static/chunks/pages/404-135e3b8a228e3ea3.js.map',
          revision: '8f37f43119c35083d3b5c29ed6487a65',
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
          url: '/_next/static/chunks/pages/_offline-338d632f35a5feaa.js',
          revision: '338d632f35a5feaa',
        },
        {
          url: '/_next/static/chunks/pages/_offline-338d632f35a5feaa.js.map',
          revision: '73f898020a59e9f906713b9d5a99af83',
        },
        {
          url: '/_next/static/chunks/pages/account-delete-4098556a26ff8a30.js',
          revision: '4098556a26ff8a30',
        },
        {
          url: '/_next/static/chunks/pages/account-delete-4098556a26ff8a30.js.map',
          revision: '500bd9634057f1b83573f87b759dc53d',
        },
        {
          url: '/_next/static/chunks/pages/admin-39c0a25f9f45e484.js',
          revision: '39c0a25f9f45e484',
        },
        {
          url: '/_next/static/chunks/pages/admin-39c0a25f9f45e484.js.map',
          revision: '0c291b4e04f2b73d91880d115a915c57',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list-16eafb6733607d9e.js',
          revision: '16eafb6733607d9e',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list-16eafb6733607d9e.js.map',
          revision: 'b74c9a28e9a18c80a262b988679cec6b',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/%5Bid%5D-648ddba21509ba46.js',
          revision: '648ddba21509ba46',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/%5Bid%5D-648ddba21509ba46.js.map',
          revision: 'e325b0624cf83397da2e7d719968c345',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/new-96a18e1f53655b53.js',
          revision: '96a18e1f53655b53',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/new-96a18e1f53655b53.js.map',
          revision: '79896e7b847943bf2c1aad72af4f002d',
        },
        {
          url: '/_next/static/chunks/pages/feedback-beb0d660086ae1cc.js',
          revision: 'beb0d660086ae1cc',
        },
        {
          url: '/_next/static/chunks/pages/feedback-beb0d660086ae1cc.js.map',
          revision: '4621bec754bc6d21762bbb53e36ab681',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-858aa6a8910de4df.js',
          revision: '858aa6a8910de4df',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-858aa6a8910de4df.js.map',
          revision: '879373e96c7cf0523c4d8624903cc66e',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-baea1ef396ceacc7.js',
          revision: 'baea1ef396ceacc7',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-baea1ef396ceacc7.js.map',
          revision: '758b473502033058a7214a595e879257',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-f1d24a0fa9c7801d.js',
          revision: 'f1d24a0fa9c7801d',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-f1d24a0fa9c7801d.js.map',
          revision: '7b61db97a22054568ab913fe9df49be9',
        },
        {
          url: '/_next/static/chunks/pages/index-2dc352f569e5b606.js',
          revision: '2dc352f569e5b606',
        },
        {
          url: '/_next/static/chunks/pages/index-2dc352f569e5b606.js.map',
          revision: '8b0afea376a2a5f394260ee689585181',
        },
        {
          url: '/_next/static/chunks/pages/login-bc6d34cbc14fa3e7.js',
          revision: 'bc6d34cbc14fa3e7',
        },
        {
          url: '/_next/static/chunks/pages/login-bc6d34cbc14fa3e7.js.map',
          revision: '8fab03f7713e99c935a83116f68c1063',
        },
        {
          url: '/_next/static/chunks/pages/login-with-password-3e50028c96385eb4.js',
          revision: '3e50028c96385eb4',
        },
        {
          url: '/_next/static/chunks/pages/login-with-password-3e50028c96385eb4.js.map',
          revision: '4d4950b2abb353b1bdc604c3677ef79c',
        },
        {
          url: '/_next/static/chunks/pages/logout-f1a456426df850b0.js',
          revision: 'f1a456426df850b0',
        },
        {
          url: '/_next/static/chunks/pages/logout-f1a456426df850b0.js.map',
          revision: '2cbbb57933cdd04a34944d10c1666588',
        },
        {
          url: '/_next/static/chunks/pages/profile-9849d5a945ab8e1c.js',
          revision: '9849d5a945ab8e1c',
        },
        {
          url: '/_next/static/chunks/pages/profile-9849d5a945ab8e1c.js.map',
          revision: '81df4060143bd3426316745e674f315c',
        },
        {
          url: '/_next/static/chunks/pages/reset-password-04cea6a2f9fd3486.js',
          revision: '04cea6a2f9fd3486',
        },
        {
          url: '/_next/static/chunks/pages/reset-password-04cea6a2f9fd3486.js.map',
          revision: '46674b134ab3aabf4a010eab39e86f32',
        },
        {
          url: '/_next/static/chunks/pages/signin-775a36acd911011b.js',
          revision: '775a36acd911011b',
        },
        {
          url: '/_next/static/chunks/pages/signin-775a36acd911011b.js.map',
          revision: '53d9a9b8e6caeed5213ef93bfea0c410',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-a08ba07667256274.js',
          revision: 'a08ba07667256274',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-a08ba07667256274.js.map',
          revision: 'd81be47f9e40b81fba14f411fedfba8a',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-1eb3ccabec869abf.js',
          revision: '1eb3ccabec869abf',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-1eb3ccabec869abf.js.map',
          revision: '34bf762a0d8f59c36fcabeb10f349aa9',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-59115391fcb247eb.js',
          revision: '59115391fcb247eb',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-59115391fcb247eb.js.map',
          revision: '7c14e4b0d0663289776098bb14e09a98',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-df3644caeff38013.js',
          revision: 'df3644caeff38013',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-df3644caeff38013.js.map',
          revision: 'f88db40bd4b7a2dfd09caf7c6a4cf2bf',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-583de96ef325bd37.js',
          revision: '583de96ef325bd37',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-583de96ef325bd37.js.map',
          revision: '39ad47c87ebc1e111878423d3f4b4480',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-3603b24b2bcc0626.js',
          revision: '3603b24b2bcc0626',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-3603b24b2bcc0626.js.map',
          revision: 'dd8cd22c45b282fbad073be891eb8cec',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-955832744b998fc1.js',
          revision: '955832744b998fc1',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-955832744b998fc1.js.map',
          revision: '1edc2912d067499283205cfbb87b6158',
        },
        {
          url: '/_next/static/chunks/pages/user-mgmt-a2fbc3f9b0f57a98.js',
          revision: 'a2fbc3f9b0f57a98',
        },
        {
          url: '/_next/static/chunks/pages/user-mgmt-a2fbc3f9b0f57a98.js.map',
          revision: '4f99c709f7601dc8d49256ee5e00382e',
        },
        {
          url: '/_next/static/chunks/pages/verify-email-1c25def39fcc79b7.js',
          revision: '1c25def39fcc79b7',
        },
        {
          url: '/_next/static/chunks/pages/verify-email-1c25def39fcc79b7.js.map',
          revision: 'd5d144962abbe3347d2086716e963a0a',
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
        { url: '/_offline', revision: '-X0m9-iXG0rvYgMuAnSve' },
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

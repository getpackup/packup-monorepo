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
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (s[t]) return
    let n = {}
    const r = (e) => a(e, t),
      d = { module: { uri: t }, exports: n, require: r }
    s[t] = Promise.all(c.map((e) => d[e] || r(e))).then((e) => (i(...e), n))
  }
}
define(['./workbox-6a1bf588'], function (e) {
  'use strict'
  importScripts('fallback-t8po91uE3YcwZQSSwUb9B.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
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
        { url: '/_next/static/chunks/pages/404-95a04f327f00e995.js', revision: '95a04f327f00e995' },
        {
          url: '/_next/static/chunks/pages/404-95a04f327f00e995.js.map',
          revision: 'a76582b4c009812b68d0507bd9c8f9a6',
        },
        {
          url: '/_next/static/chunks/pages/_error-6d2889f858fd2a29.js',
          revision: '6d2889f858fd2a29',
        },
        {
          url: '/_next/static/chunks/pages/_error-6d2889f858fd2a29.js.map',
          revision: '37ec4d20222f32b9954289664fe7e1c6',
        },
        {
          url: '/_next/static/chunks/pages/_offline-b7ddeb0823bc0789.js',
          revision: 'b7ddeb0823bc0789',
        },
        {
          url: '/_next/static/chunks/pages/_offline-b7ddeb0823bc0789.js.map',
          revision: '1768ba3f0e22c979f99cdb50b07f7028',
        },
        {
          url: '/_next/static/chunks/pages/admin-61d61928bdab8be4.js',
          revision: '61d61928bdab8be4',
        },
        {
          url: '/_next/static/chunks/pages/admin-61d61928bdab8be4.js.map',
          revision: '226762b40630abf0911774b5e480a65b',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list-eab7b94d9b5a1387.js',
          revision: 'eab7b94d9b5a1387',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list-eab7b94d9b5a1387.js.map',
          revision: '2cd236b51b21bd6a0e052133f10ff026',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/%5Bid%5D-5378942d4fbb0b2a.js',
          revision: '5378942d4fbb0b2a',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/%5Bid%5D-5378942d4fbb0b2a.js.map',
          revision: '90ba4cf52482909638461aa901a4e444',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/new-42c1216fb0efcca0.js',
          revision: '42c1216fb0efcca0',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/new-42c1216fb0efcca0.js.map',
          revision: 'd71ff53f890fd9d94c6e86becdadb8fc',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-20a7d49af9dbd27c.js',
          revision: '20a7d49af9dbd27c',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-20a7d49af9dbd27c.js.map',
          revision: 'c8c5cf133ccceef891cf1df42c2dcccf',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-9f523758831e3f9b.js',
          revision: '9f523758831e3f9b',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-9f523758831e3f9b.js.map',
          revision: '495bbb570a2b4383225fafaf8de0f86a',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-152d381483ab2a2c.js',
          revision: '152d381483ab2a2c',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-152d381483ab2a2c.js.map',
          revision: '9724dc3a02b2914cce0f4faa5b1a0dcc',
        },
        {
          url: '/_next/static/chunks/pages/index-24216f0e5a5ff17c.js',
          revision: '24216f0e5a5ff17c',
        },
        {
          url: '/_next/static/chunks/pages/index-24216f0e5a5ff17c.js.map',
          revision: '39b13bf0eab50588730a607a0fbdfe51',
        },
        {
          url: '/_next/static/chunks/pages/login-ff7f5e483f012023.js',
          revision: 'ff7f5e483f012023',
        },
        {
          url: '/_next/static/chunks/pages/login-ff7f5e483f012023.js.map',
          revision: 'f65965314f6905ac1d83c5f9870f6fc9',
        },
        {
          url: '/_next/static/chunks/pages/logout-dad1bc532f8f8fe8.js',
          revision: 'dad1bc532f8f8fe8',
        },
        {
          url: '/_next/static/chunks/pages/logout-dad1bc532f8f8fe8.js.map',
          revision: '89e5ff11c05132075b1e1db9a8079d53',
        },
        {
          url: '/_next/static/chunks/pages/profile-a4bd5da8fdc34b34.js',
          revision: 'a4bd5da8fdc34b34',
        },
        {
          url: '/_next/static/chunks/pages/profile-a4bd5da8fdc34b34.js.map',
          revision: '9ab183facc0ef433f974d1283b44bf76',
        },
        {
          url: '/_next/static/chunks/pages/reset-password-f969bdf4e34f4a5a.js',
          revision: 'f969bdf4e34f4a5a',
        },
        {
          url: '/_next/static/chunks/pages/reset-password-f969bdf4e34f4a5a.js.map',
          revision: '8d3bb11e6ae47c2a97e2939fe54a971f',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-11150b461e55aaef.js',
          revision: '11150b461e55aaef',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-11150b461e55aaef.js.map',
          revision: '62120ee89f78b65febdd4c0f2178a8fa',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-4d1caaabcfbb1468.js',
          revision: '4d1caaabcfbb1468',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-4d1caaabcfbb1468.js.map',
          revision: '913836cf803f77eeb4d4c3b21211977e',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-7641838c28d71665.js',
          revision: '7641838c28d71665',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-7641838c28d71665.js.map',
          revision: 'fbf24a3d674792261bb7afbb99cc6179',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-973144e6059f4e9d.js',
          revision: '973144e6059f4e9d',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-973144e6059f4e9d.js.map',
          revision: '138b6807f01aca1127f4fa8f0e2f4c0c',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-74d9c5769b2b2520.js',
          revision: '74d9c5769b2b2520',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-74d9c5769b2b2520.js.map',
          revision: '5a9825ceab10cfd52238fbad117b7962',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-88cea40b1d0a1d24.js',
          revision: '88cea40b1d0a1d24',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-88cea40b1d0a1d24.js.map',
          revision: 'edf7c9b56d7850fc4b00893d79f11af2',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-26e426d6f2d7dd0f.js',
          revision: '26e426d6f2d7dd0f',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-26e426d6f2d7dd0f.js.map',
          revision: '77a43aada6668af58631b472609c7e54',
        },
        {
          url: '/_next/static/chunks/pages/user-mgmt-ef112409812b82f2.js',
          revision: 'ef112409812b82f2',
        },
        {
          url: '/_next/static/chunks/pages/user-mgmt-ef112409812b82f2.js.map',
          revision: '4f2d13c985ead222b8878d86874da34b',
        },
        {
          url: '/_next/static/chunks/pages/verify-email-b9820757bc4ddd71.js',
          revision: 'b9820757bc4ddd71',
        },
        {
          url: '/_next/static/chunks/pages/verify-email-b9820757bc4ddd71.js.map',
          revision: 'ced086a1afe949fa3db15bbc0e81170f',
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
        { url: '/_next/static/chunks/webpack-cf28ff6f21af9b36.js', revision: 'cf28ff6f21af9b36' },
        {
          url: '/_next/static/chunks/webpack-cf28ff6f21af9b36.js.map',
          revision: '44fef7a48ce87ff6a510b7ece0f93648',
        },
        { url: '/_next/static/css/52b7b09134573f12.css', revision: '52b7b09134573f12' },
        {
          url: '/_next/static/css/52b7b09134573f12.css.map',
          revision: '63de3bc5d28b9856489fbdee6286aed8',
        },
        {
          url: '/_next/static/media/maskable_icon.8ff66286.png',
          revision: 'ed499377bf4acd3b54ed8182bb1dc84b',
        },
        {
          url: '/_next/static/t8po91uE3YcwZQSSwUb9B/_buildManifest.js',
          revision: '0a75bd669a0d41cd2c019fbb7bb65648',
        },
        {
          url: '/_next/static/t8po91uE3YcwZQSSwUb9B/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_offline', revision: 't8po91uE3YcwZQSSwUb9B' },
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

if (!self.define) {
  let e,
    a = {}
  const s = (s, c) => (
    (s = new URL(s + '.js', c).href),
    a[s] ||
      new Promise((a) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = s), (e.onload = a), document.head.appendChild(e)
        } else (e = s), importScripts(s), a()
      }).then(() => {
        let e = a[s]
        if (!e) throw new Error(`Module ${s} didn’t register its module`)
        return e
      })
  )
  self.define = (c, t) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (a[i]) return
    let n = {}
    const r = (e) => s(e, i),
      d = { module: { uri: i }, exports: n, require: r }
    a[i] = Promise.all(c.map((e) => d[e] || r(e))).then((e) => (t(...e), n))
  }
}
define(['./workbox-6a1bf588'], function (e) {
  'use strict'
  importScripts('fallback-tnzW5MuPhfT5TOLkqMER8.js'),
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
        { url: '/_next/static/chunks/pages/404-6bb678a904e618b8.js', revision: '6bb678a904e618b8' },
        {
          url: '/_next/static/chunks/pages/404-6bb678a904e618b8.js.map',
          revision: '74d7c93f7dbf9fa1db480497ebd2e1f1',
        },
        {
          url: '/_next/static/chunks/pages/_error-fdb52a3d513c30d7.js',
          revision: 'fdb52a3d513c30d7',
        },
        {
          url: '/_next/static/chunks/pages/_error-fdb52a3d513c30d7.js.map',
          revision: '2ef20576662fa0cc134f5676fdeb4fe6',
        },
        {
          url: '/_next/static/chunks/pages/_offline-5ffa545efec13c11.js',
          revision: '5ffa545efec13c11',
        },
        {
          url: '/_next/static/chunks/pages/_offline-5ffa545efec13c11.js.map',
          revision: '99da4a2d5d1ec18f74deae339bcc161c',
        },
        {
          url: '/_next/static/chunks/pages/account-delete-47488ddca034a821.js',
          revision: '47488ddca034a821',
        },
        {
          url: '/_next/static/chunks/pages/account-delete-47488ddca034a821.js.map',
          revision: '3f03bfe73aa4a304e243906bc223a492',
        },
        {
          url: '/_next/static/chunks/pages/admin-c6279773a81ea0ed.js',
          revision: 'c6279773a81ea0ed',
        },
        {
          url: '/_next/static/chunks/pages/admin-c6279773a81ea0ed.js.map',
          revision: 'd87185d90b0d2d634f5ab98e9f913092',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list-790df1e9de73fe1f.js',
          revision: '790df1e9de73fe1f',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list-790df1e9de73fe1f.js.map',
          revision: '77aba00cb597d9ee8dbc748e5226cfa3',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/%5Bid%5D-8be35c97a372a4b9.js',
          revision: '8be35c97a372a4b9',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/%5Bid%5D-8be35c97a372a4b9.js.map',
          revision: 'ab3d5ecf2fae77217dca51c331336ed7',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/new-6fac679e55eb4834.js',
          revision: '6fac679e55eb4834',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/new-6fac679e55eb4834.js.map',
          revision: 'f87302f59ee87ea180eeba09f497157f',
        },
        {
          url: '/_next/static/chunks/pages/feedback-012ccdae3da785df.js',
          revision: '012ccdae3da785df',
        },
        {
          url: '/_next/static/chunks/pages/feedback-012ccdae3da785df.js.map',
          revision: 'a95930911c75fe4d986a5c2f5dd877d3',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-e9e215a811c000f2.js',
          revision: 'e9e215a811c000f2',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-e9e215a811c000f2.js.map',
          revision: 'f8f9eac21113d5412a4dd128fa904ed5',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-7958d191f7aaf8b7.js',
          revision: '7958d191f7aaf8b7',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-7958d191f7aaf8b7.js.map',
          revision: 'ace4ea4addb04df8192b1cee6d26e194',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-4f8e8a9715c29541.js',
          revision: '4f8e8a9715c29541',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-4f8e8a9715c29541.js.map',
          revision: '6414419e332a02a5027024e157af4a20',
        },
        {
          url: '/_next/static/chunks/pages/index-3a3fcaba66989b7a.js',
          revision: '3a3fcaba66989b7a',
        },
        {
          url: '/_next/static/chunks/pages/index-3a3fcaba66989b7a.js.map',
          revision: '9cad968145687e830342525f37c61fb6',
        },
        {
          url: '/_next/static/chunks/pages/login-e4bafa203f30a332.js',
          revision: 'e4bafa203f30a332',
        },
        {
          url: '/_next/static/chunks/pages/login-e4bafa203f30a332.js.map',
          revision: '949c9c46994088814cda81612999672e',
        },
        {
          url: '/_next/static/chunks/pages/logout-aa0c5926bc5bfefa.js',
          revision: 'aa0c5926bc5bfefa',
        },
        {
          url: '/_next/static/chunks/pages/logout-aa0c5926bc5bfefa.js.map',
          revision: 'f0a97b6a05300dd1fc21f0c107aa34f3',
        },
        {
          url: '/_next/static/chunks/pages/profile-99415456b95518b3.js',
          revision: '99415456b95518b3',
        },
        {
          url: '/_next/static/chunks/pages/profile-99415456b95518b3.js.map',
          revision: 'd5e2a3bb2e9dbfe7c69ef54afeccd626',
        },
        {
          url: '/_next/static/chunks/pages/reset-password-050464922ee073f1.js',
          revision: '050464922ee073f1',
        },
        {
          url: '/_next/static/chunks/pages/reset-password-050464922ee073f1.js.map',
          revision: '663b5cb68a00c7bd4dbffb35af38c038',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-ee72d3515a340863.js',
          revision: 'ee72d3515a340863',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-ee72d3515a340863.js.map',
          revision: '9208b4e0611913e3cabaa36a381e5166',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-f050fee0d3c32c18.js',
          revision: 'f050fee0d3c32c18',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-f050fee0d3c32c18.js.map',
          revision: '86d0496c4e955ac1ccf568b4115dc0fe',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-be2c2d0813aa768f.js',
          revision: 'be2c2d0813aa768f',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-be2c2d0813aa768f.js.map',
          revision: 'ae083ea8e70ad2817aa7702edc63c946',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-09bb8ae3195a648b.js',
          revision: '09bb8ae3195a648b',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-09bb8ae3195a648b.js.map',
          revision: '6f296eaed2330ea3d859ac551b2bbfb3',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-c9f6ae013cba93a0.js',
          revision: 'c9f6ae013cba93a0',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-c9f6ae013cba93a0.js.map',
          revision: '10641203939035e04d689fa536508409',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-10973939ba6f2c3b.js',
          revision: '10973939ba6f2c3b',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-10973939ba6f2c3b.js.map',
          revision: '32eac6edb1064981495dd815fc113897',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-9a0d6642aa3077d9.js',
          revision: '9a0d6642aa3077d9',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-9a0d6642aa3077d9.js.map',
          revision: '967d7d41f0e3f532ea9bc0599d49ba5b',
        },
        {
          url: '/_next/static/chunks/pages/user-mgmt-c7cedae66fe25173.js',
          revision: 'c7cedae66fe25173',
        },
        {
          url: '/_next/static/chunks/pages/user-mgmt-c7cedae66fe25173.js.map',
          revision: 'e0a84d357af37708bae6e68e8b9b3179',
        },
        {
          url: '/_next/static/chunks/pages/verify-email-8b189b40d62ee9a5.js',
          revision: '8b189b40d62ee9a5',
        },
        {
          url: '/_next/static/chunks/pages/verify-email-8b189b40d62ee9a5.js.map',
          revision: 'a7a908091f801ae24b98c3205bec4cc7',
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
        { url: '/_next/static/chunks/webpack-0145bd8988af9916.js', revision: '0145bd8988af9916' },
        {
          url: '/_next/static/chunks/webpack-0145bd8988af9916.js.map',
          revision: '53bff4f9a873b32f90421a5fe230a76f',
        },
        { url: '/_next/static/css/cdd45d7141a88a6e.css', revision: 'cdd45d7141a88a6e' },
        {
          url: '/_next/static/css/cdd45d7141a88a6e.css.map',
          revision: '422dc8bc3fe01fab804848db98a8dfd2',
        },
        {
          url: '/_next/static/media/maskable_icon.8ff66286.png',
          revision: 'ed499377bf4acd3b54ed8182bb1dc84b',
        },
        {
          url: '/_next/static/tnzW5MuPhfT5TOLkqMER8/_buildManifest.js',
          revision: 'd7dfa3bae27b3523345a4fc6ecc4adc2',
        },
        {
          url: '/_next/static/tnzW5MuPhfT5TOLkqMER8/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_offline', revision: 'tnzW5MuPhfT5TOLkqMER8' },
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
            cacheWillUpdate: async ({ request: e, response: a, event: s, state: c }) =>
              a && 'opaqueredirect' === a.type
                ? new Response(a.body, { status: 200, statusText: 'OK', headers: a.headers })
                : a,
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
        const a = e.pathname
        return !a.startsWith('/api/auth/') && !!a.startsWith('/api/')
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

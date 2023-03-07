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
  importScripts('fallback-OfEq2VVa1ggwKpHCsxlh_.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/OfEq2VVa1ggwKpHCsxlh_/_buildManifest.js',
          revision: 'd965a902957a3efb97a55ff5664df9e5',
        },
        {
          url: '/_next/static/OfEq2VVa1ggwKpHCsxlh_/_ssgManifest.js',
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
        { url: '/_next/static/chunks/pages/404-d04e02721cef1d3d.js', revision: 'd04e02721cef1d3d' },
        {
          url: '/_next/static/chunks/pages/404-d04e02721cef1d3d.js.map',
          revision: 'bd6241637d31f12e87410dc9b113cf77',
        },
        {
          url: '/_next/static/chunks/pages/_error-34058cb562d37eea.js',
          revision: '34058cb562d37eea',
        },
        {
          url: '/_next/static/chunks/pages/_error-34058cb562d37eea.js.map',
          revision: '92cc4a5d3b0e1a5187f935e36754560e',
        },
        {
          url: '/_next/static/chunks/pages/_offline-182da65fd30332f6.js',
          revision: '182da65fd30332f6',
        },
        {
          url: '/_next/static/chunks/pages/_offline-182da65fd30332f6.js.map',
          revision: '02374a6e4337d6e76aad0abcebdaa0eb',
        },
        {
          url: '/_next/static/chunks/pages/account-delete-89eef97ee09dfab3.js',
          revision: '89eef97ee09dfab3',
        },
        {
          url: '/_next/static/chunks/pages/account-delete-89eef97ee09dfab3.js.map',
          revision: 'baf0cd96410c1ba26b3a757b8aa82245',
        },
        {
          url: '/_next/static/chunks/pages/admin-bc0050570059ad09.js',
          revision: 'bc0050570059ad09',
        },
        {
          url: '/_next/static/chunks/pages/admin-bc0050570059ad09.js.map',
          revision: '305a03a02c80f3b3fd97c4e95761bc9f',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list-90c04a01cadb48d9.js',
          revision: '90c04a01cadb48d9',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list-90c04a01cadb48d9.js.map',
          revision: '66a1f9aa4d3ee6bbdf2ff06826908356',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/%5Bid%5D-d470a1de8e29de78.js',
          revision: 'd470a1de8e29de78',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/%5Bid%5D-d470a1de8e29de78.js.map',
          revision: '0f11999675caff84ce31b297c05cde16',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/new-07bc5b388cba149b.js',
          revision: '07bc5b388cba149b',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/new-07bc5b388cba149b.js.map',
          revision: '4c9cf26280c20f2d39cf385861227981',
        },
        {
          url: '/_next/static/chunks/pages/feedback-ad37bfa41c852202.js',
          revision: 'ad37bfa41c852202',
        },
        {
          url: '/_next/static/chunks/pages/feedback-ad37bfa41c852202.js.map',
          revision: 'f0253a1f311fddab8caa19607a0875bf',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-bc4902a3864e5131.js',
          revision: 'bc4902a3864e5131',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-bc4902a3864e5131.js.map',
          revision: 'da05e7784819fd06fe708473ca155917',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-bfc2ca5677591c74.js',
          revision: 'bfc2ca5677591c74',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-bfc2ca5677591c74.js.map',
          revision: '1c9c7d32ab2c742067bf4b563bddb76b',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-6d0b94c39349f870.js',
          revision: '6d0b94c39349f870',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-6d0b94c39349f870.js.map',
          revision: 'f17bc45cc263bd1a7ed2c4c1fcacd625',
        },
        {
          url: '/_next/static/chunks/pages/index-a9eb08120798523d.js',
          revision: 'a9eb08120798523d',
        },
        {
          url: '/_next/static/chunks/pages/index-a9eb08120798523d.js.map',
          revision: 'a79c06c1bf77827edbe0ba86acaf39c0',
        },
        {
          url: '/_next/static/chunks/pages/login-9124d8bc8f320e43.js',
          revision: '9124d8bc8f320e43',
        },
        {
          url: '/_next/static/chunks/pages/login-9124d8bc8f320e43.js.map',
          revision: '032e234a10f6570ee20e190b12390f99',
        },
        {
          url: '/_next/static/chunks/pages/logout-2234f7ead8353332.js',
          revision: '2234f7ead8353332',
        },
        {
          url: '/_next/static/chunks/pages/logout-2234f7ead8353332.js.map',
          revision: '5292771cdd4ae386f9d20a6a34a9bf6e',
        },
        {
          url: '/_next/static/chunks/pages/profile-2174101dcb53aea9.js',
          revision: '2174101dcb53aea9',
        },
        {
          url: '/_next/static/chunks/pages/profile-2174101dcb53aea9.js.map',
          revision: 'ab430ffd45d466af3f45a13f1447c41f',
        },
        {
          url: '/_next/static/chunks/pages/reset-password-bd54cf1e224b5c65.js',
          revision: 'bd54cf1e224b5c65',
        },
        {
          url: '/_next/static/chunks/pages/reset-password-bd54cf1e224b5c65.js.map',
          revision: '726b62169a9bb11825bf0a0e2b91db57',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-a148d594200f5fff.js',
          revision: 'a148d594200f5fff',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-a148d594200f5fff.js.map',
          revision: '63cf4adaabbae0891b79230767768157',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-15a18e72dabe7278.js',
          revision: '15a18e72dabe7278',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-15a18e72dabe7278.js.map',
          revision: 'bc61831ab37645d416324eb2af30f760',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-987ddce8398c8902.js',
          revision: '987ddce8398c8902',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-987ddce8398c8902.js.map',
          revision: '0506e48e361d7dafb670802ad67b15df',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-0246a731988de3f1.js',
          revision: '0246a731988de3f1',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-0246a731988de3f1.js.map',
          revision: 'f5d366bbf3e3955d2edf0747dae661ce',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-0e4c6c38905c3617.js',
          revision: '0e4c6c38905c3617',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-0e4c6c38905c3617.js.map',
          revision: '39c1d9725f8a202d80ee051ec6a41a3f',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-c8dd5b57fcb75b7f.js',
          revision: 'c8dd5b57fcb75b7f',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-c8dd5b57fcb75b7f.js.map',
          revision: '11b66ba7d48a8618bdd3d62d6299789c',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-2411eaf094b5ff39.js',
          revision: '2411eaf094b5ff39',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-2411eaf094b5ff39.js.map',
          revision: '6da372daaa3ed4e08d5d9e3b46bcfeff',
        },
        {
          url: '/_next/static/chunks/pages/user-mgmt-8bc78501d56b5601.js',
          revision: '8bc78501d56b5601',
        },
        {
          url: '/_next/static/chunks/pages/user-mgmt-8bc78501d56b5601.js.map',
          revision: '47dd549ed1ad79274ef1c71d569b455b',
        },
        {
          url: '/_next/static/chunks/pages/verify-email-ec93f5d7984feb72.js',
          revision: 'ec93f5d7984feb72',
        },
        {
          url: '/_next/static/chunks/pages/verify-email-ec93f5d7984feb72.js.map',
          revision: '13d895cc72c3251d91ab5cc9911b32e0',
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
        { url: '/_offline', revision: 'OfEq2VVa1ggwKpHCsxlh_' },
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

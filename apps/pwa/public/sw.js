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
  self.define = (c, t) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (s[i]) return
    let n = {}
    const r = (e) => a(e, i),
      d = { module: { uri: i }, exports: n, require: r }
    s[i] = Promise.all(c.map((e) => d[e] || r(e))).then((e) => (t(...e), n))
  }
}
define(['./workbox-6a1bf588'], function (e) {
  'use strict'
  importScripts(),
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
          revision: '882eeaa889bdf4dd976722ffc76bc693',
        },
        {
          url: '/_next/static/chunks/middleware.f079f5e62dcb66e2.js',
          revision: 'f079f5e62dcb66e2',
        },
        {
          url: '/_next/static/chunks/middleware.f079f5e62dcb66e2.js.map',
          revision: '160d265f14a0308d844d09512c209b3a',
        },
        { url: '/_next/static/chunks/pages/404-367b221318cb2d6b.js', revision: '367b221318cb2d6b' },
        {
          url: '/_next/static/chunks/pages/404-367b221318cb2d6b.js.map',
          revision: 'e4e1e8ba63b685438a9bb062f3f82698',
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
          url: '/_next/static/chunks/pages/gear-closet-27ab09e4bf5cc640.js',
          revision: '27ab09e4bf5cc640',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-27ab09e4bf5cc640.js.map',
          revision: '3eec50a45dd2584b5157c0e90f7bbdc8',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-d94f10b584c60365.js',
          revision: 'd94f10b584c60365',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-d94f10b584c60365.js.map',
          revision: 'ff3aa5406f209a6163a0135e8ff59bec',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-e3c2fe6d4d36aa69.js',
          revision: 'e3c2fe6d4d36aa69',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-e3c2fe6d4d36aa69.js.map',
          revision: 'be48ff132fa034fdbf6d3bdc3d0c97be',
        },
        {
          url: '/_next/static/chunks/pages/index-1de3eec35998eada.js',
          revision: '1de3eec35998eada',
        },
        {
          url: '/_next/static/chunks/pages/index-1de3eec35998eada.js.map',
          revision: '64b48cf470acdcf5e882d734ffcf1736',
        },
        {
          url: '/_next/static/chunks/pages/login-a3cdc57e15dbab22.js',
          revision: 'a3cdc57e15dbab22',
        },
        {
          url: '/_next/static/chunks/pages/login-a3cdc57e15dbab22.js.map',
          revision: '04e28b2168750576a7c1b33ca974b606',
        },
        {
          url: '/_next/static/chunks/pages/logout-8eeeeb782add0545.js',
          revision: '8eeeeb782add0545',
        },
        {
          url: '/_next/static/chunks/pages/logout-8eeeeb782add0545.js.map',
          revision: '87c631068a80b4e6348ed5164192ae58',
        },
        {
          url: '/_next/static/chunks/pages/profile-31ba1285bd6bbc34.js',
          revision: '31ba1285bd6bbc34',
        },
        {
          url: '/_next/static/chunks/pages/profile-31ba1285bd6bbc34.js.map',
          revision: '90b387564efb6059de90884491bb72e5',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-9a511a48321a25ad.js',
          revision: '9a511a48321a25ad',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-9a511a48321a25ad.js.map',
          revision: '4e730b4cc85650327f95a15301159e3f',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-5260d990ab31cf8a.js',
          revision: '5260d990ab31cf8a',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-5260d990ab31cf8a.js.map',
          revision: '8e6776524341844247594b2cc7871af1',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-19e613016d571be2.js',
          revision: '19e613016d571be2',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-19e613016d571be2.js.map',
          revision: 'f4b6560f7aeaafa12d766c51271fdc14',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-ef9a0601357da839.js',
          revision: 'ef9a0601357da839',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-ef9a0601357da839.js.map',
          revision: 'f18d78794fc3ab5e7a949c649c5a907c',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-0cd536787f33c8fd.js',
          revision: '0cd536787f33c8fd',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-0cd536787f33c8fd.js.map',
          revision: 'ccddbba0f6180ba414a9063b42a4888f',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-b4935e2e17277fec.js',
          revision: 'b4935e2e17277fec',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-b4935e2e17277fec.js.map',
          revision: 'e5839f1b6760b21b5da15c8273c78038',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-a45fce22ca99268d.js',
          revision: 'a45fce22ca99268d',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-a45fce22ca99268d.js.map',
          revision: 'f2a8628bb33f78b769c1e10e619a1e6c',
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
        { url: '/_next/static/chunks/webpack-aba0c589639d9a87.js', revision: 'aba0c589639d9a87' },
        {
          url: '/_next/static/chunks/webpack-aba0c589639d9a87.js.map',
          revision: '9e5792c735464733eecde18c3c30169e',
        },
        { url: '/_next/static/css/4496dbee2f32c84b.css', revision: '4496dbee2f32c84b' },
        {
          url: '/_next/static/css/4496dbee2f32c84b.css.map',
          revision: '9e1eb4de77ef9baa4a1960dfd234b6ec',
        },
        {
          url: '/_next/static/media/maskable_icon.8ff66286.png',
          revision: 'ed499377bf4acd3b54ed8182bb1dc84b',
        },
        { url: '/_next/static/media/packup-bold-webfont.34a706a9.woff', revision: '34a706a9' },
        { url: '/_next/static/media/packup-bold-webfont.ea24125f.woff2', revision: 'ea24125f' },
        {
          url: '/_next/static/media/packup-bold_italic-webfont.462293a7.woff',
          revision: '462293a7',
        },
        {
          url: '/_next/static/media/packup-bold_italic-webfont.505b4f79.woff2',
          revision: '505b4f79',
        },
        { url: '/_next/static/media/packup-italic-webfont.42484ec1.woff', revision: '42484ec1' },
        { url: '/_next/static/media/packup-italic-webfont.934813d6.woff2', revision: '934813d6' },
        { url: '/_next/static/media/packup-regular-webfont.860f185c.woff', revision: '860f185c' },
        { url: '/_next/static/media/packup-regular-webfont.9fb34f0e.woff2', revision: '9fb34f0e' },
        {
          url: '/_next/static/qb15GxJHohWkMjHVO6wuk/_buildManifest.js',
          revision: 'ea464eb54ec0439a1aa80f6b1ee95752',
        },
        {
          url: '/_next/static/qb15GxJHohWkMjHVO6wuk/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
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
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
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
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
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
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
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
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    )
})
//# sourceMappingURL=sw.js.map

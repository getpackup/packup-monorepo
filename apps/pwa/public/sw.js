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
    const d = (e) => a(e, t),
      r = { module: { uri: t }, exports: n, require: d }
    s[t] = Promise.all(c.map((e) => r[e] || d(e))).then((e) => (i(...e), n))
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
        { url: '/_next/static/chunks/pages/404-17686bb701724db1.js', revision: '17686bb701724db1' },
        {
          url: '/_next/static/chunks/pages/404-17686bb701724db1.js.map',
          revision: 'b8262afbdf01ce9792bfa3e2234973e6',
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
          url: '/_next/static/chunks/pages/admin-fb2a309d91821c16.js',
          revision: 'fb2a309d91821c16',
        },
        {
          url: '/_next/static/chunks/pages/admin-fb2a309d91821c16.js.map',
          revision: '06da64f0c2250a282549384e1758209c',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list-19877483e17f6a2b.js',
          revision: '19877483e17f6a2b',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list-19877483e17f6a2b.js.map',
          revision: 'a4b643d760daacaac8a9e13390009f03',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/%5Bid%5D-0e0f00e4880bfb3f.js',
          revision: '0e0f00e4880bfb3f',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/%5Bid%5D-0e0f00e4880bfb3f.js.map',
          revision: 'b0a6ba26956f1e0092359d68dcd1f9b7',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/new-2bee1cca3256d6fb.js',
          revision: '2bee1cca3256d6fb',
        },
        {
          url: '/_next/static/chunks/pages/admin/gear-list/new-2bee1cca3256d6fb.js.map',
          revision: '13a73dacc2a198863fa99c4d1ca9b782',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-c76c47b809141f8c.js',
          revision: 'c76c47b809141f8c',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet-c76c47b809141f8c.js.map',
          revision: 'eeaeb9b384159d1bb84121b41c711938',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-edd2a0db08cca27d.js',
          revision: 'edd2a0db08cca27d',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/%5Bid%5D-edd2a0db08cca27d.js.map',
          revision: '6d0825c3796f1de045957a60dcd8261d',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-5d095f26f3d0a0b3.js',
          revision: '5d095f26f3d0a0b3',
        },
        {
          url: '/_next/static/chunks/pages/gear-closet/new-5d095f26f3d0a0b3.js.map',
          revision: '7b95e7d0c68bdfc3c65355a543f6d3ae',
        },
        {
          url: '/_next/static/chunks/pages/index-776709dc6f4921d9.js',
          revision: '776709dc6f4921d9',
        },
        {
          url: '/_next/static/chunks/pages/index-776709dc6f4921d9.js.map',
          revision: 'd0603914c277d5e5a057761a92f8cf8e',
        },
        {
          url: '/_next/static/chunks/pages/login-6d31146ccdd9cea0.js',
          revision: '6d31146ccdd9cea0',
        },
        {
          url: '/_next/static/chunks/pages/login-6d31146ccdd9cea0.js.map',
          revision: 'a0bd49f0d79636035114a40e6421bc63',
        },
        {
          url: '/_next/static/chunks/pages/logout-4dbd539b524d88f3.js',
          revision: '4dbd539b524d88f3',
        },
        {
          url: '/_next/static/chunks/pages/logout-4dbd539b524d88f3.js.map',
          revision: 'c7eb612c73ec189b059678cb99a00be3',
        },
        {
          url: '/_next/static/chunks/pages/profile-59574ce4effe7ae7.js',
          revision: '59574ce4effe7ae7',
        },
        {
          url: '/_next/static/chunks/pages/profile-59574ce4effe7ae7.js.map',
          revision: 'cc23b7f13f3f0207efe83673a61d85d5',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-5fce99019c0e496e.js',
          revision: '5fce99019c0e496e',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D-5fce99019c0e496e.js.map',
          revision: 'b53b667aad282e5c8bd11b53f7fb5687',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-9c28c2d6e0be11e9.js',
          revision: '9c28c2d6e0be11e9',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/%5BchecklistId%5D-9c28c2d6e0be11e9.js.map',
          revision: '475c8d37163694e29f0c96998945ed76',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-bde5cb58ad3ae290.js',
          revision: 'bde5cb58ad3ae290',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/details-bde5cb58ad3ae290.js.map',
          revision: '9c5d8b0c512adeb3a8aa539ab201aedd',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-52b44b35431cce16.js',
          revision: '52b44b35431cce16',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/generator-52b44b35431cce16.js.map',
          revision: '8e5b2709dccedfe3d68535bbefdf8929',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-802e9e9205c4243f.js',
          revision: '802e9e9205c4243f',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/image-802e9e9205c4243f.js.map',
          revision: 'e71197ab15f86d62031d4a20d5a1c1d8',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-3b5e50b218baecb7.js',
          revision: '3b5e50b218baecb7',
        },
        {
          url: '/_next/static/chunks/pages/trips/%5Bid%5D/party-3b5e50b218baecb7.js.map',
          revision: '797ba79927212f5a44e5f8f5fa175edb',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-9e9a1c7dcd7625fa.js',
          revision: '9e9a1c7dcd7625fa',
        },
        {
          url: '/_next/static/chunks/pages/trips/new-9e9a1c7dcd7625fa.js.map',
          revision: '3de5217b636531c79eef9210ec8cf76e',
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
          url: '/_next/static/iaB28XN_5XOAyvNCKCdu8/_buildManifest.js',
          revision: 'ad01aa097cab3d16ab17559994b53356',
        },
        {
          url: '/_next/static/iaB28XN_5XOAyvNCKCdu8/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/media/maskable_icon.8ff66286.png',
          revision: 'ed499377bf4acd3b54ed8182bb1dc84b',
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

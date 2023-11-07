export function Meta() {
  const description =
    'Adventure made easy. Pack with confidence with a trip generator for any occasion, create and share collaborative packing lists, and learn from others and view the trips they packed for.'
  return (
    <>
      <meta name="application-name" content="Packup" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Packup" />
      <meta name="description" content={description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />

      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#B35900" />
      <meta name="msapplication-tap-highlight" content="no" />

      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#0b2b44" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#051218" />

      <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://packupapp.com" />
      <meta name="twitter:title" content="Packup" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://packupapp.com/icons/icon-192x192.png" />
      <meta name="twitter:creator" content="@getpackup" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="Packup" />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Packup" />
      <meta property="og:url" content="https://packupapp.com" />
      <meta property="og:image" content="https://packupapp.com/images/beta-launch-banner.jpg" />
      <meta property="og:image:width" content="1924" />
      <meta property="og:image:height" content="1080" />
    </>
  )
}

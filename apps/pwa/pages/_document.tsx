/* eslint-disable react/no-invalid-html-attribute */
import { COLOR_MODE_KEY, COLORS, INITIAL_COLOR_MODE_CSS_PROP } from '@packup/styles'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { minify } from 'terser'

function setColorsByTheme() {
  const colors = '🌈'
  const colorModeKey = '🔑'
  const colorModeCssProp = '⚡️'

  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const prefersDarkFromMQ = mql.matches
  const persistedPreference = localStorage.getItem(colorModeKey)

  let colorMode = 'light'

  const hasUsedToggle = typeof persistedPreference === 'string'

  if (hasUsedToggle) {
    colorMode = persistedPreference
  } else {
    colorMode = prefersDarkFromMQ ? 'dark' : 'light'
  }

  // eslint-disable-next-line prefer-const
  let root = document.documentElement

  root.style.setProperty(colorModeCssProp, colorMode)

  Object.entries(colors).forEach(([name, colorByTheme]) => {
    const cssVarName = `--color-${name}`

    root.style.setProperty(cssVarName, colorByTheme[colorMode])
  })
}

function MagicScriptTag() {
  const boundFn = String(setColorsByTheme)
    .replace("'🌈'", JSON.stringify(COLORS))
    .replace('🔑', COLOR_MODE_KEY)
    .replace('⚡️', INITIAL_COLOR_MODE_CSS_PROP)

  let calledFunction = `(${boundFn})()`

  minify(calledFunction).then((res) => {
    calledFunction = res.code
  })

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />
}

/**
 * If the user has JS disabled, the injected script will never fire!
 * This means that they won't have any colors set, everything will be default
 * black and white.
 * We can solve for this by injecting a `<style>` tag into the head of the
 * document, which sets default values for all of our colors.
 * Only light mode will be available for users with JS disabled.
 */
function FallbackStyles() {
  // Create a string holding each CSS variable:
  /*
    `--color-text: black;
    --color-background: white;`
  */

  const cssVariableString = Object.entries(COLORS).reduce(
    (acc, [name, colorByTheme]) => `${acc}\n--color-${name}: ${colorByTheme.light};`,
    ''
  )

  const wrappedInSelector = `html { ${cssVariableString} }`

  return <style>{wrappedInSelector}</style>
}

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage

    const sheet = new ServerStyleSheet()

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        enhanceComponent: (Component) => Component,
      })

    const intialProps = await Document.getInitialProps(ctx)
    const styles = sheet.getStyleElement()

    return { ...intialProps, styles }
  }

  description =
    'Adventure made easy. Pack with confidence with a trip generator for any occasion, create and share collaborative packing lists, and learn from others and view the trips they packed for.'

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Packup" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Packup" />
          <meta name="description" content={this.description} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#B35900" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#0b2b44" />
          <FallbackStyles />
          <MagicScriptTag />
          <link
            rel="preload"
            href="/fonts/packup-bold-webfont.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <link
            rel="preload"
            href="/fonts/packup-regular-webfont.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />

          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
          <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png" />
          {/* genereated from https://appsco.pe/developer/splash-screens */}
          <link
            href="/images/splashscreens/iphone5_splash.png"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/images/splashscreens/iphone6_splash.png"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/images/splashscreens/iphoneplus_splash.png"
            media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/images/splashscreens/iphonex_splash.png"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/images/splashscreens/iphonexr_splash.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/images/splashscreens/iphonexsmax_splash.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/images/splashscreens/ipad_splash.png"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/images/splashscreens/ipadpro1_splash.png"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/images/splashscreens/ipadpro3_splash.png"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/images/splashscreens/ipadpro2_splash.png"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />

          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#B35900" />

          <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://packupapp.com" />
          <meta name="twitter:title" content="Packup" />
          <meta name="twitter:description" content={this.description} />
          <meta name="twitter:image" content="https://packupapp.com/icons/icon-192x192.png" />
          <meta name="twitter:creator" content="@getpackup" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="Packup" />
          <meta property="og:description" content={this.description} />
          <meta property="og:site_name" content="Packup" />
          <meta property="og:url" content="https://packupapp.com" />
          <meta property="og:image" content="https://packupapp.com/images/beta-launch-banner.png" />
          <meta property="og:image:width" content="1924" />
          <meta property="og:image:height" content="1080" />
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

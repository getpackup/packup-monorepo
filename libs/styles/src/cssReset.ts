import { createGlobalStyle } from 'styled-components'

import { brandPrimaryHover, white } from './color'
import { baseBorderStyle } from './mixins'
import { baseSpacer, halfSpacer, quarterSpacer } from './size'
import { fontFamilySansSerif, headingsFontFamily } from './typography'

/* eslint no-unused-expressions: ["error", { "allowTaggedTemplates": true }] */
export const CssReset = createGlobalStyle`
  :root {
    color-scheme: light only;
  }
  html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}
  body{margin:0}
  article,aside,details,figcaption,figure,footer,header,main,menu,nav,section{display:block}
  audio,canvas,progress,video{display:inline-block;vertical-align:baseline}
  audio:not([controls]){display:none;height:0}[hidden],template{display:none}
  a{background-color:transparent}
  a{&:active{outline:0}&:hover{outline:0}}
  abbr[title]{border-bottom:1px dotted}
  b,strong{font-weight:bold}
  dfn{font-style:italic}
  h1{font-size:2em;margin:0.67em 0}
  mark{background:#ff0;color:#000}
  small{font-size:80%}
  sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}
  sup{top:-0.5em}
  sub{bottom:-0.25em}
  img{border:0}
  svg:not(:root){overflow:hidden}
  figure{margin:1em 40px}
  hr{box-sizing:content-box;height:0}
  pre{overflow:auto}
  code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}
  button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}
  button{overflow:visible}
  button,select{text-transform:none}
  button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer}
  button[disabled],html input[disabled]{cursor:not-allowed}
  button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}
  form {width: 100%}
  input{line-height:normal}
  input[type="text"],input[type="password"],input[type="email"],input[type="url"],textarea{appearance:none}
  input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0}
  input[type="number"]{-moz-appearance: textfield;}
  input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button{height:auto;-webkit-appearance:none;margin: 0;}
  input[type="search"]{-webkit-appearance:textfield}
  input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}
  fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:0.35em 0.625em 0.75em}
  legend{border:0;padding:0}
  textarea{overflow:auto}
  optgroup{font-weight:bold}
  table{border-collapse:collapse;border-spacing:0}
  td,th{padding:0}
  html{box-sizing:border-box;}*,*:before,*:after{box-sizing:inherit}
  @at-root{@-moz-viewport{width:device-width}
  @-ms-viewport{width:device-width}
  @-o-viewport{width:device-width}
  @-webkit-viewport{width:device-width}
  @viewport{width:device-width}}

  /* https://benfrain.com/how-to-get-the-value-of-phone-notches-environment-variables-env-in-javascript-from-css/ */
  :root {
    --sat: env(safe-area-inset-top);
    --sar: env(safe-area-inset-right);
    --sab: env(safe-area-inset-bottom);
    --sal: env(safe-area-inset-left);
  }

  html,
  body {
    padding: 0;
    margin: 0;
    // height: 100%;
    overflow-x: hidden;
  }

  html {
    font-size: 16px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  body {
    font-family: ${fontFamilySansSerif};
    /* https://www.codementor.io/@ricardozea/100-responsive-typography-system-using-a-modular-scale-s5rhft58g */
    font-size: calc(14px + .35vw); /* Responsive base font size */
    line-height: calc(21px + 1.05vw); /* Responsive Vertical Rhythm */
    color: var(--color-text);
    background-color: var(--color-background);
    background-image: url('/images/topo.png');
    background-size: 500px;

    &.ReactModal__Body--open {
      overflow: hidden;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: ${halfSpacer};
    color: var(--color-headings);
    font-family: ${headingsFontFamily};
    font-weight: 700;
  }

  p {
    margin-top: 0;
    margin-bottom: ${baseSpacer};
  }

  abbr[title] {
    cursor: help;
    border-bottom: 1px dotted var(--color-lightGray);
  }

  address {
    margin-bottom: ${baseSpacer};
    font-style: normal;
    line-height: inherit;
  }

  ol,
  ul {
    margin-top: 0;
    margin-bottom: ${baseSpacer};
    padding-left: ${baseSpacer};
  }

  ol ol,
  ul ul,
  ol ul,
  ul ol {
    margin-bottom: 0;
  }

  dl {
    margin-top: 0;
    margin-bottom: ${baseSpacer};
    padding-left: 0;
  }

  dt {
    font-weight: bold;
  }

  dd {
    margin-bottom: ${halfSpacer};
    margin-left: 0;
  }

  blockquote {
    margin: 0 0 ${baseSpacer};
  }

  a {
    color: var(--color-primary);
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${brandPrimaryHover};
      text-decoration: none;
    }

    &:focus {
      outline: thin dotted;
      outline: 1px dotted ${brandPrimaryHover};
      outline-offset: -2px;
      text-decoration: none;
    }

    &:active {
      opacity: .8;
    }
  }

  pre {
    margin-top: 0;
    margin-bottom: ${baseSpacer};
  }

  figure {
    margin: 0 0 ${baseSpacer};
  }

  img {
    vertical-align: middle;
    max-width: 100%;
    height: auto;
  }

  [role="button"] {
    cursor: pointer;
  }

  table {
    background-color: transparent;
  }

  table, th, td {
    border: ${baseBorderStyle};
  }

  th, td {
    padding: ${quarterSpacer};
  }

  caption {
    padding-top: .75rem;
    padding-bottom: .75rem;
    color: var(--color-lightGray);
    text-align: left;
    caption-side: bottom;
  }

  th {
    text-align: left;
  }

  label {
    display: block;
    margin-bottom: ${halfSpacer};
  }

  input,
  button,
  select,
  textarea {
    margin: 0;
    line-height: inherit;
  }

  textarea {
    resize: vertical;
  }

  fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }

  legend {
    display: block;
    width: 100%;
    padding: 0;
    margin-bottom: ${halfSpacer};
    font-size: 1.5rem;
    line-height: inherit;
  }

  input[type="search"],
  input[type="number"] {
    -webkit-appearance: none;
  }

  input[type="number"] {
    color: transparent;
    text-shadow: 0 0 0 var(--color-gray);
    caret-color: transparent;

    &::selection {
      background: transparent;
      user-select: none;
      pointer-events: none;
      color: transparent;
    }
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }

  ::-moz-selection {
    color: ${white};
    background: ${brandPrimaryHover};
  }

  ::selection {
    color: ${white};
    background: ${brandPrimaryHover};
  }

  :-ms-input-placeholder {
    color: var(--color-lightGray);
  }

  ::-ms-input-placeholder {
    color: var(--color-lightGray);
  }

  ::placeholder {
    color: var(--color-lightGray);
    opacity: 1; /* Firefox */
  }
  .accordion *:focus {
    outline: none;
  }

  .instagram-media {
    margin: 0 auto !important;
  }

  /* add icon to external links in blogs and sponsored packing list items */
  .packing-list-item a[target="_blank"]:after,
  .blog-content a[target="_blank"]:after {
    content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==");
    margin-left: ${quarterSpacer};
  }

  .tooltip.customTooltip {
    white-space: nowrap;
    padding: ${halfSpacer};
    line-height: 1.5;
    text-align: center;
  }

  .tooltip.customTooltip.customTooltip200 {
    width: 200px;
    white-space: initial;
  }

  .truncatedText {
    margin: 0;
  }

  table.no-border,
  table.no-border th,
  table.no-border td {
    border: none;
  }
`

export default CssReset

import { borderColor, lightestGray } from './color'
import { baseSpacer, borderWidth, doubleSpacer, halfSpacer, quarterSpacer } from './size'

export const baseBorderStyle = `${borderWidth} solid ${borderColor}`
export const baseBorderLightStyle = `${borderWidth} solid ${lightestGray}`

export const disabledStyle = `
  cursor: not-allowed;
  opacity: .65;
`

export const visuallyHiddenStyle = `
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap; /* added line */
`

export const z1Shadow = `0 1px ${quarterSpacer} 0 rgba(0,0,0,0.2)`
export const z2Shadow = `0 ${quarterSpacer} ${halfSpacer} 0 rgba(0,0,0,0.2)`
export const z3Shadow = `0 ${halfSpacer} ${baseSpacer} rgba(0,0,0,0.2)`
export const z4Shadow = `0 ${baseSpacer} ${doubleSpacer} rgba(0,0,0,0.2)`
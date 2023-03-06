import React from 'react'

import { ThemeContext } from '@packup/utils'
import { baseAndAHalfSpacer, halfSpacer } from '@packup/styles'
import FadeIn from '../fade-in/FadeIn'

export const DarkModeToggle = ({ showText = false, color = 'var(--color-textLight)' }) => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  const Sun = () => (
    <FadeIn>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </FadeIn>
  )

  const Moon = () => (
    <FadeIn>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </FadeIn>
  )

  if (!colorMode) {
    return null
  }

  return (
    <label
      style={{
        margin: 0,
        width: showText ? 'auto' : baseAndAHalfSpacer,
        height: baseAndAHalfSpacer,
        cursor: 'pointer',
      }}
    >
      <input
        type="checkbox"
        hidden
        checked={colorMode === 'dark'}
        onChange={(ev) => {
          setColorMode(ev.target.checked ? 'dark' : 'light')
        }}
      />{' '}
      {colorMode === 'dark' ? <Moon /> : <Sun />}
      {showText ? (
        <span style={{ marginLeft: halfSpacer, verticalAlign: 'text-bottom' }}>
          {colorMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </span>
      ) : null}
    </label>
  )
}

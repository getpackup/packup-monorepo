import { ThemeContext } from '@packup/utils'
import { baseAndAHalfSpacer, halfSpacer } from '@packup/styles'
import FadeIn from '../fade-in/FadeIn'
import styled from 'styled-components'
import { useContext, useEffect } from 'react'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { AppState } from '@packup/redux'

const StyledDarkModeLabel = styled.label<{ showText: boolean }>`
  margin: 0;
  width: ${({ showText }) => (showText ? 'auto' : baseAndAHalfSpacer)};
  height: ${baseAndAHalfSpacer};
  cursor: pointer;
  display: flex;
  align-items: center;

  & span {
    margin-top: ${halfSpacer};
  }
`

export const DarkModeToggle = ({ showText = false, color = 'var(--color-textLight)' }) => {
  const { colorMode, setColorMode } = useContext(ThemeContext)
  const firebase = useFirebase()
  const auth = useSelector((state: AppState) => state.firebase.auth)

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(auth.uid)
      .update({
        [`preferences.theme`]: colorMode,
      })
  }, [colorMode])

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
    <StyledDarkModeLabel showText={showText}>
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
        <p style={{ marginLeft: halfSpacer, verticalAlign: 'text-bottom', marginBottom: 0 }}>
          {colorMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </p>
      ) : null}
    </StyledDarkModeLabel>
  )
}

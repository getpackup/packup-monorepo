import { Box, FlexContainer, Heading, IconWrapper } from '@packup/components'
import { baseSpacer, borderRadius, boxShadow, boxShadowHover } from '@packup/styles'
import React, { FunctionComponent, useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { useMeasure } from 'react-use'
import styled from 'styled-components'

type CollapsibleBoxProps = {
  title: string
  subtitle?: string
  defaultClosed: boolean
  collapseCallback?: () => void
  enabled?: boolean
  children: React.ReactNode
}

const CollapsibleBoxWrapper = styled.div`
  padding: ${baseSpacer};
  border-radius: ${borderRadius};
  margin-bottom: ${baseSpacer};
  box-shadow: ${boxShadow};
  background: var(--color-backgroundTertiary);
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: ${boxShadowHover};
  }
`

const StyledCollapsed = styled.div<{
  isCollapsed: boolean
  height: number
}>`
  transition: max-height 0.165s;
  overflow: hidden;
  max-height: ${({ isCollapsed, height }) => (isCollapsed ? '0px' : `${height}px`)};
`

// In the future, we could allow the collapsed state to be passed in as a prop. If the state
// is supplied, it's a "controlled" component, otherwise it's "uncontrolled" and we
// continue to manage the state internally.
//
// Docs for controlled and uncontrolled components: https://reactjs.org/docs/forms.html
export const CollapsibleBox: FunctionComponent<CollapsibleBoxProps> = ({
  title,
  subtitle,
  defaultClosed,
  children,
  collapseCallback,
  enabled = true,
}) => {
  // Manages the collapsed state of the accordion
  const [collapsed, setCollapsed] = useState(enabled === true ? defaultClosed : false)

  // Gets the height of the element (ref)
  const [ref, { height }] = useMeasure<HTMLDivElement>()

  const handleCollapse = () => {
    if (collapseCallback) collapseCallback()
    setCollapsed(!collapsed)
  }

  return (
    <CollapsibleBoxWrapper>
      <FlexContainer
        justifyContent="space-between"
        alignItems="flex-start"
        flexWrap="nowrap"
        style={{ cursor: 'pointer' }}
        onClick={handleCollapse}
        role="button"
        onKeyDown={handleCollapse}
      >
        <div
          style={{ cursor: 'pointer' }}
          onClick={handleCollapse}
          role="button"
          onKeyDown={handleCollapse}
        >
          <Heading as="h3" altStyle noMargin>
            {title}
          </Heading>
          {subtitle && (
            <p style={{ margin: '0 0 8px 0', lineHeight: 1 }}>
              <small>{subtitle}</small>
            </p>
          )}
        </div>
        {enabled && (
          <IconWrapper
            onClick={handleCollapse}
            onKeyDown={handleCollapse}
            tabIndex={0}
            role="button"
          >
            {collapsed ? <FaCaretUp /> : <FaCaretDown />}
          </IconWrapper>
        )}
      </FlexContainer>
      <StyledCollapsed isCollapsed={collapsed} height={height}>
        <div ref={ref}>{children}</div>
      </StyledCollapsed>
    </CollapsibleBoxWrapper>
  )
}

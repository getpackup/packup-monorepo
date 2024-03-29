import { Button } from '@packup/components'
import {
  borderColor,
  brandPrimary,
  offWhite,
  textColor,
  white,
  zIndexDropdown,
  baseBorderStyle,
  z1Shadow,
  baseAndAHalfSpacer,
  baseSpacer,
  borderRadius,
  halfSpacer,
  quarterSpacer,
} from '@packup/styles'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import styled from 'styled-components'

type DropdownMenuProps = {
  color?: string
  width?: number
  children: React.ReactNode
}

interface StyledDropDownProps {
  width?: number
}

const StyledDropdown = styled.div<StyledDropDownProps>`
  position: absolute;
  background-color: var(--color-background);
  border: ${baseBorderStyle};
  box-shadow: ${z1Shadow};
  right: 0;
  top: calc(100% + ${quarterSpacer});
  width: ${(props) => (props.width ? props.width : '250')}px;
  z-index: ${zIndexDropdown};
  display: flex;
  flex-direction: column;
  border-radius: ${borderRadius};

  &:after,
  &:before {
    bottom: 100%;
    left: calc(100% - ${baseAndAHalfSpacer});
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: transparent;
    border-bottom-color: var(--color-background);
    border-width: ${halfSpacer};
    margin-left: -${halfSpacer};
  }
  &:before {
    border-color: transparent;
    border-bottom-color: var(--color-border);
    border-width: calc(${halfSpacer} + 1px);
    margin-left: calc(-${halfSpacer} - 1px);
  }

  & > a,
  & > button {
    color: var(--color-text);
    padding: ${halfSpacer} ${baseSpacer};
    display: block;
    border-bottom: ${baseBorderStyle};
  }

  & > button {
    -webkit-appearance: none;
    background: transparent;
    border: none;
    text-align: left;
  }

  & > a:hover,
  & > a:focus,
  & > button:hover,
  & > button:focus {
    color: ${brandPrimary};
    background-color: var(--color-backgroundAlt);
  }
`

const StyledDropdownWrapper = styled.div`
  position: relative;
  display: inline-flex;
`

export const DropdownMenu: FunctionComponent<DropdownMenuProps> = ({ children, color, width }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownNode = useRef<HTMLDivElement>(null)

  const handleDropownClick = (e: MouseEvent) => {
    if (dropdownNode && dropdownNode.current && dropdownNode.current.contains(e.target as Node)) {
      return // inside click
    }
    setDropdownOpen(false) // outside click, close the menu
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleDropownClick)

    return () => {
      document.removeEventListener('mousedown', handleDropownClick)
    }
  }, [])

  return (
    <StyledDropdownWrapper ref={dropdownNode}>
      <Button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        color="tertiary"
        size="small"
      >
        <FaEllipsisH size={baseSpacer} color={color || 'var(--color-text)'} />
      </Button>
      {dropdownOpen && <StyledDropdown width={width}>{children}</StyledDropdown>}
    </StyledDropdownWrapper>
  )
}

export default DropdownMenu

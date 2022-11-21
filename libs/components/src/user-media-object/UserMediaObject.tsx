import { UserType } from '@getpackup-group/common'
import { textColorLight, halfSpacer } from '@getpackup-group/styles'
import { Avatar, AvatarProps } from '../avatar/Avatar'
import { FlexContainer } from '../flex-container/FlexContainer'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

type UserMediaObjectProps = {
  user: UserType
  avatarSize?: AvatarProps['size']
  showSecondaryContent?: boolean
  action?: JSX.Element
}

const UserContent = styled.div`
  flex: 1;
  margin-right: ${halfSpacer};
  line-height: 1.2;
`

const MutedText = styled.small`
  color: ${textColorLight};
`

export const UserMediaObject: FunctionComponent<UserMediaObjectProps> = ({
  user,
  action,
  avatarSize,
  showSecondaryContent,
}) => {
  return (
    <FlexContainer justifyContent="flex-start" flexWrap="nowrap">
      <Avatar
        src={user.photoURL}
        gravatarEmail={user.email}
        rightMargin
        size={avatarSize || 'sm'}
      />
      <UserContent>
        <div style={{ wordBreak: 'break-all' }}>{user.username?.toLocaleLowerCase()}</div>
        {showSecondaryContent && <MutedText>{user.displayName}</MutedText>}
      </UserContent>
      {action}
    </FlexContainer>
  )
}

export default UserMediaObject

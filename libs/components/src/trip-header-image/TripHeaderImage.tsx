import { TripType } from '@getpackup-group/common'
import {
  HeroImage,
  NegativeMarginContainer,
  NoiseRings,
  StaticMapImage,
} from '@getpackup-group/components'
import { brandSecondary, lightestGray, baseSpacerUnit } from '@getpackup-group/styles'
import styled from 'styled-components'

type TripHeaderImageProps = {
  trip: TripType | undefined
}

const PlaceholderImageWrapper = styled.div`
  height: calc(100vw / 4.5);
  background-color: ${(props: { backgroundColor: string }) => props.backgroundColor};
  & svg {
    width: 100%;
  }
`

export const TripHeaderImage = ({ trip }: TripHeaderImageProps): JSX.Element => {
  return (
    <NegativeMarginContainer
      top={baseSpacerUnit}
      left={baseSpacerUnit}
      right={baseSpacerUnit}
      bottom={0}
      aspectRatio={4}
    >
      {trip ? (
        <>
          {trip.headerImage && <HeroImage src={trip.headerImage} aspectRatio={4} />}
          {!trip.headerImage && !!trip.lat && !!trip.lng && (
            <StaticMapImage
              lat={trip.lat}
              lng={trip.lng}
              height="100%"
              width="100%"
              zoom={10}
              label={trip.startingPoint}
            />
          )}
          {!trip.headerImage && !trip.lat && !trip.lng && (
            <PlaceholderImageWrapper backgroundColor={brandSecondary}>
              <NoiseRings height={512} width={2048} seed={trip.name} strokeWidth={4} />
            </PlaceholderImageWrapper>
          )}
        </>
      ) : (
        <PlaceholderImageWrapper backgroundColor={lightestGray} />
      )}
    </NegativeMarginContainer>
  )
}

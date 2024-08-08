import styled from 'styled-components'
import Image, { StaticImageData } from 'next/image'
import ReactTooltip from 'react-tooltip'

import logo from '../../../../apps/pwa/public/images/Fernwood/Fernwood-Logo-RGB-2022-Wordmark-Red_1980x.png'
import Image1 from '../../../../apps/pwa/public/images/Fernwood/1.jpg'
import Image2 from '../../../../apps/pwa/public/images/Fernwood/2.jpg'
import Image3 from '../../../../apps/pwa/public/images/Fernwood/3.jpg'
import Image4 from '../../../../apps/pwa/public/images/Fernwood/4.jpg'
import Image5 from '../../../../apps/pwa/public/images/Fernwood/5.jpg'
import Image6 from '../../../../apps/pwa/public/images/Fernwood/6.jpg'
import Image7 from '../../../../apps/pwa/public/images/Fernwood/7.jpg'
import Image8 from '../../../../apps/pwa/public/images/Fernwood/8.jpg'
import Image9 from '../../../../apps/pwa/public/images/Fernwood/9.jpg'
import Image10 from '../../../../apps/pwa/public/images/Fernwood/10.jpg'
import { Row } from '../row/Row'
import { Column } from '../column/Column'
import { useEffect, useState } from 'react'
import {
  baseSpacer,
  borderRadius,
  white,
  halfSpacer,
  baseBorderStyle,
  doubleSpacer,
  boxShadow,
  fontSizeSmall,
} from '@packup/styles'
import { Pill } from '../pill/Pill'
import { FaQuestionCircle, FaTimes } from 'react-icons/fa'
import { useWindowSize } from '@packup/hooks'
import { useSelector } from 'react-redux'
import { AppState } from '@packup/redux'
import { isLoaded, useFirebase } from 'react-redux-firebase'
import addDays from 'date-fns/addDays'
import { trackEvent } from '@packup/utils'

const BannerAdWrapper = styled.div`
  background-color: #f3efe8;
  margin: ${baseSpacer} 0;
  border-radius: ${borderRadius};
  position: relative;
  border: ${baseBorderStyle};
  &:hover {
    box-shadow: ${boxShadow};
  }
`

const ImageWrapper = styled.div<{ isExtraSmallScreen: boolean }>`
  position: relative;
  height: ${(props) => (props.isExtraSmallScreen ? '150px' : '300px')};
  & img {
    object-fit: cover;
  }
`
const StyledLink = styled.a`
  background-color: #003057;
  text-transform: uppercase;
  color: ${white};
  padding: ${halfSpacer} ${baseSpacer};
  letter-spacing: 1px;
  font-family: 'Surt Normal', 'Avenir Next', sans-serif;
  font-size: ${fontSizeSmall};

  &:hover {
    background-color: #003057f2;
    color: ${white};
  }
`

const CloseButton = styled.div`
  position: absolute;
  top: -${halfSpacer};
  right: -${halfSpacer};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--color-backgroundAlt);
  border-radius: 100%;
  border: ${baseBorderStyle};
  width: ${doubleSpacer};
  height: ${doubleSpacer};

  &:hover {
    box-shadow: ${boxShadow};
  }
`

const Stripes = styled.div`
  position: absolute;
  height: 10px;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    -45deg,
    #f3efe8,
    #f3efe8 10px,
    #003057 10px,
    #003057 15px,
    #eb0a2b 15px,
    #eb0a2b 20px
  );
`

const images: StaticImageData[] = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
] as unknown as StaticImageData[]

const getRandomImageUrl = (images: StaticImageData[]) => {
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}

export const PackingListBannerAd = ({ location }: { location: 'packingList' | 'trips' }) => {
  const [imageUrl, setImageUrl] = useState<StaticImageData | null>(null)
  const { isExtraSmallScreen } = useWindowSize()

  const auth = useSelector((state: AppState) => state.firebase.auth)
  const profile = useSelector((state: AppState) => state.firebase.profile)
  const firebase = useFirebase()

  const handleCloseClick = () => {
    trackEvent('Fernwood Ad Dismissed', {
      imageUrl: imageUrl?.src,
      userId: auth.uid,
      location: location,
    })
    if (isLoaded(auth) && auth?.uid) {
      firebase
        .firestore()
        .collection('users')
        .doc(auth.uid)
        .update({
          [`preferences.hasDismissedFernwoodAd`]: new Date(),
        })
    }
  }

  useEffect(() => {
    const url = getRandomImageUrl(images)
    setImageUrl(url)
    trackEvent('Fernwood Ad Viewed', { imageUrl: url.src })
  }, [])

  if (
    profile.preferences &&
    profile.preferences.hasDismissedFernwoodAd &&
    // allow user to dismiss the ad for 7 days
    addDays(profile.preferences.hasDismissedFernwoodAd.toDate(), 7) > new Date()
  ) {
    return null
  }

  return (
    <BannerAdWrapper>
      <Row>
        <Column xs={7} sm={8}>
          <div style={{ padding: isExtraSmallScreen ? halfSpacer : baseSpacer }}>
            <div
              style={{ position: 'relative', display: 'inline-block' }}
              data-tip={`We partner with brands we love to help keep Packup free for you.`}
              data-for="sponsored"
            >
              <Pill text="Sponsored" color="neutral" style={{ margin: `0 0 ${halfSpacer} 0` }} />
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: 12,
                  width: 12,
                  background: 'white',
                  display: 'flex',
                  borderRadius: '100%',
                }}
              >
                <FaQuestionCircle size={12} color="var(--color-info)" />
                <ReactTooltip
                  id="sponsored"
                  place="top"
                  type="dark"
                  effect="solid"
                  className="tooltip customTooltip customTooltip200"
                />
              </span>
            </div>
            <p style={{ margin: `0 0 ${halfSpacer} 0` }}>
              <Image src={logo} alt="Fernwood Coffee Logo" width={300} height={30} />
            </p>
            {!isExtraSmallScreen && (
              <p style={{ fontSize: fontSizeSmall, color: 'var(--color-secondary)' }}>
                The luxury of great coffee, wherever your adventures take you
              </p>
            )}

            <p>
              <StyledLink href="https://fernwoodcoffee.com/?ref=packup" target="_blank">
                Shop our coffee
              </StyledLink>
            </p>
          </div>
        </Column>
        <Column xs={4} xsOffset={1} sm={3} smOffset={1}>
          <ImageWrapper isExtraSmallScreen={Boolean(isExtraSmallScreen)}>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Fernwood Instant Coffee in use"
                layout="fill"
                placeholder="blur"
              />
            )}
            <CloseButton
              onClick={handleCloseClick}
              data-tip={`Don't show this again`}
              data-for="ad-close"
            >
              <ReactTooltip
                id="ad-close"
                place="top"
                type="dark"
                effect="solid"
                className="tooltip customTooltip"
              />
              <FaTimes />
            </CloseButton>
          </ImageWrapper>
        </Column>
      </Row>
      <Stripes />
    </BannerAdWrapper>
  )
}

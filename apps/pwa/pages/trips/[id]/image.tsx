import { TripType } from '@getpackup-group/common'
import {
  FlexContainer,
  Heading,
  HeroImageUpload,
  LoadingPage,
  PageContainer,
} from '@getpackup-group/components'
import Head from 'next/head'
import { AppState } from '@getpackup-group/redux'
import toast from 'react-hot-toast'
import { baseSpacer } from '@getpackup-group/styles'
import { trackEvent, usePrevious } from '@getpackup-group/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import styled from 'styled-components'

type TripHeaderImageProps = unknown

const ImageOption = styled.img`
  margin-bottom: ${baseSpacer};
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`

export default function AddTripHeaderImage(props: TripHeaderImageProps) {
  const activeTripById: Array<TripType> = useSelector(
    (state: AppState) => state.firestore.ordered.activeTripById
  )

  const router = useRouter()

  useFirestoreConnect([
    {
      collection: 'trips',
      doc: router.query.id as string,
      storeAs: 'activeTripById',
    },
  ])
  const firebase = useFirebase()

  const activeTrip: TripType | undefined =
    activeTripById && activeTripById.length > 0 ? activeTripById[0] : undefined

  const prevValue = usePrevious(activeTrip?.headerImage)
  useEffect(() => {
    if (activeTrip && prevValue !== activeTrip.headerImage && activeTrip.headerImage !== '') {
      // TODO: enable when generator page is ready
      // router.push(`/trips/${router.query.id}/generator`)
    }
  }, [activeTrip, prevValue, router])

  const predefinedChoices = [
    // 'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_north,h_512,w_2048/v1617244552/getpackup/0f1a2062-3.jpg',
    // 'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_south,h_512,w_2048/v1617244549/getpackup/044a8781.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1617244550/getpackup/044a9077-2-2.jpg',
    // 'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_south,h_512,w_2048/v1617244547/getpackup/044A0009-2.jpg',
    // 'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1617244545/getpackup/SnowboarderCuttingTracksOnTheEdgeOfTheShadowOnVirginSnow.jpg',
    // 'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_north,h_512,w_2048/v1617244556/getpackup/WatertonHike.jpg',
    // 'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_auto,h_512,w_2048/v1617244555/getpackup/chamonix-chrisbrinleejr-sep17-78.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_north,h_512,w_2048/v1626723073/getpackup/0F1A2340_zy0asj.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_north,h_512,w_2048/v1626723079/getpackup/0F1A2357_ngyjwq.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_north,h_512,w_2048/v1626131678/getpackup/PanoramaresortBC_TaylorBurk_yhq9bv.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131677/getpackup/BergLakeSunrise_TaylorBurk_gfpilg.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131677/getpackup/VancouverIslandBC_TaylorBurk_fyyalh.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131677/getpackup/Taylor_Burk_Patagonia_z1bec8.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131677/getpackup/VancouverIsland_TaylorBurk-7_zhwgh2.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_south,h_512,w_2048/v1626131674/getpackup/044A4171_vpkdel.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131672/getpackup/BanffNationalParkAB2_TaylorBurk_cj27sc.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_south,h_512,w_2048/v1626131671/getpackup/GrosMorneNFLD_TaylorBurk-15_cxae7q.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131669/getpackup/IceCaveBanffAlberta_TaylorBurk_lb0kfs.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131669/getpackup/GrosMorneNFLD_TaylorBurk-2_oio34q.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131665/getpackup/ElkIslandNationalParkAlberta_TaylorBurk_e0nahc.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_north,h_512,w_2048/v1626131664/getpackup/044A5545-3_bcokpp.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131661/getpackup/044A8754-4_vmipxk.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_south,h_512,w_2048/v1626131660/getpackup/044A4630-3_mwf30b.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_north,h_512,w_2048/v1626131659/getpackup/044A6928_rawtp5.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131653/getpackup/044A5652-3_l3sjwb.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_south,h_512,w_2048/v1626131653/getpackup/044A0891_kesrw3.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131648/getpackup/0F1A8159_hkeys7.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_south,h_512,w_2048/v1626131643/getpackup/044A2015-11_p8wrzc.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131644/getpackup/0F1A1972_xxnxn7.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,g_south,h_512,w_2048/v1626131637/getpackup/044A6261-3_xf1fpt.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131637/getpackup/044A6577-3_djipmj.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131635/getpackup/0F1A0636_spg3jy.jpg',
    'https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131634/getpackup/044A5994-3_ofhstu.jpg',
  ]

  const updateTripImage = (index: number) => {
    firebase
      .firestore()
      .collection('trips')
      .doc(router.query.id as string)
      .update({
        headerImage: predefinedChoices[index],
        lastUpdated: new Date(),
      })
      .then(() => {
        trackEvent('New Predefined Trip Header Image Uploaded', {
          tripId: router.query.id,
          headerImage: predefinedChoices[index],
        })
        router.push(`/trips/${router.query.id}/generator`)
      })
      .catch((err) => {
        toast.error(err.message)
        trackEvent('New Predefined Trip Header Image Upload Failure', {
          tripId: router.query.id,
          headerImage: predefinedChoices[index],
          error: err,
        })
      })
  }

  return (
    <PageContainer>
      <Head>
        <title>Add Trip Header Image | Packup</title>
      </Head>
      <FlexContainer justifyContent="space-between" alignItems="center">
        <Heading altStyle as="h2">
          Add Trip Header Image
        </Heading>
        <p>
          <Link href={`/trips/${router.query.id}/generator`} legacyBehavior passHref>
            <a
              onClick={() =>
                trackEvent('Add Trip Header Image Skipped', { tripId: router.query.id })
              }
              href={`/trips/${router.query.id}/generator`}
            >
              Skip For Now
            </a>
          </Link>
        </p>
      </FlexContainer>

      {activeTrip ? (
        <>
          <HeroImageUpload
            type="trip"
            id={router.query.id as string}
            image={activeTrip?.headerImage}
          />
          <p style={{ textAlign: 'center' }}>Or choose from one below:</p>

          {predefinedChoices.map((img, index) => (
            <ImageOption src={img} alt="" key={img} onClick={() => updateTripImage(index)} />
          ))}
          <p>
            All photos courtesy of{' '}
            <a href="https://www.taylorburk.com/" target="_blank" rel="noopener noreferrer">
              Taylor Burk Photography
            </a>
          </p>
        </>
      ) : (
        <LoadingPage />
      )}
    </PageContainer>
  )
}

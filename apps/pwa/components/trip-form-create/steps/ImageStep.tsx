import { baseSpacer, borderColor, halfSpacer } from '@packup/styles'
import { trackEvent } from '@packup/utils'
import { useEffect, useMemo, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { useFirebase } from 'react-redux-firebase'
import styled from 'styled-components'
import { Crop, en, Flip, Local, Uppload } from 'uppload'

import { Button, Heading } from '../../index'

const HeroImageUploadPicker = styled.div`
  border: 2px dashed ${borderColor};
  background: repeating-linear-gradient(
    45deg,
    var(--color-background),
    var(--color-background) ${halfSpacer},
    var(--color-backgroundAlt) ${halfSpacer},
    var(--color-backgroundAlt) ${baseSpacer}
  );
  min-height: calc(100vw / 7); /* 7 is to match approximate aspectRatio of HeroImage */
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: ${baseSpacer};
`

const ImageOption = styled.img`
  margin-bottom: ${baseSpacer};
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`

export default function ImageStep(props: any) {
  const {
    formField: { headerImage },
    formValues: { headerImage: headerImageValue },
    setFieldValue,
  } = props

  const firebase = useFirebase()

  const [isLoading, setIsLoading] = useState(false)
  const [haveSelectedImage, setHaveSelectedImage] = useState(false)

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

  const upploadRef = new Uppload({
    lang: en,
    defaultService: 'local',
    compression: 0,
    compressionToMime: 'image/jpeg',
    maxSize: [2048, 512],
    uploader: (file, updateProgress) =>
      new Promise((resolve, reject) => {
        const storageReference = firebase.storage().ref()
        const path = `trips/${props.tripId}`
        const reference = storageReference.child(path)
        const uploadTask = reference.put(file)
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            if (updateProgress) updateProgress(progress)
          },
          (error) => {
            console.error('Got error', error)
            return reject(new Error('unable_to_upload'))
          },
          () => {
            console.log('Uploaded!')
            setIsLoading(false)
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then((url) => {
                resolve(url)
                trackEvent('Upload Trip Image Successfully Uploaded', { url })
              })
              .catch((err) => {
                reject(new Error('unable_to_upload'))
                trackEvent('Upload Trip Image Upload Failure', { err })
              })
            setHaveSelectedImage(true)
          }
        )
      }),
  })

  const uploader = useMemo(() => {
    if (props.tripId && upploadRef !== null) {
      return upploadRef
    }
    trackEvent('Upload Trip Image No Trip ID', { tripId: props.tripId })
    return null
  }, [props.tripId, upploadRef])

  useEffect(() => {
    if (!uploader) return
    uploader.use([new Local()])
    uploader.use([new Crop({ aspectRatio: 16 / 4 }), new Flip()])
  }, [uploader])

  if (uploader) {
    uploader.on('before-upload', () => {
      setIsLoading(true)
    })

    uploader.on('upload', (newUrl: string) => {
      setFieldValue(headerImage.name, newUrl)

      setIsLoading(false)
      uploader.close()
    })
  }

  const handleSelection = (index: number) => {
    setFieldValue(headerImage.name, predefinedChoices[index])
    setHaveSelectedImage(true)

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }

  const handleImageChange = () => {
    setHaveSelectedImage(false)
    setIsLoading(false)
  }

  return (
    <>
      <Heading altStyle as="h3">
        Stay hyped with a cover image
      </Heading>

      {haveSelectedImage ? (
        <>
          <ImageOption src={headerImageValue} alt="Photo of choice" />
          <Button
            type="button"
            color="text"
            block
            onClick={handleImageChange}
            style={{ marginBottom: baseSpacer }}
          >
            Change Image
          </Button>
        </>
      ) : (
        <>
          <HeroImageUploadPicker>
            <Button
              type="button"
              onClick={() => {
                trackEvent('Upload Trip Image Clicked')
                if (uploader) {
                  uploader.open()
                }
              }}
              color="tertiary"
              size="small"
              isLoading={isLoading}
              iconLeft={<FaCamera />}
              style={{ zIndex: 1 }}
            >
              Add
            </Button>
          </HeroImageUploadPicker>

          <p style={{ textAlign: 'center' }}>Or choose from one below:</p>

          {predefinedChoices.map((img, index) => (
            <ImageOption src={img} alt="" key={img} onClick={() => handleSelection(index)} />
          ))}
          <p>
            All photos courtesy of{' '}
            <a href="https://www.taylorburk.com/" target="_blank" rel="noopener noreferrer">
              Taylor Burk Photography
            </a>
          </p>
        </>
      )}
    </>
  )
}

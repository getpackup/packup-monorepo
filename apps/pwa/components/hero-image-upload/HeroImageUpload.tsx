import { baseSpacer, halfSpacer } from '@packup/styles'
import { trackEvent } from '@packup/utils'
/* eslint-disable no-console */
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { useFirebase } from 'react-redux-firebase'
import styled from 'styled-components'
import { Camera, Crop, en, Flip, Instagram, Local, Unsplash, Uppload } from 'uppload'

import { Button, HeroImage } from '../index'

type HeroImageUploadProps = {
  type: 'trip' | 'profile'
  id: string
  image?: string
}

const HeroImageUploadWrapper = styled.div`
  // margin-bottom: ${baseSpacer};
`

const HeroImageUploadPicker = styled.div`
  border: 2px dashed var(--color-border);
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

export const HeroImageUpload: FunctionComponent<HeroImageUploadProps> = ({ type, id, image }) => {
  const firebase = useFirebase()

  const [isLoading, setIsLoading] = useState(false)

  const uploader = useMemo(
    () =>
      new Uppload({
        lang: en,
        defaultService: 'local',
        compression: 0,
        compressionToMime: 'image/jpeg',
        maxSize: [2048, 512],
        uploader: (file, updateProgress) =>
          new Promise((resolve, reject) => {
            const storageReference = firebase.storage().ref()
            const path = type === 'trip' ? `trips/${id}` : `${id}/profile`
            const reference = storageReference.child(path)
            const uploadTask = reference.put(file)
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                if (updateProgress) updateProgress(progress)
              },
              (error) =>
                // console.log('Got error', error)
                reject(new Error('unable_to_upload')),
              () => {
                // console.log('Uploaded!')
                uploadTask.snapshot.ref
                  .getDownloadURL()
                  .then((url) => resolve(url))
                  .catch(() => reject(new Error('unable_to_upload')))
              }
            )
          }),
      }),
    []
  )

  useEffect(() => {
    uploader.use([
      new Local(),
      new Camera(),
      // TODO: implment unsplash manually outside of this component so we can pull in metadata
      // and properly attribute image owners. Needed for production api limits at https://unsplash.com/oauth/applications
      new Unsplash(process.env.NX_UNSPLASH_ACCESS_KEY as string),
      new Instagram(),
    ])
    uploader.use([new Crop({ aspectRatio: 16 / 4 }), new Flip()])
  }, [uploader])

  uploader.on('before-upload', () => {
    setIsLoading(true)
  })

  uploader.on('upload', (newUrl: string) => {
    if (type === 'trip') {
      firebase.firestore().collection('trips').doc(id).update({
        headerImage: newUrl,
        lastUpdated: new Date(),
      })
      trackEvent('New Trip Header Image Uploaded', {
        tripId: id,
        headerImage: newUrl,
      })
    }
    if (type === 'profile') {
      firebase.firestore().collection('users').doc(id).update({
        profileHeaderImage: newUrl,
        lastUpdated: new Date(),
      })
      trackEvent('New User Profile Header Image Uploaded', {
        uid: id,
        profileHeaderImage: newUrl,
      })
    }

    setIsLoading(false)
    uploader.close()
  })

  useEffect(
    // need to remove the upploadModal from the document when this component unmounts
    // otherwise it gets in a weird state and can mount multiple times
    () =>
      function cleanup() {
        const upploadModal = document.querySelector('.uppload-container')

        if (upploadModal) {
          upploadModal.remove()
        }
      },
    []
  )

  return (
    <HeroImageUploadWrapper>
      {image ? (
        <HeroImage src={image} justifyContent="flex-end" alignItems="flex-end" aspectRatio={5}>
          <Button
            color="tertiary"
            size="small"
            type="button"
            onClick={() => uploader.open()}
            iconLeft={<FaCamera />}
          >
            Edit
          </Button>
        </HeroImage>
      ) : (
        <HeroImageUploadPicker>
          <Button
            type="button"
            onClick={() => uploader.open()}
            color="tertiary"
            isLoading={isLoading}
            size="small"
            iconLeft={<FaCamera />}
            style={{ zIndex: 1 }}
          >
            Add
          </Button>
        </HeroImageUploadPicker>
      )}
    </HeroImageUploadWrapper>
  )
}

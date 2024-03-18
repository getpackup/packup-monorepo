import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Field, Form, Formik } from 'formik'
import { Input } from '@packup/components'
import { FaPlus } from 'react-icons/fa'
import { brandPrimary } from '@packup/styles'
import { ColorPickerInput } from '../../color-picker-input/ColorPickerInput'
import { ItemLabel, LabelColorName, trackEvent } from '@packup/utils'
import { ItemLabelPreview } from './ItemLabelPreview'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { AppState } from '@packup/redux'
import toast from 'react-hot-toast'

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
`

const SubmitButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 10px;

  :hover {
    color: ${brandPrimary};
    transition: color 0.2s ease-in-out;
  }
`

const CreateText = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-left: 5px;
`

type PackingListLabelCreateProps = {
  toggleListHandler: (id?: string) => void
  labelId?: string
}

export const ItemLabelForm: FunctionComponent<PackingListLabelCreateProps> = ({
  toggleListHandler,
  labelId,
}) => {
  const [labelText, setLabelText] = useState('')
  const [labelColor, setLabelColor] = useState(LabelColorName.default)

  const firebase = useFirebase()
  const auth = useSelector((state: AppState) => state.firebase.auth)

  useEffect(() => {
    if (labelId) {
      firebase
        .firestore()
        .collection('users')
        .doc(auth.uid)
        .collection('labels')
        .doc(labelId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data() as ItemLabel
            setLabelText(data.text)
            setLabelColor(data.color as LabelColorName)
          }
        })
    }
  }, [labelId])

  const handleChange = (e: any) => {
    if (e.target.type === 'text') setLabelText(e.target.value)
    if (e.target.type === 'checkbox') setLabelColor(e.target.checked ? e.target.value : LabelColorName.default)
  }

  const handleSubmit = async (values: any, {resetForm, setSubmitting}: any) => {
    resetForm({})
    setSubmitting(true)

    // Handle form submission
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(auth.uid)
        .collection('labels')
        .add({
          text: values.labelText,
          color: values.labelColor
        })

      trackEvent('User Label Created', {
        label: values.labelText,
        color: values.labelColor
      })
    } catch (error) {
      trackEvent('User Label Create Failure', {
        label: values.labelText,
        color: values.labelColor,
        error,
      })
      toast.error('Failed to add label, please try again')
    } finally {
      // Return user to the select list
      setSubmitting(false)
      toggleListHandler()
    }
  }

  const handleUpdate = async (values: any, {resetForm, setSubmitting}: any) => {
    resetForm({})
    setSubmitting(true)

    // Handle form submission
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(auth.uid)
        .collection('labels')
        .doc(labelId)
        .update({
          text: values.labelText,
          color: values.labelColor
        })

      trackEvent('User Label Updated', {
        label: values.labelText,
        color: values.labelColor
      })
    } catch (error) {
      trackEvent('User Label Update Failure', {
        label: values.labelText,
        color: values.labelColor[0],
        error,
      })
      toast.error('Failed to update label, please try again')
    } finally {
      // Return user to the select list
      setSubmitting(false)
      toggleListHandler()
    }
  }

  return (
    <Formik
      initialValues={{
        labelText: labelText,
        labelColor: labelColor
      }}
      onSubmit={labelId ? handleUpdate : handleSubmit}
      enableReinitialize={true}
    >
      {({ handleSubmit, isSubmitting, initialValues }) => (
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <FormWrapper>
            <ItemLabelPreview color={labelColor} text={labelText} />
            <ColorPickerInput disabled={isSubmitting} setColor={setLabelColor} initialValue={initialValues.labelColor} />
            <Field
              as={Input}
              type="text"
              name={`labelText`}
              initialValue={initialValues.labelText}
              label="Label Name"
              hiddenLabel
              disabled={isSubmitting}
              maxLength={32}
            />
            <SubmitButton type={'submit'}>
              <FaPlus />
              <CreateText>{ labelId ? 'Update' : 'Create'}</CreateText>
            </SubmitButton>
          </FormWrapper>
        </Form>
      )}
    </Formik>
  )
}

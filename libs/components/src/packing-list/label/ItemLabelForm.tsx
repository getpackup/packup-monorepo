import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { Field, Form, Formik } from 'formik'
import { Input } from '@packup/components'
import { FaPlus } from 'react-icons/fa'
import { brandPrimary } from '@packup/styles'
import { ColorPickerInput } from '../../color-picker-input/ColorPickerInput'
import { LabelColorName, trackEvent } from '@packup/utils'
import { ItemLabel } from '@packup/common'
import { ItemLabelPreview } from './ItemLabelPreview'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, setGearItemLabels } from '@packup/redux'
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
  toggleListHandler: (label?: ItemLabel) => void
  label?: ItemLabel
}

export const ItemLabelForm: FunctionComponent<PackingListLabelCreateProps> = ({
  toggleListHandler,
  label,
}) => {
  const [labelText, setLabelText] = useState(label?.text ?? '')
  const [labelColor, setLabelColor] = useState(label?.color ?? LabelColorName.default)

  const firebase = useFirebase()
  const auth = useSelector((state: AppState) => state.firebase.auth)

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

      // Adding a new label to Firestore will generate a new ID, so we need to re-fetch labels and update Redux
      // Subscribe to redux store to get new/updated labels

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
      if (!label) throw new Error('Label not found')

      await firebase
        .firestore()
        .collection('users')
        .doc(auth.uid)
        .collection('labels')
        .doc(label.id)
        .update({
          text: values.labelText,
          color: values.labelColor
        })

      // TODO Subscribe to redux store to get new/updated labels

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
      onSubmit={label ? handleUpdate : handleSubmit}
      enableReinitialize={true}
    >
      {({ handleSubmit, isSubmitting, initialValues }) => (
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <FormWrapper>
            <ItemLabelPreview color={labelColor} text={labelText} />
            <ColorPickerInput disabled={isSubmitting} setColor={setLabelColor} initialValue={initialValues.labelColor as LabelColorName} />
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
              <CreateText>{ label?.id ? 'Update' : 'Create'}</CreateText>
            </SubmitButton>
          </FormWrapper>
        </Form>
      )}
    </Formik>
  )
}

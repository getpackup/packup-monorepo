import React, { FormEvent, FunctionComponent, SyntheticEvent, useState } from 'react'
import styled from 'styled-components'
import { Field, Form, Formik } from 'formik'
import { Input } from '@packup/components'
import { FaPlus } from 'react-icons/fa'
import { brandPrimary } from '@packup/styles'
import { ColorPickerInput } from '../color-picker-input/ColorPickerInput'
import { LabelColorName, trackEvent } from '@packup/utils'
import { PackingListLabelPreview } from './PackingListLabelPreview'
import { useFirebase } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '@packup/redux'
import toast from 'react-hot-toast'

type PackingListLabelCreateProps = {
  toggleListHandler: (e?: any) => void
}

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

export const PackingListLabelCreate: FunctionComponent<PackingListLabelCreateProps> = ({
  toggleListHandler
}) => {
  const [labelText, setLabelText] = useState('Label Name')
  const [labelColor, setLabelColor] = useState(LabelColorName.default)

  const firebase = useFirebase()
  const dispatch = useDispatch()
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
      console.log('Form submitted, storing in db')
      console.log(values)

      await firebase
        .firestore()
        .collection('users')
        .doc(auth.uid)
        .update({
          labels: {
            name: values.labelText,
            color: values.labelColor[0]
          }
        })

      trackEvent('User Label Created', {
        label: values.labelText,
        color: values.labelColor[0]
      })
    } catch (error) {
      trackEvent('User Label Create Failure', {
        label: values.labelText,
        color: values.labelColor[0],
        error,
      })
      toast.error('Failed to add item, please try again')
    } finally {
      // Return user to the select list
      setSubmitting(false)
      toggleListHandler()
    }

  }

  return (
    <Formik
      initialValues={{
        labelText: '',
        labelColor: LabelColorName.default
      }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <FormWrapper>
            <PackingListLabelPreview color={labelColor} text={labelText} />
            <ColorPickerInput disabled={isSubmitting} setColor={setLabelColor} />
            <Field
              as={Input}
              type="text"
              name={`labelText`}
              label="Label Name"
              hiddenLabel
              disabled={isSubmitting}
              maxLength={32}
            />
            <SubmitButton type={'submit'}>
              <FaPlus />
              <CreateText>Submit</CreateText>
            </SubmitButton>
          </FormWrapper>
        </Form>
      )}
    </Formik>
  )
}

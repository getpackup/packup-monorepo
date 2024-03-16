import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import styled from 'styled-components'
import { Field, Formik } from 'formik'
import { Input } from '@packup/components'
import { FaPlus } from 'react-icons/fa'
import { brandPrimary } from '@packup/styles'
import { ColorPickerInput } from '../color-picker-input/ColorPickerInput'

type PackingListLabelCreateProps = {
  toggleListHandler: (e: any) => void
}

const Form = styled.form`
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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: any) => {
    // Prevent bubbling and default behaviour
    e.preventDefault()
    setIsSubmitting(!isSubmitting)

    // Handle form submission
    console.log('Form submitted, storing in db')
    console.log(e)

    // Return user to the select list
    toggleListHandler(e)
  }

  return (
    <Formik
      initialValues={{
        labelText: '',
        labelColor: ''
      }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <ColorPickerInput disabled={isSubmitting} />
          <Field
            as={Input}
            type="text"
            name={`new-label`}
            label="Label Name"
            hiddenLabel
            disabled={isSubmitting}
            maxLength={32}
          />
          <SubmitButton type={'submit'} onClick={() => handleSubmit()}>
            <FaPlus />
            <CreateText>Submit</CreateText>
          </SubmitButton>
        </Form>
      )}
    </Formik>
  )
}

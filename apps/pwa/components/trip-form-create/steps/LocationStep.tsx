import { baseSpacer } from '@packup/styles'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

import { Button, FlexContainer, Heading, Input } from '../../index'

export default function LocationStep(props: any) {
  const {
    formField: { startingPoint, name },
    formValues,
    setFieldTouched,
    setFieldValue,
  } = props

  const [isEditing, setIsEditing] = useState(formValues[startingPoint.name] === '')

  useEffect(() => {
    // Set title to starting point if it's not already set
    if (formValues[startingPoint.name]) {
      setFieldValue(name.name, `Trip to ${formValues[startingPoint.name]}`)
      setIsEditing(false)
    }
  }, [formValues])

  return (
    <>
      <Heading altStyle as="h3">
        Where are you headed?
      </Heading>

      {isEditing ? (
        <Field
          as={Input}
          type="geosuggest"
          types={[]}
          name={startingPoint.name}
          label={startingPoint.label}
          hiddenLabel
          value={formValues[startingPoint.name]}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
          required
        />
      ) : (
        <FlexContainer justifyContent="space-between" alignItems="flex-start">
          <div style={{ flex: 1, marginRight: baseSpacer }}>
            {/* @ts-ignore */}
            <Input
              type="text"
              name={startingPoint.name}
              hiddenLabel
              value={formValues[name.name]}
              label="Going to"
              disabled
            />
          </div>
          <Button type="button" onClick={() => setIsEditing(true)} color="tertiary">
            <FaPencilAlt />
          </Button>
        </FlexContainer>
      )}
    </>
  )
}

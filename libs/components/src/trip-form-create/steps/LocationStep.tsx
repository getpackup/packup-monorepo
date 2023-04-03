import { Field } from 'formik'
import React, { useEffect } from 'react'
import { Column, Heading, Input, Row } from '@packup/components'

export default function LocationStep(props: any) {
  const {
    formField: { startingPoint, name },
    formValues,
    setFieldTouched,
    setFieldValue,
  } = props;

  useEffect(() => {
    // Set title to starting point if it's not already set
    if (formValues[name.name].length === 0) {
      setFieldValue(name.name, `Trip to ${formValues[startingPoint.name]}`)
    }
  }, [formValues])

  return (
    <>
      <Row>
        <Column xs={8} xsOffset={2}>
          <Heading as={'h3'}>Where are you headed?</Heading>
        </Column>
      </Row>
      <Row>
        <Column xs={8} xsOffset={2}>
          <Field
            as={Input}
            type="geosuggest"
            types={[]}
            name={startingPoint.name}
            label={startingPoint.label}
            hiddenLabel
            value={formValues.startingPoint}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            required
          />
        </Column>
      </Row>
    </>
  );
}

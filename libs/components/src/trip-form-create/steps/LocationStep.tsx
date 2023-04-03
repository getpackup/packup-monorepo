import { Field } from 'formik'
import React, { useEffect } from 'react'
import { Column, Heading, Input, Row } from '@packup/components'

export default function LocationStep(props: any) {
  const {
    formField: { startingPoint, lat, lng, name },
    formValues,
    setFieldTouched,
    setFieldValue,
  } = props;

  useEffect(() => {
    if (formValues[startingPoint.name]) {
      setFieldValue(startingPoint.name, formValues[startingPoint.name])
      setFieldTouched(startingPoint.name)
    }

    // Set title to starting point if it's not already set
    if (formValues[name.name].length === 0) {
      setFieldValue(name.name, formValues[startingPoint.name])
    }

    if (formValues[lat.name]) {
      setFieldValue(lat.name, formValues[lat.name])
      setFieldTouched(lat.name)
    }

    if (formValues[lng.name]) {
      setFieldValue(lng.name, formValues[lng.name])
      setFieldTouched(lng.name)
    }
  }, [formValues])

  return (
    <>
      <Row>
        <Column xs={8} xsOffset={2}>
          <Heading>Where are you headed?</Heading>
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

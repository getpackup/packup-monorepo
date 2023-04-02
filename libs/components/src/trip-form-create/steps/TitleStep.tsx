import { Column, Heading, Input, Row } from '@packup/components'
import { Field } from 'formik';
import React, { useEffect } from 'react'

export default function TitleStep(props: any) {
  const {
    formField: { name },
    formValues,
    setFieldTouched,
    setFieldValue,
  } = props;

  return (
    <>
      <Row>
        <Column xs={8} xsOffset={2}>
          <Heading>Trip Name</Heading>
        </Column>
      </Row>
      <Row>
        <Column xs={8} xsOffset={2}>
          <Field
            as={Input}
            type="text"
            name={name.name}
            label={name.label}
            value={formValues.name}
            required
            autoComplete="off"
            maxLength={50}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
          />
        </Column>
      </Row>
    </>
  );
}

import React from 'react';
import { Column, DayPickerInput, Heading, Row } from '@packup/components'

export default function DateStep(props: any) {
  const {
    formValues,
    setFieldValue,
    setFieldTouched,
  } = props;

  return (
    <>
      <Row>
        <Column xs={8} xsOffset={2}>
          <Heading as={'h3'}>When are you going?</Heading>
        </Column>
      </Row>
      <Row>
        <Column xs={8} xsOffset={2}>
          <DayPickerInput
            label="Trip Date"
            hiddenLabel
            initialValues=""
            values={formValues}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
        </Column>
      </Row>
    </>
  );
}

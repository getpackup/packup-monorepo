import React from 'react';
import { Column, DayPickerInput, Row } from '@packup/components'

export default function DateStep(props: any) {
  const {
    // formField: { tripDate },
    formValues,
    setFieldValue,
    setFieldTouched,
  } = props;

  return (
      <Row>
        <Column xs={8} xsOffset={2}>
          <DayPickerInput
            label="Trip Date"
            initialValues=""
            values={formValues}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
        </Column>
      </Row>
  );
}

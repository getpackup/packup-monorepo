import { DayPickerInput, Heading } from '@packup/components'

export default function DateStep(props: any) {
  const { formValues, setFieldValue, setFieldTouched } = props

  return (
    <>
      <Heading altStyle as="h3">
        When are you going?
      </Heading>

      <DayPickerInput
        label="Trip Date"
        hiddenLabel
        initialValues=""
        values={formValues}
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
      />
    </>
  )
}

import { Heading, Input } from '@packup/components'
import { Field } from 'formik'

export default function TitleStep(props: any) {
  const {
    formField: { name },
    formValues,
    setFieldTouched,
    setFieldValue,
  } = props

  return (
    <>
      <Heading altStyle as="h3">
        What do you want to call this adventure?
      </Heading>

      <Field
        as={Input}
        type="text"
        name={name.name}
        label={name.label}
        hiddenLabel
        value={formValues.name}
        required
        autoComplete="off"
        maxLength={50}
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValue}
      />
    </>
  )
}

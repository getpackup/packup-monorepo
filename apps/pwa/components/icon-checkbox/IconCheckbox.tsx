import { baseSpacer, tripleSpacer, fontSizeXSmall } from '@packup/styles'
import { FieldMetaProps, FormikHelpers, useField } from 'formik'
import { FunctionComponent } from 'react'
import { IconType } from 'react-icons'
import styled from 'styled-components'

type IconCheckboxProps = {
  id?: string
  name: string
  checked?: boolean
  icon: IconType
  label?: string
  onChange: () => void
} & FieldMetaProps<string> &
  FormikHelpers<string>

const HiddenCheckboxInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  display: none;
`

export const IconWrapperLabel = styled.label<{
  checked?: boolean
}>`
  text-align: center;
  cursor: pointer;
  padding: ${baseSpacer};
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const IconCheckboxLabel = styled.span`
  display: block;
  text-transform: uppercase;
  font-weight: bold;
  font-size: ${fontSizeXSmall};
  line-height: 1.2;
  margin: ${baseSpacer} 0;
  color: ${(props: { checked?: boolean }) =>
    props.checked ? 'var(--color-primary)' : 'var(--color-text)'};
`

export const IconCheckbox: FunctionComponent<IconCheckboxProps> = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField<string>(props.name)

  const Icon = props.icon

  return (
    <>
      <HiddenCheckboxInput
        type="checkbox"
        {...field}
        {...props}
        {...meta}
        id={props.name}
        checked={props.checked}
        onChange={props.onChange}
      />
      <IconWrapperLabel htmlFor={props.name} checked={props.checked}>
        <Icon
          color={props.checked ? 'var(--color-primary' : 'var(--color-lightGray'}
          size={tripleSpacer}
        />
        {props.label && (
          <IconCheckboxLabel checked={props.checked}>{props.label}</IconCheckboxLabel>
        )}
      </IconWrapperLabel>
    </>
  )
}

export default IconCheckbox

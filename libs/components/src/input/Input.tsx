import Image from 'next/legacy/image'
import 'react-geosuggest/module/geosuggest.css'

import {
  brandDangerRGB,
  brandPrimaryRGB,
  brandSuccess,
  lightGray,
  baseBorderStyle,
  disabledStyle,
  visuallyHiddenStyle,
  baseAndAHalfSpacer,
  baseSpacer,
  borderRadius,
  doubleSpacer,
  halfSpacer,
  inputHeight,
  inputPaddingX,
  inputPaddingY,
  quadrupleSpacer,
  quarterSpacer,
  sextupleSpacer,
  fontSizeH6,
  fontSizeSmall,
  lineHeightBase,
} from '@packup/styles'
import { formatPhoneNumberValue } from '@packup/utils'
import { FieldMetaProps, FormikHelpers, useField } from 'formik'
import { FunctionComponent, useEffect, useState } from 'react'
import Geosuggest, { QueryType, Suggest } from 'react-geosuggest'
import { FaCheckCircle, FaEye, FaEyeSlash, FaRegCircle } from 'react-icons/fa'
import NumericInput from 'react-numeric-input'
import Select, { CommonProps } from 'react-select'
import styled, { css } from 'styled-components'

import { LoadingSpinner } from '..'

interface OptionType {
  label: string
  value: string
}

type InputProps = {
  disabled?: boolean
  id?: string
  name: string
  square?: boolean
  hiddenLabel?: boolean
  type: string
  label: string | JSX.Element
  helpText?: string | JSX.Element
  checked?: boolean
  options?: OptionType[]
  required?: boolean
  loadOptions?: () => void
  defaultOptions?: OptionType[] | boolean
  components?: any
  geosuggestTypes?: QueryType[]
  placeholder?: string
  noMarginOnWrapper?: boolean
} & FieldMetaProps<string> &
  FormikHelpers<string> &
  CommonProps<OptionType | OptionType[], boolean, any>

export const sharedStyles = css`
  display: block;
  width: 100%;
  height: ${inputHeight};
  padding: ${inputPaddingY} ${inputPaddingX};
  /* helps prevent zooming when inputs are focused on mobile safari to have it be above 16px */
  /* https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone */
  font-size: ${fontSizeH6};
  line-height: ${lineHeightBase};
  color: var(--color-text);
  background-color: var(--color-background);
  background-image: none;
  border: ${baseBorderStyle};
  border-radius: ${borderRadius};
  transition: border-color 0.2s ease-in-out;

  ${(meta: FieldMetaProps<string>) =>
    meta &&
    meta.touched &&
    meta.error &&
    `
      border-color: var(--color-danger);
      border-width: 2px;
      box-shadow: 0 0 0 ${borderRadius} rgba(${brandDangerRGB},.25);
  `}

  &:focus {
    border-color: var(--color-primary);
    border-width: 2px;
    outline: 0;
    box-shadow: 0 0 0 ${borderRadius} rgba(${brandPrimaryRGB}, 0.25);
  }

  /* Disabled state */
  ${(props: InputProps) => props.disabled && disabledStyle}
`

export const StyledInput = styled.input<any>`
  ${sharedStyles}
`

const StyledTextarea = styled.textarea`
  resize: none;
  min-height: ${`${Number(inputHeight.replace('px', '')) * 2}px`};
  ${sharedStyles}
`

const StyledErrorMessage = styled.div`
  background-color: var(--color-danger);
  position: absolute;
  color: var(--color-textLight);
  right: 0;
  top: 0;
  border-radius: 0 ${borderRadius} 0 ${borderRadius};
  padding: 0 ${halfSpacer};
  font-size: ${fontSizeSmall};
  z-index: 1;
`

const StyledSelect = styled(Select)`
  & > div:first-of-type {
    ${(props: { invalid?: boolean }) =>
      props.invalid &&
      `
      box-shadow: 0 0 0 ${borderRadius} rgba(${brandDangerRGB},.25);
      border: 2px solid var(--color-danger);
  `}
  }
`

export const InputWrapper = styled.div`
  margin-bottom: ${(props: { noMarginOnWrapper?: boolean; hidden?: boolean }) =>
    props.noMarginOnWrapper ? 0 : baseSpacer};
  text-align: left;
  position: relative;
  ${(props) => props.hidden && `display: none;`}
  & .tooltip {
    padding: 0 ${halfSpacer};
  }
`

const StyledGeosuggest = styled(Geosuggest)<any>`
  &.geosuggest {
    position: relative;
    width: 100%;
    margin: 0;
  }
  & .geosuggest__input {
    box-shadow: none;
    ${sharedStyles}
  }
  & .geosuggest__suggests {
    background: var(--color-background);
    color: var(--color-text);
    border: 2px solid var(--color-primary);
    box-shadow: 0 0 0 ${borderRadius} rgba(${brandPrimaryRGB}, 0.25);
  }
  & .geosuggest__suggests.geosuggest__suggests--hidden {
    border: none;
    box-shadow: none;
  }
  & .geosuggest__item:hover {
    background: var(--color-backgroundAlt);
  }
  & .geosuggest__item--active {
    background: var(--color-primary);
  }
`

export const StyledLabel = styled.label<{
  hiddenLabel?: boolean
  invalid?: boolean
  required?: boolean
  ariaLabel?: string
}>`
  display: flex;
  line-height: 1.75;
  margin: 0;
  font-weight: bold;
  font-size: ${fontSizeSmall};
  text-transform: uppercase;
  ${(props) => props.hiddenLabel && visuallyHiddenStyle}
  ${(props) =>
    props.invalid &&
    `
    color: var(--color-danger);
  `}
  ${(props) =>
    props.required &&
    `
    &:after {
      content: '*';
      color: var(--color-danger);
      padding-left: ${quarterSpacer};
    }
  `}
`

const StyledToggle = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  &:checked + label {
    background: var(--color-success);
  }
  &:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
`

const StyledToggleLabel = styled.label<{
  checked?: boolean
  disabled?: boolean
}>`
  cursor: pointer;
  width: ${sextupleSpacer};
  height: 42px;
  background: ${lightGray};
  display: inline-block;
  border-radius: 42px;
  position: relative;
  margin: 0;

  &:after {
    content: ' ';
    position: absolute;
    top: 5px;
    left: 5px;
    width: ${doubleSpacer};
    height: ${doubleSpacer};
    border-radius: ${doubleSpacer};
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${fontSizeSmall};
    background: ${(props) =>
      props.checked ? 'var(--color-background)' : 'var(--color-background)'};
  }

  /* Disabled state */
  ${(props) => props.disabled && disabledStyle}
`

const PasswordWrapper = styled.div`
  position: relative;
`

const PasswordToggle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: ${quadrupleSpacer};
  height: ${inputHeight};
  background: var(--color-backgroundAlt);
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${baseBorderStyle};
  padding: 0 ${quarterSpacer};
  border-radius: 0 ${borderRadius} ${borderRadius} 0;
`

const StyledNumericInputWrapper = styled.div`
  & .react-numeric-input {
    background: var(--color-background);
    border-radius: ${borderRadius};
    width: 100%;
    height: ${inputHeight};
    position: relative;
    display: block;
  }
  & input {
    background: var(--color-background);
    border-radius: ${borderRadius};
    width: 100%;
    color: var(--color-text);
    border: ${baseBorderStyle};
    display: block;
    height: ${inputHeight};
    padding: 0 ${inputHeight};
    text-align: center;
    font-size: ${fontSizeH6};
  }
  & input:focus {
    outline: none;
    border-color: var(--color-primary);
    border-width: 2px;
    box-shadow: 0 0 0 ${borderRadius} rgba(${brandPrimaryRGB}, 0.25);
  }
  & b {
    cursor: pointer;
    position: absolute;
    top: 2px;
    height: 46px;
    width: 46px;
    background-color: var(--color-backgroundAlt);
    border-radius: ${borderRadius};
    color: var(--color-text);
  }
  & b:hover {
    background-color: var(--color-backgroundTertiary);
  }
  & b:nth-of-type(1) {
    right: 2px;
  }
  & b:nth-of-type(2) {
    left: 2px;
  }
  & b i:nth-child(1) {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 2px;
    background: var(--color-text);
    margin: -1px 0px 0px -5px;
  }
  & b i:nth-child(2) {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 10px;
    background: var(--color-text);
    margin: -5px 0px 0px -1px;
  }
`

export const multiSelectStyles = {
  option: (provided: any, state: { isFocused: boolean }) => ({
    ...provided,
    color: 'var(--color-text)',
    backgroundColor: state.isFocused
      ? 'var(--color-backgroundTertiary)'
      : 'var(--color-background)',
    width: 'auto',
    '&:active': {
      backgroundColor: `rgba(${brandPrimaryRGB}, .25)`,
    },
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    color: 'var(--color-text)',
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    background: 'var(--color-text)',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: 'var(--color-text)',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'var(--color-text)',
  }),
  control: (provided: any, state: { isFocused: boolean }) => ({
    ...provided,
    minHeight: inputHeight,
    fontSize: '1.1em', // 1em makes it slightly smaller than 16px at smaller viewports, causing a zoom issue
    lineHeight: lineHeightBase,
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-background)',
    border: state.isFocused ? `2px solid var(--color-primary)` : baseBorderStyle,
    boxShadow: state.isFocused ? `0 0 0 ${borderRadius} rgba(${brandPrimaryRGB}, 0.25)` : 'none',
    '&:hover': {
      border: state.isFocused ? `2px solid var(--color-primary)` : baseBorderStyle,
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: 'var(--color-backgroundTertiary)',
    color: 'var(--color-text)',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: 'var(--color-text)',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    '&:hover': {
      backgroundColor: 'var(--color-danger)',
      color: 'var(--color-background)',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: 'var(--color-textLight)',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: 'var(--color-background)',
  }),
}

export const Input: FunctionComponent<InputProps> = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField<string>(props.name)
  // state for toggling password visibility
  const [passwordVisibility, setPasswordVisibiility] = useState(false)

  let inputTypeToRender

  useEffect(() => {
    // Override react-numeric-input type
    if (props.type === 'number') {
      const input = document.querySelector('.react-numeric-input input')
      // eslint-disable-next-line no-unused-expressions
      input?.setAttribute('type', 'number')
    }
  }, [props.type])

  switch (props.type) {
    case 'number':
      inputTypeToRender = (
        <StyledNumericInputWrapper>
          <NumericInput
            mobile
            strict
            step={1}
            min={1}
            max={99}
            // eslint-disable-next-line react/style-prop-object
            style={false}
            id={props.name}
            value={props.value}
            onChange={(value) => props.setFieldValue(field.name, Number(value))}
          />
        </StyledNumericInputWrapper>
      )
      break
    case 'select':
      {
        const onChange = (option: OptionType[] | OptionType) => {
          props.setFieldValue(
            field.name,
            // eslint-disable-next-line no-nested-ternary
            props.isMulti
              ? option
                ? (option as OptionType[]).map((item: OptionType) => item.value)
                : []
              : (option as OptionType).value
          )
        }

        const setValue = (value: string | Array<string>) => {
          return props.isMulti
            ? (value as Array<string>).map((item) =>
                props.options.find((option) => option.value === item)
              )
            : props.options.find((option) => option.value === value)
        }

        inputTypeToRender = (
          <StyledSelect
            className="react-select"
            styles={multiSelectStyles}
            isMulti={props.isMulti}
            menuPlacement="auto"
            value={setValue(field.value)}
            options={props.options}
            name={props.name}
            onChange={(option: unknown) => onChange(option as OptionType)}
            onBlur={() => props.setFieldTouched(props.name)}
            isDisabled={props.disabled}
            invalid={Boolean(meta && meta.touched && meta.error)}
          />
        )
      }
      break
    case 'checkbox':
      {
        const iconStyles = {
          flexShrink: 0,
          cursor: 'pointer',
          marginRight: halfSpacer,
        }
        const renderCheckbox = (checked: boolean) =>
          checked ? (
            <FaCheckCircle color={brandSuccess} size={baseAndAHalfSpacer} style={iconStyles} />
          ) : (
            <FaRegCircle size={baseAndAHalfSpacer} style={iconStyles} />
          )
        inputTypeToRender = (
          <>
            <StyledLabel
              htmlFor={props.id || props.name}
              ariaLabel={typeof props.label === 'string' ? props.label : undefined}
            >
              <StyledToggle
                {...field}
                {...props}
                {...meta}
                id={props.name}
                checked={props.checked}
                type="checkbox"
              />

              {renderCheckbox(Boolean(props.checked))}
              {props.label}
            </StyledLabel>
          </>
        )
      }
      break
    case 'toggle':
      inputTypeToRender = (
        <>
          <StyledLabel
            htmlFor={props.id || props.name}
            ariaLabel={typeof props.label === 'string' ? props.label : undefined}
          >
            {props.label}
          </StyledLabel>
          <StyledToggle
            {...field}
            {...props}
            {...meta}
            id={props.name}
            checked={props.checked}
            type="checkbox"
          />
          <StyledToggleLabel
            htmlFor={props.name}
            disabled={props.disabled}
            checked={props.checked}
          />
        </>
      )
      break
    case 'tel':
      inputTypeToRender = (
        <StyledInput
          id={props.name}
          placeholder={typeof props.label === 'string' ? props.label : ''}
          {...field}
          {...props}
          {...meta}
          ariaDescribedby={`${props.name}-error-id`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(event.target.name)(formatPhoneNumberValue(event.target.value))
          }}
        />
      )
      break
    case 'username':
      inputTypeToRender = (
        <StyledInput
          id={props.name}
          maxLength={30}
          placeholder={typeof props.label === 'string' ? props.label : ''}
          {...field}
          {...props}
          {...meta}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.key === ' ') {
              event.preventDefault()
            }
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(event.target.name)(event.target.value.replace(/\s/g, '').toLowerCase())
          }}
        />
      )

      break
    case 'password':
      inputTypeToRender = (
        <PasswordWrapper>
          <StyledInput
            placeholder={typeof props.label === 'string' ? props.label : ''}
            id={props.name}
            {...field}
            {...props}
            {...meta}
          />
          <PasswordToggle onClick={() => setPasswordVisibiility(!passwordVisibility)}>
            {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
          </PasswordToggle>
          {passwordVisibility && field.value.length > 0 && (
            <span style={{ marginLeft: baseSpacer }}>{field.value}</span>
          )}
        </PasswordWrapper>
      )
      break
    case 'textarea':
      inputTypeToRender = (
        <StyledTextarea
          id={props.name}
          placeholder={typeof props.label === 'string' ? props.label : ''}
          rows={2}
          {...field}
          {...props}
          {...meta}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              // stops form from being submitted if user hits enter key
              event.stopPropagation()
            }
          }}
        />
      )
      break
    case 'geosuggest':
      inputTypeToRender = (
        <>
          {typeof window !== 'undefined' && window.google ? (
            <StyledGeosuggest
              types={props.geosuggestTypes || []}
              onSuggestSelect={(suggest: Suggest) => {
                if (suggest && suggest.location) {
                  props.setFieldValue('lat', suggest.location.lat)
                  props.setFieldValue('lng', suggest.location.lng)
                }

                return suggest && suggest.label
                  ? props.setFieldValue(field.name, suggest.label)
                  : props.setFieldValue(field.name, '')
              }}
              id={props.name}
              {...field}
              {...props}
              {...meta}
              // https://github.com/ubilabs/react-geosuggest#placedetailfields
              // don't return any place fields to keep billing costs down
              placeDetailFields={[]}
              onBlur={() => props.setFieldTouched(props.name)}
              minLength={3}
              label=""
            />
          ) : (
            <>
              <StyledInput
                placeholder="Search places"
                id={props.name}
                {...field}
                {...props}
                {...meta}
                disabled
              />
              <small>
                <LoadingSpinner theme="dark" /> Loading Google Maps...
              </small>
            </>
          )}
          <p style={{ margin: 0, textAlign: 'right' }}>
            <Image
              src="/images/powered_by_google_on_white.png"
              alt="powered by Google"
              height={18}
              width={144}
            />
          </p>
        </>
      )
      break
    case 'hidden':
      inputTypeToRender = <StyledInput id={props.name} {...field} {...props} {...meta} />
      break
    default:
      inputTypeToRender = (
        <StyledInput
          placeholder={typeof props.label === 'string' ? props.label : ''}
          id={props.name}
          {...field}
          {...props}
          {...meta}
        />
      )
      break
  }
  return (
    <InputWrapper hidden={props.type === 'hidden'} noMarginOnWrapper={props.noMarginOnWrapper}>
      {props.label && props.type !== 'toggle' && props.type !== 'checkbox' && (
        <StyledLabel
          htmlFor={props.id || props.name}
          hiddenLabel={props.hiddenLabel}
          invalid={meta && meta.touched && meta.error != null}
          required={props.required || false}
          ariaLabel={typeof props.label === 'string' ? props.label : undefined}
        >
          {props.label}
        </StyledLabel>
      )}
      {inputTypeToRender}
      {props.helpText && <small>{props.helpText}</small>}
      {meta && meta.touched && meta.error && !props.square && (
        <StyledErrorMessage id={`${props.name}-error-id`}>{meta.error}</StyledErrorMessage>
      )}
    </InputWrapper>
  )
}

export default Input

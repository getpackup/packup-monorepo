import { multiSelectStyles } from '@packup/components'
import { useState, useEffect } from 'react'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { AppState } from '@packup/redux'
import Select from 'react-select'
import styled from 'styled-components'
import {
  brandDangerRGB,
  borderRadius,
} from '@packup/styles'

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

const fieldName = 'preferences.weightUnit'

type Option = { value: string; label: string }

export const PreferredWeightUnit = () => {
  const firebase = useFirebase()
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const profile = useSelector((state: AppState) => state.firebase.profile)
  const [unit, setUnit] = useState(profile && profile.preferences?.weightUnit || '')

  useEffect(() => {
    if (auth && auth.uid && unit) {
      firebase
        .firestore()
        .collection('users')
        .doc(auth.uid)
        .update({
          [fieldName]: unit,
        })
    }
  }, [unit])

  const options: Array<Option> = [
    { value: 'g', label: 'Grams (g)' },
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'oz', label: 'Ounces (oz)' },
    { value: 'lb', label: 'Pounds (lb)' },
  ]

  const setValue = (value: string | Array<string>) => {
    return options.find((option) => option.value === value)
  }

  return (
    <>
      <StyledSelect
        className="react-select"
        styles={multiSelectStyles}
        isMulti={false}
        menuPlacement="auto"
        value={setValue(unit)}
        onChange={(option: unknown) => {
          const selectedOption = option as Option | null
          if (selectedOption) {
            setUnit(selectedOption.value)
          }
        }}
        options={options}
        name={fieldName}
      />
      <small>This will be used when displaying item weights in your trips</small>
    </>
  )
}

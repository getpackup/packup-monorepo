import 'react-day-picker/dist/style.css'
import { Alert, Button, StyledLabel } from '@getpackup-group/components'
import {
  baseBorderStyle,
  baseSpacer,
  borderRadius,
  doubleSpacer,
  brandPrimary,
  brandPrimaryRGB,
  textColor,
  white,
} from '@getpackup-group/styles'
import format from 'date-fns/format'
import { FunctionComponent, useEffect, useState } from 'react'
import { DayPicker, DateRange, addToRange, isDateBeforeType } from 'react-day-picker'
import styled from 'styled-components'

type DayPickerInputProps = {
  initialValues: any
  values: any
  setFieldValue: (field: string, value: any) => void
  setFieldTouched: (field: string) => void
  label: string
  hiddenLabel?: boolean
}

const DayPickerInputWrapper = styled.div`
  margin-bottom: ${baseSpacer};
  background-color: ${white};
  border: ${baseBorderStyle};
  border-radius: ${borderRadius};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${baseSpacer};

  & .rdp {
    margin: ${baseSpacer} auto;
    display: flex;
    justify-content: center;
    --rdp-accent-color: ${brandPrimary};
    --rdp-background-color: rgba(${brandPrimaryRGB}, 0.25);
    --rdp-outline: 2px solid ${brandPrimary};
    --rdp-outline-selected: 2px solid rgba(0, 0, 0, 0.75);
  }
`

export const DayPickerInput: FunctionComponent<DayPickerInputProps> = ({
  initialValues,
  values,
  setFieldTouched,
  setFieldValue,
  label,
  hiddenLabel,
}) => {
  const dateFormat = 'MM/dd/yyyy'

  const [range, setRange] = useState<DateRange | undefined>(undefined)

  useEffect(() => {
    if (range?.from) {
      setFieldTouched('startDate')
      setFieldValue('startDate', format(range.from, dateFormat))
    }
    if (range?.to) {
      setFieldTouched('endDate')
      setFieldValue('endDate', format(range.to, dateFormat))
    } else if (!range?.to && range?.from) {
      setFieldValue('startDate', undefined)
      setFieldValue('endDate', undefined)
    }
  }, [range])

  return (
    <>
      {!hiddenLabel && <StyledLabel required>{label}</StyledLabel>}
      <DayPickerInputWrapper>
        <DayPicker
          mode="range"
          defaultMonth={initialValues.startDate ? new Date(initialValues.startDate) : new Date()}
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          fromDate={new Date()}
        />
        {!range?.from && !range?.to && (
          <Alert type="info" message="Please select the first day of the trip." />
        )}
        {range?.from && !range?.to && (
          <Alert
            type="info"
            message="Please select the last day of the trip, or same day again for a Day Trip."
          />
        )}
        {range?.from && range?.to && initialValues.startDate !== values.startDate && (
          <Button
            type="button"
            color="tertiary"
            size="small"
            onClick={() => {
              setRange(undefined)
            }}
          >
            Reset
          </Button>
        )}
      </DayPickerInputWrapper>
    </>
  )
}

export default DayPickerInput

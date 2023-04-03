import 'react-day-picker/dist/style.css'
import { Alert, Button, StyledLabel } from '@packup/components'
import {
  baseBorderStyle,
  baseSpacer,
  borderRadius,
  brandPrimary,
  brandPrimaryRGB,
  screenSizes,
} from '@packup/styles'
import format from 'date-fns/format'
import { FunctionComponent, useEffect, useState } from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import styled from 'styled-components'
import { useWindowSize } from '@packup/hooks'

type DayPickerInputProps = {
  initialValues: any
  values: any
  setFieldValue: (field: string, value: string | undefined) => void
  setFieldTouched: (field: string) => void
  label: string
  hiddenLabel?: boolean
}

const DayPickerInputWrapper = styled.div`
  margin-bottom: ${baseSpacer};
  background-color: var(--color-background);
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

  // Create date range with values set previously in this form
  const initialRange: DateRange | undefined = {
    from: values.startDate ? new Date(values.startDate) : undefined,
    to: values.endDate ? new Date(values.endDate) : undefined,
  }

  const [range, setRange] = useState<DateRange | undefined>(initialRange)

  useEffect(() => {
    // If field is not set, best to indicate that as well
    if (range?.from) {
      setFieldTouched('startDate')
      setFieldValue('startDate', format(range.from, dateFormat))
    } else {
      setFieldValue('startDate', undefined)
    }

    if (range?.to) {
      setFieldTouched('endDate')
      setFieldValue('endDate', format(range.to, dateFormat))
    } else {
      setFieldValue('endDate', undefined)
    }
  }, [range])

  const windowSize = useWindowSize()

  return (
    <>
      {!hiddenLabel && <StyledLabel required>{label}</StyledLabel>}
      <DayPickerInputWrapper>
        <DayPicker
          mode="range"
          defaultMonth={initialValues.startDate ? new Date(initialValues.startDate) : new Date()}
          selected={range}
          onSelect={setRange}
          numberOfMonths={
            windowSize && windowSize.width && windowSize.width < screenSizes.medium ? 1 : 2
          }
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
              // Reset values since useEffect will not fire
              setFieldValue('startDate', undefined)
              setFieldValue('endDate', undefined)
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

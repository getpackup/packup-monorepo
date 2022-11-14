import { Button, FlexContainer, FormErrors, HorizontalRule } from '@getpackup-group/components'
import { trackEvent } from '@getpackup-group/utils'
import { useFormikContext } from 'formik'
import React, { FunctionComponent, useState } from 'react'

type EditableInputProps = {
  label: string
  isLoading: boolean
  value: string | JSX.Element
  actionName?: string
  children: React.ReactNode
}

export const EditableInput: FunctionComponent<EditableInputProps> = ({
  label,
  isLoading,
  value,
  children,
  actionName,
}) => {
  // Manage the state whether to show the label or the input. By default, label will be shown.
  const [isEditing, setIsEditing] = useState(false)
  const { isSubmitting, isValid, dirty, submitForm, errors } = useFormikContext()

  return (
    <section>
      <FlexContainer justifyContent="space-between">
        <p>
          <strong>{label}</strong>
        </p>
        <p>
          <Button
            type="button"
            color="text"
            onClick={() => {
              trackEvent(`EditableInput - ${isEditing ? 'Cancel' : 'Edit'} ${label} Clicked`, {
                label,
                value,
              })
              setIsEditing(!isEditing)
            }}
          >
            {isEditing ? 'Cancel' : actionName || 'Edit'}
          </Button>
        </p>
      </FlexContainer>

      {isEditing ? (
        <div>
          {children}
          <FormErrors dirty={dirty} errors={errors} />
          <Button
            type="button"
            color="success"
            onClick={() => {
              submitForm().then(
                () => {
                  setIsEditing(!isEditing)
                },
                () => {
                  setIsEditing(!isEditing)
                }
              )
            }}
            isLoading={isLoading}
            disabled={isSubmitting || !isValid || isLoading}
          >
            Save
          </Button>
        </div>
      ) : (
        <>{typeof value === 'string' ? <p>{value}</p> : value}</>
      )}
      <HorizontalRule />
    </section>
  )
}
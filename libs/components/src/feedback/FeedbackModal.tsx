import { Button, Column, Heading, Input, Modal, Row } from '@packup/components'
import {
  brandTertiaryHover,
  white,
  zIndexFeedbackButton,
  breakpoints,
  tripleSpacer,
} from '@packup/styles'
import { postFormUrlEncoded } from '@packup/utils'
import { requiredField } from '@packup/utils'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { FaBullhorn, FaCheck, FaTimes } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { toast } from 'react-hot-toast'
import { useLoggedInUser } from '@packup/hooks'

const FeedbackLink = styled.div`
  position: fixed;
  top: calc(6px + env(safe-area-inset-top));
  right: 4px;
  width: ${tripleSpacer};
  height: ${tripleSpacer};
  border-radius: ${tripleSpacer};
  color: ${white};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: ${zIndexFeedbackButton};

  &:hover {
    background-color: ${brandTertiaryHover};
  }

  @media only screen and (min-width: ${breakpoints.md}) {
    top: calc(72px + env(safe-area-inset-top));
    background-color: var(--color-info);
  }
`

export const FeedbackModal = () => {
  const activeLoggedInUser = useLoggedInUser()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [sent, setSent] = useState(false)

  if (!activeLoggedInUser) {
    return null
  }

  return (
    <>
      <FeedbackLink
        onClick={() => setModalIsOpen(true)}
        data-tip="Leave Feedback"
        data-for="feedback"
      >
        <FaBullhorn />
        <ReactTooltip
          id="feedback"
          place="left"
          type="dark"
          effect="solid"
          className="tooltip customTooltip"
          delayShow={500}
        />
      </FeedbackLink>
      <Modal
        toggleModal={() => {
          setModalIsOpen(false)
        }}
        isOpen={modalIsOpen}
      >
        <Formik
          validateOnMount
          initialValues={{
            email: activeLoggedInUser?.email || '',
            displayName: activeLoggedInUser?.displayName || '',
            page: window.location?.pathname || '',
            liked: '',
            disliked: '',
            differently: '',
            missing: '',
            message: '',
          }}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            postFormUrlEncoded('feedback', values)
              .then(() => {
                setSent(true)
                setTimeout(() => {
                  setSent(false)
                  setModalIsOpen(false)
                }, 10000)
                setSubmitting(false)
                resetForm()
              })
              .catch((err: any) => {
                toast.error(err.message)
              })
          }}
        >
          {({ isSubmitting, isValid, values }) => (
            <Form name="feedback" method="post" netlify-honeypot="bot-field" data-netlify="true">
              <input type="hidden" name="form-name" value="feedback" />
              <input type="hidden" name="email" value={values.email} />
              <input type="hidden" name="displayName" value={values.displayName} />
              <input type="hidden" name="page" value={values.page} />
              {sent ? (
                <>
                  <Heading as="h2">Success! We got your message</Heading>
                  <p>We really appreciate you taking the time to send us this valuable feedback!</p>
                  <p>With love,</p>
                  <Heading as="h4" altStyle>
                    Taylor, Mack, &amp; Tony 😘
                  </Heading>
                  <Button
                    type="button"
                    onClick={() => setModalIsOpen(false)}
                    iconLeft={<FaTimes />}
                    block
                    color="text"
                  >
                    Close
                  </Button>
                </>
              ) : (
                <>
                  <Heading>Got feedback for us?</Heading>
                  <p>
                    The only way we can make packup better is with your help! Please let us know
                    what you think.
                  </p>
                  <Field
                    as={Input}
                    type="textarea"
                    name="message"
                    label="What are your thoughts?"
                    validate={requiredField}
                    required
                    placeholder="Don't hold back, let us know what is on your mind"
                  />
                  <Row>
                    <Column xs={6}>
                      <Button
                        type="button"
                        onClick={() => {
                          setModalIsOpen(false)
                        }}
                        color="dangerOutline"
                        block
                      >
                        Cancel
                      </Button>
                    </Column>
                    <Column xs={6}>
                      <Button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        block
                        color="success"
                        iconLeft={<FaCheck />}
                      >
                        Send
                      </Button>
                    </Column>
                  </Row>
                </>
              )}
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

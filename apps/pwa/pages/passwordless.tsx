import {
  Box,
  Button,
  Column,
  Heading,
  HorizontalRule,
  PageContainer,
  Row,
} from '@packup/components'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

const Paragraph = styled.p`
  max-width: 65ch;
`

export default function Passwordless() {
  return (
    <PageContainer>
      <Head>
        <title>Passwordless Login Explained | Packup</title>
      </Head>
      <Box>
        <Row>
          <Column md={8} mdOffset={2}>
            <Heading>What is Passwordless Login?</Heading>
            <HorizontalRule />
            <Paragraph
              style={{
                fontSize: '1.5rem',
              }}
            >
              Passwordless login is a method of authenticating into your account without having to
              use a password.{' '}
              <strong>
                Instead of having to remember your password, you only need access to your email!
              </strong>
            </Paragraph>
            <HorizontalRule />
            <Paragraph>
              One of the main benefits of passwordless authentication is convenience. With
              passwordless authentication, you don&apos;t need to remember a password or worry about
              forgetting it. This can save you time and hassle, especially if you have many
              different accounts that require passwords.
            </Paragraph>
            <Paragraph>
              Another benefit is improved security. Passwords can be easy to guess or crack,
              particularly if they are not complex enough or are reused across multiple accounts. By
              using passwordless authentication, you eliminate the risk of someone guessing or
              stealing your password. Instead, the authentication process relies on something unique
              to you, your email address and account, which is much harder for a hacker to gain
              access to.
            </Paragraph>
            <Paragraph>
              Overall, passwordless authentication is a more convenient and secure way to log into
              your various online accounts. By not using a social login, we are one less website you
              have to worry about being comprimised.
            </Paragraph>
            <HorizontalRule />
            <Heading as="h2">🤔 Ok, but how does it actually work?</Heading>
            <Paragraph>
              It&apos;s really quite simple: you enter your email address on the{' '}
              <Link href="/login">Login page</Link>, we send you an email with a &ldquo;magic
              link&rdquo;, you click on that link in your email, and you will be brought back to the
              app and automagically signed in ✨
            </Paragraph>

            <HorizontalRule />
            <Paragraph
              style={{
                fontSize: '1.5rem',
              }}
            >
              At Packup, we take security very seriously, even though we don&apos;t require a ton of
              personal information about you. By moving to passwordless login, we are helping keep
              your overall online security as high as possible! 🎉
            </Paragraph>
            <HorizontalRule />
            <Button type="link" to="/login">
              Back to Login
            </Button>
          </Column>
        </Row>
      </Box>
    </PageContainer>
  )
}

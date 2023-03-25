import Link from 'next/link'
import { FunctionComponent } from 'react'

interface RelativeOrExternalLinkProps {
  to: string
  onClick?: () => void
  children: any
}

export const RelativeOrExternalLink: FunctionComponent<RelativeOrExternalLinkProps> = ({
  children,
  to,
  onClick,
  ...other
}) => {
  // This assumes that any internal link (intended for Next)
  // will start with exactly one slash, and that anything else is external.
  const internal = /packupapp.com/.test(to) || /^\/(?!\/)/.test(to)
  // Use NextJs Link for internal links, and <a> for others
  if (internal) {
    return (
      <Link href={to}>
        <a onClick={onClick} {...other}>
          {children}
        </a>
      </Link>
    )
  }
  return (
    <a href={to} onClick={onClick} {...other}>
      {children}
    </a>
  )
}

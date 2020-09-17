import { ReactElement } from "react"
import Link from "next/link"

interface HrefOption {
  pathname: string
  query?: { [key: string]: string }
}

export const PageLink = ({
  href,
  children,
}: {
  href: string | HrefOption
  children: ReactElement
}) => {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}

import { ReactElement } from "react"
import Link from "next/link"

export const PageLink = ({
  href,
  children,
}: {
  href: string
  children: ReactElement
}) => {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}

export const BACKEND_URL = "http://localhost:6245"

export const PostLink = (props) => (
  <li>
    <Link href='/p/[id]' as={`/p/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
)

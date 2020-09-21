export const BACKEND_URL = "http://localhost:6245"

export const PostLink = (props) => (
  <Link href='/post/[id]' as={`/post/${props.id}`}>
    <a>{props.id}</a>
  </Link>
)

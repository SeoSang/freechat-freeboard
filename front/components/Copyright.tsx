import { Typography, Link } from "@material-ui/core"

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © SeoSang "}
      {new Date().getFullYear()}
      {"."}
      <br />
      <Link
        color='inherit'
        href='https://programming119.tistory.com/'
        target='_blank'>
        블로그 : 개발자 아저씨들 힘을모아
      </Link>{" "}
    </Typography>
  )
}

export default Copyright

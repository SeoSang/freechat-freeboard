import { observer } from "mobx-react"
import React, { useEffect } from "react"
import { PageLink } from "../components/PageLink"
import { useStore } from "../stores"

const posts = () => {
  const { postStore } = useStore()

  useEffect(() => {
    postStore.getPosts()
  }, [])

  console.log(postStore.posts)

  return (
    <div>
      {postStore.posts.map((p) => (
        <PageLink key={`${p.id}`} href={{ pathname: `/post`, query: { id: p.id?.toString() } }}>
          <div>
            <label>{p.id}</label>
            <h3>{p.title}</h3>
          </div>
        </PageLink>
      ))}
      <ul>테스트중</ul>
    </div>
  )
}

export default observer(posts)

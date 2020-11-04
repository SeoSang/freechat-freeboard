import React from "react"

const TakeThisBoard = () => {
  return (
    <div className='gradient-border' id='box'>
      <h2>Take This</h2>
      <ul className='takethis-list'>
        <li>
          <a href='https://i-am-seo-sang.vercel.app/games' target='_blank'>
            Game
          </a>
        </li>
        <li>
          <a href='https://sports-dodo.vercel.app/' target='_blank'>
            Sports-DoDo
          </a>
        </li>
        <li>
          <a href='https://programming119.tistory.com/' target='_blank'>
            Blog
          </a>
        </li>
        <li>
          <a href='https://github.com/SeoSang' target='_blank'>
            GitHub
          </a>
        </li>
        <li>
          <a href='https://i-am-seo-sang.vercel.app/profile' target='_blank'>
            Who are you?
          </a>
        </li>
      </ul>
    </div>
  )
}

export default TakeThisBoard

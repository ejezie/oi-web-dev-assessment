import React from 'react'
import SearchBar from '../components/home/search-bar/search-bar'
import Posts from '../components/posts/Post'

const Home = () => {
  return (
    <div>
      <SearchBar/>
      <Posts />
    </div>
  )
}

export default Home
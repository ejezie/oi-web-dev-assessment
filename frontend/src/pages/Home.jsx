import React from 'react'
import SearchBar from '../components/home/search-bar/search-bar'
import Posts from '../components/posts/Post'
import Login from '../components/login/Login'
import Register from '../components/register/Register'
import Header from '../components/header/Header'

const Home = () => {
  return (
    <div>
      <Header/>
      <SearchBar/>
      <Posts />
    </div>
  )
}

export default Home
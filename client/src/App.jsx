import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/states/AZ',
      element: <LocationEvents index="AZ" />
    },
    {
      path: '/states/CA',
      element: <LocationEvents index="CA" />
    },
    {
      path: '/states/FL',
      element: <LocationEvents index="FL" />
    },
    {
      path: '/states/TX',
      element: <LocationEvents index="TX" />
    },
    {
      path: '/events',
      element: <Events />
    }
  ])

  return (
    <div className='font-sans'>

      <header className='main-header pb-14 w-full shadow-lg border-b'>
        <h1>FindMyMeet</h1>

        <div className='header-buttons space-x-4'>
          <Link to='/' role='button' className='transform transition-transform duration-300 hover:scale-110'>Home</Link>
          <Link to='/events' role='button' className='transform transition-transform duration-300 hover:scale-110'>Events</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App
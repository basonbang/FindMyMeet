import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import CreateCustomMeet from './pages/CreateCustomMeet'
import CustomMeetDetails from './pages/CustomMeetDetails'
import CustomMeets from './pages/CustomMeets'
import EditCustomMeet from './pages/EditCustomMeet'
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
      path: '/meets',
      element: <Events />
    }, 
    {
      path: '/custom-meets',
      element: <CustomMeets />
    },
    {
      path: '/custom-meets/:id',
      element: <CustomMeetDetails />
    },
    {
      path: '/custom-meets/create',
      element: <CreateCustomMeet />
    },
    {
      path: '/custom-meets/edit/:id',
      element: <EditCustomMeet />
    }
  ])

  return (
    <div className='font-sans'>

      <header className='main-header pb-14 w-full shadow-lg border-b flex items-center'>
        <div className='flex '>
          <h1>FindMyMeet</h1>
          <img src='/app-icon.png' className='h-20 w-auto'></img>
        </div>

        <div className='header-buttons space-x-4'>
          <Link to='/' role='button' className='transform transition-transform duration-300 hover:scale-110'>Home</Link>
          <Link to='/meets' role='button' className='transform transition-transform duration-300 hover:scale-110'>Meets</Link>
          <Link to='/custom-meets' role='button' className='transform transition-transform duration-300 hover:scale-110'>Custom Meets</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App
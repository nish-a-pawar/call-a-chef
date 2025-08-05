import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col items-center jusifty-center h-full'>
        <h1 className='text-7xl mb-4'>👨‍🍳</h1>
     <h1 className='text-3xl font-bold mb-4'> Welcome to call a Chef </h1>
     <p>Browse delicious home -cooked meals from local chefs near you!</p>
     <button className='btn btn-secondary my-5'>View Meals</button>

     <h3 className='text-primary'>Become a chef </h3>
    </div>
  )
}

export default Home

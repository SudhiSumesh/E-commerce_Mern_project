import React from 'react'
import axios from 'axios'
function MyOders() {

  const getOrders=async()=>{
    const {data}=await axios.get()
  }
  return (
    <div>
      Here You can see Yor Orders
    </div>
  )
}

export default MyOders

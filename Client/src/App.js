import React from 'react'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <>
    <Outlet/>
    </>
  )
}

export default AppLayout
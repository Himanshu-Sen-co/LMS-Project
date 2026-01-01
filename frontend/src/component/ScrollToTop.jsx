import React, { use, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const pathName = useLocation()


  useEffect(() => {
    window.scrollTo({top:0, behavior:"smooth"})
  }, [pathName])

  return (
    <></>
  )
}

export default ScrollToTop
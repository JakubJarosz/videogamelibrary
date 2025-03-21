import React from 'react'
import {useSelector} from "react-redux"

const GlobalError = () => {
    const error = useSelector((state) => state.auth.error)

    if(!error) return null
  return (
    <div>
      <div>{error}</div>
    </div>
  )
}

export default GlobalError

import React from 'react'
import logoImage from './img.png'
function Logo({width = '100px'}) {
  return (
      <div><img src={logoImage} alt="Company Logo" width={width}/></div>
  )
}

export default Logo
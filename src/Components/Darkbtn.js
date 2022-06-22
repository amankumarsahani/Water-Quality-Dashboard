import React from 'react'

export default function Darkbtn(props) {
  return (
    <div className='dark-button' data-theme={props.mode}>
      <button className='dk' onClick={props.switchTheme}></button>
    </div>
  )
}
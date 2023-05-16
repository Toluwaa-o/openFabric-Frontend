import React from 'react'

export default function Modal(props) {
  return (
    <div onClick={props.clickHandler ? props.clickHandler : null} className='modal'></div>
  )
}

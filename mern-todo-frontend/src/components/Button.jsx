import React from 'react'

function Button(props) {
  return (
    <div onClick={props.fn} className={`
 text-white 
     rounded-[6px] text-sm  items-center cursor-pointer justify-center flex ${props.classes}`}>{props.title}</div>
  )
}

export default Button
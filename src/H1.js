import React from 'react'
export function H1(props) {
  return <h1 style={{marginBottom: 0, marginTop: 0, ...props.style}}>
    {props.children}
  </h1>
}

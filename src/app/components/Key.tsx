'use client'
import { useState } from "react"

export const Keys = () => {
  const [v, sV] = useState([1, 2])
  return <><div>{v.map((i, index) => (<Key key={index} />))}</div> <button onClick={() => {
    sV([Math.random(), ...v])
  }}>shift</button></>
}

export const Key = () => {
  const [v, sV] = useState('');
  return <div>{v} <button onClick={() => {
    sV(v + '1')
  }} >click</button></div>
}
'use client'
import { useState } from "react"

export const MultipleSetstate = () => {
  const [data, setData] = useState([{ a: 1, b: '1' }])

  const onClick = () => {
    const data1 = { ...data[0], a: data[0].a + 1 }
    const data2 = { ...data[0], b: data[0].b + '1' }
    setData([data1])
    setData([data2])
  }
  console.log('render:', data)

  return <>result: {JSON.stringify(data)}<button onClick={onClick}>click me</button></>
}
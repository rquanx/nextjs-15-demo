'use client'

export default function Hello() {
  return <button onClick={async () => {
    const res = await fetch('api')
    const data = await res.json()
    console.log(data)
  }}>click</button>
}
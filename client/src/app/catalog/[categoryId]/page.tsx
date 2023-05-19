"use client"
import { useStateReset } from '@/hooks'
import React from 'react'

const Categories = () => {
  useStateReset()
  return (
    <div className="bg-black w-24 aspect-square">
      <img src="/23.svg" />
    </div>
    
  )
}

export default Categories
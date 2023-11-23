import React from 'react'
import { ButtonProps } from '@/types'

interface PrimaryButtonProps extends ButtonProps {
  type?: "button" | "submit" | "reset";
}
export const PrimaryButton = ({ action, text, type }: PrimaryButtonProps) => {
  return (
    <button
    type={type}
    onClick={action}
    className="w-full border py-3 px-6 uppercase bg-blue-400 rounded-md text-white font-sans font-bold hover:bg-blue-500 focus:bg-blue-500 transition-all text-sm max-w-max"
  >
    {text}
  </button>
  )
}

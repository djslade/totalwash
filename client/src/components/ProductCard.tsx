"use client"
import { useNavigate } from '@/hooks'
import { Product } from '@/types'
import React from 'react'

export const ProductCard = ({
    product,
}: {
    product:Product,
}) => {
  const navigate = useNavigate()

  const handleMoreDetailsClick = () => {
    navigate(`/catalog/products/${product.slug}`)
  }
  return (
      <div className="p-3 hover:border border-gray-500 rounded-md flex flex-col justify-between">
        <button onClick={handleMoreDetailsClick}>
          <img className="w-full aspect-square object-cover"src={product.photos[0]}/>
          <div className="w-full text-ellipsis line-clamp-3">
            <h2 className="font-bold my-3">{product.name}</h2>
          </div>
        </button>
        <div className="">
          <div className="mb-3">
            {!product.isOnSale ?
            <span>{`£${product.currentPrice}`}</span>
            :
            <>
                <span className="line-through">{`£${product.fullPrice}`}</span>
                <span className="text-blue-500">{` £${product.currentPrice}`}</span>
            </>  
            }
          </div>
          <div className="flex sm:flex-row gap-3 my-6 flex-col text-sm">
            <button
            className="flex-1 border py-3 uppercase bg-white text-gray-900 rounded-md border-gray-500 font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90"
            onClick={handleMoreDetailsClick}>More Details</button>
            <button className="flex-1 border py-3 uppercase bg-blue-500 rounded-md text-white font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">Add to Cart</button>
          </div>
        </div>
      </div>
  )
}

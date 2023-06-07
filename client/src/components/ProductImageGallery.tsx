"use client"
import { Product } from '@/types'
import { useState } from 'react'
import { BiCircle } from 'react-icons/bi'
import { AiTwotoneCheckCircle } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from '@/store'

export const ProductImageGallery = ({
    product,
}: {
    product: Product,
}) => {
    const snap = useSnapshot(state)

    const [currentPhoto, setCurrentPhoto] = useState<string>(product.photos[0])

    const handleImageChange = (photoSrc:string) => {
        setCurrentPhoto(photoSrc)
    }

    const handleOpenModal = () => {
        state.showImageGallery = true
        state.currentGalleryPhoto = currentPhoto
        state.currentProduct = product
    }

    return (
        <div className="flex-1 p-3">
            <button className="w-full" onClick={handleOpenModal}>
                <img className="w-full"src={currentPhoto}/>
            </button>
            <div className="flex w-full gap-3 text-2xl py-3">
            <div className="hidden grid-cols-6 gap-3 sm:grid">
                {product.photos.map((photo) =>
                <button
                onClick={() => handleImageChange(photo)}
                key={photo}
                className={`w-full pb-3 hover:border-b border-gray-300 ${photo === currentPhoto? "border-b !border-gray-900" : ""}`}>
                    <img className="w-full aspect-square object-cover" src={photo} alt={product.name}/>
                </button>)}
            </div>
            <div className="sm:hidden text-sm flex w-full gap-1 justify-center">
                {product.photos.map((photo) =>
                <button
                key={photo}
                onClick={() => handleImageChange(photo)}
                >{currentPhoto === photo ? <AiTwotoneCheckCircle /> : <BiCircle />}</button>
                )}
            </div>
            </div>
        </div>
    )
}

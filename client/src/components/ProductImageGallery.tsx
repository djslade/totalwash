"use client";
import { Product } from "@/types";
import { useState } from "react";
import { BiCircle } from "react-icons/bi";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { ImageGalleryModal } from "./ImageGalleryModal";
import { AnimatePresence } from "framer-motion";
import { LazyImage } from "./LazyImage";

export const ProductImageGallery = ({ product }: { product: Product }) => {
  const [currentPhoto, setCurrentPhoto] = useState<string>(product.photos[0]);

  const handleImageChange = (photoSrc: string) => {
    setCurrentPhoto(photoSrc);
  };

  const [showGallery, setShowGallery] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowGallery(true);
  };

  const handleCloseModal = () => {
    setShowGallery(false);
  };

  return (
    <>
      <div className="flex-1 p-3">
        <button className="w-full" onClick={handleOpenModal}>
          <LazyImage classNames="w-full" source={currentPhoto} alt={product.name} />
        </button>
        <div className="flex w-full gap-3 text-2xl py-3">
          <div className="hidden grid-cols-6 gap-3 sm:grid">
            {product.photos.map((photo) => (
              <button
                onClick={() => handleImageChange(photo)}
                key={photo}
                className={`w-full pb-3 hover:border-b border-gray-300 ${
                  photo === currentPhoto ? "border-b !border-gray-900" : ""
                }`}
              >
                <LazyImage
                  classNames="w-full aspect-square object-cover"
                  source={photo}
                  alt={product.name}
                />
              </button>
            ))}
          </div>
          <div className="sm:hidden text-sm flex w-full gap-1 justify-center">
            {product.photos.map((photo) => (
              <button key={photo} onClick={() => handleImageChange(photo)}>
                {currentPhoto === photo ? (
                  <AiTwotoneCheckCircle />
                ) : (
                  <BiCircle />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showGallery && (
          <ImageGalleryModal
            onClose={handleCloseModal}
            currentProduct={product}
            startingPhoto={currentPhoto}
          />
        )}
      </AnimatePresence>
    </>
  );
};

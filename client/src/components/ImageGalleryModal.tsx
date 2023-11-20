"use client";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from "react-icons/ai";
import { ModalPortal } from "./ModalPortal";
import { useEscapeModal, useOutsideClick } from "@/hooks";
import { ModalBackdrop } from "./ModalBackdrop";
import { motion } from "framer-motion";
import FocusLock from "react-focus-lock";
import { Product } from "@/types";
import { useState } from "react";
import { LazyImage } from "./LazyImage";

interface ImageGalleryModalProps {
  onClose: () => void;
  currentProduct: Product;
  startingPhoto: string;
}
export const ImageGalleryModal = ({
  onClose,
  currentProduct,
  startingPhoto,
}: ImageGalleryModalProps) => {
  const [currentGalleryPhoto, setCurrentGalleryPhoto] =
    useState<string>(startingPhoto);

  const handleImageChange = (photo: string) => {
    setCurrentGalleryPhoto(photo);
  };

  const handlePreviousPhotoClick = () => {
    const currentIndex = currentProduct.photos.indexOf(currentGalleryPhoto);
    const targetIndex =
      currentIndex === 0 ? currentProduct.photos.length - 1 : currentIndex - 1;
    setCurrentGalleryPhoto(currentProduct.photos[targetIndex]);
  };

  const handleNextPhotoClick = () => {
    const currentIndex = currentProduct.photos.indexOf(currentGalleryPhoto);
    const targetIndex =
      currentIndex === currentProduct.photos.length - 1 ? 0 : currentIndex + 1;
    setCurrentGalleryPhoto(currentProduct.photos[targetIndex]);
  };

  const handleCloseGallery = () => {
    onClose();
  };

  const modalRef = useOutsideClick(handleCloseGallery);

  useEscapeModal(handleCloseGallery);

  return (
    <ModalPortal>
      <FocusLock>
        <ModalBackdrop onClick={onClose} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`z-[100] top-0 left-0 right-0 bottom-0 flex justify-center items-center fixed`}
        >
          <div
            className="flex flex-col p-6 h-full items-center gap-3 justify-center"
            ref={modalRef}
          >
            <button
              className="absolute text-gray-50 top-5 right-5 text-4xl"
              onClick={handleCloseGallery}
            >
              <AiOutlineClose />
            </button>
            <div className="max-w-xl flex justify-center">
              <button
                onClick={handlePreviousPhotoClick}
                className="text-gray-50 text-4xl absolute left-3 top-1/2 -translate-y-1/2"
              >
                <AiOutlineLeft />
              </button>
              <LazyImage source={currentGalleryPhoto} classNames="w-full" />
              <button
                onClick={handleNextPhotoClick}
                className="text-gray-50 text-4xl absolute right-3 top-1/2 -translate-y-1/2"
              >
                <AiOutlineRight />
              </button>
            </div>
            <div className="text-gray-50">
              <h2>{currentProduct.name}</h2>
            </div>
            <div className="grid-cols-6 gap-3 grid max-w-xl">
              {currentProduct.photos.map((photo) => (
                <button
                  onClick={() => handleImageChange(photo)}
                  key={photo}
                  className={`w-full pb-3 hover:border-b border-gray-300  ${
                    photo === currentGalleryPhoto
                      ? "border-b !border-gray-50"
                      : ""
                  }`}
                >
                  <LazyImage
                    classNames="w-full aspect-square object-cover"
                    source={photo}
                    alt={currentProduct.name}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </FocusLock>
    </ModalPortal>
  );
};

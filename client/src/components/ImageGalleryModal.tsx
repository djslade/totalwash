"use client"
import { state } from "@/store"
import { useSnapshot } from "valtio"

export const ImageGalleryModal = () => {
    const snap = useSnapshot(state)

    return (
        <>
            <div className={`z-[100] top-0 left-0 right-0 bottom-0 bg-black opacity-90 ${snap.showImageGallery ? 'fixed' : 'hidden'}`}></div>
            <div className="hidden z-[100] max-w-2xl max-h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fixed">
                <img src={snap.currentGalleryPhoto} className="w-[80%]"/>
                <button className="fixed top-3 right-3 text-white z-[100]">CLOSE</button>
            </div>
            
            
        </>
    )
}

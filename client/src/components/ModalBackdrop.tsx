import React from "react"
import { motion } from "framer-motion"

export const ModalBackdrop = ({
    onClick
}: {
    onClick: () => void
}) => {
    return (
        <motion.div
        key="backdrop"
        className="absolute top-0 left-0 h-full w-full bg-[#000000e1] opacity-50 flex items-center justify-center z-[100]"
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} />

    )
}

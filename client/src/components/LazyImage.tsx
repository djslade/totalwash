"use client"
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
    source: string;
    classNames: string;
    alt?: string;
}

export const LazyImage = ({ source, classNames, alt }: Props) => {
    const [imageSrc, setImageSrc] = useState<string>("")

    const { ref, inView } = useInView()

    
    useEffect(() => {
        if (imageSrc === "" && inView) {
            setImageSrc(source)
        }
    }, [])

    useEffect(() => {
        if (imageSrc === "" && inView) {
            setImageSrc(source)
        }
    }, [inView])

    return (
        <img ref={ref} className={classNames} src={imageSrc} alt={alt || "Image"} />
    )
}

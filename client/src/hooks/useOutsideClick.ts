import { useRef, useEffect } from "react"

export const useOutsideClick = (callback:Function) => {
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleOutsideClick = (evt:MouseEvent) => {
            if (!elementRef || !elementRef.current) return
            const target = evt.target as Node
            if (!elementRef.current.contains(target)) {
                callback()
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [])

    return elementRef
}

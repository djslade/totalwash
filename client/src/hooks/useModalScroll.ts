import { useEffect } from "react"

export const useModalScroll = () => {
    useEffect(() => {
        const body = document.body
        body.classList.add('overflow-hidden')

        return () => body.classList.remove('overflow-hidden')
    }, [])
}

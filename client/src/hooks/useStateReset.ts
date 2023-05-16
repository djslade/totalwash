import { state } from "@/store"
import { useEffect } from "react"
import { useSnapshot } from "valtio"

export const useStateReset = () => {
    const snap = useSnapshot(state)

    useEffect(() => {
        state.showCartSidebar = false
        state.showNavSidebar = false
    }, [])
}

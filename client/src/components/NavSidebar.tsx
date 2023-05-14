import { state } from "@/store"
import { useSnapshot } from "valtio"

export const NavSidebar = () => {
    const snap = useSnapshot(state)

    return (
        <div>Hi</div>
    )
}

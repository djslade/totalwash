import { state } from "@/store"
import { useSnapshot } from "valtio"

export const NavSidebar = () => {
    const snap = useSnapshot(state)

    return (
        <>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-10 z-10 w-0"/>
            <div>
                <nav>

                </nav>
            </div>
        </>
    )
}

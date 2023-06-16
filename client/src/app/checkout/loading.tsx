import React from 'react'
import { PulseLoader } from 'react-spinners'

const loading = () => {
    return (
        <main className="mx-auto max-w-screen-lg w-screen h-screen flex justify-center items-center p-3">
            <PulseLoader size={24}/>
        </main>
    )
}

export default loading
import React from 'react'

function LoadingCom() {
    return (
        <div className="flex justify-center items-center max-h-screen">

            <div className="flex space-x-2 animate-pulse">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
                <div className="w-4 h-4 bg-blue-900 rounded-full"></div>
            </div>

        </div>
    )
}

export default LoadingCom
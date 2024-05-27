import React from 'react'
import logo from './img/psumooc-logoDashboard-White.svg';

function LoadingPage() {


    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-900">

            <img src={logo} className='scale-50 flex space-x-2 animate-pulse' />

            {/* <div className="flex space-x-2 animate-pulse">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-700 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-900 rounded-full"></div>
            </div> */}


        </div>
    )
}

export default LoadingPage
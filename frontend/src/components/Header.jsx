import React from 'react'

const Header = () => {
    return (
        <header className="w-full px-6 py-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-700">

            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left logo */}
                <div className="flex items-center gap-2">
                    <span className="text-3xl font-extrabold tracking-wide text-white">
                        Game<span className="text-purple-500">X</span>
                    </span>
                </div>
            </div>

        </header>
    )
}

export default Header

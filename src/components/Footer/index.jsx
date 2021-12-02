import React from 'react'

function Footer() {
    return (
        <footer id="footer" className=" w-full h-32 bg-gray-100 static bottom-0 py-5">
            <div className="text-center sm:flex sm:justify-evenly">
                <div className="text-pBlue font-bold"><a className="hover:underline" href="https://github.com/volkankaraali" target="_blank">github.com/volkankaraali</a></div>
                <div className="text-pBlue font-bold"><a className="hover:underline" href="https://www.coingecko.com/" target="_blank">api provider coingecko.com</a></div>
            </div>
        </footer>
    )
}

export default Footer

import { Select } from '@chakra-ui/select';
import React from 'react'
import { Link } from 'react-router-dom';

import { useCoin } from '../../context/CoinContext';
function Nav() {

    const { setCurrency, currencies } = useCoin();


    const handleChange = (e) => {
        setCurrency(e.target.value)
    }


    return (
        <header className="bg-pBlue p-3 ">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="text-gray-100 self-center mr-5 "> <Link to="/" className="hover:underline">Home</Link> </div>
                    <div className="text-gray-100 self-center mr-5 "> <a className="hover:underline" href="#footer">Contact</a> </div>
                    <div className="">

                        <Select w={"5.2rem"} h={"2rem"} onChange={handleChange} bg="#ff">
                            {
                                Object.keys(currencies).map((e, i) => (<option key={i} value={e} >{e.toUpperCase()}</option>))
                            }
                        </Select>
                    </div>
                </div>

                {/* <div className="flex" >
                    <div className="menu ml-5 my-auto">
                        <ul className=" flex">
                            <a href="#footer"><li className="px-3 mr-1 text-pGray hover:underline font-bold">Contact</li></a>
                        </ul>
                    </div>
                </div>

                <div className="currency ml-auto my-auto text-pBlue font-bold">

                    <Select w={"5rem"} h={"2rem"} onChange={handleChange} bg="#ff">
                        {
                            Object.keys(currencies).map((e, i) => (<option key={i} value={e} >{e.toUpperCase()}</option>))
                        }
                        <option value="usd" defaultValue>USD</option>
                        <option value="eur">EUR</option>
                        <option value="try">TRY</option>
                    </Select>
                </div> */}

            </div>
        </header>
    )
}

export default Nav

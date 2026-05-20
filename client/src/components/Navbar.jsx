import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import logo from "../assets/logo.png"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../App'
import { useNavigate } from "react-router-dom"


function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const credit = userData.credits
    const username = userData.name.slice(0, 1).toUpperCase()
    const [showCredit, setShowCredit] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const showCreditHandler = () => {
        setShowCredit((showCredit) => !showCredit); setShowProfile(false)
    }
    const dispatch = useDispatch()
    const handleSignout = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            navigate("/auth")

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='relavtive z-20 mx-6 mt-6
    rounded-2xl
    bg-gradient-to-br from-black/80 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_22px_55px_rgba(0,0,0,0,.75)] flex items-center justify-between px-8 py-4'>

            <div className='flex items-center gap-3'>
                <img src={logo} alt="ExmaNotes" className='w-9 h-9 ' />
                <span className='text-lg hidden md:block font-semibold text-white '>Cognivault
                    <span className='text-gray-400 ml-1'>AI</span>
                </span>
            </div>

            <div className='flex items-center gap-6 relative'>
                <div className='relative'>
                    <motion.div onClick={showCreditHandler}
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }} className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer'>

                        <span className='text-xl'>💎</span>
                        <span >{credit}</span>
                        {/* <span >{username}</span> */}
                        <motion.span
                            whileHover={{ scale: 1.5 }}
                            whileTap={{ scale: 0.97 }}
                            className='ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold'
                        >➕</motion.span>

                    </motion.div>

                    <AnimatePresence>
                        {showCredit && (
                            <motion.div
                                key="credit-box"
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 10, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-4 w-64 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/10 shadow-lg p-4 text-sm text-white"
                            >
                                <h4 className='font-semibold mb-2 '>Buy Credits</h4>
                                <p className='text-sm text-gray-300 mb-4'>USe credits yo generate AI notes, diagram & PDFs. </p>
                                <button onClick={() => {
                                    setShowCredit(false)
                                    navigate("/Pricing")
                                }} className='w-full py-2 rounded-lg bg-gradient-to-br from-white to-gray-200 text-black font-semibold  hover:opacity-90  cursor-pointer '>Buy More Credits</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <motion.div
                    onClick={() => { setShowProfile(!showProfile); setShowCredit(false) }}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer"
                >
                    <span>{username}</span>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                key="profile-box"
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 10, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full right-0 mt-4 w-64 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/10 shadow-lg p-4 text-sm text-white z-50"
                            >
                                <Menuitem
                                    text="History"
                                    onClick={() => {
                                        setShowProfile(false);
                                        navigate("/history");
                                    }}
                                />
                                <Menuitem text="Sign out" red
                                    onClick={handleSignout} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>



        </motion.div>
    )
}
function Menuitem({ onClick, text, red }) {
    return (
        <motion.div onClick={onClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-4 py-2 rounded-lg cursor-pointer ${red ? "bg-red-500 text-white" : "bg-white/10 text-white"}`}>
            {text}
        </motion.div>
    );
}

export default Navbar
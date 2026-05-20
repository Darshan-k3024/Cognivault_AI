import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react"
import { auth, provider } from '../utils/fireBase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from '../App';
import axios from 'axios';
function Auth() {
    const dispatch = useDispatch();

    const handleGoogleSignIn = async () => {
        // Implement Google Sign-In logic here
        try {
            const response = await signInWithPopup(auth, provider);

            const Name = response.user.displayName;
            const Email = response.user.email;
            const result = await axios.post(
                serverUrl + "/api/auth/register",
                {
                    name: Name,
                    email: Email
                },
                {
                    withCredentials: true
                }
            )


            dispatch(setUserData(result.data))

            console.log("User Info:", { Name, Email });
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    }
    return (
        <div className='min-h-screen overflow-hidden bg-white text-black px8'>
            <motion.header
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='max-w-7xl mx-auto mt-8
        rounded-2xl
        bg-black/80 background-blur-xl
        border border-white/10
        px-8 py-6
        shadow-[0_20px_45px_rgba(0,0,0,0.6)] '>

                <h1 className='text-2xl  font-bold
            bg-linear-to-r from-white via-gray-300 to-white
            bg-clip-text text-transparent'>Cognivault AI</h1>

                <p className='text-shadow-2xs text-amber-50 '>AI-powered exam-oriented notes & revision</p>
            </motion.header>
            <main className='max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
                {/* Left-contend */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5 }}>
                    <h1 className='text-5xl font-bold mb-4 '>Unlock Smart </h1>
                    <h1 className='text-5xl font-bold mb-4'>Ai Notes </h1>
                    <motion.button
                        onClick={handleGoogleSignIn}

                        whileHover={{
                            scale: 1.08,
                            y: -3,
                            cursor: "pointer",
                        }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative flex items-center justify-center gap-3 px-6 py-3 
             bg-[#2a2a2a] text-white border border-gray-600 
             rounded-xl overflow-hidden group"
                    >
                        {/* Glow effect (adjusted for dark UI) */}
                        <span className="absolute inset-0 bg-gradient-to-r 
                   from-blue-500/30 via-purple-500/30 to-pink-500/30 
                   opacity-0 group-hover:opacity-100 
                   blur-xl transition duration-500">
                        </span>

                        {/* Icon animation */}
                        <motion.span
                            whileHover={{ rotate: 12, scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative z-10"
                        >
                            <FcGoogle size={22} />
                        </motion.span>

                        <span className="relative z-10 font-medium tracking-wide">
                            Continue with Google
                        </span>
                    </motion.button>
                    <p className=' mt-6 max-w-xl text-lg
                    bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent'>You get <span className='font-semibold'>100 FREE credits</span> to create exam notes,projects notes, charts,graphs and dowonload clean PDFs -instantly using AI.</p>
                    <p className=''>Start with 100 free credits + upgrade anytime for more credits + Instant access</p>



                </motion.div>


                {/* Right-div */}
                <div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                        <Feature
                            icon="🎁"
                            title="100 Free Credits"
                            description="Start with 100 credits to generate notes without paying."
                        />

                        <Feature
                            icon="📘"
                            title="Exam Notes"
                            description="High-yield, revision-ready exam-oriented notes."
                        />

                        <Feature
                            icon="📁"
                            title="Project Notes"
                            description="Well-structured documentation for assignments & projects."
                        />

                        <Feature
                            icon="📊"
                            title="Charts & Graphs"
                            description="Auto-generated diagrams, charts and flow graphs."
                        />

                        <Feature
                            icon="⬇️"
                            title="Free PDF Download"
                            description="Download clean, printable PDFs instantly."
                        />

                    </div>
                </div>

            </main>
        </div>
    )
}
function Feature({ title, icon, description }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className='group relative rounded-2xl p-6 
                       bg-gradient-to-br from-black/90 via-black/80 to-black/90 
                       backdrop-blur-2xl border border-white/10 
                       shadow-[0_30px_80px_rgba(0,0,0,0.7)] text-white 
                       
                    
                       transition-all duration-300 cursor-pointer
                       hover:-translate-y-2 hover:scale-[1.03] 
                       hover:shadow-[0_40px_100px_rgba(0,0,0,0.9)] 
                       hover:border-white/20'

            style={{ transform: "preserve-3d" }}
        >

            <div className='absolute inset-0 rounded-2xl 
                            bg-gradient-to-br from-white/10 to-transparent 
                            opacity-0 group-hover:opacity-100 
                            transition-opacity pointer-events-none' />

            <div className='relative z-10' style={{ transform: "translateZ(30px)" }}>

                <div className='text-4xl mb-3 transition-transform duration-300 group-hover:scale-110'>
                    {icon}
                </div>

                <h3 className='text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-indigo-400'>
                    {title}
                </h3>

                <p className='text-gray-300 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-200'>
                    {description}
                </p>

            </div>

        </motion.div>
    );
}

export default Auth
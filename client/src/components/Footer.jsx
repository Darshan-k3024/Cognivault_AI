import { motion } from 'motion/react'
import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import { serverUrl } from '../App'
function Footer() {

     const dispatch = useDispatch();
       const handleSignout = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            navigate("/auth")

        } catch (err) {
            console.log(err)
        }
    }
    
    const handleGoogleSignIn = async () => {
        // Implement Google Sign-In logic here
        try {
            const response = await signInWithPopup(auth, provider);
        
            const Name = response.user.displayName;
            const Email = response.user.email;
            const result = await axios.post(serverUrl + "/api/auth/register", { name: Name, email: Email })
            
            
            dispatch(setUserData(result.data))
            
            console.log("User Info:", { Name, Email });
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    }
  const navigate = useNavigate()  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className=' z-20 mx-6 mt-24
    rounded-2xl
    bg-gradient-to-br from-black/80 via-black/90 to-black/90 backdrop-blur-2xl border border-white/10 px-8 py-8 shadow-[0_22px_55px_rgba(0,0,0,0,0.7)]'
    >
      <div className='grid grid-cols-1 md:grid grid-cols-3 gap-8 items-start'>
        <motion.div
          whileHover={{ rotateX: 6, rotateY: -6 }}
          className="flex flex-col gap-4 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}>
          <div className='flex items-center gap-3 cursor-pointer' style={{ transform: "traslateZ(20px)" }}>
            <img src={logo} alt="Logo" className='h-15 w-15 object-contain' />
            <span className='text-lg font-semibold bg-gradient-to-br from-white via-gray-300 to-white bg-clip-text text-transparent'
              style={{ textShadow: "0 6px 18px rgba(0,0,0,0.4)" }}>ExamNotes <span className='text-gray-400'>AI</span></span>


          </div>
          <p className='text-sm text-gray-300 max-w-sm '>ExamNotes AI helps students genrate exam-focuesd notes,revison material,diagrams,and printable PDFs using AI.</p>

        </motion.div>
        <div className='text-center'>
          <h1 className='text-sm font-semibold text-white mb-4'>Quick Links</h1>
          <ul className='space-y-2 text-sm'>
            <li className='text-gray-300 hover:text-white transition-colors cursor-pointer '  onClick={()=>navigate("/notes")} >Notes  </li>
           
            <li className='text-gray-300 hover:text-white transition-colors cursor-pointer'onClick={()=>navigate("/history")}>History  </li>
            <li className='text-gray-300 hover:text-white transition-colors cursor-pointer'onClick={()=>navigate("/pricing")}>Add credits </li>
          </ul>

        

        </div>

         <div className='text-center'>
          <h1 className='text-sm font-semibold text-white mb-4'>Support & Account</h1>
          <ul className='space-y-2 text-sm'>
            <li className='text-gray-300 hover:text-white transition-colors cursor-pointer '  onClick={()=>navigate("/auth")} >Sign In  </li>
           
         
            <li className='text-gray-300 hover:text-white transition-colors cursor-pointer'onClick={handleSignout}>Sign Out </li>
            <li className='text-gray-300 hover:text-white transition-colors cursor-pointer'>darshankumbhar84@gmail.com</li>
          </ul>

        

        </div>
      </div>
    <div className='my-6 h-px bg-white/10'>
    <p className='text-center text-xs text-gray-500'>
      @{new Date().getFullYear()} Cognivault AI. All rights reserved.
    </p>
    </div>

       


    </motion.div>
  )
}

export default Footer
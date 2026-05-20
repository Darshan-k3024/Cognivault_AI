import React from 'react'
import { motion } from "motion/react"
import Navbar from '../components/Navbar'
import img from"../assets/img4.png"
import Footer from '../components/Footer'
import { useNavigate } from "react-router-dom"
function Home() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen overflow-hidden  bg-white text-black'>
      <Navbar />

      {/* top */}
      <section className='max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            whileHover={{ rotateX: 6, rotateY: -6 }}
            className='transform-gpu'
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1 className='text-5xl lg:text-6xl font-extrabold bg-gradient-to-br from-black/90 via-black/60 to-black bg-clip-text text-transparent'
              whileHover={{ y: -4 }}
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)"

              }}>
              Turn Your Ideas Into<br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500">
                Smart AI Notes Instantly
              </span>

              <motion.p
                whileHover={{ y: -4 }}
                className='mt-6 max-w-xl text-sm font-bold text-gray-700'
                style={{
                  transform: "translateZ(40px)",
                  textShadow: "0 18px 40px rgba(0,0,0,0.25)"
                }}
              >
                Generate exam-focused notes, quick revision content, smart flow diagrams, and ready-to-download PDFs in seconds — powered by advanced AI to make studying faster, cleaner, and more effective.
              </motion.p>

            </motion.h1>
            <br />
            <motion.button
              whileHover={{
                            scale: 1.08,
                            y: -3,
                            cursor: "pointer",
                        }}
               transition={{ type: "spring", stiffness: 300 }}
                        className="relative flex items-center justify-center gap-3 px-6 py-3 
             bg-[#2a2a2a] text-white border border-gray-600 
             rounded-xl overflow-hidden group" onClick={()=>navigate("/notes")}
            >
              Get Started
            </motion.button>



          </motion.div >
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ y:-12,rotateX: 8, rotateY: -8,scale: 1.02 }}
          className='transform-gpu' style={{transformStyle:"preserve-3d"}}
        >
          <img src={img} alt="AI Notes" className='w- rounded-2xl shadow-lg' style={{transform:"translateZ(30px)",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}} />
        </motion.div>
      </section>

      {/* bottom */}
      <section className='max-w-6xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 gap-10'>
        <Feature icon="📙"  title="Exam Notes" description="High-yeild exam-oriented notes with revison points."/>
        <Feature icon="📁"  title="Project Notes" description="Well-structed content for assignments and projects."/>
        <Feature icon="📊"  title="Diagrams" description="Auto-genrated visual diagrams for clarity."/>
        <Feature icon="⬇️"  title="PDF Dowonload" description="Dowonload clean,printable PDFs instantly."/>
   
      </section>

      <Footer />
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

export default Home
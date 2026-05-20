import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";
import FinalResult from '../components/FinalResult'

function History() {

  const [topics, setTopics] = useState([])
  const [isSlidebarOpen, setSlidebaropen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)

  const navigate = useNavigate()

  const { userData } = useSelector((state) => state.user)

  const credit = userData?.credits || 0

  useEffect(() => {

    const myNotes = async () => {

      try {

        const res = await axios.get(
          serverUrl + "/api/notes/getnotes",
          {
            withCredentials: true
          }
        )

        setTopics(
          Array.isArray(res.data)
            ? res.data
            : []
        )

      } catch (error) {

        console.log(error)

      }

    }

    myNotes()

  }, [])

  useEffect(() => {

    if (window.innerWidth >= 1024) {

      setSlidebaropen(true)

    }

  }, [])

  const openNote = async (noteId) => {

    setLoading(true)

    try {

      const res = await axios.get(

        serverUrl + `/api/notes/${noteId}`,

        {
          withCredentials: true
        }

      )

      setSelectedNote(res.data.content)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8'>

      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='
          mb-10
          rounded-2xl
          bg-black/80 backdrop-blur-xl
          border border-white/10
          px-8 py-6 items-start
          flex justify-between md:items-center gap-4 flex-wrap
          shadow-[0_20px_45px_rgba(0,0,0,0.6)]
        '
      >

        <div className='flex items-center gap-4 flex-wrap'>

          <div
            className='cursor-pointer'
            onClick={() => navigate("/")}
          >

            <h1 className='text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent'>
              Cognivault AI
            </h1>

            <p className='text-amber-50 text-sm'>
              AI-powered exam-oriented notes & revision
            </p>

          </div>

          {!isSlidebarOpen && (

            <button
              onClick={() => setSlidebaropen(true)}
              className='lg:hidden text-white text-2xl'
            >

              <GiHamburgerMenu />

            </button>

          )}

          <button
            className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer'
            onClick={() => navigate("/pricing")}
          >

            <span className='text-xl'>💎</span>

            <span>{credit}</span>

            <motion.span
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.97 }}
              className='h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold text-black'
            >
              ➕
            </motion.span>

          </button>

        </div>

      </motion.header>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>

        <AnimatePresence>

          {isSlidebarOpen && (

            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30
              }}
              className='
                bg-black/80
                backdrop-blur-xl
                border border-white/10
                rounded-2xl
                p-6
                shadow-lg
                h-max lg:h-auto
                overflow-auto
              '
            >

              <button
                onClick={() => setSlidebaropen(false)}
                className='lg:hidden text-white mb-4'
              >
                ⬅️ Back
              </button>

              <div className='mb-4 space-y-1'>

                <button
                  onClick={() => navigate("/notes")}
                  className='
                    w-full
                    px-3 py-2
                    rounded-lg
                    text-sm
                    text-gray-200
                    bg-white/10
                    hover:bg-white/20
                  '
                >
                  ➕ New Notes
                </button>

                <hr className='border-white/10 mb-4' />

                <h2
                  className='
                    mb-4
                    text-lg
                    font-bold
                    bg-gradient-to-r
                    from-white
                    via-gray-300
                    to-white
                    bg-clip-text
                    text-transparent
                  '
                >
                  📚 Your Notes
                </h2>

                {topics.length === 0 && (

                  <p className='text-gray-400 text-sm'>
                    No notes found. Create your first notes!
                  </p>

                )}

                <ul className='space-y-3'>

                  {topics.map((t, i) => (

                    <li
                      key={i}
                      onClick={() => openNote(t._id)}
                      className='
                        cursor-pointer
                        rounded-xl
                        p-3
                        bg-white/5
                        border border-white/10
                        hover:bg-white/10
                        transition
                      '
                    >

                      <p className='text-sm font-semibold text-white'>
                        {t.topic}
                      </p>

                      <div className='flex flex-wrap gap-2 mt-2 text-xs'>

                        {t.classLevel && (

                          <span
                            className='
                              px-2 py-1
                              rounded-full
                              bg-gradient-to-r
                              from-blue-500
                              to-indigo-500
                              text-white
                            '
                          >
                            Class : {t.classLevel}
                          </span>

                        )}

                        {t.examType && (

                          <span
                            className='
                              px-2 py-1
                              rounded-full
                              bg-gradient-to-r
                              from-purple-500
                              to-pink-500
                              text-white
                            '
                          >
                            Exam : {t.examType}
                          </span>

                        )}

                      </div>

                      <div className='flex gap-3 mt-2 text-xs text-gray-300'>

                        {t.revisionMode && (
                          <span>⚡ Revision</span>
                        )}

                        {t.includeDiagram && (
                          <span>📊 Diagram</span>
                        )}

                        {t.includeChart && (
                          <span>📉 Chart</span>
                        )}

                      </div>

                    </li>

                  ))}

                </ul>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='
            lg:col-span-3
            rounded-2xl
            bg-white
            shadow-[0_15px_40px_rgba(0,0,0,0.15)]
            p-6
            min-h-[75vh]
          '
        >

          {loading && (

            <p className='text-center text-gray-500'>
              Loading notes...
            </p>

          )}

          {!loading && !selectedNote && (

            <div className='text-xl font-bold mb-4 text-gray-500'>
              Select from the sidebar
            </div>

          )}

          {!loading && selectedNote && (

            <FinalResult result={selectedNote} />

          )}

        </motion.div>

      </div>

    </div>

  )

}

export default History
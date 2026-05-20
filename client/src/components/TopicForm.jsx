import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import axios from 'axios'
import { serverUrl } from '../App'
import { ReducerType } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { updateCredits } from '../redux/userSlice'

function TopicForm({ setResult, setLoading, loading, setError }) {

    const [classLevel, setClasslevel] = useState("")
    const [topic, setTopic] = useState("")
    const [examType, setExamtype] = useState("")
    const [revision, setRevision] = useState(false)
    const [includeDiagram, setIncludeDigram] = useState(false)
    const [includeChart, setIncludeChart] = useState(false)
    const [progress, setProgress] = useState(0)
    const [progressText, setProgressText] = useState("")

    const dispatch = useDispatch()


    const handleSubmit = async () => {

        if (!topic.trim()) {
            setError("Please enter the topic")
            return
        }

        setError("")
        setLoading(true)
        setResult(null)

        try {

            const result = await axios.post(serverUrl +
                "/api/notes/generate-notes",
                {
                    topic,
                    classLevel,
                    examType,
                    revision,
                    includeDiagram,
                    includeChart
                },
                {
                    withCredentials: true
                }

            )

            setResult(result.data.data)
            console.log(result.data)
            setClasslevel("")
            setTopic("")
            setExamtype("") 
            if(typeof result.data.creditsLeft =="number"){
                dispatch(updateCredits(result.data.creditsLeft))
            }
        } catch (error) {

            console.log(error.response.data)

            setError("Failed to fetch notes from server")

        } finally {

            setLoading(false)

        }
    }

    useEffect(() => {
        if (!loading) {
            setProgress(0)
            setProgressText("")
            return
        }
        let value = 0
        const interval = setInterval(() => {
            value += Math.random() * 8

            if (value >= 95) {
                setProgressText("Almost done...")
                clearInterval(interval)
            } else if (value > 70) {
                setProgressText("Finalizing notes...")
            } else if (value > 40) {
                setProgressText("Processing content...")
            } else {
                setProgressText("Genrating notes...")
            }
            setProgress(Math.floor(value))


        }, 700);

        return () => clearInterval(interval)



    }, [loading])

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='
            rounded-2xl
            bg-gradient-to-br from-black/90 via-black/80 to-black/90
            backdrop-blur-2xl
            border border-white/10
            shadow-[0_22px_55px_rgba(0,0,0,0.75)]
            flex flex-col gap-4 items-center
            p-8 space-y-6 text-white'
        >

            <input
                type="text"
                className='w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30'
                placeholder='Enter the Subject or Topic Name'
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
            />

            <input
                type="text"
                className='w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30'
                placeholder='Select or Enter Academic Level'
                onChange={(e) => setClasslevel(e.target.value)}
                value={classLevel}
            />

            <input
                type="text"
                className='w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30'
                placeholder='Specify the Examination or Board'
                onChange={(e) => setExamtype(e.target.value)}
                value={examType}
            />

            <div className='flex flex-col md:flex-row gap-6 w-full'>

                <Toggle
                    label="Revision Mode"
                    checked={revision}
                    onChange={() => setRevision(!revision)}
                />

                <Toggle
                    label="Include Diagram"
                    checked={includeDiagram}
                    onChange={() => setIncludeDigram(!includeDiagram)}
                />

                <Toggle
                    label="Include Chart"
                    checked={includeChart}
                    onChange={() => setIncludeChart(!includeChart)}
                />

            </div>

            <motion.button
                whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!loading ? { scale: 0.95, y: 0 } : {}}
                disabled={loading}
                onClick={handleSubmit}
                className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-gray-100 via-white to-gray-200 text-black shadow-lg hover:shadow-xl"
                    }`}
            >

                {loading ? "Generating Notes..." : "Generate Notes"}

            </motion.button>
            {loading &&
                <div className='mt-4 space-y-2'>
                    <div className='w-full h-2 rounded-full bg-white/10 overflow-hidden'>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeOut", duration: 0.6 }}
                            className='h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500'
                        ></motion.div>
                    </div>

                    <div className='flex justify-between items-center text-xs text-gray-300'>
                        <span>Generating Notes...</span>
                        <span>{progress}%</span>
                    </div>
                </div>
            }

        </motion.div>
    )
}

function Toggle({ label, checked, onChange }) {

    return (

        <div
            className='flex items-center gap-4 cursor-pointer select-none'
            onClick={onChange}
        >

            <motion.div
                animate={{
                    backgroundColor: checked
                        ? "rgba(34,197,94,0.35)"
                        : "rgba(255,255,255,0.25)"
                }}
                transition={{ duration: 0.25 }}
                className='relative w-12 h-6 rounded-full border border-white/20 backdrop-blur-lg'
            >

                <motion.div
                    animate={{
                        x: checked ? 24 : 2
                    }}
                    transition={{ duration: 0.25 }}
                    className='absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]'
                />

            </motion.div>

            <span
                className={`text-sm transition-colors ${checked ? "text-green-300" : "text-gray-300"
                    }`}
            >
                {label}
            </span>

        </div>
    )
}

export default TopicForm
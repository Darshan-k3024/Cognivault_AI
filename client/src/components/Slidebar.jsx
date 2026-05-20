import React from 'react'

function Slidebar({ result }) {
    if (!result ||
        !result.subTopics ||
        !result.questions ||
        !result.questions.short ||
        !result.questions.long) {
        return null
    }


    return (
        <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-6'>

            <div className='flex items-center gap-2'>

                <span className='text-xl'>🚀</span>

                <h3 className='text-lg font-semibold text-indigo-600'>
                    Quick Exam View
                </h3>

            </div>

            <section>

                <p className='text-sm font-semibold text-gray-700 mb-3'>
                    ✨ Sub Topics (Priority Wise)
                </p>
                {Object.entries(result.subTopics).map(([star, topics]) => (

                    <div
                        key={star}
                        className='mb-3 rounded-lg bg-gray-50 border border-gray-200 p-3'
                    >

                        <h4 className='font-semibold text-gray-800 mb-2'>
                            {star} priority
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-600'>

                            {topics.map((topic, index) => (

                                <li key={index}>
                                    • {topic}
                                </li>

                            ))}

                        </ul>

                    </div>

                ))}


            </section>
            <section className='rounded-lg bg-yellow-50  border border-yellow-200 p-3'>
                <p className='text-sm font-semibold text-gray-700 mb-1 '>🔥 Exam Importance</p>
                <span className='text-yellow-700 font-bold text-sm  '>{result.importance}</span>

                <p className='text-sm font-semibold text-gray-700 mb-3'>❓ Important Question</p>

                <div className='mb-4 rounded-lg bg-indigo-50 border border-indigo-200 p-3'>
                    <p className='text-sm font-semibold text-indigo-700 mb-1'>Short Questions</p>
                    <ul className='list'>
                        {result.questions.short.map((topic, index) => {
                            return <li key={index}>{topic}</li>
                        })}
                    </ul>
                </div>
                <div className='mb-4 rounded-lg bg-indigo-50 border border-purple-200 p-3'>
                    <p className='text-sm font-semibold text-purple-700 mb-1'>Long Questions</p>
                    <ul className='list'>
                        {result.questions.long.map((topic, index) => {
                            return <li key={index}>{topic}</li>
                        })}
                    </ul>
                </div>
                <div className='mb-4 rounded-lg bg-indigo-50 border border-blue-200 p-3'>
                    <p className='text-sm font-semibold text-blue-700 mb-1'>Diagram Questions</p>
                    <ul className='list'>
                       <li>{result.questions.diagram}</li>
                    </ul>
                </div>
            </section>

        </div>
    )
}

export default Slidebar
import React from 'react'

import {
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"

function RechartSetUp({ charts }) {

  if (!charts || charts.length === 0) return null;

  const COLORS = [
    "#6366f1",
    "#22c55e",
    "#f59e0b",
    "#10b981",
    "#ef4444",
    "#06b6d4"
  ];

  return (

    <div className='space-y-8'>

      {charts.map((chart, index) => (

        <div
          key={index}
          className='border border-gray-200 rounded-xl p-4 bg-white'
        >

          <h1 className='font-semibold text-gray-800 mb-3'>
            {chart.title}
          </h1>

          <div className='h-72'>

            {/* BAR CHART */}
            {chart.type === "bar" && (

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={chart.data}>

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    radius={[6, 6, 0, 0]}
                  >

                    {chart.data.map((_, i) => (

                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                      />

                    ))}

                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            )}

            {/* LINE CHART */}
            {chart.type === "line" && (

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={chart.data}>

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            )}

            {/* PIE CHART */}
            {chart.type === "pie" && (

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Tooltip />

                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >

                    {chart.data.map((entry, i) => (

                      <Cell
                        key={`cell-${i}`}
                        fill={COLORS[i % COLORS.length]}
                      />

                    ))}

                  </Pie>

                </PieChart>

              </ResponsiveContainer>

            )}

          </div>

        </div>

      ))}

    </div>

  )
}

export default RechartSetUp
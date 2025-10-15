import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { Campaign } from '../types'

interface PerformanceChartProps {
  campaign: Campaign
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ campaign }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const chartData = campaign.dailyPerformance.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    impressions: day.impressions,
    clicks: day.clicks,
    conversions: day.conversions,
    spend: day.spend
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'spend' ? formatCurrency(entry.value) : formatNumber(entry.value)} {entry.dataKey}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            yAxisId="left"
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={formatNumber}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={formatCurrency}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="impressions"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Impressions"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="clicks"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Clicks"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="conversions"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Conversions"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="spend"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Spend"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PerformanceChart

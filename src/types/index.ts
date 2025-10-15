export interface Campaign {
  id: string
  name: string
  impressions: number
  clicks: number
  ctr: number // Click-through rate as percentage
  conversions: number
  status: 'Active' | 'Paused'
  budget: number
  spend: number
  startDate: string
  endDate: string
  dailyPerformance: {
    date: string
    impressions: number
    clicks: number
    conversions: number
    spend: number
  }[]
}

export interface FilterState {
  status: 'All' | 'Active' | 'Paused'
  dateRange: {
    start: string
    end: string
  }
  searchQuery: string
}

export interface PromptIntent {
  action: 'filter' | 'highlight' | 'sort'
  field?: keyof Campaign
  value?: string | number
  direction?: 'asc' | 'desc'
  highlight?: boolean
}

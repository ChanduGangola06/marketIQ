import { create } from 'zustand'
import type { Campaign, FilterState } from '../types'
import { mockCampaigns } from '../data/mockData'

interface DashboardState {
  campaigns: Campaign[]
  filteredCampaigns: Campaign[]
  filters: FilterState
  highlightedCampaign: string | null
  selectedCampaign: string | null
  isLoading: boolean
  error: string | null
}

interface DashboardActions {
  setFilters: (filters: Partial<FilterState>) => void
  applyFilters: () => void
  highlightCampaign: (campaignId: string | null) => void
  selectCampaign: (campaignId: string | null) => void
  processPrompt: (prompt: string) => void
  resetFilters: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

const initialFilters: FilterState = {
  status: 'All',
  dateRange: {
    start: '',
    end: ''
  },
  searchQuery: ''
}

export const useDashboardStore = create<DashboardState & DashboardActions>((set, get) => ({
  campaigns: mockCampaigns,
  filteredCampaigns: mockCampaigns,
  filters: initialFilters,
  highlightedCampaign: null,
  selectedCampaign: null,
  isLoading: false,
  error: null,

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }))
    get().applyFilters()
  },

  applyFilters: () => {
    const { campaigns, filters } = get()
    let filtered = [...campaigns]

    // Filter by status
    if (filters.status !== 'All') {
      filtered = filtered.filter(campaign => campaign.status === filters.status)
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(campaign => 
        campaign.name.toLowerCase().includes(query)
      )
    }

    // Filter by date range
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(campaign => {
        const campaignStart = new Date(campaign.startDate)
        const campaignEnd = new Date(campaign.endDate)
        const filterStart = new Date(filters.dateRange.start)
        const filterEnd = new Date(filters.dateRange.end)
        
        return campaignStart >= filterStart && campaignEnd <= filterEnd
      })
    }

    set({ filteredCampaigns: filtered })
  },

  highlightCampaign: (campaignId) => {
    set({ highlightedCampaign: campaignId })
  },

  selectCampaign: (campaignId) => {
    set({ selectedCampaign: campaignId })
  },

  processPrompt: (prompt) => {
    const { campaigns, setFilters } = get()
    const lowerPrompt = prompt.toLowerCase().trim()
    
    console.log('Processing prompt:', prompt, 'Lowercase:', lowerPrompt)

    // Reset highlight first
    set({ highlightedCampaign: null })

    // Check for CTR-related queries
    if (lowerPrompt.includes('ctr') || lowerPrompt.includes('click through rate') || lowerPrompt.includes('click-through rate')) {
      if (lowerPrompt.includes('top') || lowerPrompt.includes('best') || lowerPrompt.includes('highest')) {
        console.log('Sorting by CTR descending')
        const sorted = [...campaigns].sort((a, b) => b.ctr - a.ctr)
        set({ 
          filteredCampaigns: sorted,
          highlightedCampaign: sorted[0]?.id || null
        })
        return
      }
    }

    // Check for paused campaigns
    if (lowerPrompt.includes('paused') || lowerPrompt.includes('inactive')) {
      console.log('Filtering for paused campaigns')
      setFilters({ status: 'Paused' })
      return
    }

    // Check for active campaigns
    if (lowerPrompt.includes('active') || lowerPrompt.includes('running')) {
      console.log('Filtering for active campaigns')
      setFilters({ status: 'Active' })
      return
    }

    // Check for best performing campaign
    if (lowerPrompt.includes('best') || lowerPrompt.includes('top') || lowerPrompt.includes('highest')) {
      if (lowerPrompt.includes('conversion')) {
        console.log('Sorting by conversions descending')
        const sorted = [...campaigns].sort((a, b) => b.conversions - a.conversions)
        set({ 
          filteredCampaigns: sorted,
          highlightedCampaign: sorted[0]?.id || null
        })
        return
      }
      if (lowerPrompt.includes('click')) {
        console.log('Sorting by clicks descending')
        const sorted = [...campaigns].sort((a, b) => b.clicks - a.clicks)
        set({ 
          filteredCampaigns: sorted,
          highlightedCampaign: sorted[0]?.id || null
        })
        return
      }
      if (lowerPrompt.includes('impression')) {
        console.log('Sorting by impressions descending')
        const sorted = [...campaigns].sort((a, b) => b.impressions - a.impressions)
        set({ 
          filteredCampaigns: sorted,
          highlightedCampaign: sorted[0]?.id || null
        })
        return
      }
      // Default to highest conversions for "best performing"
      console.log('Default: Sorting by conversions descending')
      const sorted = [...campaigns].sort((a, b) => b.conversions - a.conversions)
      set({ 
        filteredCampaigns: sorted,
        highlightedCampaign: sorted[0]?.id || null
      })
      return
    }

    // Check for search by name (partial match)
    const nameMatch = campaigns.find(campaign => 
      campaign.name.toLowerCase().includes(lowerPrompt)
    )
    if (nameMatch) {
      console.log('Found campaign by name:', nameMatch.name)
      set({ 
        filteredCampaigns: [nameMatch],
        highlightedCampaign: nameMatch.id
      })
      return
    }

    // Check for specific metrics
    if (lowerPrompt.includes('conversion') && !lowerPrompt.includes('best') && !lowerPrompt.includes('top')) {
      console.log('Showing all campaigns sorted by conversions')
      const sorted = [...campaigns].sort((a, b) => b.conversions - a.conversions)
      set({ filteredCampaigns: sorted })
      return
    }

    if (lowerPrompt.includes('click') && !lowerPrompt.includes('best') && !lowerPrompt.includes('top')) {
      console.log('Showing all campaigns sorted by clicks')
      const sorted = [...campaigns].sort((a, b) => b.clicks - a.clicks)
      set({ filteredCampaigns: sorted })
      return
    }

    // Default: reset filters and show all campaigns
    console.log('Default: Resetting filters')
    set({ 
      filters: initialFilters,
      filteredCampaigns: campaigns,
      highlightedCampaign: null
    })
  },

  resetFilters: () => {
    set({ 
      filters: initialFilters,
      filteredCampaigns: mockCampaigns,
      highlightedCampaign: null
    })
  },

  setLoading: (loading) => {
    set({ isLoading: loading })
  },

  setError: (error) => {
    set({ error })
  }
}))

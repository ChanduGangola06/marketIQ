import React from 'react'
import { useDashboardStore } from '../store/dashboardStore'

const DashboardFilters: React.FC = () => {
  const { filters, setFilters, resetFilters } = useDashboardStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Status Filter */}
      <div>
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status-filter"
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value as 'All' | 'Active' | 'Paused' })}
          className="input"
          aria-describedby="status-filter-description"
        >
          <option value="All">All Campaigns</option>
          <option value="Active">Active Only</option>
          <option value="Paused">Paused Only</option>
        </select>
        <p id="status-filter-description" className="sr-only">
          Filter campaigns by their current status
        </p>
      </div>

      {/* Date Range Filter */}
      <div>
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <input
          type="date"
          id="start-date"
          value={filters.dateRange.start}
          onChange={(e) => setFilters({ 
            dateRange: { ...filters.dateRange, start: e.target.value }
          })}
          className="input"
          aria-describedby="start-date-description"
        />
        <p id="start-date-description" className="sr-only">
          Filter campaigns starting from this date
        </p>
      </div>

      <div>
        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <input
          type="date"
          id="end-date"
          value={filters.dateRange.end}
          onChange={(e) => setFilters({ 
            dateRange: { ...filters.dateRange, end: e.target.value }
          })}
          className="input"
          aria-describedby="end-date-description"
        />
        <p id="end-date-description" className="sr-only">
          Filter campaigns ending by this date
        </p>
      </div>

      {/* Search Filter */}
      <div className="md:col-span-3">
        <label htmlFor="search-query" className="block text-sm font-medium text-gray-700 mb-1">
          Search Campaigns
        </label>
        <div className="relative">
          <input
            type="text"
            id="search-query"
            value={filters.searchQuery}
            onChange={(e) => setFilters({ searchQuery: e.target.value })}
            placeholder="Search by campaign name..."
            className="input pl-10"
            aria-describedby="search-query-description"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <p id="search-query-description" className="sr-only">
          Search campaigns by name
        </p>
      </div>

      {/* Reset Button */}
      <div className="md:col-span-3 flex justify-end">
        <button
          onClick={resetFilters}
          className="btn-secondary"
          aria-describedby="reset-filters-description"
        >
          Reset Filters
        </button>
        <p id="reset-filters-description" className="sr-only">
          Clear all filters and show all campaigns
        </p>
      </div>
    </div>
  )
}

export default DashboardFilters

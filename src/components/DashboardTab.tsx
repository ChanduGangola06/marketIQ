import React from 'react'
import { useDashboardStore } from '../store/dashboardStore';
import CampaignStats from './CampaignStats';
import DashboardFilters from './DashboardFilters';
import CampaignTable from './CampaignTable';
import PerformanceChart from './PerformanceChart';

const DashboardTab: React.FC = () => {
    const { filteredCampaigns, selectedCampaign } = useDashboardStore()
    const selectedCampaignData = filteredCampaigns.find(c => c.id === selectedCampaign)

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <CampaignStats />

            {/* Filters */}
            <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
                <DashboardFilters />
            </div>

            {/* Campaign Table */}
            <div className="card">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Campaigns ({filteredCampaigns.length})
                    </h2>
                </div>
                <CampaignTable />
            </div>

            {/* Performance Chart */}
            {selectedCampaignData && (
                <div className="card">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Performance Trends - {selectedCampaignData.name}
                    </h2>
                    <PerformanceChart campaign={selectedCampaignData} />
                </div>
            )}

            {!selectedCampaign && (
                <div className="card text-center py-8">
                    <div className="text-gray-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p className="mt-2">Select a campaign from the table above to view performance trends</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardTab

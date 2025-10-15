import { useDashboardStore } from "../store/dashboardStore";

const CampaignStats: React.FC = () => {
    const { filteredCampaigns } = useDashboardStore()

    const totalImpressions = filteredCampaigns.reduce((sum, campaign) => sum + campaign.impressions, 0)
    const totalClicks = filteredCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0)
    const totalConversions = filteredCampaigns.reduce((sum, campaign) => sum + campaign.conversions, 0)
    const totalSpend = filteredCampaigns.reduce((sum, campaign) => sum + campaign.spend, 0)
    const averageCTR = totalClicks > 0 ? (totalClicks / totalImpressions) * 100 : 0
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0

    const stats = [
        {
            name: 'Total Impressions',
            value: totalImpressions.toLocaleString(),
            change: '+12%',
            changeType: 'positive' as const,
            icon: '👁️'
        },
        {
            name: 'Total Clicks',
            value: totalClicks.toLocaleString(),
            change: '+8%',
            changeType: 'positive' as const,
            icon: '🖱️'
        },
        {
            name: 'Total Conversions',
            value: totalConversions.toLocaleString(),
            change: '+15%',
            changeType: 'positive' as const,
            icon: '🎯'
        },
        {
            name: 'Average CTR',
            value: `${averageCTR.toFixed(2)}%`,
            change: '+0.3%',
            changeType: 'positive' as const,
            icon: '📊'
        },
        {
            name: 'Conversion Rate',
            value: `${conversionRate.toFixed(2)}%`,
            change: '+2.1%',
            changeType: 'positive' as const,
            icon: '📈'
        },
        {
            name: 'Total Spend',
            value: `$${totalSpend.toLocaleString()}`,
            change: '+5%',
            changeType: 'positive' as const,
            icon: '💰'
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {stats.map((stat) => (
                <div key={stat.name} className="card p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                            <span className="text-xl">{stat.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <dl>
                                <dt className="text-xs font-medium text-gray-500 truncate mb-1">
                                    {stat.name}
                                </dt>
                                <dd className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                                    <div className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                                        {stat.value}
                                    </div>
                                    <div className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${stat.changeType === 'positive' ? 'text-green-600' :
                                            stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                                        }`}>
                                        {stat.change}
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CampaignStats;
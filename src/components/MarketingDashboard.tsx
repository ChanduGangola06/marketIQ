import { useState } from "react";
import { useDashboardStore } from "../store/dashboardStore";
import LoadingSpinner from "./LoadingSpinner";
import DashboardTab from "./DashboardTab";
import PromptPlayground from "./PromptPlayground";

type TabType = 'dashboard' | 'playground'

const MarketingDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const { isLoading, error } = useDashboardStore();

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="card max-w-md mx-auto text-center">
                    <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn-primary mt-4"
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">
                                MarketIQ Dashboard
                            </h1>
                        </div>
                        <nav className="flex space-x-8" role="tablist">
                            <button
                                role="tab"
                                aria-selected={activeTab === 'dashboard'}
                                aria-controls="dashboard-panel"
                                onClick={() => setActiveTab('dashboard')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === 'dashboard'
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Campaign Dashboard
                            </button>
                            <button
                                role="tab"
                                aria-selected={activeTab === 'playground'}
                                aria-controls="playground-panel"
                                onClick={() => setActiveTab('playground')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === 'playground'
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                            >Prompt Playground</button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    <LoadingSpinner size="lg" text="Loading dashboard..." />
                ) : (
                    <>
                        <div
                            role="tabpanel"
                            id="dashboard-panel"
                            aria-hidden={activeTab !== 'dashboard'}
                            className={activeTab === 'dashboard' ? 'block' : 'hidden'}
                        >
                            <DashboardTab />
                        </div>
                        <div
                            role="tabpanel"
                            id="playground-panel"
                            aria-hidden={activeTab !== 'playground'}
                            className={activeTab === 'playground' ? 'block' : 'hidden'}
                        >
                            <PromptPlayground />
                        </div>
                    </>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="text-center text-sm text-gray-500">
                        <p>MarketIQ Dashboard - Built with React, TypeScript, and Tailwind CSS</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default MarketingDashboard;
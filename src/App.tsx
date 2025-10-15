import ErrorBoundary from "./components/ErrorBoundary"
import MarketingDashboard from "./components/MarketingDashboard"

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <MarketingDashboard />
      </div>
    </ErrorBoundary>
  )
}

export default App

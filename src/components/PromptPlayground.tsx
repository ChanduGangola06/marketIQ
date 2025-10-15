import { useState } from "react";
import { useDashboardStore } from "../store/dashboardStore";

const PromptPlayground: React.FC = () => {
    const [prompt, setPrompt] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const { processPrompt, resetFilters } = useDashboardStore()

    const examplePrompts = [
        "Show top campaigns by CTR",
        "List paused campaigns",
        "Highlight best performing campaign",
        "Show campaigns with highest conversions",
        "Find campaigns with most clicks",
        "Display campaigns with highest impressions"
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (prompt.trim()) {
            setIsProcessing(true)
            try {
                processPrompt(prompt.trim())
                // Add a small delay to show processing state
                await new Promise(resolve => setTimeout(resolve, 500))
            } catch (error) {
                console.error('Error processing prompt:', error)
            } finally {
                setIsProcessing(false)
            }
        }
    }

    const handleExampleClick = async (examplePrompt: string) => {
        setPrompt(examplePrompt)
        setIsProcessing(true)
        try {
            processPrompt(examplePrompt)
            await new Promise(resolve => setTimeout(resolve, 500))
        } catch (error) {
            console.error('Error processing example prompt:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleClear = () => {
        setPrompt('')
        resetFilters()
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Prompt Playground</h2>
                <p className="text-gray-600">Try natural language prompts to interact with your campaign data. The AI will interpret your intent and filter, sort, or highlight campaigns accordingly.</p>
            </div>

            {/* Input Section */}
            <div className="card">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your prompt
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                id="prompt-input"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., 'Show top campaigns by CTR' or 'List paused campaigns'"
                                className="input flex-1"
                                aria-describedby="prompt-input-description"
                            />
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={!prompt.trim() || isProcessing}
                                aria-describedby="submit-description"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Processing...
                                    </>
                                ) : (
                                    'Execute'
                                )}
                            </button>
                        </div>
                        <p id="prompt-input-description" className="text-sm text-gray-500 mt-1">
                            Type a natural language query to filter or analyze your campaigns
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleClear}
                            className="btn-secondary"
                            aria-describedby="clear-description"
                        >
                            Clear & Reset
                        </button>
                        <p id="clear-description" className="sr-only">
                            Clear the prompt input and reset all filters
                        </p>
                    </div>
                </form>
            </div>

            {/* Example Prompts */}
            <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Prompts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {examplePrompts.map((example, index) => (
                        <button
                            key={index}
                            onClick={() => handleExampleClick(example)}
                            className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            aria-describedby={`example-${index}-description`}
                        >
                            <div className="text-sm text-gray-900 font-medium">
                                "{example}"
                            </div>
                            <p id={`example-${index}-description`} className="sr-only">
                                Click to execute this example prompt
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* How it Works */}
            <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">How it Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Supported Actions</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Filter by status (active/paused)</li>
                            <li>• Sort by performance metrics</li>
                            <li>• Highlight top performers</li>
                            <li>• Search by campaign name</li>
                            <li>• Find campaigns by CTR, clicks, conversions</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Keywords to Try</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                            <li>• "top", "best", "highest"</li>
                            <li>• "paused", "active"</li>
                            <li>• "CTR", "clicks", "conversions"</li>
                            <li>• "impressions", "spend"</li>
                            <li>• Campaign names</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Results Preview */}
            <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Results</h3>
                <p className="text-gray-600">
                    The dashboard above will update based on your prompts. Try some examples to see how the AI interprets your natural language queries and filters the data accordingly.
                </p>
            </div>

        </div>
    );
}

export default PromptPlayground;
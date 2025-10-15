# Marketing Intelligence Dashboard

A modern, AI-powered marketing intelligence dashboard built with React, TypeScript, and Tailwind CSS. This application demonstrates advanced UI development, state management, and natural language processing capabilities for marketing campaign analytics.

## 🚀 Features

### Core Dashboard
- **Campaign Analytics**: Comprehensive view of marketing campaigns with key metrics
- **Performance Visualization**: Interactive charts showing campaign trends over time
- **Advanced Filtering**: Filter campaigns by status, date range, and search queries
- **Responsive Design**: Optimized for both desktop and mobile devices

### AI-Powered Prompt Playground
- **Natural Language Processing**: Interact with data using plain English prompts
- **Smart Intent Recognition**: Automatically interprets user queries and applies appropriate filters
- **Dynamic Data Manipulation**: Real-time filtering, sorting, and highlighting based on prompts
- **Example Prompts**: Pre-built examples to demonstrate AI capabilities

### Technical Excellence
- **Performance Optimized**: Built for Core Web Vitals compliance (LCP ≤ 2.5s, CLS ≤ 0.05, INP ≤ 200ms)
- **Accessibility First**: WCAG AA compliant with keyboard navigation, screen reader support, and focus management
- **SEO Optimized**: Semantic HTML, meta tags, JSON-LD structured data, and sitemap
- **Modern Architecture**: Clean separation of concerns with TypeScript and Zustand state management

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn or bun

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marketing-intelligence-dashboard
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   bun run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── CampaignStats.tsx    # Overview statistics cards
│   ├── CampaignTable.tsx    # Main campaigns data table
│   ├── DashboardFilters.tsx # Filter controls
│   ├── DashboardTab.tsx     # Main dashboard tab
│   ├── MarketingDashboard.tsx # Root dashboard component
│   ├── PerformanceChart.tsx # Recharts visualization
│   └── PromptPlayground.tsx # AI prompt interface
├── data/                # Mock data and APIs
│   └── mockData.ts         # Campaign data
├── store/               # State management
│   └── dashboardStore.ts   # Zustand store
├── types/               # TypeScript definitions
│   └── index.ts            # Type definitions
├── App.tsx              # Main app component
├── main.tsx             # Application entry point
└── style.css            # Global styles and Tailwind
```

## 🏗️ Architecture

### State Management
The application uses Zustand for lightweight, type-safe state management:

- **Campaign Data**: Centralized storage of mock campaign data
- **Filter State**: Current filter settings and search queries
- **UI State**: Selected campaigns, highlighted items, loading states
- **Prompt Processing**: Natural language interpretation and data manipulation

### Component Architecture
- **Container Components**: High-level components that manage state and business logic
- **Presentation Components**: Pure components focused on rendering and user interaction
- **Shared Components**: Reusable UI elements with consistent styling

### Data Flow
1. **User Interaction** → Component events
2. **State Updates** → Zustand store actions
3. **Data Processing** → Filtering, sorting, highlighting
4. **UI Updates** → Reactive component re-renders

## 🎯 Key Features Explained

### Prompt Playground
The AI simulation uses keyword matching and intent recognition:

```typescript
// Example prompt processing
if (lowerPrompt.includes('ctr') && lowerPrompt.includes('top')) {
  // Sort by CTR descending and highlight top campaign
  const sorted = campaigns.sort((a, b) => b.ctr - a.ctr)
  highlightCampaign(sorted[0]?.id)
}
```

### Responsive Design
- **Mobile-First**: Designed for mobile devices with progressive enhancement
- **Flexible Grid**: CSS Grid and Flexbox for adaptive layouts
- **Touch-Friendly**: Large tap targets and intuitive mobile interactions

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Reduced Motion**: Respects user preferences for motion

## 📊 Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 90
- **SEO**: ≥ 95

### Core Web Vitals (Target)
- **LCP (Largest Contentful Paint)**: ≤ 2.5s
- **CLS (Cumulative Layout Shift)**: ≤ 0.05
- **INP (Interaction to Next Paint)**: ≤ 200ms

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Manual Build
```bash
bun run build
bun run preview
```

## 🧪 Testing

```bash
# Run type checking
bun run build

# Start development server
bun run dev

# Build for production
bun run build
```

## 📝 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint (if configured)

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Data**: Update `src/data/mockData.ts` for different campaign data
- **Prompts**: Extend prompt processing in `src/store/dashboardStore.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- **Real API Integration**: Replace mock data with real marketing APIs
- **Advanced Analytics**: More sophisticated chart types and metrics
- **User Authentication**: Multi-user support with role-based access
- **Export Features**: PDF reports and CSV data export
- **Real-time Updates**: WebSocket integration for live data
- **Advanced AI**: Integration with OpenAI or similar services for enhanced NLP

## 📞 Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

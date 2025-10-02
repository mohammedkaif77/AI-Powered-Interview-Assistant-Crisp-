# 🤖 AI-Powered Interview Assistant

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.12.8-brightgreen.svg)](https://ant.design/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> A comprehensive React application for conducting AI-powered technical interviews with advanced candidate management, real-time evaluation, and detailed analytics dashboard.

## 🌟 Features

### 🎯 For Candidates (Interviewee Interface)
- **📄 Smart Resume Upload**: PDF/DOCX support with automatic field extraction
- **🤖 AI Question Generation**: Dynamic questions based on difficulty levels
- **⏱️ Timed Interviews**: Auto-submit functionality with visual countdown
- **💬 Chat-like Interface**: Intuitive Q&A experience
- **📊 Real-time Progress**: Visual progress tracking
- **💾 Session Persistence**: Resume incomplete interviews anytime

### 📊 For Interviewers (Advanced Dashboard)
- **👥 Comprehensive Candidate List**: Complete overview with scores and summaries
- **🔍 Advanced Search & Filtering**: Multi-criteria search and filtering system
- **📈 Detailed Analytics**: Individual question scores and performance breakdown
- **🎯 AI Evaluation**: Technical accuracy, completeness, and clarity scoring
- **📋 Skills Assessment**: Category-wise performance analysis
- **📤 Export Functionality**: Download candidate reports and data
- **🏆 Performance Metrics**: Dashboard overview with key statistics

## 🚀 Live Demo

[**View Live Application**](https://vercel.com/mohammedkaif77s-projects/ai-powered-interview-assistant-crisp/D4ARwwXi5S3Lr326g7SoFrdAGavY )

## 🛠️ Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **UI Framework**: Ant Design 5.12.8 for enterprise-grade components
- **State Management**: React Context API with custom hooks
- **Persistence**: Local Storage with session restore
- **Styling**: CSS3 with custom design system
- **Build Tool**: Create React App (CRA)
- **Language**: JavaScript ES6+

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-interview-assistant.git

# Navigate to project directory
cd ai-interview-assistant

# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000 in your browser
```

### Available Scripts

```bash
# Development
npm start          # Start development server
npm test           # Run test suite
npm run build      # Build for production
npm run eject      # Eject from CRA (one-way operation)
```

## 📁 Project Structure

```
ai-interview-assistant/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── AppHeader.js
│   │   │   └── AppLayout.js
│   │   ├── Interview/
│   │   │   ├── IntervieweeTab.js
│   │   │   ├── ResumeUpload.js
│   │   │   ├── InterviewChat.js
│   │   │   ├── QuestionCard.js
│   │   │   ├── Timer.js
│   │   │   └── ProgressBar.js
│   │   ├── Dashboard/
│   │   │   ├── InterviewerTab.js
│   │   │   ├── CandidateTable.js
│   │   │   ├── CandidateDetails.js
│   │   │   ├── MetricsCards.js
│   │   │   └── SearchFilter.js
│   │   └── Common/
│   │       ├── WelcomeBackModal.js
│   │       ├── LoadingSpinner.js
│   │       └── ErrorBoundary.js
│   ├── hooks/
│   │   ├── useTimer.js
│   │   ├── useLocalStorage.js
│   │   ├── useInterview.js
│   │   └── useCandidates.js
│   ├── context/
│   │   ├── InterviewContext.js
│   │   └── ThemeContext.js
│   ├── utils/
│   │   ├── resumeParser.js
│   │   ├── scoreCalculator.js
│   │   ├── dateHelpers.js
│   │   └── constants.js
│   ├── data/
│   │   ├── questions.js
│   │   └── mockCandidates.js
│   ├── styles/
│   │   ├── variables.css
│   │   ├── components.css
│   │   └── utilities.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── README.md
└── LICENSE
```

## 🎯 Usage Guide

### For Candidates

1. **Upload Resume**: Drag and drop PDF/DOCX files
2. **Complete Profile**: Fill in any missing information
3. **Take Interview**: Answer 6 timed technical questions
   - 2 Easy questions (30 seconds each)
   - 2 Medium questions (90 seconds each)
   - 2 Hard questions (150-180 seconds each)
4. **View Results**: Get final score and AI feedback

### For Interviewers

1. **Dashboard Overview**: View metrics and recent activity
2. **Candidate Management**: 
   - Search by name, email, or content
   - Filter by score ranges or dates
   - Sort by various criteria
3. **Detailed Analysis**: Click any candidate for:
   - Complete interview transcript
   - Individual question scores
   - AI evaluation breakdown
   - Skills assessment
   - Performance analytics

## 📊 Sample Data

The application includes 4 sample candidates with complete interview data:

| Candidate | Score | Status | Recommendation |
|-----------|-------|--------|----------------|
| Sarah Johnson | 87 | ✅ Completed | 🟢 Strong Hire |
| Emily Rodriguez | 94 | ✅ Completed | 🏆 Exceptional Hire |
| Michael Chen | 72 | ✅ Completed | 🟡 Consider |
| David Kim | 58 | ✅ Completed | 🔴 Not Recommended |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_api_endpoint
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
```

### Customization Options

- **Question Bank**: Modify `src/data/questions.js`
- **Scoring Logic**: Update `src/utils/scoreCalculator.js`
- **Styling**: Customize `src/styles/variables.css`
- **Timer Settings**: Configure in `src/utils/constants.js`

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Popular Platforms

#### Netlify
```bash
# Build and deploy
npm run build
# Drag and drop 'build' folder to Netlify
```

#### Vercel
```bash
npm install -g vercel
vercel
```

#### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"
npm run deploy
```

### Code Style

- Use ESLint and Prettier for code formatting
- Follow React functional component patterns
- Use meaningful component and variable names
- Add JSDoc comments for complex functions

## 📈 Roadmap

- [ ] **Multi-language Support** - i18n integration
- [ ] **Video Interviews** - WebRTC integration
- [ ] **Advanced Analytics** - Data visualization charts
- [ ] **Role-based Permissions** - Admin/HR/Interviewer roles
- [ ] **API Integration** - Backend service integration
- [ ] **Mobile App** - React Native version
- [ ] **AI Improvements** - Enhanced question generation
- [ ] **Bulk Operations** - Multiple candidate actions

## 🐛 Known Issues

- PDF parsing may not work with heavily formatted documents
- Timer accuracy depends on browser tab visibility
- Large resume files (>5MB) may cause performance issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Ant Design](https://ant.design/) for the amazing UI components
- [React](https://reactjs.org/) team for the excellent framework
- [Create React App](https://create-react-app.dev/) for the build setup
- Open source community for inspiration and guidance

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/mohammedkaif77/ai-interview-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mohammedkaif77/ai-interview-assistant/discussions)
- **Email**: kaif09390@gmail.com

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/mohammedkaif77/ai-interview-assistant?style=social)
![GitHub forks](https://img.shields.io/github/forks/mohammedkaif77/ai-interview-assistant?style=social)
![GitHub issues](https://img.shields.io/github/issues/mohammedkaif77/ai-interview-assistant)
![GitHub license](https://img.shields.io/github/license/mohammedkaif77/ai-interview-assistant)


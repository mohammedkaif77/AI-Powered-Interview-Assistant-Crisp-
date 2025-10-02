// Advanced AI-Powered Interview Assistant Application
class InterviewAssistant {
    constructor() {
        this.state = {
            currentTab: 'interviewee',
            currentStep: 'welcome',
            theme: 'light',
            loading: false,
            candidate: {
                id: null,
                name: '',
                email: '',
                phone: '',
                resumeFile: null,
                resumeText: ''
            },
            interview: {
                questions: [],
                answers: [],
                currentQuestionIndex: 0,
                timeLeft: 0,
                timer: null,
                startTime: null,
                endTime: null
            },
            infoCollection: {
                step: 'name',
                missingFields: []
            },
            dashboard: {
                candidates: [],
                filteredCandidates: [],
                selectedCandidate: null,
                filters: {
                    search: '',
                    scoreFilter: 'all'
                },
                sortBy: 'date',
                sortOrder: 'desc'
            }
        };

        this.enhancedQuestions = {
            "easy": [
                {
                    "id": "js_e1",
                    "text": "Explain the purpose of the Virtual DOM in React and how it improves performance.",
                    "difficulty": "easy",
                    "timeLimit": 30,
                    "category": "React Fundamentals",
                    "tags": ["react", "virtual-dom", "performance"],
                    "expectedKeywords": ["virtual", "dom", "performance", "reconciliation", "efficiency"]
                },
                {
                    "id": "js_e2",
                    "text": "What are the differences between arrow functions and regular functions in JavaScript?",
                    "difficulty": "easy", 
                    "timeLimit": 30,
                    "category": "JavaScript Basics",
                    "tags": ["javascript", "functions", "es6"],
                    "expectedKeywords": ["this", "binding", "hoisting", "syntax", "context"]
                },
                {
                    "id": "js_e3",
                    "text": "Explain what props are in React and how they differ from state.",
                    "difficulty": "easy",
                    "timeLimit": 25,
                    "category": "React Fundamentals", 
                    "tags": ["react", "props", "state"],
                    "expectedKeywords": ["props", "state", "immutable", "parent", "child"]
                }
            ],
            "medium": [
                {
                    "id": "sys_m1",
                    "text": "How would you implement user authentication and authorization in a React application?",
                    "difficulty": "medium",
                    "timeLimit": 90,
                    "category": "Authentication & Security",
                    "tags": ["react", "auth", "security", "jwt"],
                    "expectedKeywords": ["jwt", "token", "login", "protected", "routes", "context"]
                },
                {
                    "id": "api_m2", 
                    "text": "Explain the concept of microservices and when you would choose them over a monolithic architecture.",
                    "difficulty": "medium",
                    "timeLimit": 75,
                    "category": "System Architecture",
                    "tags": ["microservices", "architecture", "scalability"],
                    "expectedKeywords": ["microservices", "monolith", "scalability", "maintenance", "deployment"]
                },
                {
                    "id": "react_m3",
                    "text": "How do you handle error boundaries in React and why are they important?",
                    "difficulty": "medium",
                    "timeLimit": 60,
                    "category": "React Advanced",
                    "tags": ["react", "error-boundaries", "error-handling"],
                    "expectedKeywords": ["error", "boundary", "componentDidCatch", "fallback", "ui"]
                }
            ],
            "hard": [
                {
                    "id": "sys_h1",
                    "text": "Design a scalable system for handling real-time notifications for millions of users.",
                    "difficulty": "hard",
                    "timeLimit": 180,
                    "category": "System Design",
                    "tags": ["system-design", "scalability", "real-time", "notifications"],
                    "expectedKeywords": ["websocket", "queue", "database", "caching", "load-balancer", "microservices"]
                },
                {
                    "id": "react_h2",
                    "text": "How would you implement a custom hook for managing complex form state with validation?",
                    "difficulty": "hard", 
                    "timeLimit": 150,
                    "category": "React Hooks",
                    "tags": ["react", "hooks", "forms", "validation"],
                    "expectedKeywords": ["useReducer", "useCallback", "validation", "state", "custom-hook"]
                },
                {
                    "id": "perf_h3",
                    "text": "Explain various React performance optimization techniques and when to use each one.",
                    "difficulty": "hard",
                    "timeLimit": 120,
                    "category": "Performance Optimization", 
                    "tags": ["react", "performance", "optimization"],
                    "expectedKeywords": ["memo", "useMemo", "useCallback", "lazy", "code-splitting", "virtualization"]
                }
            ]
        };

        this.scoringMatrix = {
            "easy": {
                "excellent": { "min": 85, "max": 100, "feedback": "Outstanding understanding of fundamental concepts" },
                "good": { "min": 70, "max": 84, "feedback": "Solid grasp of basic principles with room for depth" },
                "average": { "min": 50, "max": 69, "feedback": "Basic understanding, needs more practice" },
                "poor": { "min": 0, "max": 49, "feedback": "Requires significant improvement in fundamentals" }
            },
            "medium": {
                "excellent": { "min": 90, "max": 100, "feedback": "Exceptional problem-solving and technical knowledge" },
                "good": { "min": 75, "max": 89, "feedback": "Strong technical skills with good practical application" }, 
                "average": { "min": 55, "max": 74, "feedback": "Decent understanding but lacks depth in some areas" },
                "poor": { "min": 0, "max": 54, "feedback": "Needs significant improvement in intermediate concepts" }
            },
            "hard": {
                "excellent": { "min": 95, "max": 100, "feedback": "Exceptional system thinking and advanced technical expertise" },
                "good": { "min": 80, "max": 94, "feedback": "Strong architectural understanding with practical insights" },
                "average": { "min": 60, "max": 79, "feedback": "Good foundation but needs more experience with complex systems" },
                "poor": { "min": 0, "max": 59, "feedback": "Requires substantial growth in advanced technical concepts" }
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkForIncompleteInterview();
        this.loadCandidatesData();
        this.updateDashboardMetrics();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.ant-tabs-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Welcome section
        document.getElementById('startInterviewBtn').addEventListener('click', () => {
            this.goToStep('upload');
        });

        // Resume upload
        this.setupResumeUpload();

        // Info collection
        this.setupInfoCollection();

        // Interview
        this.setupInterview();

        // Completion
        document.getElementById('startNewBtn').addEventListener('click', () => {
            this.startNewInterview();
        });

        document.getElementById('viewResultsBtn').addEventListener('click', () => {
            this.showDetailedResults();
        });

        // Dashboard
        this.setupDashboard();

        // Modals
        this.setupModals();
    }

    setupResumeUpload() {
        const uploadArea = document.getElementById('resumeUpload');
        const fileInput = document.getElementById('resumeInput');

        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileUpload(files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFileUpload(e.target.files[0]);
            }
        });
    }

    setupInfoCollection() {
        const infoInput = document.getElementById('infoInput');
        const submitBtn = document.getElementById('infoSubmitBtn');

        infoInput.addEventListener('input', () => {
            submitBtn.disabled = !infoInput.value.trim();
        });

        infoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !submitBtn.disabled) {
                this.submitInfo();
            }
        });

        submitBtn.addEventListener('click', () => {
            this.submitInfo();
        });
    }

    setupInterview() {
        const answerInput = document.getElementById('answerInput');
        const submitBtn = document.getElementById('submitAnswerBtn');
        const charCounter = document.getElementById('charCounter');

        answerInput.addEventListener('input', () => {
            const charCount = answerInput.value.length;
            charCounter.textContent = `${charCount} characters`;
            submitBtn.disabled = !answerInput.value.trim();
        });

        submitBtn.addEventListener('click', () => {
            this.submitAnswer();
        });
    }

    setupDashboard() {
        const searchInput = document.getElementById('candidateSearch');
        const scoreFilter = document.getElementById('scoreFilter');
        const exportBtn = document.getElementById('exportBtn');

        searchInput.addEventListener('input', () => {
            this.state.dashboard.filters.search = searchInput.value;
            this.filterCandidates();
        });

        scoreFilter.addEventListener('change', () => {
            this.state.dashboard.filters.scoreFilter = scoreFilter.value;
            this.filterCandidates();
        });

        exportBtn.addEventListener('click', () => {
            this.exportCandidatesData();
        });

        // Table sorting
        document.querySelectorAll('.sortable').forEach(header => {
            header.addEventListener('click', () => {
                const sortBy = header.dataset.sort;
                this.sortCandidates(sortBy);
            });
        });
    }

    setupModals() {
        // Welcome back modal
        document.getElementById('continueInterviewBtn').addEventListener('click', () => {
            this.continueInterview();
        });

        document.getElementById('startNewInterviewBtn').addEventListener('click', () => {
            this.startNewInterview();
        });

        // Candidate details modal
        document.getElementById('closeCandidateModal').addEventListener('click', () => {
            this.closeCandidateModal();
        });

        // Close modal on backdrop click
        document.querySelectorAll('.ant-modal-mask').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        });
    }

    switchTab(tabName) {
        this.state.currentTab = tabName;

        // Update tab buttons
        document.querySelectorAll('.ant-tabs-tab').forEach(tab => {
            tab.classList.remove('ant-tabs-tab-active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('ant-tabs-tab-active');

        // Update content
        document.querySelectorAll('.ant-tabs-tabpane').forEach(pane => {
            pane.classList.remove('ant-tabs-tabpane-active');
        });
        document.getElementById(`${tabName}Content`).classList.add('ant-tabs-tabpane-active');

        if (tabName === 'interviewer') {
            this.loadDashboard();
        }
    }

    goToStep(stepName) {
        this.state.currentStep = stepName;

        // Hide all steps
        document.querySelectorAll('.interview-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        document.getElementById(`${stepName}Section`).classList.add('active');

        if (stepName === 'info') {
            this.startInfoCollection();
        } else if (stepName === 'interview') {
            this.startInterview();
        }

        this.saveState();
    }

    toggleTheme() {
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', this.state.theme);
        
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = this.state.theme === 'light' ? '🌙' : '☀️';
        
        this.saveState();
    }

    showLoading(text = 'Processing your request...') {
        this.state.loading = true;
        const overlay = document.getElementById('loadingOverlay');
        const loadingText = document.querySelector('.loading-text');
        
        loadingText.textContent = text;
        overlay.classList.remove('hidden');
    }

    hideLoading() {
        this.state.loading = false;
        document.getElementById('loadingOverlay').classList.add('hidden');
    }

    handleFileUpload(file) {
        if (file.type !== 'application/pdf') {
            this.showAlert('error', 'Invalid File Type', 'Please upload a PDF file only.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            this.showAlert('error', 'File Too Large', 'Maximum file size is 5MB.');
            return;
        }

        this.showLoading('Processing your resume...');

        // Show upload status
        document.getElementById('uploadedFileName').textContent = file.name;
        document.getElementById('uploadStatus').classList.remove('hidden');

        // Simulate processing with progress
        let progress = 0;
        const progressBar = document.getElementById('processingBar');
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    this.processResume(file);
                }, 500);
            }
        }, 200);
    }

    processResume(file) {
        // Mock resume data extraction
        const mockExtractedData = {
            name: Math.random() > 0.3 ? this.generateMockName() : '',
            email: Math.random() > 0.3 ? this.generateMockEmail() : '',
            phone: Math.random() > 0.3 ? this.generateMockPhone() : ''
        };

        this.state.candidate = {
            id: this.generateId(),
            ...mockExtractedData,
            resumeFile: file.name,
            resumeText: this.generateMockResumeText()
        };

        // Determine missing fields
        const missingFields = [];
        if (!mockExtractedData.name) missingFields.push('name');
        if (!mockExtractedData.email) missingFields.push('email');
        if (!mockExtractedData.phone) missingFields.push('phone');

        this.state.infoCollection.missingFields = missingFields;

        this.hideLoading();

        if (missingFields.length > 0) {
            this.state.infoCollection.step = missingFields[0];
            setTimeout(() => {
                this.goToStep('info');
            }, 1000);
        } else {
            setTimeout(() => {
                this.goToStep('interview');
            }, 1000);
        }

        this.saveState();
    }

    startInfoCollection() {
        const chatContainer = document.getElementById('infoChat');
        this.clearChatContainer(chatContainer);
        
        this.addChatMessage(chatContainer, 'bot', 
            'I need to collect some additional information from your resume. Let me ask you a few questions.');
        
        setTimeout(() => {
            this.askNextInfoQuestion();
        }, 1000);
    }

    askNextInfoQuestion() {
        const chatContainer = document.getElementById('infoChat');
        const field = this.state.infoCollection.step;
        
        let question = '';
        switch(field) {
            case 'name':
                question = 'What is your full name?';
                break;
            case 'email':
                question = 'What is your email address?';
                break;
            case 'phone':
                question = 'What is your phone number?';
                break;
        }
        
        this.addChatMessage(chatContainer, 'bot', question);
    }

    submitInfo() {
        const input = document.getElementById('infoInput');
        const value = input.value.trim();
        const chatContainer = document.getElementById('infoChat');
        
        if (!value) return;
        
        this.addChatMessage(chatContainer, 'user', value);
        
        // Store the value
        this.state.candidate[this.state.infoCollection.step] = value;
        
        // Move to next missing field
        const currentIndex = this.state.infoCollection.missingFields.indexOf(this.state.infoCollection.step);
        if (currentIndex < this.state.infoCollection.missingFields.length - 1) {
            this.state.infoCollection.step = this.state.infoCollection.missingFields[currentIndex + 1];
            setTimeout(() => {
                this.askNextInfoQuestion();
            }, 1000);
        } else {
            // All info collected
            setTimeout(() => {
                this.addChatMessage(chatContainer, 'bot', 
                    'Perfect! I have all the information I need. Let\'s start your technical interview.');
                setTimeout(() => {
                    this.goToStep('interview');
                }, 2000);
            }, 1000);
        }
        
        input.value = '';
        document.getElementById('infoSubmitBtn').disabled = true;
        this.saveState();
    }

    startInterview() {
        // Generate questions (2 from each difficulty)
        this.state.interview.questions = this.generateQuestions();
        this.state.interview.currentQuestionIndex = 0;
        this.state.interview.answers = [];
        this.state.interview.startTime = new Date().toISOString();
        
        this.loadCurrentQuestion();
        this.saveState();
    }

    generateQuestions() {
        const questions = [];
        
        // Select 2 from each difficulty randomly
        Object.keys(this.enhancedQuestions).forEach(difficulty => {
            const difficultyQuestions = [...this.enhancedQuestions[difficulty]]
                .sort(() => Math.random() - 0.5)
                .slice(0, 2);
            questions.push(...difficultyQuestions);
        });
        
        // Shuffle final order
        return questions.sort(() => Math.random() - 0.5);
    }

    loadCurrentQuestion() {
        const question = this.state.interview.questions[this.state.interview.currentQuestionIndex];
        if (!question) return;
        
        const chatContainer = document.getElementById('interviewChat');
        
        // Clear previous answer
        document.getElementById('answerInput').value = '';
        document.getElementById('charCounter').textContent = '0 characters';
        document.getElementById('submitAnswerBtn').disabled = true;
        
        // Add question to chat
        const questionHtml = `
            <div class="question-meta">
                <span class="difficulty-badge ${question.difficulty}">${question.difficulty}</span>
                <span>${question.category}</span>
            </div>
            ${question.text}
        `;
        
        this.addChatMessage(chatContainer, 'bot', questionHtml, 'question');
        
        // Update progress
        this.updateProgress();
        
        // Start timer
        this.startTimer(question.timeLimit);
    }

    updateProgress() {
        const current = this.state.interview.currentQuestionIndex + 1;
        const total = this.state.interview.questions.length;
        const percentage = (current / total) * 100;
        
        document.getElementById('progressText').textContent = `Question ${current} of ${total}`;
        document.getElementById('progressBar').style.width = `${percentage}%`;
    }

    startTimer(timeLimit) {
        this.state.interview.timeLeft = timeLimit;
        const timerValue = document.getElementById('timerValue');
        const timerCircle = document.querySelector('.timer-circle');
        
        timerValue.textContent = timeLimit;
        timerCircle.className = 'timer-circle';
        
        this.state.interview.timer = setInterval(() => {
            this.state.interview.timeLeft--;
            timerValue.textContent = this.state.interview.timeLeft;
            
            // Update timer appearance
            timerCircle.className = 'timer-circle';
            if (this.state.interview.timeLeft <= 10) {
                timerCircle.classList.add('danger');
            } else if (this.state.interview.timeLeft <= 30) {
                timerCircle.classList.add('warning');
            }
            
            if (this.state.interview.timeLeft <= 0) {
                clearInterval(this.state.interview.timer);
                this.autoSubmitAnswer();
            }
            
            this.saveState();
        }, 1000);
    }

    submitAnswer() {
        const answerText = document.getElementById('answerInput').value.trim();
        if (!answerText) return;
        
        this.processAnswer(answerText, false);
    }

    autoSubmitAnswer() {
        const answerText = document.getElementById('answerInput').value.trim();
        this.processAnswer(answerText, true);
    }

    processAnswer(answerText, isTimeout) {
        clearInterval(this.state.interview.timer);
        
        const question = this.state.interview.questions[this.state.interview.currentQuestionIndex];
        const timeSpent = question.timeLimit - this.state.interview.timeLeft;
        const chatContainer = document.getElementById('interviewChat');
        
        // Add timeout message if needed
        if (isTimeout) {
            this.addChatMessage(chatContainer, 'bot', 'Time\'s up! Moving to the next question.');
        }
        
        // Add user answer to chat
        if (answerText) {
            this.addChatMessage(chatContainer, 'user', answerText);
        } else if (isTimeout) {
            this.addChatMessage(chatContainer, 'user', 'No answer provided');
        }
        
        // Score the answer
        const score = this.scoreAnswer(question, answerText, timeSpent, isTimeout);
        const feedback = this.generateFeedback(question, answerText, score);
        
        // Store answer
        this.state.interview.answers.push({
            questionId: question.id,
            text: answerText || 'No answer provided',
            timeSpent: timeSpent,
            score: score,
            feedback: feedback,
            isTimeout: isTimeout
        });
        
        // Move to next question
        this.state.interview.currentQuestionIndex++;
        
        if (this.state.interview.currentQuestionIndex < this.state.interview.questions.length) {
            setTimeout(() => {
                this.loadCurrentQuestion();
            }, 1500);
        } else {
            setTimeout(() => {
                this.completeInterview();
            }, 1500);
        }
        
        this.saveState();
    }

    scoreAnswer(question, answerText, timeSpent, isTimeout) {
        const difficulty = question.difficulty;
        const matrix = this.scoringMatrix[difficulty];
        
        let baseScore = matrix.poor.min;
        
        if (!answerText.trim()) {
            return 0;
        }
        
        // Length bonus
        if (answerText.length > 50) baseScore += 10;
        if (answerText.length > 150) baseScore += 15;
        if (answerText.length > 300) baseScore += 10;
        
        // Keyword matching
        const keywords = question.expectedKeywords || [];
        const foundKeywords = keywords.filter(keyword => 
            answerText.toLowerCase().includes(keyword.toLowerCase())
        );
        
        baseScore += foundKeywords.length * 8;
        
        // Time bonus (if answered quickly)
        const timeRatio = timeSpent / question.timeLimit;
        if (timeRatio < 0.6 && !isTimeout) {
            baseScore += 10;
        }
        
        // Timeout penalty
        if (isTimeout && answerText) {
            baseScore *= 0.8;
        }
        
        // Quality heuristics (simple)
        if (answerText.includes('example') || answerText.includes('for instance')) {
            baseScore += 5;
        }
        
        if (answerText.split('.').length > 2) { // Multiple sentences
            baseScore += 5;
        }
        
        // Cap the score based on difficulty
        return Math.min(Math.max(baseScore, 0), matrix.excellent.max);
    }

    generateFeedback(question, answerText, score) {
        const difficulty = question.difficulty;
        const matrix = this.scoringMatrix[difficulty];
        
        let category = 'poor';
        let feedback = '';
        
        Object.keys(matrix).forEach(key => {
            const range = matrix[key];
            if (score >= range.min && score <= range.max) {
                category = key;
                feedback = range.feedback;
            }
        });
        
        // Add specific suggestions based on keywords found
        const keywords = question.expectedKeywords || [];
        const foundKeywords = keywords.filter(keyword => 
            answerText.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (foundKeywords.length < keywords.length / 2) {
            feedback += ` Consider covering key concepts like: ${keywords.slice(0, 3).join(', ')}.`;
        }
        
        return feedback;
    }

    completeInterview() {
        this.state.interview.endTime = new Date().toISOString();
        
        // Calculate final score
        const totalScore = this.state.interview.answers.reduce((sum, answer) => sum + answer.score, 0);
        const finalScore = Math.round(totalScore / this.state.interview.answers.length);
        
        // Create completed candidate record
        const completedCandidate = {
            ...this.state.candidate,
            interview: {
                ...this.state.interview,
                finalScore: finalScore
            },
            completedAt: new Date().toISOString(),
            status: 'completed'
        };
        
        // Save candidate
        this.saveCandidateResult(completedCandidate);
        
        // Show completion
        this.showCompletion(finalScore);
        
        // Clear current interview state
        this.clearCurrentInterview();
    }

    showCompletion(finalScore) {
        let category = 'Poor Performance';
        let badgeClass = 'error';
        
        if (finalScore >= 90) {
            category = 'Excellent Performance';
            badgeClass = 'success';
        } else if (finalScore >= 75) {
            category = 'Good Performance';
            badgeClass = 'success';
        } else if (finalScore >= 55) {
            category = 'Average Performance';
            badgeClass = 'warning';
        }
        
        document.getElementById('finalScore').textContent = finalScore;
        document.getElementById('scoreCategory').textContent = category;
        
        const scoreBadge = document.querySelector('.score-badge .ant-badge-status');
        scoreBadge.className = `ant-badge-status ant-badge-status-${badgeClass}`;
        
        this.goToStep('completion');
    }

    showDetailedResults() {
        const candidate = this.getCurrentCompletedCandidate();
        if (candidate) {
            this.showCandidateDetails(candidate.id);
        }
    }

    getCurrentCompletedCandidate() {
        const candidates = this.getCandidatesFromStorage();
        return candidates.find(c => c.id === this.state.candidate.id);
    }

    saveCandidateResult(candidate) {
        const candidates = this.getCandidatesFromStorage();
        candidates.push(candidate);
        
        // Sort by completion date (newest first)
        candidates.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
        
        localStorage.setItem('interview-candidates', JSON.stringify(candidates));
        
        // Update dashboard if visible
        if (this.state.currentTab === 'interviewer') {
            this.loadDashboard();
        }
    }

    getCandidatesFromStorage() {
        return JSON.parse(localStorage.getItem('interview-candidates') || '[]');
    }

    startNewInterview() {
        this.clearCurrentInterview();
        this.resetInterviewState();
        this.goToStep('welcome');
        this.switchTab('interviewee');
        
        // Hide modals
        document.getElementById('welcomeBackModal').classList.add('hidden');
    }

    clearCurrentInterview() {
        localStorage.removeItem('current-interview');
    }

    resetInterviewState() {
        // Clear timers
        if (this.state.interview.timer) {
            clearInterval(this.state.interview.timer);
        }
        
        // Reset state
        this.state = {
            ...this.state,
            currentStep: 'welcome',
            candidate: {
                id: null,
                name: '',
                email: '',
                phone: '',
                resumeFile: null,
                resumeText: ''
            },
            interview: {
                questions: [],
                answers: [],
                currentQuestionIndex: 0,
                timeLeft: 0,
                timer: null,
                startTime: null,
                endTime: null
            },
            infoCollection: {
                step: 'name',
                missingFields: []
            }
        };
        
        // Reset UI
        document.getElementById('uploadStatus').classList.add('hidden');
        document.getElementById('resumeInput').value = '';
        document.getElementById('processingBar').style.width = '0%';
        this.clearChatContainer('infoChat');
        this.clearChatContainer('interviewChat');
        document.getElementById('infoInput').value = '';
        document.getElementById('answerInput').value = '';
        document.getElementById('charCounter').textContent = '0 characters';
    }

    checkForIncompleteInterview() {
        const savedInterview = localStorage.getItem('current-interview');
        if (savedInterview) {
            try {
                const data = JSON.parse(savedInterview);
                if (data.interview.questions.length > 0 && 
                    data.interview.currentQuestionIndex < data.interview.questions.length) {
                    
                    document.getElementById('modalProgressText').textContent = 
                        `Question ${data.interview.currentQuestionIndex + 1} of ${data.interview.questions.length}`;
                    document.getElementById('welcomeBackModal').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error parsing saved interview:', error);
                localStorage.removeItem('current-interview');
            }
        }
    }

    continueInterview() {
        const savedInterview = localStorage.getItem('current-interview');
        if (savedInterview) {
            try {
                const data = JSON.parse(savedInterview);
                this.state = { ...this.state, ...data };
                
                document.getElementById('welcomeBackModal').classList.add('hidden');
                this.switchTab('interviewee');
                this.goToStep('interview');
                this.loadCurrentQuestion();
            } catch (error) {
                console.error('Error restoring interview:', error);
                this.startNewInterview();
            }
        }
    }

    loadDashboard() {
        this.loadCandidatesData();
        this.updateDashboardMetrics();
        this.filterCandidates();
    }

    loadCandidatesData() {
        this.state.dashboard.candidates = this.getCandidatesFromStorage();
    }

    updateDashboardMetrics() {
        const candidates = this.state.dashboard.candidates;
        const completed = candidates.filter(c => c.status === 'completed');
        
        const totalInterviews = completed.length;
        const averageScore = totalInterviews > 0 ? 
            Math.round(completed.reduce((sum, c) => sum + c.interview.finalScore, 0) / totalInterviews) : 0;
        const completionRate = 100; // Assuming all stored interviews are completed
        
        document.getElementById('totalInterviews').textContent = totalInterviews;
        document.getElementById('averageScore').textContent = averageScore;
        document.getElementById('completionRate').textContent = completionRate;
    }

    filterCandidates() {
        const { search, scoreFilter } = this.state.dashboard.filters;
        let filtered = [...this.state.dashboard.candidates];
        
        // Search filter
        if (search) {
            filtered = filtered.filter(candidate => 
                candidate.name.toLowerCase().includes(search.toLowerCase()) ||
                candidate.email.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        // Score filter
        if (scoreFilter !== 'all') {
            filtered = filtered.filter(candidate => {
                const score = candidate.interview.finalScore;
                switch(scoreFilter) {
                    case 'excellent': return score >= 90;
                    case 'good': return score >= 71 && score < 90;
                    case 'average': return score >= 41 && score < 71;
                    case 'poor': return score < 41;
                    default: return true;
                }
            });
        }
        
        this.state.dashboard.filteredCandidates = filtered;
        this.renderCandidatesTable();
    }

    sortCandidates(sortBy) {
        const { sortOrder } = this.state.dashboard;
        const newOrder = (this.state.dashboard.sortBy === sortBy && sortOrder === 'desc') ? 'asc' : 'desc';
        
        this.state.dashboard.sortBy = sortBy;
        this.state.dashboard.sortOrder = newOrder;
        
        this.state.dashboard.filteredCandidates.sort((a, b) => {
            let aValue, bValue;
            
            switch(sortBy) {
                case 'score':
                    aValue = a.interview.finalScore;
                    bValue = b.interview.finalScore;
                    break;
                case 'date':
                    aValue = new Date(a.completedAt);
                    bValue = new Date(b.completedAt);
                    break;
                default:
                    return 0;
            }
            
            if (newOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
        
        this.renderCandidatesTable();
    }

    renderCandidatesTable() {
        const tbody = document.getElementById('candidatesTableBody');
        const emptyState = document.getElementById('emptyState');
        const candidates = this.state.dashboard.filteredCandidates;
        
        if (candidates.length === 0) {
            tbody.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }
        
        emptyState.classList.add('hidden');
        
        tbody.innerHTML = candidates.map(candidate => `
            <tr class="ant-table-row">
                <td class="ant-table-cell">
                    <div class="candidate-info">
                        <div class="candidate-name">${candidate.name}</div>
                        <div class="candidate-email">${candidate.email}</div>
                    </div>
                </td>
                <td class="ant-table-cell">
                    <span class="score-display-cell score-${this.getScoreClass(candidate.interview.finalScore)}">
                        ${candidate.interview.finalScore}
                    </span>
                </td>
                <td class="ant-table-cell">
                    ${this.formatDate(candidate.completedAt)}
                </td>
                <td class="ant-table-cell">
                    <span class="ant-badge-status ant-badge-status-${this.getScoreStatus(candidate.interview.finalScore)}"></span>
                    ${this.getScoreCategory(candidate.interview.finalScore)}
                </td>
                <td class="ant-table-cell">
                    <div class="table-actions">
                        <button class="ant-btn ant-btn-link" onclick="app.showCandidateDetails('${candidate.id}')">
                            View Details
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    showCandidateDetails(candidateId) {
        const candidate = this.state.dashboard.candidates.find(c => c.id === candidateId);
        if (!candidate) return;
        
        const modal = document.getElementById('candidateModal');
        const title = document.getElementById('candidateModalTitle');
        const body = document.getElementById('candidateDetailsBody');
        
        title.textContent = `${candidate.name} - Interview Results`;
        
        body.innerHTML = `
            <div class="candidate-profile">
                <div class="profile-field">
                    <div class="profile-label">Name</div>
                    <div class="profile-value">${candidate.name}</div>
                </div>
                <div class="profile-field">
                    <div class="profile-label">Email</div>
                    <div class="profile-value">${candidate.email}</div>
                </div>
                <div class="profile-field">
                    <div class="profile-label">Phone</div>
                    <div class="profile-value">${candidate.phone}</div>
                </div>
                <div class="profile-field">
                    <div class="profile-label">Completed</div>
                    <div class="profile-value">${this.formatDate(candidate.completedAt)}</div>
                </div>
            </div>
            
            <div class="interview-summary">
                <h4>Interview Summary</h4>
                <div class="summary-stats">
                    <div class="stat-item">
                        <span class="stat-value">${candidate.interview.finalScore}</span>
                        <div class="stat-label">Final Score</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${candidate.interview.questions.length}</span>
                        <div class="stat-label">Questions</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${candidate.interview.answers.filter(a => a.score >= 70).length}</span>
                        <div class="stat-label">Strong Answers</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${this.calculateTotalTime(candidate.interview)}</span>
                        <div class="stat-label">Total Time</div>
                    </div>
                </div>
            </div>
            
            <div class="question-review">
                <h4>Question by Question Review</h4>
                ${candidate.interview.questions.map((question, index) => {
                    const answer = candidate.interview.answers[index];
                    return `
                        <div class="question-item">
                            <div class="question-header">
                                <span class="question-text">${question.text}</span>
                                <span class="question-score score-${this.getScoreClass(answer.score)}">${answer.score}/100</span>
                            </div>
                            <div class="question-meta">
                                <span class="difficulty-badge ${question.difficulty}">${question.difficulty}</span>
                                <span>${question.category}</span>
                                <span>Time: ${answer.timeSpent}s / ${question.timeLimit}s</span>
                                ${answer.isTimeout ? '<span style="color: var(--color-error);">Timeout</span>' : ''}
                            </div>
                            <div class="answer-text">${answer.text}</div>
                            <div class="feedback-text">${answer.feedback}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        modal.classList.remove('hidden');
    }

    closeCandidateModal() {
        document.getElementById('candidateModal').classList.add('hidden');
    }

    exportCandidatesData() {
        const candidates = this.state.dashboard.filteredCandidates;
        if (candidates.length === 0) {
            alert('No data to export');
            return;
        }

        // Simple CSV export
        const headers = ['Name', 'Email', 'Phone', 'Score', 'Date', 'Status'];
        const csvData = [
            headers.join(','),
            ...candidates.map(c => [
                c.name,
                c.email,
                c.phone,
                c.interview.finalScore,
                this.formatDate(c.completedAt),
                this.getScoreCategory(c.interview.finalScore)
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `interview-results-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // Utility methods
    generateId() {
        return 'candidate_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateMockName() {
        const firstNames = ['John', 'Jane', 'Alex', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
        return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    }

    generateMockEmail() {
        const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com'];
        const name = this.generateMockName().toLowerCase().replace(' ', '.');
        return `${name}@${domains[Math.floor(Math.random() * domains.length)]}`;
    }

    generateMockPhone() {
        return `+1-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
    }

    generateMockResumeText() {
        return "Software Engineer with 5+ years of experience in React, Node.js, and cloud technologies...";
    }

    addChatMessage(container, sender, message, extraClass = '') {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = `message-bubble ${sender} ${extraClass}`;
        bubbleDiv.innerHTML = message;
        
        messageDiv.appendChild(bubbleDiv);
        container.appendChild(messageDiv);
        
        // Smooth scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    clearChatContainer(container) {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        if (container) {
            container.innerHTML = '';
        }
    }

    saveState() {
        if (this.state.interview.questions.length > 0 && 
            this.state.interview.currentQuestionIndex < this.state.interview.questions.length) {
            localStorage.setItem('current-interview', JSON.stringify({
                candidate: this.state.candidate,
                interview: this.state.interview,
                infoCollection: this.state.infoCollection,
                currentStep: this.state.currentStep
            }));
        }
    }

    formatDate(isoString) {
        return new Date(isoString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    calculateTotalTime(interview) {
        const totalMinutes = interview.answers.reduce((sum, answer) => sum + answer.timeSpent, 0) / 60;
        return `${Math.round(totalMinutes)}m`;
    }

    getScoreClass(score) {
        if (score >= 90) return 'excellent';
        if (score >= 71) return 'good';
        if (score >= 41) return 'average';
        return 'poor';
    }

    getScoreStatus(score) {
        if (score >= 71) return 'success';
        if (score >= 41) return 'warning';
        return 'error';
    }

    getScoreCategory(score) {
        if (score >= 90) return 'Excellent';
        if (score >= 71) return 'Good';
        if (score >= 41) return 'Average';
        return 'Poor';
    }

    showAlert(type, title, message) {
        // Simple alert for now - could be enhanced with proper Ant Design notifications
        alert(`${title}: ${message}`);
    }
}

// Initialize the application
let app;

document.addEventListener('DOMContentLoaded', function() {
    app = new InterviewAssistant();
});
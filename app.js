class GameManager {
    isTouchDevice() {
        return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    }

    getStorageItem(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn(`localStorage read failed for key "${key}":`, e);
            return this.storageFallback ? (this.storageFallback[key] || null) : null;
        }
    }

    setStorageItem(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn(`localStorage write failed for key "${key}":`, e);
        }
        if (this.storageFallback) {
            this.storageFallback[key] = value;
        }
    }

    cacheElements() {
        this.appContainer = document.getElementById('app');
        this.progressBar = document.getElementById('progress-bar');
        this.progressInfo = document.getElementById('progress-info');
        this.progressContainer = document.getElementById('progress-container');
        this.clockTimerText = document.getElementById('clock-timer-text');
        this.clockTimerBar = document.getElementById('clock-timer-bar');
        this.clockOptionsContainer = document.getElementById('clock-options-container');
        this.clockPrompt = document.getElementById('clock-prompt');
        this.clockProgressInfo = document.getElementById('clock-progress-info');
        this.clockCanvas = document.getElementById('clock-canvas');
        this.mathQuestion = document.getElementById('math-question');
        this.mathTimer = document.getElementById('math-timer');
        this.mathInput = document.getElementById('math-input');
        this.mathProgress = document.getElementById('math-progress');
        this.submitMathBtn = document.getElementById('submit-math-btn');
        this.numberPrompt = document.getElementById('number-prompt');
        this.numberDisplay = document.getElementById('number-display');
        this.numberInputContainer = document.getElementById('number-input-container');
        this.numberInput = document.getElementById('number-input');
        this.submitNumberBtn = document.getElementById('submit-number-btn');
        this.memoryGrid = document.getElementById('memory-grid');
        this.submitGridBtn = document.getElementById('submit-grid-btn');
        this.storyText = document.getElementById('story-text');
        this.storyTimer = document.getElementById('story-timer');
        this.dynamicQuestionsContainer = document.getElementById('dynamic-questions-container');
        this.submitStoryBtn = document.getElementById('submit-story-btn');
        this.addressTimer = document.getElementById('address-timer');
        this.addressTextContainer = document.getElementById('address-text-container');
        this.addressOptionsContainer = document.getElementById('address-options-container');
        this.submitAddressBtn = document.getElementById('submit-address-btn');
        this.nbackLetterDisplay = document.getElementById('nback-letter-display');
        this.nbackFeedback = document.getElementById('nback-feedback');
        this.nbackTouchZone = document.getElementById('nback-touch-zone');
        this.reactionTouchZone = document.getElementById('reaction-touch-zone');
        this.minigamePrompt = document.getElementById('minigame-prompt');
        this.flankerFeedback = document.getElementById('flanker-feedback');
        this.flankerArrows = document.getElementById('flanker-arrows');
        this.flankerTouchLeft = document.getElementById('flanker-touch-left');
        this.flankerTouchRight = document.getElementById('flanker-touch-right');
        this.roundScore = document.getElementById('round-score');
        this.resultsTitle = document.getElementById('results-title');
        this.nextTestBtn = document.getElementById('next-test-btn');
        this.historyContainer = document.getElementById('history-container');
        this.historyDetailContainer = document.getElementById('history-detail-container');
        this.settingsModal = document.getElementById('settings-modal');
        this.toggleSound = document.getElementById('toggle-sound');
        this.toggleTheme = document.getElementById('toggle-theme');
        this.settingsBtn = document.getElementById('settings-btn');
        this.closeSettingsBtn = document.getElementById('close-settings-btn');
        this.viewHistoryBtn = document.getElementById('view-history-btn');
        this.closeHistoryBtn = document.getElementById('close-history-btn');
        this.startFullBtn = document.getElementById('start-full-btn');
        this.durationSelect = document.getElementById('duration-select');
        this.showIndividualBtn = document.getElementById('show-individual-btn');
        this.beginTestBtn = document.getElementById('begin-test-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.roundCompleteBtn = document.getElementById('round-complete-btn');
        this.roundCompleteText = document.getElementById('round-complete-text');
        this.finalSummary = document.getElementById('final-summary');
        this.instTitle = document.getElementById('inst-title');
        this.instDesc = document.getElementById('inst-desc');
    }

    constructor() {
        this.storageFallback = {};
        this.cacheElements();

        // Full sequence: Tests 1-9
        this.testSequence = [
            'storyMemoryReading',
            'audioReaction',
            'visualReaction',
            'inhibitoryControl',
            'flankerArrow',
            'visualSpatialMemory',
            'simultaneousSpatialMemory',
            'sequentialNumberMemory',
            'reverseSequentialNumberMemory',
            'nBackTask',
            'chimpTest',
            'mentalMath',
            'storyMath',
            'clockReading',
            'storyMemoryQuestions'
        ];
        this.currentTestIndex = 0;

        this.state = {
            scores: {},
            breakdowns: {}
        };

        // Load Settings and History from localStorage
        const savedSettings = JSON.parse(this.getStorageItem('cognitiveTestSettings'));
        this.settings = savedSettings || { soundEnabled: true, darkMode: true };
        this.applyTheme(this.settings.darkMode);

        this.testInfo = {
            storyMemoryReading: {
                title: "Story Memory (Reading)",
                desc: "Read the following short story carefully. You will be tested on the details later. You have 30 seconds."
            },
            audioReaction: {
                title: "Audio Reaction Time",
                desc: `The screen will instruct you to wait. When you hear a <strong>beep</strong>, ${this.isTouchDevice() ? '<strong>tap the screen</strong>' : 'press the <strong>Spacebar</strong>'} as fast as you can. Make sure your volume is turned on.`
            },
            visualReaction: {
                title: "Visual Reaction Time",
                desc: `The screen will turn red. When it turns green, ${this.isTouchDevice() ? '<strong>tap the screen</strong>' : 'press the <strong>Spacebar</strong>'} as fast as you can. Do not press it before.`
            },
            inhibitoryControl: {
                title: "Inhibitory Control",
                desc: `The screen will be red. ${this.isTouchDevice() ? '<strong>Tap the screen</strong>' : 'Press the <strong>Spacebar</strong>'} ONLY when it turns green. A distractor beep may play randomly. If you ${this.isTouchDevice() ? 'tap' : 'press the Spacebar'} on the beep before the color changes, you fail the round.`
            },
            flankerArrow: {
                title: "Flanker Arrow Task",
                desc: `A row of 5 arrows will flash on screen. Look ONLY at the <strong>middle arrow</strong>.<br><br>${this.isTouchDevice() ? 'Tap the <strong>LEFT</strong> zone if it points left (←).<br>Tap the <strong>RIGHT</strong> zone if it points right (→).' : 'Press the <strong>Left Arrow Key</strong> if it points left (←).<br>Press the <strong>Right Arrow Key</strong> if it points right (→).'}<br><br>Ignore the outer arrows. This will repeat 10 times. Be as fast and accurate as possible.`
            },
            visualSpatialMemory: {
                title: "Sequential Spatial Memory",
                desc: "A sequence of blocks will light up on the grid. Remember the pattern.<br><br>When they disappear, click the blocks in the <strong>exact same order</strong> they appeared. Press 'Confirm Pattern' when finished."
            },
            simultaneousSpatialMemory: {
                title: "Simultaneous Spatial Memory",
                desc: "Several blocks will light up on the grid <strong>all at once</strong> for 2 seconds.<br><br>When they disappear, click all the blocks that were lit. The order does not matter. Press 'Confirm Pattern' when finished."
            },
            sequentialNumberMemory: {
                title: "Sequential Number Memory",
                desc: "A sequence of 9 numbers will flash on the screen one by one. Remember the sequence.<br><br>Afterward, type the entire sequence into the box and submit."
            },
            reverseSequentialNumberMemory: {
                title: "Reverse Sequential Numbers",
                desc: "A sequence of 9 numbers will flash on the screen.<br><br>Afterward, type the entire sequence in <strong>REVERSE order</strong> (e.g., if you saw 1-2-3, type 3-2-1). Be careful!"
            },
            nBackTask: {
                title: "N-Back Task (2-Back)",
                desc: `A sequence of 25 letters will appear one by one.<br><br>${this.isTouchDevice() ? '<strong>Tap the screen</strong>' : 'press the <strong>Spacebar</strong>'} ONLY if the current letter matches the letter you saw <strong>2 steps ago</strong> (e.g., A -> B -> A).<br><br>Do not ${this.isTouchDevice() ? 'tap' : 'press anything'} if it does not match.`
            },
            storyMemoryQuestions: {
                title: "Story Memory Recall",
                desc: "Answer the questions about the story you read at the beginning of the test."
            },
            addressMemoryReading: {
                title: "Address Memory (Reading)",
                desc: "Read the following address carefully. You will be tested on the exact details later. You have 15 seconds."
            },
            addressMemoryQuestions: {
                title: "Address Memory Recall",
                desc: "Select the EXACT address you read earlier. Watch out for minor trick differences."
            },
            chimpTest: {
                title: "Chimp Test",
                desc: "Numbers 1-8 will appear on a 4×4 grid. Click them in ascending order (1, 2, 3...).<br><br>After your <strong>first click</strong>, all remaining numbers will be hidden. Remember their positions!<br><br>Wrong clicks count as mistakes. Try to make <strong>zero mistakes</strong>."
            },
            mentalMath: {
                title: "Mental Math",
                desc: "Solve 12 math problems as fast as possible. You have <strong>20 seconds</strong> per question. Press Enter to submit."
            },
            storyMath: {
                title: "Story Math",
                desc: "Solve 5 math word problems. You have <strong>60 seconds</strong> per question. Press Enter to submit."
            },
            clockReading: {
                title: "Clock Reading",
                desc: "An analog clock will be shown. Select the correct time from the multiple-choice options underneath as fast as possible.<br><br>There are 10 rounds of max 10 seconds. 5 rounds will show hour indicator lines, and 5 rounds will show no indicators. Keyboard keys <strong>1</strong>, <strong>2</strong>, <strong>3</strong>, and <strong>4</strong> can be used as shortcuts."
            },
            story1Reading: {
                title: "Story 1 Memory (Reading)",
                desc: "Read the following short story carefully. You will be tested on the details later. You have 30 seconds."
            },
            story2Reading: {
                title: "Story 2 Memory (Reading)",
                desc: "Read the following short story carefully. You will be tested on the details later. You have 30 seconds."
            },
            story3Reading: {
                title: "Story 3 Memory (Reading)",
                desc: "Read the following short story carefully. You will be tested on the details later. You have 30 seconds."
            },
            story1Recall1: {
                title: "Story 1 Recall (Phase 1)",
                desc: "Answer the question about the first story you read."
            },
            story1Recall2: {
                title: "Story 1 Recall (Phase 2)",
                desc: "Answer the next question about the first story you read."
            },
            story1Recall3: {
                title: "Story 1 Recall (Phase 3)",
                desc: "Answer the final question about the first story you read."
            },
            story2Recall1: {
                title: "Story 2 Recall (Phase 1)",
                desc: "Answer the question about the second story you read."
            },
            story2Recall2: {
                title: "Story 2 Recall (Phase 2)",
                desc: "Answer the next question about the second story you read."
            },
            story3Recall1: {
                title: "Story 3 Recall",
                desc: "Answer the question about the third story you read."
            }
        };

        this.stories = window.COGNITIVE_STORIES || [];
        this.addresses = window.COGNITIVE_ADDRESSES || [];
        this.storyMathTemplates = window.COGNITIVE_MATH_TEMPLATES || [];

        // Game-specific variables
        this.gameData = {
            timeoutId: null,
            intervalId: null,
            distractorIntervalId: null,
            startTime: null,
            isWaiting: false,
            audioCtx: null,
            // Multi-trial tracking
            currentTrialCount: 0,
            trialTimes: [],
            trialScores: [],

            // Flanker specific
            flankerTrialsTotal: 10,
            flankerCurrentTrial: 0,
            flankerErrors: 0,
            flankerTimes: [],
            flankerCurrentDirection: null,
            flankerCanPress: false,
            flankerFeedbackTimeout: null,
            // Spatial Grid specific
            gridSequence: [],
            userGridSequence: [],
            gridCells: [],
            // Number Memory specific
            numberSequence: [],
            // N-Back specific
            nBackSequence: [],
            nBackCurrentIndex: 0,
            nBackHits: 0,
            nBackMisses: 0,
            nBackFalseAlarms: 0,
            nBackCanPress: false,
            nBackCurrentTarget: false
        };

        this.initScreens();
        this.showScreen('menu-screen');
        this.bindEvents();
    }

    initScreens() {
        // Elements are statically in index.html
    }

    showScreen(screenId) {
        if (!['minigame-screen', 'flanker-screen', 'grid-memory-screen', 'number-memory-screen', 'nback-screen'].includes(screenId)) {
            this.appContainer.style.backgroundColor = '';
            document.body.style.backgroundColor = '';
        }

        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');

            // Auto-focus inputs if they are visible on the new screen
            const inputs = targetScreen.querySelectorAll('input[type="number"], input[type="text"]');
            if (inputs.length > 0) {
                // Focus the first visible input
                const firstInput = Array.from(inputs).find(input =>
                    input.parentElement.style.display !== 'none' &&
                    input.style.display !== 'none' &&
                    input.style.visibility !== 'hidden'
                );
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 50);
                }
            }
        } else {
            console.error(`Screen ID not found: ${screenId}`);
        }
    }

    bindEvents() {
        // --- Settings & History Menus ---
        if (this.settingsBtn) {
            this.settingsBtn.addEventListener('click', () => {
                const modal = this.settingsModal;
                if (modal) modal.style.display = 'flex';
                if (this.toggleSound) this.toggleSound.checked = this.settings.soundEnabled;
                if (this.toggleTheme) this.toggleTheme.checked = this.settings.darkMode;
            });
        }

        if (this.closeSettingsBtn) {
            this.closeSettingsBtn.addEventListener('click', () => {
                if (this.settingsModal) this.settingsModal.style.display = 'none';
            });
        }

        if (this.toggleSound) {
            this.toggleSound.addEventListener('change', (e) => {
                this.settings.soundEnabled = e.target.checked;
                this.saveSettings();
            });
        }

        if (this.toggleTheme) {
            this.toggleTheme.addEventListener('change', (e) => {
                this.settings.darkMode = e.target.checked;
                this.applyTheme(this.settings.darkMode);
                this.saveSettings();
            });
        }

        if (this.viewHistoryBtn) {
            this.viewHistoryBtn.addEventListener('click', () => {
                this.renderHistory();
                this.showScreen('history-screen');
            });
        }

        if (this.closeHistoryBtn) {
            this.closeHistoryBtn.addEventListener('click', () => {
                this.showScreen('menu-screen');
            });
        }

        // --- Menu Buttons ---
        if (this.startFullBtn) {
            this.startFullBtn.addEventListener('click', () => {
                this.gameData.isIndividualTest = false;

                // Build randomized test sequence
                const selectEl = this.durationSelect;
                const numRounds = selectEl ? parseInt(selectEl.value) : 1;
                this.gameData.assessmentLengthStr = selectEl ? selectEl.options[selectEl.selectedIndex].text : "Short (1 Round)";
                this.gameData.assessmentStartTime = Date.now();
                this.gameData.numRounds = numRounds; // Store to dynamically calculate round size later
                
                // Shuffle standard tests across all rounds
                let standardTests = [];
                for (let r = 0; r < numRounds; r++) {
                    const testsRound = ['audioReaction', 'visualReaction', 'inhibitoryControl', 'flankerArrow', 'visualSpatialMemory', 'simultaneousSpatialMemory', 'sequentialNumberMemory', 'reverseSequentialNumberMemory', 'nBackTask', 'chimpTest', 'mentalMath', 'storyMath', 'clockReading'];
                    for (let i = testsRound.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [testsRound[i], testsRound[j]] = [testsRound[j], testsRound[i]];
                    }
                    standardTests = standardTests.concat(testsRound);
                }

                // Pick 3 unique stories for the entire test
                let availableStories = [...this.stories];
                for (let i = availableStories.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [availableStories[i], availableStories[j]] = [availableStories[j], availableStories[i]];
                }
                this.gameData.selectedStories = availableStories.slice(0, 3);

                // Pre-assign unique questions for each recall phase (Option A)
                // Story 1: 3 unique questions
                const story1QIndices = [0, 1, 2, 3, 4];
                for (let i = story1QIndices.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [story1QIndices[i], story1QIndices[j]] = [story1QIndices[j], story1QIndices[i]];
                }
                this.gameData.story1Questions = [
                    this.gameData.selectedStories[0].questions[story1QIndices[0]],
                    this.gameData.selectedStories[0].questions[story1QIndices[1]],
                    this.gameData.selectedStories[0].questions[story1QIndices[2]]
                ];

                // Story 2: 2 unique questions
                const story2QIndices = [0, 1, 2, 3, 4];
                for (let i = story2QIndices.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [story2QIndices[i], story2QIndices[j]] = [story2QIndices[j], story2QIndices[i]];
                }
                this.gameData.story2Questions = [
                    this.gameData.selectedStories[1].questions[story2QIndices[0]],
                    this.gameData.selectedStories[1].questions[story2QIndices[1]]
                ];

                // Story 3: 1 question
                const story3QIndex = Math.floor(Math.random() * 5);
                this.gameData.story3Questions = [
                    this.gameData.selectedStories[2].questions[story3QIndex]
                ];

                // Pick 1 unique address for the entire test
                let availableAddresses = [...this.addresses];
                for (let i = availableAddresses.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [availableAddresses[i], availableAddresses[j]] = [availableAddresses[j], availableAddresses[i]];
                }
                this.gameData.currentAddress = availableAddresses[0];

                // Build sequence by placing memory tasks at exact positions
                this.testSequence = [];
                let stdIndex = 0;
                const memoryPlacements = {
                    1: 'addressMemoryReading',
                    3: 'story1Reading',
                    5: 'story1Recall1',
                    8: 'story2Reading',
                    10: 'story1Recall2',
                    11: 'story2Recall1',
                    14: 'story3Reading',
                    16: 'story1Recall3',
                    18: 'story2Recall2',
                    20: 'story3Recall1'
                };

                const totalLength = standardTests.length + 11;
                for (let pos = 1; pos <= totalLength; pos++) {
                    if (pos === totalLength) {
                        this.testSequence.push('addressMemoryQuestions');
                    } else if (memoryPlacements[pos]) {
                        this.testSequence.push(memoryPlacements[pos]);
                    } else {
                        this.testSequence.push(standardTests[stdIndex++]);
                    }
                }

                this.currentTestIndex = 0;
                this.state.scores = {};
                this.state.breakdowns = {};
                this.startGameplay();
            });
        }

        if (this.showIndividualBtn) {
            this.showIndividualBtn.addEventListener('click', () => {
                this.showScreen('practice-screen');
            });
        }

        document.querySelectorAll('.test-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const testId = e.target.getAttribute('data-test');
                this.gameData.isIndividualTest = true;
                this.testSequence = [testId];
                this.currentTestIndex = 0;
                this.state.scores = {};
                this.state.breakdowns = {};
                this.startGameplay();
            });
        });


        const submitMathBtn = this.submitMathBtn;
        if (submitMathBtn) {
            submitMathBtn.addEventListener('click', () => this.handleMathSubmit());
        }

        if (this.beginTestBtn) {
            this.beginTestBtn.addEventListener('click', () => {
                this.startCurrentTest();
            });
        }

        if (this.nextTestBtn) {
            this.nextTestBtn.addEventListener('click', () => {
                if (this.gameData.isIndividualTest) {
                    this.showFinalResults(); // Quick exit for individual test mode
                } else {
                    this.currentTestIndex++;
                    if (this.currentTestIndex < this.testSequence.length) {
                        this.showInstructions();
                    } else {
                        this.showFinalResults();
                    }
                }
            });
        }

        if (this.restartBtn) {
            this.restartBtn.addEventListener('click', () => {
                this.currentTestIndex = 0;
                this.state.scores = {};
                this.showScreen('menu-screen');
            });
        }

        if (this.roundCompleteBtn) {
            this.roundCompleteBtn.addEventListener('click', () => {
                this.currentTestIndex++;
                this.showInstructions();
            });
        }

        if (this.submitStoryBtn) {
            this.submitStoryBtn.addEventListener('click', () => {
                this.handleStorySubmit();
            });
        }

        if (this.submitAddressBtn) {
            this.submitAddressBtn.addEventListener('click', () => {
                this.handleAddressSubmit();
            });
        }

        if (this.submitGridBtn) {
            this.submitGridBtn.addEventListener('click', () => {
                const testId = this.testSequence[this.currentTestIndex];
                if (testId === 'visualSpatialMemory') {
                    this.handleGridSubmitSequential();
                } else if (testId === 'simultaneousSpatialMemory') {
                    this.handleGridSubmitSimultaneous();
                }
                // chimpTest has no submit button — it auto-completes
            });
        }

        if (this.submitNumberBtn) {
            this.submitNumberBtn.addEventListener('click', () => {
                const testId = this.testSequence[this.currentTestIndex];
                if (testId === 'reverseSequentialNumberMemory') {
                    this.handleReverseNumberSubmit();
                } else {
                    this.handleNumberSubmit();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                if (e.target.tagName !== 'INPUT') {
                    e.preventDefault();
                }
                const activeScreen = document.querySelector('.screen.active');
                if (activeScreen && activeScreen.id === 'minigame-screen') {
                    this.handleSpacebarReaction();
                } else if (activeScreen && activeScreen.id === 'nback-screen') {
                    this.handleNBackSpacebar();
                }
            } else if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
                e.preventDefault();
                this.handleFlankerInput(e.code);
            } else if (e.code === 'Enter') {
                const activeScreen = document.querySelector('.screen.active');
                if (!activeScreen) return;

                if (activeScreen.id === 'math-test-screen') {
                    this.handleMathSubmit();
                } else if (activeScreen.id === 'number-memory-screen') {
                    const inputContainer = this.numberInputContainer;
                    if (inputContainer && inputContainer.style.display !== 'none') {
                        e.preventDefault();
                        if (this.submitNumberBtn) this.submitNumberBtn.click();
                    }
                } else if (activeScreen.id === 'story-question-screen') {
                    e.preventDefault();
                    if (this.submitStoryBtn) this.submitStoryBtn.click();
                } else if (activeScreen.id === 'address-questions-screen') {
                    e.preventDefault();
                    if (this.submitAddressBtn) this.submitAddressBtn.click();
                } else if (activeScreen.id === 'grid-memory-screen') {
                    const submitBtn = this.submitGridBtn;
                    if (submitBtn && submitBtn.style.visibility !== 'hidden') {
                        e.preventDefault();
                        submitBtn.click();
                    }
                } else if (activeScreen.id === 'instructions-screen') {
                    e.preventDefault();
                    if (this.beginTestBtn) this.beginTestBtn.click();
                } else if (activeScreen.id === 'results-screen') {
                    e.preventDefault();
                    if (this.nextTestBtn) this.nextTestBtn.click();
                } else if (activeScreen.id === 'round-complete-screen') {
                    e.preventDefault();
                    if (this.roundCompleteBtn) this.roundCompleteBtn.click();
                }
            } else if (e.code === 'Digit1' || e.code === 'Digit2' || e.code === 'Digit3' || e.code === 'Digit4' ||
                       e.code === 'Numpad1' || e.code === 'Numpad2' || e.code === 'Numpad3' || e.code === 'Numpad4') {
                const activeScreen = document.querySelector('.screen.active');
                if (activeScreen && activeScreen.id === 'clock-reading-screen') {
                    e.preventDefault();
                    const index = parseInt(e.key) - 1;
                    const buttons = document.querySelectorAll('.clock-option-btn');
                    if (buttons[index] && !buttons[index].disabled) {
                        buttons[index].click();
                    }
                }
            }
        });

        // --- Mobile Touch Zones ---
        // Reaction tests (audio, visual, inhibitory control) — tap = spacebar
        const reactionTouchZone = this.reactionTouchZone;
        if (reactionTouchZone) {
            reactionTouchZone.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const activeScreen = document.querySelector('.screen.active');
                if (activeScreen && activeScreen.id === 'minigame-screen') {
                    this.handleSpacebarReaction();
                }
            });
        }

        // N-Back — tap = spacebar
        const nbackTouchZone = this.nbackTouchZone;
        if (nbackTouchZone) {
            nbackTouchZone.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const activeScreen = document.querySelector('.screen.active');
                if (activeScreen && activeScreen.id === 'nback-screen') {
                    this.handleNBackSpacebar();
                }
            });
        }

        // Flanker — left/right tap zones = arrow keys
        const flankerLeft = this.flankerTouchLeft;
        const flankerRight = this.flankerTouchRight;
        if (flankerLeft) {
            flankerLeft.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleFlankerInput('ArrowLeft');
            });
        }
        if (flankerRight) {
            flankerRight.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleFlankerInput('ArrowRight');
            });
        }
    }

    startGameplay() {
        this.requestFullscreen().then(() => {
            this.initAudioContext();
            this.showInstructions();
        }).catch(err => {
            console.log('Fullscreen failed or blocked. Proceeding anyway.', err);
            this.initAudioContext();
            this.showInstructions();
        });
    }

    requestFullscreen() {
        const elem = document.documentElement;
        try {
            let res;
            if (elem.requestFullscreen) {
                res = elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                res = elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                res = elem.msRequestFullscreen();
            }
            if (res && typeof res.then === 'function') {
                return res;
            }
        } catch (e) {
            console.warn('Fullscreen request threw:', e);
        }
        return Promise.resolve();
    }

    initAudioContext() {
        if (!this.gameData.audioCtx) {
            this.gameData.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.gameData.audioCtx.state === 'suspended') {
            this.gameData.audioCtx.resume();
        }
    }

    playBeep(frequency = 440, duration = 0.2) {
        if (!this.gameData.audioCtx || !this.settings.soundEnabled) return;
        const oscillator = this.gameData.audioCtx.createOscillator();
        const gainNode = this.gameData.audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, this.gameData.audioCtx.currentTime);

        gainNode.gain.setValueAtTime(1, this.gameData.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.gameData.audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(this.gameData.audioCtx.destination);

        oscillator.start();
        oscillator.stop(this.gameData.audioCtx.currentTime + duration);
    }

    showInstructions() {
        const testId = this.testSequence[this.currentTestIndex];
        const info = this.testInfo[testId];

        let titleHtml = info.title;
        if (!this.gameData.isIndividualTest) {
            const roundSize = this.testSequence.length / this.gameData.numRounds;
            const currentRound = Math.floor(this.currentTestIndex / roundSize) + 1;
            const totalRounds = Math.ceil(this.testSequence.length / roundSize);
            titleHtml = `<span style="font-size: 0.8em; opacity: 0.6; display: block; margin-bottom: 0.5rem; letter-spacing: 1px;">ROUND ${currentRound} OF ${totalRounds}</span>${info.title}`;
        }

        if (this.instTitle) this.instTitle.innerHTML = titleHtml;
        if (this.instDesc) this.instDesc.innerHTML = info.desc;

        this.showScreen('instructions-screen');

        // Show and update progress bar during full assessment
        const progressContainer = this.progressContainer;
        if (progressContainer) {
            if (!this.gameData.isIndividualTest) {
                progressContainer.style.display = 'block';
                this.updateProgressBar();
            } else {
                progressContainer.style.display = 'none';
            }
        }
    }

    startCurrentTest() {
        const testId = this.testSequence[this.currentTestIndex];

        // Reset timers
        clearTimeout(this.gameData.timeoutId);
        clearInterval(this.gameData.intervalId);
        clearInterval(this.gameData.distractorIntervalId);
        clearTimeout(this.gameData.flankerFeedbackTimeout);
        this.gameData.isWaiting = true;
        this.gameData.startTime = null;

        if (testId.startsWith('story') && testId.endsWith('Reading')) {
            const storyNum = parseInt(testId.replace('story', '').replace('Reading', ''));
            const storyIndex = storyNum - 1;

            this.showScreen('story-reading-screen');

            // Show Progress Bar if Full Assessment
            const progressContainer = this.progressContainer;
            if (progressContainer) {
                if (!this.gameData.isIndividualTest) {
                    progressContainer.style.display = 'block';
                    this.updateProgressBar();
                } else {
                    progressContainer.style.display = 'none';
                }
            }

            // Get pre-selected story or fallback
            this.gameData.currentStory = (this.gameData.selectedStories && this.gameData.selectedStories[storyIndex]) || this.stories[0];
            if (this.storyText) this.storyText.textContent = this.gameData.currentStory.text;

            let timeLeft = 30;
            const timerDisplay = this.storyTimer;
            if (timerDisplay) timerDisplay.textContent = timeLeft;

            this.gameData.intervalId = setInterval(() => {
                timeLeft--;
                if (timerDisplay) timerDisplay.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(this.gameData.intervalId);
                    this.state.scores[testId] = "Completed";
                    this.currentTestIndex++;
                    this.showInstructions();
                }
            }, 1000);
            return;
        }

        if (testId.startsWith('story') && testId.includes('Recall')) {
            this.showScreen('story-question-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();

            const container = this.dynamicQuestionsContainer;
            
            const parts = testId.replace('story', '').split('Recall');
            const storyNum = parseInt(parts[0]);
            const recallNum = parseInt(parts[1]);

            const storyIndex = storyNum - 1;
            const story = (this.gameData.selectedStories && this.gameData.selectedStories[storyIndex]) || this.stories[0];
            this.gameData.currentStory = story;

            // Get pre-assigned question
            let question;
            if (storyNum === 1 && this.gameData.story1Questions) {
                question = this.gameData.story1Questions[recallNum - 1];
            } else if (storyNum === 2 && this.gameData.story2Questions) {
                question = this.gameData.story2Questions[recallNum - 1];
            } else if (storyNum === 3 && this.gameData.story3Questions) {
                question = this.gameData.story3Questions[recallNum - 1];
            }
            if (!question) question = story.questions[0];

            this.gameData.currentQuestions = [question];

            // Shuffle options for the single question while tracking correct answer
            this.gameData.shuffledStoryAnswers = [];
            const correctIdx = parseInt(question.answer);
            const indexed = question.options.map((opt, i) => ({ opt, isCorrect: i === correctIdx }));
            for (let i = indexed.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
            }
            const newCorrectIdx = indexed.findIndex(item => item.isCorrect);
            this.gameData.shuffledStoryAnswers.push(String(newCorrectIdx));

            this.gameData.currentQuestions[0] = {
                ...question,
                shuffledOptions: indexed.map(item => item.opt)
            };

            if (container) {
                container.innerHTML = `
                    <h2 id="story-q0">${this.gameData.currentQuestions[0].prompt}</h2>
                    <div class="options">
                        ${this.gameData.currentQuestions[0].shuffledOptions.map((opt, i) => `<label><input type="radio" name="q0" value="${i}"> ${opt}</label>`).join('')}
                    </div>
                `;
            }

            // Add timer to questions screen
            let timeLeft = 30;
            const existingTimer = document.getElementById('story-questions-timer');
            if (existingTimer) existingTimer.remove();

            const timerEl = document.createElement('div');
            timerEl.id = 'story-questions-timer';
            timerEl.className = 'timer';
            timerEl.textContent = timeLeft;
            if (this.storyQuestionScreen) this.storyQuestionScreen.insertBefore(timerEl, this.submitStoryBtn);

            this.gameData.intervalId = setInterval(() => {
                timeLeft--;
                timerEl.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(this.gameData.intervalId);
                    this.handleStorySubmit();
                }
            }, 1000);

            return;
        }

        if (testId === 'addressMemoryReading') {
            this.showScreen('address-reading-screen');
            const progressContainer = this.progressContainer;
            if (progressContainer) {
                if (!this.gameData.isIndividualTest) {
                    progressContainer.style.display = 'block';
                    this.updateProgressBar();
                } else {
                    progressContainer.style.display = 'none';
                }
            }

            // In assessment, address is pre-selected, otherwise fallback
            if (!this.gameData.currentAddress) {
                this.gameData.currentAddress = this.addresses[Math.floor(Math.random() * this.addresses.length)];
            }
            if (this.addressTextContainer) this.addressTextContainer.textContent = this.gameData.currentAddress.text;

            let timeLeft = 15;
            const timerDisplay = this.addressTimer;
            if (timerDisplay) timerDisplay.textContent = `${timeLeft}s`;

            this.gameData.intervalId = setInterval(() => {
                timeLeft--;
                if (timerDisplay) timerDisplay.textContent = `${timeLeft}s`;
                if (timeLeft <= 0) {
                    clearInterval(this.gameData.intervalId);
                    this.state.scores[testId] = "Completed";
                    this.currentTestIndex++;
                    this.showInstructions();
                }
            }, 1000);
            return;
        }

        if (testId === 'addressMemoryQuestions') {
            this.showScreen('address-questions-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();

            const container = this.addressOptionsContainer;
            const addressObj = this.gameData.currentAddress || this.addresses[0];

            // Shuffle options while tracking the correct answer
            const correctIndex = parseInt(addressObj.answer);
            const indexed = addressObj.options.map((opt, i) => ({ opt, isCorrect: i === correctIndex }));
            for (let i = indexed.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
            }
            const newCorrectIndex = indexed.findIndex(item => item.isCorrect);
            this.gameData.shuffledAddressAnswer = String(newCorrectIndex);

            if (container) {
                container.innerHTML = `
                    ${indexed.map((item, i) => `<label><input type="radio" name="addressOption" value="${i}"> ${item.opt}</label>`).join('')}
                `;
            }

            let timeLeft = 30;
            const existingTimer = document.getElementById('address-questions-timer');
            if (existingTimer) existingTimer.remove();

            const timerEl = document.createElement('div');
            timerEl.id = 'address-questions-timer';
            timerEl.className = 'timer-display';
            timerEl.textContent = `${timeLeft}s`;
            // Insert before the submit button
            if (this.addressQuestionsScreen) this.addressQuestionsScreen.insertBefore(timerEl, this.submitAddressBtn);

            this.gameData.intervalId = setInterval(() => {
                timeLeft--;
                timerEl.textContent = `${timeLeft}s`;
                if (timeLeft <= 0) {
                    clearInterval(this.gameData.intervalId);
                    this.handleAddressSubmit();
                }
            }, 1000);

            return;
        }

        if (testId === 'mentalMath' || testId === 'storyMath') {
            this.gameData.mathType = testId === 'mentalMath' ? 'mental' : 'story';
            this.gameData.mathRounds = testId === 'mentalMath' ? 12 : 5;
            this.gameData.mathCurrentRound = 0;
            this.gameData.mathScore = 0;
            this.gameData.mathWrongAnswers = []; // Track wrong answers

            if (testId === 'storyMath') {
                const tempIndices = Array.from({ length: this.storyMathTemplates.length }, (_, i) => i);
                for (let i = tempIndices.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [tempIndices[i], tempIndices[j]] = [tempIndices[j], tempIndices[i]];
                }
                this.gameData.selectedMathTemplates = tempIndices.slice(0, 5);
            }

            this.showScreen('math-test-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();

            this.nextMathQuestion();
            return;
        }

        if (testId === 'visualSpatialMemory') {
            this.showScreen('grid-memory-screen');
            this.gameData.currentTrialCount = 0;
            this.gameData.trialScores = [];
            this.startSpatialMemoryGridSequential();
            return;
        }

        if (testId === 'simultaneousSpatialMemory') {
            this.showScreen('grid-memory-screen');
            this.gameData.currentTrialCount = 0;
            this.gameData.trialScores = [];
            this.startSpatialMemoryGridSimultaneous();
            return;
        }

        if (testId === 'chimpTest') {
            this.showScreen('grid-memory-screen');
            this.gameData.currentTrialCount = 0;
            this.gameData.trialScores = [];
            this.startChimpTest();
            return;
        }

        if (testId === 'flankerArrow') {
            this.showScreen('flanker-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();
            this.gameData.flankerCurrentTrial = 0;
            this.gameData.flankerErrors = 0;
            this.gameData.flankerTimes = [];
            this.startFlankerTrial();
            return;
        }

        if (testId === 'sequentialNumberMemory') {
            this.showScreen('number-memory-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();
            this.gameData.currentTrialCount = 0;
            this.gameData.trialScores = [];
            this.gameData.trialDetails = [];
            this.state.breakdowns = this.state.breakdowns || {}; // Initialize state object
            this.startSequentialNumberMemory();
            return;
        }

        if (testId === 'reverseSequentialNumberMemory') {
            this.showScreen('number-memory-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();
            this.gameData.currentTrialCount = 0;
            this.gameData.trialScores = [];
            this.gameData.trialDetails = [];
            this.state.breakdowns = this.state.breakdowns || {}; // Initialize state object
            this.startReverseSequentialNumberMemory();
            return;
        }

        if (testId === 'clockReading') {
            this.showScreen('clock-reading-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();
            this.startClockReading();
            return;
        }

        if (testId === 'nBackTask') {
            this.showScreen('nback-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();
            this.startNBackTask();
            return;
        }

        if (testId === 'audioReaction' || testId === 'visualReaction' || testId === 'inhibitoryControl') {
            this.appContainer.style.backgroundColor = '';
            this.showScreen('minigame-screen');
            this.gameData.currentTrialCount = 0;
            this.gameData.trialTimes = [];
            this.gameData.trialScores = [];

            // We need a helper to kick off the specific reaction test loop
            this.startReactionTrial();
            return;
        }
    }

    startReactionTrial() {
        const testId = this.testSequence[this.currentTestIndex];
        const prompt = this.minigamePrompt;

        if (this.gameData.currentTrialCount >= 5) {
            this.endReactionTask();
            return;
        }

        this.gameData.isWaiting = true;
        this.gameData.startTime = null;

        const currentTrialDisplay = this.gameData.currentTrialCount + 1;

        if (testId === 'audioReaction') {
            this.appContainer.style.backgroundColor = '';
            document.body.style.backgroundColor = '';
            if (prompt) {
                prompt.innerHTML = `Wait for the sound...<br><span style="font-size: 1rem; opacity: 0.5;">Trial ${currentTrialDisplay}/5</span>`;
                prompt.style.color = "rgba(255,255,255,0.7)";
            }

            const delay = Math.random() * 4000 + 2000;
            this.gameData.timeoutId = setTimeout(() => {
                if (!this.gameData.isWaiting) return;

                this.playBeep(880, 0.3); // High pitch beep
                this.gameData.startTime = performance.now();
                this.gameData.isWaiting = false;
            }, delay);
        }
        else if (testId === 'visualReaction') {
            this.appContainer.style.backgroundColor = '#cc3333';
            document.body.style.backgroundColor = '#cc3333';
            if (prompt) {
                prompt.innerHTML = `Wait for green...<br><span style="font-size: 1rem; opacity: 0.5;">Trial ${currentTrialDisplay}/5</span>`;
                prompt.style.color = "rgba(255,255,255,0.7)";
            }

            const delay = Math.random() * 4000 + 2000;
            this.gameData.timeoutId = setTimeout(() => {
                if (!this.gameData.isWaiting) return;

                this.appContainer.style.backgroundColor = '#33cc33';
                document.body.style.backgroundColor = '#33cc33';
                if (prompt) {
                    prompt.textContent = this.isTouchDevice() ? "TAP NOW!" : "PRESS SPACEBAR!";
                    prompt.style.color = "#ffffff";
                }

                this.gameData.startTime = performance.now();
                this.gameData.isWaiting = false;
            }, delay);
        }
        else if (testId === 'inhibitoryControl') {
            this.appContainer.style.backgroundColor = '#cc3333';
            document.body.style.backgroundColor = '#cc3333';
            if (prompt) {
                prompt.innerHTML = `Wait for green. Ignore the beep.<br><span style="font-size: 1rem; opacity: 0.5;">Trial ${currentTrialDisplay}/5</span>`;
                prompt.style.color = "rgba(255,255,255,0.7)";
            }

            const delay = Math.random() * 4000 + 2000;

            const distractorTime = Math.random() * (delay - 500) + 200;
            this.gameData.distractorIntervalId = setTimeout(() => {
                if (this.gameData.isWaiting) {
                    this.playBeep(440, 0.2);
                }
            }, distractorTime);

            this.gameData.timeoutId = setTimeout(() => {
                if (!this.gameData.isWaiting) return;

                this.appContainer.style.backgroundColor = '#33cc33';
                document.body.style.backgroundColor = '#33cc33';
                if (prompt) {
                    prompt.textContent = this.isTouchDevice() ? "TAP NOW!" : "PRESS SPACEBAR!";
                    prompt.style.color = "#ffffff";
                }

                this.gameData.startTime = performance.now();
                this.gameData.isWaiting = false;
            }, delay);
        }
    }

    // --- Math Methods ---
    nextMathQuestion() {
        this.gameData.mathCurrentRound++;
        const isMental = this.gameData.mathType === 'mental';

        const inputEl = this.mathInput;
        if (inputEl) {
            inputEl.value = '';
            setTimeout(() => inputEl.focus(), 50);
        }
        if (this.mathProgress) {
            this.mathProgress.textContent = `Question ${this.gameData.mathCurrentRound} of ${this.gameData.mathRounds}`;
        }

        if (isMental) {
            // Generate Mental Math (+, -, *, /)
            const ops = ['+', '-', '*', '/'];
            const op = ops[Math.floor(Math.random() * ops.length)];
            let qText = '';
            let ans = 0;

            if (op === '+') {
                const a = Math.floor(Math.random() * 900) + 100;
                const b = Math.floor(Math.random() * 900) + 100;
                qText = `${a} + ${b} = ?`;
                ans = a + b;
            } else if (op === '-') {
                const a = Math.floor(Math.random() * 900) + 100;
                const b = Math.floor(Math.random() * a) + 10;
                qText = `${a} - ${b} = ?`;
                ans = a - b;
            } else if (op === '*') {
                const a = Math.floor(Math.random() * 21) + 5; // 5 to 25
                const b = Math.floor(Math.random() * 13) + 3; // 3 to 15
                qText = `${a} × ${b} = ?`;
                ans = a * b;
            } else if (op === '/') {
                const b = Math.floor(Math.random() * 11) + 2; // 2 to 12
                const ansTemp = Math.floor(Math.random() * 15) + 3; // 3 to 17
                const a = b * ansTemp;
                qText = `${a} ÷ ${b} = ?`;
                ans = ansTemp;
            }

            if (this.mathQuestion) this.mathQuestion.textContent = qText;
            this.gameData.currentMathAnswer = ans;
            this.gameData.currentMathQuestion = qText;
        } else {
            // Story Math
            const templateIndex = this.gameData.selectedMathTemplates[this.gameData.mathCurrentRound - 1];
            const problem = this.storyMathTemplates[templateIndex]();
            if (this.mathQuestion) this.mathQuestion.textContent = problem.text;
            this.gameData.currentMathAnswer = problem.answer;
            this.gameData.currentMathQuestion = problem.text;
        }

        let timeLeft = isMental ? 20 : 60;
        const timerDisplay = this.mathTimer;
        if (timerDisplay) timerDisplay.textContent = timeLeft;

        clearInterval(this.gameData.intervalId);
        this.gameData.intervalId = setInterval(() => {
            timeLeft--;
            if (timerDisplay) timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(this.gameData.intervalId);
                this.handleMathSubmit(true);
            }
        }, 1000);
    }

    handleMathSubmit(isTimeout = false) {
        clearInterval(this.gameData.intervalId);

        const inputEl = this.mathInput;
        const inputVal = inputEl ? inputEl.value : '';
        const parsed = parseInt(inputVal, 10);
        const isCorrect = !isTimeout && !isNaN(parsed) && parsed === this.gameData.currentMathAnswer;

        if (isCorrect) {
            this.gameData.mathScore++;
        } else {
            // Track wrong answer
            const userAnswerStr = isTimeout ? '(no answer)' : (inputVal.trim() === '' ? '(no answer)' : inputVal.trim());
            this.gameData.mathWrongAnswers.push({
                question: this.gameData.currentMathQuestion,
                yourAnswer: userAnswerStr,
                correctAnswer: this.gameData.currentMathAnswer
            });
        }

        if (this.gameData.mathCurrentRound < this.gameData.mathRounds) {
            this.nextMathQuestion();
        } else {
            const testId = this.gameData.mathType === 'mental' ? 'mentalMath' : 'storyMath';
            const finalScore = Math.round((this.gameData.mathScore / this.gameData.mathRounds) * 100);

            if (!this.state.scores[testId]) this.state.scores[testId] = [];
            this.state.scores[testId].push(`${finalScore} Points`);

            // Build wrong answers HTML
            const wrongAnswersHTML = this.generateMathWrongAnswersHTML(this.gameData.mathWrongAnswers);

            if (!this.state.breakdowns[testId]) this.state.breakdowns[testId] = [];
            this.state.breakdowns[testId].push({
                summary: `${this.gameData.mathScore}/${this.gameData.mathRounds} Correct`,
                wrongAnswersHTML
            });

            const scoreDisplay = this.roundScore;
            let html = `Score: <br><span style="color: var(--accent-color); font-size: 3rem;">${this.gameData.mathScore}/${this.gameData.mathRounds}</span><br><span style="font-size: 1.2rem;">Correct Answers</span>`;
            if (wrongAnswersHTML) {
                html += wrongAnswersHTML;
            }
            if (scoreDisplay) {
                scoreDisplay.innerHTML = html;
                scoreDisplay.style.color = "var(--text-color)";
            }

            this.proceedAfterTest();
        }
    }

    generateMathWrongAnswersHTML(wrongAnswers) {
        if (!wrongAnswers || wrongAnswers.length === 0) return '';
        let html = `<div style="margin-top: 1.5rem; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">`;
        html += `<h4 style="text-align: center; margin-bottom: 0.75rem; color: #cc3333;">❌ Incorrect Answers (${wrongAnswers.length})</h4>`;
        html += `<table style="width: 100%; border-collapse: collapse; font-size: 0.88rem;"><thead><tr>`;
        html += `<th style="border: 1px solid var(--border-color); padding: 8px; background: #222; text-align: left;">Question</th>`;
        html += `<th style="border: 1px solid var(--border-color); padding: 8px; background: #222; text-align: center;">Your Answer</th>`;
        html += `<th style="border: 1px solid var(--border-color); padding: 8px; background: #222; text-align: center; color: var(--accent-color);">Correct Answer</th>`;
        html += `</tr></thead><tbody>`;
        wrongAnswers.forEach(w => {
            html += `<tr>`;
            html += `<td style="border: 1px solid var(--border-color); padding: 8px; background: var(--surface-color);">${w.question}</td>`;
            html += `<td style="border: 1px solid var(--border-color); padding: 8px; background: var(--surface-color); text-align: center; color: #cc3333;">${w.yourAnswer}</td>`;
            html += `<td style="border: 1px solid var(--border-color); padding: 8px; background: var(--surface-color); text-align: center; color: var(--accent-color);">${w.correctAnswer}</td>`;
            html += `</tr>`;
        });
        html += `</tbody></table></div>`;
        return html;
    }

    // --- Story Memory Methods ---
    handleStorySubmit() {
        clearInterval(this.gameData.intervalId);
        const questions = this.gameData.currentQuestions;
        const answers = this.gameData.shuffledStoryAnswers;

        let score = 0;
        const correctFlags = [];
        questions.forEach((q, idx) => {
            const selected = document.querySelector(`input[name="q${idx}"]:checked`);
            const isCorrect = selected && selected.value === answers[idx];
            if (isCorrect) score++;
            correctFlags.push(isCorrect);
        });

        const activeTestId = this.testSequence[this.currentTestIndex];
        if (!this.state.scores[activeTestId]) this.state.scores[activeTestId] = [];
        this.state.scores[activeTestId].push(`${score}/${questions.length}`);

        const scoreDisplay = this.roundScore;
        if (scoreDisplay) {
            let html = `<div style="font-size: 1.5rem; margin-bottom: 1rem;">You got ${score} out of ${questions.length} correct.</div>`;
            html += `<div style="text-align: left; max-width: 500px; margin: 0 auto; font-size: 0.95rem; line-height: 1.8;">`;
            questions.forEach((q, idx) => {
                const correctAns = q.shuffledOptions[parseInt(answers[idx])];
                html += `<div style="margin-bottom: 0.5rem;">${correctFlags[idx] ? '✅' : '❌'} <strong>${q.prompt}</strong><br>Correct: <span style="color: var(--accent-color);">${correctAns}</span></div>`;
            });
            html += `</div>`;
            scoreDisplay.innerHTML = html;
            scoreDisplay.style.color = "var(--text-color)";
        }

        this.proceedAfterTest();
    }

    handleAddressSubmit() {
        clearInterval(this.gameData.intervalId);
        const selected = document.querySelector('input[name="addressOption"]:checked');

        let score = 0;
        if (selected && selected.value === this.gameData.shuffledAddressAnswer) score = 1;

        if (!this.state.scores['addressMemoryQuestions']) this.state.scores['addressMemoryQuestions'] = [];
        this.state.scores['addressMemoryQuestions'].push(`${score}/1`);

        const correctAddress = this.gameData.currentAddress.text;
        const scoreDisplay = this.roundScore;
        let html = `<div style="font-size: 1.5rem; margin-bottom: 1rem;">${score === 1 ? '✅ Correct!' : '❌ Incorrect'}</div>`;
        html += `<div style="font-size: 0.95rem;">Correct address: <span style="color: var(--accent-color);">${correctAddress}</span></div>`;
        scoreDisplay.innerHTML = html;
        scoreDisplay.style.color = "var(--text-color)";

        this.proceedAfterTest();
    }

    // --- Spatial Memory Grid Methods ---
    setupGridUI() {
        const grid = this.memoryGrid;
        const submitBtn = this.submitGridBtn;
        if (grid) grid.innerHTML = '';
        if (submitBtn) submitBtn.style.visibility = 'hidden';

        this.gameData.gridCells = [];
        this.gameData.gridSequence = [];
        this.gameData.userGridSequence = [];

        const isSimultaneous = this.testSequence && this.testSequence[this.currentTestIndex] === 'simultaneousSpatialMemory';
        const numCells = isSimultaneous ? 25 : 16;

        if (isSimultaneous) {
            if (grid) grid.classList.add('grid-5x5');
        } else {
            if (grid) grid.classList.remove('grid-5x5');
        }

        // Create blocks
        for (let i = 0; i < numCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.index = i;
            // Depending on test, click handlers differ slightly in visual feedback
            cell.addEventListener('click', () => this.handleGridClick(i, cell));
            if (grid) grid.appendChild(cell);
            this.gameData.gridCells.push(cell);
        }
    }

    startSpatialMemoryGridSequential() {
        this.setupGridUI();
        document.querySelector('#grid-memory-screen h2').textContent = `Sequential Spatial Memory — Trial ${this.gameData.currentTrialCount + 1} of 5`;

        // Generate a sequence of 6 random blocks
        while (this.gameData.gridSequence.length < 6) {
            const r = Math.floor(Math.random() * 16);
            if (!this.gameData.gridSequence.includes(r)) {
                this.gameData.gridSequence.push(r);
            }
        }

        // Illuminate the sequence one by one
        let step = 0;
        this.gameData.isWaiting = true;

        this.gameData.intervalId = setInterval(() => {
            this.gameData.gridCells.forEach(c => c.classList.remove('active'));

            if (step < this.gameData.gridSequence.length) {
                const index = this.gameData.gridSequence[step];
                setTimeout(() => {
                    this.playBeep(400 + (step * 50), 0.1);
                    this.gameData.gridCells[index].classList.add('active');
                }, 100);
                step++;
            } else {
                clearInterval(this.gameData.intervalId);
                setTimeout(() => {
                    this.gameData.gridCells.forEach(c => c.classList.remove('active'));
                    this.gameData.isWaiting = false; // Allow clicks
                    if (this.submitGridBtn) this.submitGridBtn.style.visibility = 'visible';
                    this.updateGridSubmitButton();

                    // Add 20s timeout
                    this.gameData.timeoutId = setTimeout(() => {
                        this.handleGridSubmitSequential(true);
                    }, 20000);
                }, 1000);
            }
        }, 800);
    }

    startSpatialMemoryGridSimultaneous() {
        this.setupGridUI();
        document.querySelector('#grid-memory-screen h2').textContent = `Simultaneous Spatial — Trial ${this.gameData.currentTrialCount + 1} of 5`;

        // Pick 9 random blocks out of 25 to flash at once
        while (this.gameData.gridSequence.length < 9) {
            const r = Math.floor(Math.random() * 25);
            if (!this.gameData.gridSequence.includes(r)) {
                this.gameData.gridSequence.push(r);
            }
        }

        this.gameData.isWaiting = true;

        // Flash all simultaneously
        this.gameData.gridSequence.forEach(index => {
            this.gameData.gridCells[index].classList.add('active');
        });
        this.playBeep(600, 0.4);

        // Turn them off after 2 seconds
        this.gameData.timeoutId = setTimeout(() => {
            this.gameData.gridCells.forEach(c => c.classList.remove('active'));
            this.gameData.isWaiting = false; // Allow clicks
            if (this.submitGridBtn) this.submitGridBtn.style.visibility = 'visible';
            this.updateGridSubmitButton();

            // Add 20s timeout
            this.gameData.timeoutId = setTimeout(() => {
                this.handleGridSubmitSimultaneous(true);
            }, 20000);
        }, 2000);
    }

    handleGridClick(index, cell) {
        if (this.gameData.isWaiting) return;

        const testId = this.testSequence[this.currentTestIndex];

        // --- Chimp Test has its own click logic ---
        if (testId === 'chimpTest') {
            this.handleChimpGridClick(index, cell);
            return;
        }

        if (cell.classList.contains('selected')) {
            cell.classList.remove('selected');
            cell.textContent = '';
            cell.style.display = '';
            const idx = this.gameData.userGridSequence.indexOf(index);
            if (idx > -1) {
                this.gameData.userGridSequence.splice(idx, 1);
            }
            // Re-number for sequential
            if (testId === 'visualSpatialMemory') {
                this.gameData.gridCells.forEach(c => {
                    const seqIdx = this.gameData.userGridSequence.indexOf(parseInt(c.dataset.index));
                    if (seqIdx > -1) { c.textContent = seqIdx + 1; }
                });
            }
        } else {
            // Prevent clicking more squares than the sequence length
            if (this.gameData.userGridSequence.length >= this.gameData.gridSequence.length) {
                return;
            }
            const isSimultaneous = this.testSequence && this.testSequence[this.currentTestIndex] === 'simultaneousSpatialMemory';

            // Simultaneous toggle click / Sequential push click
            if (isSimultaneous) {
                const userIndex = this.gameData.userGridSequence.indexOf(index);
                if (userIndex !== -1) {
                    // Deselect
                    this.gameData.userGridSequence.splice(userIndex, 1);
                    cell.classList.remove('selected');
                    this.playBeep(450, 0.05);
                } else {
                    // Select
                    this.gameData.userGridSequence.push(index);
                    cell.classList.add('selected');
                    this.playBeep(550, 0.05);
                }
                this.updateGridSubmitButton();
            } else {
                // Sequential click validation
                // Add click visual feedback and add to user sequence
                this.gameData.userGridSequence.push(index);
                cell.classList.add('selected');

                // Render order number on it
                cell.textContent = this.gameData.userGridSequence.length;
                cell.style.display = 'flex';
                cell.style.alignItems = 'center';
                cell.style.justifyContent = 'center';
                cell.style.fontSize = '2rem';
                cell.style.fontWeight = 'bold';

                const step = this.gameData.userGridSequence.length - 1;
                this.playBeep(500 + (step * 50), 0.08);

                this.updateGridSubmitButton();
            }
        }
    }

    updateGridSubmitButton() {
        const btn = this.submitGridBtn;
        if (!btn || btn.style.visibility === 'hidden') return;
        const selected = this.gameData.userGridSequence.length;
        const required = this.gameData.gridSequence.length;
        btn.textContent = `Confirm Pattern (${selected}/${required})`;
        btn.disabled = selected !== required;
        btn.style.opacity = selected === required ? '1' : '0.4';
    }

    handleGridSubmitSequential(isTimeout = false) {
        if (!isTimeout && this.gameData.userGridSequence.length < this.gameData.gridSequence.length) return;
        clearTimeout(this.gameData.timeoutId);

        let correct = 0;
        for (let i = 0; i < this.gameData.gridSequence.length; i++) {
            if (this.gameData.gridSequence[i] === this.gameData.userGridSequence[i]) {
                correct++;
            }
        }

        const pct = Math.round((correct / this.gameData.gridSequence.length) * 100);
        this.gameData.trialScores.push(pct);
        this.gameData.currentTrialCount++;

        if (this.gameData.currentTrialCount >= 5) {
            const sumPct = this.gameData.trialScores.reduce((a, b) => a + b, 0);
            const avgPct = Math.round(sumPct / 5);

            if (!this.state.scores['visualSpatialMemory']) this.state.scores['visualSpatialMemory'] = [];
            this.state.scores['visualSpatialMemory'].push(`Average: ${avgPct}%`);

            const scoreDisplay = this.roundScore;
            if (scoreDisplay) {
                scoreDisplay.innerHTML = `Average Score:<br><span style="color: var(--accent-color); font-size: 3rem;">${avgPct}%</span> selected in correct order.`;
                scoreDisplay.style.color = "var(--text-color)";
            }
            this.proceedAfterTest();
        } else {
            setTimeout(() => this.startSpatialMemoryGridSequential(), 500);
        }
    }

    handleGridSubmitSimultaneous(isTimeout = false) {
        if (!isTimeout && this.gameData.userGridSequence.length < this.gameData.gridSequence.length) return;
        clearTimeout(this.gameData.timeoutId);

        let correct = 0;
        // Order doesn't matter for simultaneous
        for (let i = 0; i < this.gameData.userGridSequence.length; i++) {
            if (this.gameData.gridSequence.includes(this.gameData.userGridSequence[i])) {
                correct++;
            }
        }

        // Calculate false positives
        const overclicks = Math.max(0, this.gameData.userGridSequence.length - this.gameData.gridSequence.length);
        const finalScore = Math.max(0, correct - overclicks); // Penalize clicking every block

        const pct = Math.round((finalScore / this.gameData.gridSequence.length) * 100);
        this.gameData.trialScores.push(pct);
        this.gameData.currentTrialCount++;

        if (this.gameData.currentTrialCount >= 5) {
            const sumPct = this.gameData.trialScores.reduce((a, b) => a + b, 0);
            const avgPct = Math.round(sumPct / 5);
            if (!this.state.scores['simultaneousSpatialMemory']) this.state.scores['simultaneousSpatialMemory'] = [];
            this.state.scores['simultaneousSpatialMemory'].push(`Average: ${avgPct}%`);

            const scoreDisplay = this.roundScore;
            if (scoreDisplay) {
                scoreDisplay.innerHTML = `Average Score:<br><span style="color: var(--accent-color); font-size: 3rem;">${avgPct}%</span> correctly identified.`;
                scoreDisplay.style.color = "var(--text-color)";
            }

            this.proceedAfterTest();
        }
        else {
            setTimeout(() => this.startSpatialMemoryGridSimultaneous(), 500);
        }
    }

    // --- Chimp Test ---
    startChimpTest() {
        this.setupGridUI();
        // Force 4x4 grid
        if (this.memoryGrid) this.memoryGrid.classList.remove('grid-5x5');

        this.gameData.chimpMistakes = 0;
        this.gameData.chimpNextExpected = 1;
        this.gameData.chimpNumberMap = {}; // cellIndex -> number
        this.gameData.chimpCellMap = {};   // number -> cellIndex

        // Pick 8 random cells out of 16
        const positions = [];
        while (positions.length < 8) {
            const r = Math.floor(Math.random() * 16);
            if (!positions.includes(r)) positions.push(r);
        }

        // Assign numbers 1-8 to random positions
        for (let i = 0; i < 8; i++) {
            this.gameData.chimpNumberMap[positions[i]] = i + 1;
            this.gameData.chimpCellMap[i + 1] = positions[i];
        }

        // Display numbers on the grid
        positions.forEach(pos => {
            const cell = this.gameData.gridCells[pos];
            cell.textContent = this.gameData.chimpNumberMap[pos];
            cell.style.display = 'flex';
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
            cell.style.fontSize = '2rem';
            cell.style.fontWeight = 'bold';
            cell.style.color = 'var(--accent-color)';
        });

        // Update prompt
        document.querySelector('#grid-memory-screen h2').textContent = `Chimp Test — Trial ${this.gameData.currentTrialCount + 1} of 5`;
        if (this.submitGridBtn) this.submitGridBtn.style.visibility = 'hidden';

        this.gameData.isWaiting = false; // Allow clicks immediately
        this.gameData.chimpFirstClick = false;
    }

    handleChimpGridClick(index, cell) {
        if (this.gameData.isWaiting) return;
        const expectedNumber = this.gameData.chimpNextExpected;
        const clickedNumber = this.gameData.chimpNumberMap[index];

        // Ignore clicks on already-completed cells or empty non-target cells after hiding
        if (cell.classList.contains('selected')) return;

        if (clickedNumber === expectedNumber) {
            // Correct!
            cell.classList.add('selected');
            cell.textContent = clickedNumber;
            cell.style.display = 'flex';
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
            cell.style.fontSize = '2rem';
            cell.style.fontWeight = 'bold';
            cell.style.color = '#4ade80';
            this.playBeep(500 + (clickedNumber * 60), 0.08);

            // On first correct click, hide all remaining numbers
            if (!this.gameData.chimpFirstClick) {
                this.gameData.chimpFirstClick = true;
                this.gameData.gridCells.forEach((c, i) => {
                    if (i !== index && !c.classList.contains('selected')) {
                        c.textContent = '';
                        c.style.color = '';
                    }
                });
            }

            this.gameData.chimpNextExpected++;

            // Check if all 8 found
            if (this.gameData.chimpNextExpected > 8) {
                this.endChimpTrial();
            }
        } else {
            // Wrong click — count mistake and flash red
            this.gameData.chimpMistakes++;

            const originalBg = cell.style.backgroundColor;
            const originalBorder = cell.style.borderColor;

            cell.style.backgroundColor = 'rgba(255, 77, 77, 0.6)';
            cell.style.borderColor = '#ff4d4d';
            this.playBeep(200, 0.15);

            // Update prompt to show mistakes
            document.querySelector('#grid-memory-screen h2').textContent = `Chimp Test — Trial ${this.gameData.currentTrialCount + 1} of 5 (${this.gameData.chimpMistakes} mistake${this.gameData.chimpMistakes !== 1 ? 's' : ''})`;

            // Briefly show red, then reset to allow retry
            this.gameData.isWaiting = true;
            setTimeout(() => {
                cell.style.backgroundColor = originalBg;
                cell.style.borderColor = originalBorder;
                this.gameData.isWaiting = false;
            }, 400);
        }
    }

    endChimpTrial() {
        this.gameData.isWaiting = true; // Prevent further clicks
        this.gameData.trialScores.push(this.gameData.chimpMistakes);
        this.gameData.currentTrialCount++;

        if (this.gameData.currentTrialCount >= 5) {
            const totalMistakes = this.gameData.trialScores.reduce((a, b) => a + b, 0);
            const avgMistakes = (totalMistakes / 5).toFixed(1);

            if (!this.state.scores['chimpTest']) this.state.scores['chimpTest'] = [];
            this.state.scores['chimpTest'].push(`Average Mistakes: ${avgMistakes}`);

            const scoreDisplay = this.roundScore;
            if (scoreDisplay) {
                scoreDisplay.innerHTML = `Average Mistakes:<br><span style="color: var(--accent-color); font-size: 4rem;">${avgMistakes}</span><br>across 5 trials.`;
                scoreDisplay.style.color = "var(--text-color)";
            }

            this.proceedAfterTest();
        } else {
            setTimeout(() => this.startChimpTest(), 600);
        }
    }

    // --- Sequential & Reverse Number Memory ---
    startNumberMemory(isReverse) {
        const display = this.numberDisplay;
        const inputContainer = this.numberInputContainer;
        const input = this.numberInput;
        const prompt = this.numberPrompt;

        if (display) {
            display.textContent = "";
            display.style.display = "flex";
        }
        if (inputContainer) inputContainer.style.display = "none";
        if (input) input.value = "";
        if (prompt) prompt.textContent = "Remember the sequence...";

        // Generate 9 random digits
        this.gameData.numberSequence = [];
        for (let i = 0; i < 9; i++) {
            this.gameData.numberSequence.push(Math.floor(Math.random() * 10));
        }

        let step = 0;

        const flashNextNumber = () => {
            if (step < this.gameData.numberSequence.length) {
                if (display) display.textContent = this.gameData.numberSequence[step];

                setTimeout(() => {
                    if (display) display.textContent = "";
                    step++;
                    setTimeout(flashNextNumber, 500); // 0.5s off
                }, 1000); // 1s on
            } else {
                // Done flashing
                if (display) display.style.display = "none";
                if (inputContainer) inputContainer.style.display = "flex";
                if (prompt) prompt.textContent = isReverse ? "Type the sequence in REVERSE (30s):" : "Type the sequence (30s):";
                if (input) input.focus();

                // Add 30s timeout (clear the flash timeout first)
                clearTimeout(this.gameData.timeoutId);
                this.gameData.timeoutId = setTimeout(() => {
                    this.handleNumberSubmitCommon(isReverse);
                }, 30000);
            }
        };

        // Delay start by 1s
        this.gameData.timeoutId = setTimeout(flashNextNumber, 1000);
    }

    startSequentialNumberMemory() {
        this.startNumberMemory(false);
    }

    startReverseSequentialNumberMemory() {
        this.startNumberMemory(true);
    }

    handleNumberSubmitCommon(isReverse) {
        clearTimeout(this.gameData.timeoutId);
        const input = this.numberInput;
        const userSeqStr = input ? input.value.trim() : "";
        const actualSeqStr = this.gameData.numberSequence.join("");
        const targetSeqStr = isReverse ? actualSeqStr.split("").reverse().join("") : actualSeqStr;

        // Count how many matched in order
        let correctCount = 0;
        const minLen = Math.min(userSeqStr.length, targetSeqStr.length);
        for (let i = 0; i < minLen; i++) {
            if (userSeqStr[i] === targetSeqStr[i]) correctCount++;
        }

        this.gameData.trialScores.push(correctCount);
        this.gameData.trialDetails.push({ expected: targetSeqStr, answered: userSeqStr });
        this.gameData.currentTrialCount++;

        const key = isReverse ? 'reverseSequentialNumberMemory' : 'sequentialNumberMemory';
        const label = isReverse ? "Reverse Numbers" : "Sequential Numbers";

        if (this.gameData.currentTrialCount >= 5) {
            const sumCount = this.gameData.trialScores.reduce((a, b) => a + b, 0);
            const avgCount = (sumCount / 5).toFixed(1);

            if (!this.state.scores[key]) this.state.scores[key] = [];
            this.state.scores[key].push(`Average: ${avgCount}/9 Digits`);

            const breakdownHTML = this.generateNumberBreakdownHTML(avgCount, label);
            if (!this.state.breakdowns[key]) this.state.breakdowns[key] = [];
            this.state.breakdowns[key].push(breakdownHTML);

            const scoreDisplay = this.roundScore;
            if (scoreDisplay) {
                scoreDisplay.innerHTML = breakdownHTML;
                scoreDisplay.style.color = "var(--text-color)";
            }
            this.proceedAfterTest();
        } else {
            // Next trial
            setTimeout(() => this.startNumberMemory(isReverse), 500);
        }
    }

    handleNumberSubmit() {
        this.handleNumberSubmitCommon(false);
    }

    handleReverseNumberSubmit() {
        this.handleNumberSubmitCommon(true);
    }

    generateNumberBreakdownHTML(avgCount, testName) {
        let html = `<div style="text-align: center; margin-bottom: 1rem; font-size: 1.5rem;">Average Score: <span class="score-highlight">${avgCount}</span>/9 Digits matched</div>`;
        html += '<table class="sequence-table">';
        html += '<thead><tr><th>Round</th><th>Correct Sequence</th><th>Typed Sequence</th></tr></thead>';
        html += '<tbody>';

        this.gameData.trialDetails.forEach((trial, index) => {
            let expected = trial.expected;
            let answered = trial.answered;

            let answerFormatted = '';
            const maxLen = Math.max(expected.length, answered.length);
            for (let i = 0; i < maxLen; i++) {
                const expectedChar = expected[i] || '';
                const answeredChar = answered[i] || '';

                if (expectedChar === answeredChar && expectedChar !== '') {
                    answerFormatted += `<span class="correct-digit">${answeredChar}</span>`;
                } else {
                    const displayChar = answeredChar === '' ? '_' : answeredChar;
                    answerFormatted += `<span class="wrong-digit">${displayChar}</span>`;
                }
            }

            html += `
                <tr>
                    <td>Round ${index + 1}</td>
                    <td class="expected-seq">${expected}</td>
                    <td class="answered-seq">${answerFormatted}</td>
                </tr>
            `;
        });
        html += '</tbody></table>';
        return html;
    }

    // --- N-Back Task ---
    startNBackTask() {
        const display = this.nbackLetterDisplay;
        const feedback = this.nbackFeedback;

        if (display) display.textContent = "";
        if (feedback) {
            feedback.textContent = "";
            feedback.className = "nback-feedback";
        }

        // Generate 25 letters sequence with ~30% chance for a 2-back match
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.gameData.nBackSequence = [];
        this.gameData.nBackHits = 0;
        this.gameData.nBackMisses = 0;
        this.gameData.nBackFalseAlarms = 0;
        this.gameData.nBackCurrentIndex = 0;

        for (let i = 0; i < 25; i++) {
            if (i >= 2 && Math.random() < 0.3) {
                // Create a 2-back match
                this.gameData.nBackSequence.push(this.gameData.nBackSequence[i - 2]);
            } else {
                // Random letter that does NOT accidentally match the 2-back letter
                let letter;
                do {
                    letter = letters[Math.floor(Math.random() * letters.length)];
                } while (i >= 2 && letter === this.gameData.nBackSequence[i - 2]);
                this.gameData.nBackSequence.push(letter);
            }
        }

        // Add progress counter
        const h2 = document.querySelector('#nback-screen h2');
        if (h2) h2.textContent = `${this.isTouchDevice() ? 'Tap' : 'Press Spacebar'} if letter matches the one from 2 steps ago. (1/25)`;

        const showNextLetter = () => {
            if (this.gameData.nBackCurrentIndex >= this.gameData.nBackSequence.length) {
                this.endNBackTask();
                return;
            }

            if (feedback) {
                feedback.textContent = "";
                feedback.className = "nback-feedback";
            }

            const idx = this.gameData.nBackCurrentIndex;
            const char = this.gameData.nBackSequence[idx];
            if (display) display.textContent = char;

            // Update counter
            if (h2) h2.textContent = `${this.isTouchDevice() ? 'Tap' : 'Press Spacebar'} if letter matches the one from 2 steps ago. (${idx + 1}/25)`;

            // Determine if it is a target
            this.gameData.nBackCurrentTarget = (idx >= 2 && this.gameData.nBackSequence[idx] === this.gameData.nBackSequence[idx - 2]);
            this.gameData.nBackCanPress = true;

            // Keep on screen for 1 second, then clear for 0.5s before next
            this.gameData.timeoutId = setTimeout(() => {
                if (display) display.textContent = "";

                // If they missed a target
                if (this.gameData.nBackCurrentTarget && this.gameData.nBackCanPress) {
                    this.gameData.nBackMisses++;
                }

                this.gameData.nBackCanPress = false;
                this.gameData.nBackCurrentIndex++;

                setTimeout(showNextLetter, 500); // 0.5s gap
            }, 1000);
        };

        // Start 1s after load
        this.gameData.timeoutId = setTimeout(showNextLetter, 1000);
    }

    handleNBackSpacebar() {
        if (!this.gameData.nBackCanPress) return;
        this.gameData.nBackCanPress = false; // Lock out further presses this step

        const feedback = this.nbackFeedback;

        if (feedback) {
            if (this.gameData.nBackCurrentTarget) {
                this.gameData.nBackHits++;
                feedback.textContent = "Hit!";
                feedback.style.color = "var(--accent-color)";
            } else {
                this.gameData.nBackFalseAlarms++;
                feedback.textContent = "False Alarm!";
                feedback.style.color = "#cc3333";
            }
        }
    }

    endNBackTask() {
        const scoreDisplay = this.roundScore;

        // Calculate score
        if (!this.state.scores['nBackTask']) this.state.scores['nBackTask'] = [];
        this.state.scores['nBackTask'].push(`Hits: ${this.gameData.nBackHits}, False Alarms: ${this.gameData.nBackFalseAlarms}, Misses: ${this.gameData.nBackMisses}`);

        if (scoreDisplay) {
            scoreDisplay.innerHTML = `
                Hits: <span style="color: var(--accent-color); font-size: 2rem;">${this.gameData.nBackHits}</span><br>
                False Alarms: <span style="color: #cc3333; font-size: 2rem;">${this.gameData.nBackFalseAlarms}</span><br>
                Misses: <span style="color: #cc3333; font-size: 2rem;">${this.gameData.nBackMisses}</span>
            `;
            scoreDisplay.style.color = "var(--text-color)";
        }

        this.proceedAfterTest();
    }

    // --- Flanker Methods ---
    startFlankerTrial() {
        if (this.gameData.flankerCurrentTrial >= this.gameData.flankerTrialsTotal) {
            this.endFlankerTask();
            return;
        }

        const arrowDiv = this.flankerArrows;
        const feedbackDiv = this.flankerFeedback;

        if (arrowDiv) arrowDiv.textContent = "";

        const delay = Math.random() * 1000 + 1000;

        this.gameData.timeoutId = setTimeout(() => {
            if (feedbackDiv) {
                feedbackDiv.textContent = "";
                feedbackDiv.className = "flanker-feedback";
            }

            const matchMiddle = Math.random() > 0.5;
            const midDir = Math.random() > 0.5 ? 'Right' : 'Left';
            const flankDir = matchMiddle ? midDir : (midDir === 'Right' ? 'Left' : 'Right');

            const renderArrow = (dir) => dir === 'Right' ? '→' : '←';
            const middleStr = renderArrow(midDir);
            const flankStr = renderArrow(flankDir);

            const displayStr = `${flankStr}${flankStr}${middleStr}${flankStr}${flankStr}`;

            this.gameData.flankerCurrentDirection = midDir;
            if (arrowDiv) arrowDiv.textContent = displayStr;

            this.gameData.startTime = performance.now();
            this.gameData.flankerCanPress = true;
        }, delay);
    }

    handleFlankerInput(keyCode) {
        if (!this.gameData.flankerCanPress) return;
        this.gameData.flankerCanPress = false;

        const reactionTime = Math.round(performance.now() - this.gameData.startTime);
        const userDirection = keyCode === 'ArrowRight' ? 'Right' : 'Left';
        const isCorrect = userDirection === this.gameData.flankerCurrentDirection;

        const feedbackDiv = this.flankerFeedback;

        if (feedbackDiv) {
            if (isCorrect) {
                feedbackDiv.textContent = `Correct! (${reactionTime} ms)`;
                feedbackDiv.className = "flanker-feedback correct";
                this.gameData.flankerTimes.push(reactionTime);
            } else {
                feedbackDiv.textContent = `Wrong! (${reactionTime} ms)`;
                feedbackDiv.className = "flanker-feedback wrong";
                this.gameData.flankerErrors++;
                this.gameData.flankerTimes.push(reactionTime + 500);
            }
        }

        const arrowDiv = this.flankerArrows;
        if (arrowDiv) arrowDiv.textContent = "";

        this.gameData.flankerCurrentTrial++;

        this.gameData.flankerFeedbackTimeout = setTimeout(() => {
            if (feedbackDiv) feedbackDiv.textContent = "";
            this.startFlankerTrial();
        }, 1000);
    }

    endFlankerTask() {
        const testId = this.testSequence[this.currentTestIndex];
        const avgTime = Math.round(this.gameData.flankerTimes.reduce((a, b) => a + b, 0) / this.gameData.flankerTimes.length);
        if (!this.state.scores[testId]) this.state.scores[testId] = [];
        this.state.scores[testId].push({
            avgReaction: avgTime,
            errors: this.gameData.flankerErrors
        });

        this.appContainer.style.backgroundColor = '';
        const scoreDisplay = this.roundScore;
        if (scoreDisplay) {
            scoreDisplay.innerHTML = `Avg: ${avgTime} ms<br><span style="font-size: 2rem; color: #cc3333">${this.gameData.flankerErrors} Errors</span>`;
            scoreDisplay.style.color = "var(--text-color)";
        }

        this.proceedAfterTest();
    }

    // --- Generic Spacebar Handler ---
    handleSpacebarReaction() {
        const testId = this.testSequence[this.currentTestIndex];

        if (this.gameData.isWaiting) {
            clearTimeout(this.gameData.timeoutId);
            clearInterval(this.gameData.distractorIntervalId);
            this.gameData.isWaiting = false;

            this.appContainer.style.backgroundColor = '';
            document.body.style.backgroundColor = '';
            const prompt = this.minigamePrompt;
            if (prompt) {
                prompt.textContent = "Too early!";
                prompt.style.color = "#cc3333";
            }
            this.gameData.trialTimes.push(400); // Early penalty
            this.gameData.trialScores.push("Early");
            this.gameData.currentTrialCount++;

            if (this.gameData.currentTrialCount >= 5) {
                setTimeout(() => this.endReactionTask(), 1000);
            } else {
                setTimeout(() => this.startReactionTrial(), 1000);
            }

        } else if (this.gameData.startTime) {
            const reactionTime = Math.round(performance.now() - this.gameData.startTime);
            this.gameData.startTime = null;

            this.gameData.trialTimes.push(reactionTime);
            this.gameData.currentTrialCount++;

            this.appContainer.style.backgroundColor = '';
            document.body.style.backgroundColor = '';
            const prompt = this.minigamePrompt;
            if (prompt) {
                prompt.textContent = `${reactionTime} ms`;
                prompt.style.color = "var(--accent-color)";
            }

            if (this.gameData.currentTrialCount >= 5) {
                setTimeout(() => this.endReactionTask(), 1000);
            } else {
                setTimeout(() => this.startReactionTrial(), 1000);
            }
        }
    }

    endReactionTask() {
        const testId = this.testSequence[this.currentTestIndex];

        let avgStr = "Failed repeatedly";
        let earlyCount = this.gameData.trialScores.filter(score => score === "Early").length;

        if (!this.state.scores[testId]) this.state.scores[testId] = [];
        if (this.gameData.trialTimes.length > 0) {
            const sum = this.gameData.trialTimes.reduce((a, b) => a + b, 0);
            const avg = Math.round(sum / this.gameData.trialTimes.length);
            avgStr = `${avg} ms`;
            this.state.scores[testId].push({ avgReaction: avg, earlyCount: earlyCount }); // Store object for final screen
        } else {
            this.state.scores[testId].push("Failed");
        }

        this.appContainer.style.backgroundColor = '';
        const scoreDisplay = this.roundScore;

        if (scoreDisplay) {
            let earlyStr = earlyCount > 0 ? `<br><span style="font-size: 1.5rem;">Early: ${earlyCount}/5 times</span>` : "";
            scoreDisplay.innerHTML = `Average: <br><span style="color: var(--accent-color); font-size: 3rem;">${avgStr}</span>${earlyStr}`;

            if (avgStr.includes("Fail")) scoreDisplay.style.color = "#cc3333";
            else scoreDisplay.style.color = "var(--text-color)";
        }

        this.proceedAfterTest();
    }

    proceedAfterTest() {
        if (this.gameData.isIndividualTest) {
            this.showScreen('results-screen');
        } else {
            const roundSize = this.testSequence.length / this.gameData.numRounds;
            const completedTests = this.currentTestIndex + 1;
            const isRoundEnd = completedTests % roundSize === 0;
            const isLastTest = completedTests === this.testSequence.length;

            if (isRoundEnd && !isLastTest) {
                const currentRound = completedTests / roundSize;
                const totalRounds = Math.ceil(this.testSequence.length / roundSize);
                if (this.roundCompleteText) {
                    this.roundCompleteText.innerHTML = `You have finished all tests in <strong>Round ${currentRound} of ${totalRounds}</strong>.<br><br>Take a short break if needed, then click below to start the next round.`;
                }
                this.showScreen('round-complete-screen');
            } else if (isLastTest) {
                this.showFinalResults();
            } else {
                this.currentTestIndex++;
                this.showInstructions();
            }
        }
    }

    showFinalResults() {
        this.showScreen('final-screen');
        const summaryDiv = this.finalSummary;
        let html = '<h2 style="text-align: center; margin-bottom: 2rem;">Final Scores</h2><ul style="list-style: none; padding: 0;">';

        for (const [key, value] of Object.entries(this.state.scores)) {

            let displayValue = "";
            if (Array.isArray(value)) {
                if (typeof value[0] === 'object') {
                    if (value[0].earlyCount !== undefined) {
                        const totalAvg = Math.round(value.reduce((a, b) => a + (b.avgReaction || 0), 0) / value.length);
                        const totalEarly = value.reduce((a, b) => a + (b.earlyCount || 0), 0);
                        displayValue = `${totalAvg} ms (Early: ${totalEarly}/${5 * value.length} times)`;
                    } else if (value[0].errors !== undefined) {
                        const totalAvg = Math.round(value.reduce((a, b) => a + (b.avgReaction || 0), 0) / value.length);
                        const totalErrors = value.reduce((a, b) => a + (b.errors || 0), 0);
                        displayValue = `${totalAvg} ms (Errors: ${totalErrors})`;
                    }
                } else if (typeof value[0] === 'string' && value[0].includes('Hits:')) {
                    if (value.length > 1) {
                        displayValue = value.map((v, i) => `<br><span style="font-size: 0.9em; opacity: 0.8;">[Round ${i + 1}]</span> ${v}`).join('');
                    } else {
                        displayValue = value[0];
                    }
                } else {
                    if (value.length > 1) {
                        displayValue = value.map((v, i) => `<br><span style="font-size: 0.9em; opacity: 0.8;">[Round ${i + 1}]</span> ${v.replace('Average: ', '')}`).join('');
                    } else {
                        displayValue = value[0];
                    }
                }
            } else {
                displayValue = value; // Fallback
            }

            const formattedKey = key.replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase());
            html += `<li style="margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid #333; padding-bottom: 8px;"><strong>${formattedKey}:</strong> <span style="text-align: right;">${displayValue}</span></li>`;
        }

        html += '</ul>';

        const renderResultsBreakdown = (title, breakdownsData) => {
            if (!breakdownsData || breakdownsData.length === 0) return '';
            const arr = Array.isArray(breakdownsData) ? breakdownsData : [breakdownsData];
            let res = `<h3 style="margin-top: 3rem; text-align: center; color: var(--text-color);">${title}</h3>`;
            arr.forEach((block, i) => {
                if (arr.length > 1) res += `<h4 style="text-align: center; color: var(--accent-color); margin-top: 1.5rem;">Round ${i + 1}</h4>`;
                if (typeof block === 'object' && block.summary !== undefined) {
                    // Math breakdown object
                    res += `<div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1rem;">`;
                    res += `<div style="text-align: center; font-weight: bold; margin-bottom: 0.5rem;">${block.summary}</div>`;
                    if (block.wrongAnswersHTML) res += block.wrongAnswersHTML;
                    res += `</div>`;
                } else {
                    res += `<div style="background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1rem;">`;
                    res += block;
                    res += `</div>`;
                }
            });
            return res;
        };

        if (this.state.breakdowns) {
            html += renderResultsBreakdown('Sequential Numbers Breakdown', this.state.breakdowns['sequentialNumberMemory']);
            html += renderResultsBreakdown('Reverse Numbers Breakdown', this.state.breakdowns['reverseSequentialNumberMemory']);
            html += renderResultsBreakdown('Mental Math — Wrong Answers', this.state.breakdowns['mentalMath']);
            html += renderResultsBreakdown('Story Math — Wrong Answers', this.state.breakdowns['storyMath']);
            html += renderResultsBreakdown('Clock Reading Breakdown', this.state.breakdowns['clockReading']);
        }

        if (summaryDiv) summaryDiv.innerHTML = html;

        if (this.progressContainer) this.progressContainer.style.display = 'none';

        // Save to History (Only Full Assessments)
        if (!this.gameData.isIndividualTest) {
            this.saveToHistory();
        }
    }

    // --- State Persistence & UI Extras ---
    updateProgressBar() {
        const progressBar = this.progressBar;
        const progressInfo = this.progressInfo;
        const totalTests = this.testSequence.length;

        if (progressBar) {
            const pct = (this.currentTestIndex / totalTests) * 100;
            progressBar.style.width = `${pct}%`;
        }

        if (progressInfo) {
            if (!this.gameData.isIndividualTest) {
                const roundSize = this.testSequence.length / this.gameData.numRounds;
                const currentRound = Math.floor(this.currentTestIndex / roundSize) + 1;
                const totalRounds = Math.ceil(totalTests / roundSize);
                const testInRound = (this.currentTestIndex % roundSize) + 1;

                progressInfo.textContent = `Round ${currentRound} of ${totalRounds} • Test ${testInRound} of ${roundSize}`;
            } else {
                progressInfo.textContent = "";
            }
        }
    }

    saveSettings() {
        this.setStorageItem('cognitiveTestSettings', JSON.stringify(this.settings));
    }

    applyTheme(isDark) {
        if (isDark) {
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
        }
    }

    // --- Shared Scoring Utility ---
    // Single source of truth for computing a 0-100 metric score from raw test data.
    // Returns null for tests that don't contribute to the overall metric.
    computeScoreForTest(key, value) {
        if (key.startsWith('story') || key === 'storyMemoryQuestions' || key === 'storyMemoryReading' || key === 'addressMemoryReading' || key === 'addressMemoryQuestions') return null;
        if (!Array.isArray(value) || value.length === 0) return null;

        if (typeof value[0] === 'object' && value[0].avgReaction !== undefined) {
            const avg = Math.round(value.reduce((a, b) => a + (b.avgReaction || 0), 0) / value.length);
            if (key === 'flankerArrow') {
                // 100 points = 300ms or faster. 0 points = 700ms or slower. (Range = 400ms)
                let flankerScore = Math.max(0, Math.min(100, Math.round(100 * (700 - avg) / 400)));
                const totalErrors = value.reduce((a, b) => a + (b.errors || 0), 0);
                const avgErrors = totalErrors / value.length;
                flankerScore = Math.max(0, Math.round(flankerScore - avgErrors * 5));
                return flankerScore;
            } else {
                // 100 points = 200ms or faster. 0 points = 500ms or slower. (Range = 300ms)
                return Math.max(0, Math.min(100, Math.round(100 * (500 - avg) / 300)));
            }
        } else if (typeof value[0] === 'string' && value[0].includes('%')) {
            let totalPct = 0, pctCount = 0;
            for (const v of value) {
                const match = v.match(/(\d+)%/);
                if (match) { totalPct += parseInt(match[1]); pctCount++; }
            }
            return pctCount > 0 ? Math.round(totalPct / pctCount) : null;
        } else if (typeof value[0] === 'string' && value[0].includes('Mistakes')) {
            const match = value[0].match(/Mistakes:\s*([\d.]+)/);
            if (match) {
                const avgMistakes = parseFloat(match[1]);
                return Math.max(0, Math.round(100 - (avgMistakes * 25)));
            }
        } else if (typeof value[0] === 'string' && value[0].includes('Points')) {
            let totalPts = 0, ptsCount = 0;
            for (const v of value) {
                const m = v.match(/(\d+)\s*Points/);
                if (m) { totalPts += parseInt(m[1]); ptsCount++; }
            }
            return ptsCount > 0 ? Math.round(totalPts / ptsCount) : null;
        } else if (typeof value[0] === 'string' && value[0].includes('/')) {
            let totalPct = 0, partCount = 0;
            for (const v of value) {
                const m = v.match(/([\d.]+)\/([\d.]+)/);
                if (m) { totalPct += (parseFloat(m[1]) / parseFloat(m[2])) * 100; partCount++; }
            }
            return partCount > 0 ? Math.round(totalPct / partCount) : null;
        } else if (typeof value[0] === 'string' && value[0].includes('Hits')) {
            let totalPct = 0, nCount = 0;
            for (const v of value) {
                const hitsMatch = v.match(/Hits:\s*(\d+)/);
                const faMatch = v.match(/False Alarms:\s*(\d+)/);
                const missesMatch = v.match(/Misses:\s*(\d+)/);
                if (hitsMatch && missesMatch) {
                    const hits = parseInt(hitsMatch[1]);
                    const fa = faMatch ? parseInt(faMatch[1]) : 0;
                    const misses = parseInt(missesMatch[1]);
                    const total = hits + misses;
                    const score = total > 0 ? Math.max(0, Math.round(((hits - fa) / total) * 100)) : 0;
                    totalPct += score;
                    nCount++;
                }
            }
            return nCount > 0 ? Math.round(totalPct / nCount) : null;
        }
        return null;
    }

    saveToHistory() {
        let history = JSON.parse(this.getStorageItem('cognitiveTestHistory')) || [];

        // Calculate a crude 'overall' score metric for the quick-view list
        let aggregatePoints = 0;
        let testCount = 0;

        for (const [key, value] of Object.entries(this.state.scores)) {
            const score = this.computeScoreForTest(key, value);
            if (score !== null) {
                aggregatePoints += score;
                testCount++;
            }
        }

        let timeStr = "Unknown Time";
        if (this.gameData.assessmentStartTime) {
            const ms = Date.now() - this.gameData.assessmentStartTime;
            const totalSeconds = Math.floor(ms / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            timeStr = `${minutes}m ${seconds}s`;
        }

        const now = new Date();
        const dateStr = now.toLocaleDateString();
        const timeOfDayStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // No seconds

        const runRecord = {
            date: `run: ${dateStr} ${timeOfDayStr}`,
            name: `run: ${dateStr} ${timeOfDayStr}`, // Default name is the date
            durationLabel: this.gameData.assessmentLengthStr || "Practice",
            totalTime: timeStr,
            testsCompleted: Object.keys(this.state.scores).length,
            scoreSummary: testCount > 0 ? `Overall Metric: ${Math.round(aggregatePoints / testCount)} / 100` : "Practice Run",
            rawScores: JSON.parse(JSON.stringify(this.state.scores)), // Deep copy currently populated raw scores
            rawBreakdowns: JSON.parse(JSON.stringify(this.state.breakdowns))
        };

        history.unshift(runRecord); // Add to front
        // Keep max 50 records
        if (history.length > 50) history.pop();

        this.setStorageItem('cognitiveTestHistory', JSON.stringify(history));
    }

    renderHistory() {
        const historyContainer = this.historyContainer || document.getElementById('history-container');
        const history = JSON.parse(this.getStorageItem('cognitiveTestHistory')) || [];

        if (history.length === 0) {
            historyContainer.innerHTML = '<p style="text-align: center; opacity: 0.6; margin-top: 2rem;">No past results found. Complete a Full Assessment to generate history.</p>';
            return;
        }

        let html = '';
        history.forEach((run, index) => {
            const displayName = run.name || run.date;
            html += `
                <div class="history-card" onclick="window.gameManager.showHistoryDetail(${index})" style="background: var(--surface-color); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid var(--border-color); cursor: pointer; transition: 0.2s; position: relative;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span style="font-weight: bold; color: var(--accent-color);">${displayName}</span>
                        <span style="font-size: 0.9rem; background: var(--border-color); padding: 0.2rem 0.5rem; border-radius: 4px;">${run.durationLabel}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; opacity: 0.8; font-size: 0.95rem; margin-bottom: 0.5rem;">
                        <span>📅 ${(run.date || '').replace(/^run:\s*/i, '')} &nbsp;·&nbsp; ⏱️ ${run.totalTime}</span>
                        <span>${run.testsCompleted} Tasks Configured</span>
                    </div>
                    <div style="margin-top: 0.5rem; font-weight: bold; font-size: 1.1rem;">${run.scoreSummary}</div>
                </div>
            `;
        });
        historyContainer.innerHTML = html;
    }

    showHistoryDetail(index) {
        const history = JSON.parse(this.getStorageItem('cognitiveTestHistory')) || [];
        const run = history[index];
        if (!run) return;

        const detailContainer = this.historyDetailContainer || document.getElementById('history-detail-container');
        if (!run.rawScores) {
            detailContainer.innerHTML = '<p style="text-align: center; opacity: 0.6;">No detailed data available for this older run.</p>';
            this.showScreen('history-detail-screen');
            return;
        }

        // Determine maximum rounds played across all tests in this run
        let maxRounds = 1;
        for (const [key, value] of Object.entries(run.rawScores)) {
            if (key === 'storyMemoryReading' || key === 'addressMemoryReading') continue;
            if (Array.isArray(value) && value.length > maxRounds) {
                maxRounds = value.length;
            }
        }

        // Helper to compute per-test metric score (0-100), returns null if not applicable
        const computeTestMetric = (key, value) => this.computeScoreForTest(key, value);

        // Compute overall metric
        let aggregatePoints = 0;
        let testCount = 0;
        const testMetrics = {};
        for (const [key, value] of Object.entries(run.rawScores)) {
            const metric = computeTestMetric(key, value);
            testMetrics[key] = metric;
            if (metric !== null) {
                aggregatePoints += metric;
                testCount++;
            }
        }
        const overallMetric = testCount > 0 ? Math.round(aggregatePoints / testCount) : null;

        const displayName = run.name || run.date;
        const dateDisplay = (run.date || 'Unknown date').replace(/^run:\s*/i, '');
        const timeDisplay = run.totalTime || 'N/A';
        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                <h3 style="margin: 0; color: var(--accent-color);">${displayName} - ${run.durationLabel}</h3>
                <div style="display: flex; gap: 0.5rem; flex-shrink: 0;">
                    <button onclick="event.stopPropagation(); window.gameManager.renameHistory(${index})" style="padding: 0.4rem 0.8rem; font-size: 0.9rem; background: rgba(74,144,226,0.15); border: 1px solid var(--accent-color); color: var(--accent-color); border-radius: 6px; cursor: pointer;" title="Rename Run">✏️ Rename</button>
                    <button onclick="event.stopPropagation(); window.gameManager.deleteHistory(${index})" style="padding: 0.4rem 0.8rem; font-size: 0.9rem; background: rgba(255,77,77,0.15); border: 1px solid #ff4d4d; color: #ff4d4d; border-radius: 6px; cursor: pointer;" title="Delete Run">🗑️ Delete</button>
                </div>
            </div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; opacity: 0.6;">📅 ${dateDisplay} &nbsp;·&nbsp; ⏱️ Completed in ${timeDisplay}</p>
        `;

        // Overall metric display
        if (overallMetric !== null) {
            html += `<div style="text-align: center; margin: 1rem 0 0.5rem 0; padding: 1rem; background: rgba(74,144,226,0.1); border: 1px solid var(--accent-color); border-radius: 10px;">
                <span style="font-size: 1rem; opacity: 0.7;">Overall Metric</span><br>
                <span style="font-size: 3rem; font-weight: 700; color: var(--accent-color);">${overallMetric}</span>
                <span style="font-size: 1.5rem; opacity: 0.5;"> / 100</span>
            </div>`;
        }

        // Build style for table
        html += '<style>.detail-table { width: 100%; border-collapse: collapse; margin-top: 1rem; } .detail-table th, .detail-table td { padding: 10px; border: 1px solid var(--border-color); text-align: center; } .detail-table th { background: #222; } .detail-table td { background: var(--surface-color); }</style>';

        html += '<table class="detail-table">';
        html += '<thead><tr><th style="text-align: left;"></th>';
        for (let i = 1; i <= maxRounds; i++) {
            html += `<th>Round ${i}</th>`;
        }
        html += '<th style="background: rgba(74,144,226,0.15);">Metric</th>';
        html += '</tr></thead><tbody>';

        // Define display order: scored tests first, then question rounds
        const scoredTests = ['audioReaction', 'visualReaction', 'inhibitoryControl', 'flankerArrow', 'visualSpatialMemory', 'simultaneousSpatialMemory', 'sequentialNumberMemory', 'reverseSequentialNumberMemory', 'nBackTask', 'chimpTest', 'mentalMath', 'storyMath', 'clockReading'];
        const questionTests = [
            'storyMemoryQuestions', 
            'story1Recall1', 'story1Recall2', 'story1Recall3',
            'story2Recall1', 'story2Recall2',
            'story3Recall1',
            'addressMemoryQuestions'
        ];
        const allTests = [...scoredTests, ...questionTests];

        for (const key of allTests) {
            const value = run.rawScores[key];
            if (value === undefined) continue;

            const isQuestionRound = questionTests.includes(key);
            const testTitle = this.testInfo[key] ? this.testInfo[key].title : key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            html += `<tr><td style="text-align: left; font-weight: bold;">${testTitle}</td>`;

            for (let i = 0; i < maxRounds; i++) {
                let cellData = "-";
                if (Array.isArray(value) && value[i] !== undefined) {
                    const roundData = value[i];
                    if (typeof roundData === 'object') {
                        if (roundData.earlyCount !== undefined) {
                            cellData = `${roundData.avgReaction} ms <br><span style="font-size: 0.8em; opacity: 0.7;">(Early: ${roundData.earlyCount}/5)</span>`;
                        } else if (roundData.errors !== undefined) {
                            cellData = `${roundData.avgReaction} ms <br><span style="font-size: 0.8em; opacity: 0.7;">(Errors: ${roundData.errors})</span>`;
                        }
                    } else if (typeof roundData === 'string') {
                        cellData = roundData.replace('Average: ', '');
                    } else {
                        cellData = roundData;
                    }
                } else if (!Array.isArray(value) && i === 0) {
                    cellData = value;
                }
                html += `<td>${cellData}</td>`;
            }

            // Metric column
            const metric = testMetrics[key];
            if (isQuestionRound) {
                html += '<td style="opacity: 0.3;">—</td>';
            } else if (metric !== null) {
                html += `<td style="font-weight: bold; color: var(--accent-color);">${metric}</td>`;
            } else {
                html += '<td>-</td>';
            }

            html += '</tr>';
        }

        html += '</tbody></table>';

        if (run.rawBreakdowns) {
            const renderHistoryBreakdown = (title, breakdownsData) => {
                if (!breakdownsData || breakdownsData.length === 0) return '';
                const arr = Array.isArray(breakdownsData) ? breakdownsData : [breakdownsData];
                let res = `<h4 style="margin-top: 2rem; text-align: center; color: var(--text-color);">${title}</h4>`;
                arr.forEach((block, i) => {
                    if (arr.length > 1) res += `<h5 style="text-align: center; color: var(--accent-color); margin-top: 1rem;">Round ${i + 1}</h5>`;
                    if (typeof block === 'object' && block.summary !== undefined) {
                        res += `<div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 1rem;">`;
                        res += `<div style="text-align: center; font-weight: bold; margin-bottom: 0.5rem;">${block.summary}</div>`;
                        if (block.wrongAnswersHTML) res += block.wrongAnswersHTML;
                        res += `</div>`;
                    } else {
                        res += `<div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 1rem;">`;
                        res += block;
                        res += `</div>`;
                    }
                });
                return res;
            };

            html += renderHistoryBreakdown('Sequential Numbers Breakdown', run.rawBreakdowns['sequentialNumberMemory']);
            html += renderHistoryBreakdown('Reverse Numbers Breakdown', run.rawBreakdowns['reverseSequentialNumberMemory']);
            html += renderHistoryBreakdown('Mental Math — Wrong Answers', run.rawBreakdowns['mentalMath']);
            html += renderHistoryBreakdown('Story Math — Wrong Answers', run.rawBreakdowns['storyMath']);
            html += renderHistoryBreakdown('Clock Reading Breakdown', run.rawBreakdowns['clockReading']);
        }

        detailContainer.innerHTML = html;
        this.showScreen('history-detail-screen');
    }

    renameHistory(index) {
        let history = JSON.parse(this.getStorageItem('cognitiveTestHistory')) || [];
        if (!history[index]) return;

        const currentName = history[index].name || history[index].date;
        this.showCustomModal({
            title: 'Rename Assessment Run',
            message: 'Enter a new name for this assessment run:',
            inputField: true,
            inputValue: currentName,
            confirmText: 'Save',
            cancelText: 'Cancel',
            onConfirm: (value) => {
                if (value && value.trim() !== '') {
                    history[index].name = value.trim();
                    this.setStorageItem('cognitiveTestHistory', JSON.stringify(history));
                    this.renderHistory();
                    this.showHistoryDetail(index);
                }
            }
        });
    }

    deleteHistory(index) {
        let history = JSON.parse(this.getStorageItem('cognitiveTestHistory')) || [];
        if (!history[index]) return;

        this.showCustomModal({
            title: 'Delete Assessment Run',
            message: 'Are you sure you want to permanently delete this assessment run from your history?',
            inputField: false,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            dangerous: true,
            onConfirm: () => {
                history.splice(index, 1);
                this.setStorageItem('cognitiveTestHistory', JSON.stringify(history));
                this.renderHistory();
                this.showScreen('history-screen');
            }
        });
    }

    showCustomModal({ title, message, inputField, inputValue, confirmText, cancelText, dangerous, onConfirm }) {
        // Remove any existing modal
        const existing = document.getElementById('custom-app-modal');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'custom-app-modal';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:10000;';

        const box = document.createElement('div');
        box.style.cssText = 'background:#1a1a2e;border:1px solid rgba(74,144,226,0.3);border-radius:12px;padding:2rem;max-width:420px;width:90%;box-shadow:0 8px 32px rgba(0,0,0,0.5);';

        const titleEl = document.createElement('h3');
        titleEl.textContent = title;
        titleEl.style.cssText = 'margin:0 0 1rem 0;color:var(--accent-color,#4a90e2);font-size:1.2rem;';
        box.appendChild(titleEl);

        const msgEl = document.createElement('p');
        msgEl.textContent = message;
        msgEl.style.cssText = 'margin:0 0 1.5rem 0;color:#ccc;font-size:0.95rem;line-height:1.5;';
        box.appendChild(msgEl);

        let inputEl = null;
        if (inputField) {
            inputEl = document.createElement('input');
            inputEl.type = 'text';
            inputEl.value = inputValue || '';
            inputEl.style.cssText = 'width:100%;padding:0.6rem 0.8rem;font-size:1rem;background:#111;color:#fff;border:1px solid rgba(74,144,226,0.4);border-radius:6px;margin-bottom:1.5rem;box-sizing:border-box;outline:none;';
            inputEl.addEventListener('focus', () => { inputEl.style.borderColor = '#4a90e2'; });
            inputEl.addEventListener('blur', () => { inputEl.style.borderColor = 'rgba(74,144,226,0.4)'; });
            box.appendChild(inputEl);
        }

        const btnRow = document.createElement('div');
        btnRow.style.cssText = 'display:flex;gap:0.75rem;justify-content:flex-end;';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = cancelText;
        cancelBtn.style.cssText = 'padding:0.5rem 1.2rem;font-size:0.95rem;background:transparent;border:1px solid #555;color:#aaa;border-radius:6px;cursor:pointer;';
        cancelBtn.addEventListener('click', () => overlay.remove());

        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = confirmText;
        if (dangerous) {
            confirmBtn.style.cssText = 'padding:0.5rem 1.2rem;font-size:0.95rem;background:rgba(255,77,77,0.2);border:1px solid #ff4d4d;color:#ff4d4d;border-radius:6px;cursor:pointer;font-weight:600;';
        } else {
            confirmBtn.style.cssText = 'padding:0.5rem 1.2rem;font-size:0.95rem;background:rgba(74,144,226,0.2);border:1px solid #4a90e2;color:#4a90e2;border-radius:6px;cursor:pointer;font-weight:600;';
        }
        confirmBtn.addEventListener('click', () => {
            overlay.remove();
            if (onConfirm) onConfirm(inputEl ? inputEl.value : null);
        });

        btnRow.appendChild(cancelBtn);
        btnRow.appendChild(confirmBtn);
        box.appendChild(btnRow);
        overlay.appendChild(box);

        // Close on overlay click (outside the box)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });

        document.body.appendChild(overlay);

        // Focus input or confirm button
        if (inputEl) {
            inputEl.focus();
            inputEl.select();
            inputEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') confirmBtn.click();
                if (e.key === 'Escape') overlay.remove();
            });
        } else {
            confirmBtn.focus();
            confirmBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') overlay.remove();
            });
        }
    }

    // --- Clock Reading Minigame Methods ---
    startClockReading() {
        // Generate round configurations (5 with indicators, 5 without)
        const roundsConfig = [true, true, true, true, true, false, false, false, false, false];
        // Shuffle configurations
        for (let i = roundsConfig.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [roundsConfig[i], roundsConfig[j]] = [roundsConfig[j], roundsConfig[i]];
        }

        this.gameData.clockRConfig = roundsConfig;
        this.gameData.clockCurrentRound = 0;
        this.gameData.clockScore = 0;
        this.gameData.clockWrongAnswers = [];

        this.nextClockReadingQuestion();
    }

    nextClockReadingQuestion() {
        this.gameData.clockCurrentRound++;
        
        // Clear any active timer intervals
        clearInterval(this.gameData.clockTimerInterval);

        // Generate target time: hour (1-12) and minute (0-55 in multiples of 5)
        const hour = Math.floor(Math.random() * 12) + 1;
        const minute = Math.floor(Math.random() * 12) * 5;
        const correctStr = `${hour}:${String(minute).padStart(2, '0')}`;
        this.gameData.clockCorrectTime = correctStr;

        // Generate choices
        const choicesSet = new Set();
        choicesSet.add(correctStr);

        // Choice 2: Hand-swapped distractor
        // minute hand (value / 5) maps to hour (1-12)
        let swappedHour = Math.floor(minute / 5);
        if (swappedHour === 0) swappedHour = 12;
        // hour hand maps to minute (hour * 5)
        let swappedMin = (hour % 12) * 5;
        const swappedStr = `${swappedHour}:${String(swappedMin).padStart(2, '0')}`;
        if (swappedStr !== correctStr) {
            choicesSet.add(swappedStr);
        }

        // Choices 3 & 4: Distractors close to the correct time (±1 hour, ±15 mins)
        let attempts = 0;
        const hrOffsets = [-1, 0, 1];
        const minOffsets = [-15, -10, -5, 5, 10, 15];

        while (choicesSet.size < 4 && attempts < 100) {
            attempts++;
            const dh = hrOffsets[Math.floor(Math.random() * hrOffsets.length)];
            const dm = minOffsets[Math.floor(Math.random() * minOffsets.length)];
            
            if (dh === 0 && dm === 0) continue;

            const h = (hour + dh + 12 - 1) % 12 + 1;
            const m = (minute + dm + 60) % 60;
            choicesSet.add(`${h}:${String(m).padStart(2, '0')}`);
        }

        // Fallback
        while (choicesSet.size < 4) {
            const h = Math.floor(Math.random() * 12) + 1;
            const m = Math.floor(Math.random() * 12) * 5;
            choicesSet.add(`${h}:${String(m).padStart(2, '0')}`);
        }

        // Convert and shuffle choices (User: "dont forget to shuffle these")
        const choices = Array.from(choicesSet);
        for (let i = choices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [choices[i], choices[j]] = [choices[j], choices[i]];
        }

        // Update round info and retrieve indicators config
        if (this.clockProgressInfo) {
            this.clockProgressInfo.textContent = `Round ${this.gameData.clockCurrentRound} of 10`;
        }
        const withIndicators = this.gameData.clockRConfig[this.gameData.clockCurrentRound - 1];

        // Draw the clock face on canvas
        this.drawAnalogClock(hour, minute, withIndicators);

        // Render options buttons (including desktop shortcut hints)
        const container = this.clockOptionsContainer;
        if (container) {
            container.innerHTML = choices.map((c, idx) => `
                <button class="clock-option-btn" onclick="window.gameManager.handleClockAnswer('${c}', this)">
                    <span style="font-size: 0.85em; opacity: 0.5; margin-right: 8px;">[${idx + 1}]</span>${c}
                </button>
            `).join('');
        }

        // Start round timer (10s max)
        this.gameData.clockRoundStartTime = performance.now();
        const timerText = this.clockTimerText;
        const timerBar = this.clockTimerBar;
        timerText.textContent = '10.0s';
        timerText.style.color = 'var(--accent-color)';
        timerBar.style.width = '100%';
        timerBar.style.backgroundColor = 'var(--accent-color)';

        this.gameData.clockTimerInterval = setInterval(() => {
            const elapsed = (performance.now() - this.gameData.clockRoundStartTime) / 1000;
            const remaining = Math.max(0, 10 - elapsed);
            timerText.textContent = `${remaining.toFixed(1)}s`;
            timerBar.style.width = `${(remaining / 10) * 100}%`;

            if (remaining < 3) {
                timerBar.style.backgroundColor = '#cc3333';
                timerText.style.color = '#cc3333';
            } else {
                timerBar.style.backgroundColor = 'var(--accent-color)';
                timerText.style.color = 'var(--accent-color)';
            }

            if (remaining <= 0) {
                clearInterval(this.gameData.clockTimerInterval);
                this.handleClockAnswer(null, null); // timeout
            }
        }, 50);
    }

    drawAnalogClock(hour, minute, withIndicators) {
        const canvas = this.clockCanvas || document.getElementById('clock-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const r = cx - 15;

        // Query colors from the body style to support light/dark modes
        const styles = getComputedStyle(document.body);
        const textColor = styles.getPropertyValue('--text-color').trim() || '#e0e0e0';
        const accentColor = styles.getPropertyValue('--accent-color').trim() || '#4a90e2';
        const isDarkMode = !document.body.classList.contains('light-mode');
        const faceBgColor = isDarkMode ? '#141414' : '#f5f5f5';
        const rimColor = isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Clock Rim Background
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.fillStyle = faceBgColor;
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = rimColor;
        ctx.stroke();

        // Draw Indicator marks (Lines instead of numbers)
        if (withIndicators) {
            ctx.strokeStyle = textColor;
            ctx.lineCap = 'round';
            for (let i = 0; i < 12; i++) {
                const angle = i * Math.PI / 6;
                const isMajor = (i % 3 === 0); // 12, 3, 6, 9
                const tickLength = isMajor ? 14 : 8;
                const tickWidth = isMajor ? 4 : 2;

                ctx.lineWidth = tickWidth;
                const x1 = cx + (r - tickLength) * Math.sin(angle);
                const y1 = cy - (r - tickLength) * Math.cos(angle);
                const x2 = cx + r * Math.sin(angle);
                const y2 = cy - r * Math.cos(angle);

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }

        // Draw Hour Hand
        // Hour moves incrementally as minutes progress
        const hrAngle = (hour % 12) * Math.PI / 6 + (minute / 60) * Math.PI / 6;
        ctx.strokeStyle = textColor;
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + (r * 0.5) * Math.sin(hrAngle), cy - (r * 0.5) * Math.cos(hrAngle));
        ctx.stroke();

        // Draw Minute Hand
        const minAngle = minute * Math.PI / 30;
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 4.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + (r * 0.78) * Math.sin(minAngle), cy - (r * 0.78) * Math.cos(minAngle));
        ctx.stroke();

        // Draw Center Pivot Cap
        ctx.beginPath();
        ctx.arc(cx, cy, 8, 0, 2 * Math.PI);
        ctx.fillStyle = textColor;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, 3.5, 0, 2 * Math.PI);
        ctx.fillStyle = faceBgColor;
        ctx.fill();
    }

    handleClockAnswer(selectedTime, buttonEl) {
        clearInterval(this.gameData.clockTimerInterval);

        // Lock answer input buttons
        const buttons = document.querySelectorAll('.clock-option-btn');
        buttons.forEach(btn => btn.disabled = true);

        const elapsedMs = performance.now() - this.gameData.clockRoundStartTime;
        let points = 0;
        const isCorrect = (selectedTime === this.gameData.clockCorrectTime);

        // Highlight correct and selected answers
        buttons.forEach(btn => {
            const timeVal = btn.textContent.trim().split(']').pop().trim();
            if (timeVal === this.gameData.clockCorrectTime) {
                btn.classList.add('correct-choice');
            }
        });

        if (selectedTime === null) {
            // Timeout
            this.playBeep(220, 0.3);
            this.gameData.clockWrongAnswers.push({
                round: this.gameData.clockCurrentRound,
                indicators: this.gameData.clockRConfig[this.gameData.clockCurrentRound - 1] ? 'Yes' : 'No',
                correct: this.gameData.clockCorrectTime,
                answered: 'Timeout',
                time: '10.00s',
                points: 0,
                correctStatus: false
            });
        } else {
            if (isCorrect) {
                // Score normalized to human reaction time (2s is max score, and it decreases from there)
                if (elapsedMs <= 2000) {
                    points = 100;
                } else {
                    points = Math.max(10, Math.round(((10000 - elapsedMs) / 8000) * 90) + 10);
                }
                this.gameData.clockScore += points;
                this.playBeep(880, 0.2);
            } else {
                if (buttonEl) buttonEl.classList.add('wrong-choice');
                this.playBeep(220, 0.3);
            }

            this.gameData.clockWrongAnswers.push({
                round: this.gameData.clockCurrentRound,
                indicators: this.gameData.clockRConfig[this.gameData.clockCurrentRound - 1] ? 'Yes' : 'No',
                correct: this.gameData.clockCorrectTime,
                answered: selectedTime,
                time: `${(elapsedMs / 1000).toFixed(2)}s`,
                points: points,
                correctStatus: isCorrect
            });
        }

        // Advance round after 1.2s
        setTimeout(() => {
            if (this.gameData.clockCurrentRound < 10) {
                this.nextClockReadingQuestion();
            } else {
                this.endClockReading();
            }
        }, 1200);
    }

    endClockReading() {
        const totalPoints = Math.round(this.gameData.clockScore / 10);
        const correctRounds = this.gameData.clockWrongAnswers.filter(r => r.correctStatus).length;

        if (!this.state.scores['clockReading']) this.state.scores['clockReading'] = [];
        this.state.scores['clockReading'].push(`${totalPoints} Points`);

        const breakdownHTML = this.generateClockBreakdownHTML(totalPoints, correctRounds);

        if (!this.state.breakdowns['clockReading']) this.state.breakdowns['clockReading'] = [];
        this.state.breakdowns['clockReading'].push({
            summary: `${correctRounds}/10 Correct • Avg Score: ${totalPoints} Pts`,
            wrongAnswersHTML: breakdownHTML
        });

        const scoreDisplay = this.roundScore || document.getElementById('round-score');
        if (scoreDisplay) {
            scoreDisplay.innerHTML = breakdownHTML;
            scoreDisplay.style.color = 'var(--text-color)';
        }

        this.proceedAfterTest();
    }

    generateClockBreakdownHTML(avgPoints, correctRounds) {
        let html = `<div style="text-align: center; margin-bottom: 1.5rem;">`;
        html += `Average Score: <span class="score-highlight" style="font-size: 3rem; text-shadow: 0 0 15px rgba(74,144,226,0.4);">${avgPoints}</span> Points`;
        html += `<br><span style="font-size: 1.2rem; opacity: 0.8;">Accuracy: ${correctRounds}/10 Correct</span></div>`;

        html += `<div style="overflow-x: auto; width: 100%; max-width: 650px; margin: 0 auto; background: rgba(0,0,0,0.2); border-radius: 8px; border: 1px solid var(--border-color);">`;
        html += `<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: center;">`;
        html += `<thead><tr style="border-bottom: 2px solid var(--border-color); background: rgba(255,255,255,0.05); font-weight: bold; color: #a0a0a0;">`;
        html += `<th style="padding: 10px; border: 1px solid var(--border-color);">Round</th>`;
        html += `<th style="padding: 10px; border: 1px solid var(--border-color);">Indicators</th>`;
        html += `<th style="padding: 10px; border: 1px solid var(--border-color);">Correct Time</th>`;
        html += `<th style="padding: 10px; border: 1px solid var(--border-color);">Your Answer</th>`;
        html += `<th style="padding: 10px; border: 1px solid var(--border-color);">Speed</th>`;
        html += `<th style="padding: 10px; border: 1px solid var(--border-color);">Points</th>`;
        html += `</tr></thead><tbody>`;

        this.gameData.clockWrongAnswers.forEach(r => {
            const symbol = r.correctStatus ? '✅' : '❌';
            const answeredText = r.answered === 'Timeout' ? 'Timeout' : r.answered;
            const answeredColor = r.correctStatus ? '#4CAF50' : '#F44336';
            const rowBg = r.correctStatus ? 'transparent' : 'rgba(244, 67, 54, 0.03)';

            html += `<tr style="border-bottom: 1px solid var(--border-color); background: ${rowBg};">`;
            html += `<td style="padding: 10px; border: 1px solid var(--border-color);">${r.round}</td>`;
            html += `<td style="padding: 10px; border: 1px solid var(--border-color); opacity: 0.8;">${r.indicators}</td>`;
            html += `<td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold; color: var(--accent-color);">${r.correct}</td>`;
            html += `<td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold; color: ${answeredColor};">${symbol} ${answeredText}</td>`;
            html += `<td style="padding: 10px; border: 1px solid var(--border-color); opacity: 0.8;">${r.time}</td>`;
            html += `<td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold; color: ${r.points > 0 ? '#4CAF50' : 'inherit'};">${r.points}</td>`;
            html += `</tr>`;
        });

        html += `</tbody></table></div>`;
        return html;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gameManager = new GameManager();
});

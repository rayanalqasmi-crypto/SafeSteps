
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
    Accessibility,
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Headphones,
    HeartPulse,
    Image,
    Menu,
    ShieldCheck,
} from 'lucide-react';

import Home from './pages/Home';
import Explore from './pages/Explore';
import ScenarioDetails from './pages/ScenarioDetails';
import LearningModes from './pages/LearningModes';
import LearningSteps from './pages/LearningSteps';
import Simulation from './pages/Simulation';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Progress from './pages/Progress';
import Emergency from './pages/Emergency';
import AccessibilitySettings from './pages/AccessibilitySettings';

import {
    b,
    scenarios,
    type Lang,
    type Page,
    type Mode,
    type B,
} from './data/scenarios';
import { isCorrectAnswer, isValidAnswer } from './data/answerUtils';

// ============================================
// 01. TRANSLATIONS
// ============================================

const ui = {
    home: b('الرئيسية', 'Home'),
    explore: b('استكشف المواقف', 'Explore scenarios'),
    learn: b('تعلّم', 'Learn'),
    emergency: b('معلومات الطوارئ', 'Emergency info'),
    settings: b('إمكانية الوصول', 'Accessibility'),
    progress: b('إنجازاتي', 'My progress'),
    start: b('ابدأ الآن', 'Get started'),
    next: b('التالي', 'Next'),
    back: b('السابق', 'Back'),
    continue: b('متابعة', 'Continue'),
    safe: b(
        'منصة تعليمية للسلامة والطوارئ',
        'Safety and emergency learning platform'
    ),
};

// ============================================
// 02. SAVED PREFERENCES
// ============================================

const STORAGE_KEY = 'safesteps-v1';

type SavedPreferences = {
    lang?: Lang;
    completed?: string[];
    font?: number;
    contrast?: boolean;
    reduced?: boolean;
    simple?: boolean;
};

function loadPreferences(): SavedPreferences {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed: unknown = saved ? JSON.parse(saved) : {};
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as SavedPreferences : {};
    } catch {
        return {};
    }
}

// ============================================
// 03. REUSABLE BUTTON
// ============================================

type ButtonProps = {
    children: ReactNode;
    onClick: () => void;
    secondary?: boolean;
    disabled?: boolean;
};

function Button({
    children,
    onClick,
    secondary = false,
    disabled = false,
}: ButtonProps) {
    return (
        <button
            type="button"
            className={secondary ? 'btn btn-secondary' : 'btn btn-primary'}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

// ============================================
// 04. MAIN APPLICATION
// ============================================

export default function App() {
    const [saved] = useState(loadPreferences);

    // Language and navigation
    const [lang, setLang] = useState<Lang>(
        saved.lang === 'en' ? 'en' : 'ar'
    );

    const [page, setPage] = useState<Page>('home');
    const [menu, setMenu] = useState(false);

    // Selected scenario and learning
    const [selected, setSelected] = useState('fire');

    const [mode, setMode] = useState<Mode>('visual');
    const [step, setStep] = useState(0);
    const [choice, setChoice] = useState<number | null>(null);

    // Quiz and achievements
    const [quizChoice, setQuizChoice] =
        useState<number | null>(null);

    const [quizDone, setQuizDone] = useState(false);

    const [completed, setCompleted] = useState<string[]>(
        Array.isArray(saved.completed)
            ? saved.completed.filter((id): id is string => typeof id === 'string' && scenarios.some((item) => item.id === id))
            : []
    );

    // Accessibility settings
    const [font, setFont] = useState(
        typeof saved.font === 'number' && Number.isFinite(saved.font)
            ? Math.min(200, Math.max(100, saved.font))
            : 100
    );

    const [contrast, setContrast] = useState(
        saved.contrast === true
    );

    const [reduced, setReduced] = useState(
        saved.reduced === true
    );

    const [simple, setSimple] = useState(
        saved.simple === true
    );

    // Search and speech
    const [search, setSearch] = useState('');
    const [speaking, setSpeaking] = useState(false);
    const speechId = useRef(0);
    const mainRef = useRef<HTMLElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    // ==========================================
    // 05. SHARED VALUES
    // ==========================================

    const isAr = lang === 'ar';

    const t = (value: B) => value[lang];

    const scenario =
        scenarios.find((item) => item.id === selected) ??
        scenarios[0];

    const Icon = scenario.icon;

    const forward = isAr ? (
        <ArrowLeft size={18} />
    ) : (
        <ArrowRight size={18} />
    );

    const backward = isAr ? (
        <ArrowRight size={18} />
    ) : (
        <ArrowLeft size={18} />
    );

    // ==========================================
    // 06. SAVE SETTINGS
    // ==========================================

    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    lang,
                    completed,
                    font,
                    contrast,
                    reduced,
                    simple,
                })
            );
        } catch {
            // Keep the application usable when storage is unavailable.
        }

        document.documentElement.lang = lang;
        document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    }, [
        lang,
        completed,
        font,
        contrast,
        reduced,
        simple,
        isAr,
    ]);

    useEffect(() => {
        document.documentElement.style.fontSize = `${font}%`;
    }, [font]);

    useEffect(() => {
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // ==========================================
    // 07. AUDIO FUNCTIONS
    // ==========================================

    function stopAudio() {
        speechId.current += 1;
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        setSpeaking(false);
    }

    function speak(content: string) {
        stopAudio();
        if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
            alert(t(b('المتصفح لا يدعم القراءة الصوتية.', 'Speech synthesis is not supported.')));
            return;
        }
        const id = speechId.current;
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.lang = isAr ? 'ar-OM' : 'en-US';
        utterance.rate = 0.85;
        utterance.onend = () => { if (speechId.current === id) setSpeaking(false); };
        utterance.onerror = () => { if (speechId.current === id) setSpeaking(false); };
        window.speechSynthesis.speak(utterance);
        setSpeaking(true);
    }

    // Stop any speech when language or learning mode changes.
    useEffect(() => {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        speechId.current += 1;
        setSpeaking(false);
    }, [lang, mode]);

    // ==========================================
    // 08. NAVIGATION
    // ==========================================

    function navigate(next: Page) {
        stopAudio();
        setPage(next);
        setMenu(false);

        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }

    useEffect(() => {
        if (!menu) return;
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setMenu(false);
                menuButtonRef.current?.focus();
            }
        }
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [menu]);

    function openScenario(id: string) {
        setSelected(id);

        setStep(0);
        setChoice(null);
        setQuizChoice(null);
        setQuizDone(false);

        navigate('detail');
    }

    function openLearning() {
        navigate('mode');
    }

    // ==========================================
    // 09. QUIZ RESULTS
    // ==========================================

    function finishQuiz() {
        if (!isValidAnswer(scenario, quizChoice)) return;
        setQuizDone(true);

        if (isCorrectAnswer(scenario, quizChoice)) {
            setCompleted((previous) =>
                previous.includes(selected)
                    ? previous
                    : [...previous, selected]
            );
        }

        navigate('result');
    }

    // ==========================================
    // 10. LEARNING MODES
    // ==========================================

    const modes: {
        id: Mode;
        icon: typeof Image;
        name: B;
        desc: B;
    }[] = [
            {
                id: 'visual',
                icon: Image,
                name: b('التعلم بالصور', 'Visual learning'),
                desc: b(
                    'رسوم وأمثلة واضحة',
                    'Illustrations and examples'
                ),
            },
            {
                id: 'reading',
                icon: BookOpen,
                name: b('التعلم بالقراءة', 'Reading mode'),
                desc: b(
                    'نصوص منظمة وسهلة',
                    'Structured readable text'
                ),
            },
            {
                id: 'audio',
                icon: Headphones,
                name: b('التعلم بالصوت', 'Audio learning'),
                desc: b(
                    'استمع مع عرض النص',
                    'Listen with visible text'
                ),
            },
            {
                id: 'simple',
                icon: Accessibility,
                name: b('الوضع المبسط', 'Simple mode'),
                desc: b(
                    'خطوة واحدة في كل شاشة',
                    'One step at a time'
                ),
            },
        ];

    // ==========================================
    // 11. ACCESSIBILITY RESET
    // ==========================================

    function resetAccessibility() {
        stopAudio();
        setFont(100);
        setContrast(false);
        setReduced(false);
        setSimple(false);
    }

    // ==========================================
    // 12. SHARED PAGE CONTEXT
    // ==========================================

    const ctx = {
        t,
        ui,
        forward,
        backward,
        scenario,
        Icon,
        mode,
        setMode,
        modes,
        step,
        setStep,
        choice,
        setChoice,
        quizChoice,
        setQuizChoice,
        quizDone,
        completed,
        selected,
        lang,
        isAr,
        search,
        setSearch,
        font,
        setFont,
        contrast,
        setContrast,
        reduced,
        setReduced,
        simple,
        setSimple,
        setLang,
        speaking,
        speak,
        stopAudio,
        navigate,
        openScenario,
        finishQuiz,
        resetAccessibility,
        Button,
    };

    // ==========================================
    // 13. MAIN LAYOUT
    // ==========================================

    return (
        <div
            className={[
                contrast ? 'contrast' : '',
                reduced ? 'reduce-motion' : '',
                simple ? 'simplified' : '',
                font >= 125 ? 'large-text' : '',
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <a
                className="skip-link"
                href="#main"
                onClick={(event) => {
                    if (!mainRef.current) return;
                    event.preventDefault();
                    setMenu(false);
                    mainRef.current.focus({ preventScroll: true });
                    mainRef.current.scrollIntoView({ block: 'start' });
                }}
            >
                {t(b('تخطي إلى المحتوى الرئيسي', 'Skip to main content'))}
            </a>

            {/* HEADER */}
            <header className="topbar">
                <div className="container nav">
                    <button
                        type="button"
                        className="brand"
                        onClick={() => navigate('home')}
                        aria-label={t(b('العودة للرئيسية', 'SafeSteps home'))}
                    >
                        <span className="brand-mark">
                            <HeartPulse size={22} />
                        </span>

                        <span>
                            SafeSteps
                            <small>{t(ui.safe)}</small>
                        </span>
                    </button>

                    {/* NAVIGATION */}
                    <nav
                        id="main-navigation"
                        className={menu ? 'navlinks open' : 'navlinks'}
                        aria-label={t(
                            b('التنقل الرئيسي', 'Main navigation')
                        )}
                    >
                        {(
                            [
                                'home',
                                'explore',
                                'learn',
                                'progress',
                                'emergency',
                            ] as const
                        ).map((key) => (
                            <button
                                type="button"
                                key={key}
                                className={
                                    page === key ||
                                        (key === 'learn' &&
                                            ['mode', 'detail', 'learn', 'simulate', 'quiz', 'result'].includes(page))
                                        ? 'active'
                                        : ''
                                }
                                onClick={() => {
                                    if (key === 'learn') {
                                        openLearning();
                                    } else {
                                        navigate(key);
                                    }
                                }}
                            >
                                {t(ui[key])}
                            </button>
                        ))}
                    </nav>

                    {/* HEADER ACTIONS */}
                    <div className="nav-actions">
                        <button
                            type="button"
                            className="pill"
                            onClick={() => {
                                stopAudio();
                                setLang(isAr ? 'en' : 'ar');
                            }}
                            aria-label={t(
                                b('تغيير اللغة', 'Change language')
                            )}
                        >
                            {isAr ? 'EN' : 'العربية'}
                        </button>

                        <button
                            type="button"
                            className="pill access-link"
                            onClick={() => navigate('settings')}
                        >
                            <Accessibility size={18} />
                            <span>{t(ui.settings)}</span>
                        </button>

                        <button
                            type="button"
                            className="icon-btn menu-toggle"
                            ref={menuButtonRef}
                            aria-controls="main-navigation"
                            onClick={() => setMenu(previous => !previous)}
                            aria-label={t(
                                menu
                                    ? b('إغلاق القائمة', 'Close menu')
                                    : b('فتح القائمة', 'Open menu')
                            )}
                            aria-expanded={menu}
                        >
                            <Menu />
                        </button>
                    </div>
                </div>
            </header>

            {/* PAGE CONTENT */}
            <main
                id="main"
                ref={mainRef}
                className="container main"
                tabIndex={-1}
            >
                {page === 'home' && <Home ctx={ctx} />}

                {page === 'explore' && <Explore ctx={ctx} />}

                {page === 'detail' && (
                    <ScenarioDetails ctx={ctx} />
                )}

                {page === 'mode' && (
                    <LearningModes ctx={ctx} />
                )}

                {page === 'learn' && (
                    <LearningSteps ctx={ctx} />
                )}

                {page === 'simulate' && (
                    <Simulation ctx={ctx} />
                )}

                {page === 'quiz' && <Quiz ctx={ctx} />}

                {page === 'result' && (
                    <Results ctx={ctx} />
                )}

                {page === 'progress' && (
                    <Progress ctx={ctx} />
                )}

                {page === 'emergency' && (
                    <Emergency ctx={ctx} />
                )}

                {page === 'settings' && (
                    <AccessibilitySettings ctx={ctx} />
                )}
            </main>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container footer-inner">
                    <span>
                        <ShieldCheck size={18} />
                        SafeSteps © 2026
                    </span>

                    <span>
                        {t(
                            b(
                                'تعلّم بأمان. المواقف هنا لأغراض تعليمية.',
                                'Learn safely. Scenarios are for educational purposes.'
                            )
                        )}
                    </span>

                    <button
                        type="button"
                        onClick={() => navigate('emergency')}
                    >
                        {t(ui.emergency)}
                        {forward}
                    </button>
                </div>
            </footer>
        </div>
    );
}


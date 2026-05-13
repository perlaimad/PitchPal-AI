import { StrictMode, useEffect, useRef, useState, type CSSProperties, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Building2,
  CalendarDays,
  Check,
  ClipboardList,
  Download,
  FileText,
  Gauge,
  GraduationCap,
  Lightbulb,
  LineChart,
  Lock,
  Megaphone,
  Mic,
  Moon,
  Play,
  Rocket,
  School,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  ThumbsDown,
  ThumbsUp,
  Trophy,
  Users
} from "lucide-react";
import "./styles.css";

type Page =
  | "home"
  | "pitch-room"
  | "feedback"
  | "teacher"
  | "competition"
  | "subscriptions"
  | "features"
  | "sdg"
  | "ethics";

type Scores = {
  clarity: number;
  confidence: number;
  innovation: number;
  financial: number;
};

type ThemeMode = "light" | "dark";
type UserRole = "student" | "teacher";
type AuthMode = "login" | "register";

type Notice = {
  title: string;
  message: string;
};

type PitchMedia = {
  url: string;
  name: string;
  type: string;
  source: "recorded" | "attached";
  durationLabel: string;
};

type Account = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  password: string;
  organization: string;
  verified: boolean;
  verificationCode: string;
};

type Investor = {
  id: string;
  name: string;
  initials: string;
  focus: keyof Scores;
  tone: string;
  questions: string[];
};

type Plan = {
  name: string;
  price: string;
  audience: string;
  capacity: string;
  includes: string[];
  bestFor: string;
};

type SdgGoal = {
  code: string;
  number: number;
  title: string;
  fullTitle: string;
  color: string;
  referenceUrl: string;
  briefing: string;
  relatedProjects: string[];
};

const pages: { id: Page; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "pitch-room", label: "Pitch Room" },
  { id: "feedback", label: "Feedback" },
  { id: "teacher", label: "Teacher" },
  { id: "competition", label: "Compete" },
  { id: "subscriptions", label: "Subscriptions" },
  { id: "sdg", label: "SDG Briefing" }
];

const investors: Investor[] = [
  {
    id: "finance",
    name: "Finance AI",
    initials: "FI",
    focus: "financial",
    tone: "Unit economics and realistic numbers",
    questions: [
      "What is your expected cost per unit, and how does it improve at a larger production volume?",
      "How much money would you need to test this idea with your first 100 customers?",
      "What price would a school or parent realistically pay for this?"
    ]
  },
  {
    id: "sustainability",
    name: "Sustainability AI",
    initials: "SI",
    focus: "innovation",
    tone: "Impact, responsibility, and SDG alignment",
    questions: [
      "How does your idea reduce waste, improve access, or create a positive community impact?",
      "What materials or partners would help you keep this solution responsible?",
      "Which SDG does your idea support most clearly, and why?"
    ]
  },
  {
    id: "marketing",
    name: "Marketing AI",
    initials: "MI",
    focus: "clarity",
    tone: "Audience, story, and persuasive messaging",
    questions: [
      "Who is your first target customer, and what problem do they feel most strongly?",
      "What one sentence would make someone remember your product tomorrow?",
      "Where would you reach your first users without spending much money?"
    ]
  },
  {
    id: "innovation",
    name: "Innovation AI",
    initials: "II",
    focus: "confidence",
    tone: "Originality, prototypes, and next experiments",
    questions: [
      "What makes your idea different from what already exists?",
      "What is the simplest prototype you could build this week?",
      "What risky assumption do you need to test first?"
    ]
  }
];

const students = [
  {
    name: "Karim A.",
    grade: "Grade 8",
    idea: "SolarBag",
    sessions: 5,
    score: 89,
    growth: 12,
    status: "Ready for finals",
    sdgs: ["SDG 7", "SDG 9"],
    primarySdg: "SDG 9",
    impact: "Solar-powered school backpack that introduces practical clean-tech prototyping."
  },
  {
    name: "Maya R.",
    grade: "Grade 8",
    idea: "EcoBottle",
    sessions: 8,
    score: 81,
    growth: 8,
    status: "Strong progress",
    sdgs: ["SDG 4", "SDG 12"],
    primarySdg: "SDG 4",
    impact: "Reusable bottle program for schools that teaches sustainable habits through student-led campaigns."
  },
  {
    name: "Sara P.",
    grade: "Grade 8",
    idea: "CoolKit",
    sessions: 4,
    score: 77,
    growth: 5,
    status: "Needs finance detail",
    sdgs: ["SDG 8", "SDG 9"],
    primarySdg: "SDG 8",
    impact: "Low-cost starter kit for student mini-businesses and summer camp entrepreneurship projects."
  },
  {
    name: "Lana N.",
    grade: "Grade 8",
    idea: "FoodMap",
    sessions: 6,
    score: 63,
    growth: -3,
    status: "Coach confidence",
    sdgs: ["SDG 2", "SDG 10"],
    primarySdg: "SDG 10",
    impact: "Community food access map that helps families find affordable meals and donation points."
  },
  {
    name: "Omar H.",
    grade: "Grade 7",
    idea: "TutorLoop",
    sessions: 3,
    score: 72,
    growth: 9,
    status: "Clarify market",
    sdgs: ["SDG 4", "SDG 10"],
    primarySdg: "SDG 4",
    impact: "Peer tutoring marketplace that connects older students with younger students who need homework help."
  },
  {
    name: "Nour K.",
    grade: "Grade 8",
    idea: "SkillSprint",
    sessions: 4,
    score: 75,
    growth: 11,
    status: "Prototype next",
    sdgs: ["SDG 8", "SDG 4"],
    primarySdg: "SDG 8",
    impact: "Short entrepreneurship challenges that help students practice budgeting, selling, and teamwork."
  }
];

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$299 / year",
    audience: "Single entrepreneurship class",
    capacity: "1 classroom, 30 students",
    includes: ["AI investor sessions", "Real-time pitch scoring", "Basic student analytics", "Age-appropriate feedback"],
    bestFor: "Teachers piloting PitchPal AI for one class."
  },
  {
    name: "Pro",
    price: "$799 / year",
    audience: "Schools and innovation clubs",
    capacity: "5 classrooms, 150 students",
    includes: ["Everything in Starter", "Competition mode and leaderboards", "Full analytics dashboard", "Audience voting", "Exportable reports"],
    bestFor: "The full school-ready package for competitions and progress tracking."
  },
  {
    name: "Enterprise",
    price: "Custom",
    audience: "Districts and academies",
    capacity: "Unlimited classrooms and students",
    includes: ["Everything in Pro", "LMS integration planning", "Custom branding", "National competition support", "Dedicated onboarding"],
    bestFor: "Organizations running entrepreneurship programs at scale."
  }
];

const baseScores: Scores = {
  clarity: 68,
  confidence: 61,
  innovation: 74,
  financial: 54
};

const aiPoweredModules = [
  {
    title: "AI Pitch Coach",
    label: "Student module",
    copy: "Turns each student response into age-appropriate coaching with strengths, improvements, and a next practice move.",
    icon: Brain,
    target: "pitch-room" as Page
  },
  {
    title: "AI Investor Panel",
    label: "Simulation module",
    copy: "Finance, sustainability, marketing, and innovation agents ask themed questions that feel like a classroom pitch room.",
    icon: Users,
    target: "pitch-room" as Page
  },
  {
    title: "AI Rubric Scoring",
    label: "Feedback module",
    copy: "Maps answers into clarity, confidence, innovation, and financial reasoning so feedback stays structured and visible.",
    icon: Gauge,
    target: "feedback" as Page
  },
  {
    title: "AI Teacher Insights",
    label: "Analytics module",
    copy: "Summarizes class progress, flags coaching needs, and recommends what the teacher should run next.",
    icon: School,
    target: "teacher" as Page
  },
  {
    title: "AI Competition Judge",
    label: "Event module",
    copy: "Supports pitch-day rankings, simulated investor reactions, and consistent judging notes during competitions.",
    icon: Trophy,
    target: "competition" as Page
  },
  {
    title: "AI SDG Mapper",
    label: "Impact module",
    copy: "Connects student ideas to sustainable development goals and prepares discussion prompts for impact reflection.",
    icon: Target,
    target: "sdg" as Page
  }
];

const teacherInsights = [
  "AI-powered class summary: most teams are strong on creativity, while financial reasoning is the most common coaching gap.",
  "AI-powered next lesson: run a 20-minute unit economics sprint before the next pitch round.",
  "AI-powered intervention: Lana N. needs confidence practice, while Sara P. needs pricing evidence."
];

const learningPath = [
  {
    title: "Idea clarity",
    focus: "Explain the problem, customer, and solution in one clear opening.",
    metric: "Clarity"
  },
  {
    title: "Customer evidence",
    focus: "Show who needs the solution and how you will test demand.",
    metric: "Confidence"
  },
  {
    title: "Prototype plan",
    focus: "Describe the simplest version you can build or demonstrate.",
    metric: "Innovation"
  },
  {
    title: "Pricing story",
    focus: "Add cost, price, revenue, or pilot budget details.",
    metric: "Financial"
  },
  {
    title: "Impact alignment",
    focus: "Connect the idea to an SDG or responsible community outcome.",
    metric: "SDG"
  }
];

const sessionModes = [
  {
    title: "Idea sprint",
    duration: "25 min",
    goal: "Students sharpen the customer problem and one-sentence value proposition.",
    activity: "Pair review, then one AI investor question per team.",
    next: "Send students to Pitch Room with Marketing AI selected."
  },
  {
    title: "Finance clinic",
    duration: "30 min",
    goal: "Students add cost, price, and pilot budget evidence.",
    activity: "Mini lesson on unit economics, then revise the financial paragraph.",
    next: "Export a finance-focused progress report."
  },
  {
    title: "SDG impact review",
    duration: "20 min",
    goal: "Students connect ideas to measurable community impact.",
    activity: "Use the SDG briefing, choose a primary goal, and defend the link.",
    next: "Open the SDG briefing and tag projects."
  },
  {
    title: "Competition day",
    duration: "45 min",
    goal: "Run a structured pitch event with judging and audience voting.",
    activity: "Lock pitch order, present, score, vote, and reflect.",
    next: "Launch the live competition room."
  }
];

const sdgGoals: SdgGoal[] = [
  {
    code: "SDG 1",
    number: 1,
    title: "No Poverty",
    fullTitle: "End poverty in all its forms everywhere",
    color: "#e5243b",
    referenceUrl: "https://www.un.org/sustainabledevelopment/poverty/",
    briefing: "Projects can address affordability, inclusive access, family income, or services that reduce barriers for low-income communities.",
    relatedProjects: ["Affordable student services marketplace", "Community micro-savings challenge", "Low-cost school supply exchange"]
  },
  {
    code: "SDG 2",
    number: 2,
    title: "Zero Hunger",
    fullTitle: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture",
    color: "#dda63a",
    referenceUrl: "https://www.un.org/sustainabledevelopment/hunger/",
    briefing: "Projects can improve access to meals, reduce food waste, support food donation, or teach responsible agriculture.",
    relatedProjects: ["FoodMap donation finder", "Cafeteria waste tracker", "School garden subscription kit"]
  },
  {
    code: "SDG 3",
    number: 3,
    title: "Good Health and Well-Being",
    fullTitle: "Ensure healthy lives and promote well-being for all at all ages",
    color: "#4c9f38",
    referenceUrl: "https://www.un.org/sustainabledevelopment/health/",
    briefing: "Projects can support mental health, physical wellness, safer habits, or access to reliable health information.",
    relatedProjects: ["Student wellness check-in app", "Healthy snack campaign", "Sports habit tracker"]
  },
  {
    code: "SDG 4",
    number: 4,
    title: "Quality Education",
    fullTitle: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all",
    color: "#c5192d",
    referenceUrl: "https://www.un.org/sustainabledevelopment/education/",
    briefing: "Projects can improve learning access, peer tutoring, skill practice, or classroom engagement.",
    relatedProjects: ["TutorLoop peer tutoring", "SkillSprint entrepreneurship challenges", "EcoBottle school habit program"]
  },
  {
    code: "SDG 5",
    number: 5,
    title: "Gender Equality",
    fullTitle: "Achieve gender equality and empower all women and girls",
    color: "#ff3a21",
    referenceUrl: "https://www.un.org/sustainabledevelopment/gender-equality/",
    briefing: "Projects can promote equal participation, representation, safety, mentorship, and access to leadership opportunities.",
    relatedProjects: ["Girls in innovation mentor board", "Equal speaking time pitch tracker", "Inclusive club leadership toolkit"]
  },
  {
    code: "SDG 6",
    number: 6,
    title: "Clean Water and Sanitation",
    fullTitle: "Ensure availability and sustainable management of water and sanitation for all",
    color: "#26bde2",
    referenceUrl: "https://www.un.org/sustainabledevelopment/water-and-sanitation/",
    briefing: "Projects can focus on clean water habits, reusable bottles, sanitation awareness, or water-saving school systems.",
    relatedProjects: ["EcoBottle refill program", "Water station usage tracker", "Handwashing reminder campaign"]
  },
  {
    code: "SDG 7",
    number: 7,
    title: "Affordable and Clean Energy",
    fullTitle: "Ensure access to affordable, reliable, sustainable and modern energy for all",
    color: "#fcc30b",
    referenceUrl: "https://www.un.org/sustainabledevelopment/energy/",
    briefing: "Projects can explore clean energy, energy access, solar prototypes, and efficient devices for school communities.",
    relatedProjects: ["SolarBag charging prototype", "Classroom energy audit", "Low-cost solar study lamp"]
  },
  {
    code: "SDG 8",
    number: 8,
    title: "Decent Work and Economic Growth",
    fullTitle: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all",
    color: "#a21942",
    referenceUrl: "https://www.un.org/sustainabledevelopment/economic-growth/",
    briefing: "Projects can build entrepreneurship, employability, responsible business models, and student-led economic skills.",
    relatedProjects: ["CoolKit mini-business starter kit", "SkillSprint finance sprint", "Student marketplace pilot"]
  },
  {
    code: "SDG 9",
    number: 9,
    title: "Industry, Innovation and Infrastructure",
    fullTitle: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation",
    color: "#fd6925",
    referenceUrl: "https://www.un.org/sustainabledevelopment/infrastructure-industrialization/",
    briefing: "Projects can involve prototypes, systems, infrastructure, production planning, and technology-enabled innovation.",
    relatedProjects: ["SolarBag clean-tech prototype", "CoolKit manufacturing plan", "Maker-lab booking system"]
  },
  {
    code: "SDG 10",
    number: 10,
    title: "Reduced Inequalities",
    fullTitle: "Reduce inequality within and among countries",
    color: "#dd1367",
    referenceUrl: "https://www.un.org/sustainabledevelopment/inequality/",
    briefing: "Projects can improve access, inclusion, affordability, language support, disability support, or community equity.",
    relatedProjects: ["FoodMap access finder", "TutorLoop scholarship seats", "Accessible pitch practice mode"]
  },
  {
    code: "SDG 11",
    number: 11,
    title: "Sustainable Cities and Communities",
    fullTitle: "Make cities and human settlements inclusive, safe, resilient and sustainable",
    color: "#fd9d24",
    referenceUrl: "https://www.un.org/sustainabledevelopment/cities/",
    briefing: "Projects can support safer school routes, community mapping, recycling systems, and resilient local services.",
    relatedProjects: ["Safe walk-to-school map", "Community repair directory", "Neighborhood recycling points"]
  },
  {
    code: "SDG 12",
    number: 12,
    title: "Responsible Consumption and Production",
    fullTitle: "Ensure sustainable consumption and production patterns",
    color: "#bf8b2e",
    referenceUrl: "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/",
    briefing: "Projects can reduce waste, reuse materials, track consumption, or design more responsible school purchasing habits.",
    relatedProjects: ["EcoBottle reusable bottle program", "Uniform swap marketplace", "Lunch packaging reduction challenge"]
  },
  {
    code: "SDG 13",
    number: 13,
    title: "Climate Action",
    fullTitle: "Take urgent action to combat climate change and its impacts",
    color: "#3f7e44",
    referenceUrl: "https://www.un.org/sustainabledevelopment/climate-change/",
    briefing: "Projects can reduce emissions, educate peers, track climate habits, or prototype adaptation ideas.",
    relatedProjects: ["Class carbon challenge", "SolarBag clean-energy pitch", "Heat-safe playground idea"]
  },
  {
    code: "SDG 14",
    number: 14,
    title: "Life Below Water",
    fullTitle: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development",
    color: "#0a97d9",
    referenceUrl: "https://www.un.org/sustainabledevelopment/oceans/",
    briefing: "Projects can reduce plastic pollution, protect waterways, and educate communities about marine ecosystems.",
    relatedProjects: ["Plastic bottle reduction campaign", "Drain-to-sea awareness map", "Reusable event cup pilot"]
  },
  {
    code: "SDG 15",
    number: 15,
    title: "Life on Land",
    fullTitle: "Protect, restore and promote sustainable use of terrestrial ecosystems",
    color: "#56c02b",
    referenceUrl: "https://www.un.org/sustainabledevelopment/biodiversity/",
    briefing: "Projects can support biodiversity, tree planting, soil health, responsible materials, and habitat protection.",
    relatedProjects: ["School biodiversity corner", "Compost-and-garden kit", "Paper use reduction tracker"]
  },
  {
    code: "SDG 16",
    number: 16,
    title: "Peace, Justice and Strong Institutions",
    fullTitle: "Promote peaceful and inclusive societies for sustainable development",
    color: "#00689d",
    referenceUrl: "https://www.un.org/sustainabledevelopment/peace-justice/",
    briefing: "Projects can strengthen fairness, safety, participation, civic voice, and trustworthy student decision-making.",
    relatedProjects: ["Student council feedback tool", "Anonymous safety reporting prototype", "Fair voting competition dashboard"]
  },
  {
    code: "SDG 17",
    number: 17,
    title: "Partnerships for the Goals",
    fullTitle: "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development",
    color: "#19486a",
    referenceUrl: "https://www.un.org/sustainabledevelopment/globalpartnerships/",
    briefing: "Projects can connect schools, NGOs, local businesses, families, and mentors to help student ideas move from pitch to pilot.",
    relatedProjects: ["Local mentor network", "School-NGO pitch showcase", "Business partner pilot program"]
  }
];

const accountsStorageKey = "pitchpal-accounts";
const currentUserStorageKey = "pitchpal-current-user";

function loadAccounts(): Account[] {
  try {
    const stored = localStorage.getItem(accountsStorageKey);
    return stored ? JSON.parse(stored) as Account[] : [];
  } catch {
    return [];
  }
}

function getInitialPage(): Page {
  const hash = window.location.hash.replace("#", "");
  return pages.some((page) => page.id === hash) || ["features", "sdg", "ethics"].includes(hash) ? (hash as Page) : "home";
}

function clampScore(value: number) {
  return Math.max(38, Math.min(97, Math.round(value)));
}

function scoreAnswer(answer: string, investor: Investor, round: number): Scores {
  const words = answer.trim().split(/\s+/).filter(Boolean);
  const hasNumbers = /\d|%|\$/.test(answer);
  const hasCustomer = /customer|student|school|parent|user|teacher|market/i.test(answer);
  const hasImpact = /sustain|waste|access|community|sdg|impact|recycle/i.test(answer);
  const lengthBoost = Math.min(18, Math.floor(words.length / 5));
  const next = { ...baseScores };

  next.clarity += lengthBoost + (hasCustomer ? 10 : 0);
  next.confidence += Math.min(14, Math.floor(words.length / 8)) + round * 2;
  next.innovation += (hasImpact ? 8 : 0) + (/prototype|different|new|unique/i.test(answer) ? 7 : 0);
  next.financial += (hasNumbers ? 18 : 0) + (/cost|price|revenue|profit|unit/i.test(answer) ? 10 : 0);
  next[investor.focus] += 8;

  return {
    clarity: clampScore(next.clarity),
    confidence: clampScore(next.confidence),
    innovation: clampScore(next.innovation),
    financial: clampScore(next.financial)
  };
}

function averageScore(scores: Scores) {
  return Math.round((scores.clarity + scores.confidence + scores.innovation + scores.financial) / 4);
}

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function App() {
  const [page, setPageState] = useState<Page>(getInitialPage);
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem("pitchpal-theme");
    return stored === "dark" ? "dark" : "light";
  });
  const [accounts, setAccounts] = useState<Account[]>(loadAccounts);
  const [currentUserId, setCurrentUserId] = useState(() => localStorage.getItem(currentUserStorageKey) ?? "");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [idea, setIdea] = useState("EcoBottle - sustainable water bottle for schools");
  const [answer, setAnswer] = useState("Our cost per bottle is currently $4.20 at low volume, but we estimate it drops to $2.80 when we make 10,000 units because of bulk material discounts.");
  const [activeInvestor, setActiveInvestor] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Scores>(baseScores);
  const [feedback, setFeedback] = useState([
    "Strong problem framing for a school audience.",
    "Add one more number to make the financial story sharper.",
    "Next, explain how you will test demand with a small pilot."
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [pitchMedia, setPitchMedia] = useState<PitchMedia | null>(null);
  const [votes, setVotes] = useState({ invest: 68, pass: 32 });
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingChunksRef = useRef<BlobPart[]>([]);
  const recordingStreamRef = useRef<MediaStream | null>(null);
  const recordingTimerRef = useRef<number | null>(null);
  const recordingSecondsRef = useRef(0);

  const investor = investors[activeInvestor];
  const question = investor.questions[questionIndex];
  const overall = averageScore(scores);
  const currentUser = accounts.find((account) => account.id === currentUserId && account.verified) ?? null;
  const role: UserRole = currentUser?.role ?? "student";

  useEffect(() => {
    const onHashChange = () => {
      const nextPage = getInitialPage();
      if (isTeacherPage(nextPage) && currentUser?.role !== "teacher") {
        openAuth("login");
        showNotice("School/Teacher account required", "Log in with a verified school-teacher account to open this page.");
        window.location.hash = "pitch-room";
        setPageState("pitch-room");
        return;
      }
      setPageState(nextPage);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [currentUser]);

  useEffect(() => {
    const shouldUseDark = themeMode === "dark";
    document.documentElement.classList.toggle("dark", shouldUseDark);
    document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
    localStorage.setItem("pitchpal-theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem(accountsStorageKey, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (currentUserId) localStorage.setItem(currentUserStorageKey, currentUserId);
    else localStorage.removeItem(currentUserStorageKey);
  }, [currentUserId]);

  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) window.clearInterval(recordingTimerRef.current);
      recordingStreamRef.current?.getTracks().forEach((track) => track.stop());
      if (pitchMedia?.url) URL.revokeObjectURL(pitchMedia.url);
    };
  }, [pitchMedia]);

  function setPage(nextPage: Page) {
    if (isTeacherPage(nextPage) && currentUser?.role !== "teacher") {
      openAuth("login");
      showNotice("School/Teacher account required", "Log in with a verified school-teacher account to open classroom analytics, competitions, and reporting tools.");
      window.location.hash = "pitch-room";
      setPageState("pitch-room");
      return;
    }
    window.location.hash = nextPage;
    setPageState(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    if (isTeacherPage(page) && currentUser?.role !== "teacher") {
      setPage("pitch-room");
    }
  }, [currentUser]);

  function showNotice(title: string, message: string) {
    setNotice({ title, message });
  }

  function openAuth(mode: AuthMode = "login") {
    setAuthMode(mode);
    setIsAuthOpen(true);
  }

  function createAccount(input: Omit<Account, "id" | "verified" | "verificationCode">) {
    if (accounts.some((account) => account.email.toLowerCase() === input.email.toLowerCase())) {
      showNotice("Account already exists", "Use login instead, or register with a different email.");
      return null;
    }

    const verificationCode = String(Math.floor(100000 + Math.random() * 900000));
    const account: Account = {
      ...input,
      id: crypto.randomUUID(),
      verified: false,
      verificationCode
    };
    setAccounts((current) => [...current, account]);
    showNotice("Verification code generated", `Prototype code for ${input.email}: ${verificationCode}`);
    return account;
  }

  function verifyAccount(email: string, code: string) {
    const account = accounts.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!account) {
      showNotice("No account found", "Register first, then enter the verification code.");
      return false;
    }
    if (account.verificationCode !== code.trim()) {
      showNotice("Incorrect verification code", "Use the latest six-digit code shown after registration.");
      return false;
    }
    setAccounts((current) => current.map((item) => item.id === account.id ? { ...item, verified: true } : item));
    setCurrentUserId(account.id);
    setIsAuthOpen(false);
    showNotice("Account verified", `${account.role === "teacher" ? "School/Teacher" : "Student"} account is now active.`);
    return true;
  }

  function login(email: string, password: string) {
    const account = accounts.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
    if (!account) {
      showNotice("Login failed", "Check the email and password, or register a new account.");
      return;
    }
    if (!account.verified) {
      showNotice("Verification required", `Enter this prototype code to verify: ${account.verificationCode}`);
      setAuthMode("register");
      return;
    }
    setCurrentUserId(account.id);
    setIsAuthOpen(false);
    showNotice("Logged in", `Welcome back, ${account.name}.`);
  }

  function logout() {
    setCurrentUserId("");
    if (isTeacherPage(page)) setPage("pitch-room");
    showNotice("Logged out", "You are now browsing as a guest student.");
  }

  function submitAnswer() {
    const scoringAnswer = answer.trim() || (pitchMedia ? `Recorded pitch attached for ${idea}. The student explains the customer, prototype, pricing, and market test in a spoken pitch.` : "");
    if (!scoringAnswer.trim()) {
      showNotice("Pitch needed", "Type a response, record an immediate pitch, or attach a previously recorded pitch before submitting.");
      return;
    }
    const nextScores = scoreAnswer(scoringAnswer, investor, questionIndex + 1);
    setScores(nextScores);
    setFeedback([
      pitchMedia ? `${pitchMedia.source === "recorded" ? "Immediate" : "Attached"} pitch received: ${pitchMedia.name}. Your pitch is ready for review.` : nextScores.clarity > 78 ? "Your explanation is easy to follow and has a clear customer." : "Make the customer and problem easier to identify in the first sentence.",
      nextScores.financial > 72 ? "Your numbers make the answer feel realistic." : "Include cost, price, or target revenue to strengthen investor confidence.",
      "Try answering the next investor in 30 seconds with one example and one measurable goal."
    ]);
    setActiveInvestor((activeInvestor + 1) % investors.length);
    setQuestionIndex((questionIndex + 1) % 3);
    showNotice("Pitch submitted", pitchMedia ? "Your media pitch was submitted to the AI feedback dashboard." : "Your written response was submitted to the AI feedback dashboard.");
    setPage("feedback");
  }

  async function toggleRecording() {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      showNotice("Recording unavailable", "Your browser does not support in-page recording. Attach a previously recorded pitch instead.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recordingChunksRef.current = [];
      recordingSecondsRef.current = 0;
      recordingStreamRef.current = stream;
      mediaRecorderRef.current = recorder;
      setRecordingSeconds(0);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordingChunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(recordingChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        const url = URL.createObjectURL(blob);
        if (pitchMedia?.url) URL.revokeObjectURL(pitchMedia.url);
        setPitchMedia({
          url,
          name: `Immediate pitch ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
          type: blob.type,
          source: "recorded",
          durationLabel: formatDuration(recordingSecondsRef.current)
        });
        setAnswer((current) => current.trim() || "Immediate recorded pitch attached. Please review the spoken pitch for clarity, confidence, innovation, and financial understanding.");
        setIsRecording(false);
        if (recordingTimerRef.current) window.clearInterval(recordingTimerRef.current);
        stream.getTracks().forEach((track) => track.stop());
        showNotice("Recording saved", "Your immediate pitch recording is attached and ready to submit.");
      };

      recorder.start();
      setIsRecording(true);
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingSeconds((value) => {
          const next = value + 1;
          recordingSecondsRef.current = next;
          return next;
        });
      }, 1000);
      showNotice("Recording started", "Speak your pitch now. Press Stop recording when finished.");
    } catch {
      showNotice("Microphone access blocked", "Allow microphone access or attach a previously recorded pitch file.");
    }
  }

  function attachPitch(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("audio/") && !file.type.startsWith("video/")) {
      showNotice("Unsupported file", "Attach an audio or video file for a previously recorded pitch.");
      event.target.value = "";
      return;
    }
    if (pitchMedia?.url) URL.revokeObjectURL(pitchMedia.url);
    setPitchMedia({
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      source: "attached",
      durationLabel: `${(file.size / 1024 / 1024).toFixed(1)} MB`
    });
    setAnswer((current) => current.trim() || "Previously recorded pitch attached. Please review the uploaded media for clarity, confidence, innovation, and financial understanding.");
    showNotice("Pitch attached", `${file.name} is attached and ready to submit.`);
    event.target.value = "";
  }

  function removePitchMedia() {
    if (pitchMedia?.url) URL.revokeObjectURL(pitchMedia.url);
    setPitchMedia(null);
    showNotice("Pitch removed", "The attached recording was removed from this pitch session.");
  }

  function vote(kind: "invest" | "pass") {
    if (!currentUser) {
      openAuth("login");
      showNotice("Login required", "Log in with a verified student account to cast an audience vote.");
      return;
    }
    if (currentUser.role !== "student") {
      showNotice("Student account required", "Audience voting is available to verified student accounts.");
      return;
    }
    setVotes((current) => {
      const invest = kind === "invest" ? Math.min(92, current.invest + 3) : Math.max(10, current.invest - 3);
      return { invest, pass: 100 - invest };
    });
    showNotice("Vote recorded", kind === "invest" ? "Your audience vote was counted as an invest decision." : "Your audience vote was counted as not ready yet.");
  }

  return (
    <>
      <Header
        currentPage={page}
        setPage={setPage}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        currentUser={currentUser}
        openAuth={openAuth}
        logout={logout}
      />
      <main>
        {page === "home" && <HomePage setPage={setPage} scores={scores} overall={overall} />}
        {page === "pitch-room" && (
          <PitchRoomPage
            idea={idea}
            setIdea={setIdea}
            answer={answer}
            setAnswer={setAnswer}
            investor={investor}
            question={question}
            activeInvestor={activeInvestor}
            questionIndex={questionIndex}
            scores={scores}
            overall={overall}
            isRecording={isRecording}
            recordingSeconds={recordingSeconds}
            pitchMedia={pitchMedia}
            onRecord={toggleRecording}
            onAttachPitch={attachPitch}
            onRemovePitchMedia={removePitchMedia}
            onSubmit={submitAnswer}
          />
        )}
        {page === "feedback" && <FeedbackPage scores={scores} feedback={feedback} overall={overall} setPage={setPage} />}
        {page === "teacher" && <TeacherPage setPage={setPage} showNotice={showNotice} />}
        {page === "competition" && <CompetitionPage votes={votes} onVote={vote} role={role} showNotice={showNotice} />}
        {page === "subscriptions" && <SubscriptionsPage setPage={setPage} showNotice={showNotice} />}
        {page === "features" && <FeaturesPage setPage={setPage} />}
        {page === "sdg" && <SdgPage />}
        {page === "ethics" && <EthicsPage />}
      </main>
      <Footer setPage={setPage} />
      {isAuthOpen && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setIsAuthOpen(false)}
          createAccount={createAccount}
          verifyAccount={verifyAccount}
          login={login}
          logout={logout}
          currentUser={currentUser}
        />
      )}
      {notice && <Toast notice={notice} onClose={() => setNotice(null)} />}
    </>
  );
}

function isTeacherPage(page: Page) {
  return page === "teacher";
}

function Header({
  currentPage,
  setPage,
  themeMode,
  setThemeMode,
  currentUser,
  openAuth,
  logout
}: {
  currentPage: Page;
  setPage: (page: Page) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  currentUser: Account | null;
  openAuth: (mode?: AuthMode) => void;
  logout: () => void;
}) {
  return (
    <header className="nav">
      <button className="brand brandButton" onClick={() => setPage("home")} aria-label="PitchPal AI home">
        <span className="brandIcon"><Mic size={18} /></span>
        <span>PitchPal AI</span>
      </button>
      <nav aria-label="Main navigation">
        {pages.filter((item) => item.id !== "teacher").map((item) => (
          <button key={item.id} className={currentPage === item.id ? "activeLink" : ""} onClick={() => setPage(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="headerActions">
        {currentUser?.role === "teacher" && (
          <div className="teacherTools" aria-label="Teacher-only tools">
            <button className={currentPage === "teacher" ? "active" : ""} onClick={() => setPage("teacher")}>
              <School size={15} /> Teacher
            </button>
            <button className={currentPage === "competition" ? "active" : ""} onClick={() => setPage("competition")}>
              <Trophy size={15} /> Live event
            </button>
          </div>
        )}
        <ThemeToggle themeMode={themeMode} setThemeMode={setThemeMode} />
        <AccountMenu currentUser={currentUser} openAuth={openAuth} />
        <button className="button small primary" onClick={() => setPage("pitch-room")}>Start Pitch</button>
      </div>
    </header>
  );
}

function ThemeToggle({ themeMode, setThemeMode }: { themeMode: ThemeMode; setThemeMode: (mode: ThemeMode) => void }) {
  return (
    <button
      className={`themeSwitch ${themeMode === "dark" ? "active" : ""}`}
      type="button"
      aria-label={themeMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
    >
      <span className="themeSwitchThumb">
        {themeMode === "dark" ? <Moon size={15} /> : <Sun size={15} />}
      </span>
      <span className="themeSwitchLabel">{themeMode === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}

function AccountMenu({
  currentUser,
  openAuth
}: {
  currentUser: Account | null;
  openAuth: (mode?: AuthMode) => void;
}) {
  if (currentUser) {
    return (
      <button className="accountDashboardButton" onClick={() => openAuth("login")}>
        <span>{currentUser.role === "teacher" ? "School/Teacher" : "Student"}</span>
        <strong>{currentUser.name}</strong>
      </button>
    );
  }

  return (
    <button className="button small secondary accountCta" onClick={() => openAuth("register")}>Get Started</button>
  );
}

function AuthModal({
  mode,
  setMode,
  onClose,
  createAccount,
  verifyAccount,
  login,
  logout,
  currentUser
}: {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
  onClose: () => void;
  createAccount: (input: Omit<Account, "id" | "verified" | "verificationCode">) => Account | null;
  verifyAccount: (email: string, code: string) => boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  currentUser: Account | null;
}) {
  const [role, setRole] = useState<UserRole>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [formError, setFormError] = useState("");

  function submitRegister(event: FormEvent) {
    event.preventDefault();
    const requiredCode = role === "teacher" ? "SCHOOL-TEACHER" : "CLASS-STUDENT";
    if (accessCode.trim().toUpperCase() !== requiredCode) {
      setFormError(`Use prototype access code ${requiredCode} for this account type.`);
      return;
    }
    const account = createAccount({ role, name, email, password, organization });
    if (account) {
      setFormError("");
      setPendingEmail(account.email);
      setVerificationCode("");
    }
  }

  function submitVerification(event: FormEvent) {
    event.preventDefault();
    verifyAccount(pendingEmail || email, verificationCode);
  }

  function submitLogin(event: FormEvent) {
    event.preventDefault();
    login(email, password);
  }

  const requiredCode = role === "teacher" ? "SCHOOL-TEACHER" : "CLASS-STUDENT";

  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <section className="authModal">
        <div className="authHeader">
          <div>
            <span className="eyebrow">Account access</span>
            <h2 id="auth-title">{currentUser ? "User dashboard" : "Get started with PitchPal AI"}</h2>
          </div>
          <button onClick={onClose} aria-label="Close account dialog">Close</button>
        </div>
        {currentUser ? (
          <div className="userDashboard">
            <div>
              <span className="eyebrow">Signed in as</span>
              <h3>{currentUser.name}</h3>
              <p>{currentUser.email}</p>
            </div>
            <div className="userDashboardGrid">
              <div><span>Account type</span><strong>{currentUser.role === "teacher" ? "School/Teacher" : "Student"}</strong></div>
              <div><span>Organization</span><strong>{currentUser.organization}</strong></div>
              <div><span>Verification</span><strong>Verified</strong></div>
            </div>
            <button className="button secondary" onClick={logout}>Log out</button>
          </div>
        ) : (
          <>
          <div className="authTabs">
            <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Login</button>
            <button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>Register</button>
          </div>
          {mode === "login" ? (
          <form className="authForm" onSubmit={submitLogin}>
            <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required /></label>
            <label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required /></label>
            <button className="button primary" type="submit">Log in</button>
          </form>
          ) : (
          <div className="authForm">
            <form className="authForm" onSubmit={submitRegister}>
              <div className="roleChoice">
                <button type="button" className={role === "student" ? "active" : ""} onClick={() => setRole("student")}>Student</button>
                <button type="button" className={role === "teacher" ? "active" : ""} onClick={() => setRole("teacher")}>School/Teacher</button>
              </div>
              <label>Full name<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
              <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required /></label>
              <label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" minLength={6} required /></label>
              <label>{role === "teacher" ? "School name" : "Class or school"}<input value={organization} onChange={(event) => setOrganization(event.target.value)} required /></label>
              <label>
                {role === "teacher" ? "School teacher access code" : "Student class access code"}
                <input value={accessCode} onChange={(event) => setAccessCode(event.target.value)} placeholder={requiredCode} required />
              </label>
              <p className="authHint">Prototype access code: <strong>{requiredCode}</strong></p>
              {formError && <p className="formError">{formError}</p>}
              <button className="button primary" type="submit">Create account</button>
            </form>

            <form className="authForm verifyBox" onSubmit={submitVerification}>
              <span className="eyebrow">Verification</span>
              <p>After creating an account, enter the six-digit verification code shown in the notification.</p>
              <label>Verification email<input value={pendingEmail || email} onChange={(event) => setPendingEmail(event.target.value)} type="email" required /></label>
              <label>Verification code<input value={verificationCode} onChange={(event) => setVerificationCode(event.target.value)} inputMode="numeric" required /></label>
              <button className="button secondary" type="submit">Verify account</button>
            </form>
          </div>
          )}
          </>
        )}
      </section>
    </div>
  );
}

function HomePage({ setPage, scores, overall }: { setPage: (page: Page) => void; scores: Scores; overall: number }) {
  return (
    <>
      <section className="hero pageHero">
        <div className="heroText">
          <div className="eyebrow">AI entrepreneurship coaching for schools</div>
          <h1>PitchPal AI</h1>
          <p>Students practice startup pitches with AI investors, answer realistic questions, receive live scores, and build confidence before classroom competitions.</p>
          <div className="heroActions">
            <button className="button primary" onClick={() => setPage("pitch-room")}><Rocket size={18} /> Start my pitch</button>
            <button className="button secondary" onClick={() => setPage("features")}><Play size={18} /> Explore platform</button>
          </div>
          <div className="stats">
            <span><strong>4</strong> investor personas</span>
            <span><strong>{overall}</strong> live score</span>
            <span><strong>SDG</strong> aligned</span>
          </div>
        </div>
        <SessionPreview scores={scores} />
      </section>
      <AiModuleShowcase setPage={setPage} />
      <HowItWorks setPage={setPage} />
      <FeatureSnapshot setPage={setPage} />
      <ImpactBand setPage={setPage} />
    </>
  );
}

function AiModuleShowcase({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <section className="section aiBand">
      <div className="sectionTitle left">
        <span className="eyebrow">AI-powered modules</span>
        <h2>Implemented as classroom-ready coaching layers.</h2>
        <p>Each module is presented as AI powered in the interface and connected to the prototype flow, so the platform feels like a working learning product instead of a static concept deck.</p>
      </div>
      <div className="grid three">
        {aiPoweredModules.slice(0, 6).map(({ icon: Icon, title, label, copy, target }) => (
          <button className="aiModuleCard" key={title} onClick={() => setPage(target)}>
            <span className="moduleBadge"><Sparkles size={14} /> AI powered</span>
            <Icon className="cardIcon" size={24} />
            <small>{label}</small>
            <h3>{title}</h3>
            <p>{copy}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function SessionPreview({ scores }: { scores: Scores }) {
  return (
    <div className="liveCard">
      <div className="liveHeader">
        <span>Pitch session live</span>
        <b>SolarBag</b>
      </div>
      <div className="investorStrip">
        {investors.slice(0, 3).map((item) => <Avatar key={item.id} investor={item} />)}
      </div>
      <blockquote>What is your cost per bag today, and how does it change when you make 5,000 at once?</blockquote>
      <ScoreBars scores={scores} />
    </div>
  );
}

function HowItWorks({ setPage }: { setPage: (page: Page) => void }) {
  const steps = [
    [Lightbulb, "Share your idea", "Enter a startup concept without letting AI replace student creativity.", "pitch-room"],
    [Users, "Meet investors", "Finance, sustainability, marketing, and innovation personas ask focused questions.", "pitch-room"],
    [BarChart3, "Get scored", "The prototype updates clarity, confidence, innovation, and financial understanding.", "feedback"],
    [Trophy, "Compete", "Teachers can run Shark Tank-style leaderboards and audience voting.", "competition"]
  ] as const;

  return (
    <section className="section muted">
      <div className="sectionTitle">
        <span className="eyebrow">How it works</span>
        <h2>Four steps to founder confidence.</h2>
      </div>
      <div className="grid four">
        {steps.map(([Icon, title, text, target]) => (
          <button className="card interactiveCard" key={title} onClick={() => setPage(target)}>
            <Icon className="cardIcon" size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function FeatureSnapshot({ setPage }: { setPage: (page: Page) => void }) {
  const features = [
    [Mic, "AI pitch simulation", "Students type or record answers while the AI panel advances dynamically.", "pitch-room"],
    [Gauge, "Live scoring", "Clarity, confidence, innovation, and financial understanding are simulated in real time.", "feedback"],
    [School, "Teacher analytics", "Teachers monitor sessions, progress, rankings, and exportable reports.", "teacher"],
    [Trophy, "Competition mode", "Run Shark Tank-style classroom events with leaderboard and audience voting.", "competition"]
  ] as const;

  return (
    <section className="section">
      <div className="sectionTitle left">
        <span className="eyebrow">Platform pages</span>
        <h2>More than a landing page: a working academic prototype.</h2>
      </div>
      <div className="grid four">
        {features.map(([Icon, title, copy, target]) => (
          <button className="card interactiveCard" key={title} onClick={() => setPage(target)}>
            <Icon className="cardIcon" size={24} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function ImpactBand({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <section className="ethics">
      <ShieldCheck size={24} />
      <p>Transparent AI prototype: feedback is simulated, age-appropriate, and designed to coach originality rather than generate startup ideas for students.</p>
      <div>
        <button onClick={() => setPage("sdg")}>SDG alignment</button>
        <button onClick={() => setPage("ethics")}>Ethical AI</button>
      </div>
    </section>
  );
}

function PitchRoomPage(props: {
  idea: string;
  setIdea: (value: string) => void;
  answer: string;
  setAnswer: (value: string) => void;
  investor: Investor;
  question: string;
  activeInvestor: number;
  questionIndex: number;
  scores: Scores;
  overall: number;
  isRecording: boolean;
  recordingSeconds: number;
  pitchMedia: PitchMedia | null;
  onRecord: () => void;
  onAttachPitch: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemovePitchMedia: () => void;
  onSubmit: () => void;
}) {
  return (
    <PageShell eyebrow="Student pitch room" title="Practice with a live AI investor panel." subtitle="This page implements the core student experience from the requirements document: idea entry, investor questioning, response capture, scoring, and mock investment feedback.">
      <div className="workspace">
        <div className="panel mainPanel">
          <label className="fieldLabel" htmlFor="idea">Startup idea</label>
          <input id="idea" className="input" value={props.idea} onChange={(event) => props.setIdea(event.target.value)} />
          <LearningPathPanel scores={props.scores} />
          <div className="investorCards">
            {investors.map((item, index) => (
              <article className={index === props.activeInvestor ? "investor active" : "investor"} key={item.id}>
                <Avatar investor={item} />
                <strong>{item.name}</strong>
                <small>{item.tone}</small>
              </article>
            ))}
          </div>
          <div className="question">
            <Avatar investor={props.investor} />
            <div>
              <span>{props.investor.name} - Question {props.questionIndex + 1} of 3</span>
              <p>{props.question}</p>
            </div>
          </div>
          <label className="fieldLabel" htmlFor="answer">Your response</label>
          <textarea id="answer" className="textarea" value={props.answer} onChange={(event) => props.setAnswer(event.target.value)} />
          <div className="pitchMediaPanel">
            <div>
              <span className="eyebrow">Pitch media</span>
              <h3>Record now or attach a previous pitch.</h3>
              <p>Immediate recording uses your microphone. Previously recorded audio or video files can be attached for review.</p>
            </div>
            <div className="mediaActions">
              <button className={props.isRecording ? "button danger" : "button primary"} onClick={props.onRecord}>
                <Mic size={18} /> {props.isRecording ? `Stop recording ${formatDuration(props.recordingSeconds)}` : "Record immediate pitch"}
              </button>
              <label className="button secondary attachButton">
                Attach previous pitch
                <input type="file" accept="audio/*,video/*" onChange={props.onAttachPitch} />
              </label>
            </div>
            {props.pitchMedia && (
              <div className="mediaPreview">
                <div>
                  <strong>{props.pitchMedia.name}</strong>
                  <span>{props.pitchMedia.source === "recorded" ? "Immediate recording" : "Attached file"} - {props.pitchMedia.durationLabel}</span>
                </div>
                {props.pitchMedia.type.startsWith("video/") ? (
                  <video src={props.pitchMedia.url} controls />
                ) : (
                  <audio src={props.pitchMedia.url} controls />
                )}
                <button className="button secondary" onClick={props.onRemovePitchMedia}>Remove</button>
              </div>
            )}
          </div>
          <div className="actionRow">
            <button className="button secondary" onClick={props.onSubmit}>Submit response <ArrowUpRight size={18} /></button>
          </div>
        </div>
        <aside className="panel">
          <span className="eyebrow">Live scores</span>
          <div className="aiAssistCard compact">
            <span><Sparkles size={14} /> AI powered coach</span>
            <p>The coach reads the idea, answer, and active investor focus to prepare structured scoring and next-step feedback.</p>
          </div>
          <ScoreBars scores={props.scores} />
          <div className="overall">
            <span>Overall</span>
            <strong>{props.overall}</strong>
            <small>out of 100</small>
          </div>
          <div className="offer">
            <Award size={20} />
            <p>Mock offer: {props.overall > 78 ? "$12,000 school pilot investment" : "Revise and return for a pilot offer"}</p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

function LearningPathPanel({ scores }: { scores: Scores }) {
  const pathProgress = [
    scores.clarity,
    Math.round((scores.clarity + scores.confidence) / 2),
    scores.innovation,
    scores.financial,
    Math.round((scores.innovation + scores.clarity) / 2)
  ];

  return (
    <section className="learningPathPanel">
      <div className="learningPathHeader">
        <div>
          <span className="eyebrow">AI-powered learning path</span>
          <h3>Pitch-building stages</h3>
        </div>
        <span>{pathProgress.filter((value) => value >= 72).length}/{learningPath.length} ready</span>
      </div>
      <div className="learningPathSteps">
        {learningPath.map((step, index) => {
          const progress = pathProgress[index];
          const ready = progress >= 72;
          return (
            <article className={ready ? "pathStep ready" : "pathStep"} key={step.title}>
              <div>
                <span>{index + 1}</span>
                {ready && <Check size={14} />}
              </div>
              <strong>{step.title}</strong>
              <p>{step.focus}</p>
              <small>{step.metric} signal: {progress}%</small>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function FeedbackPage({ scores, feedback, overall, setPage }: { scores: Scores; feedback: string[]; overall: number; setPage: (page: Page) => void }) {
  return (
    <PageShell eyebrow="AI feedback dashboard" title="Personalized coaching after every answer." subtitle="This page simulates the required feedback dashboard with communication, confidence, innovation, and financial understanding scores.">
      <div className="dashboardGrid">
        <div className="panel">
          <div className="radar" style={{
            background: `conic-gradient(var(--teal) 0 ${scores.clarity}deg, var(--purple) ${scores.clarity}deg ${scores.clarity + scores.confidence}deg, var(--terra) ${scores.clarity + scores.confidence}deg ${scores.clarity + scores.confidence + scores.innovation}deg, var(--amber) 0)`
          }}>
            <div><strong>{overall}</strong><span>score</span></div>
          </div>
          <ScoreBars scores={scores} />
          <RubricBreakdown scores={scores} />
        </div>
        <div className="feedbackList">
          <article className="feedbackCard aiSummary">
            <span><Sparkles size={14} /> AI-powered rubric summary</span>
            <p>{overall > 78 ? "Your pitch is close to competition-ready. The AI coach recommends tightening the opening sentence and validating one demand signal." : "Your pitch has a promising idea. The AI coach recommends adding the target customer, a price point, and one test you can run this week."}</p>
          </article>
          {["Strength", "Improve", "Next step"].map((label, index) => (
            <article className="feedbackCard" key={label}>
              <span>{label}</span>
              <p>{feedback[index]}</p>
            </article>
          ))}
          <article className="feedbackCard accent">
            <span>Investor reaction</span>
            <p>{overall > 78 ? "The investor panel is interested in a school pilot if you validate demand." : "The panel wants a clearer customer, stronger evidence, and one financial number."}</p>
          </article>
          <button className="button primary" onClick={() => setPage("pitch-room")}>Start next pitch round</button>
        </div>
      </div>
    </PageShell>
  );
}

function RubricBreakdown({ scores }: { scores: Scores }) {
  const explanations = [
    {
      label: "Clarity",
      value: scores.clarity,
      reason: scores.clarity >= 78 ? "The customer and problem are easy to follow." : "The opening needs a clearer customer and problem.",
      next: "Start with who has the problem and why it matters."
    },
    {
      label: "Confidence",
      value: scores.confidence,
      reason: scores.confidence >= 76 ? "The answer gives enough detail to sound prepared." : "The answer needs stronger evidence or a concrete example.",
      next: "Add one test, survey result, or pilot action."
    },
    {
      label: "Innovation",
      value: scores.innovation,
      reason: scores.innovation >= 80 ? "The idea shows a clear difference or impact angle." : "The idea needs a sharper prototype or unique feature.",
      next: "Name what makes the solution different from existing options."
    },
    {
      label: "Financial",
      value: scores.financial,
      reason: scores.financial >= 72 ? "The answer includes useful pricing or cost evidence." : "The pitch needs cost, price, revenue, or budget detail.",
      next: "Add one number investors can react to."
    }
  ];

  return (
    <section className="rubricBreakdown">
      <span className="eyebrow">AI rubric transparency</span>
      {explanations.map((item) => (
        <article key={item.label}>
          <div>
            <strong>{item.label}</strong>
            <span>{item.value}</span>
          </div>
          <p>{item.reason}</p>
          <small>{item.next}</small>
        </article>
      ))}
    </section>
  );
}

function TeacherPage({ setPage, showNotice }: { setPage: (page: Page) => void; showNotice: (title: string, message: string) => void }) {
  return (
    <PageShell eyebrow="Teacher dashboard" title="Monitor progress and run classroom pitch events." subtitle="Teachers can compare student progress, manage competitions, and export reports for academic submission or classroom review.">
      <div className="teacherStats">
        <Metric icon={<School />} label="Active classes" value="5" />
        <Metric icon={<BookOpen />} label="Practice sessions" value="126" />
        <Metric icon={<Brain />} label="Avg. improvement" value="+18%" />
        <Metric icon={<Download />} label="Reports" value="Ready" />
      </div>
      <SessionModePlanner setPage={setPage} showNotice={showNotice} />
      <div className="teacherLayout">
        <div className="tablePanel">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Idea</th>
                <th>Sessions</th>
                <th>Score</th>
                <th>Growth</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.name}>
                  <td><strong>{student.name}</strong><small>{student.grade}</small></td>
                  <td>{student.idea}</td>
                  <td>{student.sessions}</td>
                  <td><div className="miniBar"><span style={{ width: `${student.score}%` }} /></div>{student.score}</td>
                  <td className={student.growth >= 0 ? "good" : "risk"}>{student.growth >= 0 ? "+" : ""}{student.growth}</td>
                  <td>{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside className="panel mainPanel">
          <span className="eyebrow">AI-powered classroom tools</span>
          <div className="insightStack">
            {teacherInsights.map((insight) => <p key={insight}>{insight}</p>)}
          </div>
          <button className="toolRow" onClick={() => {
            showNotice("Competition launched", "The Spring Innovation Shark Tank room is ready for live scoring.");
            setPage("competition");
          }}><Trophy size={18} /> Launch competition</button>
          <button className="toolRow" onClick={() => showNotice("Report prepared", "A classroom progress report has been generated for download in the prototype.")}><FileText size={18} /> Export progress report</button>
          <button className="toolRow" onClick={() => showNotice("Pitch day scheduled", "A pitch day has been added for Friday at 10:00 AM in the prototype calendar.")}><CalendarDays size={18} /> Schedule pitch day</button>
        </aside>
      </div>
    </PageShell>
  );
}

function SessionModePlanner({ setPage, showNotice }: { setPage: (page: Page) => void; showNotice: (title: string, message: string) => void }) {
  const [activeMode, setActiveMode] = useState(sessionModes[0]);

  function launchMode() {
    showNotice(`${activeMode.title} launched`, activeMode.next);
    if (activeMode.title === "Competition day") setPage("competition");
    else if (activeMode.title === "SDG impact review") setPage("sdg");
    else setPage("pitch-room");
  }

  return (
    <section className="sessionModePanel">
      <div className="sessionModeHeader">
        <div>
          <span className="eyebrow">AI-powered session modes</span>
          <h3>Choose today&apos;s classroom focus.</h3>
        </div>
        <button className="button secondary" onClick={launchMode}><Play size={18} /> Launch mode</button>
      </div>
      <div className="sessionModeGrid">
        {sessionModes.map((mode) => (
          <button className={mode.title === activeMode.title ? "sessionMode active" : "sessionMode"} key={mode.title} onClick={() => setActiveMode(mode)}>
            <strong>{mode.title}</strong>
            <span>{mode.duration}</span>
          </button>
        ))}
      </div>
      <div className="sessionModeDetail">
        <ClipboardList size={22} />
        <div>
          <strong>{activeMode.goal}</strong>
          <p>{activeMode.activity}</p>
          <small>{activeMode.next}</small>
        </div>
      </div>
    </section>
  );
}

function CompetitionPage({
  votes,
  onVote,
  role,
  showNotice
}: {
  votes: { invest: number; pass: number };
  onVote: (kind: "invest" | "pass") => void;
  role: UserRole;
  showNotice: (title: string, message: string) => void;
}) {
  return (
    <PageShell eyebrow="Competition mode" title="Shark Tank, school edition." subtitle="A live competition interface with rankings, AI judging simulation, pitch progress, and audience voting.">
      <div className="competitionBanner">
        <div>
          <span>Live - Grade 8 Championship</span>
          <strong>Spring Innovation Shark Tank</strong>
        </div>
        <div>
          <span>Pitching now</span>
          <strong>Karim A. - SolarBag</strong>
        </div>
        <div>
          <span>Progress</span>
          <strong>6 / 11 pitches</strong>
        </div>
      </div>
      <div className="competition">
        <div className="leaderboard">
          {students.map((student, index) => (
            <div className={index === 0 ? "rank first" : "rank"} key={student.name}>
              <span>{index + 1}</span>
              <strong>{student.name}</strong>
              <small>{student.idea}</small>
              <b>{student.score}</b>
              {index === 0 && <Trophy size={20} />}
            </div>
          ))}
        </div>
        <aside className="votePanel">
          <span className="eyebrow">{role === "teacher" ? "AI-powered teacher controls" : "AI-powered audience vote"}</span>
          <h3>{role === "teacher" ? "Control live scoring" : "Would you invest in SolarBag?"}</h3>
          <div className="aiAssistCard">
            <span><Sparkles size={14} /> AI judge note</span>
            <p>SolarBag leads because the pitch combines a clear school problem, an impact angle, and stronger prototype evidence than the field.</p>
          </div>
          {role === "teacher" && (
            <>
              <button className="button primary" onClick={() => showNotice("Scores locked", "The current leaderboard has been locked for judge review.")}><Lock size={18} /> Lock scores</button>
              <button className="button secondary" onClick={() => showNotice("Next pitch queued", "Maya R. - EcoBottle is queued as the next live pitch.")}><ArrowUpRight size={18} /> Next presenter</button>
            </>
          )}
          <button className="button primary" onClick={() => onVote("invest")}><ThumbsUp size={18} /> Yes, invest</button>
          <button className="button secondary" onClick={() => onVote("pass")}><ThumbsDown size={18} /> Not yet</button>
          <div className="voteBar"><span style={{ width: `${votes.invest}%` }} /></div>
          <p>{votes.invest}% invest - {votes.pass}% pass</p>
        </aside>
      </div>
    </PageShell>
  );
}

function SubscriptionsPage({ setPage, showNotice }: { setPage: (page: Page) => void; showNotice: (title: string, message: string) => void }) {
  const comparisons = [
    ["AI-powered investor sessions", "Included", "Included", "Included"],
    ["AI-powered student analytics", "Basic", "Full dashboard", "Institution dashboard"],
    ["AI-powered competition judging", "Not included", "Included", "Included"],
    ["AI-powered report export", "Not included", "Included", "Included"],
    ["LMS integration", "Not included", "Planned add-on", "Included planning"],
    ["Custom branding", "Not included", "Not included", "Included"]
  ];

  return (
    <PageShell eyebrow="Subscription details" title="School subscription plans." subtitle="A dedicated subscription page with capacity, buyer fit, included features, and plan comparison as requested in the business model requirements.">
      <div className="grid three">
        {plans.map((plan, index) => (
          <article className={index === 1 ? "price featured" : "price"} key={plan.name}>
            <span className="eyebrow">{plan.name}</span>
            <strong>{plan.price}</strong>
            <p>{plan.audience}</p>
            <div className="capacity">{plan.capacity}</div>
            {plan.includes.map((feature) => <div className="feature" key={feature}><Check size={16} /> {feature}</div>)}
            <p>{plan.bestFor}</p>
            <button className={index === 1 ? "button primary" : "button secondary"} onClick={() => {
              showNotice(`${plan.name} selected`, `${plan.name} subscription details were added to the prototype request flow.`);
              setPage("pitch-room");
            }}>Preview {plan.name}</button>
          </article>
        ))}
      </div>
      <div className="tablePanel comparisonTable">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Starter</th>
              <th>Pro</th>
              <th>Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => <td key={cell}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}

function FeaturesPage({ setPage }: { setPage: (page: Page) => void }) {
  const featureGroups = [
    [Target, "AI-powered pitch simulation", "Investor personas ask specialized questions based on finance, marketing, sustainability, and innovation.", "pitch-room"],
    [LineChart, "AI-powered data visualization", "Progress bars, scoring summaries, growth metrics, rankings, and simulated performance charts.", "feedback"],
    [GraduationCap, "AI-powered teacher controls", "Classroom analytics, competition setup, pitch rankings, progress tracking, and report export.", "teacher"],
    [Megaphone, "AI-powered competition mode", "Live leaderboard, audience voting, pitch progress, and simulated investment decisions.", "competition"],
    [Building2, "AI-ready school business model", "Annual school subscriptions based on classrooms, student count, analytics, and competitions.", "subscriptions"],
    [Lock, "Ethical AI guardrails", "Transparent simulated evaluations, protected student ideas, and age-appropriate coaching.", "ethics"]
  ] as const;

  return (
    <PageShell eyebrow="Features overview" title="Requirement coverage in one prototype." subtitle="This page maps the feature requirements into usable screens that can be enhanced later with real AI APIs, speech analysis, LMS integration, or video assets.">
      <div className="moduleRibbon">
        {aiPoweredModules.slice(0, 4).map((module) => (
          <span key={module.title}><Sparkles size={13} /> {module.title}</span>
        ))}
      </div>
      <div className="grid three">
        {featureGroups.map(([Icon, title, copy, target]) => (
          <button className="card interactiveCard" key={title} onClick={() => setPage(target)}>
            <Icon className="cardIcon" size={24} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </button>
        ))}
      </div>
    </PageShell>
  );
}

function SdgPage() {
  const [selectedGoalCode, setSelectedGoalCode] = useState("SDG 4");
  const selectedGoal = sdgGoals.find((goal) => goal.code === selectedGoalCode) ?? sdgGoals[3];
  const addressedProjects = students.filter((student) => student.sdgs.includes(selectedGoal.code));

  return (
    <PageShell eyebrow="AI-powered SDG briefing" title="All 17 UN Sustainable Development Goals." subtitle="Click a goal to review the official SDG number, UN-referenced branding, classroom briefing, and student projects that address or relate to that goal.">
      <div className="sdgSourceNote">
        <ShieldCheck size={20} />
        <p>Goal names, numbers, and colors follow the United Nations Sustainable Development Goals identity. Each tile includes a UN reference link for the related goal page.</p>
      </div>
      <div className="sdgExplorer">
        <div className="sdgLogoGrid" aria-label="United Nations Sustainable Development Goals">
          {sdgGoals.map((goal) => (
            <button
              className={goal.code === selectedGoal.code ? "sdgLogoTile active" : "sdgLogoTile"}
              key={goal.code}
              onClick={() => setSelectedGoalCode(goal.code)}
              style={{ "--sdg-color": goal.color } as CSSProperties}
            >
              <span className="sdgNumber">{goal.number}</span>
              <strong>{goal.title}</strong>
              <small>UN {goal.code}</small>
            </button>
          ))}
        </div>
        <aside className="sdgDetailPanel" style={{ "--sdg-color": selectedGoal.color } as CSSProperties}>
          <div className="sdgDetailHeader">
            <div className="sdgEmblem">
              <span>{selectedGoal.number}</span>
              <strong>{selectedGoal.title}</strong>
            </div>
            <div>
              <span className="eyebrow">Selected UN goal</span>
              <h3>{selectedGoal.code}: {selectedGoal.title}</h3>
              <p>{selectedGoal.fullTitle}.</p>
              <a href={selectedGoal.referenceUrl} target="_blank" rel="noreferrer">UN reference page</a>
            </div>
          </div>
          <div className="aiAssistCard sdgAiNote">
            <span><Sparkles size={14} /> AI-powered impact briefing</span>
            <p>{selectedGoal.briefing}</p>
          </div>
          <div className="sdgProjects">
            <div>
              <span className="eyebrow">Addressed by student projects</span>
              <div className="ideaList">
                {addressedProjects.length > 0 ? addressedProjects.map((student) => (
                  <article className="ideaCard" key={student.name}>
                    <div>
                      <strong>{student.idea}</strong>
                      <small>{student.name} - {student.grade}</small>
                    </div>
                    <p>{student.impact}</p>
                    <div className="ideaMeta">
                      <span>Score {student.score}</span>
                      <span>{student.status}</span>
                      {student.sdgs.map((sdg) => <span key={sdg}>{sdg}</span>)}
                    </div>
                  </article>
                )) : (
                  <article className="ideaCard emptyIdea">
                    <strong>No addressed project yet</strong>
                    <p>No current student pitch has tagged {selectedGoal.code}. The related project prompts below can help students design one.</p>
                  </article>
                )}
              </div>
            </div>
            <div>
              <span className="eyebrow">Related project pathways</span>
              <div className="relatedProjectList">
                {selectedGoal.relatedProjects.map((project) => (
                  <article key={project}>
                    <Target size={17} />
                    <span>{project}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

function EthicsPage() {
  return (
    <PageShell eyebrow="Ethical AI requirements" title="Transparent coaching, not idea replacement." subtitle="This page documents the responsible AI principles required for the prototype and future implementation.">
      <div className="grid three">
        <Principle icon={<Lightbulb />} title="AI-powered originality first" copy="The system coaches student pitches without generating startup ideas on their behalf." />
        <Principle icon={<ShieldCheck />} title="AI-powered privacy guardrails" copy="Student concepts are treated as private classroom work and should not be reused for other users." />
        <Principle icon={<Users />} title="AI-powered age fit" copy="Feedback stays constructive, clear, and suitable for elementary and middle school students." />
        <Principle icon={<ClipboardList />} title="AI-powered transparent scoring" copy="The prototype labels scores as simulated and future AI evaluations should explain their criteria." />
        <Principle icon={<Lock />} title="AI-powered safe expansion" copy="Speech, video, or LMS features should require explicit school approval and privacy safeguards." />
        <Principle icon={<Brain />} title="AI-powered teacher loop" copy="Teacher review remains central for grading, competitions, and student encouragement." />
      </div>
    </PageShell>
  );
}

function PageShell({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle: string; children: ReactNode }) {
  return (
    <section className="section page">
      <div className="sectionTitle left pageTitle">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function Principle({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) {
  return (
    <article className="card">
      <span className="cardIcon">{icon}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  );
}

function Footer({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <footer>
      <button className="brand brandButton" onClick={() => setPage("home")}>
        <span className="brandIcon"><Sparkles size={18} /></span>
        <span>PitchPal AI</span>
      </button>
      <p>AI-powered entrepreneurship coaching for the next generation of founders.</p>
      <div className="footerLinks">
        <button onClick={() => setPage("features")}>Features</button>
        <button onClick={() => setPage("sdg")}>SDG</button>
        <button onClick={() => setPage("ethics")}>Ethics</button>
      </div>
    </footer>
  );
}

function Avatar({ investor }: { investor: Investor }) {
  return <span className={`avatar ${investor.id}`}>{investor.initials}</span>;
}

function ScoreBars({ scores }: { scores: Scores }) {
  return (
    <div className="scoreBars">
      {Object.entries(scores).map(([label, value]) => (
        <div className="scoreLine" key={label}>
          <div><span>{label}</span><b>{value}</b></div>
          <div className="bar"><span className={label} style={{ width: `${value}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <article className="metric">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function Toast({ notice, onClose }: { notice: Notice; onClose: () => void }) {
  useEffect(() => {
    const timeout = window.setTimeout(onClose, 3600);
    return () => window.clearTimeout(timeout);
  }, [notice, onClose]);

  return (
    <aside className="toast" role="status" aria-live="polite">
      <div>
        <strong>{notice.title}</strong>
        <p>{notice.message}</p>
      </div>
      <button onClick={onClose} aria-label="Dismiss notification">Close</button>
    </aside>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

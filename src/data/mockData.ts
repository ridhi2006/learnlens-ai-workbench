export type Status = "mastered" | "learning" | "weak" | "not-covered";

export const user = {
  name: "Alex",
  fullName: "Alex Mercer",
  email: "alex@learnlens.ai",
  level: "Intermediate Learner",
  joined: "March 2026",
  initials: "AM",
  stats: {
    videosAnalyzed: 12,
    conceptsLearned: 34,
    quizAverage: 78,
    streak: 6,
    topicsLearned: 34,
  },
};

export type Concept = {
  id: string;
  label: string;
  status: Status;
  confidence: number;
  definition: string;
  timeRange?: string;
  group: "root" | "fundamentals" | "variations" | "complexity";
};

export const concepts: Concept[] = [
  {
    id: "binary-search",
    label: "Binary Search",
    status: "mastered",
    confidence: 91,
    definition:
      "A divide-and-conquer search that repeatedly halves a sorted search space until the target is located.",
    timeRange: "02:14–08:40",
    group: "root",
  },
  {
    id: "search-space",
    label: "Search Space",
    status: "mastered",
    confidence: 88,
    definition:
      "The inclusive range [left, right] that still may contain the answer. Every iteration shrinks it by half.",
    timeRange: "08:40–14:05",
    group: "fundamentals",
  },
  {
    id: "mid-calculation",
    label: "Mid Calculation",
    status: "learning",
    confidence: 74,
    definition:
      "mid = left + (right - left) / 2 avoids integer overflow that (left + right) / 2 can cause on large bounds.",
    timeRange: "14:05–17:32",
    group: "fundamentals",
  },
  {
    id: "lower-bound",
    label: "Lower Bound",
    status: "weak",
    confidence: 42,
    definition:
      "Find the first position where arr[i] >= target. Keep moving right inward while the predicate stays true.",
    timeRange: "31:20–35:48",
    group: "variations",
  },
  {
    id: "upper-bound",
    label: "Upper Bound",
    status: "mastered",
    confidence: 85,
    definition:
      "Find the first position where arr[i] > target. Mirrors lower bound with a strict comparison.",
    timeRange: "35:48–39:10",
    group: "variations",
  },
  {
    id: "boundary-conditions",
    label: "Boundary Conditions",
    status: "weak",
    confidence: 38,
    definition:
      "Off-by-one handling of loop invariants: while (left < right) versus (left <= right) and how the answer is returned.",
    timeRange: "39:10–42:30",
    group: "variations",
  },
  {
    id: "time-complexity",
    label: "Time Complexity",
    status: "mastered",
    confidence: 90,
    definition:
      "Each step discards half of n elements, so at most log2(n) steps are required — O(log n) time, O(1) space.",
    timeRange: "42:30–45:50",
    group: "complexity",
  },
  {
    id: "rotated-sorted-array",
    label: "Rotated Sorted Array",
    status: "not-covered",
    confidence: 0,
    definition:
      "Binary search on an array rotated at an unknown pivot by deciding which half is sorted at each step.",
    group: "variations",
  },
  {
    id: "binary-search-on-answer",
    label: "Binary Search on Answer",
    status: "not-covered",
    confidence: 0,
    definition:
      "Search the answer range instead of the array, using a monotonic feasibility predicate.",
    group: "variations",
  },
  {
    id: "peak-element",
    label: "Peak Element",
    status: "not-covered",
    confidence: 0,
    definition:
      "Use the slope between mid and mid+1 to move toward a local maximum in an unsorted array.",
    group: "variations",
  },
];

export const conceptById = (id: string) => concepts.find((c) => c.id === id);

export type VideoSession = {
  id: string;
  title: string;
  creator: string;
  duration: string;
  minutes: number;
  topic: string;
  progress: number;
  quizScore: number | null;
  conceptCount: number;
  lastStudied: string;
  level: string;
  thumbClass: string;
};

export const videos: VideoSession[] = [
  {
    id: "binary-search",
    title: "Binary Search Complete Tutorial",
    creator: "Algorithms Deconstructed",
    duration: "46 min",
    minutes: 46,
    topic: "Data Structures & Algorithms",
    progress: 72,
    quizScore: 70,
    conceptCount: 7,
    lastStudied: "Today",
    level: "Intermediate",
    thumbClass: "from-violet/30 via-indigo/20 to-cyan/25",
  },
  {
    id: "graph-traversal",
    title: "Graph BFS & DFS, Visualized",
    creator: "Algorithms Deconstructed",
    duration: "38 min",
    minutes: 38,
    topic: "Graphs",
    progress: 54,
    quizScore: 65,
    conceptCount: 9,
    lastStudied: "Yesterday",
    level: "Intermediate",
    thumbClass: "from-cyan/30 via-indigo/20 to-violet/20",
  },
  {
    id: "react-hooks",
    title: "React Hooks From First Principles",
    creator: "Interface Lab",
    duration: "52 min",
    minutes: 52,
    topic: "Frontend Engineering",
    progress: 100,
    quizScore: 88,
    conceptCount: 11,
    lastStudied: "3 days ago",
    level: "Beginner",
    thumbClass: "from-indigo/30 via-violet/20 to-cyan/20",
  },
  {
    id: "os-deadlocks",
    title: "Operating Systems: Deadlocks",
    creator: "Systems Notebook",
    duration: "41 min",
    minutes: 41,
    topic: "Operating Systems",
    progress: 31,
    quizScore: null,
    conceptCount: 8,
    lastStudied: "5 days ago",
    level: "Advanced",
    thumbClass: "from-violet/25 via-cyan/20 to-indigo/25",
  },
  {
    id: "dp-basics",
    title: "Dynamic Programming Basics",
    creator: "Algorithms Deconstructed",
    duration: "58 min",
    minutes: 58,
    topic: "Data Structures & Algorithms",
    progress: 12,
    quizScore: null,
    conceptCount: 12,
    lastStudied: "1 week ago",
    level: "Advanced",
    thumbClass: "from-cyan/25 via-violet/20 to-indigo/20",
  },
];

export const videoById = (id: string) => videos.find((v) => v.id === id) ?? videos[0];

export const summary = {
  overview:
    "This lecture builds binary search from the invariant up. Rather than memorising the loop, the instructor frames every variant as a monotonic predicate over a shrinking search space, then derives lower bound, upper bound and the logarithmic complexity argument from that single idea.",
  keyIdeas: [
    "Binary search is a decision procedure over a monotonic predicate, not just an array lookup.",
    "The loop invariant — the answer always lives inside [left, right] — is what makes the algorithm correct.",
    "Computing mid as left + (right - left) / 2 keeps the arithmetic safe for very large bounds.",
    "Lower and upper bound differ only in the strictness of the comparison.",
    "Because each step discards half of the remaining elements, the depth is log2(n).",
  ],
  importantConcepts: [
    "Sorted (or monotonic) input is a requirement, not a convenience.",
    "Boundary conditions decide whether you return left, right or mid.",
    "while (left < right) converges to a single candidate; while (left <= right) needs an explicit answer variable.",
  ],
  examples: [
    "Locating 41 in a 16-element sorted array in 4 comparisons instead of 16.",
    "Counting occurrences of a value with upperBound(x) - lowerBound(x).",
  ],
  takeaways: [
    "Write the predicate first, then the loop.",
    "Test with arrays of length 0, 1 and 2 — that is where boundary bugs live.",
    "Every 'minimum value that works' problem is a binary search in disguise.",
  ],
};

export const cheatSheet = [
  { label: "Requirement", value: "Sorted or monotonic search space" },
  { label: "Formula", value: "mid = left + (right - left) / 2" },
  { label: "Move right", value: "target > arr[mid]  →  left = mid + 1" },
  { label: "Move left", value: "target < arr[mid]  →  right = mid - 1" },
  { label: "Lower bound", value: "first i where arr[i] >= target" },
  { label: "Upper bound", value: "first i where arr[i] > target" },
  { label: "Complexity", value: "O(log n) time · O(1) space" },
  { label: "Watch out", value: "Empty array, single element, duplicate values" },
];

export const revisionNotes = [
  "Sorted input → halve the range → O(log n).",
  "mid = left + (right - left) / 2.",
  "lowerBound: arr[i] >= target. upperBound: arr[i] > target.",
  "count(x) = upperBound(x) - lowerBound(x).",
  "while (left < right) → answer is left when the loop exits.",
  "Rotated array: detect the sorted half first, then recurse into it.",
  "Binary search on answer: predicate must be monotonic.",
];

export type TranscriptRowData = {
  time: string;
  seconds: number;
  chapter: string;
  text: string;
};

export const transcript: TranscriptRowData[] = [
  {
    time: "00:00",
    seconds: 0,
    chapter: "Introduction",
    text: "Introduction — what we are building today and why linear scanning stops working once your input grows past a few thousand elements.",
  },
  {
    time: "02:14",
    seconds: 134,
    chapter: "Introduction",
    text: "Binary Search is an efficient searching algorithm that works on any sorted collection. The trick is that a single comparison tells you which half of the data you can throw away entirely.",
  },
  {
    time: "05:30",
    seconds: 330,
    chapter: "The invariant",
    text: "Let's state the invariant clearly: the answer, if it exists, is always inside the closed interval left to right. Every line of the loop must preserve that sentence.",
  },
  {
    time: "08:40",
    seconds: 520,
    chapter: "Search space",
    text: "Our search space starts as the whole array. After the first comparison it is half as large, then a quarter, and so on. This shrinking interval is the search space.",
  },
  {
    time: "11:02",
    seconds: 662,
    chapter: "Search space",
    text: "Notice that we never move a pointer past the answer. When target is greater than the middle value we set left to mid plus one, because mid itself has been ruled out.",
  },
  {
    time: "14:05",
    seconds: 845,
    chapter: "Mid calculation",
    text: "Here is the mid calculation. Writing left plus right over two looks harmless, but with large bounds that sum can overflow a 32-bit integer, so we write left plus right minus left over two instead.",
  },
  {
    time: "17:32",
    seconds: 1052,
    chapter: "Mid calculation",
    text: "This is the part people skip. The reason we bias the midpoint downward is to guarantee progress: if mid could equal right, the interval would never shrink and the loop would spin forever on a two-element range.",
  },
  {
    time: "21:15",
    seconds: 1275,
    chapter: "Walkthrough",
    text: "Let's trace searching for forty-one in a sixteen element array. Four comparisons, and we are done — versus sixteen for a linear scan.",
  },
  {
    time: "26:40",
    seconds: 1600,
    chapter: "Walkthrough",
    text: "Now the same trace when the value is missing. The pointers cross, and the position where they cross is exactly the insertion point — which is a useful result in itself.",
  },
  {
    time: "31:20",
    seconds: 1880,
    chapter: "Lower bound",
    text: "Lower bound answers a different question: not where is the target, but where is the first element that is greater than or equal to the target. We keep the candidate instead of discarding mid.",
  },
  {
    time: "35:48",
    seconds: 2148,
    chapter: "Upper bound",
    text: "Upper bound is the same code with a strict comparison. Subtract the two and you have counted the occurrences of a value in logarithmic time.",
  },
  {
    time: "39:10",
    seconds: 2350,
    chapter: "Boundary conditions",
    text: "Boundary conditions. If you loop while left is strictly less than right, the interval converges to one candidate and you return left. If you loop while left is less than or equal to right, you must store the answer explicitly.",
  },
  {
    time: "42:30",
    seconds: 2550,
    chapter: "Complexity",
    text: "For complexity, ask how many times you can halve n before reaching one. That count is log base two of n, which is why binary search is O(log n) with constant extra space.",
  },
  {
    time: "45:50",
    seconds: 2750,
    chapter: "Wrap up",
    text: "Next time we will apply this to rotated arrays and to binary search on the answer, where the array you search does not exist in memory at all.",
  },
];

export const timestampAnswers: Record<string, { answer: string; source: string }> = {
  "17:32": {
    answer:
      "At 17:32 the instructor explains why the midpoint is biased downward. If mid were allowed to equal right, then on a two-element interval the update left = mid would leave the interval unchanged and the loop could never terminate. Flooring the midpoint guarantees that at least one element is removed from the search space per iteration — this is the progress half of the correctness argument, sitting right next to the invariant.",
    source: "Based on transcript 16:58–18:15",
  },
  default: {
    answer:
      "The instructor is reinforcing the single idea behind the whole lecture: state a monotonic predicate over the search space, then write a loop that preserves the invariant while strictly shrinking the interval. Everything else — lower bound, upper bound, rotated arrays — is a different predicate over the same skeleton.",
    source: "Based on the surrounding transcript window",
  },
};

export type QuizQuestion = {
  id: number;
  concept: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export const quiz: QuizQuestion[] = [
  {
    id: 1,
    concept: "Binary Search",
    question: "What property must the input satisfy for classic binary search to be correct?",
    options: [
      "It must contain unique values",
      "It must be sorted, or monotonic with respect to the predicate",
      "It must fit in cache",
      "Its length must be a power of two",
    ],
    correct: 1,
    explanation:
      "Binary search discards half the range based on one comparison. That is only valid if the data is ordered with respect to the predicate being tested.",
  },
  {
    id: 2,
    concept: "Mid Calculation",
    question: "Why is mid written as left + (right - left) / 2?",
    options: [
      "It is faster than addition",
      "It rounds toward the target",
      "It avoids integer overflow on large bounds",
      "It makes the loop run in O(1)",
    ],
    correct: 2,
    explanation:
      "(left + right) can exceed the integer range even when both bounds are valid indices. The subtraction form keeps every intermediate value inside the range.",
  },
  {
    id: 3,
    concept: "Time Complexity",
    question: "Binary search on n sorted elements performs at most how many comparisons?",
    options: ["n / 2", "log2(n) + 1", "sqrt(n)", "n log n"],
    correct: 1,
    explanation: "Each comparison halves the range, so the depth of the process is log2(n) rounded up.",
  },
  {
    id: 4,
    concept: "Lower Bound",
    question: "lowerBound(arr, x) returns the first index where…",
    options: ["arr[i] > x", "arr[i] >= x", "arr[i] == x", "arr[i] < x"],
    correct: 1,
    explanation:
      "Lower bound is the first position not less than x, which is also the correct insertion point for x.",
  },
  {
    id: 5,
    concept: "Upper Bound",
    question: "How do you count occurrences of x in a sorted array in O(log n)?",
    options: [
      "upperBound(x) - lowerBound(x)",
      "lowerBound(x) - upperBound(x)",
      "upperBound(x) + lowerBound(x)",
      "Scan from lowerBound(x) forward",
    ],
    correct: 0,
    explanation: "The two bounds delimit the block of equal values, so their difference is the count.",
  },
  {
    id: 6,
    concept: "Boundary Conditions",
    question: "With the loop condition while (left < right), where is the answer after the loop exits?",
    options: ["At right + 1", "At mid", "At left, since left == right", "Nowhere — you must rerun the loop"],
    correct: 2,
    explanation: "The interval converges to a single index, so left and right coincide on the candidate.",
  },
  {
    id: 7,
    concept: "Boundary Conditions",
    question: "Which input most reliably exposes an off-by-one bug in a binary search?",
    options: [
      "A large random array",
      "Arrays of length 0, 1 and 2",
      "An array of identical values",
      "A reverse-sorted array",
    ],
    correct: 1,
    explanation:
      "Tiny intervals are where the update rules stop shrinking the range; that is where infinite loops and skipped answers appear.",
  },
  {
    id: 8,
    concept: "Search Space",
    question: "After target > arr[mid], the correct update is:",
    options: ["left = mid", "left = mid + 1", "right = mid", "right = mid - 1"],
    correct: 1,
    explanation: "mid has been ruled out, so it must be excluded from the next interval to guarantee progress.",
  },
  {
    id: 9,
    concept: "Binary Search",
    question: "When the pointers cross without a match, what does the crossing position mean?",
    options: [
      "Nothing useful",
      "The index of the largest element",
      "The insertion point that keeps the array sorted",
      "The midpoint of the array",
    ],
    correct: 2,
    explanation: "That position is exactly where the missing value would go — the same result lower bound returns.",
  },
  {
    id: 10,
    concept: "Time Complexity",
    question: "What is the auxiliary space of an iterative binary search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correct: 0,
    explanation: "Only a handful of index variables are kept; the recursive form instead uses O(log n) stack frames.",
  },
];

export const interviewQuestions = [
  {
    question: "Why is Binary Search O(log n)?",
    good: "You correctly explained that each iteration discards half of the remaining elements.",
    improve: "Explain how the number of halvings relates to log₂(n) — that is the step that turns intuition into a bound.",
    score: 8,
  },
  {
    question: "The array must be sorted. Why is that requirement not negotiable?",
    good: "You tied sortedness to the comparison being able to eliminate a whole half.",
    improve: "Mention the more general framing: the predicate only needs to be monotonic, not the values themselves.",
    score: 7,
  },
  {
    question: "Walk me through how lower bound differs from a plain search.",
    good: "You kept mid as a candidate instead of discarding it.",
    improve: "Be precise about the loop condition and what left holds when the loop exits.",
    score: 6,
  },
  {
    question: "Your loop hangs on a two-element array. Diagnose it.",
    good: "You suspected the interval update immediately.",
    improve: "Name the invariant that breaks: the interval must strictly shrink every iteration.",
    score: 5,
  },
  {
    question: "How would you adapt this to a rotated sorted array?",
    good: "You recognised that one half is always sorted.",
    improve: "Describe how you decide which half is sorted before choosing where to recurse.",
    score: 6,
  },
];

export const interviewMetrics = [
  { label: "Concept Understanding", value: 82 },
  { label: "Explanation Quality", value: 74 },
  { label: "Complexity Reasoning", value: 68 },
  { label: "Application", value: 61 },
];

export const coverage = {
  mastered: ["Binary Search Basics", "Search Space", "Time Complexity", "Upper Bound"],
  weak: ["Lower Bound", "Boundary Conditions"],
  notCovered: ["Rotated Sorted Array", "Peak Element", "Binary Search on Answer"],
};

export type RoadmapStep = {
  title: string;
  state: "MASTERED" | "REVISE" | "NEXT" | "LOCKED";
  note: string;
};

export const roadmap: RoadmapStep[] = [
  { title: "Binary Search Basics", state: "MASTERED", note: "Quiz 90% · confident on the invariant" },
  { title: "Lower Bound", state: "REVISE", note: "Quiz 40% · predicate direction still slipping" },
  { title: "Boundary Conditions", state: "REVISE", note: "Interview flagged off-by-one reasoning" },
  { title: "Rotated Sorted Array", state: "NEXT", note: "Natural next step from your current level" },
  { title: "Peak Element", state: "LOCKED", note: "Unlocks after rotated array" },
  { title: "Binary Search on Answer", state: "LOCKED", note: "Advanced application of the same predicate idea" },
];

export const knowledgeAreas = [
  { topic: "Arrays", value: 92 },
  { topic: "Strings", value: 80 },
  { topic: "Binary Search", value: 72 },
  { topic: "Linked Lists", value: 64 },
  { topic: "Trees", value: 43 },
  { topic: "Graphs", value: 20 },
];

export const recentlyMastered = [
  { title: "Binary Search Basics", when: "Mastered today" },
  { title: "Sliding Window", when: "Mastered 2 days ago" },
  { title: "React useEffect Lifecycle", when: "Mastered 3 days ago" },
  { title: "Upper Bound", when: "Mastered 4 days ago" },
];

export const revisionNeeded = [
  { title: "Lower Bound", score: 40 },
  { title: "Tree Diameter", score: 55 },
  { title: "Graph Cycle Detection", score: 48 },
];

export const weakTopics = ["Lower Bound", "Boundary Conditions", "Graph Cycles"];

export const recommendedNext = {
  title: "Rotated Sorted Array",
  reason: "Based on your Binary Search progress",
};

export const learningModes = [
  { id: "beginner", label: "Beginner", description: "Simple explanations and everyday analogies." },
  { id: "college", label: "College", description: "Structured academic learning with derivations." },
  { id: "revision", label: "Revision", description: "Concise, high-value review before an exam." },
  { id: "interview", label: "Interview", description: "Interview-focused concepts and follow-up questions." },
];

export const tutorSuggestions = [
  "Explain this simply",
  "Give me an analogy",
  "Show another example",
  "Test me",
];

export const learnModeMessages = [
  {
    role: "assistant" as const,
    content:
      "Let's build binary search the way the lecture does. Forget the array for a second: you have a range of candidate answers, and one question you can ask that eliminates half of them. That question is the predicate. Ready to see how lower bound is the same skeleton with a different question?",
    concepts: ["Search Space", "Lower Bound"],
    timestamp: "05:30",
  },
];

export const askModeSeed = [
  {
    role: "user" as const,
    content: "Why is the array required to be sorted?",
  },
  {
    role: "assistant" as const,
    content:
      "Because the comparison at the midpoint has to be informative about an entire half. In a sorted array, arr[mid] < target implies every element to the left is also smaller, so the left half can be discarded in one step. Remove the ordering and that implication disappears — a single comparison then tells you nothing about the elements you did not look at, and you are back to a linear scan.",
    concepts: ["Search Space", "Binary Search"],
    timestamp: "02:14",
  },
];

export const tutorFallback =
  "Good question. Anchor it back to the invariant: the answer always lives inside [left, right], and every iteration must both preserve that and shrink the interval. If you can state those two sentences for a variant, the code writes itself — and the lecture uses exactly that framing at 05:30 and again at 39:10.";

export const analyzingStages = [
  "Video detected",
  "Transcript extracted",
  "Understanding concepts",
  "Building knowledge graph",
  "Preparing your learning space",
];

export const analyzingInsights = [
  "Identifying key concepts...",
  "Finding topic relationships...",
  "Mapping timestamps to concepts...",
  "Preparing your quiz...",
  "Drafting your learning roadmap...",
];

export const sharedSession = {
  sharedBy: "Alex M.",
  sharedOn: "August 17, 2026",
  video: videos[0],
};

export const notifications = [
  { title: "Roadmap updated", body: "Rotated Sorted Array is now your next topic.", when: "2m ago" },
  { title: "Quiz reviewed", body: "Lower Bound was flagged as a weak concept.", when: "1h ago" },
  { title: "Streak extended", body: "6 days of continuous learning. Keep going.", when: "Today" },
];
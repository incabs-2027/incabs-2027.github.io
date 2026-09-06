// Single source of truth for every conference fact used across the site.
//
// Every value here traces to references/cfp inCABS 27 new.pdf — the finalized
// Call for Papers, which supersedes references/inCABS call for paper draft.docx
// wherever the two disagree. The finalized CFP is what is publicly distributed,
// so it wins any conflict, including with the sibling GYST-AI site.
//
// Unknown values are `null`, never an empty string, never a placeholder
// value intended to be replaced later. `null` is what makes `<TBA />` fire.
//
// Dates are stored as ISO calendar days ("2027-02-01") because the calendar
// export (lib/ics.ts), the countdown, and the schema.org Event all need a
// machine-readable value. Use formatDate() from lib/formatDate.ts to display
// one to a reader.

/** The host foundation's own site. Used for every cross-site link, so the
 *  URL lives in exactly one place. */
export const GYST_AI_URL = "https://gyst-ai.github.io";

export type TrackId = "T1" | "T2" | "T3" | "T4";

export type Track = {
  id: TrackId;
  title: string;
  summary: string;
  topics: string[];
};

export type CommitteeMember = {
  name: string;
  role: string;
  affiliation: string | null;
  photoUrl: string | null;
};

export type ConferenceData = {
  name: string;
  acronym: string;
  year: number;
  hostOrg: {
    name: string;
    acronym: string;
    tagline: string;
    contactEmail: string;
  };
  language: string;
  theme: {
    title: string;
    description: string;
  };
  tracks: Track[];
  paperRequirements: {
    language: string;
    maxPages: number;
    pageScopeNote: string;
    originalityNote: string;
    fileFormat: string;
    requiredSections: string[];
    teamsAllowed: boolean;
    templateName: string;
    templateUrl: string;
    acmDisclaimer: string;
  };
  /** The distributed CFP document. Hosted once, here, and linked from the
   *  GYST-AI site rather than copied there — one file, one URL, no drift. */
  cfpDocument: {
    url: string | null;
    fileSizeLabel: string | null;
  };
  tracksNote: string;
  reviewProcess: {
    committeeName: string;
    reviewersPerPaper: number;
    criteria: string[];
  };
  presentation: {
    formats: string[];
    inPersonNote: string;
    cameraReadyNote: string;
    registrationRequirement: string;
    publicationStatement: string;
  };
  awards: { name: string }[];
  awardsClosingNote: string;
  submissionPlatform: {
    name: string;
    disclaimer: string;
    conferenceUrl: string | null;
    /** What gets submitted through the platform, not just the final paper. */
    scopeNote: string;
  };
  academicIntegrity: {
    statement: string;
  };
  eligibility: {
    statement: string;
    geographicRestriction: string;
    schoolRecognitionNote: string;
  };
  committee: CommitteeMember[];
  committeeClosingNote: string;
  acknowledgement: string;
  contact: {
    emails: string[];
  };

  // ISO calendar days, or null where still unresolved. null is the only valid
  // "unknown" state. Every one of these renders through <TBA />.
  dates: {
    abstractDeadline: string | null;
    submissionDeadline: string | null;
    notificationDate: string | null;
    cameraReadyDeadline: string | null;
    authorRegistrationDeadline: string | null;
    earlyRegistrationDeadline: string | null;
    regularRegistrationOpens: string | null;
    conferenceStart: string | null;
    conferenceEnd: string | null;
  };
  format: {
    mode: "in-person" | "virtual" | "hybrid" | null;
    location: string | null;
  };
  registration: {
    // Prices are still undecided. No fee table, no payment link, until they
    // are — the dates below are confirmed, the amounts are not.
    feeAmount: string | null;
    feeNote: string | null;
    tiers: {
      name: string;
      amount: string | null;
      opensOn: string | null;
      deadline: string | null;
      note: string | null;
    }[];
  };
};

// Declared before `conference` so the registration tiers can reference these
// same values instead of repeating the date literals.
const dates: ConferenceData["dates"] = {
  abstractDeadline: "2027-01-24",
  submissionDeadline: "2027-02-01",
  notificationDate: "2027-04-02",
  cameraReadyDeadline: "2027-04-30",
  authorRegistrationDeadline: "2027-04-30",
  earlyRegistrationDeadline: "2027-05-14",
  regularRegistrationOpens: "2027-05-15",
  conferenceStart: "2027-07-08",
  conferenceEnd: "2027-07-10",
};

export const conference: ConferenceData = {
  name: "International NextGen Conference on AI in Biomedical Sciences",
  acronym: "inCABS",
  year: 2027,
  hostOrg: {
    name: "Global Youth AI & STEM Foundation",
    acronym: "GYST-AI",
    tagline: "Connecting Young Minds with AI and Biomedical Discovery",
    contactEmail: "gystem.ai@gmail.com",
  },
  language: "English",
  theme: {
    title: "Artificial Intelligence in Biomedical Sciences",
    description:
      "Artificial intelligence has emerged as one of the most influential technologies in modern biomedical sciences. From accelerating genomic research and drug discovery to improving clinical diagnosis and healthcare delivery, AI is redefining how scientific discoveries are made and translated into real-world applications. The conference welcomes research spanning computational, experimental, ethical, engineering, and interdisciplinary perspectives related to AI in biomedical sciences.",
  },
  tracks: [
    {
      id: "T1",
      title: "AI for Healthcare, Diagnostics, and Clinical Decision Support",
      summary:
        "Artificial intelligence is increasingly supporting clinicians and healthcare systems through improved diagnostics, predictive analytics, personalized medicine, and intelligent clinical decision-making. Research in this track focuses on the development or evaluation of AI technologies that improve patient care, healthcare accessibility, and medical decision support.",
      topics: [
        "Medical image analysis",
        "Computer vision for healthcare",
        "AI-assisted diagnosis",
        "Clinical decision support systems",
        "Disease prediction and risk assessment",
        "Precision and personalized medicine",
        "Electronic health record analytics",
        "Wearable health technologies",
        "Remote patient monitoring",
        "Telemedicine and digital healthcare",
        "Healthcare workflow optimization",
      ],
    },
    {
      id: "T2",
      title: "AI in Biomedical Research, Genomics, and Drug Discovery",
      summary:
        "Artificial intelligence has become an essential tool for accelerating biomedical discovery. This track welcomes research applying AI to biological sciences, pharmaceutical research, computational biology, and laboratory science. Students are encouraged to explore how AI can improve our understanding of biological systems, identify therapeutic targets, discover new medicines, and analyze complex biomedical datasets.",
      topics: [
        "Drug discovery",
        "Drug repurposing",
        "Protein structure prediction",
        "Computational biology",
        "Bioinformatics",
        "Genomics",
        "Transcriptomics",
        "Systems biology",
        "Biomarker discovery",
        "Molecular modeling",
        "AI-assisted laboratory automation",
        "Biomedical data analysis",
      ],
    },
    {
      id: "T3",
      title: "Responsible AI, Ethics, and Policy in Biomedicine",
      summary:
        "As AI becomes increasingly integrated into healthcare and biomedical research, ethical, legal, and societal considerations are becoming equally important. This track focuses on developing trustworthy, transparent, fair, and responsible AI systems while considering their broader impacts on individuals and society. Research addressing governance, explainability, privacy, bias, and regulatory frameworks is especially encouraged.",
      topics: [
        "Ethical AI in medicine",
        "Algorithmic bias and fairness",
        "Explainable and interpretable AI",
        "Responsible AI development",
        "Biomedical data privacy",
        "Cybersecurity for medical AI",
        "Regulatory frameworks",
        "AI governance",
        "Health equity",
        "Patient trust and transparency",
        "Societal implications of AI in healthcare",
      ],
    },
    {
      id: "T4",
      title: "Emerging AI Technologies and Future Biomedical Innovation",
      summary:
        "The future of biomedical sciences will be driven by interdisciplinary innovation. This track highlights emerging technologies that combine AI with engineering, robotics, neuroscience, biotechnology, and digital health to address future biomedical challenges. Submissions may present novel research, conceptual frameworks, prototype systems, or forward-looking analyses that demonstrate innovative applications of AI.",
      topics: [
        "Medical robotics",
        "AI-assisted surgery",
        "Brain-computer interfaces",
        "Biomedical engineering",
        "Smart prosthetics",
        "Digital twins in healthcare",
        "Internet of Medical Things (IoMT)",
        "Multi-modal AI",
        "Digital health ecosystems",
        "AI for biotechnology",
        "Future biomedical technologies",
      ],
    },
  ],
  paperRequirements: {
    language: "English",
    maxPages: 6,
    pageScopeNote: "including figures, tables, references, and appendices",
    originalityNote:
      "Submissions must present original work that has not been previously published and is not under review elsewhere.",
    fileFormat: "PDF",
    requiredSections: [
      "research motivation",
      "methodology",
      "results (where applicable)",
      "discussion",
      "limitations",
      "conclusions",
    ],
    teamsAllowed: true,
    templateName: "ACM SIG Proceedings format",
    templateUrl: "https://www.acm.org/publications/proceedings-template",
    acmDisclaimer:
      "inCABS 2027 is not affiliated with or sponsored by ACM; we use this format for consistency and readability.",
  },
  cfpDocument: {
    url: "/cfp/inCABS-2027-call-for-papers.pdf",
    // Stated up front because a lot of this audience is on metered mobile
    // data, where an unexpected 2 MB download is a real cost.
    fileSizeLabel: "PDF, 2.1 MB",
  },
  tracksNote:
    "Research is organized around four primary tracks, while remaining open to other relevant topics.",
  reviewProcess: {
    committeeName: "Technical Program Committee (TPC)",
    reviewersPerPaper: 3,
    criteria: [
      "Originality and innovation",
      "Scientific and technical merit",
      "Methodological rigor",
      "Significance and impact",
      "Relevance to the conference theme",
      "Quality of writing and organization",
    ],
  },
  presentation: {
    formats: ["Oral Presentation", "Poster Presentation"],
    inPersonNote:
      "Accepted papers are presented in person at the conference.",
    cameraReadyNote:
      "Authors of accepted papers will be required to submit a final version, called the camera-ready version, incorporating reviewer feedback, where applicable.",
    registrationRequirement:
      "At least one author of every accepted paper must register for the conference by the Author Registration Deadline and present the paper during the conference. Papers without a registered presenting author may be removed from the conference program and may not be included in the official conference proceedings.",
    publicationStatement:
      "Accepted and presented papers that satisfy all submission and registration requirements may be published in the official Proceedings of the International NextGen Conference on AI in Biomedical Sciences (inCABS 2027).",
  },
  awards: [
    { name: "Best Paper Award" },
    { name: "Best Oral Presentation Award" },
    { name: "Best Poster Presentation Award" },
    { name: "Outstanding Innovation Award" },
    { name: "Outstanding Interdisciplinary Research Award" },
  ],
  awardsClosingNote: "The Organizing Committee may announce additional awards.",
  submissionPlatform: {
    name: "Microsoft CMT",
    disclaimer:
      "The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.",
    conferenceUrl:
      "https://cmt3.research.microsoft.com/inCABS2027/Submission/Index",
    scopeNote:
      "Abstracts, full papers, and final camera-ready versions are all submitted through the same system.",
  },
  academicIntegrity: {
    statement:
      "Authors certify that submitted work represents their own original research and that all sources, data, software, and collaborative contributions have been appropriately acknowledged. The conference maintains a strict policy regarding plagiarism, fabrication, falsification, duplicate submission, and other forms of academic misconduct. Violations may result in rejection or withdrawal of submissions.",
  },
  eligibility: {
    statement:
      "The conference welcomes submissions from high school students worldwide, either individually or as a team.",
    geographicRestriction: "There are no geographic restrictions on participation.",
    schoolRecognitionNote:
      "All high schools (including homeschools) need to be recognized by their country's Ministry of Education or equivalent government organization.",
  },
  committee: [
    {
      name: "Chenlyvia Xiong",
      role: "Founding General Chair & Program Chair",
      affiliation: "Ronald Reagan High School, San Antonio, Texas",
      photoUrl: "/images/leadership/chenlyvia-xiong.jpg",
    },
    {
      name: "Zimo Wen",
      role: "Vice President of inCABS 2027",
      affiliation: "Williamsville East High School, Buffalo, New York",
      photoUrl: "/images/leadership/zimo-wen.jpg",
    },
    {
      name: "Amy Liu",
      role: "Treasurer of inCABS 2027",
      affiliation: "Round Rock High School, Round Rock, Texas",
      photoUrl: null,
    },
  ],
  committeeClosingNote: "Additional committee members will be announced.",
  acknowledgement:
    "Thank you to Sri Bhargava Bhamidi for building the initial website for inCABS.",
  contact: {
    emails: ["incabs2027@gmail.com"],
  },

  dates,
  format: {
    mode: "in-person",
    location: "Washington, D.C., USA",
  },
  registration: {
    feeAmount: null,
    feeNote: null,
    tiers: [
      {
        name: "Author Registration",
        amount: null,
        opensOn: null,
        deadline: dates.authorRegistrationDeadline,
        note: "At least one author of every accepted paper must register by this date in order to be invited to present at the conference.",
      },
      {
        name: "Early Registration",
        amount: null,
        opensOn: null,
        deadline: dates.earlyRegistrationDeadline,
        note: null,
      },
      {
        name: "Regular Registration",
        amount: null,
        opensOn: dates.regularRegistrationOpens,
        deadline: null,
        note: "Stays open until the conference daytes.",
      },
    ],
  },
};

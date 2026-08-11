// Single source of truth for every conference fact used across the site.
// Every value here traces to references/inCABS call for paper.docx.
// Unknown values are `null`, never an empty string, never a placeholder
// value intended to be replaced later. `null` is what makes `<TBA />` fire.

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
    requiredSections: string[];
    teamsAllowed: boolean;
    templateName: string;
    templateUrl: string;
    acmDisclaimer: string;
  };
  reviewProcess: {
    committeeName: string;
    reviewersPerPaper: number;
    criteria: string[];
  };
  presentation: {
    formats: string[];
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
  contact: {
    emails: string[];
  };

  // Unresolved facts (blocked on the General Chair). null is the only valid
  // "unknown" state. Every one of these renders through <TBA />.
  dates: {
    abstractDeadline: string | null;
    submissionDeadline: string | null;
    notificationDate: string | null;
    cameraReadyDeadline: string | null;
    authorRegistrationDeadline: string | null;
    conferenceStart: string | null;
    conferenceEnd: string | null;
  };
  format: {
    mode: "in-person" | "virtual" | "hybrid" | null;
    location: string | null;
  };
  registration: {
    feeAmount: string | null;
    feeNote: string | null;
    tiers: { name: string; amount: string | null; note: string | null }[];
  };
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
    conferenceUrl: null,
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
      role: "Founding General Chair, Program Chair & Founding GYST-AI President",
      affiliation: "Ronald Reagan High School, San Antonio, Texas",
      photoUrl: null,
    },
    {
      name: "Zimo Wen",
      role: "Program Secretary, GYST-AI Secretary",
      affiliation: "Williamsville East High School, Buffalo, New York",
      photoUrl: null,
    },
  ],
  committeeClosingNote: "Additional committee members will be announced.",
  contact: {
    emails: ["incabs2027@gmail.com"],
  },

  dates: {
    abstractDeadline: null,
    submissionDeadline: null,
    notificationDate: null,
    cameraReadyDeadline: null,
    authorRegistrationDeadline: null,
    conferenceStart: null,
    conferenceEnd: null,
  },
  format: {
    mode: null,
    location: null,
  },
  registration: {
    feeAmount: null,
    feeNote: null,
    tiers: [
      { name: "Early Registration", amount: null, note: null },
      { name: "Author Registration", amount: null, note: null },
      { name: "Regular Registration", amount: null, note: null },
    ],
  },
};

// Client-side "which track fits my idea?" scorer. Runs entirely in the
// browser — no network call, nothing about a student's idea ever leaves
// their device. This is a soft nudge, not a judgment: it ranks the four
// tracks in lib/conference.ts by TF-IDF cosine similarity against whatever
// the student types, using each track's topic list as its vocabulary.
//
// Why TF-IDF instead of plain keyword counting: every track summary
// mentions words like "AI" and "research," so raw overlap would treat those
// as evidence for every track equally. Weighting terms by how *distinctive*
// they are to one track (inverse document frequency across the four tracks)
// makes the score reflect what's actually unique about the student's idea.

import { conference, type Track } from "@/lib/conference";

// True English function words only. Domain words shared by every track
// summary ("AI," "research," "biomedical") are handled by idf weighting
// below, not hardcoded here — except a handful so generic that no track
// summary is complete without them, which would otherwise show up as
// spuriously "unique" filler.
const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "of", "in", "on", "at", "to",
  "for", "with", "from", "by", "as", "is", "are", "was", "were", "be",
  "been", "being", "it", "its", "this", "that", "these", "those", "i",
  "we", "our", "you", "your", "my", "me", "can", "could", "would", "will",
  "shall", "should", "may", "might", "do", "does", "did", "have", "has",
  "had", "not", "no", "so", "than", "then", "also", "using", "use", "used",
  "about", "into", "over", "under", "how", "what", "which", "who",
  "project", "idea", "study", "paper", "research", "system", "systems",
  "new", "ai", "artificial", "intelligence", "biomedical", "technology",
  "technologies", "track", "tracks", "welcomes", "welcome", "encouraged",
  "encourage", "focuses", "focus",
]);

// A light suffix trim, not a full stemmer — good enough to fold plurals
// ("diagnostics"/"diagnostic") together without over-engineering.
function stem(word: string): string {
  if (word.length > 5 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.length > 5 && /(ches|shes|xes|zes|sses)$/.test(word)) {
    return word.slice(0, -2);
  }
  if (word.length > 4 && word.endsWith("s") && !word.endsWith("ss")) {
    return word.slice(0, -1);
  }
  return word;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w))
    .map(stem);
}

// Student phrasing -> the canonical concept word it should be treated as.
// Canonical words are chosen to land inside a track's own topic list, so
// they slot straight into the normal scoring path.
const SYNONYMS: Record<string, string> = {
  cancer: "diagnosis", tumor: "diagnosis", tumour: "diagnosis",
  symptom: "diagnosis", symptoms: "diagnosis", disease: "diagnosis",
  screening: "diagnosis", screen: "diagnosis",
  // Canonical target must match the literal corpus word ("image," not
  // "imaging") — "Medical image analysis" / "Computer vision for
  // healthcare" are the actual T1 topic phrases these should land on.
  scan: "image vision", xray: "image vision", "x-ray": "image vision",
  mri: "image vision", ultrasound: "image vision", ct: "image vision",
  radiology: "image vision", photo: "image vision", photos: "image vision",
  picture: "image vision", pictures: "image vision",
  camera: "image vision", skin: "image vision", mole: "image vision",
  wearable: "monitoring", wearables: "monitoring", smartwatch: "monitoring",
  fitbit: "monitoring", sensor: "monitoring", sensors: "monitoring",
  tracking: "monitoring", vitals: "monitoring", heartrate: "monitoring",
  app: "telemedicine", apps: "telemedicine", chatbot: "telemedicine",
  virtual: "telemedicine",

  dna: "genomics", gene: "genomics", genes: "genomics",
  genetic: "genomics", genome: "genomics", sequencing: "genomics",
  medicine: "drug discovery", medicines: "drug discovery",
  pharmaceutical: "drug discovery", molecule: "drug discovery",
  molecules: "drug discovery", compound: "drug discovery",
  vaccine: "drug discovery", protein: "bioinformatics",
  proteins: "bioinformatics", folding: "bioinformatics",

  fair: "bias", unfair: "bias", discrimination: "bias",
  discriminate: "bias", hipaa: "privacy", confidential: "privacy",
  anonymize: "privacy", anonymized: "privacy", regulation: "governance",
  regulations: "governance", law: "governance", laws: "governance",
  legal: "governance", policy: "governance",

  robot: "robotics", robots: "robotics", robotic: "robotics",
  surgery: "surgery", surgical: "surgery", bci: "brain-computer",
  brain: "brain-computer", neural: "brain-computer",
  neuroscience: "brain-computer", implant: "brain-computer",
  implants: "brain-computer", prosthetic: "prosthetics",
  prosthesis: "prosthetics", limb: "prosthetics", limbs: "prosthetics",
  iot: "internet of medical things",
};

function expandTerms(tokens: string[]): string[] {
  const expanded = [...tokens];
  for (const token of tokens) {
    const canonical = SYNONYMS[token];
    if (canonical) expanded.push(...tokenize(canonical));
  }
  return expanded;
}

type TopicPhrase = { text: string; tokens: string[] };

type TrackModel = {
  track: Track;
  vector: Map<string, number>;
  norm: number;
  topicPhrases: TopicPhrase[];
};

let cachedModel: TrackModel[] | null = null;

function buildModel(): TrackModel[] {
  if (cachedModel) return cachedModel;

  const docs = conference.tracks.map((track) => {
    const topicPhrases: TopicPhrase[] = track.topics.map((topic) => ({
      text: topic,
      tokens: tokenize(topic),
    }));
    // Topics are the vocabulary reviewers actually use to file a paper, so
    // they count 3x more than words pulled from the prose summary.
    const weightedTokens = [
      ...topicPhrases.flatMap((p) => [...p.tokens, ...p.tokens, ...p.tokens]),
      ...tokenize(`${track.title} ${track.summary}`),
    ];
    return { track, topicPhrases, tokens: weightedTokens };
  });

  const trackCount = docs.length;
  const documentFrequency = new Map<string, number>();
  for (const { tokens } of docs) {
    for (const term of new Set(tokens)) {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
    }
  }

  cachedModel = docs.map(({ track, tokens, topicPhrases }) => {
    const termFrequency = new Map<string, number>();
    for (const term of tokens) {
      termFrequency.set(term, (termFrequency.get(term) ?? 0) + 1);
    }

    const vector = new Map<string, number>();
    for (const [term, count] of termFrequency) {
      const df = documentFrequency.get(term) ?? 0;
      const idf = Math.log((trackCount + 1) / (df + 1)) + 1;
      vector.set(term, count * idf);
    }

    const norm = Math.sqrt(
      [...vector.values()].reduce((sum, weight) => sum + weight * weight, 0)
    );
    return { track, vector, norm, topicPhrases };
  });

  return cachedModel;
}

export type TrackRecommendation = {
  track: Track;
  score: number; // cosine similarity, 0..1
  matchedTopics: string[];
};

export function recommendTracks(input: string): TrackRecommendation[] {
  const model = buildModel();
  const queryTokens = expandTerms(tokenize(input));
  if (queryTokens.length === 0) return [];

  const queryCounts = new Map<string, number>();
  for (const term of queryTokens) {
    queryCounts.set(term, (queryCounts.get(term) ?? 0) + 1);
  }
  const querySet = new Set(queryTokens);
  const queryNorm = Math.sqrt(
    [...queryCounts.values()].reduce((sum, c) => sum + c * c, 0)
  );

  const results = model.map(({ track, vector, norm, topicPhrases }) => {
    let dot = 0;
    for (const [term, count] of queryCounts) {
      const weight = vector.get(term);
      if (weight) dot += count * weight;
    }
    const score = norm === 0 || queryNorm === 0 ? 0 : dot / (norm * queryNorm);

    const matchedTopics = topicPhrases
      .map((phrase) => ({
        text: phrase.text,
        weight: phrase.tokens.reduce(
          (sum, term) => sum + (querySet.has(term) ? vector.get(term) ?? 0 : 0),
          0
        ),
      }))
      .filter((p) => p.weight > 0)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3)
      .map((p) => p.text);

    return { track, score, matchedTopics };
  });

  return results.sort((a, b) => b.score - a.score);
}

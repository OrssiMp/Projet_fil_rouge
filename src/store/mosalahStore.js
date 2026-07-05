import { reactive } from "vue";

const STORAGE_KEY = "mosalah_store_v1";

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

function makeSeed() {
  return {
    offers: [
      {
        id: 1,
        title: "Développeur Fullstack React/Node.js",
        company: "TechNova Solutions",
        location: "Paris (Hybride)",
        region: "Brazzaville",
        type: "CDI",
        sector: "Tech",
        postedAt: "2 jours",
        hasApplied: true,
        shortDescription:
          "Nous recherchons un développeur Fullstack expérimenté pour rejoindre notre équipe produit. Vous travaillerez sur des applications web à fort trafic, en utilisant les dernières technologies de l'écosystème...",
      },
      {
        id: 2,
        title: "Data Analyst Senior",
        company: "FinData Partners",
        location: "Lyon",
        region: "Pointe-Noire",
        type: "CDI",
        sector: "Data",
        postedAt: "4 jours",
        hasApplied: false,
        shortDescription:
          "En tant que Data Analyst Senior, vous accompagnerez nos clients dans la compréhension de leurs données financières. Maîtrise de SQL, Python et des outils de BI (Tableau, PowerBI) indispensable.",
      },
      {
        id: 3,
        title: "Chef de Projet Marketing Digital",
        company: "Agence Creative Pulse",
        location: "100% Remote",
        region: "Remote",
        type: "CDD (6 mois)",
        sector: "Marketing",
        postedAt: "1 semaine",
        hasApplied: false,
        shortDescription:
          "Pilotez nos campagnes digitales pour des clients internationaux. Vous coordonnerez les équipes de création et de média pour assurer le succès et le ROI des opérations.",
      },
    ],
    jobRequests: [],
    applications: [],
  };
}

function loadFromStorage() {
  if (typeof window === "undefined") {
    return makeSeed();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return makeSeed();

  const parsed = safeParse(raw, null);
  if (!parsed || typeof parsed !== "object") return makeSeed();

  return {
    offers: Array.isArray(parsed.offers) ? parsed.offers : [],
    jobRequests: Array.isArray(parsed.jobRequests) ? parsed.jobRequests : [],
    applications: Array.isArray(parsed.applications) ? parsed.applications : [],
  };
}

const initial = loadFromStorage();

export const mosalahState = reactive({
  offers: initial.offers,
  jobRequests: initial.jobRequests,
  applications: initial.applications,
});

let persistTimer = null;

function persist() {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      offers: mosalahState.offers,
      jobRequests: mosalahState.jobRequests,
      applications: mosalahState.applications,
    }),
  );
}

function schedulePersist() {
  if (persistTimer) window.clearTimeout(persistTimer);
  persistTimer = window.setTimeout(() => {
    persist();
    persistTimer = null;
  }, 50);
}

// Persistance (simple, efficace pour un store local)
// Note: on ne peut pas utiliser watch ici (pas de setup), donc on persiste via schedulePersist dans les mutations.

export function addOffer(offer) {
  const normalized = {
    id: offer?.id ?? Date.now(),
    title: offer?.title ?? "",
    company: offer?.company ?? offer?.entreprise ?? "",
    location: offer?.location ?? "",
    region: offer?.region ?? "",
    type: offer?.type ?? "",
    sector: offer?.sector ?? "",
    postedAt: offer?.postedAt ?? new Date().toLocaleDateString("fr-FR"),
    shortDescription: offer?.shortDescription ?? offer?.description ?? "",
    salary: offer?.salary ?? "",
    status: offer?.status ?? "Actif",
    views: offer?.views ?? 0,
    applications: offer?.applications ?? 0,
  };

  mosalahState.offers.unshift(normalized);
  schedulePersist();
  return normalized;
}

export function addJobRequest(jobRequest) {
  const normalized = {
    id: jobRequest?.id ?? `jr_${Date.now()}`,
    title: jobRequest?.title ?? "",
    job: jobRequest?.job ?? "",
    sector: jobRequest?.sector ?? "",
    location: jobRequest?.location ?? "",
    mobility: !!jobRequest?.mobility,
    availability: jobRequest?.availability ?? "Immédiate",
    presentation: jobRequest?.presentation ?? "",
    skills: Array.isArray(jobRequest?.skills) ? jobRequest.skills : [],
    createdAt: jobRequest?.createdAt ?? new Date().toLocaleDateString("fr-FR"),
  };

  mosalahState.jobRequests.unshift(normalized);
  schedulePersist();
  return normalized;
}

export function addApplication(application) {
  const normalized = {
    id: application?.id ?? `app_${Date.now()}`,
    offerId: application?.offerId ?? application?.offer?.id,
    jobRequestId: application?.jobRequestId ?? application?.jobRequest?.id,
    candidateName: application?.candidateName ?? "",
    entrepriseName: application?.entrepriseName ?? "",
    coverLetter: application?.coverLetter ?? "",
    createdAt: application?.createdAt ?? new Date().toLocaleDateString("fr-FR"),
    status: application?.status ?? "Envoyée",
  };

  mosalahState.applications.unshift(normalized);
  schedulePersist();
  return normalized;
}

export function resetStore() {
  const seed = makeSeed();
  mosalahState.offers.splice(0, mosalahState.offers.length, ...seed.offers);
  mosalahState.jobRequests.splice(
    0,
    mosalahState.jobRequests.length,
    ...seed.jobRequests,
  );
  mosalahState.applications.splice(
    0,
    mosalahState.applications.length,
    ...seed.applications,
  );
  schedulePersist();
}

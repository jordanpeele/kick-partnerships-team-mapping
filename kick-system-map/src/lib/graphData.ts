import { GraphData } from './types';

export const graphData: GraphData = {
  nodes: [
    // ═══════════════════════════════════════════
    // EXECUTIVE LAYER
    // ═══════════════════════════════════════════
    {
      id: 'craven',
      label: 'Ed Craven',
      role: 'CEO & Co-Founder',
      type: 'decision_maker',
      weight: 5,
      cluster: 'exec',
      location: 'Melbourne, AU',
      confidence: 'high',
      x_handle: '@StakeEddie',
      power: { capital_control: 5, deal_authority: 5, narrative_influence: 4, network_centrality: 5 },
      description: 'Ultimate decision-maker on all major creator deals. Personally negotiated xQc ($100M), offered $140M package to Kai Cenat/IShowSpeed/Adin Ross. Shifted strategy from lump-sum mega-deals to merit-based KPP in 2025. Controls 33.33% of Easygo via Ashwood Holdings.',
      detail:
        'Personally negotiates mega-deals ($10M+). Offered $140M to Kai Cenat/IShowSpeed/Adin Ross. Publicly shifted strategy to merit-based deals (2025). Hosts weekly Kick Talk podcast. Controls 33.33% of Easygo via Ashwood Holdings.',
    },
    {
      id: 'tehrani',
      label: 'Bijan Tehrani',
      role: 'Co-Founder & Majority Shareholder',
      type: 'decision_maker',
      weight: 4,
      cluster: 'exec',
      location: 'Melbourne, AU',
      confidence: 'high',
      x_handle: '@BijanTehrani',
      power: { capital_control: 5, deal_authority: 4, narrative_influence: 2, network_centrality: 3 },
      description: 'Majority shareholder (66.67% of Easygo). Ultimate financial authority — can override any deal. Lower public visibility but absolute veto power on capital allocation. Publicly confirmed Asmongold joined with standard terms.',
      detail:
        'Controls 66.67% of Easygo Entertainment. Ultimate financial authority. Publicly confirmed Asmongold joined with no special deal. Driving force behind Kick business model and 95/5 revenue split.',
    },
    {
      id: 'pena',
      label: 'Brais Pena Sanchez',
      role: 'CSO (Easygo) / Director, Kick Streaming Pty Ltd',
      type: 'decision_maker',
      weight: 4,
      cluster: 'exec',
      location: 'Melbourne, AU',
      confidence: 'high',
      power: { capital_control: 4, deal_authority: 3, narrative_influence: 1, network_centrality: 3 },
      description: 'Board-level strategist spanning Easygo portfolio (Kick + Stake). Shapes partnership budgets, market entry priorities, and regional expansion strategy. Background in regulated gaming (GLI, Luckia Gaming Group).',
      detail:
        'Board-level position at both Easygo (parent) and Kick entity. Approves strategic direction shaping partnership budgets and priorities. Background: GLI, Luckia Gaming Group.',
    },

    // ═══════════════════════════════════════════
    // DEAL ENGINE
    // ═══════════════════════════════════════════
    {
      id: 'santamaria',
      label: 'Andrew Santamaria',
      role: 'Head of Strategic Partnerships / KICK Studios',
      type: 'operator',
      weight: 5,
      cluster: 'deal',
      location: 'United States',
      confidence: 'high',
      x_handle: '@Svntvmvriv',
      power: { capital_control: 3, deal_authority: 5, narrative_influence: 3, network_centrality: 5 },
      description: 'The operational center of KICK\'s partnership machine. 6 direct reports. Runs KCIP/KPP, negotiates with agencies, manages DreamHack activations and OTK/KICK Studios. The person creators and agencies interact with most. Previously Executive Producer at Amazon Games.',
      detail:
        'PRIMARY partnerships person. 6 direct reports. Runs KCIP/KPP rollout. Led DreamHack Atlanta (33 partners), DreamHack Dallas AMA. Publicly responded to Nickmercs gambling-clause controversy. Co-hosts Kick Talk. Previously Executive Producer at Amazon Games.',
    },
    {
      id: 'tierney',
      label: 'Oliver Tierney',
      role: 'Account Manager (Esports)',
      type: 'execution',
      weight: 2,
      cluster: 'deal',
      location: 'Australia',
      confidence: 'high',
      power: { capital_control: 1, deal_authority: 2, narrative_influence: 2, network_centrality: 2 },
      description: 'Manages esports partnership accounts: ESL, BLAST, PGL, Team Secret. Retired CS:GO pro "DickStacy" — brings deep esports network credibility. Identified as "Kick Account Manager" in Dexerto interview.',
      detail:
        'Retired CS:GO pro "DickStacy." Manages esports partnerships: ESL, BLAST, PGL, Team Secret. Identified as "Kick Account Manager" in Dexerto interview.',
    },

    // ═══════════════════════════════════════════
    // PROGRAM ENGINE
    // ═══════════════════════════════════════════
    {
      id: 'gole',
      label: 'Rohan Gole',
      role: 'Partnerships Technical Lead',
      type: 'execution',
      weight: 3,
      cluster: 'program',
      location: 'Melbourne, AU',
      confidence: 'high',
      power: { capital_control: 1, deal_authority: 2, narrative_influence: 1, network_centrality: 3 },
      description: 'Handles partnership integrations, technical onboarding, and account management for the KPP pipeline. Background: Head of Talent at Trinity Gaming India, Influencer Manager at Team RawKnee. Key link between deal-making and delivery.',
      detail:
        'Handles partnership integrations and technical onboarding. Background: Head of Talent at Trinity Gaming India, Influencer Manager at Team RawKnee.',
    },
    {
      id: 'kerai',
      label: 'Darshil Kerai',
      role: 'Partnership & Account Manager',
      type: 'execution',
      weight: 2,
      cluster: 'program',
      location: 'Melbourne, AU',
      confidence: 'medium',
      power: { capital_control: 1, deal_authority: 1, narrative_influence: 1, network_centrality: 2 },
      description: 'Partner onboarding and ongoing account management. Processes kickpartners@kick.com applications. Previously at MicroSourcing, Spintly, Eli Lilly.',
      detail:
        'Partner onboarding and account management. Previously at MicroSourcing, Spintly, Eli Lilly.',
    },
    {
      id: 'diaz',
      label: 'Daniela Diaz',
      role: 'Account Manager',
      type: 'execution',
      weight: 2,
      cluster: 'program',
      location: 'Melbourne, AU',
      confidence: 'medium',
      power: { capital_control: 1, deal_authority: 1, narrative_influence: 1, network_centrality: 2 },
      description: 'Creator/partner account management. Handles ongoing relationship maintenance for active partners. Previously at Journal Student Living.',
      detail:
        'Creator/partner account management. Previously at Journal Student Living.',
    },

    // ═══════════════════════════════════════════
    // GROWTH ENGINE
    // ═══════════════════════════════════════════
    {
      id: 'trainwreck',
      label: 'Trainwreckstv',
      role: 'Co-Founder / Head of Community',
      type: 'influencer',
      weight: 4,
      cluster: 'growth',
      location: 'United States',
      confidence: 'high',
      x_handle: '@Trainwreckstv',
      power: { capital_control: 2, deal_authority: 3, narrative_influence: 5, network_centrality: 4 },
      description: 'The narrative engine of KICK. Shaped creator-first identity, announced "$1M contracts with 100 people." Key relationship-builder with the streamer community. Title oscillates between "advisor" and "co-founder." Instrumental in establishing the 95/5 split that defines KICK.',
      detail:
        'Shaped Kick\'s creator-first identity. Announced "$1M contracts with 100 people." Key relationship-builder with streamer community. Title oscillates between "advisor" and "co-founder." Instrumental in establishing 95/5 split.',
    },
    {
      id: 'rodrigo',
      label: 'Chris Rodrigo',
      role: 'Media Partnerships (unconfirmed)',
      type: 'execution',
      weight: 1,
      cluster: 'growth',
      location: 'France',
      confidence: 'low',
      power: { capital_control: 1, deal_authority: 1, narrative_influence: 1, network_centrality: 1 },
      description: 'LinkedIn says "Kick Com." Instagram: @chris_rodrigo_kickcom. Previously Head of Media Partnerships at ASO (Tour de France organizer). Exact role and involvement unclear.',
      detail:
        'LinkedIn says "Kick Com." Instagram: @chris_rodrigo_kickcom. Previously Head of Media Partnerships at ASO (Tour de France). Exact role unclear.',
    },

    // ═══════════════════════════════════════════
    // PRODUCT
    // ═══════════════════════════════════════════
    {
      id: 'chianese',
      label: 'Paul Chianese',
      role: 'Co-Founder & Head of Product',
      type: 'operator',
      weight: 3,
      cluster: 'product',
      location: 'Santa Rosa Beach, FL',
      confidence: 'high',
      power: { capital_control: 2, deal_authority: 2, narrative_influence: 2, network_centrality: 3 },
      description: 'Co-founded Kick Oct 2022. Owns platform product roadmap and creator tools — the infrastructure deals run on. Creator monetization features, subscription system, and streaming tech all flow through product. Also Founder/CEO of TradeArcadeTV.',
      detail:
        'Co-founded Kick Oct 2022. Owns product roadmap and creator tools. Also Founder/CEO of TradeArcadeTV. BS in Marketing from Fairfield University.',
    },

    // ═══════════════════════════════════════════
    // OPERATIONS
    // ═══════════════════════════════════════════
    {
      id: 'webb',
      label: 'Ryan Webb',
      role: 'Head of Operations / Growth & Revenue',
      type: 'operator',
      weight: 3,
      cluster: 'ops',
      location: 'Melbourne, AU',
      confidence: 'high',
      power: { capital_control: 2, deal_authority: 2, narrative_influence: 1, network_centrality: 3 },
      description: 'Since June 2024. 1 direct report. Manages operational infrastructure — Streamlabs integration, trust & safety, growth strategy. Previously Head of Customer Operations at Easygo. The connective tissue between partnerships and platform delivery.',
      detail:
        'Since June 2024. 1 direct report. Previously Head of Customer Operations at Easygo. Involved in Streamlabs integration and trust & safety.',
    },
    {
      id: 'carbajal',
      label: 'Nicolas Carbajal',
      role: 'Commercial Director',
      type: 'operator',
      weight: 3,
      cluster: 'ops',
      location: 'Melbourne, AU (likely)',
      confidence: 'medium',
      power: { capital_control: 3, deal_authority: 3, narrative_influence: 1, network_centrality: 2 },
      description: 'Reports to Ed Craven per TheOrg. Reviews commercial/financial terms on deals — the commercial gate before contracts close. Note: may overlap with separate "Kick Invest" entity in Uruguay.',
      detail:
        'Reports to Ed Craven per TheOrg. Reviews commercial/financial terms on deals. Note: may overlap with separate "Kick Invest" entity in Uruguay — treat with caution.',
    },

    // ═══════════════════════════════════════════
    // EXTERNAL NODES
    // ═══════════════════════════════════════════
    {
      id: 'evolved',
      label: 'Evolved Talent Agency',
      role: 'Primary talent agency for mega-deals',
      type: 'external',
      weight: 4,
      cluster: 'external',
      confidence: 'high',
      power: { capital_control: 1, deal_authority: 4, narrative_influence: 3, network_centrality: 4 },
      description: 'Ryan Morrison (CEO) and Sebastien Delvaux (COO). Negotiated xQc\'s $70-100M deal and Amouranth\'s $30-40M deal. The primary external counterparty in KICK mega-deals. Morrison: "There hasn\'t been a single contractor deal he\'s ever done that I didn\'t personally negotiate."',
      detail:
        'Ryan Morrison (CEO) and Sebastien Delvaux (COO). Negotiated xQc\'s $70-100M deal and Amouranth\'s $30-40M deal. Morrison stated: "There hasn\'t been a single contractor deal he\'s ever done that I didn\'t personally negotiate."',
    },
    {
      id: 'crossrealm',
      label: 'Cross Realm Inc. (OTK)',
      role: 'Fast Track Partner Program',
      type: 'external',
      weight: 3,
      cluster: 'external',
      confidence: 'high',
      power: { capital_control: 1, deal_authority: 2, narrative_influence: 3, network_centrality: 3 },
      description: 'Autonomous subsidiary of OTK Network. Runs KICK Partner Fast Track Program (March 2025). Proxy partnerships channel — streamers with 100+ avg viewers skip standard requirements. Extends KICK\'s reach without adding internal headcount.',
      detail:
        'Autonomous subsidiary of OTK Network. Runs KICK Partner Fast Track Program (March 2025). Streamers with 100+ avg viewers can skip standard requirements. No hour requirements, personal partner manager assigned.',
    },
    {
      id: 'streamscharts',
      label: 'Streams Charts',
      role: 'Data partner / Kick Road campaign',
      type: 'external',
      weight: 2,
      cluster: 'external',
      confidence: 'high',
      power: { capital_control: 1, deal_authority: 1, narrative_influence: 2, network_centrality: 2 },
      description: '$50K prize pool Kick Road campaign for emerging streamers (<100 CCV). Provides data infrastructure — real-time leaderboard tracking. Winners announced at DreamHack Dallas.',
      detail:
        '$50K prize pool Kick Road campaign for emerging streamers (<100 CCV). Real-time leaderboard tracking. Winners announced at DreamHack Dallas.',
    },
    {
      id: 'kickpartners',
      label: 'kickpartners@kick.com',
      role: 'Partner Program intake',
      type: 'external',
      weight: 3,
      cluster: 'program',
      confidence: 'high',
      power: { capital_control: 1, deal_authority: 1, narrative_influence: 1, network_centrality: 4 },
      description: 'Central intake email for all Partner Program applications. Every KPP applicant flows through this address. Creators email from their registered Kick email with their Kick username. Manual review takes 1-2 weeks.',
      detail:
        'Central intake email for all Partner Program applications. Creators email from their registered Kick email with their Kick username. Manual review takes 1-2 weeks.',
    },
    {
      id: 'ufc',
      label: 'UFC Partnership',
      role: 'Global marketing partnership',
      type: 'external',
      weight: 2,
      cluster: 'external',
      confidence: 'high',
      power: { capital_control: 1, deal_authority: 1, narrative_influence: 3, network_centrality: 1 },
      description: 'October 2024 global marketing partnership. Kick branding inside the Octagon during select PPVs and Fight Nights. Dedicated UFC channel on Kick. Reaches 700M+ fans in 170 countries, 975M broadcast households.',
      detail:
        'October 2024. Kick branding inside the Octagon during select PPVs and Fight Nights. Dedicated UFC channel on Kick. Reaches 700M+ fans in 170 countries.',
    },
    {
      id: 'sauber',
      label: 'Sauber F1 / KICK Sauber',
      role: 'Title sponsorship (F1)',
      type: 'external',
      weight: 2,
      cluster: 'external',
      confidence: 'high',
      power: { capital_control: 1, deal_authority: 1, narrative_influence: 3, network_centrality: 1 },
      description: 'Naming rights since 2023. "Stake F1 Team Kick Sauber." Kick branding replaces Stake in markets where gambling advertising is restricted — strategic brand-washing function.',
      detail:
        'Naming rights since 2023. "Stake F1 Team Kick Sauber." Kick branding replaces Stake in markets where gambling ads are restricted.',
    },
  ],
  edges: [
    // ── EXECUTIVE REPORTING ──
    { source: 'santamaria', target: 'craven', type: 'reports_to', strength: 5 },
    { source: 'chianese', target: 'craven', type: 'reports_to', strength: 4 },
    { source: 'webb', target: 'craven', type: 'reports_to', strength: 4 },
    { source: 'carbajal', target: 'craven', type: 'reports_to', strength: 3 },
    { source: 'pena', target: 'tehrani', type: 'reports_to', strength: 3 },

    // ── TEAM STRUCTURE ──
    { source: 'gole', target: 'santamaria', type: 'reports_to', strength: 4 },
    { source: 'kerai', target: 'santamaria', type: 'reports_to', strength: 3 },
    { source: 'tierney', target: 'santamaria', type: 'reports_to', strength: 3 },
    { source: 'diaz', target: 'santamaria', type: 'reports_to', strength: 3 },

    // ── INFLUENCE FLOWS ──
    { source: 'trainwreck', target: 'craven', type: 'influences', strength: 4, label: 'Creator strategy & recruitment advocacy' },
    { source: 'trainwreck', target: 'santamaria', type: 'influences', strength: 3, label: 'Creator introductions & community signal' },
    { source: 'pena', target: 'craven', type: 'influences', strength: 4, label: 'Board-level strategic oversight' },
    { source: 'tehrani', target: 'craven', type: 'influences', strength: 5, label: 'Financial authority (66.67% owner)' },

    // ── DEAL NEGOTIATIONS ──
    { source: 'craven', target: 'evolved', type: 'negotiates_with', strength: 5, label: 'Mega-deal negotiations ($10M+)' },
    { source: 'santamaria', target: 'evolved', type: 'negotiates_with', strength: 4, label: 'Deal structure & terms' },
    { source: 'santamaria', target: 'crossrealm', type: 'negotiates_with', strength: 3, label: 'Fast Track program operations' },
    { source: 'carbajal', target: 'pena', type: 'collaborates_with', strength: 3, label: 'Commercial/financial review' },

    // ── COLLABORATION ──
    { source: 'santamaria', target: 'carbajal', type: 'collaborates_with', strength: 3, label: 'Deal commercial terms' },
    { source: 'santamaria', target: 'webb', type: 'collaborates_with', strength: 3, label: 'Growth alignment' },
    { source: 'webb', target: 'chianese', type: 'collaborates_with', strength: 2, label: 'Product / Growth coordination' },
    { source: 'santamaria', target: 'streamscharts', type: 'collaborates_with', strength: 2, label: 'Kick Road campaign' },

    // ── EXECUTION ──
    { source: 'gole', target: 'kickpartners', type: 'executes', strength: 4, label: 'Technical onboarding' },
    { source: 'kerai', target: 'kickpartners', type: 'executes', strength: 3, label: 'Partner onboarding & management' },
    { source: 'tierney', target: 'ufc', type: 'executes', strength: 2, label: 'Esports account management' },
    { source: 'tierney', target: 'sauber', type: 'executes', strength: 2, label: 'Esports account management' },
    { source: 'santamaria', target: 'kickpartners', type: 'executes', strength: 4, label: 'Program oversight' },
  ],
};

// ═══════════════════════════════════════════
// VIEW PRESETS
// ═══════════════════════════════════════════

export interface ViewFilter {
  label: string;
  description: string;
  edgeTypes: readonly EdgeType[];
  highlightNodes: string[];
  showAllNodes?: boolean; // heat mode shows all nodes regardless of edge filter
  fadeNonHighlighted?: boolean;
}

type EdgeType = typeof graphData.edges[number]['type'];

export const viewFilters: Record<string, ViewFilter> = {
  influence: {
    label: 'Influence',
    description: 'Who shapes decisions',
    edgeTypes: ['influences', 'negotiates_with'],
    highlightNodes: ['craven', 'santamaria', 'trainwreck', 'tehrani', 'pena', 'evolved'],
  },
  org: {
    label: 'Reporting',
    description: 'Reporting lines',
    edgeTypes: ['reports_to'],
    highlightNodes: ['craven', 'santamaria', 'webb', 'chianese', 'carbajal'],
  },
  dealflow: {
    label: 'Deal Flow',
    description: 'How deals move',
    edgeTypes: ['negotiates_with', 'executes', 'collaborates_with'],
    highlightNodes: ['craven', 'santamaria', 'evolved', 'crossrealm', 'kickpartners', 'gole'],
  },
  heat: {
    label: 'Heat',
    description: 'Power concentration',
    edgeTypes: ['influences', 'negotiates_with'],
    highlightNodes: ['craven', 'santamaria', 'trainwreck', 'tehrani', 'evolved'],
    showAllNodes: true,
    fadeNonHighlighted: true,
  },
  case_xqc: {
    label: 'Case: xQc',
    description: '$100M deal path',
    edgeTypes: ['negotiates_with', 'influences', 'reports_to'],
    highlightNodes: ['craven', 'santamaria', 'evolved', 'tehrani', 'trainwreck'],
    fadeNonHighlighted: true,
  },
};

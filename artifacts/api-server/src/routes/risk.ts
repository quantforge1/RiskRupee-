import { Router, type IRouter } from "express";
import {
  GetCompliancePostureResponse,
  GetRiskActivityResponse,
  GetRiskControlsResponse,
  GetRiskOverviewResponse,
  GetRiskScenarioParams,
  GetRiskScenarioResponse,
  GetRiskScenariosResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const overview = {
  expectedLoss: 48200000,
  lossChange: -12.4,
  var95: 116000000,
  riskScore: 62,
  protectedAssets: 184,
  controlCoverage: 78,
  lastUpdated: "29 Aug 2026, 09:42 IST",
};

const scenarios = [
  {
    id: "ransomware-prod",
    name: "Ransomware — production estate",
    category: "Availability",
    status: "critical",
    expectedLoss: 21400000,
    likelihood: 0.28,
    impact: 7.6,
    trend: 8.2,
    owner: "Ananya Rao",
    updatedAt: "2h ago",
    explanation:
      "A privileged identity compromise could encrypt the payments and ERP estate. Recovery time and contractual penalties make this the largest near-term loss driver.",
    breakdown: {
      frequency: 1.7,
      vulnerability: 0.28,
      lossMagnitude: 42000000,
      responseCost: 8400000,
      regulatoryFines: 4200000,
      businessImpact: 10800000,
    },
  },
  {
    id: "upi-fraud",
    name: "UPI transaction fraud",
    category: "Fraud",
    status: "elevated",
    expectedLoss: 8600000,
    likelihood: 0.42,
    impact: 3.4,
    trend: -3.4,
    owner: "Vikram Shah",
    updatedAt: "5h ago",
    explanation:
      "Transaction velocity controls are reducing exposure, but an account-takeover wave across merchant APIs would still create material direct loss and customer remediation effort.",
    breakdown: {
      frequency: 4.1,
      vulnerability: 0.42,
      lossMagnitude: 17000000,
      responseCost: 2100000,
      regulatoryFines: 1600000,
      businessImpact: 4900000,
    },
  },
  {
    id: "vendor-breach",
    name: "Critical vendor compromise",
    category: "Third-party",
    status: "elevated",
    expectedLoss: 7400000,
    likelihood: 0.31,
    impact: 3.1,
    trend: 2.1,
    owner: "Meera Joshi",
    updatedAt: "1d ago",
    explanation:
      "The payments processor and support BPO retain access to sensitive workflows. Concentration risk is high while evidence collection across vendors remains manual.",
    breakdown: {
      frequency: 2.4,
      vulnerability: 0.31,
      lossMagnitude: 18000000,
      responseCost: 2000000,
      regulatoryFines: 1300000,
      businessImpact: 4100000,
    },
  },
  {
    id: "cloud-misconfig",
    name: "Cloud data misconfiguration",
    category: "Confidentiality",
    status: "monitored",
    expectedLoss: 5200000,
    likelihood: 0.24,
    impact: 2.7,
    trend: -11.8,
    owner: "Arjun Menon",
    updatedAt: "2d ago",
    explanation:
      "Continuous posture checks have closed most public exposure paths. Residual risk sits in inherited IAM permissions and long-lived service accounts.",
    breakdown: {
      frequency: 1.9,
      vulnerability: 0.24,
      lossMagnitude: 15000000,
      responseCost: 1400000,
      regulatoryFines: 1200000,
      businessImpact: 2600000,
    },
  },
  {
    id: "insider-exfiltration",
    name: "Insider data exfiltration",
    category: "Data loss",
    status: "monitored",
    expectedLoss: 3400000,
    likelihood: 0.18,
    impact: 2.2,
    trend: -6.3,
    owner: "Ananya Rao",
    updatedAt: "3d ago",
    explanation:
      "User-behaviour signals cover privileged users, with a monitoring gap in contractor endpoints. The exposure is contained but not yet within board-approved tolerance.",
    breakdown: {
      frequency: 1.2,
      vulnerability: 0.18,
      lossMagnitude: 12000000,
      responseCost: 800000,
      regulatoryFines: 900000,
      businessImpact: 1700000,
    },
  },
  {
    id: "regulatory-reporting",
    name: "Regulatory reporting breach",
    category: "Compliance",
    status: "controlled",
    expectedLoss: 2200000,
    likelihood: 0.12,
    impact: 1.8,
    trend: -18.5,
    owner: "Ritu Bhatia",
    updatedAt: "4d ago",
    explanation:
      "Incident evidence retention and escalation playbooks are now mapped to CERT-In and RBI timelines. Remaining exposure is driven by third-party notification dependencies.",
    breakdown: {
      frequency: 0.9,
      vulnerability: 0.12,
      lossMagnitude: 9000000,
      responseCost: 600000,
      regulatoryFines: 800000,
      businessImpact: 800000,
    },
  },
];

const controls = [
  {
    id: "identity-hardening",
    name: "Privileged identity hardening",
    domain: "Identity",
    cost: 4800000,
    reduction: 1.36,
    selected: true,
    status: "Implemented",
    rationale: "Removes standing admin access from 32 high-impact workflows.",
  },
  {
    id: "edr-expansion",
    name: "EDR coverage expansion",
    domain: "Endpoint",
    cost: 6200000,
    reduction: 1.08,
    selected: false,
    status: "Recommended",
    rationale: "Closes telemetry gaps across 146 branch and contractor endpoints.",
  },
  {
    id: "immutable-backup",
    name: "Immutable recovery vault",
    domain: "Resilience",
    cost: 8600000,
    reduction: 1.74,
    selected: false,
    status: "Recommended",
    rationale: "Cuts ransomware recovery variance by protecting clean restore points.",
  },
  {
    id: "vendor-monitoring",
    name: "Continuous vendor monitoring",
    domain: "Third-party",
    cost: 3400000,
    reduction: 0.63,
    selected: false,
    status: "Planned",
    rationale: "Automates evidence collection for 18 critical service providers.",
  },
  {
    id: "dlp-upgrade",
    name: "Data loss prevention upgrade",
    domain: "Data",
    cost: 7100000,
    reduction: 0.82,
    selected: false,
    status: "Evaluating",
    rationale: "Adds policy enforcement to high-risk exports and contractor flows.",
  },
  {
    id: "soc-automation",
    name: "SOC response automation",
    domain: "Operations",
    cost: 3900000,
    reduction: 0.71,
    selected: false,
    status: "Recommended",
    rationale: "Reduces mean time to contain identity and endpoint alerts.",
  },
];

const compliance = [
  {
    framework: "CERT-In",
    requirement: "Incident reporting within 6 hours",
    status: "compliant",
    coverage: 94,
    dueDate: "Continuous",
    owner: "Ritu Bhatia",
  },
  {
    framework: "RBI",
    requirement: "Cyber security controls for digital payments",
    status: "attention",
    coverage: 82,
    dueDate: "30 Sep 2026",
    owner: "Vikram Shah",
  },
  {
    framework: "SEBI CSCRF",
    requirement: "Cyber resilience and assurance evidence",
    status: "attention",
    coverage: 76,
    dueDate: "15 Oct 2026",
    owner: "Meera Joshi",
  },
  {
    framework: "DPDP",
    requirement: "Personal data safeguards and breach response",
    status: "gap",
    coverage: 61,
    dueDate: "31 Dec 2026",
    owner: "Arjun Menon",
  },
];

const activity = [
  {
    id: "act-1",
    type: "optimizer",
    title: "Control allocation recalculated",
    detail: "Immutable recovery vault moved into the ₹2.5 Cr optimal set.",
    actor: "RiskRupee engine",
    timestamp: "12 min ago",
  },
  {
    id: "act-2",
    type: "assessment",
    title: "Vendor evidence uploaded",
    detail: "SOC 2 Type II evidence added for RazorPay settlement partner.",
    actor: "Meera Joshi",
    timestamp: "48 min ago",
  },
  {
    id: "act-3",
    type: "alert",
    title: "Risk threshold crossed",
    detail: "Production ransomware scenario is 8.2% above last week.",
    actor: "RiskRupee monitor",
    timestamp: "2 hrs ago",
  },
  {
    id: "act-4",
    type: "compliance",
    title: "RBI control mapped",
    detail: "Payment authentication evidence linked to RBI CSF-07.",
    actor: "Ritu Bhatia",
    timestamp: "Yesterday",
  },
];

router.get("/risk/overview", (_req, res): void => {
  res.json(GetRiskOverviewResponse.parse(overview));
});

router.get("/risk/scenarios", (_req, res): void => {
  res.json(GetRiskScenariosResponse.parse(scenarios));
});

router.get("/risk/scenarios/:id", (req, res): void => {
  const parsed = GetRiskScenarioParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const scenario = scenarios.find((item) => item.id === parsed.data.id);
  if (!scenario) {
    res.status(404).json({ error: "Risk scenario not found" });
    return;
  }
  res.json(GetRiskScenarioResponse.parse(scenario));
});

router.get("/risk/controls", (_req, res): void => {
  res.json(GetRiskControlsResponse.parse(controls));
});

router.get("/risk/compliance", (_req, res): void => {
  res.json(GetCompliancePostureResponse.parse(compliance));
});

router.get("/risk/activity", (_req, res): void => {
  res.json(GetRiskActivityResponse.parse(activity));
});

export default router;
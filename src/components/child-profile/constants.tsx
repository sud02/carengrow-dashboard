import { 
  Activity, 
  MessageSquare, 
  Heart, 
  Brain, 
  Zap, 
  Stethoscope,
  Users,
  Home,
  UserCheck,
  FileX,
  Clipboard,
  TestTube,
  PillBottle,
  UserCog,
  HeartHandshake
} from "lucide-react";
import { TouchpointIntervention, ReferralJourneyStep } from "./types";

export const multipleScreeningResults = [
  {
    screeningNumber: 1,
    date: "2024-04-15",
    ageAtScreening: 33,
    schoolReadinessScore: 65,
    reportGenerated: true,
    developmentalAges: {
      "Gross Motor Skills": 31,
      "Fine Motor Skills": 30,
      "Language & Communication": 20,
      "Social-Emotional": 28,
      "Cognitive Development": 30
    },
    results: [
      {
        category: "Gross Motor Skills",
        score: 78,
        maxScore: 100,
        status: "concern" as const,
        recommendations: ["Increase physical activity", "Outdoor play time", "Practice balancing and coordination"],
        schoolReadinessContribution: 15
      },
      {
        category: "Fine Motor Skills",
        score: 72,
        maxScore: 100,
        status: "concern" as const,
        recommendations: ["Finger exercises", "Drawing activities", "Cutting with child-safe scissors"],
        schoolReadinessContribution: 18
      },
      {
        category: "Language & Communication",
        score: 35,
        maxScore: 100,
        status: "delay" as const,
        recommendations: ["Speech therapy referral", "Parent coaching on language stimulation", "Daily reading sessions"],
        schoolReadinessContribution: 25
      },
      {
        category: "Social-Emotional",
        score: 58,
        maxScore: 100,
        status: "concern" as const,
        recommendations: ["Structured social interactions", "Emotional regulation activities", "Group play sessions"],
        schoolReadinessContribution: 20
      },
      {
        category: "Cognitive Development",
        score: 75,
        maxScore: 100,
        status: "normal" as const,
        recommendations: ["Continue age-appropriate learning activities", "Problem-solving games"],
        schoolReadinessContribution: 22
      }
    ]
  },
  {
    screeningNumber: 2,
    date: "2024-07-15",
    ageAtScreening: 36,
    schoolReadinessScore: 74,
    reportGenerated: true,
    developmentalAges: {
      "Gross Motor Skills": 34,
      "Fine Motor Skills": 35,
      "Language & Communication": 24,
      "Social-Emotional": 30,
      "Cognitive Development": 33
    },
    results: [
      {
        category: "Gross Motor Skills",
        score: 85,
        maxScore: 100,
        status: "normal" as const,
        recommendations: ["Continue regular physical play", "Encourage outdoor activities"],
        schoolReadinessContribution: 20
      },
      {
        category: "Fine Motor Skills",
        score: 78,
        maxScore: 100,
        status: "normal" as const,
        recommendations: ["Practice drawing and coloring", "Play with building blocks"],
        schoolReadinessContribution: 19
      },
      {
        category: "Language & Communication",
        score: 45,
        maxScore: 100,
        status: "delay" as const,
        recommendations: ["Continue speech therapy", "Daily reading sessions", "Encourage verbal communication"],
        schoolReadinessContribution: 20
      },
      {
        category: "Social-Emotional",
        score: 65,
        maxScore: 100,
        status: "concern" as const,
        recommendations: ["Structured play dates", "Group activities", "Parent coaching"],
        schoolReadinessContribution: 15
      },
      {
        category: "Cognitive Development",
        score: 82,
        maxScore: 100,
        status: "normal" as const,
        recommendations: ["Puzzle games", "Educational activities", "Story telling"],
        schoolReadinessContribution: 20
      }
    ]
  },
  {
    screeningNumber: 3,
    date: "2024-09-15",
    ageAtScreening: 39,
    schoolReadinessScore: null,
    reportGenerated: false,
    developmentalAges: {
      "Gross Motor Skills": null,
      "Fine Motor Skills": null,
      "Language & Communication": null,
      "Social-Emotional": null,
      "Cognitive Development": null
    },
    results: [
      {
        category: "Gross Motor Skills",
        score: null,
        maxScore: 100,
        status: "scheduled" as const,
        recommendations: [],
        schoolReadinessContribution: 0
      },
      {
        category: "Fine Motor Skills",
        score: null,
        maxScore: 100,
        status: "scheduled" as const,
        recommendations: [],
        schoolReadinessContribution: 0
      },
      {
        category: "Language & Communication",
        score: null,
        maxScore: 100,
        status: "scheduled" as const,
        recommendations: [],
        schoolReadinessContribution: 0
      },
      {
        category: "Social-Emotional",
        score: null,
        maxScore: 100,
        status: "scheduled" as const,
        recommendations: [],
        schoolReadinessContribution: 0
      },
      {
        category: "Cognitive Development",
        score: null,
        maxScore: 100,
        status: "scheduled" as const,
        recommendations: [],
        schoolReadinessContribution: 0
      }
    ]
  }
];

export const touchpointInterventions: TouchpointIntervention[] = [
  {
    category: "screening-assessment",
    name: "Comprehensive Developmental Screening",
    description: "Regular assessment and monitoring of developmental milestones",
    frequency: "Every 3 months",
    duration: "60 minutes",
    expectedDQImpact: 0.05,
    targetDomains: ["Gross Motor Skills", "Fine Motor Skills", "Language & Communication", "Social-Emotional", "Cognitive Development"],
    color: "#3b82f6",
    icon: <Stethoscope className="w-5 h-5" />
  },
  {
    category: "workshops-awareness",
    name: "Parent Education Workshops",
    description: "Group sessions for parents on child development and home activities",
    frequency: "Bi-weekly",
    duration: "90 minutes",
    expectedDQImpact: 0.08,
    targetDomains: ["Language & Communication", "Social-Emotional", "Cognitive Development"],
    color: "#10b981",
    icon: <Users className="w-5 h-5" />
  },
  {
    category: "home-visits",
    name: "Individualized Home Interventions",
    description: "One-on-one support at home with child and family",
    frequency: "Weekly",
    duration: "45 minutes",
    expectedDQImpact: 0.12,
    targetDomains: ["Language & Communication", "Social-Emotional", "Fine Motor Skills"],
    color: "#8b5cf6",
    icon: <Home className="w-5 h-5" />
  },
  {
    category: "digital-whatsapp",
    name: "Digital Learning Support",
    description: "Daily activities and guidance through WhatsApp platform",
    frequency: "Daily",
    duration: "10 minutes",
    expectedDQImpact: 0.06,
    targetDomains: ["Language & Communication", "Cognitive Development"],
    color: "#f59e0b",
    icon: <MessageSquare className="w-5 h-5" />
  },
  {
    category: "referral",
    name: "Specialist Referral Services",
    description: "Professional therapy and medical intervention",
    frequency: "As needed",
    duration: "60 minutes",
    expectedDQImpact: 0.15,
    targetDomains: ["Language & Communication", "Gross Motor Skills", "Social-Emotional"],
    color: "#ef4444",
    icon: <UserCheck className="w-5 h-5" />
  }
];

export const referralJourneySteps: ReferralJourneyStep[] = [
  {
    stepNumber: 1,
    stepName: "Reason for Referral",
    content: "Motor delay, Language & Communication delay, Social-Emotional delay, Cognitive Development concerns",
    icon: <FileX className="w-5 h-5" />,
    status: "completed",
    date: "2024-08-20",
    updatedBy: "Dr. Meera Devi (Carengrow Coordinator)"
  },
  {
    stepNumber: 2,
    stepName: "Clinical Findings",
    content: "Global Developmental Delay (GDD), predominantly affecting motor and communication domains, with intact basic cognition. No seizures or significant perinatal insults documented. Mild hypotonia observed during assessment.",
    icon: <Clipboard className="w-5 h-5" />,
    status: "completed",
    date: "2024-08-22",
    updatedBy: "Dr. Rajesh Kumar (Developmental Pediatrician)"
  },
  {
    stepNumber: 3,
    stepName: "Diagnosis",
    content: "Global Developmental Delay with mixed motor-communication profile. Possible underlying neurodevelopmental condition requiring further evaluation. Rule out genetic/metabolic etiology.",
    icon: <TestTube className="w-5 h-5" />,
    status: "completed",
    date: "2024-08-25",
    updatedBy: "Dr. Sandeep Kumar (Pediatric Neurologist)"
  },
  {
    stepNumber: 4,
    stepName: "Tests Advised",
    content: "EEG to rule out subclinical seizures, Brain MRI to assess structural abnormalities, Genetic consultation for chromosomal analysis, Hearing assessment (BERA), Thyroid function tests",
    icon: <Activity className="w-5 h-5" />,
    status: "in-progress",
    date: "2024-08-25",
    updatedBy: "Dr. Sandeep Kumar (Pediatric Neurologist)"
  },
  {
    stepNumber: 5,
    stepName: "Treatment Plan",
    content: "Intensive Physiotherapy (3x/week), Occupational therapy (2x/week), Speech-Language therapy (daily), Early intervention program enrollment, Family counseling and support",
    icon: <HeartHandshake className="w-5 h-5" />,
    status: "in-progress",
    date: "2024-08-26",
    updatedBy: "Multidisciplinary Team"
  },
  {
    stepNumber: 6,
    stepName: "Prescription",
    content: "No medications prescribed at present. Focus on non-pharmacological interventions. Review after diagnostic test results. Vitamin D supplementation (400 IU daily) for general health.",
    icon: <PillBottle className="w-5 h-5" />,
    status: "completed",
    date: "2024-08-26",
    updatedBy: "Dr. Sandeep Kumar (Pediatric Neurologist)"
  },
  {
    stepNumber: 7,
    stepName: "Referral Team",
    content: "Dr. Sandeep Kumar (Pediatric Neurologist - Lead), Dr. Sreelatha Reddy (Child Psychiatrist), Dr. Pradeep Singh (Physiotherapist), Ms. Anjali Sharma (Speech-Language Pathologist), Ms. Lakshmi Prasad (Occupational Therapist)",
    icon: <UserCog className="w-5 h-5" />,
    status: "completed",
    date: "2024-08-20",
    updatedBy: "Dr. Meera Devi (Carengrow Coordinator)"
  }
];

export const developmentalDomainIcons = {
  "Gross Motor Skills": <Activity className="w-5 h-5" />,
  "Fine Motor Skills": <Zap className="w-5 h-5" />,
  "Language & Communication": <MessageSquare className="w-5 h-5" />,
  "Social-Emotional": <Heart className="w-5 h-5" />,
  "Cognitive Development": <Brain className="w-5 h-5" />
};

export const developmentalDomainColors = {
  "Gross Motor Skills": "#f59e0b",
  "Fine Motor Skills": "#22c55e", 
  "Language & Communication": "#ef4444",
  "Social-Emotional": "#f97316",
  "Cognitive Development": "#f59e0b"
};
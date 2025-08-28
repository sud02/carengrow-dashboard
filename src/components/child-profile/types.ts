import { ReactNode } from "react";

export interface Child {
  id: string;
  name: string;
  age: number;
  ageInMonths: number;
  gender: "M" | "F";
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  status: "normal" | "at-risk" | "under-intervention";
  lastScreening: string;
  nextScreening: string;
  riskFactors: string[];
  interventions: string[];
  photoUrl: string;
  parentPhotoUrl: string;
  schoolReadinessScore: number;
  riskLevel: "low" | "moderate" | "high";
  delayCount: number;
  hasUnderlyingCondition: boolean;
  anganwadiCenter: {
    id: string;
    name: string;
    code: string;
    address: string;
    totalChildren: number;
  };
  anganwadiTeacher: {
    name: string;
    id: string;
    phone: string;
    qualification: string;
    experience: string;
    photoUrl: string;
  };
  carengrowCoordinator: {
    name: string;
    id: string;
    phone: string;
    email: string;
    centersAssigned: number;
    totalChildrenUnderCare: number;
    photoUrl: string;
  };
}

export interface DevelopmentalAge {
  domain: string;
  chronologicalAgeMonths: number;
  developmentalAgeMonths: number;
  gapMonths: number;
  status: "advanced" | "on-track" | "mild-delay" | "moderate-delay" | "severe-delay";
  icon: ReactNode;
  color: string;
  schoolReadinessImpact: "high" | "medium" | "low";
}

export interface ChildProfileProps {
  childId: string;
  onBack: () => void;
}

export interface Activity {
  id: string;
  type: "screening" | "whatsapp" | "workshop" | "home_visit" | "intervention" | "referral";
  touchpointCategory: "screening-assessment" | "workshops-awareness" | "home-visits" | "referral" | "digital-whatsapp";
  date: string;
  title: string;
  description: string;
  outcome?: string;
  status: "completed" | "scheduled" | "missed";
  coordinator?: string;
}

export interface ScreeningResult {
  date: string;
  category: string;
  score: number;
  maxScore: number;
  status: "normal" | "concern" | "delay";
  recommendations: string[];
  schoolReadinessContribution: number;
}

export interface ReferralJourneyStep {
  stepNumber: number;
  stepName: string;
  content: string;
  icon: ReactNode;
  status: "completed" | "in-progress" | "pending";
  date?: string;
  updatedBy?: string;
}

export interface TimelineEvent {
  ageInMonths: number;
  date: string;
  type: "birth" | "first-assessment" | "screening" | "intervention" | "workshop" | "whatsapp" | "home_visit" | "referral";
  touchpointCategory: "screening-assessment" | "workshops-awareness" | "home-visits" | "referral" | "digital-whatsapp";
  title: string;
  description?: string;
  outcome?: string;
  status: "completed" | "scheduled" | "current-age";
  coordinator?: string;
}

export interface TouchpointIntervention {
  category: "screening-assessment" | "workshops-awareness" | "home-visits" | "referral" | "digital-whatsapp";
  name: string;
  description: string;
  frequency: string;
  duration: string;
  expectedDQImpact: number;
  targetDomains: string[];
  color: string;
  icon: ReactNode;
}

export interface CarengrowTarget {
  domain: string;
  currentDQ: number;
  targetDQ: number;
  currentDevelopmentalAge: number;
  requiredDevelopmentalAge: number;
  requiredGrowth: number;
  projectedWithIntervention: number;
  projectedWithoutIntervention: number;
  riskOfLoss: number;
  status: string;
  color: string;
  icon: ReactNode;
  schoolReadinessImpact: string;
  recommendedTouchpoints: any[];
}
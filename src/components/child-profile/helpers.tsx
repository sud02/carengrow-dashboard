import React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ArrowUp, 
  ArrowDown, 
  Equal 
} from "lucide-react";
import { multipleScreeningResults, touchpointInterventions } from "./constants";
import { Child, DevelopmentalAge, CarengrowTarget } from "./types";

export const formatAgeDisplay = (months: number) => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${remainingMonths}m`;
  if (remainingMonths === 0) return `${years}y`;
  return `${years}y ${remainingMonths}m`;
};

export const getStatusColor = (status: DevelopmentalAge["status"]) => {
  switch (status) {
    case "advanced": return "text-violet-600 bg-violet-100 border-violet-200";
    case "on-track": return "text-emerald-600 bg-emerald-100 border-emerald-200";
    case "mild-delay": return "text-amber-600 bg-amber-100 border-amber-200";
    case "moderate-delay": return "text-orange-600 bg-orange-100 border-orange-200";
    case "severe-delay": return "text-rose-600 bg-rose-100 border-rose-200";
    default: return "text-slate-600 bg-slate-100 border-slate-200";
  }
};

export const getSchoolReadinessColor = (score: number) => {
  if (score >= 80) return "text-emerald-600 bg-emerald-100 border-emerald-200";
  if (score >= 70) return "text-amber-600 bg-amber-100 border-amber-200";
  return "text-rose-600 bg-rose-100 border-rose-200";
};

export const getChildStatusColor = (status: string) => {
  switch (status) {
    case "normal": return "text-emerald-600 bg-emerald-100 border-emerald-200";
    case "concern": return "text-amber-600 bg-amber-100 border-amber-200";
    case "delay": return "text-rose-600 bg-rose-100 border-rose-200";
    case "at-risk": return "text-orange-600 bg-orange-100 border-orange-200";
    case "under-intervention": return "text-violet-600 bg-violet-100 border-violet-200";
    default: return "text-slate-600 bg-slate-100 border-slate-200";
  }
};

export const getRiskLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "high": return "text-rose-600 bg-rose-100 border-rose-200";
    case "moderate": return "text-orange-600 bg-orange-100 border-orange-200";
    case "low": return "text-emerald-600 bg-emerald-100 border-emerald-200";
    default: return "text-slate-600 bg-slate-100 border-slate-200";
  }
};

export const getStepStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "text-emerald-600 bg-emerald-100 border-emerald-200";
    case "in-progress": return "text-blue-600 bg-blue-100 border-blue-200";
    case "pending": return "text-amber-600 bg-amber-100 border-amber-200";
    default: return "text-slate-600 bg-slate-100 border-slate-200";
  }
};

export const getScoreChange = (currentScore: number | null, previousScore: number | null) => {
  if (!currentScore || !previousScore) return null;
  const change = currentScore - previousScore;
  if (change > 0) return { change, trend: "improvement", icon: <TrendingUp className="w-4 h-4 text-emerald-600" /> };
  if (change < 0) return { change, trend: "decline", icon: <TrendingDown className="w-4 h-4 text-rose-600" /> };
  return { change: 0, trend: "stable", icon: <Minus className="w-4 h-4 text-amber-600" /> };
};

export const getTrendIcon = (change: number) => {
  if (change > 0) return <ArrowUp className="w-4 h-4 text-emerald-600" />;
  if (change < 0) return <ArrowDown className="w-4 h-4 text-rose-600" />;
  return <Equal className="w-4 h-4 text-amber-600" />;
};

export const getTrendColor = (change: number) => {
  if (change > 0) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (change < 0) return "text-rose-600 bg-rose-50 border-rose-200";
  return "text-amber-600 bg-amber-50 border-amber-200";
};

export const getDomainColor = (domain: string, developmentalAges: DevelopmentalAge[]) => {
  const domainData = developmentalAges.find(d => d.domain === domain);
  return domainData?.color || "#8884d8";
};

export const calculateDQData = () => {
  const completedScreenings = multipleScreeningResults.filter(s => s.reportGenerated);
  return completedScreenings.map(screening => {
    const dataPoint: any = {
      screening: `Screening ${screening.screeningNumber}`,
      date: screening.date,
      age: screening.ageAtScreening
    };

    Object.entries(screening.developmentalAges).forEach(([domain, devAge]) => {
      if (devAge !== null) {
        const dq = Math.round((devAge / screening.ageAtScreening) * 100);
        dataPoint[domain] = dq;
      }
    });

    return dataPoint;
  });
};

export const calculateCarengrowTargets = (developmentalAges: DevelopmentalAge[], child: Child) => {
  const targets = developmentalAges.map(domain => {
    const currentDQ = (domain.developmentalAgeMonths / domain.chronologicalAgeMonths) * 100;
    const targetDQ = currentDQ + 25;
    const futureChronologicalAge = domain.chronologicalAgeMonths + 6;
    const requiredDevelopmentalAge = Math.round((targetDQ / 100) * futureChronologicalAge);
    const projectedWithIntervention = requiredDevelopmentalAge;
    const projectedWithoutIntervention = Math.round(domain.developmentalAgeMonths + 6 - (55 * (domain.developmentalAgeMonths / 100)));
    const requiredGrowth = requiredDevelopmentalAge - domain.developmentalAgeMonths;
    
    const recommendedTouchpoints = touchpointInterventions
      .filter(intervention => intervention.targetDomains.includes(domain.domain))
      .map(intervention => ({
        ...intervention,
        requiredSessions: Math.ceil(requiredGrowth / (intervention.expectedDQImpact * 100)),
        priority: domain.status === "severe-delay" ? "high" : domain.status === "moderate-delay" ? "medium" : "low"
      }))
      .sort((a, b) => b.expectedDQImpact - a.expectedDQImpact);

    return {
      domain: domain.domain,
      currentDQ: Math.round(currentDQ),
      targetDQ: Math.round(targetDQ),
      currentDevelopmentalAge: domain.developmentalAgeMonths,
      requiredDevelopmentalAge,
      requiredGrowth,
      projectedWithIntervention,
      projectedWithoutIntervention,
      riskOfLoss: Math.round(domain.developmentalAgeMonths - projectedWithoutIntervention),
      status: domain.status,
      color: domain.color,
      icon: domain.icon,
      schoolReadinessImpact: domain.schoolReadinessImpact,
      recommendedTouchpoints
    };
  });

  const overallCurrentDQ = Math.round(targets.reduce((sum, t) => sum + t.currentDQ, 0) / targets.length);
  const overallTargetDQ = Math.round(targets.reduce((sum, t) => sum + t.targetDQ, 0) / targets.length);
  const overallRequiredGrowth = Math.round(targets.reduce((sum, t) => sum + t.requiredGrowth, 0) / targets.length);

  return {
    domainTargets: targets,
    overall: {
      currentDQ: overallCurrentDQ,
      targetDQ: overallTargetDQ,
      requiredGrowth: overallRequiredGrowth,
      currentSchoolReadiness: child.schoolReadinessScore,
      targetSchoolReadiness: 85,
      projectedSchoolReadiness: Math.min(100, child.schoolReadinessScore + (overallRequiredGrowth * 0.8))
    }
  };
};

export const prepareProjectionData = (child: Child, carengrowTargets: any) => {
  const currentMonth = child.ageInMonths;
  const projectionData = [];

  projectionData.push({
    month: currentMonth,
    period: "Current",
    withIntervention: carengrowTargets.overall.currentDQ,
    withoutIntervention: carengrowTargets.overall.currentDQ,
    schoolReadinessWithIntervention: child.schoolReadinessScore,
    schoolReadinessWithoutIntervention: child.schoolReadinessScore
  });

  projectionData.push({
    month: currentMonth + 3,
    period: "3 Months",
    withIntervention: carengrowTargets.overall.currentDQ + 12,
    withoutIntervention: carengrowTargets.overall.currentDQ - 27,
    schoolReadinessWithIntervention: child.schoolReadinessScore + 8,
    schoolReadinessWithoutIntervention: child.schoolReadinessScore - 15
  });

  projectionData.push({
    month: currentMonth + 6,
    period: "6 Months (Target)",
    withIntervention: carengrowTargets.overall.targetDQ,
    withoutIntervention: carengrowTargets.overall.currentDQ - 55,
    schoolReadinessWithIntervention: Math.min(85, carengrowTargets.overall.projectedSchoolReadiness),
    schoolReadinessWithoutIntervention: Math.max(40, child.schoolReadinessScore - 30)
  });

  return projectionData;
};

export const generateNeuroDevelopmentalReport = (screeningNumber: number, child: Child) => {
  const screening = multipleScreeningResults.find(s => s.screeningNumber === screeningNumber);
  if (!screening || !screening.reportGenerated) return;

  const reportContent = {
    childInfo: {
      name: child.name,
      age: `${child.age} years (${screening.ageAtScreening} months)`,
      gender: child.gender === 'M' ? 'Male' : 'Female',
      dateOfBirth: child.dateOfBirth,
      parentName: child.parentName,
      address: child.address
    },
    screeningDetails: {
      screeningNumber: screening.screeningNumber,
      date: screening.date,
      ageAtScreening: screening.ageAtScreening,
      schoolReadinessScore: screening.schoolReadinessScore
    },
    assessmentResults: screening.results,
    carengrowCoordinator: child.carengrowCoordinator.name,
    anganwadiCenter: child.anganwadiCenter.name,
    anganwadiTeacher: child.anganwadiTeacher.name,
    overallRecommendations: [
      "Continue language stimulation activities at home",
      "Regular follow-up screening in 3 months",
      "Maintain consistent intervention schedule",
      "Monitor school readiness progress closely"
    ],
    nextSteps: screening.schoolReadinessScore && screening.schoolReadinessScore < 70 ? 
      ["Consider specialist referral", "Intensive intervention program", "Family support counseling"] :
      ["Continue current interventions", "Regular monitoring", "School preparation activities"],
    reportGenerated: new Date().toISOString(),
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportContent, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `${child.name.replace(' ', '_')}_Neuro_Developmental_Report_Screening_${screeningNumber}_${screening.date}.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();

  console.log(`Neuro-Developmental Assessment Report generated for ${child.name} - Screening #${screeningNumber}`);
};
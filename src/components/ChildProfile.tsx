import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DevelopmentalTimeline } from "./DevelopmentalTimeline";
import { SchoolReadinessSection } from "./child-profile/SchoolReadinessSection";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar, ReferenceLine } from 'recharts';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Users, 
  Home, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Activity,
  Heart,
  Brain,
  Zap,
  User,
  Baby,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Target,
  Award,
  AlertCircle,
  Download,
  FileText,
  ArrowLeftRight,
  Calendar as CalendarIcon,
  LineChart as LineChartIcon,
  Camera,
  Upload,
  Edit,
  BookOpen,
  Star,
  Gift,
  Sun,
  Rainbow,
  Sparkles,
  GraduationCap,
  History,
  PlayCircle,
  UserCheck,
  PhoneCall,
  Video,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  ClipboardCheck,
  ExternalLink,
  ShieldAlert,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Equal,
  Percent,
  Filter,
  BarChart2,
  FileX,
  FilePlus,
  UserX,
  Clipboard,
  PillBottle,
  TestTube,
  UserCog,
  HeartHandshake,
  Route,
  TrendingUp as TrendIcon,
  BarChart,
  Info
} from "lucide-react";

// Import types and helpers
import { Child, DevelopmentalAge, ChildProfileProps, TimelineEvent } from "./child-profile/types";
import { multipleScreeningResults, referralJourneySteps, developmentalDomainIcons, developmentalDomainColors } from "./child-profile/constants";
import { 
  formatAgeDisplay,
  getStatusColor,
  getSchoolReadinessColor,
  getChildStatusColor,
  getRiskLevelColor,
  getStepStatusColor,
  getScoreChange,
  getTrendIcon,
  getTrendColor,
  getDomainColor,
  calculateDQData,
  generateNeuroDevelopmentalReport
} from "./child-profile/helpers.tsx";

export function ChildProfile({ childId, onBack }: ChildProfileProps) {
  const [selectedReferralCenter, setSelectedReferralCenter] = useState<string | null>(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("all");
  const [selectedDomains, setSelectedDomains] = useState<string[]>(["Gross Motor Skills", "Fine Motor Skills", "Language & Communication", "Social-Emotional", "Cognitive Development"]);

  // Mock child data - in real app, this would be fetched based on childId
  const child: Child = {
    id: childId,
    name: "Aadhya Sharma",
    age: 3,
    ageInMonths: 36,
    gender: "F",
    dateOfBirth: "2021-05-15",
    address: "Village: Kuppam, Mandal: Kuppam, District: Chittoor",
    parentName: "Priya Sharma",
    parentPhone: "+91 9876543210",
    status: "at-risk",
    lastScreening: "2024-07-15",
    nextScreening: "2024-09-15",
    riskFactors: ["Speech Development Delay", "Social Interaction"],
    interventions: ["Speech Therapy", "Parent Training"],
    photoUrl: "https://images.unsplash.com/photo-1719035589536-3ce5f4169ac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGluZGlhbiUyMHRvZGRsZXIlMjBjaGlsZCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NTk1ODUxNXww&ixlib=rb-4.1.0&q=80&w=1080",
    parentPhotoUrl: "https://images.unsplash.com/photo-1665250855519-25e3f817a96f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwYXJlbnRzJTIwZmFtaWx5JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU1OTU4NTIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    schoolReadinessScore: 74,
    riskLevel: "high",
    delayCount: 4,
    hasUnderlyingCondition: true,
    anganwadiCenter: {
      id: "AWC-KUP-012",
      name: "Kuppam Town Anganwadi Center 12",
      code: "AWC012",
      address: "Ward 7, Kuppam Town, Kuppam Mandal",
      totalChildren: 78
    },
    anganwadiTeacher: {
      name: "Sunitha Reddy",
      id: "AWT-2018-045",
      phone: "+91 9876501234",
      qualification: "B.Ed, Early Childhood Care & Education",
      experience: "6 years",
      photoUrl: "https://images.unsplash.com/photo-1622460241924-a114e6abe1ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZWFjaGVyJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTYwMzgwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    carengrowCoordinator: {
      name: "Dr. Meera Devi",
      id: "CG-COORD-003",
      phone: "+91 9876512345",
      email: "meera.devi@carengrow.org",
      centersAssigned: 4,
      totalChildrenUnderCare: 285,
      photoUrl: "https://images.unsplash.com/photo-1655720357761-f18ea9e5e7e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwY29vcmRpbmF0b3IlMjB3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjAzODAwNXww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  };

  // Check if child is eligible for referral journey
  const isEligibleForReferralJourney = child.riskLevel === "high" && 
                                       child.delayCount > 3 && 
                                       child.hasUnderlyingCondition;

  // Developmental age data for each domain with school readiness impact
  const developmentalAges: DevelopmentalAge[] = [
    {
      domain: "Gross Motor Skills",
      chronologicalAgeMonths: child.ageInMonths,
      developmentalAgeMonths: 34,
      gapMonths: -2,
      status: "mild-delay",
      icon: developmentalDomainIcons["Gross Motor Skills"],
      color: developmentalDomainColors["Gross Motor Skills"],
      schoolReadinessImpact: "medium"
    },
    {
      domain: "Fine Motor Skills",
      chronologicalAgeMonths: child.ageInMonths,
      developmentalAgeMonths: 35,
      gapMonths: -1,
      status: "on-track",
      icon: developmentalDomainIcons["Fine Motor Skills"],
      color: developmentalDomainColors["Fine Motor Skills"],
      schoolReadinessImpact: "high"
    },
    {
      domain: "Language & Communication",
      chronologicalAgeMonths: child.ageInMonths,
      developmentalAgeMonths: 24,
      gapMonths: -12,
      status: "severe-delay",
      icon: developmentalDomainIcons["Language & Communication"],
      color: developmentalDomainColors["Language & Communication"],
      schoolReadinessImpact: "high"
    },
    {
      domain: "Social-Emotional",
      chronologicalAgeMonths: child.ageInMonths,
      developmentalAgeMonths: 30,
      gapMonths: -6,
      status: "moderate-delay",
      icon: developmentalDomainIcons["Social-Emotional"],
      color: developmentalDomainColors["Social-Emotional"],
      schoolReadinessImpact: "high"
    },
    {
      domain: "Cognitive Development",
      chronologicalAgeMonths: child.ageInMonths,
      developmentalAgeMonths: 33,
      gapMonths: -3,
      status: "mild-delay",
      icon: developmentalDomainIcons["Cognitive Development"],
      color: developmentalDomainColors["Cognitive Development"],
      schoolReadinessImpact: "high"
    }
  ];

  // Convert activities to timeline events for the DevelopmentalTimeline component
  const timelineEvents: TimelineEvent[] = [
    {
      ageInMonths: 0,
      date: child.dateOfBirth,
      type: "birth",
      touchpointCategory: "screening-assessment",
      title: "Birth",
      description: "Birth of " + child.name,
      status: "completed"
    },
    {
      ageInMonths: 30,
      date: "2024-01-15",
      type: "first-assessment",
      touchpointCategory: "screening-assessment",
      title: "First Developmental Assessment",
      description: "Initial comprehensive developmental screening",
      outcome: "Early detection of potential delays",
      status: "completed",
      coordinator: "Dr. Rajesh Kumar"
    },
    {
      ageInMonths: 33,
      date: "2024-04-15",
      type: "screening",
      touchpointCategory: "screening-assessment",
      title: "Developmental Screening #1",
      description: "Comprehensive assessment covering all developmental domains",
      outcome: "Identified speech and language delays requiring intervention",
      status: "completed",
      coordinator: "Dr. Rajesh Kumar"
    },
    {
      ageInMonths: 33.5,
      date: "2024-04-20",
      type: "whatsapp",
      touchpointCategory: "digital-whatsapp",
      title: "Initial Parent Guidance",
      description: "Sent home-based activities for language stimulation",
      outcome: "Parent engaged and started implementing activities",
      status: "completed"
    },
    {
      ageInMonths: 34,
      date: "2024-05-15",
      type: "workshop",
      touchpointCategory: "workshops-awareness",
      title: "Parent Workshop: Language Development",
      description: "Group workshop on early language stimulation techniques",
      outcome: "Parent learned new strategies and connected with other families",
      status: "completed",
      coordinator: "Ms. Anjali Reddy"
    },
    {
      ageInMonths: 34.5,
      date: "2024-06-02",
      type: "home_visit",
      touchpointCategory: "home-visits",
      title: "Home Environment Assessment",
      description: "Evaluation of home learning environment and implementation support",
      outcome: "Provided additional resources and guidance to family",
      status: "completed",
      coordinator: "Ms. Meera Devi"
    },
    {
      ageInMonths: 35,
      date: "2024-06-15",
      type: "intervention",
      touchpointCategory: "home-visits",
      title: "Speech Therapy Initiation",
      description: "Started individual speech therapy sessions",
      outcome: "Child showed initial engagement with therapy activities",
      status: "completed",
      coordinator: "Ms. Lakshmi Prasad"
    },
    {
      ageInMonths: 36,
      date: "2024-07-15",
      type: "screening",
      touchpointCategory: "screening-assessment",
      title: "Developmental Screening #2",
      description: "Follow-up assessment to track progress",
      outcome: "Improvements in gross motor skills, continued speech delays",
      status: "completed",
      coordinator: "Dr. Rajesh Kumar"
    },
    {
      ageInMonths: 36.2,
      date: "2024-08-20",
      type: "referral",
      touchpointCategory: "referral",
      title: "Specialist Referral Initiation",
      description: "Referral to specialist center for comprehensive assessment",
      outcome: "Referral journey commenced with multidisciplinary team",
      status: "completed",
      coordinator: "Dr. Meera Devi"
    },
    {
      ageInMonths: 39,
      date: "2024-09-15",
      type: "screening",
      touchpointCategory: "screening-assessment",
      title: "Developmental Screening #3",
      description: "Scheduled follow-up assessment",
      status: "scheduled",
      coordinator: "Dr. Rajesh Kumar"
    }
  ];

  // Calculate overall developmental age (average of all domains)
  const overallDevelopmentalAge = Math.round(
    developmentalAges.reduce((sum, domain) => sum + domain.developmentalAgeMonths, 0) / developmentalAges.length
  );
  const overallGap = overallDevelopmentalAge - child.ageInMonths;

  // Consolidated statistics
  const consolidatedStats = {
    overallDevelopmentPercentage: Math.round((overallDevelopmentalAge / child.ageInMonths) * 100),
    areasOfConcern: developmentalAges.filter(d => d.status === "severe-delay" || d.status === "moderate-delay").length,
    areasOnTrack: developmentalAges.filter(d => d.status === "on-track" || d.status === "advanced").length,
    totalInterventions: child.interventions.length,
    riskLevel: overallGap <= -6 ? "High" : overallGap <= -3 ? "Moderate" : "Low"
  };

  // Enhanced Developmental Age Assessment Data
  const prepareDevelopmentalAgeProgressionData = () => {
    const domains = ["Gross Motor Skills", "Fine Motor Skills", "Language & Communication", "Social-Emotional", "Cognitive Development"];
    const progressionData = [];

    // Prepare data for progression chart
    for (let i = 0; i < multipleScreeningResults.length; i++) {
      const screening = multipleScreeningResults[i];
      if (screening.reportGenerated || i === 2) { // Include scheduled screening
        const dataPoint: any = {
          screening: `Screening ${screening.screeningNumber}`,
          date: screening.date,
          chronologicalAge: screening.ageAtScreening,
          idealAge: screening.ageAtScreening, // Ideal would be same as chronological
        };

        domains.forEach(domain => {
          const devAge = screening.developmentalAges[domain];
          if (devAge !== null) {
            dataPoint[domain] = devAge;
            dataPoint[`${domain}_Gap`] = devAge - screening.ageAtScreening;
          } else {
            dataPoint[domain] = null;
            dataPoint[`${domain}_Gap`] = null;
          }
        });

        progressionData.push(dataPoint);
      }
    }

    return progressionData;
  };

  // Calculate School Readiness Mapping
  const calculateSchoolReadinessMapping = () => {
    const completedScreenings = multipleScreeningResults.filter(s => s.reportGenerated);
    return completedScreenings.map(screening => {
      const mapping: any = {
        screening: `Screening ${screening.screeningNumber}`,
        date: screening.date,
        age: screening.ageAtScreening,
        overallSchoolReadiness: screening.schoolReadinessScore
      };

      // Map each domain's contribution to school readiness
      screening.results.forEach(result => {
        mapping[`${result.category}_SR`] = result.schoolReadinessContribution;
        mapping[`${result.category}_Score`] = result.score;
      });

      return mapping;
    });
  };

  // Calculate delay correction insights
  const calculateDelayCorrection = () => {
    const progressionData = prepareDevelopmentalAgeProgressionData();
    const corrections = [];

    for (let i = 1; i < progressionData.length; i++) {
      const current = progressionData[i];
      const previous = progressionData[i - 1];
      
      const domains = ["Gross Motor Skills", "Fine Motor Skills", "Language & Communication", "Social-Emotional", "Cognitive Development"];
      const periodCorrection: any = {
        period: `${previous.screening} → ${current.screening}`,
        timespan: `${previous.date} to ${current.date}`,
        chronologicalGrowth: current.chronologicalAge - previous.chronologicalAge,
        corrections: {}
      };

      domains.forEach(domain => {
        if (current[domain] !== null && previous[domain] !== null) {
          const developmentalGrowth = current[domain] - previous[domain];
          const expectedGrowth = current.chronologicalAge - previous.chronologicalAge;
          const correctionRate = developmentalGrowth - expectedGrowth;
          
          periodCorrection.corrections[domain] = {
            previousAge: previous[domain],
            currentAge: current[domain],
            developmentalGrowth,
            expectedGrowth,
            correctionRate,
            correctionPercentage: Math.round((correctionRate / Math.abs(previous[`${domain}_Gap`] || 1)) * 100),
            trend: correctionRate > 0 ? 'improving' : correctionRate < 0 ? 'declining' : 'stable'
          };
        }
      });

      corrections.push(periodCorrection);
    }

    return corrections;
  };

  // PDF generation function
  const generatePDFCaseStudy = () => {
    const pdfContent = {
      childInfo: child,
      developmentalAges: developmentalAges,
      screeningResults: multipleScreeningResults,
      consolidatedStats: consolidatedStats,
      timelineEvents: timelineEvents,
      referralJourney: isEligibleForReferralJourney ? referralJourneySteps : null,
      schoolReadinessFocus: {
        currentScore: child.schoolReadinessScore,
        targetScore: 85,
        keyAreas: developmentalAges.filter(d => d.schoolReadinessImpact === "high"),
        recommendations: "Focus on language development and social-emotional skills for optimal school readiness"
      },
      timestamp: new Date().toISOString()
    };
    
    // Create downloadable blob
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pdfContent, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${child.name.replace(' ', '_')}_School_Readiness_Case_Study_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    console.log("School Readiness Case Study generated for:", child.name);
  };

  // Calculate DQ changes between screenings
  const calculateDQChanges = () => {
    const dqData = calculateDQData();
    const changes = [];

    for (let i = 1; i < dqData.length; i++) {
      const current = dqData[i];
      const previous = dqData[i - 1];
      
      const periodChanges: any = {
        period: `${previous.screening} → ${current.screening}`,
        timespan: `${previous.date} to ${current.date}`,
        ageBand: `${previous.age}-${current.age} months`,
        changes: {}
      };

      selectedDomains.forEach(domain => {
        if (current[domain] !== undefined && previous[domain] !== undefined) {
          const change = current[domain] - previous[domain];
          periodChanges.changes[domain] = {
            previous: previous[domain],
            current: current[domain],
            change: change,
            trend: change > 0 ? 'improvement' : change < 0 ? 'decline' : 'stable'
          };
        }
      });

      changes.push(periodChanges);
    }

    return changes;
  };

  const dqData = calculateDQData();
  const dqChanges = calculateDQChanges();
  const progressionData = prepareDevelopmentalAgeProgressionData();
  const schoolReadinessMapping = calculateSchoolReadinessMapping();
  const delayCorrectionData = calculateDelayCorrection();

  // Filter data based on selected time period
  const filteredDQData = selectedTimePeriod === "all" ? dqData : 
    dqData.filter((_, index) => {
      if (selectedTimePeriod === "1-2") return index <= 1;
      if (selectedTimePeriod === "2-3") return index >= 1;
      return true;
    });

  // Generate sections array with conditional referral journey - Updated order
  const accordionSections = [
    "child-profile-team",
    "screening-history",
    "developmental-ages",
    "delta-analysis",
    "timeline",
    "school-readiness",
    ...(isEligibleForReferralJourney ? ["referrals-journey"] : [])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={onBack} 
            className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border-rose-200 hover:bg-rose-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
          
          <Button 
            onClick={generatePDFCaseStudy}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Case Study
          </Button>
        </div>

                {/* Collapsible Sections using Accordion */}
        <Accordion type="multiple" defaultValue={["child-profile-team", ...accordionSections.slice(1)]} className="space-y-4">

          {/* 1. Child Profile & Support Team Section */}
          <AccordionItem value="child-profile-team" className="bg-white/80 backdrop-blur-sm border border-rose-200 rounded-xl shadow-lg">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-indigo-600" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Child Profile & Support Team</h3>
                  <p className="text-sm text-gray-600">Child information, quick stats, family contact details, and care team members</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-8">

                {/* Child Header Information */}
                <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-orange-100 rounded-2xl p-6 shadow-lg border border-rose-200">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Child Photo & Basic Info */}
                    <div className="lg:col-span-1">
                      <div className="text-center space-y-3">
                        <div className="relative inline-block">
                          <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                            <AvatarImage src={child.photoUrl} alt={child.name} />
                            <AvatarFallback className="bg-gradient-to-br from-pink-200 to-orange-200">
                              {child.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1">
                            <Badge className={`${getChildStatusColor(child.status)} text-xs`}>
                              {child.status.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <h1 className="text-xl font-bold text-slate-800">{child.name}</h1>
                          <p className="text-sm text-slate-600">{child.age} years • {child.gender === 'M' ? 'Male' : 'Female'}</p>
                          {isEligibleForReferralJourney && (
                            <Badge className="text-xs bg-purple-100 text-purple-700 border-purple-200 mt-2">
                              <Route className="w-3 h-3 mr-1" />
                              Referral Journey Active
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 text-center border border-rose-200">
                          <div className="text-xl font-bold text-emerald-600">{child.schoolReadinessScore}%</div>
                          <div className="text-sm text-slate-600">School Readiness</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 text-center border border-rose-200">
                          <div className="text-xl font-bold text-orange-600">{consolidatedStats.areasOfConcern}</div>
                          <div className="text-sm text-slate-600">Areas of Concern</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 text-center border border-rose-200">
                          <div className="text-xl font-bold text-violet-600">{consolidatedStats.totalInterventions}</div>
                          <div className="text-sm text-slate-600">Interventions</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 text-center border border-rose-200">
                          <div className={`text-xl font-bold ${getRiskLevelColor(consolidatedStats.riskLevel).includes('rose') ? 'text-rose-600' :
                            getRiskLevelColor(consolidatedStats.riskLevel).includes('orange') ? 'text-orange-600' : 'text-emerald-600'}`}>
                            {consolidatedStats.riskLevel}
                          </div>
                          <div className="text-sm text-slate-600">Risk Level</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Team Sub-section */}
                <div>
                  <h4 className="text-lg font-semibold text-indigo-800 mb-6 flex items-center space-x-2">
                    <UserCheck className="w-5 h-5" />
                    <span>Care & Support Team</span>
                  </h4>

                  {/* Child Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-6 h-6 text-blue-600" />
                        <h5 className="font-semibold text-blue-800">Personal Information</h5>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Baby className="w-4 h-4 text-slate-600" />
                          <span className="text-sm text-slate-600">Age: 3 years (36 months)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-600" />
                          <span className="text-sm text-slate-600">Born: 2021-05-15</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-slate-600" />
                          <span className="text-sm text-slate-600">Village: Kuppam, Mandal: Kuppam, District: Chittoor</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-6 h-6 text-purple-600" />
                        <h5 className="font-semibold text-purple-800">Family Contact</h5>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-slate-600" />
                          <span className="text-sm text-slate-600">Parent: Priya Sharma</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-slate-600" />
                          <span className="text-sm text-slate-600">+91 9876543210</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Care Team Members */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Anganwadi Teacher */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <BookOpen className="w-6 h-6 text-green-600" />
                        <h5 className="font-semibold text-green-800">Anganwadi Teacher</h5>
                      </div>

                      <div className="text-center mb-4">
                        <Avatar className="w-16 h-16 mx-auto mb-3 border-4 border-white shadow-lg">
                          <AvatarImage src={child.anganwadiTeacher.photoUrl} />
                          <AvatarFallback className="bg-green-100 text-green-700">
                            {child.anganwadiTeacher.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h6 className="font-semibold text-green-800">Sunitha Reddy</h6>
                        <p className="text-sm text-green-600">ID: AWT-2018-045</p>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">+91 9876501234</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">B.Ed, Early Childhood Care & Education</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">6 years experience</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-green-200 mb-4">
                        <h6 className="font-medium text-green-800 mb-2">Anganwadi Center</h6>
                        <div className="space-y-1">
                          <div className="text-sm text-slate-700">Kuppam Town Anganwadi Center 12</div>
                          <div className="text-sm text-slate-600">Ward 7, Kuppam Town, Kuppam Mandal</div>
                          <div className="text-sm text-slate-600">
                            Code: AWC012 • 78 children
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Teacher
                      </Button>
                    </div>

                    {/* Carengrow Coordinator */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <UserCheck className="w-6 h-6 text-blue-600" />
                        <h5 className="font-semibold text-blue-800">Carengrow Coordinator</h5>
                      </div>

                      <div className="text-center mb-4">
                        <Avatar className="w-16 h-16 mx-auto mb-3 border-4 border-white shadow-lg">
                          <AvatarImage src={child.carengrowCoordinator.photoUrl} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {child.carengrowCoordinator.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h6 className="font-semibold text-blue-800">Dr. Meera Devi</h6>
                        <p className="text-sm text-blue-600">ID: CG-COORD-003</p>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-slate-700">+91 9876512345</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-slate-700">meera.devi@carengrow.org</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-white/70 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">4</div>
                          <div className="text-xs text-slate-600">Centers</div>
                        </div>
                        <div className="text-center p-3 bg-white/70 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">285</div>
                          <div className="text-xs text-slate-600">Children</div>
                        </div>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <PhoneCall className="w-4 h-4 mr-2" />
                        Call Coordinator
                      </Button>
                    </div>

                    {/* Primary Caregiver */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Heart className="w-6 h-6 text-purple-600" />
                        <h5 className="font-semibold text-purple-800">Primary Caregiver</h5>
                      </div>

                      <div className="text-center mb-4">
                        <Avatar className="w-16 h-16 mx-auto mb-3 border-4 border-white shadow-lg">
                          <AvatarImage src={child.parentPhotoUrl} />
                          <AvatarFallback className="bg-purple-100 text-purple-700">
                            {child.parentName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h6 className="font-semibold text-purple-800">Priya Sharma</h6>
                        <p className="text-sm text-purple-600">Parent/Guardian</p>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-slate-700">+91 9876543210</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Home className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-slate-700">Village: Kuppam, Mandal: Kuppam, District: Chittoor</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h6 className="font-medium text-purple-800 mb-2">Current Interventions</h6>
                          <div className="space-y-1">
                            <Badge variant="outline" className="text-purple-700 border-purple-300 bg-purple-50 mr-2 mb-1">
                              Speech Therapy
                            </Badge>
                            <Badge variant="outline" className="text-purple-700 border-purple-300 bg-purple-50 mr-2 mb-1">
                              Parent Training
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <h6 className="font-medium text-purple-800 mb-2">Risk Factors</h6>
                          <div className="space-y-1">
                            <Badge variant="outline" className="text-orange-700 border-orange-300 bg-orange-50 mr-2 mb-1">
                              Speech Development Delay
                            </Badge>
                            <Badge variant="outline" className="text-orange-700 border-orange-300 bg-orange-50 mr-2 mb-1">
                              Social Interaction
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4">
                        <Video className="w-4 h-4 mr-2" />
                        Schedule Visit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 2. Screening History Section */}
          <AccordionItem value="screening-history" className="bg-white/80 backdrop-blur-sm border border-rose-200 rounded-xl shadow-lg">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Screening History</h3>
                  <p className="text-sm text-gray-600">Comprehensive developmental screening results over time</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                {multipleScreeningResults.map((screening, screeningIndex) => (
                  <div key={screeningIndex} className="border border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="flex items-center space-x-2 font-semibold">
                          <Stethoscope className="w-5 h-5 text-blue-600" />
                          <span>Screening #{screening.screeningNumber}</span>
                          {screening.schoolReadinessScore && (
                            <Badge className={`${getSchoolReadinessColor(screening.schoolReadinessScore)} ml-2`}>
                              School Readiness: {screening.schoolReadinessScore}%
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {screening.date} • Age: {screening.ageAtScreening} months
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {screening.reportGenerated && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => generateNeuroDevelopmentalReport(screening.screeningNumber, child)}
                            className="bg-white/80 hover:bg-blue-50 border-blue-200"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Report
                          </Button>
                        )}
                        {screening.schoolReadinessScore && screeningIndex > 0 && (
                          <div className="flex items-center space-x-1">
                            {getScoreChange(
                              screening.schoolReadinessScore, 
                              multipleScreeningResults[screeningIndex - 1]?.schoolReadinessScore
                            )?.icon}
                            <span className="text-sm font-medium">
                              {getScoreChange(
                                screening.schoolReadinessScore, 
                                multipleScreeningResults[screeningIndex - 1]?.schoolReadinessScore
                              )?.change > 0 ? '+' : ''}
                              {getScoreChange(
                                screening.schoolReadinessScore, 
                                multipleScreeningResults[screeningIndex - 1]?.schoolReadinessScore
                              )?.change}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {screening.results.map((result, resultIndex) => (
                        <div key={resultIndex} className={`p-4 rounded-xl border-2 ${
                          result.score ? 
                            result.status === 'normal' ? 'bg-emerald-50 border-emerald-200' :
                            result.status === 'concern' ? 'bg-amber-50 border-amber-200' :
                            'bg-rose-50 border-rose-200'
                          : 'bg-slate-50 border-slate-200'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-semibold text-slate-800">{result.category}</h5>
                            {result.score && (
                              <Badge className={`${getChildStatusColor(result.status)} text-xs`}>
                                {result.status}
                              </Badge>
                            )}
                          </div>
                          
                          {result.score ? (
                            <>
                              <div className="mb-3">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Score</span>
                                  <span className="font-medium">{result.score}/{result.maxScore}</span>
                                </div>
                                <Progress 
                                  value={(result.score / result.maxScore) * 100} 
                                  className={`h-2 ${
                                    result.status === 'normal' ? 'bg-emerald-100' :
                                    result.status === 'concern' ? 'bg-amber-100' :
                                    'bg-rose-100'
                                  }`}
                                />
                              </div>
                              
                              <div className="text-xs text-slate-600 mb-2">
                                School Readiness Contribution: {result.schoolReadinessContribution}%
                              </div>
                              
                              {result.recommendations.length > 0 && (
                                <div>
                                  <h6 className="text-xs font-medium text-slate-700 mb-1">Recommendations:</h6>
                                  <ul className="text-xs text-slate-600 space-y-1">
                                    {result.recommendations.map((rec, recIndex) => (
                                      <li key={recIndex} className="flex items-start space-x-1">
                                        <span>•</span>
                                        <span>{rec}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-center text-slate-500 py-4">
                              <Clock className="w-8 h-8 mx-auto mb-2" />
                              <div className="text-sm">Scheduled</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* 2. Enhanced Delta Change Analysis Section with DQ Focus */}
          <AccordionItem value="delta-analysis" className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow-lg">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center space-x-3">
                <LineChartIcon className="w-6 h-6 text-indigo-600" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-indigo-800">DQ Delta Change Analysis</h3>
                  <p className="text-sm text-indigo-700">Developmental Quotient trends and progress tracking across screening periods</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-200">
                  <h4 className="font-semibold text-violet-800 mb-4 flex items-center space-x-2">
                    <TrendIcon className="w-5 h-5" />
                    <span>Developmental Age Progression vs Ideal Growth Journey</span>
                  </h4>
                  
                  <div className="h-96 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={progressionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="screening" 
                          stroke="#6b7280"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="#6b7280" 
                          fontSize={12}
                          domain={[0, 45]}
                          label={{ value: 'Age (Months)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                          labelFormatter={(label, payload) => {
                            const data = payload?.[0]?.payload;
                            return data ? `${label} (${data.date})` : label;
                          }}
                        />
                        <Legend />
                        
                        {/* Ideal Growth Line (Chronological Age) */}
                        <Line 
                          type="monotone"
                          dataKey="chronologicalAge"
                          stroke="#10b981"
                          strokeWidth={3}
                          strokeDasharray="5 5"
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                          name="Ideal Growth (Chronological Age)"
                        />
                        
                        {/* Individual Domain Lines */}
                        {developmentalAges.map((domain) => (
                          <Line
                            key={domain.domain}
                            type="monotone"
                            dataKey={domain.domain}
                            stroke={domain.color}
                            strokeWidth={2}
                            dot={{ fill: domain.color, strokeWidth: 2, r: 5 }}
                            name={domain.domain}
                          />
                        ))}
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/70 p-4 rounded-lg border border-violet-200">
                      <div className="text-center">
                        <div className="text-xl font-bold text-emerald-600">
                          {progressionData.length > 1 ? 
                            progressionData.filter((_, i) => i > 0 && progressionData[i]["Language & Communication"] > progressionData[i-1]["Language & Communication"]).length
                            : 0}
                        </div>
                        <div className="text-sm text-violet-700">Domains Improving</div>
                      </div>
                    </div>
                    <div className="bg-white/70 p-4 rounded-lg border border-violet-200">
                      <div className="text-center">
                        <div className="text-xl font-bold text-amber-600">
                          {developmentalAges.filter(d => Math.abs(d.gapMonths) > 3).length}
                        </div>
                        <div className="text-sm text-violet-700">Significant Delays</div>
                      </div>
                    </div>
                    <div className="bg-white/70 p-4 rounded-lg border border-violet-200">
                      <div className="text-center">
                        <div className="text-xl font-bold text-violet-600">
                          {Math.round(developmentalAges.reduce((sum, d) => sum + Math.abs(d.gapMonths), 0) / developmentalAges.length)}
                        </div>
                        <div className="text-sm text-violet-700">Avg Gap (Months)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* School Readiness Mapping */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-4 flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5" />
                    <span>School Readiness Contribution by Domain</span>
                  </h4>
                  
                  <div className="h-80 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={schoolReadinessMapping}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="screening" 
                          stroke="#6b7280"
                          fontSize={12}
                        />
                        <YAxis 
                          yAxisId="left"
                          stroke="#6b7280" 
                          fontSize={12}
                          domain={[0, 30]}
                          label={{ value: 'School Readiness %', angle: -90, position: 'insideLeft' }}
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          stroke="#6b7280" 
                          fontSize={12}
                          domain={[0, 100]}
                          label={{ value: 'Overall SR Score', angle: 90, position: 'insideRight' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Legend />
                        
                        {/* Domain Contributions as Bars */}
                        {developmentalAges.map((domain) => (
                          <Bar
                            key={domain.domain}
                            yAxisId="left"
                            dataKey={`${domain.domain}_SR`}
                            fill={domain.color}
                            name={`${domain.domain} Contribution`}
                            opacity={0.8}
                          />
                        ))}
                        
                        {/* Overall School Readiness Line */}
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="overallSchoolReadiness"
                          stroke="#059669"
                          strokeWidth={3}
                          dot={{ fill: '#059669', strokeWidth: 2, r: 6 }}
                          name="Overall School Readiness"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Delay Correction Analysis */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-4 flex items-center space-x-2">
                    <BarChart className="w-5 h-5" />
                    <span>Delay Correction Insights</span>
                  </h4>
                  
                  {delayCorrectionData.map((period, periodIndex) => (
                    <div key={periodIndex} className="mb-6 p-4 bg-white/70 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-semibold text-blue-800">{period.period}</h5>
                        <div className="text-sm text-blue-600">
                          Chronological Growth: {period.chronologicalGrowth} months
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(period.corrections).map(([domain, correction]: [string, any]) => (
                          <div key={domain} className="p-3 bg-white rounded-lg border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-slate-800 text-sm">{domain}</span>
                              <Badge className={`text-xs ${
                                correction.trend === 'improving' ? 'bg-emerald-100 text-emerald-700' :
                                correction.trend === 'declining' ? 'bg-rose-100 text-rose-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {correction.trend}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-xs text-slate-600">
                              <div className="flex justify-between">
                                <span>Dev. Growth:</span>
                                <span className="font-medium">{correction.developmentalGrowth} months</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Expected:</span>
                                <span className="font-medium">{correction.expectedGrowth} months</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Correction:</span>
                                <span className={`font-medium ${
                                  correction.correctionRate > 0 ? 'text-emerald-600' : 
                                  correction.correctionRate < 0 ? 'text-rose-600' : 'text-amber-600'
                                }`}>
                                  {correction.correctionRate > 0 ? '+' : ''}{correction.correctionRate} months
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Current Status Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {developmentalAges.map((domain, index) => (
                    <div key={index} className="p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: domain.color + '20' }}>
                          <div style={{ color: domain.color }}>
                            {domain.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{domain.domain}</h3>
                          <Badge className={`${getStatusColor(domain.status)} text-xs`}>
                            {domain.status.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Current Age</span>
                          <span className="font-medium">{formatAgeDisplay(domain.chronologicalAgeMonths)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Developmental Age</span>
                          <span className="font-medium">{formatAgeDisplay(domain.developmentalAgeMonths)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Gap</span>
                          <span className={`font-medium ${domain.gapMonths < 0 ? 'text-red-600' : domain.gapMonths > 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {domain.gapMonths > 0 ? '+' : ''}{domain.gapMonths} months
                          </span>
                        </div>
                        <div className="pt-2 border-t border-slate-200">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">School Readiness Impact</span>
                            <Badge className={`text-xs ${
                              domain.schoolReadinessImpact === 'high' ? 'bg-red-100 text-red-700' :
                              domain.schoolReadinessImpact === 'medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-emerald-100 text-emerald-700'
                            }`}>
                              {domain.schoolReadinessImpact}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overall Insights */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                  <h4 className="font-semibold text-purple-800 mb-4 flex items-center space-x-2">
                    <Info className="w-5 h-5" />
                    <span>Overall Developmental Insights & Recommendations</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-purple-700 mb-3">Key Findings:</h5>
                      <ul className="space-y-2 text-sm text-purple-600">
                        <li className="flex items-center space-x-2">
                          <TrendIcon className="w-4 h-4" />
                          <span>Language & Communication shows the largest gap (-12 months)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Fine Motor Skills approaching typical development</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Multiple high-impact domains affecting school readiness</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-purple-700 mb-3">Priority Actions:</h5>
                      <ul className="space-y-2 text-sm text-purple-600">
                        <li className="flex items-center space-x-2">
                          <Target className="w-4 h-4" />
                          <span>Intensify speech therapy interventions</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>Enhance social-emotional support programs</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Schedule comprehensive reassessment in 3 months</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 2. Enhanced Delta Change Analysis Section with DQ Focus */}
          <AccordionItem value="delta-analysis" className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow-lg">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center space-x-3">
                <LineChartIcon className="w-6 h-6 text-indigo-600" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-indigo-800">DQ Delta Change Analysis</h3>
                  <p className="text-sm text-indigo-700">Developmental Quotient trends and progress tracking across screening periods</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                {/* Controls */}
                <div className="flex flex-wrap items-center gap-4 p-4 bg-white/60 rounded-lg border border-indigo-200">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-800">Time Period:</span>
                  </div>
                  <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Screenings</SelectItem>
                      <SelectItem value="1-2">Screening 1 → 2</SelectItem>
                      <SelectItem value="2-3">Screening 2 → 3</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <BarChart2 className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-800">Showing DQ for {selectedDomains.length} domains</span>
                  </div>
                </div>

                {/* DQ Trend Chart */}
                <div className="bg-white/80 p-6 rounded-xl border border-indigo-200">
                  <div className="mb-4">
                    <h4 className="font-semibold text-indigo-800 mb-2">Developmental Quotient (DQ) Trends</h4>
                    <p className="text-sm text-indigo-600">DQ = (Developmental Age ÷ Chronological Age) × 100. Normal range: 85-115</p>
                  </div>
                  
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredDQData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="screening" 
                          stroke="#6b7280"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="#6b7280" 
                          fontSize={12}
                          domain={[0, 120]}
                          tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                          labelFormatter={(label, payload) => {
                            const data = payload?.[0]?.payload;
                            return data ? `${label} (Age: ${data.age} months, ${data.date})` : label;
                          }}
                          formatter={(value: any, name: string) => [`DQ: ${value}`, name]}
                        />
                        <Legend />
                        
                        {/* Reference lines for normal DQ range */}
                        <Line 
                          dataKey={() => 85} 
                          stroke="#10b981" 
                          strokeDasharray="5 5" 
                          strokeWidth={1}
                          dot={false}
                          name="Normal Range Lower (85)"
                        />
                        <Line 
                          dataKey={() => 115} 
                          stroke="#10b981" 
                          strokeDasharray="5 5" 
                          strokeWidth={1}
                          dot={false}
                          name="Normal Range Upper (115)"
                        />
                        
                        {selectedDomains.map((domain) => (
                          <Line
                            key={domain}
                            type="monotone"
                            dataKey={domain}
                            stroke={getDomainColor(domain, developmentalAges)}
                            strokeWidth={3}
                            dot={{ fill: getDomainColor(domain, developmentalAges), strokeWidth: 2, r: 6 }}
                            name={domain}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* DQ Summary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/70 p-4 rounded-xl border border-indigo-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        <span className="text-lg font-bold text-emerald-600">
                          {dqChanges.length > 0 ? 
                            Object.values(dqChanges[dqChanges.length - 1]?.changes || {})
                              .filter((change: any) => change.trend === 'improvement').length 
                            : 0}
                        </span>
                      </div>
                      <div className="text-sm text-indigo-700">Domains Improved</div>
                    </div>
                  </div>
                  <div className="bg-white/70 p-4 rounded-xl border border-indigo-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Equal className="w-5 h-5 text-amber-600" />
                        <span className="text-lg font-bold text-amber-600">
                          {dqChanges.length > 0 ? 
                            Object.values(dqChanges[dqChanges.length - 1]?.changes || {})
                              .filter((change: any) => change.trend === 'stable').length 
                            : 0}
                        </span>
                      </div>
                      <div className="text-sm text-indigo-700">Domains Stable</div>
                    </div>
                  </div>
                  <div className="bg-white/70 p-4 rounded-xl border border-indigo-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <TrendingDown className="w-5 h-5 text-rose-600" />
                        <span className="text-lg font-bold text-rose-600">
                          {dqChanges.length > 0 ? 
                            Object.values(dqChanges[dqChanges.length - 1]?.changes || {})
                              .filter((change: any) => change.trend === 'decline').length 
                            : 0}
                        </span>
                      </div>
                      <div className="text-sm text-indigo-700">Domains Declined</div>
                    </div>
                  </div>
                </div>

                {/* Detailed DQ Changes */}
                {dqChanges.map((period, periodIndex) => (
                  <div key={periodIndex} className="border border-indigo-200 rounded-xl p-6 bg-white/60">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="font-semibold text-indigo-800 flex items-center space-x-2">
                          <CalendarIcon className="w-5 h-5" />
                          <span>{period.period}</span>
                        </h4>
                        <p className="text-sm text-indigo-600">{period.timespan} • {period.ageBand}</p>
                      </div>
                    </div>

                    {/* Domain-wise DQ Changes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(period.changes).map(([domain, change]: [string, any]) => (
                        <div key={domain} className="p-4 bg-gradient-to-br from-white to-slate-50 rounded-lg border border-slate-200">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-medium text-slate-800">{domain}</h5>
                            <div className="flex items-center space-x-1">
                              {getTrendIcon(change.change)}
                              <span className={`text-sm font-medium ${
                                change.change > 0 ? 'text-emerald-600' : 
                                change.change < 0 ? 'text-rose-600' : 'text-amber-600'
                              }`}>
                                {change.change > 0 ? '+' : ''}{change.change}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600">Previous DQ:</span>
                              <span className="font-medium">{change.previous}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600">Current DQ:</span>
                              <span className="font-medium">{change.current}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600">DQ Change:</span>
                              <Badge className={`text-xs ${getTrendColor(change.change)}`}>
                                {change.trend}
                              </Badge>
                            </div>
                            
                            {/* DQ Interpretation */}
                            <div className="mt-2 p-2 rounded-lg border">
                              <span className={`text-xs font-medium ${
                                change.current >= 85 && change.current <= 115 ? 'text-emerald-700' :
                                change.current >= 70 && change.current < 85 ? 'text-amber-700' :
                                'text-rose-700'
                              }`}>
                                {change.current >= 85 && change.current <= 115 ? 'Normal Range' :
                                 change.current >= 70 && change.current < 85 ? 'Below Average' :
                                 change.current < 70 ? 'Significant Delay' : 'Above Average'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Period Insights */}
                    <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <h6 className="font-medium text-indigo-800 mb-2 flex items-center space-x-2">
                        <Brain className="w-4 h-4" />
                        <span>DQ Analysis Insights</span>
                      </h6>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-700">
                        <div>
                          <span className="font-medium">DQ Improvements:</span>
                          <ul className="mt-1 space-y-1">
                            {Object.entries(period.changes)
                              .filter(([, change]: [string, any]) => change.change > 0)
                              .map(([domain, change]: [string, any], i) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                                  <span>{domain}: +{change.change} DQ points</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div>
                          <span className="font-medium">Areas Needing Focus:</span>
                          <ul className="mt-1 space-y-1">
                            {Object.entries(period.changes)
                              .filter(([, change]: [string, any]) => change.change <= 0)
                              .map(([domain, change]: [string, any], i) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <AlertCircle className="w-3 h-3 text-amber-600" />
                                  <span>{domain}: {change.change === 0 ? 'No change' : `${change.change} DQ points`}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* DQ Interpretation Guide */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                  <h4 className="font-semibold text-emerald-800 mb-4 flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>DQ Interpretation & Recommendations</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-emerald-700 mb-3">DQ Score Ranges:</h5>
                      <ul className="space-y-2 text-sm text-emerald-600">
                        <li className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          <span><strong>115+:</strong> Above Average Development</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span><strong>85-115:</strong> Normal Range</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                          <span><strong>70-84:</strong> Below Average (Monitor)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                          <span><strong>&lt;70:</strong> Significant Delay (Intervention)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-emerald-700 mb-3">Current Focus Areas:</h5>
                      <ul className="space-y-2 text-sm text-emerald-600">
                        <li className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Language & Communication requires intensive intervention</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>Gross Motor Skills showing positive trajectory</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Target className="w-4 h-4" />
                          <span>Continue current intervention strategies</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 3. Timeline Section */}
          <AccordionItem value="timeline" className="bg-white/80 backdrop-blur-sm border border-rose-200 rounded-xl shadow-lg">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center space-x-3">
                <History className="w-6 h-6 text-purple-600" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Developmental Journey Timeline</h3>
                  <p className="text-sm text-gray-600">Complete timeline of assessments, interventions, and milestones</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <DevelopmentalTimeline 
                childName={child.name}
                currentAgeInMonths={child.ageInMonths}
                dateOfBirth={child.dateOfBirth}
                developmentalAges={developmentalAges}
                activities={timelineEvents}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 4. Enhanced School Readiness Section */}
          <SchoolReadinessSection 
            child={child} 
            developmentalAges={developmentalAges} 
          />

          {/* 5. Conditional Referrals Journey */}
          {isEligibleForReferralJourney && (
            <AccordionItem value="referrals-journey" className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl shadow-lg">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center space-x-3">
                  <Route className="w-6 h-6 text-purple-600" />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-purple-800">Referrals Journey Capture</h3>
                    <p className="text-sm text-purple-700">Comprehensive specialist referral tracking for high-risk children with multiple delays</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                    High Priority Case
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  {/* Eligibility Criteria Display */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center space-x-2">
                      <ShieldAlert className="w-5 h-5" />
                      <span>Referral Eligibility Criteria Met</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>High Risk Level: <strong>{child.riskLevel}</strong></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Delays: <strong>{child.delayCount} domains</strong></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Underlying Condition: <strong>Yes</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Journey Progress Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/70 p-4 rounded-xl border border-purple-200 text-center">
                      <div className="text-lg font-bold text-emerald-600">
                        {referralJourneySteps.filter(s => s.status === 'completed').length}
                      </div>
                      <div className="text-sm text-purple-700">Completed</div>
                    </div>
                    <div className="bg-white/70 p-4 rounded-xl border border-purple-200 text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {referralJourneySteps.filter(s => s.status === 'in-progress').length}
                      </div>
                      <div className="text-sm text-purple-700">In Progress</div>
                    </div>
                    <div className="bg-white/70 p-4 rounded-xl border border-purple-200 text-center">
                      <div className="text-lg font-bold text-amber-600">
                        {referralJourneySteps.filter(s => s.status === 'pending').length}
                      </div>
                      <div className="text-sm text-purple-700">Pending</div>
                    </div>
                    <div className="bg-white/70 p-4 rounded-xl border border-purple-200 text-center">
                      <div className="text-lg font-bold text-purple-600">
                        {Math.round((referralJourneySteps.filter(s => s.status === 'completed').length / referralJourneySteps.length) * 100)}%
                      </div>
                      <div className="text-sm text-purple-700">Progress</div>
                    </div>
                  </div>

                  {/* Journey Steps */}
                  <div className="space-y-4">
                    {referralJourneySteps.map((step, index) => (
                      <div key={step.stepNumber} className="relative">
                        {/* Connection Line */}
                        {index < referralJourneySteps.length - 1 && (
                          <div className="absolute left-6 top-16 w-0.5 h-6 bg-purple-300"></div>
                        )}
                        
                        <div className={`flex items-start space-x-4 p-6 rounded-xl border-2 ${
                          step.status === 'completed' ? 'bg-emerald-50 border-emerald-200' :
                          step.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                          'bg-amber-50 border-amber-200'
                        }`}>
                          {/* Step Number & Icon */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                            step.status === 'completed' ? 'bg-emerald-100' :
                            step.status === 'in-progress' ? 'bg-blue-100' :
                            'bg-amber-100'
                          }`}>
                            <div className={`${
                              step.status === 'completed' ? 'text-emerald-600' :
                              step.status === 'in-progress' ? 'text-blue-600' :
                              'text-amber-600'
                            }`}>
                              {step.icon}
                            </div>
                          </div>

                          <div className="flex-1">
                            {/* Step Header */}
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-slate-800">
                                  {step.stepNumber}. {step.stepName}
                                </h4>
                                {step.date && (
                                  <p className="text-sm text-slate-600">
                                    {step.date} {step.updatedBy && `• by ${step.updatedBy}`}
                                  </p>
                                )}
                              </div>
                              <Badge className={`${getStepStatusColor(step.status)} text-xs`}>
                                {step.status.replace('-', ' ')}
                              </Badge>
                            </div>

                            {/* Step Content */}
                            <div className="bg-white/80 p-4 rounded-lg border border-slate-200">
                              <p className="text-sm text-slate-700 leading-relaxed">
                                {step.content}
                              </p>
                            </div>

                            {/* Action Buttons for In-Progress Items */}
                            {step.status === 'in-progress' && (
                              <div className="mt-3 flex items-center space-x-2">
                                <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                                  <Edit className="w-4 h-4 mr-2" />
                                  Update Progress
                                </Button>
                                <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark Complete
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Journey Summary & Next Steps */}
                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-6">
                    <h4 className="font-semibold text-violet-800 mb-4 flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Journey Summary & Next Actions</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-violet-700 mb-3">Key Achievements:</h5>
                        <ul className="space-y-2 text-sm text-violet-600">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>Comprehensive multi-domain assessment completed</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>Multidisciplinary team assembled</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>Treatment plan initiated</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-violet-700 mb-3">Pending Actions:</h5>
                        <ul className="space-y-2 text-sm text-violet-600">
                          <li className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span>Complete diagnostic tests (EEG, MRI, Genetic)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span>Monitor treatment response</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span>Schedule 3-month follow-up</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}





        </Accordion>
      </div>
    </div>
  );
}
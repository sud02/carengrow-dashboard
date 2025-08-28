import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Users, 
  MapPin, 
  BarChart3, 
  Award,
  AlertCircle,
  Target,
  CheckCircle,
  Clock,
  Brain,
  Heart,
  Activity,
  MessageSquare,
  Home,
  Zap,
  Star,
  ArrowUp,
  ArrowDown,
  Trophy
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";

interface ProjectType {
  id: string;
  name: string;
}

interface EnhancedOverallAnalyticsProps {
  selectedProject: ProjectType;
}

// Mock data for top performing children
const topImprovementChildren = [
  {
    id: "C001",
    name: "Arjun Kumar",
    age: 4,
    anganwadi: "AWC-KUP-001",
    region: "Kuppam North",
    screening1: {
      language: 32,
      motor: 68,
      social: 45,
      cognitive: 71,
      overall: 54
    },
    screening2: {
      language: 78,
      motor: 85,
      social: 79,
      cognitive: 88,
      overall: 82.5
    },
    improvement: 28.5,
    improvementPercentage: 52.8,
    interventions: ["Speech Therapy", "Social Skills", "Parent Training"],
    riskLevel: "High → Low"
  },
  {
    id: "C002", 
    name: "Kavya Reddy",
    age: 3,
    anganwadi: "AWC-KUP-007",
    region: "Kuppam Central",
    screening1: {
      language: 45,
      motor: 58,
      social: 42,
      cognitive: 65,
      overall: 52.5
    },
    screening2: {
      language: 72,
      motor: 81,
      social: 69,
      cognitive: 84,
      overall: 76.5
    },
    improvement: 24.0,
    improvementPercentage: 45.7,
    interventions: ["Motor Skills", "Language Support"],
    riskLevel: "Moderate → Low"
  },
  {
    id: "C003",
    name: "Ravi Sharma",
    age: 5,
    anganwadi: "AWC-KUP-015",
    region: "Kuppam South",
    screening1: {
      language: 38,
      motor: 72,
      social: 51,
      cognitive: 59,
      overall: 55.0
    },
    screening2: {
      language: 69,
      motor: 89,
      social: 76,
      cognitive: 82,
      overall: 79.0
    },
    improvement: 24.0,
    improvementPercentage: 43.6,
    interventions: ["Comprehensive Program", "Family Support"],
    riskLevel: "High → Low"
  },
  {
    id: "C004",
    name: "Meera Patel",
    age: 4,
    anganwadi: "AWC-KUP-003",
    region: "Kuppam East",
    screening1: {
      language: 48,
      motor: 63,
      social: 41,
      cognitive: 67,
      overall: 54.75
    },
    screening2: {
      language: 75,
      motor: 84,
      social: 71,
      cognitive: 86,
      overall: 79.0
    },
    improvement: 24.25,
    improvementPercentage: 44.3,
    interventions: ["Social Skills", "Cognitive Training"],
    riskLevel: "Moderate → Low"
  },
  {
    id: "C005",
    name: "Arun Naidu",
    age: 3,
    anganwadi: "AWC-KUP-012",
    region: "Kuppam Central",
    screening1: {
      language: 35,
      motor: 61,
      social: 49,
      cognitive: 58,
      overall: 50.75
    },
    screening2: {
      language: 68,
      motor: 79,
      social: 74,
      cognitive: 81,
      overall: 75.5
    },
    improvement: 24.75,
    improvementPercentage: 48.8,
    interventions: ["Intensive Support", "Parent Workshops"],
    riskLevel: "High → Moderate"
  },
  {
    id: "C006",
    name: "Divya Krishna",
    age: 4,
    anganwadi: "AWC-KUP-009",
    region: "Kuppam West",
    screening1: {
      language: 42,
      motor: 59,
      social: 46,
      cognitive: 62,
      overall: 52.25
    },
    screening2: {
      language: 71,
      motor: 83,
      social: 72,
      cognitive: 85,
      overall: 77.75
    },
    improvement: 25.5,
    improvementPercentage: 48.8,
    interventions: ["Multi-domain Support"],
    riskLevel: "Moderate → Low"
  },
  {
    id: "C007",
    name: "Kiran Rao",
    age: 5,
    anganwadi: "AWC-KUP-018",
    region: "Kuppam South",
    screening1: {
      language: 51,
      motor: 65,
      social: 44,
      cognitive: 69,
      overall: 57.25
    },
    screening2: {
      language: 78,
      motor: 88,
      social: 73,
      cognitive: 91,
      overall: 82.5
    },
    improvement: 25.25,
    improvementPercentage: 44.1,
    interventions: ["Advanced Support", "Peer Learning"],
    riskLevel: "Moderate → Low"
  },
  {
    id: "C008",
    name: "Priya Menon",
    age: 3,
    anganwadi: "AWC-KUP-005",  
    region: "Kuppam North",
    screening1: {
      language: 39,
      motor: 67,
      social: 43,
      cognitive: 64,
      overall: 53.25
    },
    screening2: {
      language: 72,
      motor: 86,
      social: 69,
      cognitive: 84,
      overall: 77.75
    },
    improvement: 24.5,
    improvementPercentage: 46.0,
    interventions: ["Language Focus", "Social Development"],
    riskLevel: "High → Low"
  },
  {
    id: "C009",
    name: "Vikram Gupta",
    age: 4,
    anganwadi: "AWC-KUP-011",
    region: "Kuppam Central",
    screening1: {
      language: 44,
      motor: 56,
      social: 47,
      cognitive: 61,
      overall: 52.0
    },
    screening2: {
      language: 74,
      motor: 82,
      social: 71,
      cognitive: 83,
      overall: 77.5
    },
    improvement: 25.5,
    improvementPercentage: 49.0,
    interventions: ["Holistic Approach", "Community Support"],
    riskLevel: "Moderate → Low"
  },
  {
    id: "C010",
    name: "Ananya Singh",
    age: 5,
    anganwadi: "AWC-KUP-020",
    region: "Kuppam East",
    screening1: {
      language: 47,
      motor: 62,
      social: 45,
      cognitive: 66,
      overall: 55.0
    },
    screening2: {
      language: 76,
      motor: 87,
      social: 74,
      cognitive: 89,
      overall: 81.5
    },
    improvement: 26.5,
    improvementPercentage: 48.2,
    interventions: ["Excellence Program", "Family Engagement"],
    riskLevel: "Moderate → Low"
  }
];

// Mock data for high-risk children detected in 2nd screening
const highRiskChildren = [
  {
    id: "C101",
    name: "Rohit Kumar",
    age: 4,
    anganwadi: "AWC-KUP-014",
    region: "Kuppam South",
    screening2: {
      language: 28,
      motor: 42,
      social: 35,
      cognitive: 39,
      overall: 36.0
    },
    riskFactors: ["Severe Language Delay", "Motor Development Issues", "Social Withdrawal"],
    urgentInterventions: ["Immediate Speech Therapy", "Occupational Therapy", "Psychological Assessment"],
    familySupport: "Required",
    monthsDelayed: 15
  },
  {
    id: "C102",
    name: "Sita Devi",
    age: 3,
    anganwadi: "AWC-KUP-008",
    region: "Kuppam West",
    screening2: {
      language: 31,
      motor: 38,
      social: 29,
      cognitive: 41,
      overall: 34.75
    },
    riskFactors: ["Communication Barriers", "Fine Motor Delays", "Attention Issues"],
    urgentInterventions: ["Language Therapy", "Motor Skills Training", "Behavioral Support"],
    familySupport: "Critical",
    monthsDelayed: 12
  },
  {
    id: "C103",
    name: "Raj Patel",
    age: 5,
    anganwadi: "AWC-KUP-017",
    region: "Kuppam East",
    screening2: {
      language: 25,
      motor: 45,
      social: 32,
      cognitive: 37,
      overall: 34.75
    },
    riskFactors: ["Severe Developmental Delays", "Learning Disabilities", "Social Isolation"],
    urgentInterventions: ["Comprehensive Assessment", "Special Education", "Family Counseling"],
    familySupport: "Intensive",
    monthsDelayed: 18
  },
  {
    id: "C104",
    name: "Lakshmi Rao",
    age: 4,
    anganwadi: "AWC-KUP-002",
    region: "Kuppam North",
    screening2: {
      language: 33,
      motor: 41,
      social: 28,
      cognitive: 35,
      overall: 34.25
    },
    riskFactors: ["Multiple Developmental Delays", "Behavioral Challenges", "Family Stress"],
    urgentInterventions: ["Multi-disciplinary Support", "Home-based Therapy", "Parent Training"],
    familySupport: "Essential",
    monthsDelayed: 14
  },
  {
    id: "C105",
    name: "Krishna Murthy",
    age: 3,
    anganwadi: "AWC-KUP-013",
    region: "Kuppam Central",
    screening2: {
      language: 29,
      motor: 39,
      social: 31,
      cognitive: 38,
      overall: 34.25
    },
    riskFactors: ["Speech Impediments", "Gross Motor Issues", "Cognitive Concerns"],
    urgentInterventions: ["Speech Pathology", "Physical Therapy", "Cognitive Training"],
    familySupport: "Required",
    monthsDelayed: 13
  },
  {
    id: "C106",
    name: "Geetha Naidu",
    age: 4,
    anganwadi: "AWC-KUP-006",
    region: "Kuppam West",
    screening2: {
      language: 27,
      motor: 43,
      social: 30,
      cognitive: 36,
      overall: 34.0
    },
    riskFactors: ["Developmental Regression", "Social Withdrawal", "Learning Challenges"],
    urgentInterventions: ["Immediate Assessment", "Therapeutic Intervention", "Educational Support"],
    familySupport: "Critical",
    monthsDelayed: 16
  },
  {
    id: "C107",
    name: "Anil Kumar",
    age: 5,
    anganwadi: "AWC-KUP-019",
    region: "Kuppam South",
    screening2: {
      language: 32,
      motor: 40,
      social: 27,
      cognitive: 34,
      overall: 33.25
    },
    riskFactors: ["Complex Developmental Needs", "Behavioral Issues", "Academic Struggles"],
    urgentInterventions: ["Special Education Assessment", "Behavioral Therapy", "Academic Support"],
    familySupport: "Intensive",
    monthsDelayed: 19
  },
  {
    id: "C108",
    name: "Radha Krishna",
    age: 3,
    anganwadi: "AWC-KUP-010",
    region: "Kuppam Central",
    screening2: {
      language: 30,
      motor: 37,
      social: 33,
      cognitive: 39,
      overall: 34.75
    },
    riskFactors: ["Language Barriers", "Motor Coordination", "Social Skills"],
    urgentInterventions: ["Language Development", "Motor Training", "Social Integration"],
    familySupport: "Required",
    monthsDelayed: 11
  },
  {
    id: "C109",
    name: "Suma Reddy",
    age: 4,
    anganwadi: "AWC-KUP-016",
    region: "Kuppam East",
    screening2: {
      language: 26,
      motor: 44,
      social: 29,
      cognitive: 37,
      overall: 34.0
    },
    riskFactors: ["Severe Communication Delays", "Motor Planning Issues", "Attention Deficits"],
    urgentInterventions: ["Communication Therapy", "Motor Skills", "Attention Training"],
    familySupport: "Essential",
    monthsDelayed: 17
  },
  {
    id: "C110",
    name: "Gopal Sharma",
    age: 5,
    anganwadi: "AWC-KUP-004",
    region: "Kuppam North",
    screening2: {
      language: 24,
      motor: 46,
      social: 31,
      cognitive: 33,
      overall: 33.5
    },
    riskFactors: ["Global Developmental Delay", "Multiple Risk Factors", "Complex Needs"],
    urgentInterventions: ["Comprehensive Care Plan", "Multi-disciplinary Team", "Intensive Support"],
    familySupport: "Critical",
    monthsDelayed: 20
  }
];

// Regional delay mapping data
const regionalDelayData = [
  {
    region: "Kuppam North",
    anganwadiCenters: 8,
    totalChildren: 624,
    delayCategories: {
      language: { count: 89, percentage: 14.3, severity: "Moderate" },
      motor: { count: 62, percentage: 9.9, severity: "Low" },
      social: { count: 71, percentage: 11.4, severity: "Moderate" },
      cognitive: { count: 45, percentage: 7.2, severity: "Low" }
    },
    overallDelayRate: 10.7,
    riskLevel: "Moderate",
    primaryConcerns: ["Language Development", "Social Skills"],
    interventionSuccess: 73.2,
    coordinatorEffectiveness: 85.1
  },
  {
    region: "Kuppam Central", 
    anganwadiCenters: 12,
    totalChildren: 932,
    delayCategories: {
      language: { count: 158, percentage: 16.9, severity: "High" },
      motor: { count: 103, percentage: 11.1, severity: "Moderate" },
      social: { count: 128, percentage: 13.7, severity: "High" },
      cognitive: { count: 84, percentage: 9.0, severity: "Moderate" }
    },
    overallDelayRate: 12.7,
    riskLevel: "High",
    primaryConcerns: ["Language Development", "Social-Emotional"],
    interventionSuccess: 68.8,
    coordinatorEffectiveness: 78.3
  },
  {
    region: "Kuppam South",
    anganwadiCenters: 10,
    totalChildren: 780,
    delayCategories: {
      language: { count: 109, percentage: 14.0, severity: "Moderate" },
      motor: { count: 94, percentage: 12.1, severity: "Moderate" },
      social: { count: 87, percentage: 11.2, severity: "Moderate" },
      cognitive: { count: 62, percentage: 8.0, severity: "Low" }
    },
    overallDelayRate: 11.3,
    riskLevel: "Moderate",
    primaryConcerns: ["Motor Skills", "Language Development"],
    interventionSuccess: 71.5,
    coordinatorEffectiveness: 82.7
  },
  {
    region: "Kuppam East",
    anganwadiCenters: 9,
    totalChildren: 702,
    delayCategories: {
      language: { count: 91, percentage: 13.0, severity: "Moderate" },
      motor: { count: 77, percentage: 11.0, severity: "Moderate" },
      social: { count: 84, percentage: 12.0, severity: "Moderate" },
      cognitive: { count: 56, percentage: 8.0, severity: "Low" }
    },
    overallDelayRate: 11.0,
    riskLevel: "Moderate",
    primaryConcerns: ["Balanced Development Concerns"],
    interventionSuccess: 75.1,
    coordinatorEffectiveness: 86.2
  },
  {
    region: "Kuppam West",
    anganwadiCenters: 6,
    totalChildren: 468,
    delayCategories: {
      language: { count: 84, percentage: 17.9, severity: "High" },
      motor: { count: 52, percentage: 11.1, severity: "Moderate" },
      social: { count: 61, percentage: 13.0, severity: "High" },
      cognitive: { count: 42, percentage: 9.0, severity: "Moderate" }
    },
    overallDelayRate: 12.8,
    riskLevel: "High",
    primaryConcerns: ["Language Barriers", "Social Integration"],
    interventionSuccess: 66.7,
    coordinatorEffectiveness: 75.8
  }
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

export function EnhancedOverallAnalytics({ selectedProject }: EnhancedOverallAnalyticsProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  // Sort data for rankings
  const topImprovementRanked = [...topImprovementChildren].sort((a, b) => b.improvementPercentage - a.improvementPercentage);
  const highRiskRanked = [...highRiskChildren].sort((a, b) => a.screening2.overall - b.screening2.overall);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Enhanced Analytics Dashboard</h1>
        <p className="text-lg text-gray-600">
          Advanced insights for {selectedProject.name} - Top Performers, High-Risk Detection & Regional Analysis
        </p>
      </div>

      <Tabs defaultValue="top-performers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="top-performers">Top 10 Improvement</TabsTrigger>
          <TabsTrigger value="high-risk">High-Risk Detection</TabsTrigger>
          <TabsTrigger value="regional-analysis">Regional Delay Mapping</TabsTrigger>
        </TabsList>

        {/* Top 10 Children with Highest % Change */}
        <TabsContent value="top-performers" className="space-y-6">
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <Trophy className="w-6 h-6" />
                <span>Top 10 Children: Highest Development Improvement</span>
              </CardTitle>
              <CardDescription>
                Children showing the highest percentage improvement from 1st to 2nd screening across all developmental domains
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Summary Stats */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(topImprovementRanked.reduce((sum, child) => sum + child.improvementPercentage, 0) / topImprovementRanked.length)}%
                    </div>
                    <div className="text-sm text-gray-600">Average Improvement</div>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {topImprovementRanked[0]?.improvementPercentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Highest Improvement</div>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {topImprovementRanked.filter(child => child.riskLevel.includes("High →")).length}
                    </div>
                    <div className="text-sm text-gray-600">High→Low Risk</div>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {new Set(topImprovementRanked.map(child => child.region)).size}
                    </div>
                    <div className="text-sm text-gray-600">Regions Represented</div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Performers List */}
              <div className="space-y-4">
                {topImprovementRanked.map((child, index) => (
                  <Card key={child.id} className={`${
                    index === 0 ? 'border-2 border-gold bg-yellow-50' :
                    index === 1 ? 'border-2 border-silver bg-gray-50' :
                    index === 2 ? 'border-2 border-bronze bg-orange-50' :
                    'bg-white'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                            index === 0 ? 'bg-yellow-500' :
                            index === 1 ? 'bg-gray-500' :
                            index === 2 ? 'bg-orange-500' :
                            'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{child.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>Age: {child.age} years</span>
                              <span>•</span>
                              <span>{child.anganwadi}</span>
                              <span>•</span>
                              <span>{child.region}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <ArrowUp className="w-5 h-5 text-green-600" />
                            <span className="text-2xl font-bold text-green-600">
                              +{child.improvementPercentage.toFixed(1)}%
                            </span>
                          </div>
                          <Badge className={`mt-1 ${
                            child.riskLevel.includes("High →") ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {child.riskLevel}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Before/After Scores */}
                        <div>
                          <h4 className="font-semibold mb-2">Development Progress</h4>
                          <div className="space-y-2">
                            {Object.entries(child.screening1).filter(([key]) => key !== 'overall').map(([domain, score1]) => {
                              const score2 = child.screening2[domain as keyof typeof child.screening2] as number;
                              const improvement = score2 - score1;
                              return (
                                <div key={domain} className="flex items-center justify-between text-sm">
                                  <span className="capitalize">{domain.replace('_', ' ')}</span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-gray-500">{score1} → {score2}</span>
                                    <div className="flex items-center space-x-1">
                                      <ArrowUp className="w-3 h-3 text-green-600" />
                                      <span className="text-green-600 font-medium">+{improvement}</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Interventions */}
                        <div>
                          <h4 className="font-semibold mb-2">Successful Interventions</h4>
                          <div className="flex flex-wrap gap-2">
                            {child.interventions.map((intervention, idx) => (
                              <Badge key={idx} variant="outline" className="text-purple-600 border-purple-300">
                                {intervention}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Overall Development Score</span>
                          <span className="text-sm text-gray-600">
                            {child.screening1.overall} → {child.screening2.overall}
                          </span>
                        </div>
                        <div className="relative">
                          <Progress value={child.screening1.overall} className="h-2 bg-red-100" />
                          <Progress 
                            value={child.screening2.overall} 
                            className="h-2 absolute top-0 left-0" 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Top 10 High-Risk Children */}
        <TabsContent value="high-risk" className="space-y-6">
          <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="w-6 h-6" />
                <span>Top 10 High-Risk Children: Critical Intervention Needed</span>
              </CardTitle>
              <CardDescription>
                Children with the most severe developmental delays detected in the 2nd screening requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Critical Stats */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-white border-red-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {Math.round(highRiskRanked.reduce((sum, child) => sum + child.screening2.overall, 0) / highRiskRanked.length)}%
                    </div>
                    <div className="text-sm text-gray-600">Average Dev. Score</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-red-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.round(highRiskRanked.reduce((sum, child) => sum + child.monthsDelayed, 0) / highRiskRanked.length)}
                    </div>
                    <div className="text-sm text-gray-600">Avg Months Delayed</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-red-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {highRiskRanked.filter(child => child.familySupport === "Critical" || child.familySupport === "Intensive").length}
                    </div>
                    <div className="text-sm text-gray-600">Need Family Support</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-red-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {highRiskRanked.reduce((sum, child) => sum + child.urgentInterventions.length, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Interventions</div>
                  </CardContent>
                </Card>
              </div>

              {/* High-Risk Children List */}
              <div className="space-y-4">
                {highRiskRanked.map((child, index) => (
                  <Card key={child.id} className={`border-l-4 ${
                    index < 3 ? 'border-l-red-500 bg-red-50' :
                    index < 6 ? 'border-l-orange-500 bg-orange-50' :
                    'border-l-yellow-500 bg-yellow-50'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                            index < 3 ? 'bg-red-500' :
                            index < 6 ? 'bg-orange-500' :
                            'bg-yellow-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{child.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>Age: {child.age} years</span>
                              <span>•</span>
                              <span>{child.anganwadi}</span>
                              <span>•</span>
                              <span>{child.region}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">
                            {child.screening2.overall.toFixed(1)}%
                          </div>
                          <Badge className={`mt-1 ${
                            child.familySupport === 'Critical' ? 'bg-red-100 text-red-800' :
                            child.familySupport === 'Intensive' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {child.familySupport} Support
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        {/* Development Scores */}
                        <div>
                          <h4 className="font-semibold mb-2 text-red-800">Critical Areas</h4>
                          <div className="space-y-2">
                            {Object.entries(child.screening2).filter(([key]) => key !== 'overall').map(([domain, score]) => (
                              <div key={domain} className="flex items-center justify-between text-sm">
                                <span className="capitalize">{domain}</span>
                                <div className="flex items-center space-x-2">
                                  <span className={`font-medium ${
                                    score < 30 ? 'text-red-600' :
                                    score < 40 ? 'text-orange-600' :
                                    'text-yellow-600'
                                  }`}>
                                    {score}%
                                  </span>
                                  <Progress value={score} className="w-16 h-1" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Risk Factors */}
                        <div>
                          <h4 className="font-semibold mb-2 text-orange-800">Risk Factors</h4>
                          <div className="space-y-1">
                            {child.riskFactors.map((factor, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-sm">
                                <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                                <span>{factor}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Urgent Interventions */}
                        <div>
                          <h4 className="font-semibold mb-2 text-purple-800">Urgent Actions</h4>
                          <div className="space-y-1">
                            {child.urgentInterventions.map((intervention, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-sm">
                                <Target className="w-3 h-3 text-purple-500 flex-shrink-0" />
                                <span>{intervention}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Delay Indicator */}
                      <div className="mt-4 p-3 bg-white rounded border border-red-200">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-red-800">
                            Developmental Delay: {child.monthsDelayed} months behind
                          </span>
                          <Badge className="bg-red-100 text-red-800">
                            Immediate Intervention Required
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regional Delay Mapping */}
        <TabsContent value="regional-analysis" className="space-y-6">
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-800">
                <MapPin className="w-6 h-6" />
                <span>Regional Delay Mapping: Anganwadi Area-wise Analysis</span>
              </CardTitle>
              <CardDescription>
                Comprehensive analysis of developmental delays by project regions and Anganwadi coverage areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Regional Overview Chart */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Regional Delay Rate Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionalDelayData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="overallDelayRate" fill="#8884d8" name="Overall Delay Rate %" />
                    <Bar dataKey="interventionSuccess" fill="#82ca9d" name="Intervention Success %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Regional Details Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {regionalDelayData.map((region, index) => (
                  <Card 
                    key={region.region} 
                    className={`cursor-pointer transition-all ${
                      selectedRegion === region.region ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
                    } ${
                      region.riskLevel === 'High' ? 'border-red-200' :
                      region.riskLevel === 'Moderate' ? 'border-yellow-200' :
                      'border-green-200'
                    }`}
                    onClick={() => setSelectedRegion(selectedRegion === region.region ? null : region.region)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <span>{region.region}</span>
                        <Badge className={
                          region.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                          region.riskLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {region.riskLevel} Risk
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {region.anganwadiCenters} AWCs • {region.totalChildren} children
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Overall Delay Rate */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Overall Delay Rate</span>
                            <span className={`text-sm font-bold ${
                              region.overallDelayRate > 12 ? 'text-red-600' :
                              region.overallDelayRate > 10 ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {region.overallDelayRate}%
                            </span>
                          </div>
                          <Progress value={region.overallDelayRate} className="h-2" />
                        </div>

                        {/* Category Breakdown */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(region.delayCategories).map(([category, data]) => (
                            <div key={category} className="p-2 bg-gray-50 rounded">
                              <div className="font-medium capitalize">{category}</div>
                              <div className={`text-xs ${
                                data.severity === 'High' ? 'text-red-600' :
                                data.severity === 'Moderate' ? 'text-yellow-600' :
                                'text-green-600'
                              }`}>
                                {data.count} ({data.percentage}%)
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Success Metrics */}
                        <div className="pt-2 border-t">
                          <div className="flex items-center justify-between text-sm">
                            <span>Intervention Success</span>
                            <span className="font-medium text-green-600">{region.interventionSuccess}%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Coordinator Effectiveness</span>
                            <span className="font-medium text-blue-600">{region.coordinatorEffectiveness}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detailed Regional Analysis */}
              {selectedRegion && (
                <Card className="border-2 border-blue-300 bg-blue-50">
                  <CardHeader>
                    <CardTitle>Detailed Analysis: {selectedRegion}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const regionData = regionalDelayData.find(r => r.region === selectedRegion);
                      if (!regionData) return null;

                      return (
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Delay Categories Chart */}
                          <div>
                            <h4 className="font-semibold mb-3">Delay Distribution by Category</h4>
                            <ResponsiveContainer width="100%" height={250}>
                              <PieChart>
                                <Pie
                                  data={Object.entries(regionData.delayCategories).map(([key, value]) => ({
                                    name: key.charAt(0).toUpperCase() + key.slice(1),
                                    value: value.count,
                                    percentage: value.percentage
                                  }))}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {Object.entries(regionData.delayCategories).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Key Insights */}
                          <div>
                            <h4 className="font-semibold mb-3">Key Insights & Recommendations</h4>
                            <div className="space-y-3">
                              <div className="p-3 bg-white rounded border">
                                <h5 className="font-medium text-red-800 mb-2">Primary Concerns</h5>
                                <ul className="text-sm space-y-1">
                                  {regionData.primaryConcerns.map((concern, idx) => (
                                    <li key={idx} className="flex items-center space-x-2">
                                      <AlertTriangle className="w-3 h-3 text-red-500" />
                                      <span>{concern}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-3 bg-white rounded border">
                                <h5 className="font-medium text-green-800 mb-2">Performance Metrics</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Intervention Success Rate:</span>
                                    <span className="font-medium text-green-600">{regionData.interventionSuccess}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Coordinator Effectiveness:</span>
                                    <span className="font-medium text-blue-600">{regionData.coordinatorEffectiveness}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Children per AWC:</span>
                                    <span className="font-medium">{Math.round(regionData.totalChildren / regionData.anganwadiCenters)}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="p-3 bg-white rounded border">
                                <h5 className="font-medium text-purple-800 mb-2">Recommended Actions</h5>
                                <ul className="text-sm space-y-1">
                                  {regionData.riskLevel === 'High' && (
                                    <>
                                      <li className="flex items-center space-x-2">
                                        <Target className="w-3 h-3 text-purple-500" />
                                        <span>Increase coordinator visits frequency</span>
                                      </li>
                                      <li className="flex items-center space-x-2">
                                        <Target className="w-3 h-3 text-purple-500" />
                                        <span>Deploy additional specialized support</span>
                                      </li>
                                    </>
                                  )}
                                  <li className="flex items-center space-x-2">
                                    <Target className="w-3 h-3 text-purple-500" />
                                    <span>Focus on {regionData.primaryConcerns[0].toLowerCase()}</span>
                                  </li>
                                  <li className="flex items-center space-x-2">
                                    <Target className="w-3 h-3 text-purple-500" />
                                    <span>Strengthen parent training programs</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}

              {/* Regional Comparison Summary */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Regional Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Best Performing Region */}
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <Trophy className="w-4 h-4 mr-2" />
                        Best Performing Region
                      </h4>
                      {(() => {
                        const bestRegion = regionalDelayData.reduce((best, current) => 
                          current.interventionSuccess > best.interventionSuccess ? current : best
                        );
                        return (
                          <div className="p-4 bg-green-50 border border-green-200 rounded">
                            <div className="font-bold text-green-800">{bestRegion.region}</div>
                            <div className="text-sm text-green-700 mt-2">
                              • {bestRegion.interventionSuccess}% intervention success rate<br/>
                              • {bestRegion.coordinatorEffectiveness}% coordinator effectiveness<br/>
                              • {bestRegion.overallDelayRate}% overall delay rate
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Needs Attention */}
                    <div>
                      <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Needs Immediate Attention
                      </h4>
                      {(() => {
                        const needsAttention = regionalDelayData.reduce((worst, current) => 
                          current.overallDelayRate > worst.overallDelayRate ? current : worst
                        );
                        return (
                          <div className="p-4 bg-red-50 border border-red-200 rounded">
                            <div className="font-bold text-red-800">{needsAttention.region}</div>
                            <div className="text-sm text-red-700 mt-2">
                              • {needsAttention.overallDelayRate}% overall delay rate<br/>
                              • Primary concerns: {needsAttention.primaryConcerns.join(', ')}<br/>
                              • Requires enhanced intervention programs
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
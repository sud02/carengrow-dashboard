import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ProjectType } from "./ProjectSelection";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Activity,
  Target,
  Heart,
  Award,
  LineChart,
  Brain,
  MessageSquare,
  Zap,
  Search,
  X,
  Filter,
  Download,
  UserCheck,
  Building,
  GraduationCap,
  FileText,
  Star,
  Phone,
  Home,
  Minus,
  ArrowRight
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ComposedChart, Area, AreaChart, RadialBarChart, RadialBar } from "recharts";
import { useState, useEffect } from "react";

interface OverallViewProps {
  onBack: () => void;
  selectedProject?: ProjectType | null;
}

export function EnhancedOverallView({ onBack, selectedProject }: OverallViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [analyticsFilter, setAnalyticsFilter] = useState("all");
  const [dateRange, setDateRange] = useState("6months");

  // Mock data for charts
  const monthlyScreenings = [
    { month: "Jan", screenings: 1650, atRisk: 165, improvements: 52 },
    { month: "Feb", screenings: 1820, atRisk: 182, improvements: 68 },
    { month: "Mar", screenings: 2100, atRisk: 210, improvements: 89 },
    { month: "Apr", screenings: 2350, atRisk: 235, improvements: 112 },
    { month: "May", screenings: 2200, atRisk: 220, improvements: 134 },
    { month: "Jun", screenings: 2450, atRisk: 245, improvements: 156 },
    { month: "Jul", screenings: 2600, atRisk: 260, improvements: 187 },
    { month: "Aug", screenings: 2300, atRisk: 230, improvements: 201 },
  ];

  // Enhanced delay tracking data
  const delayTrackingData = {
    totalDelaysDetected: 4287,
    childrenByDelayCount: [
      { delayCount: "1 Delay", count: 2456, percentage: 57.3, color: "#f59e0b" },
      { delayCount: "2 Delays", count: 1247, percentage: 29.1, color: "#ef4444" },
      { delayCount: "3+ Delays", count: 584, percentage: 13.6, color: "#dc2626" }
    ],
    delaysByDomain: [
      { domain: "Communication", count: 1567, percentage: 36.6 },
      { domain: "Gross Motor", count: 1234, percentage: 28.8 },
      { domain: "Fine Motor", count: 892, percentage: 20.8 },
      { domain: "Personal Social", count: 743, percentage: 17.3 },
      { domain: "Problem Solving", count: 456, percentage: 10.6 }
    ]
  };

  // Referral tracking data
  const referralData = {
    totalReferrals: 1847,
    referralsByType: [
      { type: "Speech Therapy", count: 612, completed: 456, pending: 156, successRate: 89.2 },
      { type: "Occupational Therapy", count: 387, completed: 298, pending: 89, successRate: 92.1 },
      { type: "Pediatric Consultation", count: 423, completed: 356, pending: 67, successRate: 84.3 },
      { type: "Nutritional Support", count: 298, completed: 234, pending: 64, successRate: 91.7 },
      { type: "Behavioral Support", count: 127, completed: 98, pending: 29, successRate: 87.8 }
    ],
    referralStatus: [
      { status: "Completed", count: 1442, percentage: 78.1, color: "#22c55e" },
      { status: "In Progress", count: 312, percentage: 16.9, color: "#3b82f6" },
      { status: "Pending", count: 93, percentage: 5.0, color: "#f59e0b" }
    ]
  };

  // Top performing Anganwadi centers and teachers
  const topPerformingCenters = [
    {
      centerName: "Kuppam Town AWC",
      centerCode: "KT001",
      teacher: "Smt. Lakshmi Devi",
      teacherCode: "T001",
      totalChildren: 78,
      screeningRate: 98.7,
      parentEngagement: 94.2,
      improvementRate: 87.5,
      activities: 156,
      rank: 1,
      achievements: ["Best Screening Rate", "Highest Parent Engagement"]
    },
    {
      centerName: "Ramakuppam AWC",
      centerCode: "RK002", 
      teacher: "Smt. Priya Kumari",
      teacherCode: "T002",
      totalChildren: 65,
      screeningRate: 96.9,
      parentEngagement: 91.8,
      improvementRate: 89.2,
      activities: 134,
      rank: 2,
      achievements: ["Best Improvement Rate", "Consistent Performance"]
    },
    {
      centerName: "Shantipuram AWC",
      centerCode: "SP003",
      teacher: "Smt. Meera Reddy", 
      teacherCode: "T003",
      totalChildren: 58,
      screeningRate: 94.8,
      parentEngagement: 89.3,
      improvementRate: 84.1,
      activities: 128,
      rank: 3,
      achievements: ["Most Activities", "Parent Workshop Leader"]
    },
    {
      centerName: "Gudipalle AWC",
      centerCode: "GD004",
      teacher: "Smt. Asha Rani",
      teacherCode: "T004", 
      totalChildren: 72,
      screeningRate: 93.1,
      parentEngagement: 87.5,
      improvementRate: 82.6,
      activities: 112,
      rank: 4,
      achievements: ["Community Outreach", "Home Visit Champion"]
    },
    {
      centerName: "Vepuvaripalle AWC",
      centerCode: "VP005",
      teacher: "Smt. Sunitha Devi",
      teacherCode: "T005",
      totalChildren: 54,
      screeningRate: 91.7,
      parentEngagement: 86.1,
      improvementRate: 81.5,
      activities: 98,
      rank: 5,
      achievements: ["Early Intervention", "Special Needs Support"]
    }
  ];

  // Operational insights data
  const operationalInsights = [
    {
      category: "Screening Efficiency",
      metric: "Average Time Per Screening",
      value: "18.3 minutes",
      target: "20 minutes",
      status: "exceeding",
      trend: "improving",
      recommendation: "Current efficiency is excellent. Consider documenting best practices for replication."
    },
    {
      category: "Parent Engagement",
      metric: "WhatsApp Response Rate",
      value: "73.2%",
      target: "80%",
      status: "below",
      trend: "stable",
      recommendation: "Implement targeted engagement campaigns for low-responding demographics."
    },
    {
      category: "Follow-up Success",
      metric: "Missed Appointments",
      value: "12.4%",
      target: "<10%",
      status: "above",
      trend: "worsening",
      recommendation: "Deploy SMS reminders 48 hours before appointments and provide transport support."
    },
    {
      category: "Resource Utilization",
      metric: "Coordinator Workload",
      value: "42 children/coordinator",
      target: "40 children/coordinator",
      status: "above",
      trend: "stable",
      recommendation: "Consider hiring additional coordinators or redistributing case loads."
    }
  ];

  // Enhanced screening range analytics
  const screeningRangeData = [
    {
      category: "First Screening (0-6 months)",
      total: 3247,
      completed: 2956,
      normal: 2634,
      atRisk: 322,
      completionRate: 91.1,
      riskRate: 10.9
    },
    {
      category: "Second Screening (6-12 months)", 
      total: 4185,
      completed: 3798,
      normal: 3380,
      atRisk: 418,
      completionRate: 90.8,
      riskRate: 11.0
    },
    {
      category: "Third Screening (12-24 months)",
      total: 4312,
      completed: 3925,
      normal: 3454,
      atRisk: 471,
      completionRate: 91.0,
      riskRate: 12.0
    },
    {
      category: "Fourth Screening (24-36 months)",
      total: 3892,
      completed: 3558,
      normal: 3026,
      atRisk: 532,
      completionRate: 91.4,
      riskRate: 15.0
    },
    {
      category: "Fifth+ Screening (36+ months)",
      total: 4611,
      completed: 4187,
      normal: 3563,
      atRisk: 624,
      completionRate: 90.8,
      riskRate: 14.9
    }
  ];

  // Developmental improvement tracking
  const developmentalImprovements = [
    {
      domain: "Communication",
      icon: <MessageSquare className="w-5 h-5" />,
      totalWithDelays: 1567,
      improved: 1078,
      significantImprovement: 567,
      improvementRate: 68.8,
      averageImprovementMonths: 3.2
    },
    {
      domain: "Gross Motor", 
      icon: <Activity className="w-5 h-5" />,
      totalWithDelays: 1234,
      improved: 1015,
      significantImprovement: 502,
      improvementRate: 82.3,
      averageImprovementMonths: 2.8
    },
    {
      domain: "Fine Motor",
      icon: <Zap className="w-5 h-5" />,
      totalWithDelays: 892,
      improved: 735,
      significantImprovement: 367,
      improvementRate: 82.4,
      averageImprovementMonths: 2.5
    },
    {
      domain: "Personal Social",
      icon: <Heart className="w-5 h-5" />,
      totalWithDelays: 743,
      improved: 487,
      significantImprovement: 242,
      improvementRate: 65.6,
      averageImprovementMonths: 4.1
    },
    {
      domain: "Problem Solving",
      icon: <Brain className="w-5 h-5" />,
      totalWithDelays: 456,
      improved: 367,
      significantImprovement: 189,
      improvementRate: 80.5,
      averageImprovementMonths: 3.8
    }
  ];

  // Intervention success analytics
  const interventionSuccessData = [
    {
      type: "Speech Therapy",
      totalCases: 856,
      completed: 623,
      successful: 534,
      partialSuccess: 89,
      successRate: 85.7,
      averageDuration: 4.2
    },
    {
      type: "Motor Skills Training",
      totalCases: 634,
      completed: 512,
      successful: 456,
      partialSuccess: 56,
      successRate: 89.1,
      averageDuration: 3.1
    },
    {
      type: "Parent Training Programs",
      totalCases: 1247,
      completed: 1089,
      successful: 934,
      partialSuccess: 155,
      successRate: 85.8,
      averageDuration: 2.8
    },
    {
      type: "Behavioral Interventions",
      totalCases: 423,
      completed: 356,
      successful: 298,
      partialSuccess: 58,
      successRate: 83.7,
      averageDuration: 5.2
    }
  ];

  // Progressive screening outcomes over multiple sessions
  const progressiveOutcomes = [
    { session: 1, improved: 0, maintained: 18456, worsened: 0 },
    { session: 2, improved: 234, maintained: 17892, worsened: 89 },
    { session: 3, improved: 567, maintained: 17234, worsened: 124 },
    { session: 4, improved: 892, maintained: 16543, worsened: 156 },
    { session: 5, improved: 1247, maintained: 15789, worsened: 187 }
  ];

  const ageDistribution = [
    { age: "0-1 years", count: 3500, percentage: 17.3 },
    { age: "1-2 years", count: 4200, percentage: 20.7 },
    { age: "2-3 years", count: 4100, percentage: 20.2 },
    { age: "3-4 years", count: 3800, percentage: 18.8 },
    { age: "4-5 years", count: 2900, percentage: 14.3 },
    { age: "5-6 years", count: 1747, percentage: 8.6 },
  ];

  const statusDistribution = [
    { name: "Normal Development", value: 16200, color: "#22c55e" },
    { name: "At-Risk", value: 2047, color: "#ef4444" },
    { name: "Pending Assessment", value: 1500, color: "#f59e0b" },
    { name: "Under Intervention", value: 500, color: "#8b5cf6" },
  ];

  const interventionProgress = [
    { category: "Communication", total: 450, completed: 320, inProgress: 100, pending: 30 },
    { category: "Motor Skills", total: 380, completed: 280, inProgress: 80, pending: 20 },
    { category: "Problem Solving", total: 520, completed: 350, inProgress: 120, pending: 50 },
    { category: "Personal Social", total: 290, completed: 190, inProgress: 70, pending: 30 },
    { category: "Fine Motor", total: 210, completed: 140, inProgress: 50, pending: 20 },
  ];

  // Calculate total children with improvements
  const totalChildrenWithImprovements = developmentalImprovements.reduce((sum, domain) => sum + domain.improved, 0);
  const totalChildrenWithSignificantImprovements = developmentalImprovements.reduce((sum, domain) => sum + domain.significantImprovement, 0);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleExportData = () => {
    // Mock export functionality
    console.log("Exporting analytics data...");
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h2 className="text-3xl font-bold">Enhanced Overall Analytics View</h2>
            <p className="text-gray-600">Comprehensive insights, delay tracking, referrals, and performance analytics</p>
          </div>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="flex items-center space-x-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search analytics, centers, teachers, or metrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <Select value={analyticsFilter} onValueChange={setAnalyticsFilter}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter Analytics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Analytics</SelectItem>
              <SelectItem value="delays">Delay Focused</SelectItem>
              <SelectItem value="referrals">Referral Focused</SelectItem>
              <SelectItem value="performance">Performance Focused</SelectItem>
              <SelectItem value="operational">Operational Insights</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Enhanced Key Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Children</p>
                <p className="text-2xl font-bold">20,247</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+5.2%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Delays</p>
                <p className="text-2xl font-bold">{delayTrackingData.totalDelaysDetected.toLocaleString()}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">-2.3%</span>
              <span className="text-gray-600 ml-1">from last quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Children Improved</p>
                <p className="text-2xl font-bold">{totalChildrenWithImprovements.toLocaleString()}</p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+15.3%</span>
              <span className="text-gray-600 ml-1">this quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Referrals</p>
                <p className="text-2xl font-bold">{referralData.totalReferrals.toLocaleString()}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+8.7%</span>
              <span className="text-gray-600 ml-1">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Significant Progress</p>
                <p className="text-2xl font-bold">{totalChildrenWithSignificantImprovements.toLocaleString()}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+12.7%</span>
              <span className="text-gray-600 ml-1">this quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Screening Rate</p>
                <p className="text-2xl font-bold">91.0%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+2.1%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Referral Success</p>
                <p className="text-2xl font-bold">89.2%</p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+4.1%</span>
              <span className="text-gray-600 ml-1">this quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Top AWC Score</p>
                <p className="text-2xl font-bold">98.7%</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Building className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-blue-600">Kuppam Town</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="delays">Delay Tracking</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="performance">Top Performers</TabsTrigger>
          <TabsTrigger value="screening-ranges">Screening Ranges</TabsTrigger>
          <TabsTrigger value="improvements">Improvements</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="operational">Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Status Distribution */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Development Status Distribution</CardTitle>
                <CardDescription>Current status of all children in the program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                      >
                        {statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value.toLocaleString(), "Children"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Progress Tracking</CardTitle>
                <CardDescription>Screenings, risk identification, and improvements over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={monthlyScreenings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="screenings" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Total Screenings"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="atRisk" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="At-Risk Identified"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="improvements" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        name="Children Improved"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Priority Actions Needed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                  <div className="flex items-center space-x-2 text-red-800">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">High Priority</span>
                  </div>
                  <p className="mt-2 text-sm text-red-700">247 children require immediate intervention</p>
                  <Button size="sm" variant="destructive" className="mt-3">
                    Review Cases
                  </Button>
                </div>

                <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                  <div className="flex items-center space-x-2 text-yellow-800">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">Pending Screenings</span>
                  </div>
                  <p className="mt-2 text-sm text-yellow-700">1,815 children awaiting screening appointments</p>
                  <Button size="sm" variant="outline" className="mt-3">
                    Schedule Screenings
                  </Button>
                </div>

                <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Follow-up Required</span>
                  </div>
                  <p className="mt-2 text-sm text-blue-700">523 children need progress reassessment</p>
                  <Button size="sm" variant="outline" className="mt-3">
                    Schedule Follow-ups
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delays" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Delay Tracking Analytics</CardTitle>
              <CardDescription>
                Detailed breakdown of developmental delays detected across the population
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg border-2 border-orange-200">
                  <div className="text-4xl font-bold text-orange-700 mb-2">
                    {delayTrackingData.totalDelaysDetected.toLocaleString()}
                  </div>
                  <div className="text-lg font-medium text-orange-800 mb-1">Total Delays Detected</div>
                  <div className="text-sm text-orange-600">Across all developmental domains</div>
                  <div className="mt-3 text-xs text-orange-600">
                    21.2% of total population affected
                  </div>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={delayTrackingData.childrenByDelayCount}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ delayCount, percentage }) => `${delayCount}: ${percentage}%`}
                      >
                        {delayTrackingData.childrenByDelayCount.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value.toLocaleString(), "Children"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-4">Children by Number of Delays</h4>
                {delayTrackingData.childrenByDelayCount.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-orange-50">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-lg">{item.delayCount}</h5>
                      <Badge variant="outline" style={{ backgroundColor: item.color, color: 'white' }}>
                        {item.percentage}% of affected children
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-3">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold" style={{ color: item.color }}>{item.count.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Children Affected</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-green-600">{Math.round(item.count * 0.73).toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Under Intervention</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{Math.round(item.count * 0.68).toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Showing Progress</div>
                      </div>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-4">Delays by Developmental Domain</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={delayTrackingData.delaysByDomain}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="domain" />
                      <YAxis />
                      <Tooltip formatter={(value) => [value.toLocaleString(), "Delays"]} />
                      <Bar dataKey="count" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Referral Analytics</CardTitle>
              <CardDescription>
                Detailed tracking of referrals, completion rates, and outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg border-2 border-purple-200">
                  <div className="text-4xl font-bold text-purple-700 mb-2">
                    {referralData.totalReferrals.toLocaleString()}
                  </div>
                  <div className="text-lg font-medium text-purple-800 mb-1">Total Referrals Made</div>
                  <div className="text-sm text-purple-600">Across all intervention types</div>
                  <div className="mt-3 text-xs text-purple-600">
                    78.1% completion rate
                  </div>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={referralData.referralStatus}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ status, percentage }) => `${status}: ${percentage}%`}
                      >
                        {referralData.referralStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value.toLocaleString(), "Referrals"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-4">Referrals by Intervention Type</h4>
                {referralData.referralsByType.map((referral, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-lg">{referral.type}</h5>
                      <Badge variant="outline" className="bg-white text-green-700">
                        {referral.successRate}% Success Rate
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4 mb-3">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{referral.count.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Referrals</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-green-600">{referral.completed.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-orange-600">{referral.pending.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Pending</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{referral.successRate}%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </div>
                    </div>
                    <Progress value={(referral.completed / referral.count) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Anganwadi Centers & Teachers</CardTitle>
              <CardDescription>
                Best performers based on screening rates, parent engagement, and developmental outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topPerformingCenters.map((center, index) => (
                  <div key={index} className="p-6 border rounded-lg bg-gradient-to-r from-yellow-50 to-green-50 border-l-4" style={{ borderLeftColor: index === 0 ? '#fbbf24' : index === 1 ? '#d1d5db' : '#cd7c2f' }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full" style={{ backgroundColor: index === 0 ? '#fbbf24' : index === 1 ? '#d1d5db' : '#cd7c2f' }}>
                          <span className="text-white font-bold text-lg">#{center.rank}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">{center.centerName}</h4>
                          <p className="text-sm text-gray-600">Code: {center.centerCode}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {center.achievements.map((achievement, achIndex) => (
                          <Badge key={achIndex} variant="outline" className="bg-white">
                            <Award className="w-3 h-3 mr-1" />
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium">{center.teacher}</div>
                            <div className="text-sm text-gray-600">Teacher Code: {center.teacherCode}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="font-medium">{center.totalChildren} Children</div>
                            <div className="text-sm text-gray-600">Under supervision</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Activity className="w-5 h-5 text-purple-600" />
                          <div>
                            <div className="font-medium">{center.activities} Activities</div>
                            <div className="text-sm text-gray-600">Conducted this quarter</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg border">
                          <div className="text-xl font-bold text-green-600">{center.screeningRate}%</div>
                          <div className="text-sm text-gray-600">Screening Rate</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border">
                          <div className="text-xl font-bold text-blue-600">{center.parentEngagement}%</div>
                          <div className="text-sm text-gray-600">Parent Engagement</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border">
                          <div className="text-xl font-bold text-purple-600">{center.improvementRate}%</div>
                          <div className="text-sm text-gray-600">Improvement Rate</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border">
                          <div className="text-xl font-bold text-yellow-600">
                            {Math.round((center.screeningRate + center.parentEngagement + center.improvementRate) / 3)}%
                          </div>
                          <div className="text-sm text-gray-600">Overall Score</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Operational Insights & Recommendations</CardTitle>
              <CardDescription>
                Data-driven insights to improve program operations and outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {operationalInsights.map((insight, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg">{insight.category}</h4>
                      <Badge 
                        variant="outline" 
                        className={
                          insight.status === 'exceeding' ? 'bg-green-100 text-green-700' :
                          insight.status === 'below' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {insight.status === 'exceeding' ? 'Exceeding Target' :
                         insight.status === 'below' ? 'Below Target' :
                         'Above Target'}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="font-medium text-gray-600">{insight.metric}</div>
                        <div className="text-xl font-bold text-blue-600">{insight.value}</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="font-medium text-gray-600">Target</div>
                        <div className="text-xl font-bold text-gray-700">{insight.target}</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="font-medium text-gray-600">Trend</div>
                        <div className="flex items-center justify-center">
                          {insight.trend === 'improving' ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : insight.trend === 'worsening' ? (
                            <TrendingDown className="w-5 h-5 text-red-600" />
                          ) : (
                            <Minus className="w-5 h-5 text-yellow-600" />
                          )}
                          <span className={`ml-1 capitalize ${
                            insight.trend === 'improving' ? 'text-green-600' :
                            insight.trend === 'worsening' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {insight.trend}
                          </span>
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="font-medium text-gray-600">Priority</div>
                        <div className="text-xl font-bold text-purple-600">
                          {insight.status === 'below' || insight.status === 'above' ? 'High' : 'Medium'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                      <div className="font-medium text-blue-800 mb-1">Recommendation:</div>
                      <div className="text-sm text-blue-700">{insight.recommendation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="screening-ranges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Screening Range Analytics</CardTitle>
              <CardDescription>Detailed breakdown of screening completion and outcomes across different age ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {screeningRangeData.map((range, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">{range.category}</h4>
                      <Badge variant="outline" className="bg-white">
                        {range.completionRate}% Complete
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{range.total.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Eligible</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{range.completed.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Screened</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{range.normal.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Normal Development</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{range.atRisk.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">At-Risk ({range.riskRate}%)</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion Progress</span>
                        <span>{range.completionRate}%</span>
                      </div>
                      <Progress value={range.completionRate} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progressive Screening Outcomes</CardTitle>
              <CardDescription>How children's developmental status changes across multiple screening sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressiveOutcomes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="session" label={{ value: 'Screening Session', position: 'insideBottom', offset: -5 }} />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="improved" stackId="1" stroke="#22c55e" fill="#22c55e" name="Improved" />
                    <Area type="monotone" dataKey="maintained" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Maintained" />
                    <Area type="monotone" dataKey="worsened" stackId="1" stroke="#ef4444" fill="#ef4444" name="Worsened" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improvements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Developmental Domain Improvements</CardTitle>
              <CardDescription>
                Children showing improvements after subsequent screenings and interventions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {developmentalImprovements.map((domain, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg">
                          {domain.icon}
                        </div>
                        <h4 className="font-semibold text-lg">{domain.domain}</h4>
                      </div>
                      <Badge variant="outline" className="bg-white text-green-700">
                        {domain.improvementRate}% Success Rate
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-5 gap-4 mb-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-orange-600">{domain.totalWithDelays.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Had Delays</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-green-600">{domain.improved.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Improved</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{domain.significantImprovement.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Significant Progress</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{domain.improvementRate}%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-indigo-600">{domain.averageImprovementMonths}</div>
                        <div className="text-sm text-gray-600">Avg. Months</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Improvement Rate</span>
                        <span>{domain.improvementRate}%</span>
                      </div>
                      <Progress value={domain.improvementRate} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Summary: Children with Developmental Improvements</CardTitle>
              <CardDescription>Overall statistics of children showing progress after interventions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg border-2 border-green-200">
                  <div className="text-4xl font-bold text-green-700 mb-2">
                    {totalChildrenWithImprovements.toLocaleString()}
                  </div>
                  <div className="text-lg font-medium text-green-800 mb-1">Total Children Improved</div>
                  <div className="text-sm text-green-600">Across all developmental domains</div>
                  <div className="mt-3 text-xs text-green-600">
                    {Math.round((totalChildrenWithImprovements / 20247) * 100)}% of total population
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg border-2 border-blue-200">
                  <div className="text-4xl font-bold text-blue-700 mb-2">
                    {totalChildrenWithSignificantImprovements.toLocaleString()}
                  </div>
                  <div className="text-lg font-medium text-blue-800 mb-1">Significant Progress</div>
                  <div className="text-sm text-blue-600">Major developmental gains</div>
                  <div className="mt-3 text-xs text-blue-600">
                    {Math.round((totalChildrenWithSignificantImprovements / totalChildrenWithImprovements) * 100)}% of improved children
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg border-2 border-purple-200">
                  <div className="text-4xl font-bold text-purple-700 mb-2">76.4%</div>
                  <div className="text-lg font-medium text-purple-800 mb-1">Overall Success Rate</div>
                  <div className="text-sm text-purple-600">Children showing any improvement</div>
                  <div className="mt-3 text-xs text-purple-600">
                    Best performance in Motor Skills domains
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interventions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Intervention Success Analytics</CardTitle>
              <CardDescription>Detailed outcomes and success rates for different intervention types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {interventionSuccessData.map((intervention, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-violet-50">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">{intervention.type}</h4>
                      <Badge variant="outline" className="bg-white text-purple-700">
                        {intervention.successRate}% Success
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-5 gap-4 mb-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{intervention.totalCases.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Cases</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{intervention.completed.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-green-600">{intervention.successful.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Successful</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-yellow-600">{intervention.partialSuccess.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Partial Success</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-indigo-600">{intervention.averageDuration}</div>
                        <div className="text-sm text-gray-600">Avg. Months</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Success Rate</span>
                        <span>{intervention.successRate}%</span>
                      </div>
                      <Progress value={intervention.successRate} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intervention Progress by Category</CardTitle>
              <CardDescription>Status of ongoing interventions across different developmental areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {interventionProgress.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{category.category}</h4>
                      <span className="text-sm text-gray-600">{category.total} total cases</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-green-600">{category.completed}</div>
                        <div className="text-gray-600">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-blue-600">{category.inProgress}</div>
                        <div className="text-gray-600">In Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-orange-600">{category.pending}</div>
                        <div className="text-gray-600">Pending</div>
                      </div>
                    </div>
                    <Progress 
                      value={(category.completed / category.total) * 100} 
                      className="h-2"
                    />
                    <div className="text-xs text-gray-600">
                      {Math.round((category.completed / category.total) * 100)}% completion rate
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
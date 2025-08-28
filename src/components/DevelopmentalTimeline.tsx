import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { 
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
  Stethoscope,
  UserCheck,
  Smartphone,
  GraduationCap,
  Target,
  Calendar as CalendarIcon,
  Lightbulb,
  ArrowRight,
  Star,
  Award,
  BookOpen,
  PlayCircle,
  Sparkles,
  Gift,
  Gamepad2,
  PuzzlePiece,
  Music,
  Palette,
  Video,
  Headphones,
  Camera,
  Mic,
  FileText,
  ClipboardList,
  TrendingUp as TrendIcon,
  BarChart3,
  LineChart as LineChartIcon,
  Waves
} from "lucide-react";

interface DevelopmentalAge {
  domain: string;
  chronologicalAgeMonths: number;
  developmentalAgeMonths: number;
  gapMonths: number;
  status: "advanced" | "on-track" | "mild-delay" | "moderate-delay" | "severe-delay";
  icon: React.ReactNode;
  color: string;
  schoolReadinessImpact: "high" | "medium" | "low";
}

interface Activity {
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

interface TouchpointCategory {
  category: "screening-assessment" | "workshops-awareness" | "home-visits" | "referral" | "digital-whatsapp";
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  lastActivity: string;
  nextScheduled?: string;
  effectiveness: "high" | "medium" | "low";
}

interface FutureMilestone {
  ageMonths: number;
  domain: string;
  milestone: string;
  intervention: string;
  priority: "high" | "medium" | "low";
  icon: React.ReactNode;
}

interface DevelopmentalTimelineProps {
  childName: string;
  currentAgeInMonths: number;
  dateOfBirth: string;
  developmentalAges: DevelopmentalAge[];
  activities: Activity[];
}

export function DevelopmentalTimeline({ 
  childName, 
  currentAgeInMonths, 
  dateOfBirth, 
  developmentalAges, 
  activities 
}: DevelopmentalTimelineProps) {
  
  // Helper function to format age display
  const formatAgeDisplay = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths}m`;
    if (remainingMonths === 0) return `${years}y`;
    return `${years}y ${remainingMonths}m`;
  };

  // Get icon for activity type
  const getActivityIcon = (type: string, category: string) => {
    switch (category) {
      case "screening-assessment": return <Stethoscope className="w-4 h-4" />;
      case "workshops-awareness": return <Users className="w-4 h-4" />;
      case "home-visits": return <Home className="w-4 h-4" />;
      case "referral": return <UserCheck className="w-4 h-4" />;
      case "digital-whatsapp": return <MessageSquare className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  // Get color for activity category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "screening-assessment": return "#3b82f6";
      case "workshops-awareness": return "#10b981";
      case "home-visits": return "#8b5cf6";
      case "referral": return "#ef4444";
      case "digital-whatsapp": return "#f59e0b";
      default: return "#6b7280";
    }
  };

  // Prepare touchpoint categories data
  const touchpointCategories: TouchpointCategory[] = [
    {
      category: "screening-assessment",
      name: "Developmental Screening",
      icon: <Stethoscope className="w-6 h-6" />,
      color: "#3b82f6",
      count: activities.filter(a => a.touchpointCategory === "screening-assessment").length,
      lastActivity: "2024-07-15",
      nextScheduled: "2024-09-15",
      effectiveness: "high"
    },
    {
      category: "workshops-awareness",
      name: "Parent Education Workshops",
      icon: <Users className="w-6 h-6" />,
      color: "#10b981",
      count: activities.filter(a => a.touchpointCategory === "workshops-awareness").length,
      lastActivity: "2024-05-15",
      nextScheduled: "2024-09-01",
      effectiveness: "high"
    },
    {
      category: "home-visits",
      name: "Home Interventions",
      icon: <Home className="w-6 h-6" />,
      color: "#8b5cf6",
      count: activities.filter(a => a.touchpointCategory === "home-visits").length,
      lastActivity: "2024-06-15",
      nextScheduled: "2024-08-30",
      effectiveness: "high"
    },
    {
      category: "digital-whatsapp",
      name: "Digital Support",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "#f59e0b",
      count: activities.filter(a => a.touchpointCategory === "digital-whatsapp").length,
      lastActivity: "2024-04-20",
      nextScheduled: "Daily",
      effectiveness: "medium"
    },
    {
      category: "referral",
      name: "Specialist Referrals",
      icon: <UserCheck className="w-6 h-6" />,
      color: "#ef4444",
      count: activities.filter(a => a.touchpointCategory === "referral").length,
      lastActivity: "2024-08-20",
      effectiveness: "high"
    }
  ];

  // Future milestones data
  const futureMilestones: FutureMilestone[] = [
    {
      ageMonths: 42,
      domain: "Language & Communication",
      milestone: "Use 50+ words in vocabulary, combine 2-3 words",
      intervention: "Intensive speech therapy 3x/week + parent coaching",
      priority: "high",
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      ageMonths: 45,
      domain: "Social-Emotional",
      milestone: "Play cooperatively with peers, show empathy",
      intervention: "Group play sessions and emotional regulation activities",
      priority: "high",
      icon: <Heart className="w-4 h-4" />
    },
    {
      ageMonths: 48,
      domain: "Fine Motor Skills",
      milestone: "Draw simple shapes, use scissors effectively",
      intervention: "Fine motor skill practice sessions",
      priority: "medium",
      icon: <Zap className="w-4 h-4" />
    },
    {
      ageMonths: 48,
      domain: "Cognitive Development",
      milestone: "Follow 3-step instructions, understand basic concepts",
      intervention: "Cognitive stimulation activities and puzzles",
      priority: "medium",
      icon: <Brain className="w-4 h-4" />
    },
    {
      ageMonths: 54,
      domain: "Language & Communication",
      milestone: "Speak in complete sentences, tell simple stories",
      intervention: "Advanced speech therapy and narrative skills training",
      priority: "high",
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      ageMonths: 60,
      domain: "School Readiness",
      milestone: "Ready for formal education entry",
      intervention: "School readiness assessment and preparation program",
      priority: "high",
      icon: <GraduationCap className="w-4 h-4" />
    }
  ];

  // Generate sin wave comparison data
  const generateComparisonData = () => {
    const data = [];
    const startAge = 24; // Start from 2 years
    const endAge = 72; // Go to 6 years

    for (let age = startAge; age <= endAge; age += 3) {
      // Child with Carengrow intervention - gradual improvement toward normal
      const withInterventionProgress = Math.min(age, age * 0.95 + (age - startAge) * 0.15);
      
      // Child without intervention - increasing lag over time
      const naturalLag = age * 0.75 - (age - startAge) * 0.08;
      
      // Current child's actual trajectory based on developmental ages
      const currentActualAge = age <= currentAgeInMonths ? 
        developmentalAges.reduce((sum, d) => sum + d.developmentalAgeMonths, 0) / developmentalAges.length * (age / currentAgeInMonths)
        : null;

      data.push({
        chronologicalAge: age,
        withCarengrow: Math.round(withInterventionProgress),
        withoutIntervention: Math.round(naturalLag),
        actualProgress: currentActualAge ? Math.round(currentActualAge) : null,
        ageLabel: formatAgeDisplay(age)
      });
    }

    return data;
  };

  const comparisonData = generateComparisonData();

  // Sort activities by age
  const sortedActivities = [...activities].sort((a, b) => a.ageInMonths - b.ageInMonths);

  return (
    <div className="space-y-8">
      {/* Timeline Visualization */}
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-semibold text-slate-800">Timeline Overview</h4>
            <p className="text-sm text-slate-600">Complete developmental journey from birth to present</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600">Current Age</div>
            <div className="font-semibold text-slate-800">{formatAgeDisplay(currentAgeInMonths)}</div>
          </div>
        </div>

        {/* Timeline Line */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-purple-300 to-emerald-300"></div>
          
          <div className="space-y-6">
            {sortedActivities.map((activity, index) => (
              <div key={index} className="relative flex items-start space-x-4">
                {/* Timeline Dot */}
                <div 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white shadow-md"
                  style={{ 
                    borderColor: getCategoryColor(activity.touchpointCategory),
                    color: getCategoryColor(activity.touchpointCategory)
                  }}
                >
                  {getActivityIcon(activity.type, activity.touchpointCategory)}
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-slate-800">{activity.title}</h5>
                    <div className="text-sm text-slate-600">
                      {formatAgeDisplay(activity.ageInMonths)} • {activity.date}
                    </div>
                  </div>
                  
                  {activity.description && (
                    <p className="text-sm text-slate-600 mb-2">{activity.description}</p>
                  )}
                  
                  {activity.outcome && (
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-700">{activity.outcome}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4">
                    <Badge 
                      variant="outline" 
                      className="text-xs"
                      style={{ 
                        borderColor: getCategoryColor(activity.touchpointCategory),
                        color: getCategoryColor(activity.touchpointCategory)
                      }}
                    >
                      {activity.touchpointCategory.replace('-', ' ')}
                    </Badge>
                    
                    {activity.coordinator && (
                      <span className="text-xs text-slate-500">by {activity.coordinator}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Developmental Age by Domain */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-200">
        <h4 className="font-semibold text-violet-800 mb-4">Current Developmental Age by Domain</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {developmentalAges.map((domain, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-violet-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: domain.color + '20' }}>
                  <div style={{ color: domain.color }}>
                    {domain.icon}
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-slate-800">{domain.domain}</h5>
                  <p className="text-sm text-slate-600">
                    {formatAgeDisplay(domain.developmentalAgeMonths)} / {formatAgeDisplay(domain.chronologicalAgeMonths)}
                  </p>
                </div>
              </div>
              <Progress 
                value={(domain.developmentalAgeMonths / domain.chronologicalAgeMonths) * 100} 
                className="h-2 mb-2"
              />
              <div className="text-xs text-slate-600">
                Gap: {domain.gapMonths > 0 ? '+' : ''}{domain.gapMonths} months
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carengrow Activity Touchpoints by Category - Horizontal Layout */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
        <h4 className="font-semibold text-emerald-800 mb-6 flex items-center space-x-2">
          <Activity className="w-5 h-5" />
          <span>Carengrow Activity Touchpoints by Category</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {touchpointCategories.map((category, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-emerald-200 text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: category.color + '20', color: category.color }}
              >
                {category.icon}
              </div>
              
              <h6 className="font-semibold text-slate-800 mb-2">{category.name}</h6>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Activities:</span>
                  <span className="font-medium">{category.count}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Last:</span>
                  <span className="font-medium">{category.lastActivity}</span>
                </div>
                
                {category.nextScheduled && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Next:</span>
                    <span className="font-medium">{category.nextScheduled}</span>
                  </div>
                )}
                
                <Badge 
                  className={`text-xs mt-2 ${
                    category.effectiveness === 'high' ? 'bg-emerald-100 text-emerald-700' :
                    category.effectiveness === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}
                >
                  {category.effectiveness} effectiveness
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Touchpoint Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 p-4 rounded-lg border border-emerald-200 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {touchpointCategories.reduce((sum, cat) => sum + cat.count, 0)}
            </div>
            <div className="text-sm text-emerald-700">Total Activities</div>
          </div>
          <div className="bg-white/70 p-4 rounded-lg border border-emerald-200 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {touchpointCategories.filter(cat => cat.effectiveness === 'high').length}
            </div>
            <div className="text-sm text-emerald-700">High Impact Categories</div>
          </div>
          <div className="bg-white/70 p-4 rounded-lg border border-emerald-200 text-center">
            <div className="text-2xl font-bold text-purple-600">5</div>
            <div className="text-sm text-emerald-700">Active Touchpoint Types</div>
          </div>
        </div>
      </div>

      {/* Expected Future Milestones & Interventions */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-6 flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>Expected Future Milestones & Interventions</span>
        </h4>
        
        <div className="space-y-4">
          {futureMilestones.map((milestone, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-blue-200">
              <div 
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  milestone.priority === 'high' ? 'bg-red-100 text-red-600' :
                  milestone.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                  'bg-emerald-100 text-emerald-600'
                }`}
              >
                {milestone.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h6 className="font-semibold text-slate-800">{milestone.domain}</h6>
                    <Badge className={`text-xs ${
                      milestone.priority === 'high' ? 'bg-red-100 text-red-700' :
                      milestone.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {milestone.priority} priority
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-600">
                    Target: {formatAgeDisplay(milestone.ageMonths)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-slate-700">Milestone: </span>
                      <span className="text-slate-600">{milestone.milestone}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-slate-700">Intervention: </span>
                      <span className="text-slate-600">{milestone.intervention}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Future Timeline Summary */}
        <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-200">
          <h6 className="font-medium text-blue-800 mb-2 flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4" />
            <span>Timeline to School Readiness</span>
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span><strong>Next 6 months:</strong> Focus on language development</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendIcon className="w-4 h-4" />
              <span><strong>12 months:</strong> Social-emotional skills building</span>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-4 h-4" />
              <span><strong>24 months:</strong> School readiness preparation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Assessment Insights - Sin Wave Chart */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-4 flex items-center space-x-2">
          <Waves className="w-5 h-5" />
          <span>Timeline Assessment Insights: Carengrow Contribution Analysis</span>
        </h4>
        
        <p className="text-sm text-purple-700 mb-6">
          Comparison of developmental trajectory with Carengrow intervention vs. natural progression without support
        </p>

        <div className="h-96 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="ageLabel" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={12}
                label={{ value: 'Developmental Age (Months)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                labelFormatter={(label) => `Chronological Age: ${label}`}
                formatter={(value: any, name: string) => [
                  `${value} months`, 
                  name === 'withCarengrow' ? 'With Carengrow Support' :
                  name === 'withoutIntervention' ? 'Without Intervention' :
                  'Current Progress'
                ]}
              />
              <Legend />
              
              {/* Ideal Development Line */}
              <Line 
                dataKey="chronologicalAge" 
                stroke="#10b981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Ideal Development (1:1 ratio)"
              />
              
              {/* With Carengrow Intervention Area */}
              <Area
                dataKey="withCarengrow"
                stackId="1"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.3}
                strokeWidth={3}
                name="With Carengrow Support"
              />
              
              {/* Without Intervention Area */}
              <Area
                dataKey="withoutIntervention"
                stackId="2"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.2}
                strokeWidth={2}
                strokeDasharray="8 8"
                name="Without Intervention"
              />
              
              {/* Current Actual Progress */}
              {comparisonData.some(d => d.actualProgress) && (
                <Line
                  dataKey="actualProgress"
                  stroke="#f59e0b"
                  strokeWidth={4}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                  name="Current Progress"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Insights Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-slate-800">Carengrow Impact</span>
            </div>
            <div className="text-2xl font-bold text-emerald-600 mb-1">+18 months</div>
            <div className="text-sm text-slate-600">Expected developmental gain by age 5</div>
          </div>
          
          <div className="bg-white/70 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-slate-800">Risk Without Support</span>
            </div>
            <div className="text-2xl font-bold text-red-600 mb-1">-24 months</div>
            <div className="text-sm text-slate-600">Potential lag increase without intervention</div>
          </div>
          
          <div className="bg-white/70 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-slate-800">Net Benefit</span>
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-1">42 months</div>
            <div className="text-sm text-slate-600">Total developmental difference</div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-6 p-4 bg-purple-100 rounded-lg border border-purple-200">
          <h6 className="font-medium text-purple-800 mb-3 flex items-center space-x-2">
            <Lightbulb className="w-4 h-4" />
            <span>Key Insights from Trajectory Analysis</span>
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
            <div>
              <h6 className="font-medium mb-2">Intervention Benefits:</h6>
              <ul className="space-y-1">
                <li>• Gradual closure of developmental gaps over time</li>
                <li>• Accelerated progress in language and social skills</li>
                <li>• Improved school readiness trajectory</li>
                <li>• Prevention of widening developmental delays</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium mb-2">Critical Success Factors:</h6>
              <ul className="space-y-1">
                <li>• Consistent intervention implementation</li>
                <li>• Family engagement and support</li>
                <li>• Multi-modal touchpoint approach</li>
                <li>• Regular progress monitoring and adjustment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
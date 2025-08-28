import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { 
  GraduationCap,
  TrendingUp,
  Crosshair,
  Zap,
  Activity,
  Shield,
  Clock3,
  CalendarCheck,
  CalendarDays,
  Gauge,
  AlertOctagon,
  Timer,
  TrendingDown,
  CheckCircle2,
  Target,
  Calendar
} from "lucide-react";
import { Child, DevelopmentalAge } from "./types";
import { touchpointInterventions } from "./constants";
import { getStatusColor, calculateCarengrowTargets, prepareProjectionData } from "./helpers.tsx";

interface SchoolReadinessSectionProps {
  child: Child;
  developmentalAges: DevelopmentalAge[];
}

export function SchoolReadinessSection({ child, developmentalAges }: SchoolReadinessSectionProps) {
  const carengrowTargets = calculateCarengrowTargets(developmentalAges, child);
  const projectionData = prepareProjectionData(child, carengrowTargets);

  return (
    <AccordionItem value="school-readiness" className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl shadow-lg">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <div className="flex items-center space-x-3">
          <GraduationCap className="w-6 h-6 text-emerald-600" />
          <div className="text-left">
            <h3 className="text-lg font-semibold text-emerald-800">School Readiness Journey</h3>
            <p className="text-sm text-emerald-700">Carengrow intervention targets for 0.25 DQ growth over 6 months</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-8">
          
          {/* Current Status & 6-Month Target */}
          <div className="bg-gradient-to-br from-white to-emerald-50 p-6 rounded-xl border border-emerald-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">{child.schoolReadinessScore}%</div>
                <div className="text-sm text-emerald-700 mb-4">Current School Readiness</div>
                <Progress 
                  value={child.schoolReadinessScore} 
                  className="w-full h-3 bg-emerald-100"
                />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
                <div className="text-sm text-emerald-700 mb-4">6-Month Target</div>
                <Progress 
                  value={85} 
                  className="w-full h-3 bg-blue-100"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{85 - child.schoolReadinessScore}%</div>
                <div className="text-sm text-emerald-700">Gap to Close</div>
              </div>
            </div>
          </div>

          {/* DQ Growth Projections Chart */}
          <div className="bg-white p-6 rounded-xl border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>6-Month Development Projections: With vs Without Intervention</span>
            </h4>
            
            <div className="h-96 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="period" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="#6b7280" 
                    fontSize={12}
                    domain={[0, 120]}
                    label={{ value: 'DQ Score', angle: -90, position: 'insideLeft' }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#059669" 
                    fontSize={12}
                    domain={[0, 100]}
                    label={{ value: 'School Readiness %', angle: 90, position: 'insideRight' }}
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
                  
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="withIntervention"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                    name="DQ with Carengrow Intervention"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="withoutIntervention"
                    stroke="#ef4444"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                    name="DQ without Intervention (0.55 loss factor)"
                  />
                  
                  <Bar
                    yAxisId="right"
                    dataKey="schoolReadinessWithIntervention"
                    fill="#059669"
                    opacity={0.6}
                    name="School Readiness with Intervention"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="schoolReadinessWithoutIntervention"
                    fill="#dc2626"
                    opacity={0.4}
                    name="School Readiness without Intervention"
                  />
                  
                  <ReferenceLine yAxisId="right" y={85} stroke="#3b82f6" strokeDasharray="3 3" label="Target: 85%" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 text-center">
                <div className="text-lg font-bold text-emerald-600">+25</div>
                <div className="text-sm text-emerald-700">Target DQ Growth</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
                <div className="text-lg font-bold text-red-600">-55</div>
                <div className="text-sm text-red-700">Risk without Intervention</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                <div className="text-lg font-bold text-blue-600">80</div>
                <div className="text-sm text-blue-700">Net Benefit (DQ Points)</div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-center">
                <div className="text-lg font-bold text-amber-600">6</div>
                <div className="text-sm text-amber-700">Months to Target</div>
              </div>
            </div>
          </div>

          {/* Domain-wise Targets */}
          <div className="space-y-6">
            <h4 className="font-semibold text-emerald-800 flex items-center space-x-2">
              <Crosshair className="w-5 h-5" />
              <span>Domain-wise Carengrow Intervention Targets</span>
            </h4>
            
            {carengrowTargets.domainTargets.map((target, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: target.color + '20' }}>
                      <div style={{ color: target.color }}>
                        {target.icon}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-800">{target.domain}</h5>
                      <Badge className={`${getStatusColor(target.status)} text-xs`}>
                        {target.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-600">6-Month Target</div>
                    <div className="text-lg font-bold" style={{ color: target.color }}>
                      DQ {target.targetDQ}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-600">Current DQ</div>
                    <div className="text-xl font-bold text-slate-800">{target.currentDQ}</div>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-lg">
                    <div className="text-sm text-emerald-600">Required Growth</div>
                    <div className="text-xl font-bold text-emerald-600">+{target.requiredGrowth} months</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="text-sm text-red-600">Risk of Loss</div>
                    <div className="text-xl font-bold text-red-600">-{target.riskOfLoss} months</div>
                  </div>
                </div>

                {/* Recommended Touchpoints */}
                <div>
                  <h6 className="font-medium text-slate-800 mb-3 flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Recommended Carengrow Touchpoints</span>
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {target.recommendedTouchpoints.slice(0, 4).map((touchpoint, tIndex) => (
                      <div key={tIndex} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="p-2 rounded-lg bg-white" style={{ color: touchpoint.color }}>
                          {touchpoint.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-800 text-sm">{touchpoint.name}</div>
                          <div className="text-xs text-slate-600">{touchpoint.frequency} • {touchpoint.duration}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={`text-xs ${
                              touchpoint.priority === 'high' ? 'bg-red-100 text-red-700' :
                              touchpoint.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-emerald-100 text-emerald-700'
                            }`}>
                              {touchpoint.priority} priority
                            </Badge>
                            <span className="text-xs text-slate-500">
                              Expected: +{Math.round(touchpoint.expectedDQImpact * 100)} DQ points
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Touchpoint Categories Overview */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-4 flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Carengrow Touchpoint Categories & Expected Impact</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {touchpointInterventions.map((intervention, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: intervention.color + '20', color: intervention.color }}>
                      {intervention.icon}
                    </div>
                    <div>
                      <h6 className="font-medium text-slate-800">{intervention.name}</h6>
                      <div className="text-xs text-slate-600">{intervention.frequency}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{intervention.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-600">Expected DQ Impact:</span>
                      <Badge className="text-xs bg-emerald-100 text-emerald-700">
                        +{Math.round(intervention.expectedDQImpact * 100)} points
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-600">
                      <span className="font-medium">Target Domains:</span> {intervention.targetDomains.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Analysis & Urgency */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
            <h4 className="font-semibold text-red-800 mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Intervention Urgency & Risk Analysis</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-red-700 mb-3">Critical Risk Factors:</h5>
                <ul className="space-y-2 text-sm text-red-600">
                  <li className="flex items-center space-x-2">
                    <AlertOctagon className="w-4 h-4" />
                    <span>Language delay (-12 months) severely impacts school readiness</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Timer className="w-4 h-4" />
                    <span>Without intervention: 55-point DQ decline expected</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <TrendingDown className="w-4 h-4" />
                    <span>School readiness score could drop to 44% without support</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-emerald-700 mb-3">With Carengrow Intervention:</h5>
                <ul className="space-y-2 text-sm text-emerald-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Target 25-point DQ improvement across all domains</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>Projected 85% school readiness achievement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Structured 6-month intervention timeline</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Timeline Urgency */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h6 className="font-medium text-amber-800 mb-2 flex items-center space-x-2">
                <Clock3 className="w-4 h-4" />
                <span>Critical Action Timeline</span>
              </h6>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CalendarCheck className="w-4 h-4 text-red-600" />
                  <span><strong>Immediate (0-2 weeks):</strong> Intensive language therapy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarDays className="w-4 h-4 text-amber-600" />
                  <span><strong>Short-term (1-3 months):</strong> Home visit interventions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gauge className="w-4 h-4 text-emerald-600" />
                  <span><strong>Target (6 months):</strong> School readiness assessment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
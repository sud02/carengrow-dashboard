import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapView } from "./MapView";
import { OverallView } from "./OverallView";
import { EnhancedOverallView } from "./EnhancedOverallView";
import { ProjectType } from "./ProjectSelection";
import { LogOut, Map, BarChart3, Users, MapPin, Building } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type DashboardMode = "individual" | "overall" | "home";

interface DashboardProps {
  onLogout: () => void;
  selectedProject: ProjectType | null;
}

export function Dashboard({ onLogout, selectedProject }: DashboardProps) {
  const [currentMode, setCurrentMode] = useState<DashboardMode>("home");

  // Project-specific data
  const getProjectData = (projectId: ProjectType | null) => {
    switch (projectId) {
      case "kuppam-pilot":
        return {
          name: "Kuppam Pilot",
          totalChildren: 847,
          screeningsCompleted: 789,
          riskIdentified: 84,
          interventionsActive: 67,
          screeningRate: 93.2,
          atRiskRate: 9.9,
          interventionRate: 79.8,
          location: "Kuppam Town & Surrounding Villages",
          centers: 5
        };
      case "kuppam-constituency":
        return {
          name: "Kuppam Constituency",
          totalChildren: 20247,
          screeningsCompleted: 18432,
          riskIdentified: 1847,
          interventionsActive: 1523,
          screeningRate: 91.0,
          atRiskRate: 10.0,
          interventionRate: 82.5,
          location: "Entire Kuppam Assembly Constituency",
          centers: 45
        };
      case "tirupati":
        return {
          name: "Tirupati",
          totalChildren: 12456,
          screeningsCompleted: 10934,
          riskIdentified: 1127,
          interventionsActive: 892,
          screeningRate: 87.8,
          atRiskRate: 10.3,
          interventionRate: 79.1,
          location: "Tirupati Municipal Corporation Area",
          centers: 28
        };
      default:
        return {
          name: "Unknown Project",
          totalChildren: 0,
          screeningsCompleted: 0,
          riskIdentified: 0,
          interventionsActive: 0,
          screeningRate: 0,
          atRiskRate: 0,
          interventionRate: 0,
          location: "Unknown Location",
          centers: 0
        };
    }
  };

  const projectData = getProjectData(selectedProject);

  const renderContent = () => {
    switch (currentMode) {
      case "individual":
        return <MapView onBack={() => setCurrentMode("home")} selectedProject={selectedProject} />;
      case "overall":
        return <EnhancedOverallView onBack={() => setCurrentMode("home")} selectedProject={selectedProject} />;
      default:
        return (
          <div className="relative">
            {/* Background Image for Home View Only */}
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1679335026558-3e71768f0af9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYW1pbHklMjBtb3RoZXIlMjBmYXRoZXIlMjBjaGlsZCUyMHRvZ2V0aGVyfGVufDF8fHx8MTc1NjM4MzA1MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Happy Indian Family"
                className="w-full h-full object-cover opacity-30"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-orange-50/95 to-amber-50/90"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-8">
              {/* Government Header */}
              <div className="text-center py-6">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 shadow-lg">
                    <div className="space-y-2">
                      <h1 className="text-2xl font-bold text-slate-800">Government of Andhra Pradesh</h1>
                      <h2 className="text-lg font-semibold text-orange-600">KADA - Kuppam Development Authority</h2>
                      <p className="text-slate-600">Early Childhood Development Initiative</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info Banner */}
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl text-white p-8 shadow-xl border border-orange-300/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Building className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{projectData.name}</h2>
                      <p className="text-orange-100 text-lg">{projectData.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">{projectData.totalChildren.toLocaleString()}</div>
                    <div className="text-orange-100">Total Children</div>
                  </div>
                </div>
              </div>

              {/* Welcome Section */}
              <div className="text-center space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-200 shadow-lg">
                <h1 className="text-4xl font-bold text-slate-800">Welcome to Carengrow Dashboard</h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Early Learning Development Monitoring System for children under 6 years in Andhra Pradesh
                </p>
                <div className="flex justify-center flex-wrap gap-4">
                  <Badge variant="secondary" className="px-6 py-3 bg-orange-100 text-orange-800 border-orange-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedProject === "kuppam-constituency" ? "Kuppam Region" : projectData.location}
                  </Badge>
                  <Badge variant="secondary" className="px-6 py-3 bg-emerald-100 text-emerald-800 border-emerald-300">
                    <Users className="w-4 h-4 mr-2" />
                    {projectData.totalChildren.toLocaleString()} Children Tracked
                  </Badge>
                  <Badge variant="secondary" className="px-6 py-3 bg-blue-100 text-blue-800 border-blue-300">
                    <Building className="w-4 h-4 mr-2" />
                    {projectData.centers}+ AWC Centers
                  </Badge>
                </div>
              </div>

              {/* Mode Selection Cards */}
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-300 bg-white/90 backdrop-blur-sm hover:bg-white/95">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Map className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-slate-800">Individual Child Mode</CardTitle>
                    <CardDescription className="text-base text-slate-600">
                      Interactive geographic map with district-level zoom. View individual child profiles with comprehensive Carengrow activity tracking.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setCurrentMode("individual")} 
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                      size="lg"
                    >
                      View Interactive Map
                    </Button>
                    <div className="mt-6 space-y-3 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span>Active Children:</span>
                        <span className="font-semibold text-slate-800">{projectData.totalChildren.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coverage Area:</span>
                        <span className="font-semibold text-slate-800">
                          {selectedProject === "kuppam-constituency" ? "Kuppam District" : projectData.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interactive Features:</span>
                        <span className="font-semibold text-slate-800">Zoom + Profiles</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-300 bg-white/90 backdrop-blur-sm hover:bg-white/95">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <BarChart3 className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-slate-800">Overall Analytics View</CardTitle>
                    <CardDescription className="text-base text-slate-600">
                      Comprehensive statistics, trends, and insights across all screening and developmental assessment data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setCurrentMode("overall")} 
                      className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                      size="lg"
                    >
                      View Analytics Dashboard
                    </Button>
                    <div className="mt-6 space-y-3 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span>Screenings Completed:</span>
                        <span className="font-semibold text-slate-800">{projectData.screeningsCompleted.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Identified:</span>
                        <span className="font-semibold text-orange-600">
                          {projectData.riskIdentified.toLocaleString()} ({projectData.atRiskRate}%)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interventions Active:</span>
                        <span className="font-semibold text-emerald-600">{projectData.interventionsActive.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <Card className="bg-white/90 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600">{projectData.totalChildren.toLocaleString()}</div>
                    <div className="text-sm text-slate-600 font-medium">Total Children</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-emerald-600">{projectData.screeningRate}%</div>
                    <div className="text-sm text-slate-600 font-medium">Screening Rate</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-orange-600">{projectData.atRiskRate}%</div>
                    <div className="text-sm text-slate-600 font-medium">At-Risk Children</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600">{projectData.interventionRate}%</div>
                    <div className="text-sm text-slate-600 font-medium">Intervention Rate</div>
                  </CardContent>
                </Card>
              </div>

              {/* Family Care Mission Statement */}
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-200 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Supporting Families, Nurturing Futures</h3>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Through the love and care of parents, combined with early intervention and support, 
                  we're building a foundation for every child's success in Andhra Pradesh.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">CG</span>
              </div>
              <div>
                <h1 className="font-bold text-slate-800 text-lg">Carengrow Dashboard</h1>
                <p className="text-sm text-slate-600">
                  {projectData.name} • Early Learning Development Monitoring
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {currentMode !== "home" && (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentMode("home")}
                  className="bg-white/80 border-orange-300 hover:bg-orange-50"
                >
                  Back to Home
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={onLogout}
                className="bg-white/80 border-orange-300 hover:bg-orange-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
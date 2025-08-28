import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Users, MapPin, Calendar, ArrowRight, Building, Target, TrendingUp, Sparkles, CheckCircle, Clock, BarChart3 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export type ProjectType = "kuppam-pilot" | "kuppam-constituency" | "tirupati";

interface Project {
  id: ProjectType;
  name: string;
  description: string;
  location: string;
  totalChildren: number;
  status: "active" | "pilot" | "launching";
  launchDate: string;
  coverage: string;
  highlights: string[];
  color: string;
  gradient: string;
  screeningRate: number;
  riskRate: number;
  interventionRate: number;
}

interface ProjectSelectionProps {
  onProjectSelect: (project: ProjectType) => void;
  onBack: () => void;
}

export function ProjectSelection({ onProjectSelect, onBack }: ProjectSelectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [hoveredProject, setHoveredProject] = useState<ProjectType | null>(null);

  const projects: Project[] = [
    {
      id: "kuppam-pilot",
      name: "Kuppam Pilot",
      description: "Initial pilot program testing Carengrow methodologies and establishing baseline metrics for early childhood development screening.",
      location: "Kuppam Town & Surrounding Villages",
      totalChildren: 847,
      status: "pilot",
      launchDate: "Jan 2024",
      coverage: "5 Anganwadi Centers",
      highlights: ["Proof of Concept", "Methodology Testing", "Initial Data Collection"],
      color: "from-blue-500 to-cyan-600",
      gradient: "bg-gradient-to-br from-blue-500/10 to-cyan-600/10",
      screeningRate: 93.2,
      riskRate: 9.9,
      interventionRate: 79.8
    },
    {
      id: "kuppam-constituency",
      name: "Kuppam Constituency", 
      description: "Full-scale implementation across the entire Kuppam constituency, serving as the primary operational hub with comprehensive coverage.",
      location: "Entire Kuppam Assembly Constituency",
      totalChildren: 20247,
      status: "active",
      launchDate: "Mar 2024",
      coverage: "45+ Anganwadi Centers",
      highlights: ["Full Implementation", "20,000+ Children", "Complete Analytics"],
      color: "from-emerald-500 to-teal-600",
      gradient: "bg-gradient-to-br from-emerald-500/10 to-teal-600/10",
      screeningRate: 91.0,
      riskRate: 10.0,
      interventionRate: 82.5
    },
    {
      id: "tirupati",
      name: "Tirupati",
      description: "New expansion project extending Carengrow's reach to urban and semi-urban areas around the sacred city of Tirupati.",
      location: "Tirupati Municipal Corporation Area",
      totalChildren: 12456,
      status: "launching",
      launchDate: "Sep 2024",
      coverage: "28 Anganwadi Centers",
      highlights: ["Urban Expansion", "New Demographics", "Scalability Testing"],
      color: "from-purple-500 to-violet-600",
      gradient: "bg-gradient-to-br from-purple-500/10 to-violet-600/10",
      screeningRate: 87.8,
      riskRate: 10.3,
      interventionRate: 79.1
    }
  ];

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500/20 text-emerald-700 border-emerald-300"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case "pilot":
        return <Badge className="bg-blue-500/20 text-blue-700 border-blue-300"><Sparkles className="w-3 h-3 mr-1" />Pilot</Badge>;
      case "launching":
        return <Badge className="bg-purple-500/20 text-purple-700 border-purple-300"><Clock className="w-3 h-3 mr-1" />Launching</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-6 h-6 text-emerald-500" />;
      case "pilot":
        return <Sparkles className="w-6 h-6 text-blue-500" />;
      case "launching":
        return <Clock className="w-6 h-6 text-purple-500" />;
      default:
        return <Building className="w-6 h-6 text-gray-500" />;
    }
  };

  const handleProjectSelect = (projectId: ProjectType) => {
    setSelectedProject(projectId);
  };

  const handleProceed = () => {
    if (selectedProject) {
      onProjectSelect(selectedProject);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1679335026558-3e71768f0af9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYW1pbHklMjBtb3RoZXIlMjBmYXRoZXIlMjBjaGlsZCUyMHRvZ2V0aGVyfGVufDF8fHx8MTc1NjM4MzA1MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Happy Indian Family"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/80 via-orange-900/70 to-amber-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Modern Header with Glassmorphism */}
        <header className="backdrop-blur-md bg-white/90 shadow-lg border-b border-white/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">CG</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Carengrow Dashboard</h1>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1 text-orange-500" />
                    Project Selection Portal
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={onBack} className="backdrop-blur-sm bg-white/80 border-white/50 hover:bg-white/90">
                Back to Login
              </Button>
            </div>
          </div>
        </header>

        {/* Government Header */}
        <div className="text-center py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
              <div className="text-white space-y-2">
                <h1 className="text-3xl font-bold">Government of Andhra Pradesh</h1>
                <h2 className="text-xl font-semibold text-orange-200">KADA - Kuppam Development Authority</h2>
                <p className="text-lg text-amber-100">Empowering Families Through Early Childhood Development</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-12">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold text-white mb-6">
                  Select Your <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Carengrow</span> Project
                </h1>
                <p className="text-xl text-orange-100 max-w-4xl mx-auto leading-relaxed">
                  Choose your project workspace to access tailored analytics, child tracking, and comprehensive developmental insights for families across Andhra Pradesh.
                </p>
              </div>

              {/* Enhanced Project Overview Stats */}
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-3xl p-6 shadow-xl">
                  <div className="text-4xl font-bold text-yellow-300 mb-2">
                    {projects.reduce((sum, project) => sum + project.totalChildren, 0).toLocaleString()}
                  </div>
                  <div className="text-white font-medium">Total Children</div>
                  <div className="text-sm text-orange-200 mt-1">Across All Projects</div>
                </div>
                <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-3xl p-6 shadow-xl">
                  <div className="text-4xl font-bold text-emerald-300 mb-2">78+</div>
                  <div className="text-white font-medium">AWC Centers</div>
                  <div className="text-sm text-orange-200 mt-1">Active Operations</div>
                </div>
                <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-3xl p-6 shadow-xl">
                  <div className="text-4xl font-bold text-pink-300 mb-2">3</div>
                  <div className="text-white font-medium">Active Regions</div>
                  <div className="text-sm text-orange-200 mt-1">Andhra Pradesh</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Project Cards */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className={`group relative transform transition-all duration-500 hover:scale-105 ${
                  selectedProject === project.id ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Enhanced Card with Glassmorphism */}
                <div 
                  className={`cursor-pointer transition-all duration-300 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-2xl ${
                    selectedProject === project.id 
                      ? 'bg-white/95 shadow-orange-500/25 ring-4 ring-orange-500/30' 
                      : 'bg-white/85 hover:bg-white/95 hover:shadow-xl'
                  } ${project.gradient}`}
                  onClick={() => handleProjectSelect(project.id)}
                >
                  {/* Header with Status Indicator */}
                  <div className="relative p-8 pb-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.color} shadow-lg`}>
                        <Building className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getStatusBadge(project.status)}
                        {getStatusIcon(project.status)}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-gray-900">{project.name}</h3>
                      <p className="text-gray-700 leading-relaxed">{project.description}</p>
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="px-8 pb-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-4 border border-white/50">
                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                          {project.totalChildren.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-700 font-medium">Total Children</div>
                      </div>
                      <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-4 border border-white/50">
                        <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          {project.coverage}
                        </div>
                        <div className="text-sm text-gray-700 font-medium">Coverage</div>
                      </div>
                    </div>

                    {/* Performance Indicators */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Screening Rate</span>
                        <span className="text-sm font-bold text-emerald-600">{project.screeningRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200/60 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${project.screeningRate}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Intervention Success</span>
                        <span className="text-sm font-bold text-blue-600">{project.interventionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200/60 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-1000 delay-200"
                          style={{ width: `${project.interventionRate}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <span className="text-gray-800 font-medium">{project.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <span className="text-gray-800 font-medium">Launched: {project.launchDate}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2 text-orange-600" />
                        Key Highlights
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.highlights.map((highlight, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="bg-white/70 border-white/50 text-gray-700 hover:bg-white/90 transition-colors"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {selectedProject === project.id && (
                      <div className="flex items-center justify-center space-x-2 text-orange-600 font-medium bg-orange-50/80 rounded-2xl p-4 border border-orange-200/60">
                        <div className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"></div>
                        <span>Project Selected</span>
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Hover Animation */}
                  {(hoveredProject === project.id || selectedProject === project.id) && (
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none">
                      <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                    </div>
                  )}
                </div>

                {/* Enhanced Selection Glow */}
                {selectedProject === project.id && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-500/20 -z-10 blur-xl scale-110"></div>
                )}
              </div>
            ))}
          </div>

          {/* Enhanced Action Section */}
          <div className="text-center space-y-8 mt-16">
            {selectedProject ? (
              <div className="space-y-6">
                <div className="max-w-2xl mx-auto backdrop-blur-xl bg-white/90 border border-white/50 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {projects.find(p => p.id === selectedProject)?.name}
                      </h3>
                      <p className="text-gray-600">Ready to access your dashboard</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {projects.find(p => p.id === selectedProject)?.totalChildren.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Children to Track</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        {projects.find(p => p.id === selectedProject)?.screeningRate}%
                      </div>
                      <div className="text-sm text-gray-600">Screening Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {projects.find(p => p.id === selectedProject)?.coverage}
                      </div>
                      <div className="text-sm text-gray-600">Coverage</div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleProceed}
                  size="lg"
                  className="px-12 py-6 text-lg bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-2xl hover:shadow-orange-500/25 transform transition-all duration-200 hover:scale-105 rounded-2xl"
                >
                  Access Dashboard
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </div>
            ) : (
              <div className="backdrop-blur-sm bg-white/80 border border-white/50 rounded-3xl p-12 max-w-md mx-auto shadow-xl">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-red-300 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Choose Your Project</h3>
                  <p className="text-gray-700">Select a project above to continue to your dashboard</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
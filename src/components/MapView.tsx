import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ChildProfile } from "./ChildProfile";
import { ProjectType } from "./ProjectSelection";
import { ArrowLeft, MapPin, Users, AlertCircle, CheckCircle, Calendar, ZoomIn, Layers, BarChart3, Search, X } from "lucide-react";

interface MapViewProps {
  onBack: () => void;
  selectedProject?: ProjectType | null;
}

interface ChildLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  status: "screened" | "at-risk" | "normal" | "pending";
  age: number;
  lastScreening?: string;
  village: string;
}

interface VillageData {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  childrenCount: number;
  atRiskCount: number;
  screeningRate: number;
  color: string;
}

type MapViewMode = "state" | "district" | "child-profile";

export function MapView({ onBack }: MapViewProps) {
  const [childrenLocations, setChildrenLocations] = useState<ChildLocation[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [hoveredChild, setHoveredChild] = useState<ChildLocation | null>(null);
  const [viewMode, setViewMode] = useState<MapViewMode>("state");
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [showHeatMap, setShowHeatMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ChildLocation[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Village data for Kuppam constituency
  const villageData: VillageData[] = [
    { name: "Kuppam Town", x: 50, y: 40, width: 80, height: 60, childrenCount: 45, atRiskCount: 8, screeningRate: 95, color: "#22c55e" },
    { name: "Ramakuppam", x: 150, y: 30, width: 70, height: 50, childrenCount: 32, atRiskCount: 5, screeningRate: 88, color: "#3b82f6" },
    { name: "Shantipuram", x: 250, y: 35, width: 60, height: 45, childrenCount: 28, atRiskCount: 12, screeningRate: 75, color: "#f59e0b" },
    { name: "Gudipalle", x: 40, y: 120, width: 90, height: 55, childrenCount: 38, atRiskCount: 15, screeningRate: 70, color: "#f97316" },
    { name: "Vepuvaripalle", x: 160, y: 110, width: 75, height: 50, childrenCount: 29, atRiskCount: 3, screeningRate: 92, color: "#22c55e" },
    { name: "Baireddipalle", x: 260, y: 115, width: 65, height: 45, childrenCount: 25, atRiskCount: 9, screeningRate: 80, color: "#3b82f6" },
    { name: "Pudumaraka", x: 45, y: 200, width: 85, height: 50, childrenCount: 41, atRiskCount: 7, screeningRate: 85, color: "#3b82f6" },
    { name: "Kempenahalli", x: 155, y: 195, width: 70, height: 55, childrenCount: 33, atRiskCount: 11, screeningRate: 77, color: "#f59e0b" },
    { name: "Krishnagiri", x: 250, y: 200, width: 75, height: 50, childrenCount: 29, atRiskCount: 6, screeningRate: 83, color: "#3b82f6" }
  ];

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = childrenLocations.filter(child =>
      child.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
    setShowSearchResults(true);
  }, [searchQuery, childrenLocations]);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const selectChildFromSearch = (child: ChildLocation) => {
    setSelectedChildId(child.id);
    setViewMode("child-profile");
    clearSearch();
  };

  // Generate mock children location data for Kuppam region
  useEffect(() => {
    const generateChildren = () => {
      const children: ChildLocation[] = [];
      const statuses: ChildLocation["status"][] = ["screened", "at-risk", "normal", "pending"];
      const names = [
        "Aadhya Sharma", "Arjun Reddy", "Kavya Patel", "Rohan Kumar", "Ananya Singh",
        "Vikram Rao", "Ishita Gupta", "Aditya Nair", "Priya Joshi", "Karthik Menon",
        "Shreya Das", "Rahul Pillai", "Meera Iyer", "Varun Shetty", "Divya Kapoor",
        "Nikhil Agarwal", "Pooja Verma", "Siddharth Bhat", "Riya Malhotra", "Akash Jain"
      ];
      
      // Generate individual children distributed across villages
      villageData.forEach((village) => {
        for (let i = 0; i < village.childrenCount; i++) {
          const x = village.x + Math.random() * village.width;
          const y = village.y + Math.random() * village.height;
          
          children.push({
            id: `${village.name.toLowerCase().replace(' ', '-')}-${i + 1}`,
            name: names[Math.floor(Math.random() * names.length)],
            x,
            y,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            age: Math.floor(Math.random() * 6) + 1,
            lastScreening: i % 4 === 0 ? "2024-08-20" : undefined,
            village: village.name
          });
        }
      });
      
      setChildrenLocations(children);
    };

    generateChildren();
  }, []);

  const getStatusColor = (status: ChildLocation["status"]) => {
    switch (status) {
      case "normal": return "#22c55e";
      case "at-risk": return "#ef4444";
      case "screened": return "#3b82f6";
      case "pending": return "#f59e0b";
      default: return "#6b7280";
    }
  };

  const getVillageRiskLevel = (village: VillageData) => {
    const riskPercentage = (village.atRiskCount / village.childrenCount) * 100;
    if (riskPercentage < 10) return { level: "Low Risk", color: "#22c55e" };
    if (riskPercentage < 20) return { level: "Medium Risk", color: "#f59e0b" };
    return { level: "High Risk", color: "#ef4444" };
  };

  const handleChildClick = (childId: string) => {
    setSelectedChildId(childId);
    setViewMode("child-profile");
  };

  const handleKuppamClick = () => {
    setViewMode("district");
  };

  const handleBackToState = () => {
    setViewMode("state");
  };

  const handleBackToMap = () => {
    if (viewMode === "child-profile") {
      setViewMode("district");
      setSelectedChildId(null);
    } else {
      onBack();
    }
  };

  if (viewMode === "child-profile" && selectedChildId) {
    return <ChildProfile childId={selectedChildId} onBack={handleBackToMap} />;
  }

  const filteredChildren = childrenLocations.filter(child => 
    selectedFilter === "all" || child.status === selectedFilter
  );

  const stats = {
    total: childrenLocations.length,
    screened: childrenLocations.filter(c => c.status === "screened").length,
    atRisk: childrenLocations.filter(c => c.status === "at-risk").length,
    normal: childrenLocations.filter(c => c.status === "normal").length,
    pending: childrenLocations.filter(c => c.status === "pending").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={viewMode === "district" ? handleBackToState : onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {viewMode === "district" ? "Back to State View" : "Back to Dashboard"}
          </Button>
          <div>
            <h2 className="text-3xl font-bold">Individual Child Mode</h2>
            <p className="text-gray-600">
              {viewMode === "state" 
                ? "Click on Kuppam district to view individual children" 
                : "Individual children in Kuppam constituency - Click on any child to view profile"
              }
            </p>
          </div>
        </div>
        
        {/* Search Bar - Only show in district view */}
        {viewMode === "district" && (
          <div className="relative w-96">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for a child by name..."
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
            
            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-xl z-20 max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    <div className="px-3 py-2 text-xs text-gray-500 border-b">
                      {searchResults.length} child{searchResults.length !== 1 ? "ren" : ""} found
                    </div>
                    {searchResults.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => selectChildFromSearch(child)}
                        className="w-full px-3 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{child.name}</div>
                            <div className="text-sm text-gray-600">
                              Age: {child.age} years • Village: {child.village}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: getStatusColor(child.status) }}
                            />
                            <span className="text-xs text-gray-500 capitalize">
                              {child.status.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-4 text-center text-gray-500 text-sm">
                    No children found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Stats Cards with Village Breakdown */}
      {viewMode === "district" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Village-wise Distribution</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHeatMap(!showHeatMap)}
                >
                  <Layers className="w-4 h-4 mr-2" />
                  {showHeatMap ? "Hide" : "Show"} Heat Map
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {villageData.map((village, index) => {
                  const riskLevel = getVillageRiskLevel(village);
                  return (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium truncate">{village.name}</div>
                      <div className="text-gray-600">{village.childrenCount} children</div>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: riskLevel.color }}></div>
                        <span style={{ color: riskLevel.color }}>{riskLevel.level}</span>
                      </div>
                      <div className="text-gray-500">{village.screeningRate}% screened</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Children</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.normal}</div>
                <div className="text-sm text-gray-600">Normal Development</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.atRisk}</div>
                <div className="text-sm text-gray-600">At-Risk</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600">
                  {Math.round((stats.atRisk / stats.total) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Risk Rate</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map and Filters */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters - Only show in district view */}
        {viewMode === "district" && (
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Filter by Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedFilter("all")}
              >
                <Users className="w-4 h-4 mr-2" />
                All Children
              </Button>
              <Button
                variant={selectedFilter === "normal" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedFilter("normal")}
              >
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Normal Development
              </Button>
              <Button
                variant={selectedFilter === "at-risk" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedFilter("at-risk")}
              >
                <AlertCircle className="w-4 h-4 mr-2 text-red-600" />
                At-Risk
              </Button>
              <Button
                variant={selectedFilter === "screened" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedFilter("screened")}
              >
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Recently Screened
              </Button>
              <Button
                variant={selectedFilter === "pending" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedFilter("pending")}
              >
                <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />
                Pending Screening
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Map */}
        <Card className={viewMode === "district" ? "lg:col-span-3" : "lg:col-span-4"}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>
                {viewMode === "state" ? "Andhra Pradesh - Districts" : "Kuppam Constituency - Village Level Detail"}
              </span>
            </CardTitle>
            <div className="flex space-x-4">
              <Badge variant="secondary">
                {viewMode === "state" ? "Click Kuppam to zoom in" : `Showing ${filteredChildren.length} of ${stats.total} children`}
              </Badge>
              {viewMode === "district" && (
                <Badge variant="outline">
                  Click any child to view detailed profile
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {viewMode === "state" ? (
                /* State View - Andhra Pradesh with Districts */
                <svg
                  viewBox="0 0 500 400"
                  className="w-full h-96 border rounded-lg bg-blue-50"
                >
                  {/* Andhra Pradesh outline */}
                  <path
                    d="M50 50 L450 50 L430 120 L450 180 L420 250 L380 320 L320 350 L280 380 L220 370 L180 340 L140 360 L100 320 L80 280 L60 220 L50 160 Z"
                    fill="#e5f3ff"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  
                  {/* District boundaries */}
                  <g stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" fill="none">
                    {/* Vertical lines */}
                    <line x1="120" y1="50" x2="120" y2="200" />
                    <line x1="180" y1="50" x2="180" y2="220" />
                    <line x1="240" y1="50" x2="240" y2="240" />
                    <line x1="300" y1="50" x2="300" y2="260" />
                    <line x1="360" y1="50" x2="360" y2="280" />
                    
                    {/* Horizontal lines */}
                    <line x1="50" y1="120" x2="430" y2="120" />
                    <line x1="60" y1="180" x2="420" y2="180" />
                    <line x1="80" y1="240" x2="400" y2="240" />
                    <line x1="100" y1="300" x2="380" y2="300" />
                  </g>
                  
                  {/* District labels */}
                  <g fontSize="10" fill="#6b7280" textAnchor="middle">
                    <text x="85" y="85">Anantapur</text>
                    <text x="150" y="85">Kurnool</text>
                    <text x="210" y="85">Kadapa</text>
                    <text x="270" y="85">Nellore</text>
                    <text x="85" y="150">Sri Potti Sriramulu</text>
                    <text x="150" y="150">Prakasam</text>
                    <text x="210" y="150">Guntur</text>
                    <text x="270" y="150">Krishna</text>
                    <text x="330" y="150">West Godavari</text>
                    <text x="85" y="210">Anantapur</text>
                    <text x="150" y="210">Kadapa</text>
                    <text x="210" y="210">Chittoor</text>
                    <text x="270" y="210">Tirupati</text>
                    <text x="85" y="270">Hindupur</text>
                    <text x="150" y="270">Madanapalle</text>
                    <text x="270" y="270">Chandragiri</text>
                  </g>
                  
                  {/* Kuppam region highlight (clickable) */}
                  <rect
                    x="320"
                    y="260"
                    width="60"
                    height="40"
                    fill="rgba(59, 130, 246, 0.3)"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    className="cursor-pointer hover:fill-[rgba(59,130,246,0.5)] transition-all"
                    onClick={handleKuppamClick}
                  />
                  
                  {/* Kuppam label with zoom icon */}
                  <g className="cursor-pointer" onClick={handleKuppamClick}>
                    <text x="350" y="275" fontSize="12" fontWeight="bold" fill="#1f2937" textAnchor="middle">
                      Kuppam
                    </text>
                    <text x="350" y="288" fontSize="10" fill="#3b82f6" textAnchor="middle">
                      (Click to zoom)
                    </text>
                    <circle cx="365" cy="285" r="6" fill="#3b82f6" className="opacity-80" />
                    <text x="365" y="289" fontSize="8" fill="white" textAnchor="middle">+</text>
                  </g>
                  
                  {/* Stats overlay */}
                  <rect x="20" y="20" width="120" height="60" fill="rgba(255,255,255,0.9)" stroke="#e5e7eb" rx="8" />
                  <text x="80" y="35" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#1f2937">Carengrow Presence</text>
                  <text x="80" y="48" fontSize="9" textAnchor="middle" fill="#6b7280">Active in Kuppam</text>
                  <text x="80" y="60" fontSize="9" textAnchor="middle" fill="#3b82f6">{stats.total} Children</text>
                </svg>
              ) : (
                /* Enhanced District View - Kuppam with Villages and Heat Map */
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-96 border rounded-lg bg-green-50"
                >
                  {/* Kuppam constituency outline */}
                  <rect
                    x="20"
                    y="20"
                    width="360"
                    height="260"
                    fill="rgba(34, 197, 94, 0.05)"
                    stroke="#22c55e"
                    strokeWidth="2"
                    rx="8"
                  />
                  
                  {/* Village boundaries with heat map coloring */}
                  {villageData.map((village, index) => {
                    const riskLevel = getVillageRiskLevel(village);
                    return (
                      <g key={index}>
                        {showHeatMap && (
                          <rect
                            x={village.x}
                            y={village.y}
                            width={village.width}
                            height={village.height}
                            fill={riskLevel.color}
                            fillOpacity="0.2"
                            stroke={riskLevel.color}
                            strokeWidth="1"
                            strokeDasharray="3,3"
                            rx="4"
                          />
                        )}
                        <text 
                          x={village.x + village.width/2} 
                          y={village.y + 15} 
                          fontSize="9" 
                          fill="#374151" 
                          textAnchor="middle" 
                          fontWeight="500"
                        >
                          {village.name}
                        </text>
                        <text 
                          x={village.x + village.width/2} 
                          y={village.y + 28} 
                          fontSize="7" 
                          fill="#6b7280" 
                          textAnchor="middle"
                        >
                          {village.childrenCount} children
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Individual children dots */}
                  {filteredChildren.map((child) => (
                    <circle
                      key={child.id}
                      cx={child.x}
                      cy={child.y}
                      r="3"
                      fill={getStatusColor(child.status)}
                      stroke="white"
                      strokeWidth="1"
                      className="cursor-pointer hover:r-4 transition-all"
                      onMouseEnter={() => setHoveredChild(child)}
                      onMouseLeave={() => setHoveredChild(null)}
                      onClick={() => handleChildClick(child.id)}
                    />
                  ))}
                  
                  {/* Constituency label */}
                  <rect x="120" y="260" width="160" height="25" fill="rgba(255,255,255,0.95)" stroke="#22c55e" rx="4" />
                  <text x="200" y="275" fontSize="12" fontWeight="bold" fill="#1f2937" textAnchor="middle">
                    Kuppam Constituency
                  </text>
                  <text x="200" y="287" fontSize="8" fill="#6b7280" textAnchor="middle">
                    Assembly Constituency 287
                  </text>
                </svg>
              )}
              
              {/* Enhanced Tooltip for district view */}
              {viewMode === "district" && hoveredChild && (
                <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-xl border z-10 min-w-48">
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-base">{hoveredChild.name}</div>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getStatusColor(hoveredChild.status) }}
                      />
                      <span className="capitalize">{hoveredChild.status.replace('-', ' ')}</span>
                    </div>
                    <div className="text-gray-600">Age: {hoveredChild.age} years</div>
                    <div className="text-gray-600">Village: {hoveredChild.village}</div>
                    {hoveredChild.lastScreening && (
                      <div className="text-gray-600">Last Screened: {hoveredChild.lastScreening}</div>
                    )}
                    <div className="text-xs text-blue-600 mt-2 pt-2 border-t">
                      Click to view comprehensive profile →
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Enhanced Legend */}
            {viewMode === "district" && (
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Normal Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>At-Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Recently Screened</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Pending Screening</span>
                  </div>
                </div>
                {showHeatMap && (
                  <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    <strong>Heat Map Legend:</strong> Village shading indicates risk levels - 
                    <span className="text-green-600 mx-1">Green (Low Risk &lt;10%)</span>
                    <span className="text-yellow-600 mx-1">Yellow (Medium Risk 10-20%)</span>
                    <span className="text-red-600 mx-1">Red (High Risk &gt;20%)</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
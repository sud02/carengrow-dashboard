import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";
import { ProjectSelection, ProjectType } from "./components/ProjectSelection";

type AuthState = "logged-out" | "project-selection" | "logged-in";

export default function App() {
  const [authState, setAuthState] = useState<AuthState>("logged-out");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const handleLogin = (credentials: { email: string; password: string }) => {
    // In a real app, you would validate credentials against a backend
    console.log("Login attempt:", credentials);
    setAuthState("project-selection");
  };

  const handleProjectSelect = (project: ProjectType) => {
    setSelectedProject(project);
    setAuthState("logged-in");
  };

  const handleLogout = () => {
    setAuthState("logged-out");
    setSelectedProject(null);
  };

  const handleBackToLogin = () => {
    setAuthState("logged-out");
    setSelectedProject(null);
  };

  if (authState === "logged-out") {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (authState === "project-selection") {
    return (
      <ProjectSelection 
        onProjectSelect={handleProjectSelect} 
        onBack={handleBackToLogin}
      />
    );
  }

  return <Dashboard onLogout={handleLogout} selectedProject={selectedProject} />;
}
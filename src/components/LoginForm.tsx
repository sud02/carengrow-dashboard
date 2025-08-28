import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate login process
    setTimeout(() => {
      if (email === "admin@carengrow.org" && password === "admin123") {
        onLogin({ email, password });
      } else {
        setError("Invalid credentials. Use admin@carengrow.org / admin123");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1585999322539-fee6e6321a39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmUlMjBhbmRocmElMjBwcmFkZXNofGVufDF8fHx8MTc1NjM4MzA0OHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Andhra Pradesh Government Building"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-indigo-900/60 to-purple-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Government Header */}
        <div className="text-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-white space-y-2">
              <h1 className="text-2xl font-bold">Government of Andhra Pradesh</h1>
              <h2 className="text-lg font-semibold text-orange-200">KADA - Kuppam Development Authority</h2>
              <p className="text-sm text-blue-100">Early Childhood Development Initiative</p>
            </div>
          </div>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">CG</span>
            </div>
            <CardTitle className="text-2xl text-slate-800">Carengrow Dashboard</CardTitle>
            <CardDescription className="text-slate-600">
              Early Learning Development Monitoring System<br/>
              <span className="text-sm font-medium text-orange-600">Andhra Pradesh Government Initiative</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-white/80 border-slate-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-white/80 border-slate-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 shadow-lg" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
              <span className="font-medium">Demo credentials:</span><br/>
              admin@carengrow.org / admin123
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/80 text-sm">
            Empowering Early Childhood Development in Andhra Pradesh
          </p>
        </div>
      </div>
    </div>
  );
}
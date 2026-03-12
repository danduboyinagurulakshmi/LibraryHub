import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLibrary } from "@/context/LibraryContext";
import { toast } from "sonner";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, register, members } = useLibrary();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (!name.trim()) { toast.error("Name is required"); return; }
      const success = register(name, email, password);
      if (success) {
        toast.success("Account created successfully!");
        navigate("/user");
      } else {
        toast.error("Email already registered");
      }
    } else {
      const success = login(email, password);
      if (success) {
        toast.success("Welcome back!");
        if (email === "admin@libraryhub.com") {
          navigate("/admin");
        } else {
          const member = members.find((m) => m.email === email);
          navigate(member?.role === "librarian" ? "/librarian" : "/user");
        }
      } else {
        toast.error("Invalid email or password");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-2 border-primary-foreground" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border border-primary-foreground" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full border border-primary-foreground" />
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-8">
            <BookOpen className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h1 className="font-display text-5xl font-bold text-primary-foreground mb-4">LibraryHub</h1>
          <p className="text-primary-foreground/70 text-lg max-w-md">
            Your complete library management solution. Browse, borrow, and manage books with ease.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 text-primary-foreground/60 text-sm">
            <div>
              <div className="text-3xl font-bold text-secondary mb-1">8K+</div>
              Books
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-1">2K+</div>
              Members
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-1">500+</div>
              Daily Borrows
            </div>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">LibraryHub</h1>
          </div>

          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isRegister ? "Join our community of readers" : "Sign in to access your library"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div>
                <Label htmlFor="name" className="text-foreground">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-1.5 bg-card"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 bg-card"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-card pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 text-base" size="lg">
              {isRegister ? (
                <><UserPlus className="w-4 h-4 mr-2" /> Create Account</>
              ) : (
                <><LogIn className="w-4 h-4 mr-2" /> Sign In</>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-secondary font-semibold hover:underline"
            >
              {isRegister ? "Sign In" : "Sign Up"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;

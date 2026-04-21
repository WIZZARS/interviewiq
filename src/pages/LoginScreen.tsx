import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import { Mic, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setError("Success! Check your email for a confirmation link.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative background */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 font-extrabold text-2xl tracking-tight z-50">
         <div className="bg-primary p-2 rounded-xl text-primary-foreground">
           <Mic className="w-5 h-5" />
         </div>
         InterviewIQ
      </Link>

      <div className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl relative z-10 animate-fadeInUp">
         <div className="text-center mb-8">
           <h1 className="text-3xl font-extrabold tracking-tight mb-2">
             {isSignUp ? "Create an Account" : "Welcome Back"}
           </h1>
           <p className="text-muted-foreground text-sm">
             {isSignUp ? "Sign up to save your interview history and track progress." : "Log in to access your dashboard and history."}
           </p>
         </div>

         {error && (
           <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${error.includes('Success') ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'}`}>
             {error}
           </div>
         )}

         <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
           <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
                <input 
                   type="email" 
                   required
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                   placeholder="you@domain.com"
                />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
                <input 
                   type="password"
                   required
                   minLength={6}
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                   placeholder="••••••••"
                />
              </div>
           </div>

           <button 
             type="submit" 
             disabled={loading}
             className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 hover:opacity-90 shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
           >
             {loading ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")} 
             {!loading && <ArrowRight className="w-4 h-4" />}
           </button>
         </form>

         <div className="relative flex items-center justify-center mb-6">
           <div className="border-t border-border w-full absolute"></div>
           <span className="bg-card px-4 text-xs font-semibold text-muted-foreground relative z-10">OR CONTINUE WITH</span>
         </div>

         <button 
           type="button"
           onClick={handleGoogleAuth}
           className="w-full bg-background border border-border py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-muted/50 transition-all text-sm mb-6"
         >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
           Google Account
         </button>

         <p className="text-center text-sm font-medium text-muted-foreground">
           {isSignUp ? "Already have an account?" : "Don't have an account?"}
           <button onClick={() => setIsSignUp(!isSignUp)} className="ml-2 text-primary hover:underline font-bold">
              {isSignUp ? "Log In" : "Sign Up"}
           </button>
         </p>

         <div className="mt-5 pt-5 border-t border-border/50">
           <Link to="/setup" className="block text-center text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
             Skip login → Practice as guest
           </Link>
         </div>

      </div>
    </div>
  )
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Lock, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { auth } from "../../lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "firebase/auth";

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

type AuthMode = "login" | "register" | "forgot";

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Clear states when switching modes
  useEffect(() => {
    setError(null);
    setMessage(null);
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        onLogin();
      } else if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Account created successfully. Welcome to Veyra.");
        setTimeout(onLogin, 2000);
      } else if (mode === "forgot") {
        await sendPasswordResetEmail(auth, email);
        setMessage("Reset instructions sent to your email.");
        setTimeout(() => setMode("login"), 3000);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      let friendlyError = err.message;
      if (err.code === "auth/invalid-credential") friendlyError = "Invalid identity or passkey.";
      if (err.code === "auth/email-already-in-use") friendlyError = "This identity is already registered.";
      if (err.code === "auth/weak-password") friendlyError = "Passkey is too simple. Use at least 6 characters.";
      if (err.code === "auth/user-not-found") friendlyError = "No account found with this identity.";
      
      setError(friendlyError);
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    if (mode === "login") return "Access";
    if (mode === "register") return "Join";
    return "Recover";
  };

  const getSubtitle = () => {
    if (mode === "login") return "Your Private Travel Sanctuary";
    if (mode === "register") return "Become part of the Veyra legacy";
    return "Restore your connection to Veyra";
  };

  const getButtonLabel = () => {
    if (isLoading) return "Verifying...";
    if (mode === "login") return "Enter Sanctuary";
    if (mode === "register") return "Request Access";
    return "Send Instructions";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fdfbf7] relative overflow-hidden font-sans selection:bg-[#8a7b63] selection:text-white">
      {/* Background elements - Subtle organic glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#8a7b63]/5 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#d1c7b8]/10 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Back button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={mode === "login" ? onBack : () => setMode("login")}
        className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-3 text-[#1a1815]/50 hover:text-[#1a1815] transition-all group z-20"
      >
        <div className="w-8 h-8 rounded-full border border-[#e3dcd1] flex items-center justify-center group-hover:border-[#1a1815] transition-colors">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        </div>
        <span className="uppercase tracking-[0.25em] text-[10px] font-medium">{mode === "login" ? "Return" : "Back"}</span>
      </motion.button>

      <motion.div 
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md px-8 py-12 relative z-10"
      >
        <div className="text-center mb-16">
          <motion.div
            key={mode}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <div className="w-12 h-12 border border-[#8a7b63] rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <div className="absolute inset-0 border border-[#8a7b63] rounded-full animate-ping opacity-20" />
              <div className="w-2 h-2 bg-[#8a7b63] rounded-full" />
            </div>
          </motion.div>
          <motion.h1 
            key={getTitle()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl text-[#1a1815] mb-4 font-medium tracking-tight"
          >
            {getTitle()}
          </motion.h1>
          <p className="text-[#1a1815]/50 text-[10px] uppercase tracking-[0.3em] font-medium">{getSubtitle()}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-red-50 border-l-2 border-red-500 p-4 flex items-start gap-3"
              >
                <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-[10px] text-red-700 uppercase tracking-wider leading-relaxed">
                  {error}
                </p>
              </motion.div>
            )}

            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-green-50 border-l-2 border-green-500 p-4 flex items-start gap-3"
              >
                <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                <p className="text-[10px] text-green-700 uppercase tracking-wider leading-relaxed">
                  {message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            <label className="text-[9px] uppercase tracking-[0.3em] text-[#1a1815]/40 block ml-1 font-bold">Identity</label>
            <div className="relative group">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-[#1a1815]/20 group-focus-within:text-[#8a7b63] transition-colors" size={16} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-[#e3dcd1] pl-8 pr-4 py-4 text-xs tracking-widest focus:outline-none focus:border-[#8a7b63] transition-all placeholder:text-[#1a1815]/10 uppercase"
                required
              />
            </div>
          </div>

          {mode !== "forgot" && (
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-[9px] uppercase tracking-[0.3em] text-[#1a1815]/40 block ml-1 font-bold">Passkey</label>
                {mode === "login" && (
                  <button 
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-[8px] uppercase tracking-[0.2em] text-[#1a1815]/30 hover:text-[#8a7b63] transition-colors mb-1"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-[#1a1815]/20 group-focus-within:text-[#8a7b63] transition-colors" size={16} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-[#e3dcd1] pl-8 pr-4 py-4 text-xs focus:outline-none focus:border-[#8a7b63] transition-all placeholder:text-[#1a1815]/10"
                  required
                />
              </div>
            </div>
          )}

          <div className="pt-4">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1a1815] text-white py-5 px-8 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#8a7b63] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 uppercase tracking-[0.4em] text-[10px] font-bold">
                {getButtonLabel()}
              </span>
              {!isLoading && (
                <motion.div 
                  animate={{ x: [0, 5, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="relative z-10"
                >
                  <ArrowLeft className="rotate-180" size={14} />
                </motion.div>
              )}
            </button>
          </div>
        </form>

        <div className="mt-20 text-center">
          <p className="text-[#1a1815]/30 text-[9px] uppercase tracking-[0.25em] leading-loose">
            {mode === "login" ? (
              <>
                New to Veyra? <br />
                <button 
                  onClick={() => setMode("register")}
                  className="text-[#1a1815] hover:text-[#8a7b63] transition-colors border-b border-[#1a1815]/10 hover:border-[#8a7b63] pb-0.5"
                >
                  Request Private Access
                </button>
              </>
            ) : (
              <>
                Already have access? <br />
                <button 
                  onClick={() => setMode("login")}
                  className="text-[#1a1815] hover:text-[#8a7b63] transition-colors border-b border-[#1a1815]/10 hover:border-[#8a7b63] pb-0.5"
                >
                  Enter the Sanctuary
                </button>
              </>
            )}
          </p>
        </div>
      </motion.div>

      {/* Decorative vertical lines */}
      <div className="absolute left-1/2 top-0 w-px h-20 bg-gradient-to-b from-[#e3dcd1] to-transparent opacity-30" />
      <div className="absolute left-1/2 bottom-0 w-px h-20 bg-gradient-to-t from-[#e3dcd1] to-transparent opacity-30" />
      
      {/* Aesthetic footer detail */}
      <div className="absolute bottom-12 left-0 w-full flex justify-center opacity-10 pointer-events-none">
        <div className="font-display text-sm tracking-[1em] uppercase text-[#1a1815]">Veyra</div>
      </div>
    </div>
  );
}

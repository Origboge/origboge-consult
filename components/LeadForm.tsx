"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  whatsapp: z.string().min(10, "WhatsApp number must be at least 10 digits"),
  challenge: z.string().min(10, "Please describe your challenge in more detail (min 10 chars)"),
});

type FormData = z.infer<typeof formSchema>;

const shakeAnimation = {
  x: [0, -4, 4, -4, 4, 0],
  transition: { duration: 0.4, ease: "easeInOut" as const }
};

const confettiColors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

// Pre-compute all random values outside the component so they are stable on every render
const CONFETTI_PARTICLES = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  color: confettiColors[i % confettiColors.length],
  left: (i / 24) * 100 + (i % 3) * 3,
  size: 6 + (i % 4),
  duration: 1.5 + (i % 3) * 0.5,
  delay: (i % 5) * 0.08,
  finalBottom: 10 + (i % 3) * 8,
  finalRotate: 60 + i * 15,
}));

function SuccessConfetti() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {CONFETTI_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          initial={{ top: "-10%", left: `${p.left}%`, rotate: 0, opacity: 1 }}
          animate={{ top: `calc(100% - ${p.finalBottom}px)`, rotate: p.finalRotate, opacity: 1 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          className="absolute rounded-sm"
          style={{ backgroundColor: p.color, width: `${p.size}px`, height: `${p.size}px` }}
        />
      ))}
    </div>
  );
}

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      // Build the WhatsApp URL and save it to state so the button can use it directly
      const waText = encodeURIComponent(`Hi Origboge Consult! 👋\n\nI just submitted a consultation request on your website.\n\n*Name:* ${data.fullName}\n*My Challenge:* ${data.challenge}\n\nCan we discuss this further?`);
      const url = `https://wa.me/2349034816423?text=${waText}`;
      setWhatsappUrl(url);

      setIsSuccess(true);
      setCountdown(5);
      reset();

      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      console.error("Submission error:", error);
      const message = error instanceof Error ? error.message : "";
      const isNetworkError = message === "Failed to fetch" || message.includes("network") || message.includes("fetch");
      toast.error(
        isNetworkError
          ? "No internet connection. Please check your network and try again."
          : message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
        >
          <Card className="w-full max-w-md mx-auto border-slate-200 shadow-2xl rounded-2xl overflow-hidden relative">
            <SuccessConfetti />
            <CardHeader className="text-center space-y-4 pt-12 pb-12 relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center relative z-10"
              >
                <CheckCircle2 className="w-10 h-10 text-blue-600" />
              </motion.div>
              <CardTitle className="text-2xl font-bold text-[#0F172A] relative z-10">Request Received!</CardTitle>
              <CardDescription className="text-slate-600 px-4 text-base leading-relaxed relative z-10">
                Thank you for reaching out. Tap the button below to continue the conversation with our lead consultant on WhatsApp.
              </CardDescription>

              <div className="flex flex-col items-center justify-center pt-6 gap-3 relative z-10">
                {countdown > 0 ? (
                  <>
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-sm font-bold text-blue-600">WhatsApp opens in {countdown}s...</p>
                  </>
                ) : null}

                {/* 
                  Using a real <a> tag instead of window.open so mobile browsers (Safari/iOS)
                  never block the redirect since it's a direct user-initiated navigation.
                */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full text-sm shadow-lg shadow-green-200 transition-all active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  Open WhatsApp Now
                </a>

                <button
                  onClick={() => { setIsSuccess(false); setCountdown(5); }}
                  className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors mt-1"
                >
                  Send another request instead
                </button>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card
              className="w-full max-w-md mx-auto border-slate-200 shadow-2xl rounded-2xl"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(59,130,246,0.12) 1px, transparent 1px)`,
                backgroundSize: "22px 22px",
                backgroundColor: "#ffffff",
              }}
            >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-blue-600">Get Expert Advice</CardTitle>
              <CardDescription className="text-slate-600">
                Tell us about your business challenge and we&apos;ll help you solve it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <motion.div
                  animate={errors.fullName ? shakeAnimation : {}}
                  className="space-y-2"
                >
                  <Label htmlFor="fullName" className="text-slate-700 font-medium">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    {...register("fullName")}
                    className={`rounded-xl transition-all ${errors.fullName ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200 focus-visible:ring-blue-500"}`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName.message}</p>}
                </motion.div>

                <motion.div
                  animate={errors.email ? shakeAnimation : {}}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className={`rounded-xl transition-all ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200 focus-visible:ring-blue-500"}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                </motion.div>

                <motion.div
                  animate={errors.whatsapp ? shakeAnimation : {}}
                  className="space-y-2"
                >
                  <Label htmlFor="whatsapp" className="text-slate-700 font-medium">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    inputMode="numeric"
                    placeholder="+234..."
                    {...register("whatsapp")}
                    className={`rounded-xl transition-all ${errors.whatsapp ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200 focus-visible:ring-blue-500"}`}
                  />
                  {errors.whatsapp && <p className="text-xs text-red-500 font-medium">{errors.whatsapp.message}</p>}
                </motion.div>

                <motion.div
                  animate={errors.challenge ? shakeAnimation : {}}
                  className="space-y-2"
                >
                  <Label htmlFor="challenge" className="text-slate-700 font-medium">Business Challenge</Label>
                  <Textarea
                    id="challenge"
                    placeholder="Describe the main obstacle your business is facing..."
                    rows={4}
                    {...register("challenge")}
                    className={`rounded-xl transition-all ${errors.challenge ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200 focus-visible:ring-blue-500"}`}
                  />
                  {errors.challenge && <p className="text-xs text-red-500 font-medium">{errors.challenge.message}</p>}
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-7 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <span className="flex items-center gap-2">
                        Get Expert Advice <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </motion.div>
                <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-widest font-semibold">
                  Secure &amp; Confidential Consultation
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

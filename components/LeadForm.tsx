"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
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

function SuccessConfetti() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {Array.from({ length: 40 }).map((_, i) => {
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const left = Math.random() * 100;
        const size = 6 + Math.random() * 6;
        const duration = 1.5 + Math.random() * 1.5;
        const delay = Math.random() * 0.5;
        return (
          <motion.div
            key={i}
            initial={{ top: "-10%", left: `${left}%`, rotate: 0 }}
            animate={{ top: `calc(100% - ${15 + Math.random() * 20}px)`, rotate: Math.random() * 360 + 180 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className="absolute rounded-sm"
            style={{ backgroundColor: color, width: `${size}px`, height: `${size}px` }}
          />
        );
      })}
    </div>
  );
}

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      // Automatically construct and redirect to a pre-filled WhatsApp chat for an impressive UX flow
      const waText = encodeURIComponent(`Hi Origboge Consult! 👋\n\nI just submitted a consultation request on your website.\n\n*Name:* ${data.fullName}\n*My Challenge:* ${data.challenge}\n\nCan we discuss this further?`);
      const whatsappUrl = `https://wa.me/2349034816423?text=${waText}`;
      
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

      // Delay the redirect so the user has time to read the success modal
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 5000);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send request. Please try again.");
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
                Thank you for reaching out. We are opening a pre-filled WhatsApp chat with our lead consultant so we can connect instantly.
              </CardDescription>
              
              {countdown > 0 ? (
                <div className="flex flex-col items-center justify-center pt-6 gap-3 relative z-10">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-sm font-bold text-blue-600 animate-pulse">Redirecting in {countdown} seconds...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-6 gap-3 relative z-10">
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 shadow-sm rounded-full px-8 font-semibold transition-colors"
                  >
                    Send another request
                  </Button>
                </div>
              )}
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
          <Card className="w-full max-w-md mx-auto border-slate-200 shadow-2xl rounded-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-[#0F172A]">Get Expert Advice </CardTitle>
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
                  Secure & Confidential Consultation
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


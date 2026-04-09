"use client";

import { useState, useEffect } from "react";
import { LeadForm } from "@/components/LeadForm";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  CheckCircle2,
  Globe,
  Layers,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Mail,
  Phone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0F172A] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Toaster position="top-center" richColors />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2 sm:gap-3 cursor-pointer">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#0F172A] text-white font-bold text-lg sm:text-xl shadow-lg shadow-slate-200">O</div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">Origboge Consult</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            <a href="#services" className="text-sm font-semibold text-slate-500 hover:text-[#0F172A] transition-colors">Services</a>
            <a href="#about" className="text-sm font-semibold text-slate-500 hover:text-[#0F172A] transition-colors">About</a>
            <a href="#testimonials" className="text-sm font-semibold text-slate-500 hover:text-[#0F172A] transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              className="rounded-full bg-[#0F172A] px-4 py-4 sm:px-7 sm:py-6 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Consult Now
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`block w-6 h-0.5 bg-[#0F172A] rounded transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#0F172A] rounded transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#0F172A] rounded transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 space-y-4">
                <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-slate-500 hover:text-[#0F172A] transition-colors">Services</a>
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-slate-500 hover:text-[#0F172A] transition-colors">About</a>
                <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-slate-500 hover:text-[#0F172A] transition-colors">Testimonials</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 lg:py-40">
          <div className="container mx-auto px-6">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div className="flex flex-col justify-center space-y-10">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 border border-blue-100 uppercase tracking-widest"
                  >
                    <TrendingUp className="mr-2 h-3.5 w-3.5" />
                    Strategic Growth Partners
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-5xl font-extrabold tracking-tight text-[#0F172A] sm:text-6xl xl:text-7xl/tight"
                  >
                    Scale Your Business with <span className="text-blue-600">Precision.</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="max-w-[600px] text-slate-500 text-lg md:text-xl leading-relaxed"
                  >
                    Origboge Consult provides high-impact consulting services for ambitious founders. We turn complex business challenges into scalable growth engines. Our experts respond within 24 hours.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                    <div className="h-6 w-6 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Data-Driven Strategies</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                    <div className="h-6 w-6 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Expert Implementation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                    <div className="h-6 w-6 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <span>24-Hour Response Guarantee</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                    <div className="h-6 w-6 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Proven ROI Track Record</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex items-center gap-4 pt-4"
                >
                  <a href="#form" className="group flex items-center gap-2 text-[#0F172A] font-bold hover:gap-3 transition-all text-lg">
                    Start your journey <ArrowRight className="h-5 w-5 text-blue-600" />
                  </a>
                </motion.div>
              </div>

              <motion.div
                id="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <LeadForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Details Section */}
        <section className="py-12 bg-white/30 backdrop-blur-sm border-y border-slate-100">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 w-full max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 group justify-start sm:justify-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Email Us</span>
                  <a href="mailto:origboge@gmail.com" className="text-sm font-bold text-[#0F172A] hover:text-blue-600 transition-colors">origboge@gmail.com</a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 group justify-start sm:justify-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Call Us</span>
                  <a href="tel:+2349034816423" className="text-sm font-bold text-[#0F172A] hover:text-blue-600 transition-colors">+234 903 481 6423</a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 group justify-start sm:justify-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white transition-all shadow-sm cursor-pointer">
                  <XIcon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Follow Us</span>
                  <a href="https://x.com/origboge" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#0F172A] hover:text-blue-600 transition-colors">@origboge</a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="services" className="py-32 bg-white/50 border-y border-slate-200">
          <div className="container mx-auto px-6">
            <div className="text-center space-y-6 mb-20">
              <h2 className="text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">Our Core Expertise</h2>
              <p className="mx-auto max-w-[700px] text-slate-500 text-lg md:text-xl">
                We don&apos;t just advise; we partner with you to execute and deliver tangible outcomes.
              </p>
            </div>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Market Expansion",
                  description: "Strategic roadmaps for entering new markets and capturing market share efficiently.",
                  icon: Globe
                },
                {
                  title: "Operational Excellence",
                  description: "Optimizing internal processes to reduce waste and increase profitability.",
                  icon: Layers
                },
                {
                  title: "Financial Strategy",
                  description: "Advanced modeling and capital allocation strategies for sustainable growth.",
                  icon: BarChart3
                },
                {
                  title: "Digital Transformation",
                  description: "Modernizing your tech stack to stay competitive in a digital-first world.",
                  icon: ShieldCheck
                },
                {
                  title: "Leadership Coaching",
                  description: "Developing executive talent to lead high-performing organizations.",
                  icon: MessageSquare
                },
                {
                  title: "Revenue Optimization",
                  description: "Pricing strategies and sales funnel optimization to maximize LTV.",
                  icon: TrendingUp
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition-all hover:shadow-xl hover:border-blue-100 cursor-pointer"
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-[#0F172A] group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-[#0F172A]">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-lg">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-[#0F172A] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-[100px] -ml-48 -mb-48" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-10 text-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight sm:text-6xl max-w-4xl">Ready to transform your business?</h2>
                <p className="mx-auto max-w-[600px] text-slate-400 text-xl">
                  Join 500+ businesses that have scaled with Origboge Consult. Your first consultation is on us.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-8 text-xl font-bold rounded-full shadow-2xl shadow-blue-900/20 transition-all hover:scale-105"
                onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
            <a href="#" className="flex items-center gap-3 cursor-pointer">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A] text-white font-bold text-sm">O</div>
              <span className="text-xl font-bold tracking-tight text-[#0F172A]">Origboge Consult</span>
            </a>
            <p className="text-sm font-medium text-slate-400">
              © 2026 Origboge Consult Group. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-[#0F172A] transition-colors">Privacy</a>
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-[#0F172A] transition-colors">Terms</a>
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-[#0F172A] transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

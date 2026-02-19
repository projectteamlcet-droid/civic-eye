import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';
import {
  AlertTriangle, Clock, DollarSign, Brain, Activity, Shield, MapPin, Bell, BarChart3,
  Droplets, Route, Building, ChevronRight, Github, Twitter, Linkedin, Mail
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const Landing = () => {
  return (
    <div className="dark bg-background text-foreground min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">CivicAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#problems" className="hover:text-foreground transition-colors">Problems</a>
            <a href="#solutions" className="hover:text-foreground transition-colors">Solutions</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          </div>
          <Link to="/dashboard">
            <Button variant="hero" size="sm">Live Dashboard</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <Activity className="w-4 h-4" /> AI-Powered Platform
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            AI Powered Civic Infrastructure{' '}
            <span className="text-primary glow-text">Intelligence</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Real-time monitoring and predictive analysis of roads, water quality, and public assets for smarter, safer cities.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-base px-8">
              Request Demo <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            <Link to="/dashboard">
              <Button variant="hero-outline" size="lg" className="text-base px-8">View Live Dashboard</Button>
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
            {[['2,400+', 'Assets Monitored'], ['99.2%', 'Uptime'], ['34%', 'Cost Reduction']].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl font-bold text-primary">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problems */}
      <section id="problems" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Infrastructure Crisis</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Cities lose billions annually due to outdated, reactive infrastructure management.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Clock, title: 'Delayed Manual Inspections', desc: 'Field inspections take weeks, leaving critical damage undetected until failure occurs.' },
              { icon: AlertTriangle, title: 'Reactive Complaint Systems', desc: 'Municipalities respond only after citizen complaints — often too late to prevent damage escalation.' },
              { icon: DollarSign, title: 'Rising Maintenance Costs', desc: 'Emergency repairs cost 5–10x more than proactive maintenance, draining city budgets.' },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="glass-card p-8 text-center group hover:border-destructive/30 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-destructive/20 transition-colors">
                  <item.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="py-24 px-6 bg-card/50">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Intelligent Solutions</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Leverage AI to transform infrastructure management from reactive to predictive.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Brain, title: 'AI Damage Detection', desc: 'Computer vision identifies cracks, corrosion, and deterioration automatically.' },
              { icon: Activity, title: 'Health Score (0–100)', desc: 'Every asset gets a real-time health score based on multiple AI indicators.' },
              { icon: Bell, title: 'Predictive Alerts', desc: 'Get warned before failures happen with AI-driven risk forecasting.' },
              { icon: MapPin, title: 'Risk Heatmap', desc: 'Visualize city-wide infrastructure risk on an interactive geospatial map.' },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="glass-card p-6 group hover:border-primary/30 transition-all hover:glow-primary">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to manage city infrastructure intelligently.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Route, title: 'Road Damage Detection', desc: 'AI vision models detect potholes, cracks, and surface degradation.' },
              { icon: Droplets, title: 'Water Quality Monitoring', desc: 'Real-time water quality metrics and contamination alerts.' },
              { icon: Shield, title: 'Infrastructure Risk Scoring', desc: 'Composite risk scores derived from multi-modal AI analysis.' },
              { icon: Bell, title: 'Real-time Alerts', desc: 'Instant notifications for critical infrastructure events.' },
              { icon: BarChart3, title: 'Smart Analytics', desc: 'Deep analytics with trend analysis and forecasting.' },
              { icon: MapPin, title: 'Geo-based Risk Heatmap', desc: 'Interactive city maps with color-coded risk visualization.' },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="flex gap-4 p-5 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="glass-card glow-primary max-w-3xl mx-auto p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your City?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join forward-thinking municipalities using AI to protect and optimize their infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">Request Demo</Button>
              <Link to="/dashboard"><Button variant="hero-outline" size="lg">Explore Dashboard</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">CivicAI</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered infrastructure intelligence for smarter cities.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Dashboard', 'Pricing', 'API'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Compliance'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-semibold mb-3 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2026 CivicAI. All rights reserved.</p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

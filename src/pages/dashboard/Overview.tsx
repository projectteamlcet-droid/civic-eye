import React from 'react';
import { motion } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { riskTrendData, issueDistribution, degradationData } from '@/data/mockData';
import { Activity, AlertTriangle, BarChart3, Shield, TrendingDown } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Overview = () => {
  const { filteredAssets, filteredAlerts, config } = useRole();

  const totalAssets = filteredAssets.length;
  const criticalIssues = filteredAssets.filter(a => a.riskLevel === 'critical').length;
  const avgHealth = Math.round(filteredAssets.reduce((s, a) => s + a.healthScore, 0) / totalAssets);
  const activeAlerts = filteredAlerts.filter(a => a.status === 'pending').length;

  const stats = [
    { label: 'Total Assets Monitored', value: totalAssets, icon: BarChart3, color: 'text-primary' },
    { label: 'Critical Issues', value: criticalIssues, icon: AlertTriangle, color: 'text-destructive' },
    { label: 'Average Health Score', value: avgHealth, icon: Activity, color: 'text-success' },
    { label: 'Active Alerts', value: activeAlerts, icon: Shield, color: 'text-warning' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">{config.description} • Real-time infrastructure monitoring</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} initial="hidden" animate="visible" custom={i}
            className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="text-3xl font-bold">{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Risk Score Trend */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="glass-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-primary" /> Risk Score Trend
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,18%)" />
              <XAxis dataKey="month" stroke="hsl(215,15%,55%)" fontSize={12} />
              <YAxis stroke="hsl(215,15%,55%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(222,25%,9%)', border: '1px solid hsl(220,15%,18%)', borderRadius: '8px', color: 'hsl(210,40%,96%)' }} />
              <Line type="monotone" dataKey="score" stroke="hsl(187,85%,53%)" strokeWidth={3} dot={{ fill: 'hsl(187,85%,53%)', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Issue Distribution */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="glass-card p-6">
          <h3 className="font-semibold mb-4">Issue Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={issueDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" stroke="none">
                {issueDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'hsl(222,25%,9%)', border: '1px solid hsl(220,15%,18%)', borderRadius: '8px', color: 'hsl(210,40%,96%)' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Degradation Bar Chart */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6} className="glass-card p-6">
        <h3 className="font-semibold mb-4">Monthly Degradation Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={degradationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,18%)" />
            <XAxis dataKey="month" stroke="hsl(215,15%,55%)" fontSize={12} />
            <YAxis stroke="hsl(215,15%,55%)" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(222,25%,9%)', border: '1px solid hsl(220,15%,18%)', borderRadius: '8px', color: 'hsl(210,40%,96%)' }} />
            <Legend />
            <Bar dataKey="roads" fill="hsl(187,85%,53%)" radius={[4,4,0,0]} />
            <Bar dataKey="water" fill="hsl(200,80%,45%)" radius={[4,4,0,0]} />
            <Bar dataKey="buildings" fill="hsl(152,69%,41%)" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Overview;

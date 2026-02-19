import React from 'react';
import { motion } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { Button } from '@/components/ui/button';
import { Download, AlertTriangle, TrendingUp, Activity, Shield } from 'lucide-react';

const Reports = () => {
  const { filteredAssets } = useRole();

  const critical = filteredAssets.filter(a => a.riskLevel === 'critical').length;
  const high = filteredAssets.filter(a => a.riskLevel === 'high').length;
  const avgHealth = Math.round(filteredAssets.reduce((s, a) => s + a.healthScore, 0) / filteredAssets.length);

  const priorityAssets = [...filteredAssets].sort((a, b) => a.healthScore - b.healthScore).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Infrastructure health summary and reports</p>
        </div>
        <Button variant="hero">
          <Download className="w-4 h-4 mr-2" /> Download Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-5">
        {[
          { label: 'Critical Assets', value: critical, icon: AlertTriangle, color: 'text-destructive' },
          { label: 'High Priority', value: high, icon: TrendingUp, color: 'text-warning' },
          { label: 'Health Index', value: `${avgHealth}/100`, icon: Activity, color: 'text-success' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="text-3xl font-bold">{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Priority Ranking */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" /> Maintenance Priority Ranking
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-3 px-4">Rank</th>
                <th className="text-left py-3 px-4">Asset</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Health</th>
                <th className="text-left py-3 px-4">Risk</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {priorityAssets.map((asset, i) => (
                <tr key={asset.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-primary">#{i + 1}</td>
                  <td className="py-3 px-4 font-medium">{asset.name}</td>
                  <td className="py-3 px-4 capitalize text-muted-foreground">{asset.type}</td>
                  <td className="py-3 px-4">
                    <span className={asset.healthScore < 40 ? 'text-destructive' : asset.healthScore < 70 ? 'text-warning' : 'text-success'}>
                      {asset.healthScore}
                    </span>
                  </td>
                  <td className="py-3 px-4 capitalize">{asset.riskLevel}</td>
                  <td className="py-3 px-4 text-muted-foreground">{asset.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;

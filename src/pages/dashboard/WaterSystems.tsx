import React from 'react';
import { motion } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { Badge } from '@/components/ui/badge';
import { Droplets } from 'lucide-react';

const WaterSystems = () => {
  const { filteredAssets } = useRole();
  const water = filteredAssets.filter(a => a.type === 'water');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Water Systems</h1>
        <p className="text-muted-foreground text-sm mt-1">Water infrastructure monitoring — {water.length} assets</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {water.map((asset, i) => (
          <motion.div key={asset.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass-card p-5 hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{asset.name}</h3>
                <p className="text-xs text-muted-foreground">{asset.zone} • {asset.id}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-muted-foreground">Health</span>
                <p className={`font-bold text-lg ${asset.healthScore < 40 ? 'text-destructive' : asset.healthScore < 70 ? 'text-warning' : 'text-success'}`}>{asset.healthScore}</p>
              </div>
              <Badge variant={asset.riskLevel === 'critical' ? 'destructive' : 'secondary'} className="capitalize">{asset.riskLevel}</Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WaterSystems;

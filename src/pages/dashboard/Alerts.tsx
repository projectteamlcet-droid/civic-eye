import React from 'react';
import { motion } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

const Alerts = () => {
  const { filteredAlerts } = useRole();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Alerts</h1>
        <p className="text-muted-foreground text-sm mt-1">Infrastructure alerts and notifications</p>
      </div>

      <div className="space-y-3">
        {filteredAlerts.map((alert, i) => (
          <motion.div key={alert.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}
            className={`glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${alert.riskScore >= 80 ? 'border-destructive/30' : ''}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${alert.riskScore >= 80 ? 'bg-destructive/10' : 'bg-warning/10'}`}>
              <AlertTriangle className={`w-5 h-5 ${alert.riskScore >= 80 ? 'text-destructive' : 'text-warning'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold truncate">{alert.assetName}</span>
                <Badge variant={alert.status === 'resolved' ? 'secondary' : 'destructive'} className="text-xs">
                  {alert.status === 'resolved' ? <><CheckCircle className="w-3 h-3 mr-1" />Resolved</> : <><Clock className="w-3 h-3 mr-1" />Pending</>}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{alert.alertType}</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Risk Score</span>
                <p className={`font-bold text-lg ${alert.riskScore >= 80 ? 'text-destructive' : alert.riskScore >= 60 ? 'text-warning' : 'text-success'}`}>{alert.riskScore}</p>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground">Time</span>
                <p className="font-medium">{new Date(alert.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;

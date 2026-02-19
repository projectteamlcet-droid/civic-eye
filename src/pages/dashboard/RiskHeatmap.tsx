import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useRole } from '@/context/RoleContext';
import { type Asset } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Activity, Calendar, MapPin, Wrench } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const riskColor = (level: string) => {
  switch (level) {
    case 'low': return '#22c55e';
    case 'medium': return '#eab308';
    case 'high': return '#f97316';
    case 'critical': return '#ef4444';
    default: return '#6b7280';
  }
};

const RiskHeatmap = () => {
  const { filteredAssets } = useRole();
  const [selected, setSelected] = useState<Asset | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Risk Heatmap</h1>
        <p className="text-muted-foreground text-sm mt-1">City-wide infrastructure risk visualization</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        {[['low', 'Healthy'], ['medium', 'Warning'], ['high', 'High Risk'], ['critical', 'Critical']].map(([level, label]) => (
          <div key={level} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: riskColor(level) }} />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="glass-card overflow-hidden rounded-xl" style={{ height: '500px' }}>
        <MapContainer center={[12.9716, 77.5946]} zoom={12} className="w-full h-full" style={{ background: 'hsl(222,25%,9%)' }}>
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {filteredAssets.map(asset => (
            <CircleMarker
              key={asset.id}
              center={[asset.lat, asset.lng]}
              radius={asset.riskLevel === 'critical' ? 14 : asset.riskLevel === 'high' ? 11 : 8}
              pathOptions={{
                color: riskColor(asset.riskLevel),
                fillColor: riskColor(asset.riskLevel),
                fillOpacity: 0.6,
                weight: 2,
              }}
              eventHandlers={{ click: () => setSelected(asset) }}
            >
              <Popup>
                <span className="font-medium">{asset.name}</span>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="glass-card w-full max-w-md p-6 m-4 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{selected.name}</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelected(null)}><X className="w-5 h-5" /></Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Type</span>
                <p className="font-medium capitalize">{selected.type}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Zone</span>
                <p className="font-medium">{selected.zone}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground flex items-center gap-1"><Activity className="w-3 h-3" /> Health Score</span>
                <p className="text-2xl font-bold" style={{ color: riskColor(selected.riskLevel) }}>{selected.healthScore}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Risk Level</span>
                <Badge style={{ backgroundColor: riskColor(selected.riskLevel) + '22', color: riskColor(selected.riskLevel), borderColor: riskColor(selected.riskLevel) }}
                  className="capitalize border">{selected.riskLevel}</Badge>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> Last Inspection</span>
                <p className="font-medium">{selected.lastInspection}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Status</span>
                <p className="font-medium">{selected.status}</p>
              </div>
            </div>
            <Button variant="hero" className="w-full">
              <Wrench className="w-4 h-4 mr-2" /> Schedule Maintenance
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskHeatmap;

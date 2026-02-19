import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Brain, AlertTriangle, CheckCircle, X, Loader2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Detection {
  type: string;
  confidence: number;
  riskScore: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  bbox: { x: number; y: number; w: number; h: number };
  explanation: string;
}

const mockDetections: Detection[] = [
  { type: 'Longitudinal Crack', confidence: 94.2, riskScore: 78, severity: 'High', bbox: { x: 15, y: 20, w: 35, h: 25 }, explanation: 'Deep longitudinal crack detected along road surface. This indicates subgrade failure and may lead to structural collapse if not repaired within 30 days.' },
  { type: 'Pothole', confidence: 89.7, riskScore: 85, severity: 'Critical', bbox: { x: 55, y: 45, w: 25, h: 30 }, explanation: 'Large pothole with exposed aggregate layer. Immediate safety hazard for vehicles and pedestrians. Priority repair recommended.' },
  { type: 'Surface Erosion', confidence: 76.3, riskScore: 52, severity: 'Medium', bbox: { x: 10, y: 60, w: 40, h: 20 }, explanation: 'Surface erosion caused by water runoff. Currently moderate but will worsen with monsoon season. Preventive sealing recommended.' },
];

const severityColor: Record<string, string> = {
  Low: 'hsl(152,69%,41%)',
  Medium: 'hsl(38,92%,50%)',
  High: 'hsl(25,95%,53%)',
  Critical: 'hsl(0,72%,51%)',
};

const AIAnalysis = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<Detection[] | null>(null);
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setResults(null);
      setSelectedDetection(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const runAnalysis = () => {
    setAnalyzing(true);
    setResults(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResults(mockDetections);
    }, 3000);
  };

  const useSample = () => {
    setImage('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80');
    setResults(null);
    setSelectedDetection(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Analysis</h1>
        <p className="text-muted-foreground text-sm mt-1">Upload infrastructure images for AI-powered damage detection</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload & Preview */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-semibold flex items-center gap-2"><Eye className="w-5 h-5 text-primary" /> Image Preview</h3>
          {!image ? (
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
              <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Drop an infrastructure image or click to upload</p>
              <div className="flex gap-3 justify-center">
                <label>
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  <Button variant="outline" asChild><span>Upload Image</span></Button>
                </label>
                <Button variant="secondary" onClick={useSample}>Use Sample</Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img src={image} alt="Infrastructure" className="w-full rounded-lg" />
              {/* Bounding Boxes */}
              {results && (
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {results.map((d, i) => (
                    <g key={i} className="cursor-pointer" onClick={() => setSelectedDetection(d)}>
                      <rect x={d.bbox.x} y={d.bbox.y} width={d.bbox.w} height={d.bbox.h}
                        fill="none" stroke={severityColor[d.severity]} strokeWidth="0.5"
                        strokeDasharray="2 1" opacity={0.9} />
                      <rect x={d.bbox.x} y={d.bbox.y - 4} width={d.bbox.w} height={4}
                        fill={severityColor[d.severity]} opacity={0.8} />
                      <text x={d.bbox.x + 1} y={d.bbox.y - 1} fontSize="2.5" fill="white" fontWeight="bold">
                        {d.type} ({d.confidence.toFixed(0)}%)
                      </text>
                    </g>
                  ))}
                </svg>
              )}
              <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => { setImage(null); setResults(null); setSelectedDetection(null); }}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
          {image && !results && (
            <Button variant="hero" className="w-full" onClick={runAnalysis} disabled={analyzing}>
              {analyzing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</> : <><Brain className="w-4 h-4 mr-2" /> Run AI Analysis</>}
            </Button>
          )}

          {/* Progress */}
          <AnimatePresence>
            {analyzing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                {['Loading AI Model...', 'Detecting damage patterns...', 'Computing risk scores...'].map((step, i) => (
                  <motion.div key={step} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.8 }}
                    className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    {step}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-semibold flex items-center gap-2"><Brain className="w-5 h-5 text-primary" /> Detection Results</h3>
          {!results ? (
            <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
              {analyzing ? 'Processing...' : 'Upload an image and run analysis to see results'}
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((d, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedDetection === d ? 'border-primary bg-primary/5' : 'border-border hover:border-border/80'}`}
                  onClick={() => setSelectedDetection(d)}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{d.type}</span>
                    <Badge style={{ backgroundColor: severityColor[d.severity] + '22', color: severityColor[d.severity], borderColor: severityColor[d.severity] }}
                      className="border">{d.severity}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Confidence</span>
                      <p className="font-semibold">{d.confidence}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Risk Score</span>
                      <p className="font-semibold">{d.riskScore}/100</p>
                    </div>
                    <div>
                      <div className="w-full h-2 bg-muted rounded-full mt-3">
                        <div className="h-full rounded-full" style={{ width: `${d.riskScore}%`, backgroundColor: severityColor[d.severity] }} />
                      </div>
                    </div>
                  </div>
                  {selectedDetection === d && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                        <p className="text-sm text-muted-foreground">{d.explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Analysis complete — {results.length} issues detected</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;

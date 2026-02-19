export type Role = 'super_admin' | 'zone_officer' | 'field_inspector';

export interface Asset {
  id: string;
  name: string;
  type: 'road' | 'water' | 'building';
  lat: number;
  lng: number;
  healthScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastInspection: string;
  zone: string;
  status: string;
}

export interface Alert {
  id: string;
  assetName: string;
  riskScore: number;
  alertType: string;
  timestamp: string;
  status: 'resolved' | 'pending';
  zone: string;
}

export const assets: Asset[] = [
  { id: 'A001', name: 'MG Road Flyover', type: 'road', lat: 12.9716, lng: 77.5946, healthScore: 34, riskLevel: 'critical', lastInspection: '2026-01-15', zone: 'Zone A', status: 'Needs Repair' },
  { id: 'A002', name: 'Koramangala Water Main', type: 'water', lat: 12.9352, lng: 77.6245, healthScore: 72, riskLevel: 'medium', lastInspection: '2026-02-01', zone: 'Zone B', status: 'Monitoring' },
  { id: 'A003', name: 'Indiranagar Bridge', type: 'road', lat: 12.9784, lng: 77.6408, healthScore: 88, riskLevel: 'low', lastInspection: '2026-02-10', zone: 'Zone A', status: 'Good' },
  { id: 'A004', name: 'Whitefield Treatment Plant', type: 'water', lat: 12.9698, lng: 77.7500, healthScore: 45, riskLevel: 'high', lastInspection: '2025-12-20', zone: 'Zone C', status: 'Under Review' },
  { id: 'A005', name: 'Jayanagar Community Hall', type: 'building', lat: 12.9250, lng: 77.5830, healthScore: 91, riskLevel: 'low', lastInspection: '2026-02-14', zone: 'Zone B', status: 'Good' },
  { id: 'A006', name: 'Hebbal Flyover Section B', type: 'road', lat: 13.0358, lng: 77.5970, healthScore: 28, riskLevel: 'critical', lastInspection: '2026-01-05', zone: 'Zone A', status: 'Critical' },
  { id: 'A007', name: 'BTM Layout Pipeline', type: 'water', lat: 12.9166, lng: 77.6101, healthScore: 63, riskLevel: 'medium', lastInspection: '2026-01-28', zone: 'Zone B', status: 'Monitoring' },
  { id: 'A008', name: 'Electronic City Overpass', type: 'road', lat: 12.8456, lng: 77.6603, healthScore: 55, riskLevel: 'high', lastInspection: '2026-01-18', zone: 'Zone C', status: 'Scheduled' },
  { id: 'A009', name: 'Yelahanka Municipal Office', type: 'building', lat: 13.1007, lng: 77.5963, healthScore: 79, riskLevel: 'low', lastInspection: '2026-02-08', zone: 'Zone A', status: 'Good' },
  { id: 'A010', name: 'Marathahalli Sewage Line', type: 'water', lat: 12.9591, lng: 77.6974, healthScore: 41, riskLevel: 'high', lastInspection: '2025-12-15', zone: 'Zone C', status: 'Urgent' },
  { id: 'A011', name: 'Silk Board Junction Road', type: 'road', lat: 12.9177, lng: 77.6238, healthScore: 19, riskLevel: 'critical', lastInspection: '2026-01-10', zone: 'Zone B', status: 'Critical' },
  { id: 'A012', name: 'Rajajinagar Water Tank', type: 'water', lat: 12.9900, lng: 77.5550, healthScore: 82, riskLevel: 'low', lastInspection: '2026-02-12', zone: 'Zone A', status: 'Good' },
];

export const alerts: Alert[] = [
  { id: 'AL001', assetName: 'MG Road Flyover', riskScore: 89, alertType: 'Structural Crack Detected', timestamp: '2026-02-18T14:30:00', status: 'pending', zone: 'Zone A' },
  { id: 'AL002', assetName: 'Hebbal Flyover Section B', riskScore: 94, alertType: 'Load Bearing Failure Risk', timestamp: '2026-02-18T12:15:00', status: 'pending', zone: 'Zone A' },
  { id: 'AL003', assetName: 'Silk Board Junction Road', riskScore: 91, alertType: 'Surface Degradation Critical', timestamp: '2026-02-17T09:45:00', status: 'pending', zone: 'Zone B' },
  { id: 'AL004', assetName: 'Marathahalli Sewage Line', riskScore: 78, alertType: 'Pipe Corrosion Detected', timestamp: '2026-02-17T08:00:00', status: 'pending', zone: 'Zone C' },
  { id: 'AL005', assetName: 'Whitefield Treatment Plant', riskScore: 72, alertType: 'Water Quality Below Threshold', timestamp: '2026-02-16T16:20:00', status: 'resolved', zone: 'Zone C' },
  { id: 'AL006', assetName: 'Electronic City Overpass', riskScore: 65, alertType: 'Vibration Anomaly', timestamp: '2026-02-16T11:30:00', status: 'resolved', zone: 'Zone C' },
  { id: 'AL007', assetName: 'BTM Layout Pipeline', riskScore: 58, alertType: 'Pressure Drop Warning', timestamp: '2026-02-15T14:00:00', status: 'resolved', zone: 'Zone B' },
  { id: 'AL008', assetName: 'Koramangala Water Main', riskScore: 52, alertType: 'Leak Probability High', timestamp: '2026-02-15T10:00:00', status: 'pending', zone: 'Zone B' },
];

export const riskTrendData = [
  { month: 'Sep', score: 62 },
  { month: 'Oct', score: 58 },
  { month: 'Nov', score: 55 },
  { month: 'Dec', score: 61 },
  { month: 'Jan', score: 52 },
  { month: 'Feb', score: 48 },
];

export const issueDistribution = [
  { name: 'Roads', value: 42, fill: 'hsl(187, 85%, 53%)' },
  { name: 'Water', value: 31, fill: 'hsl(200, 80%, 45%)' },
  { name: 'Buildings', value: 18, fill: 'hsl(152, 69%, 41%)' },
  { name: 'Other', value: 9, fill: 'hsl(38, 92%, 50%)' },
];

export const degradationData = [
  { month: 'Sep', roads: 12, water: 8, buildings: 3 },
  { month: 'Oct', roads: 15, water: 10, buildings: 5 },
  { month: 'Nov', roads: 11, water: 12, buildings: 4 },
  { month: 'Dec', roads: 18, water: 9, buildings: 6 },
  { month: 'Jan', roads: 22, water: 14, buildings: 7 },
  { month: 'Feb', roads: 19, water: 11, buildings: 5 },
];

export const roleConfig = {
  super_admin: { label: 'Super Admin', zones: ['Zone A', 'Zone B', 'Zone C'], description: 'City Level Access' },
  zone_officer: { label: 'Zone Officer', zones: ['Zone A'], description: 'Zone A Access' },
  field_inspector: { label: 'Field Inspector', zones: ['Zone A'], description: 'Assigned Assets Only' },
};

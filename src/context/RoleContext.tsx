import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type Role, roleConfig, assets, alerts } from '@/data/mockData';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  config: typeof roleConfig[Role];
  filteredAssets: typeof assets;
  filteredAlerts: typeof alerts;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>('super_admin');
  const config = roleConfig[role];

  const filteredAssets = role === 'field_inspector'
    ? assets.filter(a => config.zones.includes(a.zone)).slice(0, 4)
    : assets.filter(a => config.zones.includes(a.zone));

  const filteredAlerts = alerts.filter(a => config.zones.includes(a.zone));

  return (
    <RoleContext.Provider value={{ role, setRole, config, filteredAssets, filteredAlerts }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
};

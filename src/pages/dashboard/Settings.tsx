import React from 'react';
import { useRole } from '@/context/RoleContext';
import { useTheme } from '@/context/ThemeContext';
import { type Role, roleConfig } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Sun, Moon, User, Shield } from 'lucide-react';

const SettingsPage = () => {
  const { role, setRole, config } = useRole();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Platform configuration</p>
      </div>

      <div className="glass-card p-6 space-y-6">
        {/* Theme */}
        <div>
          <h3 className="font-semibold mb-3">Appearance</h3>
          <div className="flex items-center gap-4">
            <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => theme === 'dark' && toggleTheme()}>
              <Sun className="w-4 h-4 mr-2" /> Light
            </Button>
            <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => theme === 'light' && toggleTheme()}>
              <Moon className="w-4 h-4 mr-2" /> Dark
            </Button>
          </div>
        </div>

        {/* Role */}
        <div>
          <h3 className="font-semibold mb-3">Role Simulation</h3>
          <p className="text-sm text-muted-foreground mb-3">Switch between roles to see how the dashboard adapts.</p>
          <div className="grid gap-3">
            {(Object.entries(roleConfig) as [Role, typeof roleConfig[Role]][]).map(([key, val]) => (
              <div key={key}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${role === key ? 'border-primary bg-primary/5' : 'border-border hover:border-border/80'}`}
                onClick={() => setRole(key)}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${role === key ? 'bg-primary/20' : 'bg-muted'}`}>
                    {key === 'super_admin' ? <Shield className="w-5 h-5 text-primary" /> : <User className="w-5 h-5 text-muted-foreground" />}
                  </div>
                  <div>
                    <p className="font-medium">{val.label}</p>
                    <p className="text-sm text-muted-foreground">{val.description} — Zones: {val.zones.join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

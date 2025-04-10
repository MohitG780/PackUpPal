import React from "react";

export default function SettingsPage() {
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Settings</h1>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="default-location" style={{ display: 'block', marginBottom: '8px' }}>Default Departure Location</label>
          <input id="default-location" placeholder="e.g. New York, NY" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="budget" style={{ display: 'block', marginBottom: '8px' }}>Travel Budget ($)</label>
          <input id="budget" type="number" placeholder="e.g. 1500" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <label htmlFor="notifications">Enable Notifications</label>
          <input id="notifications" type="checkbox" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label htmlFor="dark-mode">Dark Mode</label>
          <input id="dark-mode" type="checkbox" />
        </div>
      </div>

      <hr style={{ marginBottom: '24px' }} />

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="language" style={{ display: 'block', marginBottom: '8px' }}>Preferred Language</label>
          <input id="language" placeholder="e.g. English" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div>
          <label htmlFor="currency" style={{ display: 'block', marginBottom: '8px' }}>Preferred Currency</label>
          <input id="currency" placeholder="e.g. USD" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
      </div>

      <button style={{ width: '100%', padding: '12px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}>
        Save Settings
      </button>
    </div>
  );
}

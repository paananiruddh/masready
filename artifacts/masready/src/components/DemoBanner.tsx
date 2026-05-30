import React from 'react';

type DemoBannerVariant = 'seed-data' | 'planning';

interface DemoBannerProps {
  variant: DemoBannerVariant;
}

const MESSAGES: Record<DemoBannerVariant, string> = {
  'seed-data':
    'DEMO DATA — All values are fictional and for demonstration only. ' +
    'No real customer, operational, or system data is used.',
  planning:
    'PLANNING VISIBILITY ONLY — Licence figures are for planning purposes only. ' +
    'Not IBM-certified or contractual advice.',
};

const STYLES: Record<DemoBannerVariant, React.CSSProperties> = {
  'seed-data': {
    backgroundColor: '#1d4ed8',
    color: '#ffffff',
    padding: '8px 16px',
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.01em',
    width: '100%',
  },
  planning: {
    backgroundColor: '#d97706',
    color: '#ffffff',
    padding: '8px 16px',
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.01em',
    width: '100%',
  },
};

export function DemoBanner({ variant }: DemoBannerProps) {
  return (
    <div style={STYLES[variant]} role="status" aria-live="polite">
      {MESSAGES[variant]}
    </div>
  );
}

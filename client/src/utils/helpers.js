import React from 'react';

export const dump = obj => (
  <pre
    style={{
      backgroundColor: '#272822',
      color: 'crimson',
      padding: '.5rem',
      maxWidth: '600px',
      height: 'auto',
      fontSize: '12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <code style={{ width: '100%' }}>{JSON.stringify(obj, null, 2)}</code>
  </pre>
);

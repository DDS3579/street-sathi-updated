
import { useEffect } from 'react';

const RedirectBackend = () => {
  useEffect(() => {
    window.location.replace('http://localhost:8081');
  }, []);
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <p>Redirecting to backend...</p>
      <div className="spinner"></div> {/* Optional loading spinner */}
    </div>
  );
};

export default RedirectBackend;
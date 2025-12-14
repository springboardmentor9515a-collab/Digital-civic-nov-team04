import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar1 from '../../components/sidebar/Sidebar1';
import Welcome from '../../components/dashboard/Welcome';
import DashboardBar from '../../components/dashboard/DashboardBar';

export default function Dashboard() {
  const [user, setUser] = useState({
    id: 1,
    name: "Ayush Prem",
    role: "citizen",
  });
  const [loading, setLoading] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Responsive: check if mobile
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 600 : false
  );

  // ❌ DISABLED: backend profile fetch + redirect
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const data = await getProfile();
  //       setUser(data.user);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Failed to fetch profile:", err);
  //       navigate('/login');
  //     }
  //   };
  //   fetchUser();
  // }, [navigate]);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(typeof window !== 'undefined' ? window.innerWidth <= 600 : false);
      if (window.innerWidth > 600) {
        setShowMobileSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setShowMobileSidebar(false);
  }, [location.pathname]);

  const isDashboardIndex =
    location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  const handleMobileProfileToggle = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        isMobile={isMobile}
        onMobileProfileClick={handleMobileProfileToggle}
        showMobileSidebar={showMobileSidebar}
      />

      {isMobile ? (
        <>
          {showMobileSidebar && (
            <div
              className="fixed inset-0 z-50 bg-black bg-opacity-50"
              style={{ marginTop: 64 }}
              onClick={handleMobileProfileToggle}
            >
              <div
                className="absolute top-0 right-0 w-80 max-w-[90vw] bg-white shadow-2xl rounded-bl-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Sidebar1
                  user={user}
                  isMobile={true}
                  onClose={handleMobileProfileToggle}
                />
              </div>
            </div>
          )}

          {isDashboardIndex && (
            <div style={{ width: '100%', padding: '16px', marginTop: 70 }}>
              <Welcome user={user} />
            </div>
          )}

          <div style={{ width: '100%', padding: '16px' }}>
            <Outlet />
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', marginTop: 64 }}>
          <div
            style={{
              width: 280,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#fff',
              minHeight: 'calc(100vh - 64px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <Sidebar1 user={user} />
            <DashboardBar />
          </div>

          <div
            style={{
              flex: 1,
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {isDashboardIndex && <Welcome user={user} />}

            <div>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, LayoutDashboard, ShoppingCart, Settings, HelpCircle, Server } from 'lucide-react';
import Sidebar from '../../layout/Sidebar/Sidebar';
import TopUtilityBar from '../../layout/TopUtilityBar/TopUtilityBar';
import styles from './DashboardLayout.module.css';

// Sample Configuration, can be moved to a separate file later
const sampleNavConfig = [
    {
        label: 'Main',
        items: [
            { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
            { label: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
            { label: 'Compute', href: '/dashboard/compute', icon: Server },
        ],
    },
    {
        label: 'Management',
        items: [
            { label: 'Settings', href: '/dashboard/settings', icon: Settings },
            { label: 'Support', href: '/dashboard/support', icon: HelpCircle },
        ],
    },
];

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to get route title
    const getRouteTitle = () => {
        const path = location.pathname;
        if (path === '/dashboard') return 'Dashboard Overview';
        if (path.includes('/orders')) return 'Orders';
        if (path.includes('/compute')) return 'Compute';
        if (path.includes('/settings')) return 'Settings';
        if (path.includes('/support')) return 'Support';
        return 'Dashboard';
    };

    // Fetch real user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const role = localStorage.getItem('role'); // 'customer' or 'agent'

                if (!token || !role) {
                    navigate('/');
                    return;
                }

                const endpointPrefix = role === 'customer' ? 'user' : 'agent';
                // Match the backend route structure (e.g. /api/user/getDetails or /api/agent/getDetails)
                const response = await fetch(`http://localhost:3001/api/${endpointPrefix}/getDetails`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser({
                        name: data.name || data.email?.split('@')[0] || 'Unknown',
                        role: role, // 'customer' or 'agent'
                        profilePicture: data.profilePicture || data.profilePic || null
                    });
                } else {
                    // Handle token expiry or error
                    console.error("Failed to fetch user details", response.status);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    // Auto-collapse sidebar on smaller screens if needed, but not mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024 && window.innerWidth >= 768) {
                setCollapsed(true);
            } else if (window.innerWidth >= 1024) {
                setCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        // Init block
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.layout}>
            <Sidebar
                navConfig={sampleNavConfig}
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed(!collapsed)}
                user={user}
                isMobileMenuOpen={isMobileMenuOpen}
                onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
            />

            <main
                className={styles.content}
                style={{ marginLeft: collapsed ? 80 : 260 }} // Framer motion transitions this smoothly in css
            >
                <TopUtilityBar
                    title={getRouteTitle()}
                    showSearch={true}
                    onSearch={(val) => console.log('Search:', val)}
                    primaryAction={{
                        label: 'Book Now',
                        onClick: () => console.log('Book Now clicked')
                    }}
                    notifications={{
                        count: 2,
                        onClick: () => console.log('Notifications clicked')
                    }}
                    user={user ? {
                        name: user.name,
                        avatarUrl: user.profilePicture
                    } : null}
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                />

                <div className={styles.mainArea}>
                    {/* Main Route Content will drop into here */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

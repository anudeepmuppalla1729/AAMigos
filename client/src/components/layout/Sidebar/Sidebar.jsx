import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import NavSection from './NavSection';
import styles from './Sidebar.module.css';
import logoImg from '../../../assets/logo.png';

export default function Sidebar({
    navConfig,
    collapsed,
    onToggleCollapse, // Will be used in topbar or inside sidebar to toggle (optional UI addition)
    user,
    isMobileMenuOpen,
    onCloseMobileMenu
}) {
    const sidebarWidth = collapsed ? 80 : 260;

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    const content = (
        <>
            {/* Top Section */}
            <div className={styles.topSection}>
                <div className={styles.logoContainer}>
                    <img src={logoImg} alt="AAMigos Logo" className={styles.logoImage} />
                </div>
            </div>

            {/* Navigation Content */}
            <nav className={styles.navContent}>
                {navConfig.map((section, idx) => (
                    <NavSection key={idx} section={section} collapsed={collapsed} />
                ))}
            </nav>

            {/* Toggle Rail Button */}
            <div className={styles.toggleContainer}>
                <button
                    onClick={onToggleCollapse}
                    className={`${styles.toggleBtn} ${collapsed ? styles.toggleBtnCollapsed : ''}`}
                    title="Toggle Rail"
                >
                    {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
                    {!collapsed && <span>Collapse</span>}
                </button>
            </div>

            {/* Bottom User Section */}
            <div
                className={`${styles.userSection} ${collapsed ? styles.userSectionCollapsed : ''
                    }`}
            >
                <div className={styles.avatar}>{user?.name?.charAt(0) || 'U'}</div>
                <AnimatePresence mode="wait">
                    {!collapsed && (
                        <motion.div
                            key="user"
                            className={styles.userInfo}
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className={styles.userName}>{user?.name || 'User'}</span>
                            <span className={styles.userRole}>{user?.role || 'Admin'}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );

    return (
        <>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={styles.mobileOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCloseMobileMenu}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                className={`${styles.sidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}
                initial={false}
                animate={{ width: sidebarWidth }}
                transition={{
                    type: 'spring',
                    stiffness: 140,
                    damping: 20
                }}
            >
                {content}
            </motion.aside>
        </>
    );
}

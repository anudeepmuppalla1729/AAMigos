import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './TopUtilityBar.module.css';

// Minimal in-built SVG for notifications if react-icons is not used directly
const BellIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

const MenuIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const TopUtilityBar = ({
    title,
    showSearch,
    onSearch,
    primaryAction,
    notifications,
    user,
    onMenuClick // Mobile menu trigger, optional future extension
}) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <motion.div
            className={styles.topUtilityBar}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className={styles.leftSection}>
                {/* Render a menu icon strictly on very small screens, optional */}
                {onMenuClick && (
                    <button
                        className={styles.notificationIcon}
                        onClick={onMenuClick}
                        style={{ marginRight: '8px', display: 'none' }} // you can adjust display in css via block on mobile
                        aria-label="Toggle menu"
                    >
                        <MenuIcon />
                    </button>
                )}

                {title && <h1 className={styles.title}>{title}</h1>}
            </div>

            <div className={styles.rightSection}>
                {showSearch && (
                    <div className={styles.searchWrapper}>
                        <motion.input
                            type="text"
                            placeholder="Search..."
                            className={styles.searchInput}
                            initial={{ width: 200 }}
                            animate={{ width: isSearchFocused ? 260 : 200 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            onChange={(e) => onSearch && onSearch(e.target.value)}
                        />
                    </div>
                )}

                {primaryAction && (
                    <motion.button
                        className={styles.primaryButton}
                        onClick={primaryAction.onClick}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                    >
                        {primaryAction.label}
                    </motion.button>
                )}

                {notifications && (
                    <motion.button
                        className={styles.notificationIcon}
                        onClick={notifications.onClick}
                        whileTap={{ scale: 0.95 }}
                    >
                        <BellIcon />
                        {notifications.count > 0 && <span className={styles.badge} />}
                    </motion.button>
                )}

                {user && (
                    <motion.div
                        className={styles.avatar}
                        onClick={user.onClick}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        style={user.avatarUrl ? { backgroundImage: `url(${user.avatarUrl})` } : {}}
                        title={user.name}
                    >
                        {!user.avatarUrl && user.name && user.name.charAt(0).toUpperCase()}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default TopUtilityBar;

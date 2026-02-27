import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Sidebar.module.css';

export default function NavItem({ item, collapsed }) {
    const [isHovered, setIsHovered] = useState(false);

    const { icon: Icon, label, href } = item;

    return (
        <NavLink
            to={href}
            className={({ isActive }) =>
                `${styles.navItem} ${collapsed ? styles.navItemCollapsed : ''} ${isActive ? styles.active : ''
                }`
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            end
        >
            {({ isActive }) => (
                <>
                    {isActive && (
                        <motion.div
                            layoutId="sidebar-active-indicator"
                            className={styles.activeIndicator}
                            initial={false}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 30,
                            }}
                        />
                    )}

                    <div
                        className={styles.tooltipContainer}
                        style={{ width: collapsed ? 'auto' : '100%' }}
                    >
                        <motion.div
                            className={styles.iconContainer}
                            whileHover={{ x: collapsed ? 0 : 2 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                        </motion.div>

                        <AnimatePresence>
                            {!collapsed && (
                                <motion.span
                                    className={styles.linkLabel}
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {label}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* Tooltip for collapsed mode */}
                        <AnimatePresence>
                            {collapsed && isHovered && (
                                <motion.div
                                    className={styles.tooltip}
                                    initial={{ opacity: 0, x: 5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 5 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {label}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </>
            )}
        </NavLink>
    );
}

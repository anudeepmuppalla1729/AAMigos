import { motion, AnimatePresence } from 'framer-motion';
import NavItem from './NavItem';
import styles from './Sidebar.module.css';

export default function NavSection({ section, collapsed }) {
    return (
        <div className={styles.section}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={collapsed ? 'collapsed' : 'expanded'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${styles.sectionLabel} ${collapsed ? styles.sectionLabelCollapsed : ''
                        }`}
                >
                    {collapsed ? '•••' : section.label}
                </motion.div>
            </AnimatePresence>

            <div className={styles.sectionItems}>
                {section.items.map((item, index) => (
                    <NavItem key={item.href || index} item={item} collapsed={collapsed} />
                ))}
            </div>
        </div>
    );
}

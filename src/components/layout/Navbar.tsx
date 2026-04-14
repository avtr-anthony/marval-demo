import { siteConfig } from '@/config/site';

import { BrandLogo } from './BrandLogo';
import { ActionLink } from '../ui/ActionLink';
import { Container } from '../ui/Container';
import { ThemeToggle } from '../theme/ThemeToggle';
import styles from './Navbar.module.css';

/**
 * Floating navbar with centered navigation and primary chat CTA.
 */
export function Navbar() {
    return (
        <header className={styles.header}>
            <Container as="div">
                <div className={styles.shell}>
                    <div className={styles.navSlot}>
                        <nav className={styles.nav}>
                            {siteConfig.navigation.map(item => (
                                <a
                                    className={styles.navLink}
                                    key={item.href}
                                    href={item.href}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <BrandLogo
                        compact
                        plainIcon
                        className={styles.brand}
                    />

                    <div className={styles.actions}>
                        <div className={styles.mobileThemeToggle}>
                            <ThemeToggle />
                        </div>
                        <ActionLink
                            href={siteConfig.routes.chat}
                            className={styles.chatLink}
                        >
                            Ir al chat
                        </ActionLink>
                    </div>
                </div>
            </Container>
        </header>
    );
}

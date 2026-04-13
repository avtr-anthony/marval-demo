import { siteConfig } from '@/config/site';

import { BrandLogo } from './BrandLogo';
import { ActionLink } from '../ui/ActionLink';
import { Container } from '../ui/Container';
import styles from './Navbar.module.css';

/**
 * Floating navbar with centered navigation and primary chat CTA.
 */
export function Navbar() {
    return (
        <header className={styles.header}>
            <Container as="div">
                <div className={`${styles.shell} `}>
                    <nav className={`${styles.nav} `}>
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
                    <BrandLogo
                        compact
                        plainIcon
                    />

                    <div className={styles.actions}>
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

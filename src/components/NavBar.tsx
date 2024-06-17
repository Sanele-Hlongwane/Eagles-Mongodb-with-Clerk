'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import styles from './NavBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faUsers, faCalendarAlt, faEnvelope, faBlog, faInfoCircle, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FiSearch } from 'react-icons/fi'; 

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768); // Adjust breakpoint as needed
    };

    // Initial check on mount (client-side only)
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={styles.nav}>
      <div className={styles.searchContainer}>
        <UserButton />
        <input type="text" className={styles.searchInput} placeholder="Search..." />
      </div>
      <nav className={`${styles.navLinks} ${isDesktop ? styles.desktopMenu : ''} ${showMenu ? styles.showMenu : ''}`}>
        <ul>
          <li>
            <Link href="/index">
              <div className={styles.navLink}>
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <div className={styles.navLink}>
                <FontAwesomeIcon icon={faChartLine} />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/VideoConference">
              <div className={styles.navLink}>
                <FontAwesomeIcon icon={faUsers} />
                <span>Entrepreneurs</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/events">
              <div className={styles.navLink}>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>Events</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/messages">
              <div className={styles.navLink}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Messages</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/blogs">
              <div className={styles.navLink}>
                <FontAwesomeIcon icon={faBlog} />
                <span>Blogs</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <div className={styles.navLink}>
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>About</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      {/* Ensure hamburger is only rendered on the client side */}
      {typeof window !== 'undefined' && !isDesktop && (
        <div className={styles.hamburger} onClick={toggleMenu}>
          <FontAwesomeIcon icon={showMenu ? faTimes : faBars} />
        </div>
      )}
    </header>
  );
}

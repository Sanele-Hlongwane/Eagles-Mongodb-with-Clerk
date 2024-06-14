// pages/index.js

import Head from 'next/head';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Eagles Ring - Investment Platform</title>
        <meta name="description" content="Eagles Ring - Connecting entrepreneurs with investors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>Eagles Ring</span>
        </h1>
       

        <p className={styles.description}>
          An investment platform that connects aspiring entrepreneurs with experienced investors.
        </p>

        <div className={styles.grid}>
          <a href="/pitch" className={styles.card}>
            <h3>Entrepreneurs &rarr;</h3>
            <p>Learn how to pitch your business idea to our panel of investors.</p>
          </a>

          <a href="/investors" className={styles.card}>
            <h3>Investors &rarr;</h3>
            <p>Discover how to become an Eagle and invest in promising ventures.</p>
          </a>

          <a href="/about" className={styles.card}>
            <h3>About Us &rarr;</h3>
            <p>Learn more about Eagles Ring, our mission, and our team.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 Eagles Ring. All rights reserved.</p>
      </footer>
    </div>
  );
}

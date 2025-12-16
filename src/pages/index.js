import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './offre.module.css';

// Reusing global styles where appropriate, using local styles for specific layouts
// Global styles expected: .hero-section, .vibe-button, .card, etc. (from custom.css)

export default function Home() {
  return (
    <Layout
      title="Offre Senior Expert"
      description="Développement Web Senior & Rapide pour Entrepreneurs">

      {/* 1. Hero Section */}
      <header className={clsx('hero-section', styles.sectionDark)}>
        <div className="container">
          <h1 className="hero__title">
            Votre Site ou Outil clé en Main en <br /><span className="highlight">7 Jours Max !</span>
          </h1>
          <h2 className={clsx('hero__subtitle', styles.heroContent)}>
            Stop aux projets qui s'éternisent !
            <br />
            Je vous livre un produit fini, fiable et prêt à l'emploi, pour un budget clair et garanti.
          </h2>

          <div className="section-cta">
            <a
              href="https://tally.so/r/example"
              className="vibe-button pulse"
              target="_blank"
              rel="noopener noreferrer"
            >
              ⚡ Démarrer Mon Diagnostic Gratuit et Ultra-Rapide
            </a>
          </div>

          <p className="hero__proof">
            — Déjà 8 projets mis sur orbite en un temps record.
          </p>
        </div>
      </header>

      <main>
        {/* 2. Le Problème */}
        <section id="problem" className={clsx('section', styles.sectionLight)}>
          <div className={styles.container}>
            <h2 className="section-title">Le Piège du Développement Classique</h2>
            <p>Vous avez une idée urgente, mais les agences vous proposent des délais et des prix inadaptés.</p>

            <div className={styles.problemGrid}>
              <div className={clsx('card', styles.problemCard)}>
                <div className={styles.problemIcon}>❌</div>
                <h3>Des devis astronomiques</h3>
                <p>Vous payez pour leur temps d'apprentissage et leurs lourdeurs internes.</p>
              </div>
              <div className={clsx('card', styles.problemCard)}>
                <div className={styles.problemIcon}>❌</div>
                <h3>Des délais de 4 à 8 semaines</h3>
                <p>Vous perdez votre avance sur le marché en attendant que ça bouge.</p>
              </div>
              <div className={clsx('card', styles.problemCard)}>
                <div className={styles.problemIcon}>❌</div>
                <h3>Des surprises techniques</h3>
                <p>Le produit final ne correspond pas à vos attentes ou plante au lancement.</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a
                href="#contact"
                className="vibe-button-outline"
              >
                🛑 Je veux éviter ces pièges
              </a>
            </div>
          </div>
        </section>

        {/* 3. La Méthode */}
        <section id="method" className={clsx('section', styles.sectionGradient)}>
          <div className={styles.container}>
            <h2 className="section-title">L'Accélérateur Vibe Coding</h2>
            <p style={{ marginBottom: '3rem' }}>L'Efficacité du Développeur Senior boosté à l'IA</p>

            <div className={styles.methodContainer}>
              <div className={styles.methodFeature}>
                <div className={styles.methodIcon}>🚀</div>
                <div>
                  <h3>Couper le temps par deux</h3>
                  <p>L'IA optimisée fait 80% du travail. Je me concentre uniquement sur les 20% restant qui impacteront le plus votre métier.</p>
                </div>
              </div>
              <div className={styles.methodFeature}>
                <div className={styles.methodIcon}>🛡️</div>
                <div>
                  <h3>Éliminer les bugs</h3>
                  <p>Mon expertise senior me permet d'éviter les erreurs que les équipes juniors font, vous assurant une solution stable dès le premier jour.</p>
                </div>
              </div>
              <div className={styles.methodFeature}>
                <div className={styles.methodIcon}>💰</div>
                <div>
                  <h3>Maîtriser le Budget</h3>
                  <p>Le temps est réduit, et donc le prix final aussi. C'est l'intelligence du développement, pas le cumul des heures.</p>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a
                href="#contact"
                className="vibe-button"
              >
                🚀 Je veux profiter de cette accélération
              </a>
            </div>
          </div>
        </section>

        {/* 4. Les Solutions */}
        <section id="solutions" className={clsx('section', styles.sectionLight)}>
          <div className={styles.container}>
            <h2 className="section-title">Les Solutions Clés en Main</h2>

            <div className={styles.solutionGrid}>
              <div className={styles.solutionCard}>
                <h3>🌐 Votre Plateforme d'Acquisition Optimisée</h3>
                <p><strong>Parfait pour :</strong> Les lancements rapides, la collecte de prospects (leads) ou la présentation de votre activité.</p>
                <hr style={{ margin: '1.5rem 0', opacity: 0.2 }} />
                <p><strong>Le Bénéfice :</strong> Un site web incroyablement rapide, qui plaît à Google et qui convertit vos visiteurs en clients.</p>
              </div>

              <div className={styles.solutionCard}>
                <h3>📈 Votre Outil de Gestion Interne</h3>
                <p><strong>Parfait pour :</strong> Les entrepreneurs qui veulent gérer leurs clients, leurs commandes ou leurs stocks sans passer par Excel.</p>
                <hr style={{ margin: '1.5rem 0', opacity: 0.2 }} />
                <p><strong>Le Bénéfice :</strong> Un tableau de bord sur mesure, simple à utiliser, qui automatise les tâches et vous fait gagner des heures chaque semaine.</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a
                href="#contact"
                className="vibe-button"
              >
                💬 Discuter de mon besoin
              </a>
            </div>
          </div>
        </section>

        {/* 5. Pricing */}
        <section id="pricing" className={clsx('section', styles.sectionDark)}>
          <div className={styles.container}>
            <h2 className="section-title">Qualité Senior, Prix Compétitif</h2>

            <div className={styles.pricingContainer}>
              <div className={clsx('card', styles.pricingCard)} style={{ maxWidth: '400px' }}>
                <h3>Agence Standard</h3>
                <p className={styles.competitorPrice}>à partir de 12 000 €</p>
                <ul>
                  <li>Délais longs (2+ mois)</li>
                  <li>Frais de gestion de projet</li>
                  <li>Développeurs juniors souvent</li>
                </ul>
              </div>

              <div className={clsx('pricing-column', 'vibe')}>
                <h3>Forfait Vibe Coding</h3>
                <div className={styles.vibePrice}>4 950 €</div>
                <p><strong>Même qualité, 4 fois plus rapide.</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginTop: '2rem' }}>
                  <li>✅ Architecture Senior éprouvée</li>
                  <li>✅ Délai court garanti</li>
                  <li>✅ Résultat fonctionnel immédiat</li>
                </ul>
                <div style={{ marginTop: '2rem' }}>
                  <a
                    href="https://tally.so/r/example"
                    className="vibe-button pulse"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block' }}
                  >
                    🚀 Je réserve mon lancement
                  </a>
                </div>
              </div>
            </div>

            <p style={{ marginTop: '2rem', fontStyle: 'italic', opacity: 0.8 }}>
              "Votre Garantie : Un prix fixe, un délai court, et un suivi constant."
            </p>
          </div>
        </section>

        {/* 6. Contact / CTA Final */}
        <section id="contact" className={clsx('section', styles.sectionLight)}>
          <div className={styles.container}>
            <div className={styles.finalCtaContainer}>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>🛑 Votre Prochaine Étape est Simple</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                Ne perdez pas de temps à demander des devis complexes.<br />Envoyez-moi les 3 informations clés de votre projet.
              </p>

              <a
                href="https://tally.so/r/example"
                className="vibe-button pulse"
                target="_blank"
                rel="noopener noreferrer"
              >
                ⚡ Je veux connaître mon prix et mon délai précis en 24h !
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

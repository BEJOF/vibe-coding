import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HeroSection() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="hero-section">
      <div className="container">
        <h1 className="hero__title">Obtenez votre MVP ou Dashboard de gestion sur mesure <span className="highlight">en 5 jours</span>.</h1>
        <p className="hero__subtitle">
          Le développement ultra-rapide par un expert Fullstack Senior.
        </p>
        <div className="hero__contrast">
          <p>Arrêtez de payer des agences pour des mois de développement. Nous livrons la qualité en une fraction du temps pour 50% du prix.</p>
        </div>
        <div className="hero__cta">
          <Link
            className="button button--primary button--lg vibe-button"
            to="#contact">
            ⚡ Demander mon Forfait MVP Express (Réponse en 1H)
          </Link>
        </div>
        <div className="hero__proof">
          <p>— Déjà 12 MVPs livrés en moins d'une semaine.</p>
        </div>
      </div>
    </header>
  );
}

function ProblemSection() {
  return (
    <section className="section problem-section">
      <div className="container">
        <h2 className="section-title">❓ Le Problème</h2>
        <p className="section-subtitle">Le Mythe du Développement Lent et Cher</p>
        <div className="row">
          <div className="col col--6">
            <div className="card problem-card">
              <h3>👎 Le Risque</h3>
              <p>Des cycles de développement de 4 à 8 semaines, un budget qui explose, et un produit final qui n'est plus adapté au marché.</p>
            </div>
          </div>
          <div className="col col--6">
            <div className="card problem-card">
              <h3>👎 Le Coût du Retard</h3>
              <p>Chaque semaine perdue est du revenu non généré ou un avantage compétitif abandonné à la concurrence.</p>
            </div>
          </div>
        </div>
        <div className="section-cta">
          <Link
            className="button button--secondary button--lg vibe-button-outline"
            to="#solutions">
            ✨ Découvrir la méthode Vibe Coding
          </Link>
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section id="solutions" className="section solution-section">
      <div className="container">
        <h2 className="section-title">✨ Votre Solution Unique : Le "Vibe Coding"</h2>
        <div className="row">
          <div className="col col--4">
            <div className="card vibe-card">
              <h3>1. Le Starter-Kit Senior</h3>
              <p>Fiabilité garantie : Zéro temps perdu sur les bases. Architecture éprouvée, sécurisée et optimisée (SEO, Vitesse).</p>
            </div>
          </div>
          <div className="col col--4">
            <div className="card vibe-card">
              <h3>2. Le Scope Veloce</h3>
              <p>Budget Maîtrisé : Une définition du scope laser en 60 minutes. Pas de changement, pas de surcoût, pas de surprise.</p>
            </div>
          </div>
          <div className="col col--4">
            <div className="card vibe-card">
              <h3>3. Le Fullstack-Senior</h3>
              <p>Un seul interlocuteur : Frontend, Backend, API, DB. Un expert qui gère tout pour une exécution sans friction.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="section services-section">
      <div className="container">
        <h2 className="section-title">🛠️ Ce que nous construisons</h2>
        <div className="row">
          <div className="col col--4">
            <div className="card service-card">
              <h3>🌐 Landing Pages</h3>
              <p>Site Jamstack ultra-performant, prêt à convertir, livré en 48h.</p>
            </div>
          </div>
          <div className="col col--4">
            <div className="card service-card">
              <h3>📈 Dashboards & CRM</h3>
              <p>Outils de gestion spécifiques (CRUD) sur BaaS (Supabase) pour gérer vos opérations en une semaine.</p>
            </div>
          </div>
          <div className="col col--4">
            <div className="card service-card">
              <h3>🧪 Prototypes & MVPs</h3>
              <p>Testez votre idée avec un produit complet et stable avant d'investir massivement.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="section pricing-section">
      <div className="container">
        <h2 className="section-title">💰 Le Forfait "Sans Négociation"</h2>
        <div className="pricing-table">
          <div className="pricing-column traditional">
            <h3>Traditionnel</h3>
            <div className="price">12 000 € - 15 000 €</div>
            <p>4 à 8 semaines</p>
            <p>Frais cachés</p>
            <Link
              className="button button--secondary button--block"
              to="#contact">
              Demander un devis
            </Link>
          </div>
          <div className="pricing-column vibe">
            <h3>Vibe Coding</h3>
            <div className="price">À partir de 4 950 € HT</div>
            <p>1 semaine</p>
            <p className="highlight">Tout inclus : Code, Infra, Support 30j</p>
            <Link
              className="button button--primary button--lg vibe-button button--block"
              to="https://calendly.com/vibecoding/diagnostic">
              🚀 Je réserve mon slot
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="contact" className="section cta-section">
      <div className="container">
        <h2 className="section-title">🛑 STOP : Ne perdez plus un instant.</h2>
        <p>Si vous êtes prêt à lancer votre projet cette semaine, commençons le Diagnostic Express de 15 minutes.</p>
        <Link
          className="button button--primary button--lg vibe-button pulse"
          to="https://calendly.com/vibecoding/diagnostic">
          ⚡ Je veux un diagnostic de mon projet ultra-rapide !
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} | Développement MVP Express`}
      description="Développement rapide de MVP et Dashboards en 5 jours.">
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ServicesSection />
        <PricingSection />
        <CTASection />
      </main>
    </Layout>
  );
}

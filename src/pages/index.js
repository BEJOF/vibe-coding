import React, { useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './index.module.css';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function Engineering() {
  const heroRef = useRef(null);
  const priceRefs = useRef([]);

  useEffect(() => {
    // GSAP Parallax on Hero
    if (heroRef.current && typeof window !== 'undefined') {
      gsap.to(heroRef.current.querySelector('::before'), {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // GSAP Counter animation on prices
    priceRefs.current.forEach((el) => {
      if (el) {
        const text = el.textContent;
        const match = text.match(/(\d[\d\s]*)/);
        if (match) {
          const num = parseInt(match[1].replace(/\s/g, ''));
          gsap.fromTo(el,
            { innerText: 0 },
            {
              innerText: num,
              duration: 1.5,
              ease: 'power2.out',
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none'
              },
              onUpdate: function () {
                el.textContent = text.replace(/\d[\d\s]*/, Math.round(this.targets()[0].innerText).toLocaleString('fr-FR'));
              }
            }
          );
        }
      }
    });
  }, []);

  return (
    <Layout title="Good Vibe Coding" description="Expertise 15 ans pour vos projets Web & App.">

      {/* 1. HERO SECTION */}
      <motion.header
        ref={heroRef}
        className={styles.heroSection}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className={styles.container}>
          <motion.div
            className={styles.heroContent}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 className={styles.heroTitle} variants={fadeInUp}>
              Votre site ou outil sur-mesure déployé en <span className={styles.titleAccent}>7 jours !</span>
            </motion.h1>
            <motion.p className={styles.heroSubtitle} variants={fadeInUp}>
              Stop aux projets qui s'éternisent.<br />Je vous livre un produit fini, fiable et prêt à l'emploi, pour un budget clair et garanti.
            </motion.p>
            {/* <motion.p className={styles.heroSubtitle} variants={fadeInUp}>
                            J'allie 15 ans d'expertise en ingénierie à la puissance de l'IA pour transformer vos idées en solutions concrètes, sans les délais interminables des agences classiques.
                        </motion.p> */}

            {/* Social Proof Badge - Above CTA */}
            <motion.div
              className={styles.socialProofBadge}
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
            >
              <span className={styles.badgePulse}></span>
              <span>🚀 Déjà 8 projets propulsés en un temps record</span>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link to="/good-vibe-coding/audit-sprint" className={styles.ctaButton}>
                Estimer mon projet en 5 minutes →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      <main>
        {/* 3. PAIN SECTION */}
        <section id="problem" className={styles.painSection}>
          <div className={styles.container}>
            <motion.h2
              style={{ textAlign: 'center', fontSize: '2.5rem', color: 'white', marginBottom: '3rem' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              Le piège du développement classique
            </motion.h2>
            <motion.p
              style={{ textAlign: 'center', color: '#888', marginBottom: '3rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Vous avez une idée urgente, mais les agences vous proposent des délais et des prix inadaptés.
            </motion.p>
            <motion.div
              className={styles.painGrid}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className={styles.painCard} variants={fadeInUp} whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(138,43,226,0.2)' }}>
                <div className={styles.painTitle}>💸 Des devis astronomiques</div>
                <p className={styles.painText}>
                  Vous payez pour leur temps d'apprentissage et leurs lourdeurs internes.
                </p>
              </motion.div>
              <motion.div className={styles.painCard} variants={fadeInUp} whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(138,43,226,0.2)' }}>
                <div className={styles.painTitle}>🐌 Des délais de 4 à 8 semaines</div>
                <p className={styles.painText}>
                  Vous perdez votre avance sur le marché en attendant que ça bouge.
                </p>
              </motion.div>
              <motion.div className={styles.painCard} variants={fadeInUp} whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(138,43,226,0.2)' }}>
                <div className={styles.painTitle}>💥 Des surprises techniques</div>
                <p className={styles.painText}>
                  Le produit final ne correspond pas à vos attentes ou plante au lancement.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              style={{ textAlign: 'center', marginTop: '3rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/good-vibe-coding/audit-sprint" className={styles.ctaButton}>
                Je veux éviter ces pièges →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 3. METHOD SECTION */}
        <section id="method" className={styles.methodSection}>
          <div className={styles.container}>
            <motion.h2
              style={{ textAlign: 'center', fontSize: '2.5rem', color: 'white', marginBottom: '3rem' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              Le Choc de Simplification
            </motion.h2>
            <motion.p
              style={{ textAlign: 'center', color: '#888', marginBottom: '3rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              L'Efficacité du Développeur Senior boosté à l'IA
            </motion.p>
            <motion.div
              className={styles.methodGrid}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className={styles.methodCard} variants={fadeInUp} whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(138,43,226,0.2)' }}>
                <div className={styles.methodTitle}>⚡ Vitesse Radicale</div>
                <p className={styles.methodText}>
                  Ce qui prenait des mois prend désormais des jours grâce au "Vibe Coding".
                </p>
              </motion.div>
              <motion.div className={styles.methodCard} variants={fadeInUp} whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(138,43,226,0.2)' }}>
                <div className={styles.methodTitle}>🛡️ Qualité Senior</div>
                <p className={styles.methodText}>
                  Un code propre, sécurisé et évolutif, supervisé par 15 ans d'expérience.
                </p>
              </motion.div>
              <motion.div className={styles.methodCard} variants={fadeInUp} whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(138,43,226,0.2)' }}>
                <div className={styles.methodTitle}>🤝 Zéro Friction</div>
                <p className={styles.methodText}>
                  Vous parlez business, je m'occupe de la technique. Tout est automatisé.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              style={{ textAlign: 'center', marginTop: '3rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/good-vibe-coding/audit-sprint" className={styles.ctaButton}>
                Démarrer mon projet →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 4. SOLUTIONS / PRICING SECTION */}
        <section id="solutions" className={styles.pricingSection}>
          <div className={styles.container}>
            <motion.h2
              style={{ textAlign: 'center', fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Nos 3 Solutions
            </motion.h2>
            <motion.p
              style={{ textAlign: 'center', color: '#888', marginBottom: '3rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Transparence Totale. Inclus votre Dossier de projet d'une valeur de 5 000 € compris.
            </motion.p>

            <motion.div
              className={styles.pricingTable}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                className={styles.pricingCard}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={styles.pricingHeader}>Site Web Automatisé</div>
                <p className={styles.pricingDesc}>Pour une image de marque forte et une conversion maximale.</p>
                <div className={styles.pricingPrice} ref={el => priceRefs.current[0] = el}>À partir de 2 500 €</div>
                <div className={styles.pricingSupport}>+ 150 € / mois (Support & Maintenance)</div>
                <div className={styles.pricingDelivery}>Livraison : 5 jours</div>
              </motion.div>
              <motion.div
                className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={styles.pricingHeader}>Outil Sur-Mesure et MVP</div>
                <p className={styles.pricingDesc}>Pour créer votre produit (SaaS) ou un outil interne sur-mesure.</p>
                <div className={styles.pricingPrice} ref={el => priceRefs.current[1] = el}>À partir de 4 900 €</div>
                <div className={styles.pricingSupport}>+ 250 € / mois (Support & Maintenance)</div>
                <div className={styles.pricingDelivery}>Livraison : 7-10 jours</div>
              </motion.div>
              <motion.div
                className={styles.pricingCard}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={styles.pricingHeader}>Automatisation Totale</div>
                <p className={styles.pricingDesc}>Pour connecter vos outils et supprimer vos tâches répétitives.</p>
                <div className={styles.pricingPrice}>À partir de 1 500 €</div>
                <div className={styles.pricingSupport}>+ 90 € / mois (Support & Maintenance)</div>
                <div className={styles.pricingDelivery}>Pack sur-mesure • Gain immédiat</div>
              </motion.div>
            </motion.div>
            <motion.div
              style={{ textAlign: 'center', marginTop: '3rem' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/good-vibe-coding/audit-sprint" className={styles.ctaButton}>
                Démarrer mon projet maintenant
              </Link>
              <p className={styles.pricingNote}>
                <strong>Note :</strong> 90% de mes clients choisissent l'abonnement <strong>Sérénité</strong> pour se concentrer sur leur business pendant que je gère la tech.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 4.5 OBSERVABILITY SECTION */}
        <section className={styles.observabilitySection}>
          <div className={styles.container}>
            <div className={styles.observabilityContent}>
              <motion.div
                className={styles.observabilityText}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={styles.observabilityTitle}>
                  Plus qu’un déploiement : une surveillance active 24/7
                </h2>
                <p className={styles.observabilityIntro}>
                  Un site qui tombe ou un formulaire qui bug, c'est du chiffre d'affaires perdu.
                  Toutes mes livraisons incluent une couche d'<strong>Observabilité Senior</strong>.
                </p>

                <div className={styles.observabilityGrid}>
                  <div className={styles.observabilityItem}>
                    <div className={styles.observabilityIcon}>🛡️</div>
                    <div>
                      <h3>Détection proactive</h3>
                      <p>Je suis alerté en temps réel du moindre bug, souvent avant vos utilisateurs.</p>
                    </div>
                  </div>
                  <div className={styles.observabilityItem}>
                    <div className={styles.observabilityIcon}>📈</div>
                    <div>
                      <h3>Monitoring de performance</h3>
                      <p>Votre application reste fluide, même en cas de pic de trafic.</p>
                    </div>
                  </div>
                  <div className={styles.observabilityItem}>
                    <div className={styles.observabilityIcon}>📊</div>
                    <div>
                      <h3>Transparence totale</h3>
                      <p>Vous recevez un rapport mensuel de santé de votre plateforme.</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '3rem' }}>
                  <Link to="/good-vibe-coding/audit-sprint" className={styles.ctaButton}>
                    Sécuriser mon projet maintenant
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className={styles.observabilityVisual}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Visual representing monitoring/dashboard */}
                <div className={styles.monitorFrame}>
                  <div className={styles.monitorHeader}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <span>Active Monitoring v2.0</span>
                  </div>
                  <div className={styles.monitorBody}>
                    <div className={styles.pulseLine}></div>
                    <div className={styles.statsRow}>
                      <div className={styles.statBox}>
                        <span className={styles.statLabel}>Uptime</span>
                        <span className={styles.statValue}>99.9%</span>
                      </div>
                      <div className={styles.statBox}>
                        <span className={styles.statLabel}>Latency</span>
                        <span className={styles.statValue}>124ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. SOCIAL PROOF / TESTIMONIALS */}
        <section className={styles.testimonialsSection}>
          <div className={styles.container}>
            <motion.h2
              style={{ textAlign: 'center', fontSize: '2rem', color: 'white', marginBottom: '3rem' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ils m'ont fait confiance
            </motion.h2>
            <motion.div
              className={styles.testimonialsGrid}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className={styles.testimonialCard} variants={fadeInUp} whileHover={{ y: -5 }}>
                <p className={styles.testimonialText}>"Livraison en 5 jours, qualité irréprochable. Je recommande."</p>
                <div className={styles.testimonialAuthor}>— Startup SaaS, Paris</div>
              </motion.div>
              <motion.div className={styles.testimonialCard} variants={fadeInUp} whileHover={{ y: -5 }}>
                <p className={styles.testimonialText}>"Notre MVP était en ligne avant même la fin du mois. Impressionnant."</p>
                <div className={styles.testimonialAuthor}>— E-commerce, Lyon</div>
              </motion.div>
              <motion.div className={styles.testimonialCard} variants={fadeInUp} whileHover={{ y: -5 }}>
                <p className={styles.testimonialText}>"Enfin un développeur qui comprend le business, pas juste la tech."</p>
                <div className={styles.testimonialAuthor}>— Agence Marketing, Bordeaux</div>
              </motion.div>
            </motion.div>
            <motion.div
              style={{ textAlign: 'center', marginTop: '3rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link to="/good-vibe-coding/audit-sprint" className={styles.ctaButton}>
                Rejoindre les 8 clients propulsés →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 6. HUMAN SECTION */}
        <section className={styles.humanSection} id="about">
          <div className={styles.container}>
            <motion.div
              className={styles.humanGrid}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <div>
                <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '2rem' }}>L'Expert derrière la Vibe</h2>
                <div className={styles.humanQuote}>
                  <p>
                    "Bonjour, je suis <strong>Jonathan Labéjof</strong>.
                    Après 15 ans à coder pour des grands comptes et des startups, j'ai vu trop de projets s'enliser dans des réunions inutiles.<br /><br />
                    J'ai créé <strong>Good Vibe Coding</strong> pour redonner du plaisir à la création : je code à la vitesse de votre pensée. Vous n'engagez pas une agence de 20 personnes, vous engagez un partenaire qui exécute en temps réel."
                  </p>
                </div>
              </div>
              <motion.div
                className={styles.profileImageContainer}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img src={useBaseUrl('/img/photo.png')} className={styles.profileImage} alt="Expert Profile" />
              </motion.div>
            </motion.div>
            <motion.div
              style={{ textAlign: 'center', marginTop: '3rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link to="/good-vibe-coding/audit-sprint" className={styles.ctaButton}>
                Discutons de votre projet →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 7. PROCESS SECTION */}
        <section className={styles.processSection} id="process">
          <div className={styles.container}>
            <motion.h2
              style={{ textAlign: 'center', fontSize: '2.5rem', color: 'white' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Votre projet livré en 7 jours !
            </motion.h2>
            <motion.div
              className={styles.processGrid}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                { num: '1', title: 'Le Quiz', time: '5 minutes', desc: 'pour qualifier votre besoin.' },
                { num: '2', title: 'Le Diagnostic', time: '15 minutes', desc: <>pour obtenir votre Dossier de Projet <strike>à 5000€</strike> gratuitement.</> },
                { num: '3', title: "L'Appel Flash", time: '1 heure', desc: 'pour valider les détails et voir votre première démo.' },
                { num: '4', title: 'Le Sprint', time: '7 jours', desc: 'pour développer et automatiser avec un suivi continu.' }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className={styles.processStep}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                >
                  <div className={styles.processIcon}>{step.num}</div>
                  <div className={styles.processTitle}>{step.title}</div>
                  <div className={styles.processTime}>{step.time}</div>
                  <div className={styles.processDesc}>{step.desc}</div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              style={{ textAlign: 'center', marginTop: '3rem' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/good-vibe-coding/audit-sprint" className={styles.ctaButton}>
                Démarrer mon projet →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 7.5 SUPPORT & SERENITY SECTION */}
        <section className={styles.supportSection} id="support">
          <div className={styles.container}>
            <div className={styles.supportHeader}>
              <motion.h2
                style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1.5rem' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Je ne vous livre pas un code, je garantis votre croissance
              </motion.h2>
              <motion.p
                style={{ fontSize: '1.2rem', color: '#888', maxWidth: '800px', margin: '0 auto 4rem' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Le développement n'est que la première étape.<br />Pour que votre projet survive au succès, il a besoin d'une surveillance d'expert.
              </motion.p>
            </div>

            <motion.div
              className={styles.supportGrid}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                {
                  title: 'Surveillance Active (Observabilité)',
                  desc: 'Mon système m\'alerte au moindre bug. J\'interviens souvent avant même que vous ne le remarquiez.',
                  icon: '🛡️'
                },
                {
                  title: 'Évolutions "Vibe"',
                  desc: 'Besoin d\'un nouveau bouton, d\'un champ en plus ou d\'une modification mineure ? C\'est inclus et traité en moins de 24h.',
                  icon: '⚡'
                },
                {
                  title: 'Hébergement & Sécurité',
                  desc: 'Gestion des serveurs, sauvegardes quotidiennes et mises à jour de sécurité. Vous n\'avez aucune technique à gérer.',
                  icon: '☁️'
                }
              ].map((item, i) => (
                <motion.div key={i} className={styles.supportCard} variants={fadeInUp} whileHover={{ y: -5 }}>
                  <div className={styles.supportIcon}>{item.icon}</div>
                  <h3 className={styles.supportCardTitle}>{item.title}</h3>
                  <p className={styles.supportDesc}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              style={{ textAlign: 'center', marginTop: '4rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link to="/good-vibe-coding/audit-sprint" className={styles.ctaButton}>
                Choisir la Sérénité Technique
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 8. FAQ SECTION */}
        <section className={styles.faqSection} id="faq">
          <div className={styles.container}>
            <motion.h2
              style={{ textAlign: 'center', fontSize: '2.5rem', color: 'white', marginBottom: '3rem' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              FAQ
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { q: 'Pourquoi est-ce si rapide ?', a: 'J\'utilise une méthode hybride (Vibe Coding) qui décuple ma vitesse de production sans sacrifier la rigueur architecturale.' },
                { q: 'C\'est du "No-Code" ?', a: 'Non. C\'est du vrai code, robuste et dont vous êtes propriétaire à 100%.' },
                { q: 'Et après la livraison ?', a: 'Je propose un forfait de maintenance et hébergement pour que vous n\'ayez jamais à gérer un serveur.' }
              ].map((faq, i) => (
                <motion.div key={i} className={styles.faqItem} variants={fadeInUp}>
                  <div className={styles.faqQuestion}>{faq.q}</div>
                  <div className={styles.faqAnswer}>{faq.a}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              style={{ textAlign: 'center', marginTop: '4rem' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 style={{ color: 'white', marginBottom: '2rem' }}>Prêt à passer à la vitesse supérieure ?</h3>
              <Link to="/good-vibe-coding/audit-sprint" className={styles.ctaButton} style={{ fontSize: '1.3rem', padding: '1.2rem 3rem' }}>
                🚀 Obtenir mon Dossier de Projet <strike>pour 5000€</strike> gratuitement<br />et passer à l'action !
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
    </Layout>
  );
}

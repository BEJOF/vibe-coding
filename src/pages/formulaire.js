import React, { useState } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './offre.module.css';

export default function Formulaire() {
    const [formData, setFormData] = useState({
        budget: '',
        timeline: '',
        scope: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent("Demande de Projet Vibe Coding");
        const body = encodeURIComponent(
            `Bonjour,\n\nVoici les détails de mon projet :\n\n` +
            `1. Type & Budget : ${formData.budget}\n` +
            `2. Délai : ${formData.timeline}\n` +
            `3. Scope Critique : ${formData.scope}\n\n` +
            `Merci de me recontacter.`
        );
        window.location.href = `mailto:contact@vibecoding.com?subject=${subject}&body=${body}`;
    };

    return (
        <Layout title="Formulaire de Qualification" description="Parlez-nous de votre projet">
            <header className={clsx('hero-section', styles.sectionDark)} style={{ padding: '4rem 0' }}>
                <div className="container">
                    <h1 className="hero__title">
                        Votre Projet Commence <span className="highlight">Ici</span>
                    </h1>
                    <p className="hero__subtitle" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                        Répondez à ces 3 questions pour vérifier si nous sommes faits pour travailler ensemble.
                    </p>
                </div>
            </header>

            <main className={clsx('section', styles.sectionLight)}>
                <div className={styles.container} style={{ maxWidth: '800px' }}>

                    <form onSubmit={handleSubmit} style={{ background: 'var(--vibe-card-bg)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--vibe-border-color)' }}>

                        {/* Question 1 */}
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ borderLeft: '4px solid #8A2BE2', paddingLeft: '1rem', marginBottom: '1rem' }}>
                                ❓ Question 1 : Quel est le type de projet principal et quel est le budget envisagé ?
                            </h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem' }}>
                                Cette question sert à catégoriser le besoin et vérifier l'alignement budgétaire.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="radio" name="budget" value="Landing Page / Site Vitrine (2k-5k€)" required onChange={handleChange} />
                                    <span><strong>Option A :</strong> Landing Page / Site Vitrine (Budget de 2 500 € à 5 000 €)</span>
                                </label>
                                <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="radio" name="budget" value="Dashboard / Micro-CRM (4.5k-10k€)" required onChange={handleChange} />
                                    <span><strong>Option B :</strong> Dashboard de Gestion / Micro-CRM (Budget de 4 500 € à 10 000 €)</span>
                                </label>
                                <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="radio" name="budget" value="Prototype / MVP Spécifique (>10k€)" required onChange={handleChange} />
                                    <span><strong>Option C :</strong> Prototype ou MVP Technique Spécifique (Budget supérieur à 10 000 €)</span>
                                </label>
                                <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="radio" name="budget" value="Hors Budget / Autre" required onChange={handleChange} />
                                    <span><strong>Option D :</strong> Mon projet est hors de ces fourchettes budgétaires.</span>
                                </label>
                            </div>
                        </div>

                        {/* Question 2 */}
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ borderLeft: '4px solid #8A2BE2', paddingLeft: '1rem', marginBottom: '1rem' }}>
                                ❓ Question 2 : Dans quel délai idéal souhaitez-vous que la première version (MVP) soit fonctionnelle et livrée ?
                            </h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem' }}>
                                Votre avantage est la rapidité. Validez si vous êtes prêt à vous engager rapidement.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="radio" name="timeline" value="Urgent (< 2 semaines)" required onChange={handleChange} />
                                    <span><strong>Option A :</strong> Le plus rapidement possible (Moins de 2 semaines)</span>
                                </label>
                                <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="radio" name="timeline" value="Standard (3-4 semaines)" required onChange={handleChange} />
                                    <span><strong>Option B :</strong> Dans le mois (3 à 4 semaines)</span>
                                </label>
                                <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="radio" name="timeline" value="Long terme (> 1 mois)" required onChange={handleChange} />
                                    <span><strong>Option C :</strong> J'ai un projet à long terme (Plus d'un mois)</span>
                                </label>
                            </div>
                        </div>

                        {/* Question 3 */}
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ borderLeft: '4px solid #8A2BE2', paddingLeft: '1rem', marginBottom: '1rem' }}>
                                ❓ Question 3 : En une ou deux phrases, décrivez la <strong>seule fonctionnalité la plus critique</strong> qui, si elle était livrée, débloquerait immédiatement votre activité.
                            </h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem' }}>
                                C'est la question la plus importante pour préparer votre Atelier de Définition Express et évaluer l'effort de développement.
                            </p>
                            <textarea
                                name="scope"
                                rows="4"
                                required
                                onChange={handleChange}
                                placeholder="Exemple : Je dois pouvoir enregistrer et filtrer mes 5 types de clients, générer des factures PDF..."
                                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                            />
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <button type="submit" className="vibe-button pulse" style={{ border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                                🚀 Envoyer ma demande
                            </button>
                        </div>

                    </form>
                </div>
            </main>
        </Layout>
    );
}

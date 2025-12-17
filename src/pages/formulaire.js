import React, { useState } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './formulaire.module.css';
import commonStyles from './offre.module.css'; // Reusing hero/section styles

export default function Formulaire() {
    const [formData, setFormData] = useState({
        budget: '',
        timeline: '',
        scope: '',
        name: '', // Added name for completeness
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleBudgetSelect = (value) => {
        setFormData(prevState => ({ ...prevState, budget: value }));
    };

    const handleTimelineSelect = (value) => {
        setFormData(prevState => ({ ...prevState, timeline: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Demande Projet Vibe: ${formData.budget}`);
        const body = encodeURIComponent(
            `Bonjour,\n\nVoici mon projet :\n\n` +
            `--- PROJET ---\n` +
            `💰 Budget : ${formData.budget}\n` +
            `⏱ Délai : ${formData.timeline}\n` +
            `🎯 Scope Critique : ${formData.scope}\n\n` +
            `--- CONTACT ---\n` +
            `Nom : ${formData.name}\n` +
            `Email : ${formData.email}\n` +
            `Tél : ${formData.phone}\n`
        );
        window.location.href = `mailto:contact@vibecoding.com?subject=${subject}&body=${body}`;
    };

    return (
        <Layout title="Formulaire de Qualification" description="Parlez-nous de votre projet">
            <header className={clsx(commonStyles.sectionDark)} style={{ padding: '6rem 0 4rem' }}>
                <div className="container">
                    <h1 className="hero__title" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        Démarrons Votre Projet <span className="highlight">Sur de Bonnes Bases</span>
                    </h1>
                    <p className="hero__subtitle" style={{ fontSize: '1.2rem', opacity: 0.8, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                        3 minutes pour définir votre besoin.
                        <br />
                        Je vous réponds sous 24h avec une faisabilité et une estimation.
                    </p>
                </div>
            </header>

            <main className={clsx(commonStyles.sectionLight)}>
                <div className="container">
                    <form onSubmit={handleSubmit} className={styles.formContainer}>

                        {/* Q1: Budget */}
                        <div className={styles.questionBlock}>
                            <div className={styles.questionHeader}>
                                <div className={styles.questionNumber}>1</div>
                                <h3 className={styles.questionTitle}>Quel est le type de projet principal et le budget ?</h3>
                            </div>
                            <p className={styles.helperText}>Pour s'assurer que je peux vous apporter un maximum de valeur dans votre budget.</p>

                            <div className={styles.radioGroup}>
                                <RadioCard
                                    name="budget"
                                    value="Landing Page / Site Vitrine (2.5k€ - 5k€)"
                                    label="Option A"
                                    description="Landing Page / Site Vitrine (2 500 € à 5 000 €)"
                                    selected={formData.budget}
                                    onChange={handleBudgetSelect}
                                />
                                <RadioCard
                                    name="budget"
                                    value="Dashboard / Micro-CRM (4.5k€ - 10k€)"
                                    label="Option B"
                                    description="Dashboard de Gestion / Micro-CRM (4 500 € à 10 000 €)"
                                    selected={formData.budget}
                                    onChange={handleBudgetSelect}
                                />
                                <RadioCard
                                    name="budget"
                                    value="MVP Spécifique (> 10k€)"
                                    label="Option C"
                                    description="Prototype ou MVP Technique Spécifique (> 10 000 €)"
                                    selected={formData.budget}
                                    onChange={handleBudgetSelect}
                                />
                                <RadioCard
                                    name="budget"
                                    value="Hors Budget"
                                    label="Option D"
                                    description="Mon projet est hors de ces fourchettes."
                                    selected={formData.budget}
                                    onChange={handleBudgetSelect}
                                />
                            </div>
                        </div>

                        {/* Q2: Timeline */}
                        <div className={styles.questionBlock}>
                            <div className={styles.questionHeader}>
                                <div className={styles.questionNumber}>2</div>
                                <h3 className={styles.questionTitle}>Délai souhaité pour la v1 (MVP) ?</h3>
                            </div>
                            <p className={styles.helperText}>La vitesse est ma spécialité. Validez votre urgence.</p>

                            <div className={styles.radioGroup}>
                                <RadioCard
                                    name="timeline"
                                    value="Urgent (< 2 semaines)"
                                    label="Option A"
                                    description="Urgent : Le plus rapidement possible (Moins de 2 semaines)"
                                    selected={formData.timeline}
                                    onChange={handleTimelineSelect}
                                />
                                <RadioCard
                                    name="timeline"
                                    value="Standard (3-4 semaines)"
                                    label="Option B"
                                    description="Standard : Dans le mois (3 à 4 semaines)"
                                    selected={formData.timeline}
                                    onChange={handleTimelineSelect}
                                />
                                <RadioCard
                                    name="timeline"
                                    value="Long terme (> 1 mois)"
                                    label="Option C"
                                    description="Long terme : J'ai le temps (Plus d'un mois)"
                                    selected={formData.timeline}
                                    onChange={handleTimelineSelect}
                                />
                            </div>
                        </div>

                        {/* Q3: Scope */}
                        <div className={styles.questionBlock}>
                            <div className={styles.questionHeader}>
                                <div className={styles.questionNumber}>3</div>
                                <h3 className={styles.questionTitle}>La fonctionnalité "Killer" 🎯</h3>
                            </div>
                            <p className={styles.helperText}>
                                Décrivez <strong>LA</strong> fonctionnalité critique qui débloquerait votre activité immédiatement si elle était livrée.
                            </p>
                            <textarea
                                name="scope"
                                className={styles.textarea}
                                required
                                value={formData.scope}
                                onChange={handleChange}
                                placeholder="Ex: Je dois pouvoir importer mes clients CSV et générer des factures PDF en un clic..."
                            />
                        </div>

                        {/* Contact Section - Moved to Bottom for better UX */}
                        <div className={styles.questionBlock} style={{ borderTop: '1px solid var(--vibe-border-color)', paddingTop: '2rem' }}>
                            <div className={styles.questionHeader}>
                                <div className={styles.questionNumber}>4</div>
                                <h3 className={styles.questionTitle}>Vos Coordonnées</h3>
                            </div>
                            <p className={styles.helperText}>Pour vous envoyer l'analyse de faisabilité.</p>

                            <div className={styles.contactGrid}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Votre Nom (Requis)</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className={styles.inputField}
                                        placeholder="Jean Dupont"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div /> {/* Spacer or extra field */}

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email (Requis)</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className={styles.inputField}
                                        placeholder="votre@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Téléphone (Requis)</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className={styles.inputField}
                                        placeholder="06 13 38 56 XX"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <button type="submit" className={styles.submitButton}>
                                🚀 Obtenir mon Estimation
                            </button>
                            <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.6 }}>
                                Réponse garantie sous 24h ouvrées. Pas de spam.
                            </p>
                        </div>

                    </form>
                </div>
            </main>
        </Layout>
    );
}

// Helper Component for Radio Cards
function RadioCard({ name, value, label, description, selected, onChange }) {
    const isSelected = selected === value;
    return (
        <div
            className={clsx(styles.radioLabel, isSelected && styles.radioLabelSelected)}
            onClick={() => onChange(value)}
        >
            <input
                type="radio"
                name={name}
                value={value}
                checked={isSelected}
                onChange={() => { }} // Handled by div click
                className={styles.radioInput}
            />
            <div className={styles.radioText}>
                <strong>{label} :</strong> {description.replace(new RegExp(`^${label} : `), '')}
            </div>
        </div>
    );
}

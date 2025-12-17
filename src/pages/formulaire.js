import React, { useState } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './formulaire.module.css';
import commonStyles from './offre.module.css';

export default function Formulaire() {
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const [formData, setFormData] = useState({
        budget: '',
        timeline: '',
        scope: '',
        name: '',
        email: '',
        phone: ''
    });

    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Auto-advance logic for Radio selections
    const handleSelection = (name, value) => {
        setFormData(prevState => ({ ...prevState, [name]: value }));
        // Small delay for visual feedback before auto-advancing
        setTimeout(() => {
            if (step < totalSteps) {
                setStep(prev => prev + 1);
            }
        }, 500);
    };

    const handleNext = () => {
        // Validation per step
        if (step === 1 && !formData.budget) return alert("Veuillez sélectionner une option.");
        if (step === 2 && !formData.timeline) return alert("Veuillez sélectionner un délai.");
        if (step === 3 && !formData.scope) return alert("Veuillez décrire votre projet.");

        if (step < totalSteps) {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone) {
            return alert("Veuillez remplir tous les champs de contact.");
        }

        setStatus('submitting');

        const scriptURL = 'https://script.google.com/macros/s/AKfycbyZJOO5RQwbmspI5s1pOjpFPqBeQBhJeRBlAj8gsOWT_jYFdv5p0eBW2N3NkM-Euq-fmA/exec';

        const dataToSend = {
            budget: formData.budget,
            timeline: formData.timeline,
            scope: formData.scope,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
        };

        try {
            await fetch(scriptURL, { method: 'POST', body: JSON.stringify(dataToSend), headers: { 'Content-Type': 'application/json' }, mode: 'no-cors' });
            setStatus('success');
        } catch (error) {
            console.error('Error!', error.message);
            setStatus('error');
        }
    };

    const progressPercentage = (step / totalSteps) * 100;

    if (status === 'success') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return (
            <Layout title="Candidature Envoyée">
                <main className={clsx(commonStyles.sectionDark)} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className={styles.formContainer} style={{ textAlign: 'center', padding: '4rem' }}>
                        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
                        <h2 className={styles.questionTitle} style={{ marginBottom: '1rem', color: 'white' }}>Demande Reçue !</h2>
                        <p style={{ opacity: 0.8, fontSize: '1.2rem', marginBottom: '2rem' }}>
                            Merci {formData.name}, votre projet est entre de bonnes mains. Je reviens vers vous sous 24h avec une estimation précise.
                        </p>
                        <a href="/good-vibe-coding/" className={styles.nextButton} style={{ margin: '0 auto', display: 'inline-flex', background: 'white', color: 'black' }}>
                            Retour au site
                        </a>
                    </div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout title="Formulaire de Qualification">
            <header className={clsx(commonStyles.sectionDark)} style={{ padding: '4rem 0 2rem' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 className="hero__title" style={{ fontSize: '2.5rem' }}>Parlez-nous de <span className="highlight">Votre Projet</span></h1>
                    <p className="hero__subtitle" style={{ fontSize: '1.2rem', opacity: 0.8, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                        3 minutes pour définir votre besoin.
                        <br />
                        Je vous réponds sous 24h avec une faisabilité et une estimation.
                    </p>
                </div>
            </header>

            <main className={clsx(commonStyles.sectionLight)} style={{ paddingBottom: '4rem' }}>
                <div className="container">
                    <div className={styles.formContainer}>

                        {/* Progress Bar */}
                        <div className={styles.progressContainer}>
                            <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
                        </div>

                        {/* STEP 1: BUDGET */}
                        {step === 1 && (
                            <div className={styles.stepBlock}>
                                <div className={styles.questionHeader}>
                                    <span className={styles.questionTag}>Étape 1/4 : Budget</span>
                                    <h2 className={styles.questionTitle}>Quel est votre budget alloué ?</h2>
                                    <p className={styles.helperText}>Ceci permet d'adapter la solution technique à votre réalité.</p>
                                </div>
                                <div className={styles.radioGroup}>
                                    <RadioCard
                                        label="Landing Page / Vitrine"
                                        desc="2 500 € - 5 000 €"
                                        value="Landing Page (2.5k-5k)"
                                        selected={formData.budget}
                                        onSelect={(val) => handleSelection('budget', val)}
                                    />
                                    <RadioCard
                                        label="SaaS / Dashboard"
                                        desc="4 500 € - 10 000 €"
                                        value="SaaS/Dashboard (4.5k-10k)"
                                        selected={formData.budget}
                                        onSelect={(val) => handleSelection('budget', val)}
                                    />
                                    <RadioCard
                                        label="MVP Complexe"
                                        desc="+ 10 000 €"
                                        value="MVP Complexe (>10k)"
                                        selected={formData.budget}
                                        onSelect={(val) => handleSelection('budget', val)}
                                    />
                                    <RadioCard
                                        label="Hors Budget / Autre"
                                        desc="Je ne sais pas encore"
                                        value="Hors Budget /Autre"
                                        selected={formData.budget}
                                        onSelect={(val) => handleSelection('budget', val)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* STEP 2: TIMELINE */}
                        {step === 2 && (
                            <div className={styles.stepBlock}>
                                <div className={styles.questionHeader}>
                                    <span className={styles.questionTag}>Étape 2/4 : Délai</span>
                                    <h2 className={styles.questionTitle}>Quelle est votre urgence ?</h2>
                                    <p className={styles.helperText}>La vitesse d'exécution est ma marque de fabrique.</p>
                                </div>
                                <div className={styles.radioGroup}>
                                    <RadioCard
                                        label="Urgent"
                                        desc="Moins de 2 semaines"
                                        value="Urgent (< 2 sem)"
                                        selected={formData.timeline}
                                        onSelect={(val) => handleSelection('timeline', val)}
                                    />
                                    <RadioCard
                                        label="Standard"
                                        desc="Sous 1 mois"
                                        value="Standard (1 mois)"
                                        selected={formData.timeline}
                                        onSelect={(val) => handleSelection('timeline', val)}
                                    />
                                    <RadioCard
                                        label="Confortable"
                                        desc="Plus d'1 mois"
                                        value="Long terme (> 1 mois)"
                                        selected={formData.timeline}
                                        onSelect={(val) => handleSelection('timeline', val)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* STEP 3: SCOPE */}
                        {step === 3 && (
                            <div className={styles.stepBlock}>
                                <div className={styles.questionHeader}>
                                    <span className={styles.questionTag}>Étape 3/4 : Scope</span>
                                    <h2 className={styles.questionTitle}>La fonctionnalité "Killer" 🎯</h2>
                                    <p className={styles.helperText}>Décrivez LA fonctionnalité indispensable qui justifie ce projet.</p>
                                </div>
                                <textarea
                                    name="scope"
                                    className={styles.textarea}
                                    placeholder="Ex: Je veux que mes clients puissent générer des devis PDF automatiquement..."
                                    value={formData.scope}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </div>
                        )}

                        {/* STEP 4: CONTACT */}
                        {step === 4 && (
                            <div className={styles.stepBlock}>
                                <div className={styles.questionHeader}>
                                    <span className={styles.questionTag}>Étape finale</span>
                                    <h2 className={styles.questionTitle}>On y est presque !</h2>
                                    <p className={styles.helperText}>Où dois-je envoyer l'estimation de faisabilité ?</p>
                                </div>
                                <div className={styles.contactGrid}>
                                    <div>
                                        <label style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Votre Nom Complet</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className={styles.inputField}
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Email Professionnel</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={styles.inputField}
                                            placeholder="john@entreprise.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Téléphone Mobile</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className={styles.inputField}
                                            placeholder="06 12 34 56 78"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className={styles.navContainer}>
                            {step > 1 ? (
                                <button type="button" onClick={handleBack} className={styles.backButton}>
                                    ← Retour
                                </button>
                            ) : <div></div>}

                            {step < totalSteps && (
                                <button type="button" onClick={handleNext} className={styles.nextButton}>
                                    Suivant →
                                </button>
                            )}

                            {step === totalSteps && (
                                <button
                                    onClick={handleSubmit}
                                    disabled={status === 'submitting'}
                                    className={clsx(styles.nextButton, styles.finalSubmitButton)}
                                >
                                    {status === 'submitting' ? 'Envoi...' : '🚀 Recevoir mon estimation'}
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </main>
        </Layout>
    );
}

function RadioCard({ label, desc, value, selected, onSelect }) {
    const [isClicked, setIsClicked] = useState(false);
    const isSelected = selected === value;

    const handleClick = () => {
        // Trigger animation
        setIsClicked(true);

        // Call the onSelect handler
        onSelect(value);

        // Remove animation class after animation completes
        setTimeout(() => {
            setIsClicked(false);
        }, 500);
    };

    return (
        <div
            className={clsx(
                styles.radioLabel,
                isSelected && styles.radioLabelSelected,
                isClicked && styles.radioLabelClicked
            )}
            onClick={handleClick}
        >
            <div className={styles.radioInput} style={{
                borderRadius: '50%', border: '2px solid #555',
                background: isSelected ? '#8A2BE2' : 'transparent',
                borderColor: isSelected ? '#8A2BE2' : '#555',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {isSelected && <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></div>}
            </div>
            <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{label}</div>
                <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>{desc}</div>
            </div>
        </div>
    );
}


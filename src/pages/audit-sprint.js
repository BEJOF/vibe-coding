import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import styles from './audit-sprint.module.css';
import commonStyles from './offre.module.css';

// Animation variants
const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
};

export default function AuditSprint() {
    const [step, setStep] = useState(1);
    const totalSteps = 4;
    const aiPulseRef = useRef(null);

    const [formData, setFormData] = useState({
        // Step 1: Identité
        projectName: '',
        goal: '',
        projectType: '',
        // Step 2: Périmètre
        features: '',
        designStatus: '',
        tools: [],
        toolsOther: '',
        complexDb: '',
        // Step 3: Business
        budget: '',
        deadline: '',
        // Step 4: Validation
        whyVibe: '',
        // Contact
        name: '',
        phone: '',
        email: ''
    });

    const [status, setStatus] = useState('idle');
    const [analysisStep, setAnalysisStep] = useState(0);
    const [error, setError] = useState('');

    // Refs for focus management
    const projectNameRef = useRef(null);
    const goalRef = useRef(null);
    const featuresRef = useRef(null);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);

    // Auto-focus first field when step changes
    useEffect(() => {
        setError(''); // Clear error on step change
        const timer = setTimeout(() => {
            if (step === 1 && projectNameRef.current) projectNameRef.current.focus();
            if (step === 2 && featuresRef.current) featuresRef.current.focus();
            if (step === 4 && nameRef.current) nameRef.current.focus();
        }, 300);
        return () => clearTimeout(timer);
    }, [step]);

    // GSAP AI Pulse Animation
    useEffect(() => {
        if (status === 'analyzing' && aiPulseRef.current) {
            gsap.to(aiPulseRef.current, {
                scale: 1.2,
                duration: 0.6,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut'
            });
        }
    }, [status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        setError('');
    };

    const handleCheckboxChange = (tool) => {
        setFormData(prevState => {
            const tools = prevState.tools.includes(tool)
                ? prevState.tools.filter(t => t !== tool)
                : [...prevState.tools, tool];
            return { ...prevState, tools };
        });
        setError('');
    };

    const handleSelection = (name, value) => {
        setFormData(prevState => ({ ...prevState, [name]: value }));
        setError('');
    };

    const handleNext = () => {
        // Validation per step with inline error messages and focus
        if (step === 1) {
            if (!formData.projectName) {
                setError("Veuillez renseigner le nom du projet.");
                projectNameRef.current?.focus();
                return;
            }
            if (!formData.goal) {
                setError("Veuillez renseigner l'objectif principal.");
                goalRef.current?.focus();
                return;
            }
            if (!formData.projectType) {
                setError("Veuillez sélectionner le type de solution.");
                return;
            }
        }
        if (step === 2) {
            if (!formData.features) {
                setError("Veuillez renseigner les fonctionnalités.");
                featuresRef.current?.focus();
                return;
            }
            if (!formData.designStatus) {
                setError("Veuillez sélectionner l'état du design.");
                return;
            }
        }
        if (step === 3) {
            if (!formData.budget) {
                setError("Veuillez sélectionner votre budget.");
                return;
            }
            if (!formData.deadline) {
                setError("Veuillez sélectionner votre échéance.");
                return;
            }
        }
        if (step === 4) {
            if (!formData.name) {
                setError("Veuillez renseigner votre nom.");
                nameRef.current?.focus();
                return;
            }
            if (!formData.phone) {
                setError("Veuillez renseigner votre téléphone.");
                phoneRef.current?.focus();
                return;
            }
            if (!formData.email) {
                setError("Veuillez renseigner votre email.");
                emailRef.current?.focus();
                return;
            }
        }

        setError(''); // Clear error on successful validation
        if (step < totalSteps) {
            setStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setStatus('analyzing');

        // Google Apps Script endpoint (same as formulaire)
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyZJOO5RQwbmspI5s1pOjpFPqBeQBhJeRBlAj8gsOWT_jYFdv5p0eBW2N3NkM-Euq-fmA/exec';

        const dataToSend = {
            source: 'audit-sprint',
            projectName: formData.projectName,
            goal: formData.goal,
            projectType: formData.projectType,
            features: formData.features,
            designStatus: formData.designStatus,
            tools: formData.tools.join(', '),
            toolsOther: formData.toolsOther,
            budget: formData.budget,
            deadline: formData.deadline,
            whyVibe: formData.whyVibe,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            timestamp: new Date().toISOString()
        };

        // Send data to Google Sheet (fire and forget with no-cors)
        try {
            fetch(scriptURL, {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: { 'Content-Type': 'application/json' },
                mode: 'no-cors'
            });
        } catch (error) {
            console.error('Error sending to Google Sheet:', error);
        }

        // Continue with animated analysis steps
        const delays = [1500, 3000, 4500];
        delays.forEach((delay, index) => {
            setTimeout(() => setAnalysisStep(index + 1), delay);
        });
        setTimeout(() => setStatus('completed'), 6000);
    };

    const progressPercentage = (step / totalSteps) * 100;

    // AI Analysis End Screen
    if (status === 'analyzing' || status === 'completed') {
        const analysisTexts = [
            `Analyse du contexte pour ${formData.projectName || 'votre projet'}...`,
            "Détection des fonctionnalités clés et complexité...",
            "Calcul de la timeline optimale (Vibe Logic)...",
            "Génération du PRD en cours..."
        ];

        const isEligible = formData.budget !== '<2.5k';

        return (
            <Layout title="Analyse en cours" noFooter>
                <div className={styles.fullPageContainer} style={{ justifyContent: 'center' }}>
                    <motion.div
                        className={styles.formContainer}
                        style={{ width: '100%', maxWidth: '600px', border: 'none' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.aiContainer}>
                            <AnimatePresence mode="wait">
                                {status === 'analyzing' ? (
                                    <motion.div
                                        key="analyzing"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div ref={aiPulseRef} className={styles.aiPulse}>🤖</div>
                                        <motion.h2
                                            className={styles.aiText}
                                            key={analysisStep}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{ minHeight: '3em' }}
                                        >
                                            {analysisTexts[Math.min(analysisStep, analysisTexts.length - 1)]}
                                        </motion.h2>
                                        <p style={{ opacity: 0.7 }}>Veuillez ne pas fermer cette page.</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="completed"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: 'spring', damping: 15 }}
                                    >
                                        <motion.div
                                            style={{ fontSize: '5rem', marginBottom: '1rem' }}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.2 }}
                                        >
                                            {isEligible ? '🎉' : '🎓'}
                                        </motion.div>
                                        <h2 className={styles.questionTitle} style={{ marginBottom: '1rem', color: 'white' }}>
                                            {isEligible
                                                ? "Analyse terminée : Projet Compatible."
                                                : "Budget identifié : Phase d'Amorçage."}
                                        </h2>
                                        <p style={{ opacity: 0.8, fontSize: '1.2rem', marginBottom: '2rem' }}>
                                            {isEligible
                                                ? "Votre PRD a été généré. Compte tenu du scope, nous pouvons lancer un Sprint."
                                                : "Votre budget semble serré pour un Sprint Vibe complet, mais votre idée est excellente."}
                                        </p>

                                        {isEligible ? (
                                            <motion.div
                                                style={{ padding: '2rem', borderRadius: '12px', border: '1px solid #8A2BE2' }}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <p style={{ marginBottom: '1.5rem' }}><strong>Étape suivante :</strong> Validez les détails techniques en 15 min.</p>
                                                <motion.a
                                                    href="https://calendly.com/goodvibecoding/15min"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={styles.nextButton}
                                                    style={{ display: 'inline-flex', background: '#8A2BE2', color: 'white', border: 'none' }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Réserver mon Appel Flash
                                                </motion.a>
                                                <p style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.6 }}>Votre PRD vous a été envoyé par email.</p>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '12px', border: '1px solid #555' }}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <p style={{ marginBottom: '1.5rem', color: '#fff' }}>Rejoignez l'Académie Good Vibe pour apprendre à lancer ce projet vous-même ou attendez la prochaine session "Starter".</p>
                                                <motion.button
                                                    className={styles.nextButton}
                                                    style={{ background: 'white', color: 'black' }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Rejoindre la liste d'attente
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Qualification Vibe" noFooter>
            <div className={styles.fullPageContainer}>
                <div className="container" style={{ paddingTop: '4rem' }}>
                    <motion.div
                        className={styles.formContainer}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <motion.h1
                                style={{ fontSize: '2rem', fontWeight: 800 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                Parlez-nous de <span style={{ color: '#8A2BE2' }}>Votre projet</span>
                            </motion.h1>
                            <p className="hero__subtitle" style={{ fontSize: '1.2rem', opacity: 0.8, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                                Vérifiez votre éligibilité en 5 minutes <br /> et obtenez votre Dossier de Projet <strike>d'une valeur de 5000 €</strike> gratuitement.
                                {/* <br />
                                Je vous réponds sous 24h avec une faisabilité et une estimation. */}
                            </p>
                        </div>

                        {/* Animated Progress Bar */}
                        <div className={styles.progressContainer}>
                            <motion.div
                                className={styles.progressBar}
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {/* STEP 1: IDENTITÉ */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    className={styles.stepBlock}
                                    variants={pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div className={styles.questionHeader} variants={fadeInUp} initial="hidden" animate="visible">
                                        <span className={styles.questionTag}>Étape 1/4 : L'Identité</span>
                                        <h2 className={styles.questionTitle}>Quel est le nom de votre projet/entreprise ?</h2>
                                    </motion.div>
                                    <motion.div
                                        className={styles.inputWrapper}
                                        style={{ marginBottom: '2rem' }}
                                        variants={fadeInUp}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.1 }}
                                    >
                                        <input
                                            ref={projectNameRef}
                                            type="text"
                                            name="projectName"
                                            className={styles.inputField}
                                            placeholder="Ex: VibeFlow, Agence Alpha..."
                                            value={formData.projectName}
                                            onChange={handleChange}
                                        />
                                    </motion.div>

                                    <motion.div className={styles.questionHeader} variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                                        <h2 className={styles.questionTitle} style={{ fontSize: '1.4rem' }}>En une phrase, quel est l'objectif principal ?</h2>
                                        <p className={styles.helperText}>Ex: Automatiser ma facturation, créer un réseau social de niche...</p>
                                    </motion.div>
                                    <motion.div
                                        className={styles.inputWrapper}
                                        style={{ marginBottom: '2rem' }}
                                        variants={fadeInUp}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.3 }}
                                    >
                                        <input
                                            ref={goalRef}
                                            type="text"
                                            name="goal"
                                            className={styles.inputField}
                                            placeholder="Objectif principal..."
                                            value={formData.goal}
                                            onChange={handleChange}
                                        />
                                    </motion.div>

                                    <motion.div className={styles.questionHeader} variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                                        <h2 className={styles.questionTitle} style={{ fontSize: '1.4rem' }}>Quel est le type de solution souhaité ?</h2>
                                    </motion.div>
                                    <motion.div
                                        className={styles.radioGroup}
                                        variants={staggerContainer}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <RadioCard label="Site Web / Landing" desc="Vitrine pour convertir." value="Website" selected={formData.projectType} onSelect={(val) => handleSelection('projectType', val)} />
                                        <RadioCard label="App Métier / SaaS" desc="Dashboard, Espace Client..." value="WebApp" selected={formData.projectType} onSelect={(val) => handleSelection('projectType', val)} />
                                        <RadioCard label="Automatisation" desc="Connecter des outils (Make/n8n)." value="Automation" selected={formData.projectType} onSelect={(val) => handleSelection('projectType', val)} />
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* STEP 2: PÉRIMÈTRE */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    className={styles.stepBlock}
                                    variants={pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div className={styles.questionHeader} variants={fadeInUp} initial="hidden" animate="visible">
                                        <span className={styles.questionTag}>Étape 2/4 : Le Périmètre</span>
                                        <h2 className={styles.questionTitle}>Quelles sont les 3 fonctionnalités indispensables ?</h2>
                                    </motion.div>
                                    <motion.div
                                        className={styles.inputWrapper}
                                        style={{ marginBottom: '2rem' }}
                                        variants={fadeInUp}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.1 }}
                                    >
                                        <textarea
                                            ref={featuresRef}
                                            name="features"
                                            className={styles.textarea}
                                            placeholder="- Paiement Stripe&#10;- Espace Membre&#10;- Chat en direct"
                                            value={formData.features}
                                            onChange={handleChange}
                                            style={{ minHeight: '120px' }}
                                        />
                                    </motion.div>

                                    <motion.div className={styles.questionHeader} variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                                        <h2 className={styles.questionTitle} style={{ fontSize: '1.4rem' }}>Avez-vous déjà un design ou une charte ?</h2>
                                    </motion.div>
                                    <motion.div className={styles.radioGroup} style={{ marginBottom: '2rem' }} variants={staggerContainer} initial="hidden" animate="visible">
                                        <RadioCard label="Oui" value="Oui" selected={formData.designStatus} onSelect={(val) => handleSelection('designStatus', val)} />
                                        <RadioCard label="En cours" value="En cours" selected={formData.designStatus} onSelect={(val) => handleSelection('designStatus', val)} />
                                        <RadioCard label="Non (À faire)" value="Non" selected={formData.designStatus} onSelect={(val) => handleSelection('designStatus', val)} />
                                    </motion.div>

                                    <motion.div className={styles.questionHeader} variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                                        <h2 className={styles.questionTitle} style={{ fontSize: '1.4rem' }}>Quels outils utilisez-vous déjà ?</h2>
                                    </motion.div>
                                    <motion.div className={styles.checkboxGroup} style={{ marginBottom: '2rem' }} variants={staggerContainer} initial="hidden" animate="visible">
                                        <CheckboxCard label="Stripe" selected={formData.tools.includes('Stripe')} onChange={() => handleCheckboxChange('Stripe')} />
                                        <CheckboxCard label="Airtable" selected={formData.tools.includes('Airtable')} onChange={() => handleCheckboxChange('Airtable')} />
                                        <CheckboxCard label="HubSpot" selected={formData.tools.includes('HubSpot')} onChange={() => handleCheckboxChange('HubSpot')} />
                                        <CheckboxCard label="Notion" selected={formData.tools.includes('Notion')} onChange={() => handleCheckboxChange('Notion')} />
                                        <CheckboxCard label="Autre" selected={formData.tools.includes('Autre')} onChange={() => handleCheckboxChange('Autre')} />
                                    </motion.div>
                                    <AnimatePresence>
                                        {formData.tools.includes('Autre') && (
                                            <motion.input
                                                type="text"
                                                name="toolsOther"
                                                className={styles.inputField}
                                                placeholder="Précisez les autres outils..."
                                                value={formData.toolsOther}
                                                onChange={handleChange}
                                                style={{ marginTop: '-1rem', marginBottom: '2rem' }}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}

                            {/* STEP 3: BUSINESS */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    className={styles.stepBlock}
                                    variants={pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div className={styles.questionHeader} variants={fadeInUp} initial="hidden" animate="visible">
                                        <span className={styles.questionTag}>Étape 3/4 : Le Business</span>
                                        <h2 className={styles.questionTitle}>Quel est le budget investi pour cette phase ?</h2>
                                        <p className={styles.helperText}>Nous privilégions la transparence pour éviter de vous faire perdre du temps.</p>
                                    </motion.div>
                                    <motion.div className={styles.radioGroup} style={{ marginBottom: '2rem' }} variants={staggerContainer} initial="hidden" animate="visible">
                                        <RadioCard label="Moins de 2 500 €" desc="Projet d'amorçage." value="<2.5k" selected={formData.budget} onSelect={(val) => handleSelection('budget', val)} />
                                        <RadioCard label="2 500 € - 5 000 €" desc="MVP Robuste." value="2.5k-5k" selected={formData.budget} onSelect={(val) => handleSelection('budget', val)} />
                                        <RadioCard label="5 000 € - 10 000 €" desc="Système complet." value="5k-10k" selected={formData.budget} onSelect={(val) => handleSelection('budget', val)} />
                                        <RadioCard label="+ 10 000 €" desc="Architecture complexe." value=">10k" selected={formData.budget} onSelect={(val) => handleSelection('budget', val)} />
                                    </motion.div>

                                    <motion.div className={styles.questionHeader} variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                                        <h2 className={styles.questionTitle} style={{ fontSize: '1.4rem' }}>Quelle est votre échéance idéale ?</h2>
                                    </motion.div>
                                    <motion.div className={styles.radioGroup} variants={staggerContainer} initial="hidden" animate="visible">
                                        <RadioCard label="Hier (Urgent)" value="Urgent" selected={formData.deadline} onSelect={(val) => handleSelection('deadline', val)} />
                                        <RadioCard label="Sous 15 jours" value="15j" selected={formData.deadline} onSelect={(val) => handleSelection('deadline', val)} />
                                        <RadioCard label="Dans +1 mois" value="1mois+" selected={formData.deadline} onSelect={(val) => handleSelection('deadline', val)} />
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* STEP 4: VALIDATION */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    className={styles.stepBlock}
                                    variants={pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div className={styles.questionHeader} variants={fadeInUp} initial="hidden" animate="visible">
                                        <span className={styles.questionTag}>Étape finale</span>
                                    </motion.div>

                                    <motion.div className={styles.questionHeader} variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                                        <h2 className={styles.questionTitle}>Vos coordonnées</h2>
                                    </motion.div>
                                    <motion.div className={styles.inputWrapper} style={{ marginBottom: '1.5rem' }} variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                                        <input ref={nameRef} type="text" name="name" className={styles.inputField} placeholder="Nom complet" value={formData.name} onChange={handleChange} required />
                                    </motion.div>
                                    <motion.div className={styles.inputWrapper} style={{ marginBottom: '1.5rem' }} variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                                        <input ref={phoneRef} type="tel" name="phone" className={styles.inputField} placeholder="Téléphone" value={formData.phone} onChange={handleChange} />
                                    </motion.div>
                                    <motion.div className={styles.inputWrapper} variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
                                        <input ref={emailRef} type="email" name="email" className={styles.inputField} placeholder="Email" value={formData.email} onChange={handleChange} required />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error Message Display */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    className={styles.errorMessage}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    ⚠️ {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation */}
                        <motion.div
                            className={styles.navContainer}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {step > 1 ? (
                                <motion.button
                                    type="button"
                                    onClick={handleBack}
                                    className={styles.backButton}
                                    whileHover={{ x: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    ← Retour
                                </motion.button>
                            ) : <div></div>}

                            <motion.button
                                type="button"
                                onClick={handleNext}
                                className={clsx(styles.nextButton, styles.finalSubmitButton)}
                                whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(138, 43, 226, 0.3)' }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {step < totalSteps ? 'Suivant →' : <>🚀 Vérifier mon éligibilité et<br />obtenir mon Dossier de Projet <strike>pour 5000 €</strike> gratuitement</>}
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}

function RadioCard({ label, desc, value, selected, onSelect }) {
    const isSelected = selected === value;
    return (
        <motion.div
            className={clsx(styles.radioLabel, isSelected && styles.radioLabelSelected)}
            onClick={() => onSelect(value)}
            variants={fadeInUp}
            whileHover={{ scale: 1.02, borderColor: '#8A2BE2' }}
            whileTap={{ scale: 0.98 }}
        >
            <div className={styles.radioInput} style={{
                borderRadius: '50%', border: '2px solid #555',
                background: isSelected ? '#8A2BE2' : 'transparent',
                borderColor: isSelected ? '#8A2BE2' : '#555',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
            }}>
                {isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />}
            </div>
            <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>{label}</div>
                {desc && <div style={{ opacity: 0.7, fontSize: '0.85rem' }}>{desc}</div>}
            </div>
        </motion.div>
    );
}

function CheckboxCard({ label, selected, onChange }) {
    return (
        <motion.div
            className={clsx(styles.checkboxLabel, selected && styles.checkboxLabelSelected)}
            onClick={onChange}
            variants={fadeInUp}
            whileHover={{ scale: 1.02, borderColor: '#8A2BE2' }}
            whileTap={{ scale: 0.98 }}
        >
            <div className={styles.checkboxInput} style={{
                borderRadius: '4px', border: '2px solid #555',
                background: selected ? '#8A2BE2' : 'transparent',
                borderColor: selected ? '#8A2BE2' : '#555',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
            }}>
                {selected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: '8px', height: '8px', background: 'white', borderRadius: '2px' }} />}
            </div>
            <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{label}</div>
        </motion.div>
    );
}

---
sidebar_position: 13
title: Process
slug: /process
---

Cette page concerne le process de réalisation du service.

Good Vibe Coding (GVC) est une agence de développement web et d'automatisation.

# 1. Qualification : 15mn

Le client remplit le formulaire de qualification (c.f. formulaire de qualification) en 5mn.

## 2 Questions (5mn)

### 1. L’Identité du Projet (Le "Quoi")
Quel est le nom de votre projet/entreprise ? (Texte court)

En une phrase, quel est l'objectif principal de ce service ? (Ex: Vendre des formations, automatiser ma facturation, créer un réseau social de niche).

Quel est le type de solution souhaité ? (Choix multiple)

- Site Web Vitrine / Landing Page.

- Application Web métier (Espace client, Dashboard, outil SaaS).

- Automatisation de processus (Connecter des outils entre eux).

### 2. Le Périmètre Fonctionnel (Pour l'IA du PRD)
Quelles sont les 3 fonctionnalités indispensables pour le lancement ? (Texte long - Ex: Paiement en ligne, compte utilisateur, chat en direct).

Avez-vous déjà un design ou une charte graphique ? (Oui / En cours / Non, j'ai besoin d'une proposition).

Quels outils utilisez-vous déjà ? (Ex: Stripe, Airtable, HubSpot, Notion).

### 3. Le Filtrage Business (Le conseil du CFO)
Quel est le budget investi pour cette phase ? (Boutons radio - L'idée est de filtrer sous vos tarifs planchers)

- Moins de 2 500 € (Alerte : Trop bas pour l'agence).

- 2 500 € - 5 000 €.

- 5 000 € - 10 000 €.

- Plus de 10 000 €.

Quelle est votre échéance idéale pour le lancement ? (Choix multiple : Hier / Sous 15 jours / Dans plus d'un mois).

### 4. Contact

Nom, phone et email

## Enregistrement des réponses

Chaque réponse est enregistrée dans le google sheet "Good Vibe Coding", onglet "Quizz_Answers" : https://docs.google.com/spreadsheets/d/1c1N5ZDBZinGqnMW9nq8GqF6xmiZnxaDkbXprYo1WPxE/edit?usp=sharing

Le formulaire a les champs suivants :

- source: d'où viennent les réponses (audit-sprint par défaut)
- timestamp: date et heure de la publication de la réponse
- projectName: nom du projet
- goal: but du projet
- projectType: type du projet (site, ...)
- features: fonctionnalités du projet
- designStatus: avancement du design
- tools: outils
- toolsOther: autres outils
- budget: budget
- deadline: deadline
- name: nom
- phone: téléphone
- email: email
- status:
    - vide si non évalué,
    - "error: [date][reason]" si en erreur de traitement,
    - "refused: [date] [reason]" si refusé,
    - "qualified: [date]" si qualifié par les filtres du questionnaire (ensuite, notif le client et nous-même),
    - "accepted: [date]" si accepté par nous pour faire l'audit
    - "started: [date]" si le projet est en cours
    - "failed: [date] [reason]" si le projet est échoué
    - "finished: [date]" si le projet est terminé
    - "supported: [date] [amount]" si le projet est supporté
    - "heberged: [date] [amount]" si le projet est hébergé (inclus le support)
- notified: si le prospect a été informé de sa qualification
- contacted: si le prospect a été contacté pour rédiger le PRD
- PRD: PRD
- price: prix
- justificationPrice: justification du prix
- duration: durée
- justificationDuration: justification de la durée
- objections: objections et réponses

## Évaluation (5mn)

Toutes les 5 minutes, n8n va voir s'il y a de nouvelles réponses (accepted = vide).

Si oui, il va mettre à jour le champs "accepted" à false si le budget est inférieur à 2500€ ou si la deadline est dans plus d'un mois, ou vrai dans le cas contraire.

### erreur

Notif slack de l'erreur pour intervention rapide.

Infos du projet :
- Nom du projet
- Objectif
- Type de projet
- Budget
- Deadline
- Nom
- Email
- Téléphone

### refus

Envoie d'un mail de refus au client avec une proposition de modifier ses exigences pour bosser avec nous (via des suggestions).

```txt
Subject: Mise à jour concernant votre demande de projet"

Bonjour [name],

Nous vous remercions sincèrement de l'intérêt que vous portez à nos services.

Après avoir pris connaissance des détails fournis, notamment l'information relative [BUDGET_DECLINED_VALUE.includes(budget.trim()) ? 'au budget' : 'à la durée'], nous sommes au regret de vous informer que votre projet ne correspond pas, pour l'instant, à nos critères ou à nos tarifs actuels.

Nous vous souhaitons beaucoup de succès dans la recherche du partenaire idéal et restons à votre disposition si l'envergure ou le budget de votre projet devaient évoluer.

Cordialement,

L'équipe Good Vibe Coding
```

### accepté

Champs status à "qualified".

#### PRD

Ensuite, on utilise un modèle pour générer:

- PRD: Product Requirements Document
- Prix et justification
- Durée et justification
- Objections
- row_number

```markdown
Tu es un Product Manager et Architecte Solution Senior avec 20 ans d'expérience. Ton objectif est de rédiger un PRD (Product Requirement Document) percutant, professionnel et structuré pour un client potentiel, ainsi qu'une estimation de temps, un prix, une liste d'au moins 5 objections que le client pourrait soumettre avec des réponses, et un row_number static pour faire le lien avec un tableur, le tout uniquement dans ce format JSON :
{ "PRD", "duration", "justificationDuration", "price", "justificationPrice", "objections": [{"question": "answer"}], "row_number": [row_number]}

Voici les données du prospect :
- Nom du Projet : [projectName]
- Objectif : [goal]
- Type de solution : [projectType]
- Fonctionnalités clés : [features]
- Design : [designStatus]
- Outils actuels : [tools] [toolsOther]

Instructions de rédaction :
1. TON : Professionnel, direct, expert et rassurant. Évite le jargon inutile mais montre une maîtrise technique absolue.
2. STRUCTURE :
   - Résumé Exécutif : Reformule le problème et la solution en termes de bénéfices business.
   - Objectif/buts : expliquez pourquoi vous construisez ce produit.
   - Caractéristiques : pour chaque élément, vous devez inclure au minimum une description, un objectif et un cas d’utilisation. Des détails supplémentaires peuvent être utiles ou nécessaires selon la complexité de l’élément.
   - User flow : incluez des schémas et des maquettes pour aider les ingénieurs à comprendre le produit et comment les fonctionnalités doivent être mise en œuvre.
   - Exigences en matière de système et d’environnement
   - Hypothèses, contraintes et dépendances : énumérer ce que l’on attend des utilisateurs, les limites dont il faut tenir compte pour la mise en œuvre et les éléments extérieurs nécessaires pour que la solution finale soit fonctionnelle.
   - Architecture Recommandée : Justifie l'utilisation de la "Vibe Stack" (Next.js, Supabase, Tailwind) pour ce cas précis avec d'autres technos qui te semblent pertinentes.
   - Le "Cerveau" Automation : Décris spécifiquement un workflow n8n qui résout son problème de ...
   - Roadmap de 7 jours : Découpe le projet en 3 phases (J1-2 : Fondations & Auth, J3-5 : Logique métier & UI, J6-7 : Tests, Automatisations & Déploiement).
   - Analyse des Risques : Identifie un point de vigilance technique lié aux réponses du client et propose une solution.
  - Prochaine Étape : Le Vibe Check : Invite à réserver l'appel de 30 min pour valider ce plan à l'adresse https://cal.com/bejof/good-vibe-coding

Format de sortie : Utilise un Markdown soigné avec des titres clairs et des listes à puces.

Contrainte : Le document doit donner l'impression que l'expert a passé 1h à réfléchir au projet. Ne mentionne pas que tu es une IA. Termine par une phrase ouvrant sur l'Appel Flash.

Concernant l'estimation du temps et du prix, sache que pour un site, c'est à partir de 2500€ pour 5 jours de vibe coding, pour une web app/PMVP c'est à partir de 4900€ pour au moins 7 jours de vibe coding, et pour de l'automation (n8n), c'est à partir de 1500€.
```

Un projet github "good-vibe-coding-[row_number]" est créé, forké à partir de good-vibe-coding-template.
Dedans, on y trouve le markdown du PRD.md à éditer en ligne via github.dev.

Les Champs PRD, price, duration, objections, row_number sont mis à jour.

Notif slack channel #good-vibe-coding https://bejof.slack.com/archives/C0A5L4PP0BX avec les infos au dessus, avec bouton de confirmation pour accepter le projet ou annulation pour le refuser.

Les infos :
- lien vers le PRD dans github.dev pour l'éditer en ligne
- Nom du projet
- Objectif
- Type de projet
- Budget
- Deadline
- Nom
- Email
- Téléphone

Ainsi, Good Vibe Coding (GVC) peut commencer à travailler sur le projet en vérifiant le PRD et le status.

S'il confirme la notif slack, alors le process continue.
Sinon, le projet est refusé.

#### Contacter le client

L'étape précédente envoie un mail de confirmation au client avec un lien vers l'agenda pour avoir un diagnostic d'une heure.

Pas plus 3 créneaux possibles afin de montrer de la rareté: Tu es un expert très sollicité qui ne prend qu'un client à la fois, ton temps est précieux.

```txt
Sujet : Votre projet d'outil sur-mesure - [Nom du Client] x Veloce
Bonjour [Prénom du client],

Merci d'avoir pris contact. J'ai bien reçu les premiers éléments concernant votre projet de [Type de projet : Portail client / Automatisation / Site].

Le concept de ma méthode est de supprimer les mois d'attente habituels pour vous livrer une solution opérationnelle en 7 jours chrono.

Pour confirmer que votre projet est parfaitement adapté à ce format intensif et garantir une livraison vendredi prochain, je vous propose un échange d'une heure.

Pendant cet appel, nous validerons ensemble :

L'unique fonctionnalité qui apportera le plus de valeur à votre business dès la semaine prochaine.

Les données ou outils que nous devrons connecter.

Le choix du créneau disponible dans mon calendrier.

Voici mes prochaines disponibilités pour ce diagnostic :

[Jour / Date] à [Heure]

[Jour / Date] à [Heure]

Est-ce que l'un de ces créneaux vous convient ?

Dans l'attente de construire votre outil,

Bien cordialement,

[Jonathan Labéjof] Architecte de Solutions Digitales
```

Appeller quand même le client pour faire connaissance et vérifier qu'il est bien en phase avec la procédure, ou prendre rendez-vous directement avec lui.

## Diagnostic (1h)

Le but est de présenter le PRD pour vérifier notre compréhension du projet.
Puis de montrer une démo de la solution avec [Stitch](https://stitch.withgoogle.com/) ou [v0.app](https://v0.app).

Ensuite, génération du pdf du PRD dans le projet pour rester sur une version figée, en annexe d'un contrat qu'on lui envoie.

### Closing : 15mn

Suite à l'effet wahou, on close avec le prix en justifiant qu'on est déjà très rapide et qu'on comprend bien son besoin, parce qu'on s'applique à nous-même ce qu'on propose à nos clients.

- Explication du déroulé
    - planning
    - envoie du status.pdf tous les jours à 18h
    - feedbacks client à faire avant 10h pour être pris en compte le jour même
    - le PRD est figé (pas de fonctionnalités supplémentaires, pas non plus de pixel perfect)
    - lien de démo disponible le jour même, et mis à jour en continu
    - support
    - hébergement
- résolution des objections
- envoie du contrat, avec pdf du PRD en annexe, et attente de sa signature et de l'accompte.

Dès que le contrat est signé et que l'accompte est reçu (50% du prix), prochaine étape du process.

## 4. Développement : 30mn

Roadmap dans le projet github.

Utiliser Antigravity en mode plan avec Gemini 3 (flash ou pro) ou Claude Sonnet 4.5 avec la maquette et le PRD pour créer une version 0 de l'application web.

Stack technique :

- Github : repository
- supabase : tout ce dont on a besoin pour stocker les données et s'authentifier
- next.js : framework pour créer l'application web
- tailwindcss : css
- shadcn/ui : ui components
- framer-motion : animations
- Docker : containerization
- Jest : tests unitaires
- Cypress : tests fonctionnels
- opentelemetry : monitoring
- sentry ou logtail: logging
- clerk : authentification
- Axiom ou Better Stack (Logs) : Pour centraliser les logs de vos automatisations et de votre API.
- Posthog (Product Analytics) : Le petit plus qui fait gagner. Montrez au client combien d'utilisateurs cliquent sur ses boutons. C'est de l'observabilité "Business" et ils adorent ça.

## 5. Déploiement : 30mn

- Hostinger : hébergement (utiliser le code SHUBAMSHARMA pour avoir -10%)
- Dokploy : déploiement (alternative gratuite à Vercel qui peut être lié à github)
- Rajouter une github action pour la CI/CD.

Une fois la solution déployée, on envoie un mail au client avec le lien vers l'application web.

# Construction intensive des fonctionnalités

- Se concentrer sur le MVP (ROADMAP), pas de nouvelles fonctionnalités, sinon, c'est une prestation supplémentaire.
- Faire une vidéo de présentation des avancements chaque jour et montrer la ROADMAP de 15mn.
- Proposer de prendre un feedback chaque jour à envoyer avant 10h le lendemain matin.

# Tests finaux, automatisations et mise en service.

- Faire une vidéo de présentation
- Préparer un contrat de support
- Appeler le client pour lui montrer l'outil et lui expliquer le contrat de support et s'il veut de l'automatisation ou un autre app

    - si support souhaité, envoie d'un contrat et attente de sa signature

- si le client paye la facture
    - livrer le code en priorité (.zip)
    - lui proposer du support (si oui, envoyer contrat et attente de signature pour démarrer)
    - lui proposer de l'hébergement (si nouveau choix, envoyer contrat et attente de signature pour démarrer et héberger sur une url de prod)
    - lui poser des questions sur son métier pour proposer des automatisations
    - demander un retour utilisateur

# Votre outil est prêt, vous pouvez l'utiliser

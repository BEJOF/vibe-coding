// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Good Vibe Coding',
  tagline: 'Obtenez votre MVP ou Dashboard de gestion sur mesure en 5 jours.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://bejof.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/good-vibe-coding/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bejof', // Usually your GitHub org/user name.
  projectName: 'good-vibe-coding', // Usually your repo name.
  deploymentBranch: 'main',
  trailingSlash: true,

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn'
    }
  },

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/good-vibe-coding-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Good Vibe Coding',
        logo: {
          alt: 'Good Vibe Coding Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            to: '/#problem',
            position: 'left',
            label: 'Problème',
          },
          {
            to: '/#method',
            position: 'left',
            label: 'Méthode',
          },
          {
            to: '/#solutions',
            position: 'left',
            label: 'Solutions',
          },
          {
            to: '/#pricing',
            position: 'left',
            label: 'Tarifs',
          },
          {
            to: '/#contact',
            position: 'left',
            label: 'Contact',
          },
          {
            to: '/blog',
            position: 'right',
            label: 'Blog',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Offre',
            items: [
              { label: 'Problème', to: '/#problem' },
              { label: 'Méthode', to: '/#method' },
              { label: 'Solutions', to: '/#solutions' },
            ],
          },
          {
            title: 'Ressources',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              { label: 'Tarifs', to: '/#pricing' },
              { label: 'Réserver', to: '/#contact' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://bejof.org">BEJOF</a>. Fait par Good Vibe Coding avec Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

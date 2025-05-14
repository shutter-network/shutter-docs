// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";
import { Icon } from "@iconify/react";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Shutter Docs",
  tagline: "Empowering Fairness with Threshold Encryption",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.shutter.network/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "shutter-network", // Usually your GitHub org/user name.
  projectName: "shutter-docs", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: ["docusaurus-plugin-matomo"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/shutter-network/shutter-docs",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/shutter-network/shutter-docs",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: "keywords",
          content: "shutter, ethereum, threshold encryption, encrypted mempool",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "google-site-verification",
          content: "vniF73ij92Xco4_iHggmpNOrSP0bEbJfxonBETjemrQ",
        },
        {
          name: "msvalidate.01",
          content: "461226232A0CE4B34E124EE5F4510557",
        },
      ],
      // Replace with your project's social card
      image: "img/shutter_hero_banner.png",
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      prism: {
        additionalLanguages: ["bash"],
      },
      navbar: {
        title: "Docs",
        logo: {
          alt: "Shutter Docs",
          src: "img/Shutter_Main_Logotype_White.png",
        },
        items: [
          {
            type: "dropdown",
            label: "Network",
            collapsed: false,
            position: "left",
            items: [
              {
                label: "Overview",
                collapsed: false,
                to: "docs/shutter/",
              },
              {
                label: "Products",
                collapsed: false,
                to: "docs/shutter/products",
              },
              {
                label: "Integrations",
                collapsed: false,
                to: "docs/shutter/integrations",
              },
              {
                label: "Research",
                collapsed: false,
                to: "docs/shutter/research/the_road_towards_an_encrypted_mempool_on_ethereum",
              },
            ],
          },
          {
            type: "dropdown",
            label: "DAO",
            collapsed: false,
            position: "left",
            items: [
              {
                label: "Overview",
                collapsed: false,
                to: "docs/dao",
              },
              {
                label: "Shutter DAO 0x36",
                collapsed: false,
                to: "docs/dao/0x36",
              },
            ],
          },
          {
            type: "dropdown",
            label: "Protocol",
            collapsed: false,
            position: "left",
            items: [
              {
                label: "Overview",
                collapsed: false,
                to: "docs/protocol/overview",
              },
              {
                label: "A Distributed Solution to a Shared Problem",
                collapsed: false,
                to: "docs/protocol",
              },
            ],
          },
            {to: 'docs/shutter/research/the_road_towards_an_encrypted_mempool_on_ethereum', label: 'Encrypted Mempool', position: 'left'},
            {to: 'docs/protocol/api', label: 'API', position: 'left'},
          {
            label: "Schedule a Demo",
            position: "right",
            href:
              "https://calendly.com/loringharkness/30-minute-shutter-api-demo",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            items: [
              {
                html:
                  "<b>Shutter is a threshold encryption protocol with a wide variety of applications, including: malicious MEV prevention, censorship resistance, voting integrity, and gaming fairness.</b>",
              },
            ],
          },
          {
            title: "About",
            items: [
              {
                label: "Privacy Policy",
                to: "https://www.shutter.network/privacy-policy",
              },
              {
                label: "Imprint",
                to: "https://www.shutter.network/imprint",
              },
              {
                label: "Contact Us",
                to: "mailto:contact@shutter.network",
              },
            ],
          },
          {
            title: "Products",
            items: [
              {
                label: "Shielded Trading",
                to: "https://www.shutter.network/shielded-trading",
              },
              {
                label: "Shielded Voting",
                to: "https://www.shutter.network/shielded-voting",
              },
            ],
          },
          {
            title: "Learn",
            items: [
              {
                label: "Blog",
                to: "https://blog.shutter.network/",
              },
              {
                label: "GitHub",
                to: "https://github.com/shutter-network",
              },
            ],
          },
          {
            title: "Socials",
            items: [
              {
                label: "Forum",
                href: "https://shutternetwork.discourse.group/",
              },
              {
                label: "X (Twitter)",
                href: "https://x.com/ShutterNetwork",
              },
              {
                label: "Telegram",
                href: "http://t.me/shutter_network",
              },
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      matomo: {
        matomoUrl: "https://shutter.matomo.cloud/",
        siteId: "6",
        phpLoader: "matomo.php",
        jsLoader: "matomo.js",
      },
    }),
};

export default config;

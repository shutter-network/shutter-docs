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

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/shutter-network/shutter-docs",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/shutter-network/shutter-docs",
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
      // Replace with your project's social card
      image: "img/shutter_hero_banner.png",
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: "Docs",
        logo: {
          alt: "Shutter Docs",
          src: "img/Shutter_Main_Logotype_White.png",
        },
        items: [
          { to: "/docs/shutter", label: "Network", position: "left" },
          { to: "/docs/dao", label: "DAO", position: "left" },
          { to: "/docs/protocol", label: "Protocol", position: "left" },
          {
            href: "https://calendly.com/loringharkness/30min",
            label: "Schedule a Demo",
            position: "right",
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
                label: "Discord",
                href: "https://discord.gg/Fx7m5cUcua",
              },
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

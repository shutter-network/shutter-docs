import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import { Icon } from "@iconify/react";

const FeatureList = [
  {
    title: 'Shutter Network',
    icon: <Icon icon="gis:earth-network-o" style={{ color: "#0044a4", fontSize: "96px" }} />,
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
      Shutter Network is an open-source threshold encryption protocol that brings fairness and information symmetry to blockchain systems.
      </>
    ),
    button_link: '/docs/shutter',
    button_text: 'About Shutter',
  },
  {
    title: 'DAO',
    icon: <Icon icon="codicon:organization" style={{ color: "#0044a4", fontSize: "96px" }} />,
    description: (
      <>
        A Shutter DAO is a decentralized organization that governs the implementation of Shutter technology and manages its key components.
      </>
    ),
    button_link: '/docs/dao',
    button_text: 'About DAO',
  },
  {
    title: ' Protocol',
    icon: <Icon icon="carbon:encryption" style={{ color: "#0044a4", fontSize: "96px" }} />,
    description: (
      <>
        Free, open-source software publicly available on GitHub. Designed to protect the crypto community from blockchain manipulation.
      </>
    ),
    button_link: '/docs/protocol',
    button_text: 'About Protocol',
    button_style: styles.buttons3,
  },
];

function Feature({icon, Svg, title, description, button_link, button_text, button_style}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      <p className="front-icon">{icon}</p>
      </div>
      <div className="text--center padding-horiz--md front-box-text">
        <Heading as="h3">{title}</Heading>
        <p className="front-description">{description}</p>
        <div className={styles.buttons} >
          <Link
            className="button button--secondary button--lg front-button"
            to={button_link}>
            {button_text}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

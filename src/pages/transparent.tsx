// Structure of the home page. Never pick more than 8/9
// Home/hero
// About
// Services
// Updates/coming soon/changes
// Fixed image/large image background with a customer promise
// Contact Form
// Newsletter Sign Up
// Case Studies
// Location Info
// Blog or Insights
// Q&A
// Customer Reviews

import { siteConfig } from '@/config/site';
import { InfoWithSticky } from '../components/navigation/info-with-sticky-nav';
import { useRouter } from 'next/router';
import Layout from '../components/layout-regular';
import SimpleHero from '../components/home-hero/simple';
import LayoutTransparent from '../components/layout-transparent';
import TransparentImage from '../components/home-hero/transparent-image';

export default function HomePageTransparent() {
  const router = useRouter();

  // TODO: Delete this page if needed

  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: 'Sir Suds Laundry Co.',
    url: 'https://www.sirsuds.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.sirsuds.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: 'Sir Suds Laundry Co.',
    url: 'https://www.sirsuds.com/',
    description: "Tri-Cities' Premier Laundromat Experience",
    logo: '/public/logo/main-logo.svg',
    telephone: '+1-940-5075',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1411 Williams Blvd',
      addressLocality: 'Richland',
      addressRegion: 'Washington',
      postalCode: '99354',
      addressCountry: 'US',
    },
  };

  return (
    <LayoutTransparent
      title="This is the title of the page"
      description="This is the description of the page :D"
      jsonLd={jsonLd}
      organizationSchema={organizationSchema}
    >
      <TransparentImage></TransparentImage>
      <div className="h-[2000px]"></div>
    </LayoutTransparent>
  );
}

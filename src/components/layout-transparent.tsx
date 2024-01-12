// components/Layout.tsx
import React from 'react';
import Head from 'next/head';
import AllOutFooterSection from './footer/info-heavy';
import { InfoWithSticky } from './navigation/info-with-sticky-nav';
import { siteConfig } from '@/config/site';
import { useRouter } from 'next/router';
import { TransparentNav } from './navigation/transparent-nav';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  siteConfiguration?: {
    url: string;
  };
  jsonLd?: any;
  organizationSchema?: any;
};

export default function LayoutTransparent({
  children,
  title = 'Default title of page', // default value if title prop isn't provided
  description = 'Default description of the page', // default value if description prop isn't provided
  siteConfiguration = {
    url: 'default url',
  },
  jsonLd,
  organizationSchema,
}: LayoutProps) {
  const router = useRouter();
  const href = router.pathname;

  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/main-logo.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo/main-logo.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/main-logo.svg" />
        {/* Recommended tags */}
        <link rel="canonical" href={siteConfiguration.url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/public/logo/main-logo.svg" /> {/* replace with your actual image path */}
        <meta property="og:url" content={siteConfiguration.url} />
        <meta name="twitter:card" content="summary_large_image" />
        {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
        {organizationSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        )}
      </Head>
      {/* To make it fixed like normal, just take out sticky AND fixed. Comment out "COMPXYZ" if you don't want the banner showing up*/}
      <div className="top-0 h-20 z-50 w-full">
        <TransparentNav items={siteConfig.mainNav} href={href}></TransparentNav>
      </div>
      <main className="bg-gray-100">{children}</main>
      <AllOutFooterSection></AllOutFooterSection>
    </div>
  );
}

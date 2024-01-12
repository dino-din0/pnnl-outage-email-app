import { useRouter } from 'next/router';
import Layout from '../components/layout-regular';
import FourOFourHero from '../components/home-hero/four-O-four-hero';
import { siteConfig } from '@/config/site';

export default function NoPageFound() {
  const router = useRouter();

  return (
    <>
      <Layout
        title={`404 - Page Not Found | ${siteConfig.name}${siteConfig.slogan ? ` - ${siteConfig.slogan}` : ''}`}
        description="Oops! It seems you've taken a wrong turn. The page you're looking for doesn't exist or has been moved. Navigate back to Sir Suds Laundry Co. for the best laundromat experience in the Tri-Cities area."
      >
        <FourOFourHero></FourOFourHero>
      </Layout>
    </>
  );
}

import { useRouter } from 'next/router';
import Layout from '../components/layout-regular';
import FourOFourHero from '../components/home-hero/four-O-four-hero';


const siteConfiguration = {
  description:
    "Oops! It seems you've taken a wrong turn. The page you're looking for doesn't exist or has been moved. Navigate back to Sir Suds Laundry Co. for the best laundromat experience in the Tri-Cities area.",
  url: 'https://www.sirsuds.com/',
  title: "Oops! Page Not Found | Sir Suds Laundry Co. – Tri-Cities' Premier Laundromat",
};

export default function NoPageFound() {
  const router = useRouter();

  return (
    <>
      <Layout
        title="Oops! Page Not Found | Company name goes here - maybe their slogan too"
        description="Oops! It seems you've taken a wrong turn. The page you're looking for doesn't exist or has been moved. Navigate back to Sir Suds Laundry Co. for the best laundromat experience in the Tri-Cities area."
      >
        <FourOFourHero></FourOFourHero>
      </Layout>
    </>
  );
}

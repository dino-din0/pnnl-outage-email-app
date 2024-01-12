import { NavItem } from '@/types/nav';

interface SiteConfig {
  name: string;
  slogan: string;
  description: string;
  url: string;
  cwsName: string;
  mainNav: NavItem[];
  services: string[];
  links: {
    tikTok: string;
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  address: string;
  phone: string;
  email: string;
  dateSiteLaunched: string;
}

// TODO: Business/Site configuration
export const siteConfig: SiteConfig = {
  name: 'Business NAme',
  slogan: "Super cool business slogan",
  description: 'Business description here',
  url: 'thisistheurl.com',
  cwsName: 'Cascade Web Solutions',

  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'About Us',
      href: '/about-us',
    },
    {
      title: 'Services',
      href: '/services',
    },
    {
      title: 'Our Location',
      href: '/our-location',
    },
    {
      title: 'FAQ',
      href: '/faq',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Contact Us',
      href: '/contact-us',
    },
  ],
  services: ['serviceOne', 'serviceTwo', 'serviceThree'],
  links: {
    tikTok: 'Lorem11',
    linkedin: 'Lorem11',
    facebook: 'Lorem11',
    instagram: 'Lorem11',
  },
  address: '1234 Aynwhere place  SW, Calgary, AB T2P 3E5',
  phone: '111 111 1111',
  email: 'info@example.com',
  dateSiteLaunched: 'January 1st XXXX',
};

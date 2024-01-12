import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import styles from './Layout.module.scss';
import { siteConfig } from '@/config/site';
import useSite from '../../hooks/use-site';
import { helmetSettingsFromMetadata } from '../../lib/site';
import Link from 'next/link';
import { Clock, MapPinIcon, Phone } from 'lucide-react';
import ThreeCardHighlightHero from '../../wordpress-components/hero-sections/home-hero';
import Image from 'next/image';
import { BlockyWithQuoteNav } from '../navigation/block-quote';
import Main from '../Main';
import Footer from '../../components/footer/info-heavy';

const Layout = ({ children }) => {
  const router = useRouter();
  const { asPath } = router;
  const href = router.pathname;

  const { homepage, metadata = {} } = useSite();

  if (!metadata.og) {
    metadata.og = {};
  }

  metadata.og.url = `${homepage}${asPath}`;

  const helmetSettings = {
    defaultTitle: metadata.title,
    titleTemplate: process.env.WORDPRESS_PLUGIN_SEO === true ? '%s' : `%s - ${metadata.title}`,
    ...helmetSettingsFromMetadata(metadata, {
      setTitle: false,
      link: [
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          href: '/feed.xml',
        },

        // Favicon sizes and manifest generated via https://favicon.io/

        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    }),
  };

  return (
    <div className={styles.layoutContainer}>
      <Helmet {...helmetSettings} />

      <div className="relative h-fit bg-primary">
        <div className="flex font-bold text-xl items-center justify-center text-center w-full">
          <div className="container flex justify-between h-24 md:h-36 lg:h-44 xl:h-fit">
            <div className="hidden md:flex flex-grow w-1/3 items-center justify-center h-32 pt-12 xl:pt-4">
              <div className="IOS-black lg:w-12 h-full flex items-center justify-center">
                <MapPinIcon size={40} className="hidden lg:flex text-white"></MapPinIcon>
              </div>
              <Link
                target="_blank"
                className="xl:w-[50%] font-normal text-start flex items-center text-white"
                href={'https://goo.gl/maps/KfzXpXn9YisBUV8t5'}
              >
                1411 Williams Blvd, Richland, WA 99354
              </Link>
            </div>
            <div className="justify-between items-center md:hidden flex flex-grow pt-2 md:pt-0 w-1/3 h-fit text-4xl gap-2 pl-2">
              <Image
                width={80}
                height={80}
                className="object-center object-cover pointer-events-none"
                src="/logo/main-logo-white.svg"
                alt="Sir Suds Logo"
              />
              <div className="h-fit text-white flex flex-col text-start text-base gap-3">
                <Link
                  target="_blank"
                  className="flex items-center text-white font-bold flex items-center gap-1 text-decoration underline"
                  href={'https://goo.gl/maps/KfzXpXn9YisBUV8t5'}
                >
                  <MapPinIcon size={15} className="text-white"></MapPinIcon>
                  <div className="line-clamp-1">1411 Williams Blvd, Richland, WA 99354</div>
                </Link>
                <a href={`tel:${15099405075}`} className="flex items-center gap-1">
                  <Phone size={15} className="text-white"></Phone>
                  <div>(509) 940-5075</div>
                </a>
                <div className="flex items-center gap-1">
                  <Clock size={15} className="text-white"></Clock>
                  <div>Open Daily 7AM to 9PM</div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-col flex-grow pt-8 md:pt-0 w-1/3 h-20 md:h-40 text-4xl justify-center items-center text-center md:-mr-6 md:mr-0">
              <Image
                width={130}
                height={130}
                className="object-center object-cover pointer-events-none"
                src="/logo/main-logo-white.svg"
                alt="Sir Suds Logo"
              />
            </div>
            <a
              href={`tel:${15099405075}`}
              className="hidden md:flex flex-grow w-fit md:w-64 lg:w-1/3 items-center justify-center h-32 pt-12 xl:pt-4 gap-4"
            >
              <div className="xl:w-12 h-full flex items-center justify-center">
                <Phone size={40} className="hidden lg:flex text-white"></Phone>
              </div>
              <div className="flex flex-col xl:w-[70%] h-full flex justify-center items-center">
                <div className="w-full text-start text-white">(509) 940-5075</div>
                <p className="text-start text-xl w-full text-white">Open Daily 7AM to 9PM</p>
              </div>
            </a>
          </div>
        </div>
        <header className="flex h-24 mt-10 lg:mt-0 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex-1 z-40">
            <BlockyWithQuoteNav items={siteConfig.mainNav} href={href} />
          </div>
        </header>
      </div>

      <Main>{children}</Main>

      <Footer />
    </div>
  );
};

export default Layout;

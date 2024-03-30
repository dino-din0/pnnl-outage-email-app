import NextApp from 'next/app';

import { SiteContext, useSiteContext } from '../hooks/use-site';
import { SearchProvider } from '../hooks/use-search';
import { ThemeProvider } from 'next-themes';

import { getSiteMetadata } from '../lib/site';
import { getRecentPosts } from '../lib/posts';
import { getCategories } from '../lib/categories';
import { getAllMenus } from '../lib/menus';
import { Inter as FontSans } from '@next/font/google';
import '../styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

function App({ Component, pageProps = {}, metadata, recentPosts, categories, menus }) {
  const site = useSiteContext({
    metadata,
    recentPosts,
    categories,
    menus,
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SiteContext.Provider value={site}>
        <style jsx global>{`
          :root {
            --font-sans: ${fontSans.style.fontFamily};
          }
        `}</style>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </SiteContext.Provider>
    </ThemeProvider>
  );
}

// App.getInitialProps = async function (appContext) {
//   const appProps = await NextApp.getInitialProps(appContext);

//   const { posts: recentPosts } = await getRecentPosts({
//     count: 5,
//     queryIncludes: 'index',
//   });

//   const { categories } = await getCategories({
//     count: 5,
//   });

//   const { menus = [] } = await getAllMenus();

//   return {
//     ...appProps,
//     metadata: await getSiteMetadata(),
//     recentPosts,
//     categories,
//     menus,
//   };
// };

export default App;

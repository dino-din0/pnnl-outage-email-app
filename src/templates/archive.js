import { Helmet } from 'react-helmet';

import { WebpageJsonLd } from '../lib/json-ld';
import { helmetSettingsFromMetadata } from '../lib/site';
import useSite from '../hooks/use-site';

import Layout from '../wordpress-components/Layout';
import Header from '../wordpress-components/Header';
import Section from '../wordpress-components/Section';
import Container from '../wordpress-components/Container';
import SectionTitle from '../wordpress-components/SectionTitle';
import PostCard from '../wordpress-components/PostCard';
import Pagination from '../wordpress-components/Pagination/Pagination';
import FixedImageCallToAction from '../components/customer-promise/fixed-image';

import styles from '../styles/templates/Archive.module.scss';

const DEFAULT_POST_OPTIONS = {};

export default function TemplateArchive({
  title = 'Archive',
  Title,
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug,
  metadata,
  pagination,
}) {
  const { metadata: siteMetadata = {} } = useSite();

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      {/* <div className="h-24"></div> */}
      <Helmet {...helmetSettings} />

      <WebpageJsonLd title={title} description={metadata.description} siteTitle={siteMetadata.title} slug={slug} />

      <Header>
        <Container>
          {/* <h1 className='text-3xl font-medium'>{Title || title}</h1> */}
          {/* {metadata.description && (
            <p
              className={styles.archiveDescription}
              dangerouslySetInnerHTML={{
                __html: metadata.description,
              }}
            />
          )} */}
        </Container>
      </Header>

      <Section>
        <div className="container text-black">
          {/* <SectionTitle>Posts</SectionTitle> */}
          {Array.isArray(posts) && (
            <>
              <ul className=" flex flex-wrap gap-12 items-center justify-center">
                {posts.slice(0, 9).map((post) => {
                  return (
                    <li className="w-full lg:w-[30%]" key={post.slug}>
                      <PostCard post={post} />
                    </li>
                  );
                })}
              </ul>
              {pagination && (
                <Pagination
                  currentPage={pagination?.currentPage}
                  pagesCount={pagination?.pagesCount}
                  basePath={pagination?.basePath}
                />
              )}
            </>
          )}
        </div>
      </Section>
      <FixedImageCallToAction></FixedImageCallToAction>
    </Layout>
  );
}

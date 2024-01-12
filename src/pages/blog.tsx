import useSite from '../hooks/use-site';
import { getPaginatedPosts } from '../lib/posts';
import { WebsiteJsonLd } from '../lib/json-ld';

import Layout from '../components/layout-regular';
import Section from '../wordpress-components/Section';
import PostCard from '../wordpress-components/PostCard';
import Pagination from '../wordpress-components/Pagination';
import BlogHero from '../wordpress-components/hero-sections/blog-hero';
import FixedImageCallToAction from '../components/customer-promise/fixed-image';


interface Post {
  slug: string;
  // ... other post properties
}

interface Pagination {
  currentPage?: number;
  pagesCount?: number;
  basePath?: string;
}

interface HomeProps {
  posts: Post[];
  pagination: Pagination;
}

const Blog: React.FC<HomeProps> = ({ posts, pagination }) => {
  const siteData = useSite();
  const title = siteData?.metadata?.title || 'Sir Suds Blog';

  return (
    <Layout>
      <WebsiteJsonLd siteTitle={title} />

      <BlogHero></BlogHero>

      <Section>
        <div className="container">
          <h2 className="sr-only">Posts</h2>
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
              addCanonical={false}
              currentPage={pagination?.currentPage}
              pagesCount={pagination?.pagesCount}
              basePath={pagination?.basePath}
            />
          )}
        </div>
      </Section>
      <FixedImageCallToAction></FixedImageCallToAction>
    </Layout>
  );
};

export default Blog;

// const FETCH_POSTS_QUERY = `
// {
//   posts {
//     nodes {
//       title
//       excerpt
//       slug
//       date
//       author {
//         node {
//           id
//         }
//       }
//       featuredImage {
//         node {
//           sourceUrl
//           caption
//         }
//       }
//     }
//   }
// }
// `;

// async function getPaginatedPostInformation() {
//   // You can add any logic here, if required.
//   const response = await axios.post(process.env.WORDPRESS_GRAPHQL_ENDPOINT || '', {
//     query: FETCH_POSTS_QUERY,
//   });

//   return {
//     posts: response.data.data.posts.nodes,
//     // ... add other data you want to fetch
//   };
// }

// export async function getStaticProps() {
//   const { pagination } = await getPaginatedPosts({
//     queryIncludes: 'archive',
//   });
//   const { posts } = await getPaginatedPostInformation();
//   return {
//     props: {
//       posts,
//       pagination: {
//         ...pagination,
//         basePath: '/posts',
//       },
//     },
//     revalidate: 60 * 60,
//   };
// }

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'archive',
  });
  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
    },
    revalidate: 60 * 60,
  };
}

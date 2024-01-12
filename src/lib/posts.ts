// @ts-nocheck

import { getApolloClient } from './apollo-client';

import { updateUserAvatar } from './users';
import { sortObjectsByDate } from './datetime';

import {
  QUERY_ALL_POSTS_INDEX,
  QUERY_ALL_POSTS_ARCHIVE,
  QUERY_ALL_POSTS,
  QUERY_POST_BY_SLUG,
  QUERY_POSTS_BY_AUTHOR_SLUG_INDEX,
  QUERY_POSTS_BY_AUTHOR_SLUG_ARCHIVE,
  QUERY_POSTS_BY_AUTHOR_SLUG,
  QUERY_POSTS_BY_CATEGORY_ID_INDEX,
  QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE,
  QUERY_POSTS_BY_CATEGORY_ID,
  QUERY_POST_SEO_BY_SLUG,
  QUERY_POST_PER_PAGE,
} from '../data/posts';

/**
 * postPathBySlug
 */
export function postPathBySlug(slug: string): string {
  return `/posts/${slug}`;
}

/**
 * getPostBySlug
 */
interface SeoData {
  author?: string;
  description?: string;
  image?: string;
  modifiedTime?: string;
  publishedTime?: string;
  publisher?: string;
  title?: string;
  type?: string;
  metaDesc?: string;
  readingTime?: string;
  canonical?: string;
  opengraphAuthor?: string;  // you can keep these if you need them elsewhere
  opengraphDescription?: string;
  opengraphImage?: string;
  opengraphModifiedTime?: string;
  opengraphPublishedTime?: string;
  opengraphPublisher?: string;
  opengraphTitle?: string;
  opengraphType?: string;
  metaRobotsNofollow?: string;
  metaRobotsNoindex?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterTitle?: string;
}

interface Robots {
  nofollow?: string;
  noindex?: string;
}

interface Post {
  metaTitle?: string;
  metaDescription?: string;
  readingTime?: string;
  canonical?: string;
  og?: SeoData;
  article?: {
    author?: string;
    modifiedTime?: string;
    publishedTime?: string;
    publisher?: string;
  };
  robots?: Robots;
  twitter?: {
    description?: string;
    image?: string;
    title?: string;
  };
  // ... (Any other Post properties you may have)
}

interface GetPostBySlugResult {
  post?: Post;
}

import { ApolloClient, ApolloQueryResult } from '@apollo/client';

export async function getPostBySlug(slug: string): Promise<GetPostBySlugResult> {
  const apolloClient: ApolloClient<any> = getApolloClient();
  const apiHost: string = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT || "").host;

  let postData: ApolloQueryResult<any>; // Consider replacing any with the actual type of your GraphQL response
  let seoData: ApolloQueryResult<any>; // Same as above

  try {
    postData = await apolloClient.query({
      query: QUERY_POST_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e: any) {
    console.log(`[posts][getPostBySlug] Failed to query post data: ${e.message}`);
    throw e;
  }

  if (!postData?.data.post) return { post: undefined };

  const post: Post = [postData?.data.post].map(mapPostData)[0];

  if (process.env.WORDPRESS_PLUGIN_SEO === 'true') { // Process.env variables are always string or undefined
    try {
      seoData = await apolloClient.query({
        query: QUERY_POST_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (e: any) {
      console.log(`[posts][getPostBySlug] Failed to query SEO plugin: ${e.message}`);
      console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      throw e;
    }

    const seo: SeoData = (seoData?.data?.post?.seo || {}) as SeoData; // Asserting the type to SeoData

    post.metaTitle = seo.title;
    post.metaDescription = seo.metaDesc;
    post.readingTime = seo.readingTime;

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      post.canonical = seo.canonical;
    }

    post.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    post.article = {
      author: post.og.author,
      modifiedTime: post.og.modifiedTime,
      publishedTime: post.og.publishedTime,
      publisher: post.og.publisher,
    };

    post.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    post.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    post,
  };
}

/**
 * getAllPosts
 */

const allPostsIncludesTypes = {
  all: QUERY_ALL_POSTS,
  archive: QUERY_ALL_POSTS_ARCHIVE,
  index: QUERY_ALL_POSTS_INDEX,
};

type QueryIncludes = 'all' | 'archive' | 'index';

type Options = {
  queryIncludes?: QueryIncludes;
};

type PostNode = {
  // Define the expected properties of your posts here.
  // I'm making an example, but you should adjust it to your real data structure.
  title?: string;
  content?: string;
  // ... other post properties
};

type AllPostsResponse = {
  posts: {
    edges: Array<{ node: PostNode }>;
  };
};

type GetAllPostsResult = {
  posts: PostNode[];
};

export async function getAllPosts(options: Options = {}): Promise<GetAllPostsResult> {
  const { queryIncludes = 'index' } = options;

  const apolloClient: ApolloClient<any> = getApolloClient(); // If you have a specific type for the client, replace 'any' with that.

  const data: { data: AllPostsResponse } = await apolloClient.query({
    query: allPostsIncludesTypes[queryIncludes],
  });

  const posts: PostNode[] = data?.data.posts.edges.map(({ node = {} }) => node) || [];

  return {
    posts: posts.map(mapPostData),
  };
}

/**
 * getPostsByAuthorSlug
 */

const postsByAuthorSlugIncludesTypes = {
  all: QUERY_POSTS_BY_AUTHOR_SLUG,
  archive: QUERY_POSTS_BY_AUTHOR_SLUG_ARCHIVE,
  index: QUERY_POSTS_BY_AUTHOR_SLUG_INDEX,
};

export async function getPostsByAuthorSlug({ slug, ...options }) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  let postData;

  try {
    postData = await apolloClient.query({
      query: postsByAuthorSlugIncludesTypes[queryIncludes],
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`[posts][getPostsByAuthorSlug] Failed to query post data: ${e.message}`);
    throw e;
  }

  const posts = postData?.data.posts.edges.map(({ node = {} }) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

/**
 * getPostsByCategoryId
 */

const postsByCategoryIdIncludesTypes = {
  all: QUERY_POSTS_BY_CATEGORY_ID,
  archive: QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE,
  index: QUERY_POSTS_BY_CATEGORY_ID_INDEX,
};

export async function getPostsByCategoryId({ categoryId, ...options }) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  let postData;

  try {
    postData = await apolloClient.query({
      query: postsByCategoryIdIncludesTypes[queryIncludes],
      variables: {
        categoryId,
      },
    });
  } catch (e) {
    console.log(`[posts][getPostsByCategoryId] Failed to query post data: ${e.message}`);
    throw e;
  }

  const posts = postData?.data.posts.edges.map(({ node = {} }) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

/**
 * getRecentPosts
 */
type OptionsType = {
  queryIncludes?: 'index' | 'archive' | 'all';  // Add other possible string literals as needed
  [key: string]: any;  // For any other properties
};

type GetRecentPostsArgs = {
  count: number;
  options?: OptionsType;
};

type GetRecentPostsReturn = {
  posts: Post[];
};

export async function getRecentPosts({ count, options }: GetRecentPostsArgs): Promise<GetRecentPostsReturn> {
  const { posts } = await getAllPosts(options);
  const sorted = sortObjectsByDate(posts);
  return {
    posts: sorted.slice(0, count),
  };
}

/**
 * sanitizeExcerpt
 */

export function sanitizeExcerpt(excerpt: any) {
  if (typeof excerpt !== 'string') {
    throw new Error(`Failed to sanitize excerpt: invalid type ${typeof excerpt}`);
  }

  let sanitized = excerpt;

  // If the theme includes [...] as the more indication, clean it up to just ...

  sanitized = sanitized.replace(/\s?\[&hellip;\]/, '&hellip;');

  // If after the above replacement, the ellipsis includes 4 dots, it's
  // the end of a setence

  sanitized = sanitized.replace('....', '.');
  sanitized = sanitized.replace('.&hellip;', '.');

  // If the theme is including a "Continue..." link, remove it

  sanitized = sanitized.replace(/\w*<a class="more-link".*<\/a>/, '');

  return sanitized;
}

/**
 * mapPostData
 */

export function mapPostData(post = {}) {
  const data = { ...post };

  // Clean up the author object to avoid someone having to look an extra
  // level deeper into the node

  if (data.author) {
    data.author = {
      ...data.author.node,
    };
  }

  // The URL by default that comes from Gravatar / WordPress is not a secure
  // URL. This ends up redirecting to https, but it gives mixed content warnings
  // as the HTML shows it as http. Replace the url to avoid those warnings
  // and provide a secure URL by default

  if (data.author?.avatar) {
    data.author.avatar = updateUserAvatar(data.author.avatar);
  }

  // Clean up the categories to make them more easy to access

  if (data.categories) {
    data.categories = data.categories.edges.map(({ node }) => {
      return {
        ...node,
      };
    });
  }

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  return data;
}

/**
 * getRelatedPosts
 */

export async function getRelatedPosts(categories, postId, count = 5) {
  if (!Array.isArray(categories) || categories.length === 0) return;

  let related = {
    category: categories && categories.shift(),
  };

  if (related.category) {
    const { posts } = await getPostsByCategoryId({
      categoryId: related.category.databaseId,
      queryIncludes: 'archive',
    });

    const filtered = posts.filter(({ postId: id }) => id !== postId);
    const sorted = sortObjectsByDate(filtered);

    related.posts = sorted.map((post) => ({ title: post.title, slug: post.slug }));
  }

  if (!Array.isArray(related.posts) || related.posts.length === 0) {
    const relatedPosts = await getRelatedPosts(categories, postId, count);
    related = relatedPosts || related;
  }

  if (Array.isArray(related.posts) && related.posts.length > count) {
    return related.posts.slice(0, count);
  }

  return related;
}

/**
 * sortStickyPosts
 */

export function sortStickyPosts(posts: any) {
  return [...posts].sort((post) => (post.isSticky ? -1 : 1));
}

/**
 * getPostsPerPage
 */

export async function getPostsPerPage() {
  //If POST_PER_PAGE is defined at next.config.js
  if (process.env.POSTS_PER_PAGE) {
    console.warn(
      'You are using the deprecated POST_PER_PAGE variable. Use your WordPress instance instead to set this value ("Settings" > "Reading" > "Blog pages show at most").'
    );
    return Number(process.env.POSTS_PER_PAGE);
  }

  try {
    const apolloClient = getApolloClient();

    const { data } = await apolloClient.query({
      query: QUERY_POST_PER_PAGE,
    });

    return Number(data.allSettings.readingSettingsPostsPerPage);
  } catch (e) {
    console.log(`Failed to query post per page data: ${e.message}`);
    throw e;
  }
}

/**
 * getPageCount
 */

export async function getPagesCount(posts: Post[], postsPerPage?: number): Promise<number> {
  const _postsPerPage = postsPerPage ?? (await getPostsPerPage());
  return Math.ceil(posts.length / _postsPerPage);
}

/**
 * getPaginatedPosts
 */

type PaginatedPostsOptions = {
  currentPage?: number;
  [key: string]: any; // for other options like 'queryIncludes' etc.
};

type PaginatedPostsResult = {
  posts: any[]; // Ideally, replace 'any' with the actual post type
  pagination: {
    currentPage?: number;
    pagesCount: number;
  };
};

export async function getPaginatedPosts(options: PaginatedPostsOptions = {}): Promise<PaginatedPostsResult> {
  const { currentPage = 1, ...otherOptions } = options;

  const { posts } = await getAllPosts(otherOptions);
  console.log("These are all the posts on the server side from getPaginatedPosts", posts);
  const postsPerPage = await getPostsPerPage();
  const pagesCount = await getPagesCount(posts, postsPerPage);

  let page = Number(currentPage);

  if (typeof page === 'undefined' || isNaN(page)) {
    page = 1;
  } else if (page > pagesCount) {
    return {
      posts: [],
      pagination: {
        currentPage: undefined,
        pagesCount,
      },
    };
  }

  const offset = postsPerPage * (page - 1);
  const sortedPosts = sortStickyPosts(posts);

  return {
    posts: sortedPosts.slice(offset, offset + postsPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}


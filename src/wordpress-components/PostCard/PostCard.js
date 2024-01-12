import Link from 'next/link';
import Image from 'next/image';
import { postPathBySlug, sanitizeExcerpt } from '../../lib/posts';

import Metadata from '../../wordpress-components/Metadata';
import FeaturedImage from '../../wordpress-components/FeaturedImage';
import { FaMapPin } from 'react-icons/fa';
import styles from './PostCard.module.scss';
import axios from 'axios';

const PostCard = ({ post, options = {} }) => {
  // console.log("This is the post coming in on the card:", post);
  const { title, excerpt, slug, date, author, categories, FeaturedImage, isSticky = false } = post;

  console.log('This is the post we are getting on the PstCard:', post);

  const featuredImageSource = post.featuredImage?.sourceUrl ? post.featuredImage.sourceUrl : 'https://www.api.sirsuds.com/wp-content/uploads/2023/09/why-us.webp';
  const featuredImageCaption = post.featuredImage && post.featuredImage.node ? post.featuredImage.node.caption : '';

  const { excludeMetadata = [] } = options;

  const metadata = {};

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }

  let postCardStyle = styles.postCard;

  if (isSticky) {
    postCardStyle = `${postCardStyle} ${styles.postCardSticky}`;
  }

  // console.log("this is the featuredImageUrl", FeaturedImage);

  return (
    <div
      className={`${
        featuredImageSource ? 'lg:h-[420px]' : 'lg:h-[250px]'
      } h-[420px] md:h-[350px] bg-secondary/20 shadow-inner shadow-lg hover:shadow-none duration-500 rounded-lg flex flex-col gap-3 `}
    >
      {isSticky && <FaMapPin aria-label="Sticky Post" />}
      {featuredImageSource && (
        <Link href={postPathBySlug(slug)}>
          <div className="h-56 w-full overflow-hidden">
            <Image
              className="bg-contain overflow-hidden rounded-t-lg w-full"
              height={350}
              width={450}
              src={featuredImageSource}
              alt={featuredImageCaption ? featuredImageCaption : 'Featured image of blog post.'}
            ></Image>
          </div>
        </Link>
      )}
      <Link href={postPathBySlug(slug)}>
        <h3
          className="px-4 text-2xl font-medium text-black"
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
      </Link>
      {/* <Metadata className={styles.postCardMetadata} {...metadata} /> */}
      {excerpt && (
        <div
          className="px-4 line-clamp-3 text-black"
          dangerouslySetInnerHTML={{
            __html: sanitizeExcerpt(excerpt),
          }}
        />
      )}
    </div>
  );
};

export default PostCard;

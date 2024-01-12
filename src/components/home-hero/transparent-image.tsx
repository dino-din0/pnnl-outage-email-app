// Speed notes on images

// Couldn't get tailwind background image to work, sticking with Next Image
// Fastest combo found is to use the 1920 X 1080 image, convert to WebP, and use the next/image component with priority and layout fill
// Next Image is the fastest way to load images, but it's not the easiest to work with

// Also note that Vercel's dev domain does not serve content nearly as fast as a custom domain, so when testing don't stress too much about load times that may appear slow

import HeroImage from '../../../public/backgrounds/background-one.webp';
import { buttonVariants } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TransparentImage() {
  const router = useRouter();
  const href = router.pathname;

  return (
    <div className="relative -mt-24 z-0 h-[900px]" >
      <div className="radialContainer"></div>
      <Image
        priority={true}
        layout="fill"
        className="object-center object-cover pointer-events-none"
        src={HeroImage}
        alt="Home Page Hero Image"
      />
      <div className="relative z-10 pt-56 py-28 container flex flex-col items-center">
        <div className="flex w-fit xl:w-[1500px] flex-col items-center gap-2">
          <h1 className="text-4xl text-cws-dark mt-8 md:mt-0 font-extrabold text-cws-dark text-center leading-tight md:text-5xl lg:text-[85px] tracking-wider text-white drop-shadow-2xl">
            <div className="md:py-2">
              Simple Hero
              <br className="hidden sm:inline" />
            </div>
            <div className=" capitalize ">Cleaning in Tri-Cities</div>
          </h1>
        </div>
        <div className="flex xl:w-[900px] font-medium flex-col text-center mb-10">
          <h2 className="flex text-md text-center items-center tracking-wide leading-tight text-xl md:text-2xl  font-bold text-cws-dark tracking-wide text-white mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, ducimus.
          </h2>
          <h3 className="text-center items-center tracking-wide leading-tight text-xl md:text-2xl gap-2 font-bold tracking-wide text-cws-blue mt-6">
            Lorem ipsum dolor sit amet consectetur.
          </h3>
        </div>
        <div className="md:flex text-center justify-around md:flex-row  grid-cols-2">
          <Link
            target="_blank"
            rel="noreferrer"
            href="/"
            className={`${buttonVariants({
              variant: 'default',
              size: 'lg',
            })} h-14 text-lg md:text-2xl font-extrabold hover:border w-40 md:w-72 xl:w-96 md:ml-0 md:mr-10 drop-shadow-xl rounded-3xl capitalize mx-2 md:mx-0`}
          >
            Try us today!
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href="/"
            className={`${buttonVariants({
              variant: 'defaultOutline',
              size: 'lg',
            })} border h-14 text-lg md:text-2xl font-extrabold border-2 w-40 md:w-72 xl:w-96 drop-shadow-xl mx-2 md:mx-0`}
          >
            Our Prices
          </Link>
        </div>
      </div>
    </div>
  );
}

// import HeroImage from "../../../public/backgrounds/home-background.webp";
import heroCheck from '../../../public/hero-check.svg';
import { buttonVariants } from '../../components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function ThreeCardHighlightHero() {
  return (
    <div className="h-[800px] md:h-[780px] sm:h-screen/50 xl:h-[690px] relative -mt-6 ">
      <div className="w-full pt-10">
        {/* <Image
          src={HeroImage}
          alt="Background image of Sir Sud's Laundromat showing the old dryers before it was renovated"
          layout="fill"
          objectFit="cover"
          priority={true}
          quality={100}
          className=""
        /> */}
        <div className="relative flex w-full container ">
          <div className="py-32 container flex items-center justify-center gap-24 ">
            <div className="flex w-fit xl:w-[700px] flex-col items-start justify-center mt-10 md:-mt-16 pb-6">
              <h1 className="text-6xl md:mt-4 md:mt-0 font-bold text-center md:text-start leading-tight md:text-7xl tracking-wider text-white w-full capitalize drop-shadow-2xl mb-4">
                #1 Rated Local Laundry Services
              </h1>
              <h2 className="hidden md:flex z-0 text-xl md:mt-4 md:mt-0 font-medium text-white text-start leading-tight tracking-wider text-white drop-shadow-2xl w-full capitalize">
                Providing the nicest, cleanest, safest and largest self-serve and laundry services in Central and West
                Richland.
              </h2>
              <ul className="ml-6 md:ml-0 gap-4 mt-4 flex flex-col text-white px-2 md:px-0">
                <li className="flex text-2xl font-bold items-center gap-4 capitalize">
                  <div>
                    <Image src={heroCheck} alt="Blue check award" className="h-6 w-6"></Image>
                  </div>
                  <div className="w-full">Incredibly Friendly Customer Service</div>
                </li>
                <li className="flex text-2xl font-bold items-center gap-4 capitalize">
                  <div>
                    <Image src={heroCheck} alt="Blue check award" className="h-6 w-6"></Image>
                  </div>
                  <div className="w-full">Superior ratings on Google</div>
                </li>
                <li className="flex text-2xl font-bold items-center gap-4 capitalize">
                  <div>
                    <Image src={heroCheck} alt="Blue check award" className="h-6 w-6"></Image>
                  </div>
                  <div className="w-full">Professional Wash and Fold services</div>
                </li>
              </ul>
              <div className="flex ml-16 md:ml-0 text-center justify-around md:flex-row md:text-start drop-shadow-xl">
                <Link
                  rel="noreferrer"
                  href="/our-location"
                  className={`${buttonVariants({
                    variant: 'default',
                    size: 'xsm',
                  })} w-56 text-black h-16 rounded-xl text-xl mt-8 border radius-4 border-white shadow-2xl`}
                >
                  Visit Us Today
                </Link>
              </div>
            </div>
            <div className="hidden xl:flex animate-fade-in-from-right text-5xl -mt-36 w-fit flex flex-col gap-4 text-white h-64 bg-primary/90 rounded-3xl shadow-2xl justify-center text-center items-center shadow-inner shadow-2xl">
              <div className="text-5xl font-bold uppercase text-white px-4">big changes </div>
              <div className="text-2xl font-medium w-full capitalize text-white">are coming to Sir Suds</div>
              <Link
                rel="noreferrer"
                href="/whats-happening"
                className={`${buttonVariants({
                  variant: 'defaultOutline',
                  size: 'xsm',
                })} w-fit h-[45px] my-2 bg-primaryDark rounded-xl text-xl text-white border border-primary border-3 radius-4 shadow-2xl duration-500`}
              >
                Find out whats coming
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

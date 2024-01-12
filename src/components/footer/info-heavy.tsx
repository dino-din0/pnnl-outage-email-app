import HeroImage2 from '../../../public/backgrounds/background-one.png';
import HeroImage from '../../../public/backgrounds/background-one.png';
import { buttonVariants } from '../ui/button';

import {
  Check,
  CheckCircle,
  Copyright,
  Mail,
  MapPin,
  PersonStanding,
  Phone,
  User2,
  Facebook,
  Instagram,
  Linkedin,
  PhoneCall,
  FacebookIcon,
  InstagramIcon,
  Clipboard,
  FileQuestion,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { siteConfig } from '@/config/site';

export default function AllOutFooterSection() {
  const router = useRouter();
  const href = router.pathname;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="">
      <div className="bg-gray-800 h-full text-white w-full md:px-0 pt-16">
        <div className="h-fit lg:h-[350px] container flex flex-row flex-wrap justify-between">
          <div className="flex-col w-full sm:w-1/2 lg:w-1/5">
            <div className="text-2xl font-bold">Links</div>
            <ul className="my-6 flex flex-col gap-3">
              {siteConfig.mainNav.map((item) => (
                <li>{item.href && <Link href={item.href}>{item.title}</Link>}</li>
              ))}
            </ul>
          </div>
          <div className="flex-col w-full sm:w-1/2 lg:w-1/5">
            <div className="text-2xl font-bold">Our Services</div>
            <ul className="my-6 flex flex-col gap-3">
              {siteConfig.services.map((item) => (
                <li>{<Link href={'/services'}>{item}</Link>}</li>
              ))}
            </ul>
          </div>
          <div className="flex-col w-full sm:w-1/2 lg:w-1/5 lg:mr-10 mt-10 lg:mt-0">
            <div className="text-2xl font-bold">Contact Info</div>
            <ul className="my-2 flex flex-col gap-4">
              <li className="flex items-center md:-ml-1 md:mr-4 my-2">
                <MapPin size={40} color="red" className="md:mr-2"></MapPin> {siteConfig.address}
              </li>
              <li className="flex items-center md:mr-4 my-2">
                <PhoneCall size={30} color="red" className="mr-2"></PhoneCall> {siteConfig.phone}
              </li>
              <li className="flex items-center md:mr-4 my-2">
                <Mail size={30} color="red" className="mr-2"></Mail> {siteConfig.email}
              </li>
            </ul>
          </div>
          <div className="flex-col w-full sm:w-1/2 lg:w-1/3 mt-10 lg:mt-0">
            <div className="text-2xl font-bold capitalize">Reach out to us</div>
            <ul className="my-6 flex flex-col gap-3">
              <li className="flex">
                <div>
                  <FileQuestion size={60} className="bg-cws-blue px-2 py-2 rounded-lg"></FileQuestion>
                </div>
                <div className="flex flex-col ml-4">
                  <div className="text-2xl font-bold">GET A QUOTE TODAY</div>
                  <div>No obligations :D</div>
                </div>
              </li>
              <li className="flex">
                <div>
                  <FileQuestion size={60} className="bg-cws-blue px-2 py-2 rounded-lg"></FileQuestion>
                </div>
                <div className="flex flex-col ml-4">
                  <div className="text-2xl font-bold">Call us today :D</div>
                  <div>{siteConfig.phone}</div>
                </div>
              </li>
              <li className="text-sm mt-4 w-[70%]">
                By using this site, you agree to our{" "}
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://policies.google.com/privacy"
                  className="text-cws-blue"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden md:flex h-[1px] bg-gray-200 px-2 w-full container my-4 lg:my-0"></div>
        <div className="flex flex-col md:flex-row justify-between container">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex ">
              <Image
                height={250}
                width={250}
                className="pointer-events-none rounded-2xl my-4 scale-90 md:scale-100 border border-4 border-white"
                src={HeroImage2}
                alt="Home Page Hero Image"
              />
            </div>
            <div className="mx-16">
              <Image
                height={150}
                width={150}
                className="pointer-events-none rounded-2xl my-4 scale-90 md:scale-100 border border-4 border-white"
                src={HeroImage2}
                alt="Home Page Hero Image"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <FacebookIcon size={40} className="bg-cws-blue px-2 py-2 rounded-lg"></FacebookIcon>
            <InstagramIcon size={40} className="bg-cws-blue py-2 rounded-lg"></InstagramIcon>
            <Linkedin size={40} className="bg-cws-blue py-2 rounded-lg"></Linkedin>
          </div>
        </div>
        <div className="bg-neutral text-black mt-10">
          <div className="container  flex flex-col md:flex-row capitalize justify-around items-center">
            <div className="flex items-center md:mr-4 my-2">
              <Copyright size={20} color="black" className="mr-2"></Copyright> {siteConfig.name} {currentYear}, All
              rights reserved
            </div>
            <div>
              website design by: <Link href={'/design-credit'}>Cascade Web Solutions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

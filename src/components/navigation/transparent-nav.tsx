import Logo from '../../../public/logo/main-logo-white.svg';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types/nav';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Icons } from '../ui/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu-white';
import { Button, buttonVariants } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import whatWeDoNavbarImage from '../../../public/backgrounds/background-one.png';

interface MainNavProps {
  items?: NavItem[];
  href: string;
}

const dropDownItems: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 IOS-black rounded-md p-3 leading-none no-underline outline-none transition-colors ',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-3 text-sm leading-snug text-slate-500 dark:text-slate-400">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

export function TransparentNav({ items, href }: MainNavProps) {
  const [sticky, setSticky] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1280) {
        setSticky(window.pageYOffset > 40);
        setShowButtons(false);
      }

      if (window.pageYOffset > 700) {
        setShowButtons(true);
        // console.log('We should be showing buttons');
      }

      if (window.pageYOffset < 700) {
        setShowButtons(false);
        // console.log('We should NOT be showing buttons');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const router = useRouter();

  return (
    <header
      className={`${'top-0 flex flex-wrap justify-center h-24 md:h-32 lg:h-28 md:pt-0 items-center text-2xl transition duration-500 bg-transparent container'}`}
    >
      <div className="container flex flex-row justify-between items-center z-20">
        <Link href="/" className="items-center flex space-x-2 text-sm sm:text-2xl" aria-label="Sir Suds Logo">
          <Image
            width={80}
            className="hidden lg:block object-center object-cover pointer-events-none"
            src={Logo}
            alt="Sir Suds Logo"
          />
        </Link>
        <NavigationMenu className="hidden lg:flex justify-center items-center mx-10">
          <NavigationMenuList className="flex gap-3">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:text-cws-blue m-0 p-0 text-lg text-slate-600 data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent">
                <Link
                  href="/what-we-do"
                  className={cn(
                    'flex items-center font-normal px-1.5 text-lg IOS-white capitalize',
                    router.pathname === '/what-we-do' &&
                      'hover:text-cws-blue IOS-blue cursor-default underline decoration-cws-blue decoration-4 underline-offset-8 capitalize'
                  )}
                >
                  Items
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {dropDownItems.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      className="py-0 my-0 hover:bg-gray-100"
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden xl:flex .animate-fade-in mr-2">
              <div className="relative">
                <NavigationMenuTrigger className="hover:text-cws-blue m-0 p-0 text-lg text-slate-600 data-[state=open]:bg-transparent">
                  <Link
                    href="/what-we-do"
                    className={cn(
                      'flex items-center font-normal px-1.5 text-lg IOS-white capitalize ',
                      router.pathname === '/what-we-do' &&
                        'hover:text-cws-blue IOS-blue cursor-default underline decoration-cws-blue decoration-4 underline-offset-8 capitalize'
                    )}
                  >
                    What we do
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="animate-slide-in-from-right-52 max-h-80">
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex w-full select-none flex-col justify-end rounded-md no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Image
                            className="p-0 m-0 rounded-t-lg w-full h-full"
                            src={whatWeDoNavbarImage}
                            alt="What We Do Navbar Image"
                          ></Image>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem
                      href="/what-we-do/web-development"
                      title="Web Development"
                      className="py-0 my-0 hover:bg-gray-100"
                    >
                      Our team designs, builds, prototypes, tests and optimizes websites for our customers
                    </ListItem>
                    <ListItem
                      href="/what-we-do/search-engine-optimization"
                      title="Search Engine Optimization"
                      className="py-0 my-0 hover:bg-gray-100"
                    >
                      On-page, off-page, technical and performance SEO solutions to increase site traffic
                    </ListItem>
                    <ListItem
                      href="/what-we-do/coaching-calls"
                      title="Online Business Coaching"
                      className="py-0 my-0 hover:bg-gray-100"
                    >
                      We help you establish a web presence that keeps up with modern trends and connects you with
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
          {items?.length ? (
            <nav className="hidden gap-3 lg:flex">
              {items?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        'flex items-center font-normal px-1.5 text-lg IOS-white capitalize ',
                        router.pathname === item.href &&
                          'hover:text-cws-blue IOS-blue cursor-default underline decoration-cws-blue decoration-4 underline-offset-8 capitalize'
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
        </NavigationMenu>
        <div className="hidden lg:flex text-center -ml-2 ">
          <Link
            target="_blank"
            rel="noreferrer"
            href="/get-started"
            className={`${buttonVariants({
              variant: 'default',
              size: 'xsm',
            })} w-fit px-6 rounded-md text-sm h-10`}
          >
            Our Prices
          </Link>
        </div>
        <div className="w-full h-fit flex lg:hidden text-center items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="" aria-label="Navigation button">
              <Button variant="ghost" className=" mt-3 text-base hover:bg-transparent focus:ring-0">
                <Icons.menu className="h-10 w-10 text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={24} className="w-[300px]">
              <DropdownMenuLabel>
                <Link href="/" className="flex items-center" aria-label="Navigation button">
                  <Image
                    width={100}
                    className="object-center object-cover pointer-events-none"
                    src={Logo}
                    alt="Sir Suds Logo"
                  />
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {items?.map(
                (item, index) =>
                  item.href && (
                    <DropdownMenuItem key={index} asChild>
                      <Link href={item.href}>{item.title}</Link>
                    </DropdownMenuItem>
                  )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/" className="items-center flex space-x-2 text-sm sm:text-2xl" aria-label="Navigation button">
            <Image
              width={70}
              className="object-center object-cover pointer-events-none"
              src={Logo}
              alt="Sir SudsLogo"
            />
          </Link>
        </div>
      </div>

      {/* SCROLLXYZ - This is the div to comment out if desired */}
      <div
        className={`fixed flex flex-col-1 inset-x-0 top-0 h-28 w-full justify-center text-2xl items-start transition duration-300 z-0 drop-shadow-lg px-5 bg-primaryDark transition-all duration-300  ${
          showButtons ? 'opacity-100 z-50 visible delay-300' : 'opacity-0 z-0 invisible delay-0'
        }`}
      >
        <div className="container hidden lg:block h-10 xl:container items-start pt-4">
          <div className="flex justify-between">
            <div className="flex items-center justify-center w-[70%] gap-8">
              <div className="w-full flex flex-col text-start items-start justify-center">
                <p className="text-3xl font-bold mt-1 text-white">Visit Us Today!</p>
                <p className="text-[15px] font-bold capitalize mt-2 text-white">
                  find out why we are Richland&apos;s top-rated and Fastest growing laundry service
                </p>
              </div>
            </div>
            <div className="w-1/3 flex text-center items-center justify-center gap-6">
              <div className="flex text-center items-center justify-center">
                <Link href={'/our-location'}>
                  <Button
                    className={`${buttonVariants({
                      variant: 'default',
                      size: 'lg',
                    })} w-36 text-xl bg-primary border-white border border-2 capitalize rounded-lg w-44 xl:w-56 h-12 mt-2`}
                  >
                    Visit Us Today
                  </Button>
                </Link>
              </div>
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild className="">
                  <Button
                    variant="ghost"
                    className=" mt-3 text-base hover:bg-transparent focus:ring-0"
                  >
                    <Icons.menu className="h-10 w-10 text-black" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={24}
                  className="w-[300px] absolute"
                >
                  <DropdownMenuLabel>
                    <Link href="/" className="flex items-center">
                      <Image
                        width={150}
                        className="object-center object-cover pointer-events-none"
                        src={Logo}
                        alt="Sir SudsLogo"
                      />
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={"/what-we-do"}>What We Do</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={"/pricing"}>Pricing</Link>
                  </DropdownMenuItem>
                  {items?.map(
                    (item, index) =>
                      item.href && (
                        <DropdownMenuItem key={index} asChild>
                          <Link href={item.href}>{item.title}</Link>
                        </DropdownMenuItem>
                      )
                  )}
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
          </div>
        </div>
        <div className="flex lg:hidden items-center justify-between gap-24 sm:gap-80 md:gap-96 mt-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="" aria-label="Navigation button">
              <Button variant="ghost" className=" mt-3 text-base hover:bg-transparent focus:ring-0">
                <Icons.menu className="h-10 w-10 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={24} className="w-[300px]">
              <DropdownMenuLabel>
                <Link href="/" className="flex items-center" aria-label="Navigation button">
                  <Image
                    width={100}
                    className="object-center object-cover pointer-events-none"
                    src={Logo}
                    alt="Sir SudsLogo"
                  />
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {items?.map(
                (item, index) =>
                  item.href && (
                    <DropdownMenuItem key={index} asChild>
                      <Link href={item.href}>{item.title}</Link>
                    </DropdownMenuItem>
                  )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={'/our-location'}>
            <Button
              className={`${buttonVariants({
                variant: 'default',
                size: 'lg',
              })} w-36 text-xl bg-primary border-white border border-2 capitalize rounded-lg w-44 xl:w-56 h-12 mt-2`}
            >
              Visit Us Today
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

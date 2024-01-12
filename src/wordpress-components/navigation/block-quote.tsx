import { cn } from '@/lib/utils';
import { NavItem } from '@/types/nav';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationMenu, NavigationMenuLink } from '../../components/ui/navigation-menu';
import { Button, buttonVariants } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Icons } from '../../components/ui/icons';

interface MainNavProps {
  items?: NavItem[];
  href: string;
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100',
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

export function BlockyWithQuoteNav({ items }: MainNavProps) {
  const [sticky, setSticky] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return; // If window is not defined, we're on the server, so just return
    }

    const handleScroll = () => {
      if (window.innerWidth >= 1280) {
        setSticky(window.pageYOffset > 0);
        setShowButtons(false);
      }

      setShowButtons(window.pageYOffset > 700);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const router = useRouter();

  return (
    <div
      className={`${'top-0 flex flex-col-1 pt-4 flex-wrap container justify-center h-24 md:h-32 lg:h-28 md:pt-0 items-center text-2xl transition duration-500 bg-white sm:rounded'}`}
    >
      <div className="container flex flex-row justify-between items-center z-20 -mt-2">
        <Link href="/" className="items-center flex space-x-2 text-sm sm:text-2xl" aria-label="Sir Suds Logo">
          <Image
            width={100}
            height={100}
            className="hidden xl:block object-center object-cover pointer-events-none"
            src="/logo/main-logo.svg"
            alt="Sir Suds Logo"
          />
        </Link>
        <NavigationMenu className="hidden md:flex justify-center items-center xl:mx-10">
          {items?.length ? (
            <nav className="hidden gap-4 md:flex ">
              {items?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        'flex items-center font-medium px-1.5 text-xl text-primary hover:text-secondary/90 duration-300',
                        (router.pathname === item.href || (item.href !== '/' && router.pathname.includes(item.href))) &&
                          'text-primaryDark underline decoration-4 underline-offset-8 cursor-default hover:text-primaryDark'
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
        </NavigationMenu>
        <div className="xl:flex hidden text-center -ml-2 -mt-7">
          <Link
            rel="noreferrer"
            href="/our-location"
            className={`${buttonVariants({
              variant: 'default',
              size: 'xsm',
            })} w-36 md:w-72 text-black h-16 rounded-xl text-xl mt-8 border radius-4 border-white shadow-2xl`}
          >
            Visit Us Today
          </Link>
        </div>
        <div className="w-full h-fit flex md:hidden text-center items-center justify-between">
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
                    height={100}
                    className="object-center object-cover pointer-events-none"
                    src="/logo/main-logo.svg"
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
              height={70}
              className="object-center object-cover pointer-events-none"
              src="/logo/main-logo.svg"
              alt="Sir SudsLogo"
            />
          </Link>
        </div>
      </div>

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
            <div className="w-1/3 flex text-center items-center justify-end gap-6">
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
                    src="/logo/main-logo.svg"
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
    </div>
  );
}

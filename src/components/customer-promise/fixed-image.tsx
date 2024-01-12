import HeroImage from "../../../public/backgrounds/background-one.png";
import Logo from "../../../public/logo/main-logo.svg";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FixedImageCallToAction() {
  const router = useRouter();
  const href = router.pathname;

  return (
    <div className="relative max-h-[790px] h-[790px]">
      <div
        className="flex flex-col justify-center items-center text-5xl text-black "
        style={{
          position: "relative",
          height: "50vh",
          width: "100%",
          clipPath: "inset(0 0 0 0)",
        }}
      >
        <Image
          width={300}
          className="object-center object-cover pointer-events-none z-20 mt-4"
          src={Logo}
          alt="Cascade Web Solutions Logo"
        />
        <div className="z-20 my-4 font-bold">
          WE GUARANTEE 100% SATISFACTION!
        </div>
        <div className="z-20">
          Try Castle Rock&apos;s Best Window Cleaning Risk-Free Today
        </div>
        <Link
          target="_blank"
          rel="noreferrer"
          href="/get-started"
          className={`${buttonVariants({
            variant: "default",
            size: "xsm",
          })} md:w-36 text-sm z-20 my-10`}
        >
          Get Started
        </Link>
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            left: "0",
            top: "0",
          }}
        >
          <Image
            src={HeroImage}
            layout="fill"
            objectFit="cover"
            sizes="100vw"
            alt="test!"
          />
        </div>
      </div>
    </div>
  );
}

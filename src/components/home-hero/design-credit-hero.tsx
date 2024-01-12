import CWSLogo from "../../../public/logo/logo-with-slogan.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DesignCreditHero() {
  const router = useRouter();
  const href = router.pathname;

  return (
    <div className="h-full sm:h-screen/50 sm:h-full -mt-6 bg-gray-200 py-12 md:py-28 xl:py-36">
      <div className="container ">
        <div className="px-2 xl:px-24 flex flex-col lg:flex-row items-center justify-center h-full gap-10">
          <div className="w-full lg:w-1/2 flex flex-col h-full text-center items-center justify-center gap-16">
            <Image
              src={CWSLogo}
              height={300}
              width={1000}
              alt="Cascade Web Solutions' logo"
            ></Image>
            <div className="hidden lg:flex text-4xl font-bold capitalize text-cws-dark">
              Pacific Northwest&apos;s premier web design agency
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col h-full text-center gap-6 items-center justify-center">
            <h1 className="text-4xl font-bold text-cws-dark capitalize">
              <span className="text-cws-blue">Next Generation websites</span> for local and small businesses
            </h1>
            <h2 className="text-2xl font-medium IOS-black">
              Don&apos;t get left behind in the times
            </h2>
            <div className="w-[20%] bg-cws-blue h-1"></div>
            <h3 className="text-xl IOS-black">
              We provide superior design, higher google rankings, website customization, faster mobile
              speeds, and advanced features, that outperform the competition in
              every way.
            </h3>
            <Link
              target="_blank"
              href={"https://www.cascadewebsolutions.co/"}
              className="h-20 mt-6 flex flex-col px-6 items-center justify-center text-3xl capitalize drop-shadow-xl md:mx-0 bg-cws-blue text-white hover:bg-cws-blue-dark duration-300 rounded-md font-medium"
            >
              See what our business offers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

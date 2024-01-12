import { buttonVariants } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import fourOfour from '../../../public/500-error.svg';


export default function FourOFourHero() {
  return (
    <div className="h-[700px] md:h-[600px] xl:h-[550px] sm:h-screen/50 xl:h-[350px] -mt-6 bg-gray-200 py-10">
      <div className="w-full ">
        <div className="container flex flex-col items-center justify-center">
          <div className="container z-10 flex flex-col text-center justify-center items-center md:mt-0 ">
            <Image className='h-56' src={fourOfour} alt="Image of a 404 indicating that the page was not found"></Image>
            <h1 className="text-5xl font-medium my-6 flex flex-col capitalize gap-4">
              <div className="text-cws-dark">Oops! Page not found!</div>
            </h1>
            <h5 className="w-[80%] md:w-[60%] text-lg font-medium">
              Looks like we can&apos;t seem to find the page you are looking for. Try going back to the previous page or
              contacting us if the issue persists.
            </h5>
            <Link
              rel="noreferrer"
              href="/"
              className={`${buttonVariants({
                variant: 'default',
                size: 'lg',
              })} my-10 mx-2 w-40 border drop-shadow-xl duration-300 md:mx-0 md:w-60`}
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

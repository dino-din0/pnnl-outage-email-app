import { buttonVariants } from '../../components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import fourOfour from '../../../public/404.svg';

export default function FiveHundredHero() {
  return (
    <div className="h-[700px] md:h-[600px] xl:h-[550px] sm:h-screen/50 xl:h-[350px] -mt-6 bg-gray-200 py-10">
      <div className="w-full ">
        <div className="container flex flex-col items-center justify-center">
          <div className="container z-10 flex flex-col text-center justify-center items-center md:mt-0 ">
            <Image src={fourOfour} alt="Image of a 404 indicating that the page was not found"></Image>
            <h1 className="text-5xl font-medium my-6 flex flex-col capitalize gap-4">
              <div className="text-cws-dark">Internal Server Error!</div>
            </h1>
            <h5 className="w-[80%] md:w-[60%] text-lg font-medium">
              This is an error on our end and we are looking into it. In the meantime, please navigate back to the
              previous content or contact us if this issue persists.
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

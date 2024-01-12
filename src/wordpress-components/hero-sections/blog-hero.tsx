export default function AboutUs() {

  return (
    <div className="h-[250px] md:h-[400px] sm:h-screen/50 xl:h-[350px] -mt-6 bg-secondary">
      <div className="w-full md:pt-10">
        <div className="py-32 container flex flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center mt-24 md:-mt-16 pb-6">
            <h1 className="text-5xl md:mt-4 md:mt-0 font-bold text-center leading-tight md:text-7xl tracking-wider text-white w-full md:w-[90%] xl:w-full capitalize drop-shadow-2xl">
              Sir Suds&apos; Blog
            </h1>
            <h2 className="hidden md:flex z-0 text-xl md:mt-4 md:mt-0 font-medium text-white text-center leading-tight tracking-wider text-white drop-shadow-2xl w-full md:w-[90%] xl:w-[65%]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam numquam laudantium eligendi reiciendis tempora nihil quidem et quis sapiente omnis?
            </h2>
          </div>
          <div className="md:flex text-center justify-around md:flex-row md:text-start grid-cols-2  drop-shadow-xl">
          </div>
        </div>
      </div>
    </div>
  );
}

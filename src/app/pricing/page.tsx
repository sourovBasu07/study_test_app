import PricingCards from "@/components/cards/PricingCards";

const page = () => {
  return (
    <div className="">
      <div className="w-[700px] flex flex-col gap-3 mx-auto py-12 text-center">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight uppercase">
          Simplify Online Tests
        </h1>
        <h1 className="scroll-m-20 text-4xl font-bold text-center leading-[7rem] lg:text-6xl uppercase">
          Join Us Now !
        </h1>
      </div>

      <PricingCards />
    </div>
  );
};
export default page;

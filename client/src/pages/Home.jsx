import Dialog from "@/components/Dialog";
import BentoGrid from "@/components/BentoGrid";

const Home = () => {
  return (
    <div className="mx-8">
      <div className="max-w-5xl m-auto mt-28 text-center">
        <h1 className="max-w-4xl font-inter m-auto text-5xl sm:text-6xl md:text-7xl font-bold text-center">
          Prepare Like a Pro with <br className="max-md:hidden" />{" "}
          <span className="text-[#fa900a]">AI Interviews</span>
        </h1>
        <p className="mt-8 max-w-2xl m-auto text-base md:text-md text-slate-600 text-center">
          Welcome to your ultimate interview preparation platform! Take
          AI-driven mock interviews tailored to your field, practice with
          targeted questions, and receive expert-enhanced answers to boost your
          confidence and performance.
        </p>
        <div>
          <Dialog />
        </div>
        <div>
          <BentoGrid />
        </div>
      </div>
    </div>
  );
};

export default Home;

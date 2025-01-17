import Quiz from "@/components/Quiz";

const CreateTest = () => {
  const numberOfQuestions = 25;

  return (
    <div className="w-full grid grid-cols-2 gap-12 px-7">
      {Array.from({ length: numberOfQuestions }).map((_, index) => {
        return <Quiz key={index} />;
      })}
    </div>
  );
};
export default CreateTest;

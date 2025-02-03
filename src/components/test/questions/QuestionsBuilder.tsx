"use client";

import QuestionBuilderForm from "@/components/forms/QuestiuonBuilderForm";
import { useGetTestQuery } from "@/lib/apiSlices/testsApi";

const QuestionsBuilder = ({ testId }: { testId: string }) => {
  const { data: test, isLoading } = useGetTestQuery(testId, {
    skip: !testId,
  });

  if (isLoading) return null;

  return (
    <div className="">
      <div className="w-full grid grid-cols-2 gap-12 px-7">
        {Array.from({ length: test.data.totalQuestions }).map((_, index) => {
          return <QuestionBuilderForm key={index} />;
        })}
      </div>
    </div>
  );
};
export default QuestionsBuilder;

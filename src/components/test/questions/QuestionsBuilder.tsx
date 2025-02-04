"use client";

import QuestionBuilderForm from "@/components/forms/QuestionBuilderForm";
import { useGetTestByIdQuery } from "@/lib/apiSlices/testsApi";

const QuestionsBuilder = ({ testId }: { testId: string }) => {
  const { data: test, isLoading } = useGetTestByIdQuery(testId, {
    skip: !testId,
  });

  if (isLoading) return null;

  return (
    <div className="">
      <div className="w-full grid grid-cols-2 gap-12 px-7">
        {Array.from({ length: test.data.totalQuestions }).map((_, index) => {
          return (
            <QuestionBuilderForm
              key={index}
              testId={testId}
              questionNumber={index + 1}
            />
          );
        })}
      </div>
    </div>
  );
};
export default QuestionsBuilder;

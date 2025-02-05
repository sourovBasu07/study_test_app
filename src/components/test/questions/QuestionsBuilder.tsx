"use client";

import QuestionBuilderForm from "@/components/forms/QuestionBuilderForm";
// import { useGetTestByIdQuery } from "@/lib/apiSlices/testsApi";

import { QuestionDocument } from "@/types/SchemaTypes";
import QuestionPreview from "./QuestionPreview";
import { useGetAllQuestionsQuery } from "@/lib/apiSlices/questionsApi";

const QuestionsBuilder = ({ testId }: { testId: string }) => {
  // const { data: test, isLoading } = useGetTestByIdQuery(testId, {
  //   skip: !testId,
  // });

  const { data: questions, isLoading: isQuestionsLoading } =
    useGetAllQuestionsQuery(testId, {
      skip: !testId,
    });

  if (isQuestionsLoading) return null;

  return (
    <div className="">
      <div className="w-full grid grid-cols-2 gap-12 px-7">
        {questions.data.map((question: QuestionDocument) => (
          <QuestionPreview
            key={question.questionNumber}
            testId={testId}
            question={question}
          />
        ))}
        <QuestionBuilderForm
          testId={testId}
          questionNumber={questions.data.length + 1}
        />
      </div>
    </div>
  );
};
export default QuestionsBuilder;

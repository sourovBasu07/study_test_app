import { QuestionDocument } from "@/types/SchemaTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, CircleCheckBig, PenOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EditQuestionForm from "@/components/forms/EditQuestionForm";

const QuestionPreview = ({
  question,
}: {
  question: QuestionDocument;
  testId: string;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      {!isEditOpen ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-7">
                  <p className="">Question {question.questionNumber}</p>

                  <PenOff
                    size={16}
                    strokeWidth={1}
                    className="cursor-pointer"
                    onClick={() => setIsEditOpen(true)}
                  />
                </div>
                <div className="flex items-center gap-12">
                  {question.questionType === "mcq" ? (
                    <Badge>MCQ</Badge>
                  ) : question.questionType === "written" ? (
                    <Badge variant="secondary">Written</Badge>
                  ) : (
                    ""
                  )}
                  <p className="">{question.marks}</p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex items-center">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <p className="text-base font-semibold tracking-tight">
                  {question.question}
                </p>
                <div className="flex flex-col">
                  {question.options.map((option, index) => {
                    return (
                      <div
                        key={`${option}-${index}`}
                        className={`flex items-center gap-5 ${
                          question.correctAnswer.number === index
                            ? "text-success"
                            : ""
                        } px-3 py-2 rounded`}
                      >
                        {question.correctAnswer.number === index ? (
                          <CircleCheckBig size={16} />
                        ) : (
                          <Circle size={16} />
                        )}
                        <p className={``}>{option}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <EditQuestionForm setIsEditOpen={setIsEditOpen} question={question} />
      )}
    </>
  );
};
export default QuestionPreview;

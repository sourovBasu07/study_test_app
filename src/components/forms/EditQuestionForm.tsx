"use client";

import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { questionSchema } from "@/lib/zod/questionsSchema";
import { CloudUpload, Loader2, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateQuestionMutation } from "@/lib/apiSlices/questionsApi";
import { toast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { Dispatch, SetStateAction } from "react";
import { QuestionDocument } from "@/types/SchemaTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditQuestionForm = ({
  setIsEditOpen,
  question,
}: {
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  question: QuestionDocument;
}) => {
  const [updateQuestion, { isLoading }] = useUpdateQuestionMutation();

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: question.question || "",
      options: question.options.map((option) => ({ option })),
      correctAnswer: question.correctAnswer.number.toString(),
      marks: question.marks || 1,
      questionType: question.questionType || "mcq",
      hint: question.hint || "",
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control: form.control,
    rules: { maxLength: 5 },
  });

  const canAddOption = () => {
    const options = form.getValues("options");
    const isFilled = options.every((option) => option.option.trim().length > 0);

    if (isFilled) {
      append({ option: "" });
    } else {
      return;
    }
  };

  const onSubmit = async (data: z.infer<typeof questionSchema>) => {
    const result = await questionSchema.safeParseAsync(data);

    console.log(result);

    if (!result.success) {
      return;
    }

    const options = data.options.map((item) => {
      return item.option;
    });

    const correctAnswer = {
      number: Number(data.correctAnswer),
      text: options[Number(data.correctAnswer)],
    };

    const questionData = {
      question: data.question,
      options,
      correctAnswer,
      marks: data.marks,
      questionType: data.questionType,
    };

    try {
      await updateQuestion({
        questionId: question._id,
        ...questionData,
      }).unwrap();

      toast({
        title: "Success!",
        description: "Question updated successfully",
      });
    } catch (error: unknown) {
      toast({
        title: "Error!",
        description: getApiErrorMessage(
          error,
          "Failed updating question. Please try again."
        ),
      });
    }
  };

  return (
    <Card className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <p className="">Question {question.questionNumber}</p>

              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="marks"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 10 }).map((_, index) => (
                            <SelectItem
                              key={index}
                              value={(index + 1).toString()}
                            >
                              {index + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="questionType"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mcq">MCQ</SelectItem>
                          <SelectItem value="written">Written</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col gap-7">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="w-full grid grid-cols-2 gap-7"
                    >
                      {fields.map((item, index) => (
                        <FormItem
                          key={item.id}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={index.toString()} />
                          </FormControl>
                          <FormLabel className="w-full flex items-center gap-3 font-normal">
                            <FormField
                              control={form.control}
                              name={`options.${index}.option` as const}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className="w-full flex flex-1"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Trash2
                              size={16}
                              className={`${
                                fields.length <= 2 ? "hidden" : ""
                              } cursor-pointer`}
                              onClick={() => remove(index)}
                            />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                disabled={fields.length >= 5}
                onClick={canAddOption}
                className="font-semibold"
              >
                <Plus />
                Option
              </Button>
              <div className="flex gap-7">
                <Button
                  variant="outline"
                  className="font-semibold"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="font-semibold">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" />
                      <CloudUpload />
                      Saving
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CloudUpload />
                      Save
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};

export default EditQuestionForm;

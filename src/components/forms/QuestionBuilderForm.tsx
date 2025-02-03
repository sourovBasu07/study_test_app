"use client";

import * as React from "react";
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
import { CloudUpload, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "../ui/textarea";

const QuestionBuilderForm = () => {
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      options: [{ option: "Option 1" }, { option: "Option 2" }],
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

    if (!result.success) {
      result.error.errors.map((error) => {
        console.log(error.message);
      });

      return;
    }

    const options = data.options.map((item) => {
      return item.option;
    });

    const correctAnswer = {
      number: Number(data.correctAnswer),
      text: options[Number(data.correctAnswer)],
    };

    const quizData = {
      question: data.question,
      options,
      correctAnswer,
    };

    console.log(quizData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Question 01</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-7"
          >
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
                Add another option
              </Button>
              <Button type="submit" className="font-semibold">
                <CloudUpload />
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuestionBuilderForm;

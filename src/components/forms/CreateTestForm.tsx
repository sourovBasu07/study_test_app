"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useCreateTestMutation } from "@/lib/apiSlices/testsApi";
import { createTestSchema } from "@/lib/zod/testSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateTestForm = () => {
  const [createTest, { isLoading, isSuccess }] = useCreateTestMutation();
  const form = useForm<z.infer<typeof createTestSchema>>({
    resolver: zodResolver(createTestSchema),
    defaultValues: {
      subject: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createTestSchema>) => {
    console.log(values);
    const { success, data, error } = createTestSchema.safeParse(values);

    if (!success) {
      console.log(error);

      return;
    }
    try {
      const result = await createTest(data);
      console.log(result);
    } catch (error: any) {
      return toast({
        title: "Error!",
        description: "Error",
      });
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create Test</CardTitle>
              <CardDescription>
                Examine the progress of your students
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: English" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalQuestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 50"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          field.onChange(
                            inputValue === "" ? "" : parseInt(inputValue)
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (in minutes)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 50"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          field.onChange(
                            inputValue === "" ? "" : parseInt(inputValue)
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">Create</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
export default CreateTestForm;

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
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateTestForm = () => {
  const router = useRouter();
  const [createTest, { data: test, isLoading, isSuccess }] =
    useCreateTestMutation();
  const form = useForm<z.infer<typeof createTestSchema>>({
    resolver: zodResolver(createTestSchema),
    defaultValues: {
      subject: "",
    },
  });

  useEffect(() => {
    if (isSuccess && test) {
      router.replace(`/tests/manage/${test.data._id}`);
    }
  }, [isSuccess, test, router]);

  const onSubmit = async (values: z.infer<typeof createTestSchema>) => {
    console.log(values);
    const { success, data, error } = createTestSchema.safeParse(values);

    if (!success) {
      console.log(error);

      return;
    }
    try {
      await createTest(data).unwrap();

      toast({
        title: "Success",
        description: "Test created successfully",
      });
    } catch (error: unknown) {
      toast({
        title: "Error!",
        description: getApiErrorMessage(
          error,
          "Failed creating test. Please try again."
        ),
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
                Evaluate the progress of your students
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
              <Button type="submit">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    <p className="">Creating...</p>
                  </div>
                ) : (
                  "Create"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
export default CreateTestForm;

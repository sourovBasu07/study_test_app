"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetAllTestsQuery } from "@/lib/apiSlices/testsApi";
import { TestDocument } from "@/types/SchemaTypes";
import { MoveRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

const Tests = () => {
  const {
    data: tests,
    isLoading,
    isFetching,
  } = useGetAllTestsQuery("all-tests");

  const keysToInclude = [
    {
      key: "subject",
      label: "Subject",
    },
    {
      key: "totalQuestions",
      label: "Questions",
    },
    {
      key: "duration",
      label: "Duration",
    },
    {
      key: "marks",
      label: "Marks",
    },
    {
      key: "testDate",
      label: "Test On",
    },
  ] as { key: keyof TestDocument; label: string }[];

  if (isLoading || isFetching) return null;

  if (!tests) return null;

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent className="flex flex-col gap-12">
        {tests.data.map((test: TestDocument) => (
          <div key={test._id} className="flex items-center gap-24">
            <div className="flex flex-1 justify-between items-center">
              {keysToInclude.map(({ key, label }) => {
                return (
                  <div key={key} className="">
                    <p className="text-muted-foreground">{label}</p>
                    <p className="text-2xl">
                      {key === "testDate"
                        ? format(new Date(test[key]), "EEEE, dd MMM yyyy")
                        : key === "duration"
                        ? `${test[key]} minutes`
                        : String(test[key])}
                    </p>
                  </div>
                );
              })}
            </div>
            <Link href={`/teacher/tests/${test._id}`}>
              <Button>
                Details
                <MoveRight strokeWidth={1} />
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default Tests;

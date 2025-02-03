"use client";

import { useGetAllTestsQuery } from "@/lib/apiSlices/testsApi";
import { TestDocument } from "@/types/SchemaTypes";

const Tests = () => {
  const {
    data: tests,
    isLoading,
    isFetching,
  } = useGetAllTestsQuery("all-tests");

  if (isLoading || isFetching) return null;

  if (!tests) return null;

  return (
    <div className="">
      {tests.data.map((test: TestDocument) => (
        <div key={test._id} className="">
          <h3 className="">{test.subject}</h3>
        </div>
      ))}
    </div>
  );
};
export default Tests;

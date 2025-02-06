import { ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const DashboardStructure = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="w-full h-12"></div>
      <div className="flex items-stretch gap-3">
        <div className="w-[5px] bg-white" />
        <div className="">
          <p className="font-semibold text-2xl uppercase tracking-wide">
            Tests
          </p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Tests</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      {children}
    </div>
  );
};
export default DashboardStructure;

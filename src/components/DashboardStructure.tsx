import { ReactNode } from "react";
import CustomBreadcrumbs from "./Breadcrumbs";

const DashboardStructure = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="w-full h-12"></div>
      <div className="flex items-stretch gap-3">
        <div className="w-[5px] bg-white" />
        <div className="">
          <p className="font-semibold text-2xl uppercase tracking-wide">
            {title}
          </p>
          <CustomBreadcrumbs />
        </div>
      </div>
      {children}
    </div>
  );
};
export default DashboardStructure;

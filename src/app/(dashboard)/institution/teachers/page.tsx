import DashboardStructure from "@/components/DashboardStructure";
import TeachersList from "@/components/institutions/teachers/TeachersList";

const page = () => {
  return (
    <DashboardStructure title="Teachers">
      <div className="">
        <TeachersList />
      </div>
    </DashboardStructure>
  );
};
export default page;

import DashboardStructure from "@/components/DashboardStructure";
import StudentsList from "@/components/institutions/students/StudentsList";

const page = () => {
  return (
    <DashboardStructure title="Students">
      <StudentsList />
    </DashboardStructure>
  );
};
export default page;

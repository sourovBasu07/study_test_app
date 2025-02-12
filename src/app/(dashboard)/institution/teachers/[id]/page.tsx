import DashboardStructure from "@/components/DashboardStructure";
import TeacherProfile from "@/components/institutions/teachers/TeacherProfile";

const page = () => {
  return (
    <DashboardStructure title="Teacher Profile">
      <TeacherProfile />
    </DashboardStructure>
  );
};
export default page;

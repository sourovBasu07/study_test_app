import DashboardStructure from "@/components/DashboardStructure";
import JoinTeacherForm from "@/components/institutions/teachers/JoinTeacherForm";

const page = () => {
  return (
    <DashboardStructure title="Join Teacher">
      <JoinTeacherForm />
    </DashboardStructure>
  );
};
export default page;

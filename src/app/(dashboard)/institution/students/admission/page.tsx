import DashboardStructure from "@/components/DashboardStructure";
import AdmissionForm from "@/components/institutions/students/AdmissionForm";

const page = () => {
  return (
    <DashboardStructure title="Students Admission">
      <AdmissionForm />
    </DashboardStructure>
  );
};
export default page;

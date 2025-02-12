import SettingsProfileForm from "@/components/forms/SettingsProfileForm";
import { Separator } from "@/components/ui/separator";

const SettingsProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <SettingsProfileForm />
    </div>
  );
};

export default SettingsProfilePage;

"use client";

import { Box, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import AboutForm from "./AboutForm";
import AdminDetailsForm from "./AdminDetailsForm";

const DetailsSections = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<string | null>(tab);
  return (
    <Box>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabsList>
          <TabsTab value="about">About</TabsTab>
          <TabsTab value="contacts">Contact information</TabsTab>
          <TabsTab value="admin">Admin Details</TabsTab>
          <TabsTab value="leaderships">Leaderships information</TabsTab>
        </TabsList>

        <TabsPanel value="about">
          <AboutForm />
        </TabsPanel>
        <TabsPanel value="contacts">Contact information</TabsPanel>
        <TabsPanel value="admin">
          <AdminDetailsForm />
        </TabsPanel>
        <TabsPanel value="leaderships">Contact information</TabsPanel>
      </Tabs>
    </Box>
  );
};
export default DetailsSections;

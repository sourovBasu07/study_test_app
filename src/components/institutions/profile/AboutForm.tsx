"use client";

import { aboutSchema } from "@/lib/zod/instituteSchema";
import { Card, CardSection } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const AboutForm = () => {
  const form = useForm<z.infer<typeof aboutSchema>>({
    validate: zodResolver(aboutSchema),
    validateInputOnBlur: true,
  });

  const handleUpdateAbout = async (values: z.infer<typeof aboutSchema>) => {
    console.log(values);
  };

  return (
    <Card>
      <CardSection>
        <form
          onSubmit={form.onSubmit((values) => handleUpdateAbout(values))}
          className=""
        ></form>
      </CardSection>
    </Card>
  );
};
export default AboutForm;

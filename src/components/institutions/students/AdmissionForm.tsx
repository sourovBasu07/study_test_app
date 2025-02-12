"use client";

import { z } from "zod";
import { FileImage, UserPlus } from "lucide-react";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { admissionSchema } from "@/lib/zod/studentSchema";
import { AlertCircle, CalendarIcon } from "lucide-react";
import { useCreateStudentMutation } from "@/lib/apiSlices/studentApi";
import { useForm, zodResolver } from "@mantine/form";
import {
  Alert,
  Button,
  Card,
  CardSection,
  FileInput,
  Group,
  Mark,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";

const classes = [
  {
    value: "six",
    label: "Six",
  },
  {
    value: "seven",
    label: "Seven",
  },
  {
    value: "eight",
    label: "Eight",
  },
  {
    value: "nine",
    label: "Nine",
  },
  {
    value: "ten",
    label: "Ten",
  },
  {
    value: "eleven",
    label: "Eleven",
  },
  {
    value: "twelve",
    label: "Twelve",
  },
];

const AdmissionForm = () => {
  const [createStudent, { isLoading }] = useCreateStudentMutation();
  const form = useForm<z.infer<typeof admissionSchema>>({
    validate: zodResolver(admissionSchema),
    validateInputOnBlur: true,
  });

  const handleAdmission = async (values: z.infer<typeof admissionSchema>) => {
    const { success, data, error } = admissionSchema.safeParse(values);

    if (!success) {
      console.log(error);

      return;
    }

    delete data.birthCertificate;
    delete data.photo;
    delete data.transferCertificate;

    try {
      await createStudent(data).unwrap();
      notifications.show({
        title: "Success!",
        message: "Question updated successfully",
      });
    } catch (error: unknown) {
      notifications.show({
        title: "Error!",
        message: getApiErrorMessage(
          error,
          "Failed updating question. Please try again."
        ),
      });
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <form
        onSubmit={form.onSubmit((values) => handleAdmission(values))}
        className=""
      >
        <CardSection p="xl">
          <div className="flex flex-col gap-12">
            <Group justify="space-between">
              <Stack gap="sm">
                <Title order={3} textWrap="wrap">
                  <Mark color="blue" px={12} py={3}>
                    Add new student to the institution{" "}
                  </Mark>{" "}
                </Title>
                <Text>Simply fill up the form</Text>
              </Stack>
              <DatePickerInput
                leftSection={<CalendarIcon size={16} strokeWidth={1.5} />}
                leftSectionPointerEvents="none"
                label="Admission Date"
                placeholder="Pick date"
                key={form.key("admissionDate")}
                {...form.getInputProps("admissionDate")}
                className="w-[250px]"
              />
            </Group>
            <div className="flex flex-col gap-7">
              <p className="font-semibold text-2xl text-muted-foreground">
                Personal information
              </p>
              <div className="w-full grid grid-cols-4 gap-7">
                <TextInput
                  label="Student Name"
                  placeholder="Enter student name"
                  key={form.key("studentName")}
                  {...form.getInputProps("studentName")}
                />
                <TextInput
                  label="Father's Name"
                  placeholder="Enter father name"
                  key={form.key("fatherName")}
                  {...form.getInputProps("fatherName")}
                />
                <TextInput
                  label="Mother's Name"
                  placeholder="Enter mother name"
                  key={form.key("motherName")}
                  {...form.getInputProps("motherName")}
                />
                <Select
                  label="Gender"
                  placeholder="Gender"
                  data={[
                    {
                      label: "Male",
                      value: "male",
                    },
                    {
                      label: "Female",
                      value: "female",
                    },
                  ]}
                  key={form.key("gender")}
                  {...form.getInputProps("gender")}
                />

                <NumberInput
                  label="Guardian's Contact Number"
                  placeholder="Enter phone number"
                  hideControls
                  key={form.key("guardianContactNumber")}
                  {...form.getInputProps("guardianContactNumber")}
                  leftSection="+880"
                  leftSectionWidth={50}
                  classNames={{
                    section: "text-sm",
                  }}
                />

                <DatePickerInput
                  leftSection={<CalendarIcon size={16} strokeWidth={1.5} />}
                  leftSectionPointerEvents="none"
                  label="Date of Birth"
                  placeholder="Pick date"
                  key={form.key("dateOfBirth")}
                  {...form.getInputProps("dateOfBirth")}
                />

                <NumberInput
                  label="Birth Certificate Number"
                  placeholder="Enter birth certificate number"
                  hideControls
                  key={form.key("birthCertificateNumber")}
                  {...form.getInputProps("birthCertificateNumber")}
                />

                <Select
                  label="Religion"
                  placeholder="Religion"
                  data={[
                    {
                      label: "Hinduism",
                      value: "hinduism",
                    },
                    {
                      label: "Islam",
                      value: "islam",
                    },
                    {
                      label: "Buddhism",
                      value: "buddhism",
                    },
                    {
                      label: "Christianity",
                      value: "christianity",
                    },
                  ]}
                  key={form.key("religion")}
                  {...form.getInputProps("religion")}
                />

                <Textarea
                  label="Address"
                  placeholder="Enter address"
                  key={form.key("address")}
                  {...form.getInputProps("address")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-7">
              <p className="font-semibold text-2xl text-muted-foreground">
                Academic information
              </p>
              <div className="w-full grid grid-cols-4 gap-7">
                <TextInput
                  label="Student ID"
                  placeholder="Enter student id"
                  key={form.key("studentId")}
                  {...form.getInputProps("studentId")}
                />

                <Select
                  label="Class"
                  placeholder="Select class"
                  data={classes}
                  key={form.key("class")}
                  {...form.getInputProps("class")}
                />

                <TextInput
                  label="Section (if any)"
                  placeholder="Enter section"
                  key={form.key("section")}
                  {...form.getInputProps("section")}
                />

                <Select
                  label="Department"
                  placeholder="Select department"
                  data={[
                    {
                      label: "Arts",
                      value: "arts",
                    },
                    {
                      label: "Commerce",
                      value: "commerce",
                    },
                    {
                      label: "Science",
                      value: "science",
                    },
                  ]}
                  key={form.key("department")}
                  {...form.getInputProps("department")}
                />

                <NumberInput
                  label="Roll"
                  placeholder="Enter class roll"
                  hideControls
                  key={form.key("roll")}
                  {...form.getInputProps("roll")}
                />

                <NumberInput
                  label="Year"
                  placeholder="Enter year"
                  hideControls
                  key={form.key("year")}
                  {...form.getInputProps("year")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-7">
              <p className="font-semibold text-2xl text-muted-foreground">
                Documents
              </p>
              <Alert
                variant="light"
                color="red"
                title="Alert title"
                icon={<AlertCircle />}
              >
                You may submit thiese documents directly to the authority. But
                remember, you admission will only be done after the authority
                receives your applicable documents.
              </Alert>
              <div className="w-full grid grid-cols-3 gap-7">
                <FileInput
                  leftSection={<FileImage size={16} strokeWidth={1.5} />}
                  label="Attach birth certificate"
                  placeholder="Click to select"
                  leftSectionPointerEvents="none"
                  clearable
                  key={form.key("birthCertificate")}
                  {...form.getInputProps("birthCertificate")}
                />
                <FileInput
                  leftSection={<FileImage size={16} strokeWidth={1.5} />}
                  label="Attach photo"
                  placeholder="Click to select"
                  leftSectionPointerEvents="none"
                  clearable
                  key={form.key("photo")}
                  {...form.getInputProps("photo")}
                />
                <FileInput
                  leftSection={<FileImage size={16} strokeWidth={1.5} />}
                  label="Transfer Certificate (if applicable)"
                  placeholder="Click to select"
                  leftSectionPointerEvents="none"
                  clearable
                  key={form.key("transferCertificate")}
                  {...form.getInputProps("transferCertificate")}
                />
              </div>
            </div>
            <div className="w-full">
              <Textarea
                label="Remarks"
                placeholder="Enter remarks"
                key={form.key("remarks")}
                {...form.getInputProps("remarks")}
              />
            </div>
          </div>
          <div className="">
            <Button
              type="submit"
              leftSection={<UserPlus size={16} strokeWidth={1.5} />}
              loading={isLoading}
              loaderProps={{ type: "dots" }}
            >
              Admit Student
            </Button>
          </div>
        </CardSection>
      </form>
    </Card>
  );
};

export default AdmissionForm;

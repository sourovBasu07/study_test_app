"use client";

import { z } from "zod";
import { Check, FileImage, UserPlus, X } from "lucide-react";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { CalendarIcon } from "lucide-react";
import { teacherSchema } from "@/lib/zod/teacherSchema";
import { useForm, zodResolver } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import {
  Button,
  Card,
  CardSection,
  FileInput,
  Flex,
  Group,
  Mark,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Progress,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useCreateTeacherMutation } from "@/lib/apiSlices/teachersApi";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Flex align="center" c={meets ? "teal" : "red"} mt={7}>
      {meets ? <Check size={14} /> : <X size={14} />}
      <Text ml={10} size="xs">
        {label}
      </Text>
    </Flex>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string = "") {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function PasswordInputWithStrength({
  label,
  placeholder,
  value = "",
  ...props
}: {
  label: string;
  placeholder: string;
  value: string;
}) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: "pop" }}
    >
      <PopoverTarget>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            withAsterisk
            label={label}
            placeholder={placeholder}
            {...props}
          />
        </div>
      </PopoverTarget>
      <PopoverDropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement
          label="Includes at least 8 characters"
          meets={value.length > 7}
        />
        {checks}
      </PopoverDropdown>
    </Popover>
  );
}

const JoinTeacherForm = () => {
  const [joinTeacher, { isLoading }] = useCreateTeacherMutation();
  const form = useForm<z.infer<typeof teacherSchema>>({
    validate: zodResolver(teacherSchema),
    validateInputOnBlur: true,
  });

  const handleJoinTeacher = async (values: z.infer<typeof teacherSchema>) => {
    const { success, data, error } = teacherSchema.safeParse(values);

    if (!success) {
      console.log(error);

      return;
    }

    delete data.nid;
    delete data.photo;
    delete data.joiningLetter;

    try {
      await joinTeacher(data).unwrap();
      notifications.show({
        title: "Success!",
        message: "Teacher added successfully",
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
        onSubmit={form.onSubmit((values) => handleJoinTeacher(values))}
        className=""
      >
        <CardSection p="xl" className="">
          <div className="flex flex-col gap-12">
            <Group justify="space-between">
              <Stack gap="md">
                <Title order={3} textWrap="wrap">
                  <Mark color="blue" px={12} py={3}>
                    Add new teacher to the institution{" "}
                  </Mark>{" "}
                </Title>
                <Text>Simply fill up the form</Text>
              </Stack>

              <DatePickerInput
                leftSection={<CalendarIcon size={16} strokeWidth={1.5} />}
                leftSectionPointerEvents="none"
                label="Joining Date"
                placeholder="Pick date"
                key={form.key("joiningDate")}
                {...form.getInputProps("joiningDate")}
                className="w-[250px]"
              />
            </Group>
            <div className="flex flex-col gap-7">
              <p className="font-semibold text-2xl text-muted-foreground">
                Personal information
              </p>
              <div className="w-full grid grid-cols-4 gap-7">
                <TextInput
                  label="First Name"
                  placeholder="Enter first name"
                  key={form.key("teacherFirstName")}
                  {...form.getInputProps("teacherFirstName")}
                />
                <TextInput
                  label="Last Name"
                  placeholder="Enter last name"
                  key={form.key("teacherLastName")}
                  {...form.getInputProps("teacherLastName")}
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
                  label="Contact Number"
                  placeholder="Enter phone number"
                  hideControls
                  key={form.key("contactNumber")}
                  {...form.getInputProps("contactNumber")}
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
                  label="NID Number"
                  placeholder="Enter nid number"
                  hideControls
                  key={form.key("nidNumber")}
                  {...form.getInputProps("nidNumber")}
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
                Teaching information
              </p>
              <div className="w-full grid grid-cols-4 gap-7">
                <TextInput
                  label="Teacher ID"
                  placeholder="Enter teacher id"
                  key={form.key("teacherId")}
                  {...form.getInputProps("teacherId")}
                />

                <TextInput
                  label="Qualification"
                  placeholder="Enter qualification"
                  key={form.key("qualification")}
                  {...form.getInputProps("qualification")}
                />

                <TextInput
                  label="Designation"
                  placeholder="Ex: Assistant teacher"
                  key={form.key("designation")}
                  {...form.getInputProps("designation")}
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

                <MultiSelect
                  label="Subjects (Maximum 3)"
                  placeholder="Select subjects"
                  data={[
                    {
                      label: "English",
                      value: "english",
                    },
                    {
                      label: "Math",
                      value: "math",
                    },
                    {
                      label: "Chemistry",
                      value: "chemistry",
                    },
                    {
                      label: "Bengali",
                      value: "bengali",
                    },
                    {
                      label: "Accounting",
                      value: "accounting",
                    },
                    {
                      label: "Physics",
                      value: "physics",
                    },
                    {
                      label: "Finance",
                      value: "finance",
                    },
                  ]}
                  key={form.key("subjects")}
                  {...form.getInputProps("subjects")}
                  searchable
                  maxValues={3}
                  maxDropdownHeight={250}
                  checkIconPosition="left"
                  nothingFoundMessage="Please add the subject first or check spelling"
                  className="col-span-2"
                />
              </div>
            </div>
            <div className="flex flex-col gap-7">
              <p className="font-semibold text-2xl text-muted-foreground">
                Teacher Portal
              </p>
              <div className="w-full grid grid-cols-4 gap-7">
                <TextInput
                  label="Email"
                  placeholder="Enter email"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />
                <TextInput
                  label="Username"
                  placeholder="Enter username"
                  key={form.key("username")}
                  {...form.getInputProps("username")}
                />
                <PasswordInputWithStrength
                  label="Password"
                  placeholder="*********"
                  value={form.getInputProps("password").value ?? ""}
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                />

                <PasswordInputWithStrength
                  label="Confirm Password"
                  placeholder="**********"
                  value={form.getInputProps("confirmPassword").value ?? ""}
                  key={form.key("confirmPassword")}
                  {...form.getInputProps("confirmPassword")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-7">
              <p className="font-semibold text-2xl text-muted-foreground">
                Documents
              </p>
              <div className="w-full grid grid-cols-3 gap-7">
                <FileInput
                  leftSection={<FileImage size={16} strokeWidth={1.5} />}
                  label="Attach NID"
                  placeholder="Click to select"
                  leftSectionPointerEvents="none"
                  clearable
                />
                <FileInput
                  leftSection={<FileImage size={16} strokeWidth={1.5} />}
                  label="Attach photo"
                  placeholder="Click to select"
                  leftSectionPointerEvents="none"
                  clearable
                />
                <FileInput
                  leftSection={<FileImage size={16} />}
                  label="Attach Joining Letter (If applicable)"
                  placeholder="Click to select"
                  leftSectionPointerEvents="none"
                  clearable
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
                Join Teacher
              </Button>
            </div>
          </div>
        </CardSection>
      </form>
    </Card>
  );
};

export default JoinTeacherForm;

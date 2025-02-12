"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CloudUpload, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { admissionSchema } from "@/lib/zod/studentSchema";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AlertCircle, CalendarIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCreateStudentMutation } from "@/lib/apiSlices/studentApi";

const classes = [
  {
    key: 6,
    label: "Six",
  },
  {
    key: 7,
    label: "Seven",
  },
  {
    key: 8,
    label: "Eight",
  },
  {
    key: 9,
    label: "Nine",
  },
  {
    key: 10,
    label: "Ten",
  },
  {
    key: 11,
    label: "Eleven",
  },
  {
    key: 12,
    label: "Twelve",
  },
];

const AdmissionForm = () => {
  const [createStudent, { isLoading }] = useCreateStudentMutation();
  const form = useForm<z.infer<typeof admissionSchema>>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      studentId: "",
      admissionDate: new Date().toISOString(),
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: z.infer<typeof admissionSchema>) => {
    console.log("clicked");

    const { success, data, error } = admissionSchema.safeParse(values);

    if (!success) {
      console.log(error);

      return;
    }

    try {
      await createStudent(data).unwrap();
      toast({
        title: "Success!",
        description: "Question updated successfully",
      });
    } catch (error: unknown) {
      toast({
        title: "Error!",
        description: getApiErrorMessage(
          error,
          "Failed updating question. Please try again."
        ),
      });
    }
  };

  return (
    <Card className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <CardHeader>
            <CardTitle className="flex justify-between items-center"></CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="flex flex-col gap-12">
              <div className="flex justify-end">
                <FormField
                  control={form.control}
                  name="admissionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admission Date</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          {...field}
                          value={format(new Date(field.value), "dd MMM, yyyy")}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-7">
                <p className="font-semibold text-2xl text-muted-foreground">
                  Personal information
                </p>
                <div className="w-full grid grid-cols-4 gap-7">
                  <FormField
                    control={form.control}
                    name="studentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student&apos;s Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fatherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Father&apos;s Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter father's name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="motherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother&apos;s Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter mother's name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guardianContactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian&apos;s Contact No.</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter contact number"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>

                        <FormControl>
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            icon={<CalendarIcon />}
                            selected={field.value}
                            onChange={field.onChange}
                            className="rounded-md border border-input bg-transparent m-0 focus-visible:m-0 px-3 py-1 text-base transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring placeholder:text-muted-foreground"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="birthCertificateNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Certificate No.</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter birth certificate number"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="religion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Religion</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hinduism">Hinduism</SelectItem>
                            <SelectItem value="islam">Islam</SelectItem>
                            <SelectItem value="christianity">
                              Christianity
                            </SelectItem>
                            <SelectItem value="buddhism">Buddhism</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter address" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-7">
                <p className="font-semibold text-2xl text-muted-foreground">
                  Academic information
                </p>
                <div className="w-full grid grid-cols-4 gap-7">
                  <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter student id" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {classes.map((item) => (
                              <SelectItem
                                key={item.key}
                                value={item.key.toString()}
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section (if any)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter section" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department (if applicable)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["Arts", "Commerce", "Science"].map((item) => (
                              <SelectItem key={item} value={item.toLowerCase()}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roll"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class Roll</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter class roll" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admission year</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter year" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-7">
                <p className="font-semibold text-2xl text-muted-foreground">
                  Documents
                </p>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You may submit thiese documents directly to the authority.
                    But remember, you admission will only be done after the
                    authority receives your applicable documents.
                  </AlertDescription>
                </Alert>
                <div className="w-full grid grid-cols-4 gap-7">
                  <FormField
                    control={form.control}
                    name="birthCertificate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Certificate</FormLabel>
                        <FormControl>
                          <Input type="file" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student Photo</FormLabel>
                        <FormControl>
                          <Input type="file" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transferCertificate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Transfer Certificate (if applicable)
                        </FormLabel>
                        <FormControl>
                          <Input type="file" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remarks</FormLabel>
                      <FormControl>
                        <Textarea className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <Button type="submit" className="font-semibold">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" />
                      <CloudUpload />
                      Saving
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CloudUpload />
                      Save
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};

export default AdmissionForm;

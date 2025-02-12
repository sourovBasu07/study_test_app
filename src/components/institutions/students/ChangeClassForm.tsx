// "use client";

// import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// const ChangeClassForm = () => {
//     const form = useForm<z.infer<typeof admissionSchema>>({
//       resolver: zodResolver(admissionSchema),
//       defaultValues: {
//         studentId: "",
//         admissionDate: new Date().toISOString(),
//       },
//       mode: "onBlur",
//     });

//     const onSubmit = async (values: z.infer<typeof admissionSchema>) => {
//       console.log("clicked");

//       const { success, data, error } = admissionSchema.safeParse(values);

//       if (!success) {
//         console.log(error);

//         return;
//       }

//       try {
//         await createStudent(data).unwrap();
//         toast({
//           title: "Success!",
//           description: "Question updated successfully",
//         });
//       } catch (error: unknown) {
//         toast({
//           title: "Error!",
//           description: getApiErrorMessage(
//             error,
//             "Failed updating question. Please try again."
//           ),
//         });
//       }
//     };

//   return (
//     <div className="">

//     </div>
//   )
// }
// export default ChangeClassForm

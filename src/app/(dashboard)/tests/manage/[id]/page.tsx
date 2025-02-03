import QuestionsBuilder from "@/components/test/questions/QuestionsBuilder";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  console.log(id);

  if (!id) return;

  return (
    <div className="">
      <QuestionsBuilder testId={id} />
    </div>
  );
};
export default page;

import Form from "@/components/form/form";
import Card from "@/components/card/card";
import Alert from "@/components/alert/Alert";
import UpdateForm from "@/components/updateForm/UpdateForm";
export default function Home() {
  
  return (
    // single-page app -> llamados pop-ups
    <section className="w-screen h-screen flex justify-center items-center">
    <div className="bg-gray-200 flex text-black flex-col w-full md:w-2/3 lg:w-1/4 rounded-lg p-3 shadow-xl">
      <Form/>
      {/* card Array */}
      <Card/>
    </div>
    <Alert/>
    <UpdateForm/>
    </section>
  );
}

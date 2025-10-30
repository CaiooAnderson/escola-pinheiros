import Feedback from "@/pages/ClientPages/Home/components/Feedback";

export default function FeedbacksPreview() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl text-center w-full font-semibold font-primary text-primary">
          Demonstração dos Feedbacks
        </h2>
      </div>

      <Feedback isAdmin />
    </section>
  );
}

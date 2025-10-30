import EventPreview from "./components/EventPreview";
import FAQPreview from "./components/FAQPreview";
import FeedbacksPreview from "./components/FeedbacksPreview";
import PromotionsPreview from "./components/PromotionsPreview";

export default function AdminHome() {
  return (
    <div className="container mx-auto px-4 pt-20">
      <PromotionsPreview />
      <FeedbacksPreview />
      <EventPreview />
      <FAQPreview />
    </div>
  );
}

import Address from "./components/Address";
import OpeningHours from "./components/OpeningHours";
import SocialContacts from "./components/SocialContacts";
import Feedback from "../Home/components/Feedback";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col gap-12">
      <h1 className="text-3xl sm:text-4xl font-bold font-primary text-primary-dark text-center">
        Contato
      </h1>
      <OpeningHours />
      <SocialContacts />
      <Address />
      <Feedback className="py-0 px-0" />
    </div>
  );
}

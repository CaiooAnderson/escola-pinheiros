import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  title: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

export default function AdminHeader({
  title,
  buttonLabel,
  onButtonClick,
}: AdminHeaderProps) {
  return (
    <div className="flex sm:flex-row flex-col sm:gap-0 gap-4 justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-text">{title}</h1>
      <Button size="sm" variant="outline" onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </div>
  );
}

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface FiltersProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
  years: string[];
}

export default function Filters({
  selectedYear,
  onYearChange,
  sortOption,
  onSortChange,
  years,
}: FiltersProps) {
  return (
    <div className="flex sm:flex-row flex-col items-end justify-end mb-2 gap-2">
      <Select onValueChange={onYearChange} value={selectedYear}>
        <SelectTrigger className="w-45">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os anos</SelectItem>
          {years.map((y) => (
            <SelectItem key={y} value={y}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onSortChange} value={sortOption}>
        <SelectTrigger className="w-45">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="hidden" value="default">
            Ordenar por
          </SelectItem>
          <SelectItem value="year-desc">Mais recente</SelectItem>
          <SelectItem value="year-asc">Mais antigo</SelectItem>
          <SelectItem value="name-asc">Nome A-Z</SelectItem>
          <SelectItem value="name-desc">Nome Z-A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

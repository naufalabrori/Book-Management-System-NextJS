import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

type YearPickerProps = {
  value?: number;
  onChange?: (year: number) => void;
  startYear?: number;
  endYear?: number;
  isModal?: boolean;
};

const YearPicker: React.FC<YearPickerProps> = ({
  value,
  onChange,
  startYear,
  endYear,
  isModal = false,
}) => {
  const currentYear = new Date().getFullYear();
  const defaultStartYear = startYear || currentYear - 50;
  const defaultEndYear = endYear || currentYear;

  const [selectedYear, setSelectedYear] = useState<number | null>(
    value || null
  );
  const [currentDecadeStart, setCurrentDecadeStart] = useState(
    Math.floor((value || currentYear) / 10) * 10
  );

  const years = Array.from(
    { length: 10 },
    (_, i) => currentDecadeStart + i
  ).filter((year) => year >= defaultStartYear && year <= defaultEndYear);

  const selectYear = (year: number) => {
    setSelectedYear(year);
    onChange?.(year); // Notify parent component
  };

  const goToPreviousDecade = () => {
    setCurrentDecadeStart((prev) => prev - 10);
  };

  const goToNextDecade = () => {
    setCurrentDecadeStart((prev) => prev + 10);
  };

  return (
    <Popover modal={isModal}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectYear && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {selectedYear || "Select Year"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="flex justify-between items-center mb-2">
          <Button
            variant="ghost"
            onClick={goToPreviousDecade}
            disabled={currentDecadeStart <= defaultStartYear}
          >
            &lt;
          </Button>
          <span className="font-bold">
            {currentDecadeStart} - {currentDecadeStart + 9}
          </span>
          <Button
            variant="ghost"
            onClick={goToNextDecade}
            disabled={currentDecadeStart + 9 >= defaultEndYear}
          >
            &gt;
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {years.map((year) => (
            <button
              key={year}
              className={`p-2 rounded-md text-center hover:bg-gray-200 ${
                selectedYear === year ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => selectYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default YearPicker;

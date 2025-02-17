import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type RatingSliderProps = {
  value: number[];
  setValue: (value: number[]) => void;
};

export default function RatingSlider({value, setValue}: RatingSliderProps) {

  const emojis = ["😡", "🙁", "😐", "🙂", "😍"];
  const labels = ["Awful", "Poor", "Okay", "Good", "Amazing"];
  

  return (
    <div className="space-y-3 w-60 mt-10">
      <Label>Rate the book</Label>
      <div className="flex items-center gap-2">
        <Slider
          value={value}
          onValueChange={setValue}
          min={1}
          max={5}
          showTooltip
          tooltipContent={(value) => labels[value - 1]}
          aria-label="Rate your experience"
        />
        <span className="text-2xl">{emojis[value[0] - 1]}</span>
      </div>
    </div>
  );
}

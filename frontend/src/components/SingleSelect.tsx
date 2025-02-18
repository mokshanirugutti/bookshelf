import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FilterIcon } from "lucide-react";

interface SingleSelectProps {
  genres: { value: string; label: string }[];
  onSelectGenre: (genre: string | null) => void; 
}

const SingleSelect: React.FC<SingleSelectProps> = ({ genres, onSelectGenre }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FilterIcon/> Filter
          <ChevronDown className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width]">

        <DropdownMenuItem onClick={() => onSelectGenre(null)}>All </DropdownMenuItem>
        {genres.map((genre) => (
          <DropdownMenuItem key={genre.value} onClick={() => onSelectGenre(genre.value)}>
            {genre.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SingleSelect;
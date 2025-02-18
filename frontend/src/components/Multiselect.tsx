import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

interface MultiSelectProps {
  title: string;
  placeholder: string;
  id: string;
  value: string;
  setValue: (value: string) => void;
}

export default function MultiSelect({ title, placeholder, id, value, setValue }: MultiSelectProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [newGenre, setNewGenre] = useState<string>("");
  
  const [genres, setGenres] = useState([
    { value: "SelfHelp", label: "Self help" },
    { value: "Psychology", label: "Psychology" },
    { value: "Business", label: "Business" },
    { value: "Romance", label: "Romance" },
    { value: "History", label: "History" },
  ]);

  const handleAddGenre = () => {
    if (newGenre && !genres.some((genre) => genre.value === newGenre)) {
      const newGenreObj = { value: newGenre, label: newGenre };
      setGenres((prev) => [...prev, newGenreObj]); // Update state
      setValue(newGenre);
      setNewGenre("");
      setOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleAddGenre();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{title}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value ? genres.find((genre) => genre.value === value)?.label : placeholder}
            </span>
            <ChevronDown size={16} strokeWidth={2} className="shrink-0 text-muted-foreground/80" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Find genre"
              value={newGenre}
              onValueChange={setNewGenre}
              onKeyDown={handleKeyDown}
            />
            <CommandList>
              <CommandEmpty>No genre found.</CommandEmpty>
              <CommandGroup>
                {genres.map((genre) => (
                  <CommandItem
                    key={genre.value}
                    value={genre.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {genre.label}
                    {value === genre.value && <Check size={16} strokeWidth={2} className="ml-auto" />}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <Button variant="ghost" className="w-full justify-start font-normal" onClick={handleAddGenre}>
                  <Plus size={16} strokeWidth={2} className="-ms-2 me-2 opacity-60" aria-hidden="true" />
                  Type and press enter to add genre
                </Button>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
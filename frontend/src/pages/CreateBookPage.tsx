import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useCreateBook from "@/hooks/useCreateBook";
import MultiSelect from "@/components/Multiselect";

const CreateBookPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  const [bookCover, setBookCover] = useState<File | null>(null);

  const { createBook, isLoading, error } = useCreateBook();
  const id = useId();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setBookCover(e.target.files[0]);
    }
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bookData = {
      title,
      description,
      author,
      genre,
      price,
      bookCover,
    };
    // console.log('sending requrest with');
    // console.log(bookData)
    await createBook(bookData);
  };

  return (
    <div className="w-screen flex justify-center items-center">
      <div className="mx-auto border px-5 py-6 rounded-md">
        <h1 className="text-xl text-center font-semibold">Adding new book is fun...</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex space-x-6">
            <div className="space-y-4 w-full">
              <div className="space-y-2">
                <Label htmlFor={`${id}-title`}>Title</Label>
                <Input
                  id={`${id}-title`}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  type="text"
                  required
                  className="text-sm p-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${id}-description`}>Description</Label>
                <Textarea
                  id={`${id}-description`}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  required
                  className="text-sm p-2"
                />
              </div>

              <div className="flex space-x-4">

                <div className="space-y-2">
                  <Label htmlFor={`${id}-author`}>Author</Label>
                  <Input
                    id={`${id}-author`}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                    type="text"
                    required
                    className="text-sm p-2"
                    />
                </div>

                <div className="space-y-2">
                 
                    <MultiSelect title="Genre" placeholder="select genre" id={`${id}-genre`} setValue={setGenre} value={genre}/>
                </div>

              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-bookCover`}>Book Cover</Label>
                <Input id={`${id}-bookCover`} className="p-0 pe-3 file:me-3 file:border-0 file:border-e" 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange}
          />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${id}-price`}>Price</Label>
                <Input
                  id={`${id}-price`}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="Price"
                  type="number"
                  required
                  className="text-sm p-2"
                />
              </div>

            </div>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <Button type="submit" className="w-full text-sm" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookPage;

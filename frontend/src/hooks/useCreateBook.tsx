import { useState } from "react";
import axios from "axios";

const useCreateBook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const createBook = async (bookData: any) => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        
        
  
        const formData = new FormData();
        formData.append("title", bookData.title);
        formData.append("description", bookData.description);
        formData.append("author", bookData.author);
        formData.append("genre", bookData.genre);
        formData.append("price", bookData.price.toString()); 
        formData.append("rating", bookData.rating.toString())
  
        if (bookData.bookCover) {
          formData.append("bookCover", bookData.bookCover);
        }
  
  
        setIsLoading(true);
        setError(null);
  
        const response = await axios.post("http://localhost:3000/books", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", 
          },
        });
  
        return response.data;
      } catch (err) {
        
          setError(err instanceof Error ? err.message : "An error occurred");
        
      } finally {
        setIsLoading(false);
      }
    };
  
    return { createBook, isLoading, error };
  };
  
  export default useCreateBook;
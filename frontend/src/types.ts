export interface User {
    id: string;
    username: string;
    email: string;
    profilePicture?:string;
    role : string;
  
  }
  
  export interface UserContextType {
    user: User | null; 
    token: string | null;
    register: (formData: FormData) => Promise<void>;
    login: (username: string, password: string) => Promise<void>; // identifier can be username or email
    logout: () => void;
  }



  interface Review {
    userId: string;
    content: string;
    rating: number;
    _id: string;
  }
  
  export interface Book {
    _id: string;
    title: string;
    description: string;
    author: string;
    genre: string;
    image: string;
    price: number;
    rating: number;
    creator: string;
    createdAt: string;
    updatedAt: string;
    bookCover: string;
    reviews: Review[];
  }
  
  export interface BooksResponse {
    totalBooks: number;
    totalPages: number;
    currentPage: number;
    books: Book[];
  }
  
  export interface BookResponse {
    book: Book;
  }
  
import { Book } from "./types";

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: "The Midnight Library",
    author: "Matt Haig",
    coverUrl: "https://picsum.photos/seed/midnight/300/450",
    price: 13.99,
    rating: 4.2,
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    genre: "Fiction",
    isBestSeller: true
  },
  {
    id: '2',
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverUrl: "https://picsum.photos/seed/hailmary/300/450",
    price: 16.50,
    rating: 4.8,
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.",
    genre: "Sci-Fi",
    isBestSeller: true
  },
  {
    id: '3',
    title: "Educated",
    author: "Tara Westover",
    coverUrl: "https://picsum.photos/seed/educated/300/450",
    price: 14.25,
    rating: 4.6,
    description: "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom.",
    genre: "Memoir",
    isBestSeller: false
  },
  {
    id: '4',
    title: "Dune",
    author: "Frank Herbert",
    coverUrl: "https://picsum.photos/seed/dune/300/450",
    price: 18.00,
    rating: 4.7,
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange.",
    genre: "Sci-Fi",
    isBestSeller: true
  },
  {
    id: '5',
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "https://picsum.photos/seed/atomic/300/450",
    price: 15.00,
    rating: 4.9,
    description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day.",
    genre: "Self-Help",
    isBestSeller: true
  },
    {
    id: '6',
    title: "The Song of Achilles",
    author: "Madeline Miller",
    coverUrl: "https://picsum.photos/seed/achilles/300/450",
    price: 12.99,
    rating: 4.5,
    description: "Greece in the age of heroes. Patroclus, an awkward young prince, has been exiled to the court of King Peleus and his perfect son Achilles.",
    genre: "Historical Fiction",
    isBestSeller: false
  }
];

export const CATEGORIES = [
  "Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Romance", "History", "Self-Help", "Fantasy"
];

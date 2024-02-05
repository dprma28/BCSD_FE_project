import { create } from "zustand";

const useSearchStore = create((set) => ({
    query: '',
    setQuery: (query) => set({ query }),

    searchResult: '',
    setSearchResult: (result) => set({ searchResult: result }),

    isModalOpen: false,
    setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

    readBookTitle: '',
    setReadBookTitle: (title) => set({ readBookTitle: title }),

    readBookTitles: [],
    setReadBookTitles: (newTitle) => 
        set((prev) => ({
            readBookTitles: [...prev.readBookTitles, newTitle],
        })),

    review: '',
    setReview: (review) => set({ review }),

    reviews: [],
    setReviews: (newReview) => 
        set((prev) => ({
            reviews: [...prev.reviews, newReview],
    })),
}));

export default useSearchStore
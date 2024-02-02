import { create } from "zustand";

const useSearchStore = create((set) => ({
    query: '',
    setQuery: (query) => set({ query }),
    searchResult: '',
    setSearchResult: (result) => set({ searchResult: result }),
    readBookTitle: '',
    setReadBookTitle: (title) => set({ readBookTitle: title }),
    isModalOpen: false,
    setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
    review: [],
    setReview: (review) => set({ review }),
}));

export default useSearchStore
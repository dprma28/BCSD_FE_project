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

    readBookTitles: JSON.parse(localStorage.getItem("readBookTitles")),
    setReadBookTitles: (newTitle) => {
        set((prev) => {
            localStorage.setItem("readBookTitles", JSON.stringify([...prev.readBookTitles, newTitle]));
            return { readBookTitles: [...prev.readBookTitles, newTitle] };
        });
    },
}));

export default useSearchStore
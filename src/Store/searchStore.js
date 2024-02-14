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
            const arrangeTitles = [...(prev.readBookTitles || []), newTitle];

            localStorage.setItem("readBookTitles", JSON.stringify(arrangeTitles));
            return { readBookTitles: arrangeTitles };
        });
    },

    dates: JSON.parse(localStorage.getItem("dates")),
    setDates: (today) => {
        set((prev) => {
            const arrangeDate = [...(prev.dates || []), today];
            
            localStorage.setItem("dates", JSON.stringify(arrangeDate));
            return { dates: arrangeDate };
        });
    },
}));

export default useSearchStore
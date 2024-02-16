import { create } from "zustand";

const useStarStore = create((set) => ({
    rating: 0,
    setRating: (val) => set({ rating: val }),

    stars: JSON.parse(localStorage.getItem("stars")),
    setStars: (starScore) => {
        set((prev) => {
            const arrangeStar = [...(prev.stars || []), starScore];
            
            localStorage.setItem("stars", JSON.stringify(arrangeStar));
            return { stars: arrangeStar };
        });
    },
}));

export default useStarStore
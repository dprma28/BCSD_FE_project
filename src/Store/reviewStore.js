import { create } from "zustand";

const useReviewStore = create((set) => ({
    review: '',
    setReview: (review) => set({ review }),

    reviews: JSON.parse(localStorage.getItem("reviews")) || [],
    setReviews: (newReview) => {
        set((prev) => {
            localStorage.setItem("reviews", JSON.stringify([...prev.reviews, newReview]));
            return { reviews: [...prev.reviews, newReview] };
        });
    },
}));

export default useReviewStore
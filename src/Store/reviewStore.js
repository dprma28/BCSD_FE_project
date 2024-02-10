import { create } from "zustand";

const useReviewStore = create((set) => ({
    review: '',
    setReview: (review) => set({ review }),

    reviews: JSON.parse(localStorage.getItem("reviews")),
    setReviews: (newReview) => {
        set((prev) => {
            const arrangeReviews = [...(prev.reviews || []), newReview];
            
            localStorage.setItem("reviews", JSON.stringify(arrangeReviews));
            return { reviews: arrangeReviews };
        });
    },
}));

export default useReviewStore
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Review {
  _id: string;
  content: string;
  rating: number;
}

interface ReviewsState {
  reviews: Review[];
}

const initialState: ReviewsState = {
  reviews: [],
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.unshift(action.payload);
    },
  },
});

export const { setReviews, addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
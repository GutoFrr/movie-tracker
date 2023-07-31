import { reactive } from 'vue';
import { IReview } from '../interfaces/Review.ts';
import axios from 'axios';

const reviewsUrl = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_DEV_API_URL;

export const reviewStore = reactive({
  reviews: [] as IReview[],
  review: '',
  user: '',
  loading: false,
});

export async function getReviews(movieId: string | string[]) {
  reviewStore.loading = true;
  try {
    const { data } = await axios(`${reviewsUrl}/movie/${movieId}`);

    reviewStore.reviews = data.reviews;
    reviewStore.loading = false;
  } catch (error) {
    console.log(error);
    reviewStore.loading = false;
  }
}

export async function createReview(movieId: string | string[]) {
  reviewStore.loading = true;
  try {
    const { data } = await axios.post(`${reviewsUrl}`, {
      user: reviewStore.user,
      review: reviewStore.review,
      movieId: movieId,
    });

    reviewStore.reviews.push(data.review);
    reviewStore.loading = false;
  } catch (error) {
    console.log(error);
    reviewStore.loading = false;
  }
}

export async function editReview(id: string, user: string, review: string) {
  reviewStore.loading = true;
  try {
    const { data } = await axios.patch(`${reviewsUrl}/${id}`, {
      user: user,
      review: review,
    });

    reviewStore.reviews = reviewStore.reviews.map((item) => {
      if (item.id === id) {
        return data.review;
      } else {
        return item;
      }
    });
    reviewStore.loading = false;
  } catch (error) {
    console.log(error);
    reviewStore.loading = false;
  }
}

export async function deleteReview(reviewId: string | string[]) {
  reviewStore.loading = true;
  try {
    await axios.delete(`${reviewsUrl}/${reviewId}`);

    reviewStore.reviews = reviewStore.reviews.filter((item) => item.id !== reviewId);
    reviewStore.loading = false;
  } catch (error) {
    console.log(error);
    reviewStore.loading = false;
  }
}

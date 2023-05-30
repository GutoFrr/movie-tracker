import { reactive, ref } from 'vue';
import { IReview } from '../interfaces/Review.ts';
import axios from 'axios';

const reviewsUrl = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_DEV_API_URL;

export const reviewStore = reactive({ reviews: [] as IReview[], review: '', user: '' });

export async function getReviews(movieId: string | string[]) {
  try {
    const { data } = await axios(`${reviewsUrl}/movie/${movieId}`);

    reviewStore.reviews = data.reviews;
  } catch (error) {
    console.log(error);
  }
}

export async function createReview(movieId: string | string[]) {
  try {
    const { data } = await axios.post(`${reviewsUrl}`, {
      user: reviewStore.user,
      review: reviewStore.review,
      movieId: movieId,
    });

    reviewStore.reviews.push(data.review);
  } catch (error) {
    console.log(error);
  }
}

export async function editReview(id: string, user: string, review: string) {
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
  } catch (error) {
    console.log(error);
  }
}

export async function deleteReview(reviewId: string | string[]) {
  try {
    await axios.delete(`${reviewsUrl}/${reviewId}`);

    reviewStore.reviews = reviewStore.reviews.filter((item) => item.id !== reviewId);
  } catch (error) {
    console.log(error);
  }
}

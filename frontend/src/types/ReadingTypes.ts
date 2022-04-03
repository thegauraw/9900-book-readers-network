export interface RatingAndReviewForm {
  rating: number | null;
  review: string | null;
}

export interface ReadingByBookIdFromOwnerResponse {
  has_read: boolean;
  last_update_read_at: string | null;
  last_update_review_rating_at: string | null;
  rating: number | null;
  review: string | null;
  username: string;
}

export interface ReadingsListByBookIdResponse {
  username: string;
  last_update_review_rating_at: string | null;
  rating: number | null;
  review: string | null;
}

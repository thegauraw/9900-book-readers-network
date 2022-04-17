export enum SearchMethods {
  all = 'all',
  authors = 'authors',
  books = 'books',
}

export enum RecommendationModes {
  title = 'title',
  author = 'author',
  category = 'category',
  publisher = 'publisher',
}

export interface SearchParams {
  q?: string | null;
  by?: SearchMethods | null;
  p?: string | null;
  min?: string | null;
}

export interface SearchSuccessItemResponse {
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    categories: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    imageLinks: {
      smallThumbnail: string;
    };
  };
}

export interface SearchSuccessResponse {
  totalItems: number;
  items: SearchSuccessItemResponse[];
}

export interface SearchErrorResponse {
  error: {
    code: number;
    message: string;
  };
}

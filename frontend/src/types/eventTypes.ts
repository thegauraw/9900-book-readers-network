export interface EventData {
  id: string;
  title: string;
  description: string;
  eventTime: Date;
  venue: string;
  createdBy: string;
  bookId: string;
}

export interface EventAPIData {
  id: string;
  title: string;
  description: string;
  date_and_time: Date;
  venue: string;
  organised_by: string;
  related_book: string;
}

export interface EventFormData {
  title: string | null;
  description: string | null;
  eventTime: Date | null;
  venue: string | null;
  // createdBy: string | null;
  bookId: string | null;
}

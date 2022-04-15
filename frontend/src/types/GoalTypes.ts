export interface BookOverview {
  volume_id: string;
  title: string;
  smallThumbnail: string | null;
}

export interface MonthlyGoalStatus {
  finish: boolean;
  finish_date: string | null;
  goal_num: number;
  month: string;
  read_num: number;
  book_list: BookOverview[];
}

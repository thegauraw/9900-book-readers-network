export interface TransferState<T> {
  isLoading: boolean;
  settlement: T | null;
  error?: string | null;
}

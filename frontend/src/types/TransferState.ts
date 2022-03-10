export interface TransferState<T> {
  isLoading: boolean;
  settlement: T | Error | null; // data or error or not started
}

import { IStreamSubscriber } from "@microsoft/signalr";

export const subscriber = <T>(
  onNext: (value: T) => void, 
  onError?: (error: Error) => void, 
  onComplete?: () => void
) => {
  return {
    next(value) {
      onNext(value);
    },
    error(error) {
      onError?.(error);
    },
    complete() {
      onComplete?.()
    }
  } as IStreamSubscriber<T>
}
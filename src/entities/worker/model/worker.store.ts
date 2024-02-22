interface WorkerState {
  
}

export function useWorkerStore() {
  return {
    workers: [],
    selectedWorker: null
  }
}
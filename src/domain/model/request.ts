interface BaseRequest {
  status: RequestStatus.IDLE | RequestStatus.FULFILLED | RequestStatus.PENDING;
}

interface ErrorRequest {
  status: RequestStatus.REJECTED;
  error: string;
}

export type Request = BaseRequest | ErrorRequest;

export enum RequestStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

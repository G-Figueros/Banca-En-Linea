import { Transfer } from '../models/transfer.models';

export class TransferService {
  getTransfers(): Promise<Transfer[]> {
    return Promise.resolve([]);
  }
}

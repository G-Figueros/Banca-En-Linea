import { Account } from '../models/account.models';

export class AccountService {
  getAccounts(): Promise<Account[]> {
    return Promise.resolve([]);
  }
}

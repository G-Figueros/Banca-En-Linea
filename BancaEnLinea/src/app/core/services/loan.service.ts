import { Loan } from '../models/loan.models';

export class LoanService {
  getLoans(): Promise<Loan[]> {
    return Promise.resolve([]);
  }
}

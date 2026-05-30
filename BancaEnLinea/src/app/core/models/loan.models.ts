export interface Loan {
  id: string;
  amount: number;
  termMonths: number;
  interestRate: number;
  status: 'pending' | 'approved' | 'rejected';
}

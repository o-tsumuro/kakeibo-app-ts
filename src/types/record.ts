export type RecordType = 'income' | 'expense';

export type PaymentSource = 'wallet' | 'bank';

export type Category = {
  id: string;
  name: string;
};

export type RecordItem = {
  id: string;
  type: RecordType;
  categoryId: string;
  amount: number;
  date: string;
  source: PaymentSource;
  memo?: string;
};
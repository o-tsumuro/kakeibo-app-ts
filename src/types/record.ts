export type RecordType = 'income' | 'expense' | 'transfer';

export type PaymentSource = 'wallet' | 'bank';

export type Category = {
  id: string;
  name: string;
};

export type BaseRecord = {
  id: string;
  type: RecordType;
  amount: number;
  date: string;
  memo?: string;
};

export type StandartRecord = BaseRecord & {
  type: 'income' | 'expense';
  categoryId: string;
  source: PaymentSource;
};

export type TransferRecord = BaseRecord & {
  type: 'transfer';
  from: PaymentSource;
  to: PaymentSource;
}

export type RecordItem = StandartRecord | TransferRecord;
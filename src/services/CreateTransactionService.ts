import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (!title) {
      throw Error('A title is requerid to create a transaction');
    }
    if (!type) {
      throw Error('A type is requerid to create a transaction');
    }
    if (!value) {
      throw Error('A value is requerid to create a transaction');
    }
    if (type === 'outcome' && value > balance.total) {
      throw Error(
        `A transaction of type 'outcome' can't be menor of the total`,
      );
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;

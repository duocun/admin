import { Http, HttpStatus } from "../API";

export class FinanceAPI {
  // url = 'Transactions';
  // http = new Http();

  TransactionAction = {
    DECLINE_CREDIT_CARD: { code: 'DC', name: 'decline credit card payment' },
    PAY_DRIVER_CASH: { code: 'PDCH', name: 'client pay driver cash' }, // 'client pay cash', 'pay cash'
    PAY_BY_CARD: { code: 'PC', name: 'client pay by card' }, // 'pay by card'
    PAY_BY_WECHAT: { code: 'PW', name: 'client pay by wechat' }, // 'pay by wechat'

    PAY_MERCHANT_CASH: { code: 'PMCH', name: 'driver pay merchant cash' }, // pay merchant
    PAY_MERCHANT_BY_CARD: { code: 'PMC', name: 'driver pay merchant by card' }, // pay merchant by card
    PAY_MERCHANT_BY_WECHAT: { code: 'PMW', name: 'driver pay merchant by wechat' }, // pay merchant by wechat

    PAY_SALARY: { code: 'PS', name: 'pay salary' },
    PAY_OFFICE_RENT: { code: 'POR', name: 'pay office rent' },

    ORDER_FROM_MERCHANT: { code: 'OFM', name: 'duocun order from merchant' },
    ORDER_FROM_DUOCUN: { code: 'OFD', name: 'client order from duocun' },
    CANCEL_ORDER_FROM_MERCHANT: { code: 'CFM', name: 'duocun cancel order from merchant' },
    CANCEL_ORDER_FROM_DUOCUN: { code: 'CFD', name: 'client cancel order from duocun' },

    REFUND_EXPENSE: { code: 'RE', name: 'refund expense' },
    REFUND_CLIENT: { code: 'RC', name: 'refund client' },
    ADD_CREDIT_BY_CARD: { code: 'ACC', name: 'client add credit by card' },
    ADD_CREDIT_BY_WECHAT: { code: 'ACW', name: 'client add credit by WECHATPAY' },
    ADD_CREDIT_BY_CASH: { code: 'ACCH', name: 'client add credit by cash' },
    TRANSFER: { code: 'T', name: 'transfer' },
    BUY_MATERIAL: { code: 'BM', name: 'buy material' }, // buy drinks
    BUY_EQUIPMENT: { code: 'BE', name: 'buy equipment' },
    BUY_ADVERTISEMENT: { code: 'BA', name: 'buy advertisement' },
    OTHER_EXPENSE: { code: 'OE', name: 'other expense' },
    TEST: { code: 'TEST', name: 'test' }
  };

  //helper functions
  /**
   *this method take an object which is a transaction
   *determine if the transaction is a normal transaction
   * @param {object} transaction
   *
   **/

  ifTransactionNormal = (transaction) => {
    //transaction with pay, action code: PW, PC(wechat or card)
    //transaction without pay, but orders made
  };
}

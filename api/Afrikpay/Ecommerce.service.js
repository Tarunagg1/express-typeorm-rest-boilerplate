import { Ecommerce } from 'afrikpay-node-sdk';

class EcommercePay {
    constructor() {
        this.ecommerce = new Ecommerce(
            'AFC6617',
            '661671d0bd7bef499e7d80879c27d95e',
            '7777',
            'http://34.86.5.170:8086/api/ecommerce/collect/',
            'http://34.86.5.170:8086/api/ecommerce/payout/',
            'http://34.86.5.170:8086/api/ecommerce/deposit/',
            'http://34.86.5.170:8086/api/ecommerce/changekey/',
            'http://34.86.5.170:8086/api/ecommerce/transaction/status/'
        );
    }

    collectAfrikpay(){}

    collectmtn_mobilemoney_cm(){}
}


// ecommerce.collect()
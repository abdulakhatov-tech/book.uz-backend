import { PaymentMethodModel } from "../../../models";

class PaymentMethodsService {
    constructor() {}

    async getAllPaymentMethods() {
        const paymentMethods = await PaymentMethodModel.find().exec();

        return paymentMethods;
    }
}

export default PaymentMethodsService;
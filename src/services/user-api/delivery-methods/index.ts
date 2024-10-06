import { DeliveryMethodModel } from "../../../models";

class DeliveryMethodsService {
    constructor() {}

    async getAllDeliveryMethods() {
        const deliveryMethods = await DeliveryMethodModel.find().exec();

        return deliveryMethods;
    }
}

export default DeliveryMethodsService;
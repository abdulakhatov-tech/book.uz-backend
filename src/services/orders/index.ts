import OrderModel from "../../models/order"

class OrdersService {

    async createOrder(body: any) {
        const order = await OrderModel.create(body)

        if (!order) {
            throw new Error("Failed to create order")
        }

        return order;
    }

    async getUserOrders(userId: string) {
        const orders = await OrderModel.find({ user: userId })

        if (!orders) {
            throw new Error("Failed to fetch user orders")
        }

        return orders
    }

    async updateOrderStatus(orderId: string, status: string) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true })
    
        if (!updatedOrder) {
            throw new Error("Failed to update order status")
        }

        return updatedOrder
    }
}

export default new OrdersService()
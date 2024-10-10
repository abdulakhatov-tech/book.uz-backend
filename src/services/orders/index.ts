import OrderModel from "../../models/order";

class OrdersService {
  async getAllOrders() {
    const orders = await OrderModel.find()
      .populate("user")
      .populate({
        path: 'books.book', // Populating the book field inside the books array
        model: 'book',
      })
      .populate({
        path: 'billingAddress.region', 
        model: 'region',
      })
      .populate({
        path: 'billingAddress.district', 
        model: 'district',
      })

    if (!orders) {
      throw new Error("Failed to fetch orders");
    }

    return orders;
  }

  async createOrder(body: any) {
    const order = await OrderModel.create(body);

    if (!order) {
      throw new Error("Failed to create order");
    }

    return order;
  }

  async getUserOrders(userId: string) {
    const orders = await OrderModel.find({ user: userId });

    if (!orders) {
      throw new Error("Failed to fetch user orders");
    }

    return orders;
  }

  async updateOrderStatus(orderId: string, status: string) {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      throw new Error("Failed to update order status");
    }

    return updatedOrder;
  }
}

export default new OrdersService();

class Order {
    constructor({ order_id, user_id, products, total_price, status, created_at }) {
      this.order_id = order_id;
      this.user_id = user_id;
      this.products = products;
      this.total_price = total_price;
      this.status = status;
      this.created_at = created_at;
    }}
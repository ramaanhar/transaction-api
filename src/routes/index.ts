import { Application, Router } from "express";
import addressRoutes from "./address.routes";
import customerRoutes from "./customer.routes";
import paymentMethodRoutes from "./paymentMethod.routes";
import productRoutes from "./product.routes";
import transactionRoutes from "./transaction.routes";

const _routes: Array<[string, Router]> = [
  ["/api/addresses", addressRoutes],
  ["/api/customers", customerRoutes],
  ["/api/payment-methods", paymentMethodRoutes],
  ["/api/products", productRoutes],
  ["/api/transactions", transactionRoutes],
];

const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};

export default routes;

export default interface TransactionInput {
  customerId: number;
  customerAddressId: number;
  productIds: number[];
  paymentMethodIds: number[];
}

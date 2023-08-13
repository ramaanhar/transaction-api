import { beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "../utils/__mocks__/prisma";
import request from "supertest";
import app from "../utils/app";

vi.mock("utils/prisma");

const transactionData = {
  customerId: 1,
  customerAddressId: 1,
  productIds: [1, 2, 3],
  paymentMethodIds: [1, 2],
};
const newTransactionData = {
  customerId: 2,
  customerAddressId: 2,
  productIds: [3],
  paymentMethodIds: [3, 4],
};
const transactionsData = [
  {
    id: 2,
    customerId: 3,
    customerAddressId: 1,
  },
  {
    id: 3,
    customerId: 2,
    customerAddressId: 3,
  },
  {
    id: 4,
    customerId: 1,
    customerAddressId: 1,
  },
];

beforeEach(() => {
  prisma.customer.createMany.mockResolvedValueOnce({
    count: 3,
  });
  prisma.product.createMany.mockResolvedValueOnce({
    count: 3,
  });
  prisma.paymentMethod.createMany.mockResolvedValueOnce({
    count: 4,
  });
});

describe("/api/transactions", async () => {
  describe("[POST] /api/transactions", async () => {
    it("should create a new transaction", async () => {
      const { customerId, customerAddressId, productIds, paymentMethodIds } =
        transactionData;

      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      prisma.transaction.create.mockResolvedValueOnce({
        id: 1,
        customerId,
        customerAddressId,
      });

      prisma.transactionProduct.createMany.mockResolvedValueOnce({
        count: productIds.length,
      });
      prisma.transactionPaymentMethod.createMany.mockResolvedValueOnce({
        count: paymentMethodIds.length,
      });

      const { status, body } = await request(app)
        .post("/api/transactions")
        .send(transactionData);

      expect(status).toBe(201);
      expect(body.data).toMatchObject({
        id: 1,
        customerId,
        customerAddressId,
      });
    });

    it("should create a new transaction data even the product ids array or the payment method ids array is empty", async () => {
      const { customerId, customerAddressId } = transactionData;

      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      prisma.transaction.create.mockResolvedValueOnce({
        id: 1,
        customerId,
        customerAddressId,
      });
      prisma.transactionProduct.createMany.mockResolvedValueOnce({
        count: 0,
      });

      prisma.transactionPaymentMethod.createMany.mockResolvedValueOnce({
        count: 0,
      });

      const { status, body } = await request(app)
        .post("/api/transactions")
        .send({
          customerId,
          customerAddressId,
          productIds: [],
          paymentMethodIds: [],
        });
      expect(status).toBe(201);
      expect(body.data).toMatchObject({
        id: 1,
        customerId,
        customerAddressId,
      });
    });
  });

  describe("[GET] /api/transactions", async () => {
    it("should get all transactions", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      prisma.transaction.findMany.mockResolvedValueOnce(transactionsData);

      const { status, body } = await request(app).get("/api/transactions");
      expect(status).toBe(200);
      expect(body.data).toMatchObject(transactionsData);
    });
  });

  describe("[GET] /api/transactions/:id", async () => {
    it("should get a right transaction data based on id", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      const id = 2;
      const selectedData =
        transactionsData.find((data) => data.id === id) || null;
      prisma.transaction.findFirst.mockResolvedValueOnce(selectedData);

      const { status, body } = await request(app).get(
        `/api/transactions/${id}`
      );
      expect(status).toBe(200);
      expect(body.id).toBe(id);
    });

    it("should return 404 if transaction data not found", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 1000;
      const { status, body } = await request(app).get(
        `/api/transactions/${id}`
      );

      expect(status).toBe(404);
      expect(body.message).toBe("Not Found");
    });
  });

  describe("[PATCH] /api/transactions/:id", async () => {
    it("should return 404 if transaction data not found", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 1000;
      const { status, body } = await request(app).patch(
        `/api/transactions/${id}`
      );

      expect(status).toBe(404);
      expect(body.message).toBe("Not Found");
    });

    it("should update the transaction data", async () => {
      const { customerId, customerAddressId, productIds, paymentMethodIds } =
        newTransactionData;

      const id = 2;
      const selectedData =
        transactionsData.find((data) => data.id === id) || null;
      prisma.transaction.findFirst.mockResolvedValueOnce(selectedData);

      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      prisma.transaction.update.mockResolvedValueOnce({
        id,
        customerId,
        customerAddressId,
      });

      prisma.transactionProduct.createMany.mockResolvedValueOnce({
        count: productIds.length,
      });
      prisma.transactionPaymentMethod.createMany.mockResolvedValueOnce({
        count: paymentMethodIds.length,
      });

      const { status, body } = await request(app)
        .patch(`/api/transactions/${id}`)
        .send(newTransactionData);

      expect(status).toBe(200);
      expect(body.data).toMatchObject({
        id,
        customerId,
        customerAddressId,
      });
    });
  });

  describe("[DELETE] /api/transactions/:id", async () => {
    it("should delete the transaction data based on id", async () => {
      const { customerId, customerAddressId, productIds, paymentMethodIds } =
        newTransactionData;

      const id = 2;
      const selectedData =
        transactionsData.find((data) => data.id === id) || null;
      prisma.transaction.findFirst.mockResolvedValueOnce(selectedData);

      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      prisma.transaction.delete.mockResolvedValueOnce({
        id,
        customerId,
        customerAddressId,
      });

      const { status, body } = await request(app)
        .delete(`/api/transactions/${id}`)
        .send(newTransactionData);
      console.log(body);
      expect(status).toBe(200);
    });
  });
});

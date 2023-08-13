import { beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "../utils/__mocks__/prisma";
import request from "supertest";
import app from "../utils/app";

vi.mock("utils/prisma");

const paymentMethodData = {
  name: "Bank X",
  isActive: true,
};
const newPaymentMethodData = {
  name: "Bank XYZ",
  isActive: false,
};
const paymentMethodsData = [
  {
    id: 2,
    name: "Tunai",
    isActive: true,
  },
  {
    id: 3,
    name: "Kartu Debit",
    isActive: true,
  },
  {
    id: 4,
    name: "Kartu Kredit",
    isActive: true,
  },
  {
    id: 5,
    name: "Dompet Digital",
    isActive: true,
  },
];

describe("/api/payment-methods", async () => {
  describe("[POST] /api/payment-methods", async () => {
    it("should create a new payment method", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      prisma.paymentMethod.create.mockResolvedValueOnce({
        id: 1,
        ...paymentMethodData,
      });

      const { status, body } = await request(app)
        .post("/api/payment-methods")
        .send(paymentMethodData);
      expect(status).toBe(201);
      expect(body.data).toMatchObject({
        id: 1,
        ...paymentMethodData,
      });
    });
  });

  describe("[GET] /api/payment-methods", async () => {
    it("should get all payment methods", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      prisma.paymentMethod.findMany.mockResolvedValueOnce(paymentMethodsData);

      const { status, body } = await request(app).get("/api/payment-methods");
      expect(status).toBe(200);
      expect(body.data).toMatchObject(paymentMethodsData);
    });
  });

  describe("[GET] /api/payment-methods/:id", async () => {
    it("should get a right payment method data based on id", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      const id = 2;
      const selectedData =
        paymentMethodsData.find((data) => data.id === id) || null;
      prisma.paymentMethod.findFirst.mockResolvedValueOnce(selectedData);

      const { status, body } = await request(app).get(
        `/api/payment-methods/${id}`
      );
      expect(status).toBe(200);
      expect(body.id).toBe(id);
    });

    it("should return 404 if payment method data does not found", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 1000;
      const { status, body } = await request(app).get(
        `/api/payment-methods/${id}`
      );

      expect(status).toBe(404);
      expect(body.message).toBe("Not Found");
    });
  });

  describe("[PATCH] /api/payment-methods/:id", async () => {
    it("should return 404 if payment method data does not found", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 1000;
      const { status, body } = await request(app).patch(
        `/api/payment-methods/${id}`
      );

      expect(status).toBe(404);
      expect(body.message).toBe("Not Found");
    });

    it("should update the payment method data", async () => {
      const id = 2;
      const selectedData =
        paymentMethodsData.find((data) => data.id === id) || null;
      prisma.paymentMethod.findFirst.mockResolvedValueOnce(selectedData);

      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      prisma.paymentMethod.update.mockResolvedValueOnce({
        id,
        ...newPaymentMethodData,
      });

      const { status, body } = await request(app)
        .patch(`/api/payment-methods/${id}`)
        .send(newPaymentMethodData);
      expect(status).toBe(200);
      expect(body.data).toMatchObject({
        id,
        ...newPaymentMethodData,
      });
    });
  });

  describe("[DELETE] /api/payment-methods/:id", async () => {
    it("should delete the payment method data based on id", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 2;
      const selectedData =
        paymentMethodsData.find((data) => data.id === id) || null;
      prisma.paymentMethod.findFirst.mockResolvedValueOnce(selectedData);
      if (selectedData) {
        prisma.paymentMethod.delete.mockResolvedValueOnce({
          ...selectedData,
        });
      }
      // const { id, customerId, address } = selectedData

      const { status, body } = await request(app).delete(
        `/api/payment-methods/${id}`
      );
      expect(status).toBe(200);
      expect(body.message).toBe("Successfully Deleted!");
    });
  });
});

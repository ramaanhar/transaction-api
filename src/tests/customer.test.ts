import { beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "../utils/__mocks__/prisma";
import request from "supertest";
import app from "../utils/app";

vi.mock("utils/prisma");

const customerData = {
  name: "Udin",
};
const newCustomerData = {
  name: "Udin Sedunia",
};
const customersData = [
  {
    id: 2,
    name: "Aziz",
  },
  {
    id: 3,
    name: "Burhan",
  },
  {
    id: 4,
    name: "Clara",
  },
];

describe("/api/customers", async () => {
  describe("[POST] /api/customers", async () => {
    it("should create a new customer", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      prisma.customer.create.mockResolvedValueOnce({
        id: 1,
        ...customerData,
      });

      const { status, body } = await request(app)
        .post("/api/customers")
        .send(customerData);
      expect(status).toBe(201);
      expect(body.data).toMatchObject({
        id: 1,
        ...customerData,
      });
    });
  });

  describe("[GET] /api/customers", async () => {
    it("should get all customers", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      prisma.customer.findMany.mockResolvedValueOnce(customersData);

      const { status, body } = await request(app).get("/api/customers");
      expect(status).toBe(200);
      expect(body.data).toMatchObject(customersData);
    });
  });

  describe("[GET] /api/customers/:id", async () => {
    it("should get a right customer data based on id", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      const id = 2;
      const selectedData = customersData.find((data) => data.id === id) || null;
      prisma.customer.findFirst.mockResolvedValueOnce(selectedData);

      const { status, body } = await request(app).get(`/api/customers/${id}`);
      expect(status).toBe(200);
      expect(body.id).toBe(id);
    });

    it("should return 404 if customer data not found", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 1000;
      const { status, body } = await request(app).get(`/api/customers/${id}`);

      expect(status).toBe(404);
      expect(body.message).toBe("Not Found");
    });
  });

  describe("[PATCH] /api/customers/:id", async () => {
    it("should return 404 if customer data not found", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 1000;
      const { status, body } = await request(app).patch(`/api/customers/${id}`);

      expect(status).toBe(404);
      expect(body.message).toBe("Not Found");
    });

    it("should update the customer data", async () => {
      const id = 2;
      const selectedData = customersData.find((data) => data.id === id) || null;
      prisma.customer.findFirst.mockResolvedValueOnce(selectedData);

      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      prisma.customer.update.mockResolvedValueOnce({
        id,
        ...newCustomerData,
      });

      const { status, body } = await request(app)
        .patch(`/api/customers/${id}`)
        .send(newCustomerData);
      expect(status).toBe(200);
      expect(body.data).toMatchObject({
        id,
        ...newCustomerData,
      });
    });
  });

  describe("[DELETE] /api/customers/:id", async () => {
    it("should delete the customer data based on id", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 2;
      const selectedData = customersData.find((data) => data.id === id) || null;
      prisma.customer.findFirst.mockResolvedValueOnce(selectedData);
      if (selectedData) {
        prisma.customer.delete.mockResolvedValueOnce({
          ...selectedData,
        });
      }
      // const { id, customerId, address } = selectedData

      const { status, body } = await request(app).delete(
        `/api/customers/${id}`
      );
      expect(status).toBe(200);
      expect(body.message).toBe("Successfully Deleted!");
    });
  });
});

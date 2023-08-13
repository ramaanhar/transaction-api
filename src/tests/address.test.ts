import { beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "../utils/__mocks__/prisma";
import request from "supertest";
import app from "../utils/app";

vi.mock("utils/prisma");

const addressData = {
  customerId: 1,
  address: "Jl. Baleendah no.1",
};
const newAddressData = {
  customerId: 1,
  address: "Jl. Baleendah no.143",
};
const addressesData = [
  {
    id: 2,
    customerId: 3,
    address: "Jl. Manggahang no. 100",
  },
  {
    id: 3,
    customerId: 3,
    address: "Jl. Banjaran no.12",
  },
  {
    id: 4,
    customerId: 2,
    address: "Jl. Ciparay no.14",
  },
];

beforeEach(() => {
  prisma.customer.createMany.mockResolvedValueOnce({
    count: 3,
  });
});

describe("/api/addresses", async () => {
  describe("[POST] /api/addresses", async () => {
    it("should create a new address", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      prisma.customerAddress.create.mockResolvedValueOnce({
        id: 1,
        ...addressData,
      });

      const { status, body } = await request(app)
        .post("/api/addresses")
        .send(addressData);

      expect(status).toBe(201);
      expect(body.data).toMatchObject({
        id: 1,
        ...addressData,
      });
    });
  });

  describe("[GET] /api/addresses", async () => {
    it("should get all addresses", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      prisma.customerAddress.findMany.mockResolvedValueOnce(addressesData);

      const { status, body } = await request(app).get("/api/addresses");
      expect(status).toBe(200);
      expect(body.data).toMatchObject(addressesData);
    });
  });

  describe("[GET] /api/addresses/:id", async () => {
    it("should get a right address data based on id", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      const id = 2;
      const selectedData = addressesData.find((data) => data.id === id) || null;
      prisma.customerAddress.findFirst.mockResolvedValueOnce(selectedData);

      const { status, body } = await request(app).get(`/api/addresses/${id}`);
      expect(status).toBe(200);
      expect(body.id).toBe(id);
    });

    it("should return 404 if address data not found", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 1000;
      const { status, body } = await request(app).get(`/api/addresses/${id}`);

      expect(status).toBe(404);
      expect(body.message).toBe("Not Found");
    });
  });

  describe("[PATCH] /api/addresses/:id", async () => {
    it("should return 404 if address data not found", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 1000;
      const { status, body } = await request(app).patch(`/api/addresses/${id}`);

      expect(status).toBe(404);
      expect(body.message).toBe("Not Found");
    });

    it("should update the address data", async () => {
      const id = 2;
      const selectedData = addressesData.find((data) => data.id === id) || null;
      prisma.customerAddress.findFirst.mockResolvedValueOnce(selectedData);

      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      prisma.customerAddress.update.mockResolvedValueOnce({
        id,
        ...newAddressData,
      });

      const { status, body } = await request(app)
        .patch(`/api/addresses/${id}`)
        .send(newAddressData);

      expect(status).toBe(200);
      expect(body.data).toMatchObject({
        id,
        ...newAddressData,
      });
    });
  });

  describe("[DELETE] /api/address/:id", async () => {
    it("should delete the address data based on id", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 2;
      const selectedData = addressesData.find((data) => data.id === id) || null;
      prisma.customerAddress.findFirst.mockResolvedValueOnce(selectedData);
      if (selectedData) {
        prisma.customerAddress.delete.mockResolvedValueOnce({
          ...selectedData,
        });
      }
      // const { id, customerId, address } = selectedData

      const { status, body } = await request(app).delete(
        `/api/addresses/${id}`
      );
      expect(status).toBe(200);
    });
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "../utils/__mocks__/prisma";
import request from "supertest";
import app from "../utils/app";
import { Prisma } from "@prisma/client";

vi.mock("utils/prisma");

const productData = {
  name: "Mie goreng",
  price: new Prisma.Decimal(5000.0),
};
const newProductData = {
  name: "Mie goreng telor keju",
  price: new Prisma.Decimal(12000.0),
};
const productsData = [
  {
    id: 2,
    name: "Soto ayam",
    price: new Prisma.Decimal(10000.0),
  },
  {
    id: 3,
    name: "Nasi chicken katsu",
    price: new Prisma.Decimal(13000.0),
  },
  {
    id: 4,
    name: "Nasi goreng",
    price: new Prisma.Decimal(15000.0),
  },
];

describe("/api/products", async () => {
  describe("[POST] /api/products", async () => {
    it("should create a new product", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      prisma.product.create.mockResolvedValueOnce({
        id: 1,
        ...productData,
      });

      const { status, body } = await request(app)
        .post("/api/products")
        .send(productData);
      expect(status).toBe(201);
      expect(body.data).toMatchObject({
        id: 1,
        ...productData,
        price: productData.price.toString(),
      });
    });
  });

  describe("[GET] /api/products", async () => {
    it("should get all products", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      prisma.product.findMany.mockResolvedValueOnce(productsData);

      const { status, body } = await request(app).get("/api/products");
      expect(status).toBe(200);
      expect(body.data).toMatchObject(
        productsData.map((item) => ({ ...item, price: item.price.toString() }))
      );
    });
  });

  describe("[GET] /api/products/:id", async () => {
    it("should get a right product data based on id", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      const id = 2;
      const selectedData = productsData.find((data) => data.id === id) || null;
      prisma.product.findFirst.mockResolvedValueOnce(selectedData);

      const { status, body } = await request(app).get(`/api/products/${id}`);
      expect(status).toBe(200);
      expect(body).toMatchObject({
        ...selectedData,
        price: selectedData?.price.toString(),
      });
    });

    it("should return 404 if product data does not found", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 1000;
      const { status, body } = await request(app).get(`/api/products/${id}`);

      expect(status).toBe(404);
      expect(body.message).toBe("Not Found");
    });
  });

  describe("[PATCH] /api/products/:id", async () => {
    it("should return 404 if product data does not found", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 1000;
      const { status, body } = await request(app).patch(`/api/products/${id}`);

      expect(status).toBe(404);
      expect(body.message).toBe("Not Found");
    });

    it("should update the product data", async () => {
      const id = 2;
      const selectedData = productsData.find((data) => data.id === id) || null;
      prisma.product.findFirst.mockResolvedValueOnce(selectedData);

      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );
      prisma.product.update.mockResolvedValueOnce({
        id,
        ...newProductData,
      });

      const { status, body } = await request(app)
        .patch(`/api/products/${id}`)
        .send(newProductData);
      expect(status).toBe(200);
      expect(body.data).toMatchObject({
        id,
        ...newProductData,
        price: newProductData.price.toString(),
      });
    });
  });

  describe("[DELETE] /api/products/:id", async () => {
    it("should delete the product data based on id", async () => {
      prisma.$transaction.mockImplementationOnce((callback) =>
        callback(prisma)
      );

      const id = 2;
      const selectedData = productsData.find((data) => data.id === id) || null;
      prisma.product.findFirst.mockResolvedValueOnce(selectedData);
      if (selectedData) {
        prisma.product.delete.mockResolvedValueOnce({
          ...selectedData,
        });
      }
      // const { id, customerId, address } = selectedData

      const { status, body } = await request(app).delete(`/api/products/${id}`);
      expect(status).toBe(200);
      expect(body.message).toBe("Successfully Deleted!");
    });
  });
});

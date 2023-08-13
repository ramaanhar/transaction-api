import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.customer.create({
    data: {
      name: "Alice",
      addresses: {
        createMany: {
          data: [
            {
              address: "Baleendah",
            },
            { address: "Manggahang" },
          ],
        },
      },
    },
  });
  const bob = await prisma.customer.create({
    data: {
      name: "Bob",
      addresses: {
        createMany: {
          data: [
            {
              address: "Ciparay",
            },
            {
              address: "Pameungpeuk",
            },
          ],
        },
      },
    },
  });
  const cathy = await prisma.customer.create({
    data: {
      name: "Cathy",
      addresses: {
        createMany: {
          data: [
            {
              address: "Andir",
            },
            {
              address: "Dayeuhkolot",
            },
          ],
        },
      },
    },
  });
  const terigu = await prisma.product.create({
    data: {
      name: "Terigu",
      price: 15000.0,
    },
  });
  const minyak = await prisma.product.create({
    data: {
      name: "Minyak",
      price: 25000.0,
    },
  });
  const gula = await prisma.product.create({
    data: {
      name: "Gula",
      price: 13000.0,
    },
  });
  const tunai = await prisma.paymentMethod.create({
    data: {
      name: "Tunai",
      isActive: true,
    },
  });
  const kartuKredit = await prisma.paymentMethod.create({
    data: {
      name: "Kartu Kredit",
      isActive: true,
    },
  });
  const kartuDebit = await prisma.paymentMethod.create({
    data: {
      name: "Kartu Debit",
      isActive: true,
    },
  });
  const dompetDigital = await prisma.paymentMethod.create({
    data: {
      name: "Dompet Digital",
      isActive: true,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

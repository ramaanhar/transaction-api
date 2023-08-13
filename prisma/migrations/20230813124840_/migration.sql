-- DropForeignKey
ALTER TABLE `customeraddress` DROP FOREIGN KEY `CustomerAddress_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_customerAddressId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `transactionpaymentmethod` DROP FOREIGN KEY `TransactionPaymentMethod_paymentMethodId_fkey`;

-- DropForeignKey
ALTER TABLE `transactionpaymentmethod` DROP FOREIGN KEY `TransactionPaymentMethod_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `transactionproduct` DROP FOREIGN KEY `TransactionProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `transactionproduct` DROP FOREIGN KEY `TransactionProduct_transactionId_fkey`;

-- AddForeignKey
ALTER TABLE `CustomerAddress` ADD CONSTRAINT `CustomerAddress_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_customerAddressId_fkey` FOREIGN KEY (`customerAddressId`) REFERENCES `CustomerAddress`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionProduct` ADD CONSTRAINT `TransactionProduct_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionProduct` ADD CONSTRAINT `TransactionProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionPaymentMethod` ADD CONSTRAINT `TransactionPaymentMethod_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionPaymentMethod` ADD CONSTRAINT `TransactionPaymentMethod_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `PaymentMethod`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

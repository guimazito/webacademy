/*
  Warnings:

  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `dataHora` on the `Compra` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `Compra` DROP FOREIGN KEY `Compra_cpfCliente_fkey`;

-- DropForeignKey
ALTER TABLE `Endereco` DROP FOREIGN KEY `Endereco_cpfCliente_fkey`;

-- DropIndex
DROP INDEX `Compra_cpfCliente_fkey` ON `Compra`;

-- DropIndex
DROP INDEX `Endereco_cpfCliente_fkey` ON `Endereco`;

-- AlterTable
ALTER TABLE `Cliente` DROP PRIMARY KEY,
    MODIFY `cpfCliente` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`cpfCliente`);

-- AlterTable
ALTER TABLE `Compra` MODIFY `cpfCliente` VARCHAR(191) NOT NULL,
    MODIFY `dataHora` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Endereco` MODIFY `cpfCliente` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_cpfCliente_fkey` FOREIGN KEY (`cpfCliente`) REFERENCES `Cliente`(`cpfCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_cpfCliente_fkey` FOREIGN KEY (`cpfCliente`) REFERENCES `Cliente`(`cpfCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

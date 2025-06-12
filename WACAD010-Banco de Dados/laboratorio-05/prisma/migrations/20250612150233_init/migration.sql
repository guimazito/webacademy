/*
  Warnings:

  - You are about to drop the column `idEndereco` on the `Cliente` table. All the data in the column will be lost.
  - You are about to alter the column `dataHora` on the `Compra` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Cliente` DROP COLUMN `idEndereco`;

-- AlterTable
ALTER TABLE `Compra` MODIFY `dataHora` DATETIME NOT NULL;

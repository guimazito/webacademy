/*
  Warnings:

  - You are about to alter the column `dataHora` on the `Compra` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Compra` MODIFY `dataHora` DATETIME NOT NULL;

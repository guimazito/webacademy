-- CreateTable
CREATE TABLE `Cliente` (
    `cpfCliente` INTEGER NOT NULL,
    `idEndereco` INTEGER NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
    `celular` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `dataNascimento` DATE NOT NULL,

    PRIMARY KEY (`cpfCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `idEndereco` INTEGER NOT NULL AUTO_INCREMENT,
    `cpfCliente` INTEGER NOT NULL,
    `cep` VARCHAR(45) NOT NULL,
    `bairro` VARCHAR(45) NOT NULL,
    `cidade` VARCHAR(45) NOT NULL,
    `numero` VARCHAR(45) NOT NULL,
    `logradouro` VARCHAR(45) NOT NULL,
    `complemento` VARCHAR(45) NULL,

    PRIMARY KEY (`idEndereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `idProduto` INTEGER NOT NULL AUTO_INCREMENT,
    `idSubcategoria` INTEGER NOT NULL,
    `modelo` VARCHAR(45) NOT NULL,
    `fabricante` VARCHAR(45) NOT NULL,
    `precoBase` DOUBLE NOT NULL,
    `quantidadeDisponivel` INTEGER NOT NULL,

    PRIMARY KEY (`idProduto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `idCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subcategoria` (
    `idSubcategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `idCategoria` INTEGER NOT NULL,
    `nome` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idSubcategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NumeroSerie` (
    `idNumeroSerie` INTEGER NOT NULL AUTO_INCREMENT,
    `idProduto` INTEGER NOT NULL,
    `numeroSerie` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idNumeroSerie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `idCompra` INTEGER NOT NULL AUTO_INCREMENT,
    `cpfCliente` INTEGER NOT NULL,
    `idEndereco` INTEGER NOT NULL,
    `dataHora` DATETIME NOT NULL,
    `formaPagamento` VARCHAR(45) NOT NULL,
    `total` DOUBLE NOT NULL,
    `desconto` DOUBLE NULL,

    PRIMARY KEY (`idCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemCompra` (
    `idItemCompra` INTEGER NOT NULL AUTO_INCREMENT,
    `idCompra` INTEGER NOT NULL,
    `idProduto` INTEGER NOT NULL,
    `precoUnitario` DOUBLE NOT NULL,
    `quantidade` INTEGER NOT NULL,

    PRIMARY KEY (`idItemCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_cpfCliente_fkey` FOREIGN KEY (`cpfCliente`) REFERENCES `Cliente`(`cpfCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_idSubcategoria_fkey` FOREIGN KEY (`idSubcategoria`) REFERENCES `Subcategoria`(`idSubcategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcategoria` ADD CONSTRAINT `Subcategoria_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`idCategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NumeroSerie` ADD CONSTRAINT `NumeroSerie_idProduto_fkey` FOREIGN KEY (`idProduto`) REFERENCES `Produto`(`idProduto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_cpfCliente_fkey` FOREIGN KEY (`cpfCliente`) REFERENCES `Cliente`(`cpfCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_idEndereco_fkey` FOREIGN KEY (`idEndereco`) REFERENCES `Endereco`(`idEndereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCompra` ADD CONSTRAINT `ItemCompra_idCompra_fkey` FOREIGN KEY (`idCompra`) REFERENCES `Compra`(`idCompra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCompra` ADD CONSTRAINT `ItemCompra_idProduto_fkey` FOREIGN KEY (`idProduto`) REFERENCES `Produto`(`idProduto`) ON DELETE RESTRICT ON UPDATE CASCADE;

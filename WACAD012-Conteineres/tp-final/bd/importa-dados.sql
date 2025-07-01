LOAD DATA INFILE '/docker-entrypoint-initdb.d/dados-livros.txt'
INTO TABLE livros
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(nome, isbn, sinopse, url_imagem, autores);
/*#Cria database*/
create database db_controle_filmes_ab;
/*#entra no database*/
use db_controle_filmes_ab;
/*Cria a tabela*/
create table tbl_filme(
	id              int not null primary key auto_increment,
    nome            varchar(50) not null,
    duracao         time not null,
    sinopse         text not null,
    data_lancamento date not null,
    foto_capa       varchar(200),
    link_trailer    varchar(200)
);

RENAME TABLE tb_filme TO tbl_filme;

#mostra
show tables;
desc tb_filmes;

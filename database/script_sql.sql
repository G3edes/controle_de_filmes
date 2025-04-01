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

create table tbl_dublagem(
	id_dublagem     int not null primary key auto_increment,
    nome            varchar(50) not null,
    idade           INT(2) not null,
);

create table tbl_ator(
	id_ator       int not null primary key auto_increment,
    nome          varchar(50) not null,
    idade         INT(2) not null,
);
create table tbl_legenda(
	id_legenda         int not null primary key auto_increment,
    legenda            varchar(50) not null,
);
create table tbl_indicativa(
	id_indicativa      int not null primary key auto_increment,
    indicativa         INT(2) not null,
);
create table tbl_genero(
	id_genero      int not null primary key auto_increment,
    genero         varchar(50) not null,
);
create table tbl_plataforma(
	id_plataforma      int not null primary key auto_increment,
    plataforma         varchar(50) not null,
    link_plataforma    varchar(500) not null,
);
create table tbl_premiacao(
	id_premiacao      int not null primary key auto_increment,
    premiacao         varchar(50) not null,
    descricao         varchar(60) not null,    
);
create table tbl_nacionalidade(
	id_nacionalidade      int not null primary key auto_increment,
    nacionalidade         varchar(50) not null,
);
create table tbl_sexo(
	id_sexo      int not null primary key auto_increment,
    sexo         varchar(50) not null,
);
#mostra
show tables;
desc tb_filmes;

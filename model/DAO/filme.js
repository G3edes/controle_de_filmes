/*********************************************************************************\
|* Objetivo:Criar a Comunicação com o Banco de Dados para fazer o CRUD de filmes  |
|* Data:11/02/2025                                                                |
|* Autor:Gabriel Silva Guedes                                                     |
|* Versão:1.0                                                                     | 
\*********************************************************************************/

/*Import da biblioteca do prima client para executar os scripts SQL*/
const {PrismaClient}=require('@prisma/client')

    //Instancia(Criar um Objeto a ser Utilizado) a biblioteca do prisma/client
    const prisma = new PrismaClient()

/*Inserir Um Novo Filme*/
const insertFilme= async function(filme){
    try {
    let sql = `insert into tbl_filme(
        nome,
        duracao,
        sinopse,
        data_lancamento,
        foto_capa,
        link_trailer,
        id_indicativa
        )values(
        '${filme.nome}',
        '${filme.duracao}',
        '${filme.sinopse}',
        '${filme.data_lancamento}',
        '${filme.foto_capa}',
        '${filme.link_trailer}',
        '${filme.id_indicativa}'
        )`
    //Executa o script sql do banco de dados e aguarda o retorno do bd para saber se deu certo
    let result =  await prisma.$executeRawUnsafe(sql)
    //FUNDAMENTAL|AWAIT| só funciona se a function for async 

    if (result)
        return true        
    else
        return false
    } catch (error) {
        
    }
}

/*Atualizar Um Filme Existente*/
const updateFilme= async function(filme) {
    try {
            let sql = `update tbl_filme set 
            nome = '${filme.nome}',
            duracao = '${filme.duracao}',
            sinopse = '${filme.sinopse}',
            data_lancamento = '${filme.data_lancamento}',
            foto_capa = '${filme.foto_capa}',
            link_trailer = '${filme.link_trailer}',
            id_indicativa = '${filme.id_indicativa}'
            where id = '${filme.id}'`
        let resultfilme = await prisma.$executeRawUnsafe(sql)
        if (resultfilme) {
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}
/*Excluir Um Filme Existente*/
const deleteFilme = async function(id){
    try {
        let sql = `delete from tbl_filme where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

/*Retorna Todos Os Filmes Existentes*/
const selectAllFilme= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_filme order by id desc'
        //Executa o script no bd e aguarda o retorno dos dados
        let result= await prisma.$queryRawUnsafe(sql)
        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

/*Busca Um Filme Pelo ID*/
const selectByIdFilme= async function(id) {
    try {
        let sql= `select * from tbl_filme where id= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectLastInsertId = async function() {
    try {
        let sql = 'select id from tbl_filme order by id desc limit 1';
        let result = await prisma.$queryRawUnsafe(sql);
        if (result)
            return result;
        else
            return false;
    } catch (error) {
        return false;
    }
}

module.exports={
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selectLastInsertId,
    selectByIdFilme
}
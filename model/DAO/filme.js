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
        link_trailer
        )values(
        '${filme.nome}',
        '${filme.duracao}',
        '${filme.sinopse}',
        '${filme.data_lancamento}',
        '${filme.foto_capa}',
        '${filme.link_trailer}'
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

/***************************************************************************************************/

const insertgenero= async (genero) => {
    try {
        let sql = `insert into tbl_genero(
                    genero = '${genero.genero}'`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdGenero= async function(id) {
    try {
        let sql= `select * from tbl_genero where id= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllGenero= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_genero order by id desc'
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
const deleteGenero = async function(id){
    try {
        let sql = `delete from tbl_genero where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateGenro= async function(genero) {
    try {
            let sql = `update tbl_genero set 
            genero = '${genero.genero}',
            where id = '${genero.id}'`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

/*************************************************************************************************/

const insertsexo= async (sexo) => {
    try {
        let sql = `insert into tbl_sexo(
                    sexo = '${sexo.sexo}'`
                    
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdSexo= async function(id) {
    try {
        let sql= `select * from tbl_sexo where id= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllSexo= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_sexo order by id desc'
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
const deleteSexo = async function(id){
    try {
        let sql = `delete from tbl_sexo where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateSexo= async function(sexo) {
    try {
            let sql = `update tbl_sexo set 
            sexo = '${sexo.sexo}',
            where id = '${sexo.id}'`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

/**********************************************************************************************/

const insertindicativa= async (indicativa) => {
    try {
        let sql = `insert into tbl_idicativa(
                    sexo = '${indicativa.indicativa}'`
                    
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdIndicativa= async function(id) {
    try {
        let sql= `select * from tbl_indicativa where id= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllIndicativa= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_indicativa order by id desc'
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
const deleteIndicativa = async function(id){
    try {
        let sql = `delete from tbl_indicativa where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateIndicativa= async function(indicativa) {
    try {
            let sql = `update tbl_indicativa set 
            indicativa = '${indicativa.indicativa}',
            where id = '${indicativa.id}'`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

/********************************************************************************************/



/******************************************************************************************/

const insertplataforma = async (plataforma) => {
    try {
        let sql = `insert into tbl_plataforma(
                    plataforma = '${plataforma.plataforma}',
                    link_plataforma = '${plataforma.link_plataforma}'
                    `
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdPlataforma= async function(id) {
    try {
        let sql= `select * from tbl_plataforma where id= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllPlataforma= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_premiacao order by id desc'
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
const deletePlataforma = async function(id){
    try {
        let sql = `delete from tbl_plataforma where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updatePlataforma= async function(plataforma) {
    try {
            let sql = `update tbl_plataforma set 
            plataforma = '${plataforma.plataforma}',
            where id = '${plataforma.id}'`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

/*****************************************************************************************/

const insertnacionalidade= async (nacionalidade) => {
    try {
        let sql = `insert into tbl_nacionalidade(
                    nacionalidade = '${nacionalidade.nacionalidade}'`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdNacionalidade= async function(id) {
    try {
        let sql= `select * from tbl_nacionalidade where id= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllNacionalidade= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_nacionalidade order by id desc'
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
const deleteNacionalidade = async function(id){
    try {
        let sql = `delete from tbl_nacionalidade where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateNacionalidade= async function(nacionalidade) {
    try {
            let sql = `update tbl_plataforma set 
            nacionalidade = '${nacionalidade.nacionalidade}',
            where id = '${nacionalidade.id}'`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

/****************************************************************************************/

const insertlegenda= async (legenda) => {
    try {
        let sql = `insert into tbl_nacionalidade(
                    legenda = '${legenda.legenda}'`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdLegenda= async function(id) {
    try {
        let sql= `select * from tbl_legenda where id= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllLegenda= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_legenda order by id desc'
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
const deleteLegenda = async function(id){
    try {
        let sql = `delete from tbl_legenda where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateLegenda= async function(legenda) {
    try {
            let sql = `update tbl_legenda set 
            legenda = '${legenda.legenda}',
            where id = '${legenda.id}'`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

/****************************************************************************************/

const insertdublagem= async (dublagem) => {
    try {
        let sql = `insert into tbl_dublagem(
                    legenda = '${dublagem.dublagem}'`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdDublagem= async function(id) {
    try {
        let sql= `select * from tbl_dublagem where id= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllDublagem= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_dublagem order by id desc'
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
const deleteDublagem = async function(id){
    try {
        let sql = `delete from tbl_dublagem where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateDublagem= async function(dublagem) {
    try {
            let sql = `update tbl_dublagem set 
            dublagem = '${dublagem.legenda}',
            where id = '${dublagem.id}'`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports={
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selectByIdFilme,
}
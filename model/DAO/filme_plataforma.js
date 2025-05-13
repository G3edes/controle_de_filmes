//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertFilmePlataforma = async function(FilmePlataforma){
  try {

      let sql = `insert into tbl_filme_plataforma  ( 
                                          id_filme,
                                          id_plataforma
                                        ) 
                                          values 
                                        (
                                          ${FilmePlataforma.id_filme},
                                          ${FilmePlataforma.id_plataforma}
                                        )`
      //console.log(sql)

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um FilmeGenero existente
const updateFilmePlataforma = async function(FilmePlataforma){
  try {
      let sql = `update tbl_filme_plataforma set        id_filme       = ${FilmePlataforma.id_filme},
                                                    id_plataforma      = ${FilmePlataforma.id_plataforma}
                                        
                            where id = ${FilmePlataforma.id}                
                            `
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteFilmePlataforma = async function(id){
  try {
    let sql = `delete from tbl_filme_plataforma where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllFilmePlataforma = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_filme_plataforma order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um FilmeGenero pelo ID
const selectByIdFilmepPataforma = async function(id){
  try {
    let sql = `select * from tbl_filme_plataforma where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os filmes pelo genero
const selectFilmeByIdPlataforma = async function(idPlataforma){
  try {
      let sql = `select tbl_filme.* from tbl_filme 
                                            inner join tbl_filme_plataforma
                                              on tbl_filme.id = tbl_filme_plataforma.id_filme
                                            inner join tbl_plataforma
                                              on tbl_legenda.id = tbl_filme_plataforma.id_plataforma
                  where tbl_filme_plataforma.id_plataforma = ${idPlataforma}`

      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os generos pelo Filme
const selectPlataformaByIdFilme = async function(idFilme){
 try {
      let sql = `select tbl_plataforma.* from tbl_filme 
                                            inner join tbl_filme_plataforma
                                              on tbl_filme.id = tbl_filme_plataforma.id_filme
                                            inner join tbl_plataforma
                                              on tbl_plataforma.id = tbl_filme_plataforma.id_plataforma
                  where tbl_filme_plataforma.id_filme = ${idFilme}`
                  
      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}


module.exports = {
     insertFilmePlataforma,
     updateFilmePlataforma,
     deleteFilmePlataforma,
     selectAllFilmePlataforma,
     selectByIdFilmepPataforma,
     selectFilmeByIdPlataforma,
     selectPlataformaByIdFilme
} 
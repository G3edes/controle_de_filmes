//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const filmePlataformaDAO = require('../../model/DAO/filme_plataforma.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirFilmePlataforma = async function(filmePlataforma, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    filmePlataforma.id_filme              == ''           || filmePlataforma.id_filme     == undefined    || filmePlataforma.id_filme  == null || isNaN(filmePlataforma.id_filme)  || filmePlataforma.id_filme <=0 ||
                    filmePlataforma.id_plataforma             == ''           || filmePlataforma.id_plataforma    == undefined    || filmePlataforma.id_plataforma == null || isNaN(filmePlataforma.id_plataforma) || filmePlataforma.id_plataforma<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let result = await filmePlataformaDAO.insertFilmePlataforma(filmePlataforma)

                    if(result)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero no DAO
const atualizarFilmePlataforma = async function(id, filmePlataforma, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                       == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                    filmePlataforma.id_filme              == ''           || filmePlataforma.id_filme     == undefined    || filmePlataforma.id_filme  == null || isNaN(filmePlataforma.id_filme)  || filmePlataforma.id_filme <=0 ||
                    filmePlataforma.id_plataforma             == ''           || filmePlataforma.id_plataforma    == undefined    || filmePlataforma.id_plataforma == null || isNaN(filmePlataforma.id_plataforma) || filmePlataforma.id_plataforma<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let result = await filmePlataformaDAO.selectByIdFilmepPataforma(parseInt(id))

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            genero.id = parseInt(id)

                            let result = await filmePlataformaDAO.updateFilmePlataforma(filmePlataforma)

                            if(result){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero no DAO
const excluirFilmePlataforma = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let result = await filmePlataformaDAO.selectAllFilmePlataforma(parseInt(id))

            if(result != false || typeof(result) == 'object'){
                //Se existir, faremos o delete
                if(result.length > 0){
                    //delete
                    let result = await filmePlataformaDAO.deleteFilmePlataforma(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de generos do DAO
const listarFilmePlataforma = async function(){
    try {
        //Objeto do tipo JSON
        let dadosplataforma = {}
        //Chama a função para retornar os generos cadastrados
        let result = await filmePlataformaDAO.selectAllFilmePlataforma()

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosplataforma.status = true
                dadosplataforma.status_code = 200
                dadosplataforma.items = result.length
                dadosplataforma.films = result

                return dadosplataforma
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarFilmePlataforma = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dados = {}

            let result = await filmePlataformaDAO.selectByIdFilmepPataforma(parseInt(id))
            
            if(result != false || typeof(result) == 'object'){
                if(result.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dados.status = true
                     dados.status_code = 200
                     dados.legenda = result

                    return dados //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar os generos pelo id do filme
const buscarPlataformaPorFilme = async function(idFilme){

    try {
        if(idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dados = {}

            let result = await filmePlataformaDAO.selectFilmeByIdPlataforma(parseInt(idFilme))
            
            if(result != false || typeof(result) == 'object'){
                if(result.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dados.status = true
                     dados.status_code = 200
                     dados.legenda = result

                    return dadosgenero //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar os filmes pelo id do genero
const buscarFilmePorPlataforma = async function(idPlataforma){

    try {
        if(idPlataforma == '' || idPlataforma == undefined || idPlataforma == null || isNaN(idPlataforma) || idPlataforma <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosFilme = {}

            let resultFilme = await filmePlataformaDAO.selectPlataformaByIdFilme(parseInt(idPlataforma))
            
            if(resultFilme != false || typeof(resultFilme) == 'object'){
                if(resultFilme.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosFilme.filme = resultFilme

                    return dadosFilme //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



module.exports = {
inserirFilmePlataforma,
atualizarFilmePlataforma,
excluirFilmePlataforma,
listarFilmePlataforma,
buscarFilmePlataforma,
buscarPlataformaPorFilme,
buscarFilmePorPlataforma
} 
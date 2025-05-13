/***********************************************************************************\
|* Objetivo:controller responsável pela regra de negócio referente ao CRUD de filme |
|* Data:11/02/2025                                                                  |
|* Autor:Gabriel Silva Guedes                                                       |
|* Versão:1.0                                                                       | 
\***********************************************************************************/

const filmeDAO=require('../../model/DAO/filme.js')
const message =require('../../modulo/config.js')

const controllerClassificacao   = require('../indicativa/controllerIndicativa.js')
const controllerFilmeGenero     = require('./controllerFilmeGenero.js')
const controllerFilmeLegenda    = require('./controllerFilmeLegenda.js')
const filmegeneroDAO = require ('../../model/DAO/filme_genero.js')
const filmelegendaDAO = require ('../../model/DAO/filme_legenda.js')

//Função para tratar a inserção de um novo filme no DAO
const inserirFilme = async function (filme, contentType) {
    try {
        console.log(filme, contentType)
    if (contentType=='application/json') {
        let response = {}
        if (filme.nome == ''                || filme.nome == undefined            || filme.nome == null             || filme.nome.lenght>80             ||
            filme.duracao == ''             || filme.duracao == undefined         || filme.duracao == null          || filme.duracao.lenght>5           ||
            filme.sinopse == ''             || filme.sinopse == undefined         || filme.sinopse == null          ||
            filme.data_lancamento == ''     || filme.data_lancamento == undefined || filme.data_lancamento == null  || filme.data_lancamento.lenght>10  ||
            filme.foto_capa == undefined    || filme.foto_capa .lenght>200        ||
            filme.link_trailer == undefined || filme.link_trailer.lenght>10       || filme.id_indicativa  == ''  || filme.id_indicativa  == undefined ||
            filme.id_indicativa  == ''   || filme.id_indicativa  == undefined)
        {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let resultFilme= await filmeDAO.insertFilme(filme)
            if (resultFilme) {
                // Se houver gêneros para associar
                if (filme.genero && Array.isArray(filme.genero)) {
                    // Obtém o ID do filme inserido
                    let filmeInserido = await filmeDAO.selectLastInsertId();
                    let idFilme = filmeInserido[0].id;
                    
                    // Para cada gênero no array, cria a relação
                    for (let genero of filme.genero) {
                        if (genero.id && !isNaN(genero.id)) {
                            let filmeGenero = {
                                id_filme: idFilme,
                                id_genero: genero.id
                            }
                            await filmegeneroDAO.insertFilmeGenero(filmeGenero);
                        }
                    
                    }
                }
                if (filme.legenda && Array.isArray(filme.legenda)) {
                    // Obtém o ID do filme inserido
                    let filmeInserido = await filmeDAO.selectLastInsertId();
                    let idFilme = filmeInserido[0].id
                    
                    // Para cada gênero no array, cria a relação
                    for (let legenda of filme.legenda) {
                        if (legenda.id && !isNaN(legenda.id)) {
                            let filmeLegenda = {
                                id_filme: idFilme,
                                id_legenda: legenda.id
                            }
                            await filmelegendaDAO.insertFilmeLegenda(filmeLegenda);
                        }
                    
                    }
                }
                return message.SUCCESS_CREATED_ITEM //201
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }  
    }else{
        return message.ERROR_CONTENT_TYPE //415
    }      
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLER //500
    }
}
//Função para tratar a atualização de um novo filme no DAO
const atualizarFilme = async function (id, filme, contentType) {
    try {
        if (contentType=='application/json') {
            let response = {}
            if (id         == ''                || id == undefined                    || id == null                     ||    isNaN(id) || id<=0            ||
                filme.nome == ''                || filme.nome == undefined            || filme.nome == null             || filme.nome.lenght>80             ||
                filme.duracao == ''             || filme.duracao == undefined         || filme.duracao == null          || filme.duracao.lenght>5           ||
                filme.sinopse == ''             || filme.sinopse == undefined         || filme.sinopse == null          ||
                filme.data_lancamento == ''     || filme.data_lancamento == undefined || filme.data_lancamento == null  || filme.data_lancamento.lenght>10  ||
                filme.foto_capa == undefined    || filme.foto_capa .lenght>200        ||
                filme.link_trailer == undefined || filme.link_trailer.lenght>10)
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultFilme=await filmeDAO.selectByIdFilme(id)
                if (resultFilme != false || typeof(resultFilme)== 'object') {
                    if (resultFilme.length>0) {
                        //add o id do filme no json com os dados
                        filme.id=parseInt(id)
                        let result = await filmeDAO.updateFilme(filme)
                        if (result) {
                            return message.SUCCESS_UPDATED_ITEM
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL
                        }
                    }else{
                        return message.ERROR_NOT_FOUND
                    }
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLER
    }
}
//Função para tratar a exclusão de um filme no DAO
const excluirFilme = async function (idFilme){
    try {
        if(idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(idFilme))

            if(resultFilme != false || typeof(resultFilme) == 'object'){
                //se exestir, faremos o delete
                if(resultFilme.length > 0){
                    //delete    
                    let result = await filmeDAO.deleteFilme(parseInt(idFilme))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return message.ERROR_NOT_FOUND
                }
                
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
//Função para tratar o retorno de uma lista de filmes do DAO
const listarFilme = async function () {
    try {
        let arrayFilmes=[]
        let dadosFilme={}
        let resultFilme = await filmeDAO.selectAllFilme()
        if (resultFilme!= false || typeof(resultFilme)=='object') {
        
            if(resultFilme.length>0){
                dadosFilme.status=true
                dadosFilme.status_code=200,
                dadosFilme.itens=resultFilme.length
                

                //Percorrer o array de filmes para pegar cada ID de classificação
                // e descobrir quais os dados da classificação
                
                //resultFilme.forEach( async function(itemFilme){
                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemFilme of resultFilme){
                    /* Monta o objeto da classificação para retornar no Filme (1XN) */
                        //Busca os dados da classificação na controller de classificacao
                        let dadosClassificacao = await controllerClassificacao.buscarIndicativa(itemFilme.id_indicativa)

                        //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                        itemFilme.indicativa = dadosClassificacao.indicativa
                        //Remover um atributo do JSON
                        delete itemFilme.id_indicativa
                    /* */
                            
                    /* Monta o objeto de Generos para retornar no Filme (Relação NxN) */
                        //encaminha o id do filme para a controller retornar os generos associados a esse filme
                        let dadosGenero = await controllerFilmeGenero.buscarGeneroPorFilme(itemFilme.id)
                        
                        //Adiciona um atributo genero no JSON de filmes e coloca os dados do genero
                        itemFilme.genero = dadosGenero.genero

                        let dadosLegenda = await controllerFilmeLegenda.buscarFilmeLegenda(itemFilme.id)
                        //Adiciona um atributo genero no JSON de filmes e coloca os dados do genero
                        itemFilme.legenda = dadosLegenda.legenda

                    /* */
                    //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                    arrayFilmes.push(itemFilme)
 
                }
                
                dadosFilme.films = arrayFilmes
                return dadosFilme
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
        //cha,a a funcao para retornar os filmes cadastrados
    } catch (error) {   
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLER ///500
    }
}
//Função para tratar o retorno de um filme filtrado pelo ID do DAO
const buscarFilme = async function (idfilme) {
    let dadosfilme={}
    try {
        if (idfilme == ''|| idfilme == undefined|| idfilme == null|| idfilme<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await filmeDAO.selectByIdFilme(idfilme)
            if (result != false || typeof(result)=='object'){
                if (result.length>0) {
                    dadosfilme.status = true
                    dadosfilme.status_code = 200
                    
                     //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemFilme of resultFilme){
                    //Busca os dados da classificação na controller de classificacao
                    let dadosClassificacao = await controllerClassificacao.buscarClassificacao(itemFilme.id_classificacao)
                    
                    //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                    itemFilme.classificacao = dadosClassificacao.classificacao
                    
                    //Remover um atributo do JSON
                    delete itemFilme.id_classificacao
                    
                    //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                    arrayFilmes.push(itemFilme)
 
                }
                
                dadosFilme.films = arrayFilmes

                    // dadosFilme.films = resultFilme

                    return dadosFilme //200
                }else{
                    return message.ERROR_NOT_FOUND//404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLER
    }
}
/*******************************************************************************/


module.exports={
    inserirFilme,
    listarFilme,
    buscarFilme,
    excluirFilme,
    atualizarFilme
}
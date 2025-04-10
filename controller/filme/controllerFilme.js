/***********************************************************************************\
|* Objetivo:controller responsável pela regra de negócio referente ao CRUD de filme |
|* Data:11/02/2025                                                                  |
|* Autor:Gabriel Silva Guedes                                                       |
|* Versão:1.0                                                                       | 
\***********************************************************************************/

const filmeDAO=require('../../model/DAO/filme.js')
const message =require('../../modulo/config.js')

//Função para tratar a inserção de um novo filme no DAO
const inserirFilme = async function (filme, contentType) {
    try {
    if (contentType=='application/json') {
        let response = {}
        if (filme.nome == ''                || filme.nome == undefined            || filme.nome == null             || filme.nome.lenght>80             ||
            filme.duracao == ''             || filme.duracao == undefined         || filme.duracao == null          || filme.duracao.lenght>5           ||
            filme.sinopse == ''             || filme.sinopse == undefined         || filme.sinopse == null          ||
            filme.data_lancamento == ''     || filme.data_lancamento == undefined || filme.data_lancamento == null  || filme.data_lancamento.lenght>10  ||
            filme.foto_capa == undefined    || filme.foto_capa .lenght>200        ||
            filme.link_trailer == undefined || filme.link_trailer.lenght>10)
        {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let resultFilme= await filmeDAO.insertFilme(filme)
            if (resultFilme) {
                return message.SUCCESS_CREATED_ITEM //201
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }  
    }else{
        return message.ERROR_CONTENT_TYPE //415
    }      
    } catch (error) {
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
        let dadosFilme={}
        let resultFilme = await filmeDAO.selectAllFilme()
        if (resultFilme!= false || typeof(result)=='object') {
        
            if(resultFilme.length>0){
                dadosFilme.status=true
                dadosFilme.status_code=200,
                dadosFilme.itens=resultFilme.length
                dadosFilme.filmes=resultFilme
                return dadosFilme
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
        //cha,a a funcao para retornar os filmes cadastrados
    } catch (error) {
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
                    dadosfilme={
                        status:true,
                        status_code:200,
                        filme:result
                    }
                    return dadosfilme
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

const inserirLegenda = async (legenda) => {
    try {
        if (contentType=='application/json') {
            if (legenda.legenda == '' || legenda.legenda == undefined || legenda.legenda==null || legenda.legenda.lenght<0 ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultLegenda = await filmeDAO.insertlegenda(legenda)
                if (resultLegenda) {
                    return message.SUCCESS_CREATED_ITEM
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


/*************************************************************************************************/


const inserirIndicativa = async (indicativa) => {
    try {
        if (contentType=='application/json') {
            if (indicativa.indicativa == '' || indicativa.indicativa == undefined || indicativa.indicativa==null || indicativa.indicativa.lenght<0 ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultLegenda = await filmeDAO.insertindicativa(indicativa)
                if (resultLegenda) {
                    return message.SUCCESS_CREATED_ITEM
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


/************************************************************************************************************/


const inserirGenero = async (genero) => {
    try {
        if (contentType=='application/json') {
            if (genero.genero == '' || genero.genero == undefined || genero.genero==null || genero.genero.lenght<0 ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultLegenda = await filmeDAO.insertgenero(genero)
                if (resultLegenda) {
                    return message.SUCCESS_CREATED_ITEM
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


/********************************************************************************************************************/


const inserirPlataforma = async (plataforma) => {
    try {
        if (contentType=='application/json') {
            if (plataforma.plataforma == '' || plataforma.plataforma == undefined || plataforma.plataforma==null || plataforma.plataforma.lenght<0 ||
                plataforma.link == '' || plataforma.link == undefined || plataforma.link==null || plataforma.link.lenght<0
            ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultLegenda = await filmeDAO.insertplataforma(plataforma)
                if (resultLegenda) {
                    return message.SUCCESS_CREATED_ITEM
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


/***************************************************************************************************************************/


const inserirPremiacao = async (premiacao) => {
    try {
        if (contentType=='application/json') {
            if (premiacao.premiacao == '' || premiacao.premiacao == undefined || premiacao.premiacao==null || premiacao.premiacao.lenght<0 ||
                premiacao.descricao == '' || premiacao.descricao == undefined || premiacao.descricao==null || premiacao.descricao.lenght<0 
            ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultLegenda = await filmeDAO.insertpremiacao(premiacao)
                if (resultLegenda) {
                    return message.SUCCESS_CREATED_ITEM
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


/*********************************************************************************************************************************/


const inserirNacionalidade = async (nacionalidade) => {
    try {
        if (contentType=='application/json') {
            if (nacionalidade.nacionalidade == '' || nacionalidade.nacionalidade == undefined || nacionalidade.nacionalidade==null || nacionalidade.nacionalidade.lenght<0 ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultLegenda = await filmeDAO.insertnacionalidade(nacionalidade)
                if (resultLegenda) {
                    return message.SUCCESS_CREATED_ITEM
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


/*******************************************************************************************************************************************/


const inserirSexo = async (sexo) => {
    try {
        if (contentType=='application/json') {
            if (sexo.sexo == '' || sexo.sexo == undefined || sexo.sexo==null || sexo.sexo.lenght<0 ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultLegenda = await filmeDAO.insertsexo(nacionalidade)
                if (resultLegenda) {
                    return message.SUCCESS_CREATED_ITEM
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



module.exports={
    inserirFilme,
    listarFilme,
    buscarFilme,
    excluirFilme,
    atualizarFilme
}
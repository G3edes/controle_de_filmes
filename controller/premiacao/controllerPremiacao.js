
const DAOPremiacao=require('../../model/DAO/premiacao.js')
const message =require('../../modulo/config.js')

const inserirPremiacao = async (premiacao, contentType) => {
    try {
        if (contentType=='application/json') {
            if (premiacao.premiacao == '' || premiacao.premiacao == undefined || premiacao.premiacao==null || premiacao.premiacao.length<0 ||
                premiacao.descricao == '' || premiacao.descricao == undefined || premiacao.descricao==null || premiacao.descricao.length<0 
            ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await DAOPremiacao.insertpremiacao(premiacao)
                if (result) {
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

const atualizarPremiacao = async (id, premiacao, contentType) => {
    try {
        if (contentType=='application/json') {
            if (id == ''       || id == undefined                 || id== null                         || isNaN(id) || id<=0 ||
            premiacao.premiacao == ''|| premiacao.premiacao == undefined      || premiacao.premiacao == null  ||
            premiacao.descricao  == '' || premiacao.descricao == undefined || premiacao.descricao  == null || premiacao.descricao >60
        ) {
            return message.ERROR_REQUIRED_FIELDS
            }
            let results=await DAOPremiacao.selectByIdPremiacao(id)
            if (results != false || typeof(results)== 'object') {
                if (results.length>0) {
                    premiacao.id=parseInt(id)
                    let result = await DAOPremiacao.updatePremiacao(premiacao)
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
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
       console.log(error)
       return message.ERROR_INTERNAL_SERVER_CONTROLER 
    }
}

const excluirPremiacao = async function (idPremiacao){
    try {
        if(idPremiacao == '' || idPremiacao == undefined || idPremiacao == null || isNaN(idPremiacao) || idPremiacao <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let results = await DAOPremiacao.selectByIdPremiacao(parseInt(idPremiacao))

            if(results != false || typeof(results) == 'object'){
                //se exestir, faremos o delete
                if(results.length > 0){
                    //delete    
                    let result = await DAOPremiacao.deletePremiacao(parseInt(idPremiacao))

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

const listarPremiacao = async function () {
    try {
        let dadosPremiacao={}
        let resultPremiacao = await DAOPremiacao.selectAllPremiacao()
        if (resultPremiacao!= false || typeof(result)=='object') {
        
            if(resultPremiacao.length>0){
                dadosPremiacao.status=true
                dadosPremiacao.status_code=200,
                dadosPremiacao.itens=resultPremiacao.length
                dadosPremiacao.premiacao=resultPremiacao
                return dadosPremiacao
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

const buscarPremiacao = async function (idPremiacao) {
    let dadosPremiacao={}
    try {
        if (idPremiacao == ''|| idPremiacao == undefined|| idPremiacao == null|| idPremiacao<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await DAOPremiacao.selectByIdPremiacao(idPremiacao)
            if (result != false || typeof(result)=='object'){
                if (result.length>0) {
                    dadosPremiacao={
                        status:true,
                        status_code:200,
                        premiacao:result
                    }
                    return dadosPremiacao
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

module.exports={
    inserirPremiacao,
    listarPremiacao,
    buscarPremiacao,
    excluirPremiacao,
    atualizarPremiacao
}

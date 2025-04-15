
const DAOGenero=require('../../model/DAO/genero.js')
const message =require('../../modulo/config.js')

const inserirGenero = async (genero) => {
    try {
        if (contentType=='application/json') {
            if (genero.genero == '' || genero.genero == undefined || genero.genero==null || genero.genero.lenght<0 ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await DAOGenero.insertgenero(genero)
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

const atualizarGenero = async (id, genero, contentType) => {
    try {
        if (contentType=='application/json') {
            if (id == ''       || id == undefined                 || id== null                         || isNaN(id) || id<=0 ||
            genero.genero == ''|| genero.genero == undefined      || genero.genero == null
        ) {
            return message.ERROR_REQUIRED_FIELDS
            }
            let resultgenero=await DAOGenero.selectByIdGenero(id)
            if (resultgenero != false || typeof(resultgenero)== 'object') {
                if (resultgenero.lenght>0) {
                    genero.id=parseInt(id)
                    let result = await DAOGenero.updateGenro(genero)
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

const excluirGenero = async function (idGenero){
    try {
        if(idGenero == '' || idGenero == undefined || idGenero == null || isNaN(idGenero) || idGenero <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let results = await DataTransfer.selectByIdGenero(parseInt(idGenero))

            if(results != false || typeof(results) == 'object'){
                //se exestir, faremos o delete
                if(results.length > 0){
                    //delete    
                    let result = await DAOGenero.deleteGenero(parseInt(idGenero))

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

const listarGenero = async function () {
    try {
        let dadosGenero={}
        let resultGenero = await DAOGenero.selectAllGenero()
        if (resultGenero!= false || typeof(result)=='object') {
        
            if(resultGenero.length>0){
                dadosGenero.status=true
                dadosGenero.status_code=200,
                dadosGenero.itens=resultGenero.length
                dadosGenero.genero=resultGenero
                return dadosGenero
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

const buscarGenero = async function (idgenero) {
    let dadosGenero={}
    try {
        if (idgenero == ''|| idgenero == undefined|| idgenero == null|| idgenero<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await DAOGenero.selectByIdGenero(idgenero)
            if (result != false || typeof(result)=='object'){
                if (result.length>0) {
                    dadosGenero={
                        status:true,
                        status_code:200,
                        genero:result
                    }
                    return dadosGenero
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
    inserirGenero,
    listarGenero,
    buscarGenero,
    excluirGenero,
    atualizarGenero
}
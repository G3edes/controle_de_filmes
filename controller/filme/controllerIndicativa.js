
const DAOIndicativa=require('../../model/DAO/indicativa.js')
const message =require('../../modulo/config.js')


const inserirIndicativa = async (indicativa) => {
    try {
        if (contentType=='application/json') {
            if (indicativa.indicativa == '' || indicativa.indicativa == undefined || indicativa.indicativa==null || indicativa.indicativa.lenght<0 ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await DAOIndicativa.insertindicativa(indicativa)
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

const atualizarIndicativa = async (id, indicativa, contentType) => {
    try {
        if (contentType=='application/json') {
            if (id == ''       || id == undefined                 || id== null                         || isNaN(id) || id<=0 ||
            indicativa.indicativa == ''|| indicativa.indicativa == undefined      || indicativa.indicativa == null
        ) {
            return message.ERROR_REQUIRED_FIELDS
            }
            let results=await DAOIndicativa.selectByIdIndicativa(id)
            if (results != false || typeof(results)== 'object') {
                if (results.lenght>0) {
                    indicativa.id=parseInt(id)
                    let result = await DAOIndicativa.updateIndicativa(indicativa)
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

const excluirIndicativa = async function (idIndicativa){
    try {
        if(idIndicativa == '' || idIndicativa == undefined || idIndicativa == null || isNaN(idIndicativa) || idIndicativa <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let results = await DataTransfer.selectByIdIndicativa(parseInt(idIndicativa))

            if(results != false || typeof(results) == 'object'){
                //se exestir, faremos o delete
                if(results.length > 0){
                    //delete    
                    let result = await DAOIndicativa.deleteIndicativa(parseInt(idIndicativa))

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

const listarIndicativa = async function () {
    try {
        let dadosIndicativa={}
        let resultIndicativa = await DAOIndicativa.selectAllIndicativa()
        if (resultIndicativa!= false || typeof(result)=='object') {
        
            if(resultIndicativa.length>0){
                dadosIndicativa.status=true
                dadosIndicativa.status_code=200,
                dadosIndicativa.itens=resultIndicativa.length
                dadosIndicativa.indicativa=resultIndicativa
                return dadosIndicativa
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

const buscarIndicativa = async function (idindicativa) {
    let dadosIndicativa={}
    try {
        if (idindicativa == ''|| idindicativa == undefined|| idindicativa == null|| idindicativa<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await DAOIndicativa.selectByIdIndicativa(idindicativa)
            if (result != false || typeof(result)=='object'){
                if (result.length>0) {
                    dadosIndicativa={
                        status:true,
                        status_code:200,
                        indicativa:result
                    }
                    return dadosIndicativa
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
    inserirIndicativa,
    listarIndicativa,
    buscarIndicativa,
    excluirIndicativa,
    atualizarIndicativa
}
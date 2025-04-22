
const DAOlegenda=require('../../model/DAO/legenda.js')
const message =require('../../modulo/config.js')

const inserirLegenda = async (legenda, contentType) => {
    try {
        if (contentType=='application/json') {
            if (legenda.legenda == '' || legenda.legenda == undefined || legenda.legenda==null || legenda.legenda.length<0 ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultLegenda = await DAOlegenda.insertlegenda(legenda)
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


const atualizarLegenda = async (id, legenda, contentType) => {
    try {
        if (contentType=='application/json') {
            if (id == ''       || id == undefined                 || id== null                         || isNaN(id) || id<=0 ||
            legenda.legenda == ''|| legenda.legenda == undefined      || legenda.legenda == null
        ) {
            return message.ERROR_REQUIRED_FIELDS
            }
            let results=await DAOlegenda.selectByIdLegenda(id)
            if (results != false || typeof(results)== 'object') {
                if (results.length>0) {
                    legenda.id=parseInt(id)
                    let result = await DAOlegenda.updateLegenda(legenda)
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

const excluirLegenda = async function (idLegenda){
    try {
        if(idLegenda == '' || idLegenda == undefined || idLegenda == null || isNaN(idLegenda) || idLegenda <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let results = await DAOlegenda.selectByIdLegenda(parseInt(idLegenda))

            if(results != false || typeof(results) == 'object'){
                //se exestir, faremos o delete
                if(results.length > 0){
                    //delete    
                    let result = await DAOlegenda.deleteLegenda(parseInt(idLegenda))

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

const listarLegenda = async function () {
    try {
        let dadosLegenda={}
        let resultLegenda = await DAOlegenda.selectAllLegenda()
        if (resultLegenda!= false || typeof(result)=='object') {
        
            if(resultLegenda.length>0){
                dadosLegenda.status=true
                dadosLegenda.status_code=200,
                dadosLegenda.itens=resultLegenda.length
                dadosLegenda.legenda=resultLegenda
                return dadosLegenda
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

const buscarLegenda = async function (idlegenda) {
    let dadosLegenda={}
    try {
        if (idlegenda == ''|| idlegenda == undefined|| idlegenda == null|| idlegenda<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await DAOlegenda.selectByIdLegenda(idlegenda)
            if (result != false || typeof(result)=='object'){
                if (result.length>0) {
                    dadosLegenda={
                        status:true,
                        status_code:200,
                        legenda:result
                    }
                    return dadosLegenda
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
    inserirLegenda,
    listarLegenda,
    buscarLegenda,
    excluirLegenda,
    atualizarLegenda
}
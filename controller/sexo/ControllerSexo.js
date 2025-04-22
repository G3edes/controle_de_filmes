
const DAOSexo=require('../../model/DAO/sexo.js')
const message =require('../../modulo/config.js')

const inserirSexo = async (sexo, contentType) => {
    try {
        if (contentType=='application/json') {
            if (sexo.sexo == '' || sexo.sexo == undefined || sexo.sexo==null || sexo.sexo.length<0 ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await DAOSexo.insertsexo(sexo)
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

const atualizarSexo = async (id, sexo, contentType) => {
    try {
        if (contentType=='application/json') {
            if (id == ''       || id == undefined                 || id== null                         || isNaN(id) || id<=0 ||
            sexo.sexo == ''|| sexo.sexo == undefined      || sexo.sexo == null
        ) {
            return message.ERROR_REQUIRED_FIELDS
            }
            let results=await DAOSexo.selectByIdSexo(id)
            if (results != false || typeof(results)== 'object') {
                if (results.length>0) {
                    sexo.id=parseInt(id)
                    let result = await DAOSexo.updateSexo(sexo)
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

const excluirSexo = async function (idSexo){
    try {
        if(idSexo == '' || idSexo == undefined || idSexo == null || isNaN(idSexo) || idSexo <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let results = await DAOSexo.selectByIdSexo(parseInt(idSexo))

            if(results != false || typeof(results) == 'object'){
                //se exestir, faremos o delete
                if(results.length > 0){
                    //delete    
                    let result = await DAOSexo.deleteSexo(parseInt(idSexo))

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

const listarSexo = async function () {
    try {
        let dadosSexo={}
        let resultSexo = await DAOSexo.selectAllSexo()
        if (resultSexo!= false || typeof(result)=='object') {
        
            if(resultSexo.length>0){
                dadosSexo.status=true
                dadosSexo.status_code=200,
                dadosSexo.itens=resultSexo.length
                dadosSexo.sexo=resultSexo
                return dadosSexo
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

const buscarSexo = async function (idsexo) {
    let dadossexo={}
    try {
        if (idsexo == ''|| idsexo == undefined|| idsexo == null|| idsexo<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await DAOSexo.selectByIdSexo(idsexo)
            if (result != false || typeof(result)=='object'){
                if (result.length>0) {
                    dadossexo={
                        status:true,
                        status_code:200,
                        sexo:result
                    }
                    return dadossexo
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
    inserirSexo,
    listarSexo,
    buscarSexo,
    excluirSexo,
    atualizarSexo
}
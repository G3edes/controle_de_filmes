
const DAOPlataforma=require('../../model/DAO/plataforma.js')
const message =require('../../modulo/config.js')


const inserirPlataforma = async (plataforma) => {
    try {
        if (contentType=='application/json') {
            if (plataforma.plataforma == '' || plataforma.plataforma == undefined || plataforma.plataforma==null || plataforma.plataforma.lenght<0 ||
                plataforma.link == '' || plataforma.link == undefined || plataforma.link==null || plataforma.link.lenght<0
            ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await DAOPlataforma.insertplataforma(plataforma)
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

const atualizarPlataforma = async (id, plataforma, contentType) => {
    try {
        if (contentType=='application/json') {
            if (id == ''       || id == undefined                 || id== null                         || isNaN(id) || id<=0 ||
            plataforma.plataforma == ''|| plataforma.plataforma == undefined      || plataforma.plataforma == null  ||
            plataforma.link_plataforma == '' || plataforma.link_plataforma== undefined || plataforma.link_plataforma == null || plataforma.link_plataforma>500
        ) {
            return message.ERROR_REQUIRED_FIELDS
            }
            let results=await DAOPlataforma.selectByIdPlataforma(id)
            if (results != false || typeof(results)== 'object') {
                if (results.lenght>0) {
                    plataforma.id=parseInt(id)
                    let result = await DAOPlataforma.updatePlataforma(plataforma)
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

const excluirPlataforma = async function (idPlataforma){
    try {
        if(idPlataforma == '' || idPlataforma == undefined || idPlataforma == null || isNaN(idPlataforma) || idPlataforma <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let results = await DataTransfer.selectByIdPlataforma(parseInt(idPlataforma))

            if(results != false || typeof(results) == 'object'){
                //se exestir, faremos o delete
                if(results.length > 0){
                    //delete    
                    let result = await DAOPlataforma.deletePlataforma(parseInt(idPlataforma))

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

const listarPlataforma = async function () {
    try {
        let dadosPlataforma={}
        let resultPlataforma = await DAOPlataforma.selectAllPlataforma()
        if (resultPlataforma!= false || typeof(result)=='object') {
        
            if(resultPlataforma.length>0){
                dadosPlataforma.status=true
                dadosPlataforma.status_code=200,
                dadosPlataforma.itens=resultPlataforma.length
                dadosPlataforma.plataforma=resultPlataforma
                return dadosPlataforma
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

const buscarPlataforma = async function (idPlataforma) {
    let dadosPlataforma={}
    try {
        if (idPlataforma == ''|| idPlataforma == undefined|| idPlataforma == null|| idPlataforma<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await DAOPlataforma.selectByIdPlataforma(idPlataforma)
            if (result != false || typeof(result)=='object'){
                if (result.length>0) {
                    dadosPlataforma={
                        status:true,
                        status_code:200,
                        plataforma:result
                    }
                    return dadosPlataforma
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
    inserirPlataforma,
    listarPlataforma,
    buscarPlataforma,
    excluirPlataforma,
    atualizarPlataforma
}
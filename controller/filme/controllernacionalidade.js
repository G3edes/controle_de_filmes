
const DAOnacionalidade=require('../../model/DAO/nacionalidade.js')
const message =require('../../modulo/config.js')

const inserirNacionalidade = async (nacionalidade) => {
    try {
        if (contentType=='application/json') {
            if (nacionalidade.nacionalidade == '' || nacionalidade.nacionalidade == undefined || nacionalidade.nacionalidade==null || nacionalidade.nacionalidade.lenght<0 ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await DAOnacionalidade.insertnacionalidade(nacionalidade)
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

const atualizarNacionalidade = async (id, nacionalidade, contentType) => {
    try {
        if (contentType=='application/json') {
            if (id == ''       || id == undefined                 || id== null                         || isNaN(id) || id<=0 ||
            nacionalidade.nacionalidade == ''|| nacionalidade.nacionalidade == undefined      || nacionalidade.nacionalidade == null
        ) {
            return message.ERROR_REQUIRED_FIELDS
            }
            let results=await DAOnacionalidade.selectByIdNacionalidade(id)
            if (results != false || typeof(results)== 'object') {
                if (results.lenght>0) {
                    nacionalidade.id=parseInt(id)
                    let result = await DAOnacionalidade.updateNacionalidade(nacionalidade)
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

const excluirNacionalidade = async function (idNacionalidade){
    try {
        if(idNacionalidade == '' || idNacionalidade == undefined || idNacionalidade == null || isNaN(idNacionalidade) || idNacionalidade <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let results = await DataTransfer.selectByIdNacionalidade(parseInt(idNacionalidade))

            if(results != false || typeof(results) == 'object'){
                //se exestir, faremos o delete
                if(results.length > 0){
                    //delete    
                    let result = await DAOnacionalidade.deleteNacionalidade(parseInt(idNacionalidade))

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


const listarNacionalidade = async function () {
    try {
        let dadosNacionalidade={}
        let resultNacionalidade = await DAOnacionalidade.selectAllNacionalidade()
        if (resultNacionalidade!= false || typeof(result)=='object') {
        
            if(resultNacionalidade.length>0){
                dadosNacionalidade.status=true
                dadosNacionalidade.status_code=200,
                dadosNacionalidade.itens=resultNacionalidade.length
                dadosNacionalidade.nacionalidade=resultNacionalidade
                return dadosNacionalidade
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

const buscarNacionalidade = async function (idnacionalidade) {
    let dadosNacionalidade={}
    try {
        if (idnacionalidade == ''|| idnacionalidade == undefined|| idnacionalidade == null|| idnacionalidade<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await DAOnacionalidade.selectByIdNacionalidade(idnacionalidade)
            if (result != false || typeof(result)=='object'){
                if (result.length>0) {
                    dadosNacionalidade={
                        status:true,
                        status_code:200,
                        nacionalidade:result
                    }
                    return dadosNacionalidade
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
    inserirNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    excluirNacionalidade,
    atualizarNacionalidade
}


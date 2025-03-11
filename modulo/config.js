/***********************************************************************************\
|* Objetivo:Arquivo de configuração para padronizar mensages e status code da API   |
|* Data:18/02/2025                                                                  |
|* Autor:Gabriel Silva Guedes                                                       |
|* Versão:1.0                                                                       | 
\***********************************************************************************/

/********** Status Code De Mensagens De Erro**********/

const ERROR_REQUIRED_FIELDS={
    status: false, status_code: 400, menssage:'Erro:Não Foi Possível realizar a requisição, pois existem campos obrigatórios que não foram preenchidos ou não atendem a quantidade de caracteres!'
}
const ERROR_INTERNAL_SERVER_MODEL={
    status: false, status_code: 500, menssage:'Erro:Devido a erros internos no servidor da MODEL, não foi possível processar a requisição!!'
}
const ERROR_INTERNAL_SERVER_CONTROLER={
    status: false, status_code: 500, menssage:'Erro:Devido a erros internos no servidor da CONTROLLER, não foi possível processar a requisição!!'
}
const ERROR_CONTENT_TYPE={
    status: false, status_code: 415, menssage:'Erro:Não foi possível processar a requisição, pois, o tipo de dado encaminhado não é processado pelo servidor.Favor encaminhs dados apenas JSON!!'
}
const ERROR_NOT_FOUND = {
    status: false, status_code: 404, menssage:'Erro: Não foram encontrados itens de retorno'
}
/********** Status Code De Mensagens De Sucesso**********/

const SUCCESS_CREATED_ITEM={
    status: true, status_code: 201, menssage:'Item criado com sucesso!!'
}
const SUCCESS_DELETED_ITEM={
    status: true, status_code: 200, menssage:'Item excluído com sucesso!!'
}
const SUCCESS_UPDATED_ITEM={
    status: true, status_code: 200, menssage:'Item atualizado com sucesso!!'
}

module.exports={
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_MODEL,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_CONTROLER,
    ERROR_CONTENT_TYPE, 
    ERROR_NOT_FOUND,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATED_ITEM
}
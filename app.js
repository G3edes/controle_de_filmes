/**********************************************************************************\
 * Objetivo:Criar uma API para realizar o CRUD do Sistema De controle de Filmes    |
 * Data:11/02/2025                                                                 |
 * Autor:Gabriel Silva Guedes                                                      |
 * Versão:1.0                                                                      |
 * Observação:                                                                     |
 *       Para criar a API precisamos instalar:                                     |
 *                                                                                 |
 *       > express              npm install express --save                         |
 *       > cors                 npm install cors --save                            |
 *       > body-parser          npm install body-parser --save                     |
 *                                                                                 |
 *       Para Criar a Integração com o Banco de Dados Precisamos Instalar:         |
 *                                                                                 |
 *       > prisma               npm install prisma --save (conexão com o BD)       |
 *       > prisma/client        npm install @prisma/client --save (rodar sql)      |
 *                                                                                 |
 *       Após a Instalação do prisma e prisma/client, devemos:                     |
 *          npx prisma init                                                        |
 *   Você deverá configurar o arquivo .env e schema.prisma com as credencias do bd |
 *   Após essa configuração deverá rodar i seguinte comando:                       | 
 *   npx prisma migrate dev                                                        |
\**********************************************************************************/


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//manipular o body da requisição para chega apenas JSON
const bodyParserJSON=bodyParser.json()
//cria o obj app com referencia do express
const app=express ()
//configura aceso do cors
app.use((request, response, next)=>{
    response.header('Acess-Control-Allow-Origin','*')
    response.header('Acess-Control-Allow-Methods','GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')
    app.use(cors())
    next()
})

const controllerFilme= require('./controller/filme/controllerFilme.js')
const controllerGenero= require('./controller/genero/controllerGenero.js')
const controllerIndicativa= require('./controller/indicativa/controllerIndicativa.js')
const controllerLegenda= require('./controller/legenda/controllerLegenda.js')
const controllerNacionalidade= require('./controller/Nacionalidade/controllerNacionalidade.js')
const controllerPlataforma= require('./controller/Plataforma/controllerPlataforma.js')
const controllerPremiacao= require('./controller/Premiacao/controllerPremiacao.js')
const controllerSexo= require('./controller/sexo/controllerSexo.js')

/*******************************************************************************************************************
 * 
 *                                  FILME
 * 
 ********************************************************************************************************************/

app.post('/v1/controle-filmes/filmepost', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados
    let dadosBody=request.body
    let resultFilme= await controllerFilme.inserirFilme(dadosBody,contentType)
    response.status(resultFilme.status_code)
    response.json(resultFilme)
})
app.get('/v1/controle-filmes/filmelistar', cors(), async function (request, response) {
    let resultFilme= await controllerFilme.listarFilme()
    response.status(resultFilme.status_code)
    response.json(resultFilme)
})
app.get('/v1/controle-filmes/filme/:id', cors(), async function (request, response) {
    let idfilme=request.params.id
    let filme= await controllerFilme.buscarFilme(idfilme)
    response.status(filme.status_code)
    response.json(filme)
})
app.delete('/v1/controle-filmes/filme/:id', cors(), async function (request, response){
    let idFilme = request.params.id
    let resultFilme = await controllerFilme.excluirFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})
app.put('/v1/controle-filmes/filme/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let idfilme = request.params.id
    //body da requisição
    let dadosBody=request.body
    let resultFilme= await controllerFilme.atualizarFilme(idfilme, dadosBody, contentType)
    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

/*******************************************************************************************************************
 * 
 *                                  GENERO
 * 
 ********************************************************************************************************************/

app.post('/v1/controle-filmes/generopost', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados
    let dadosBody=request.body
    let resultGenero= await controllerGenero.inserirGenero(dadosBody,contentType)
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-filmes/generolistar', cors(), async function (request, response) {
    let resultGenero= await controllerGenero.listarGenero()
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-filmes/genero/:id', cors(), async function (request, response) {
    let idGenero=request.params.id
    let genero= await controllerFilme.buscarFilme(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

app.delete('/v1/controle-filmes/filme/:id', cors(), async function (request, response){
    let idGenero = request.params.id
    let resultGenero = await controllerGenero.excluirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.put('/v1/controle-filmes/genero/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let idGenero = request.params.id
    //body da requisição
    let dadosBody=request.body
    let resultGenero= await controllerFilme.atualizarFilme(idGenero, dadosBody, contentType)
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})



/*******************************************************************************************************************
 * 
 *                                  iNDICATIVA
 * 
 ********************************************************************************************************************/
app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições..')
})
//configurando a porta que a api vai rodar, executa a api e faz com que fique aguardando novas aquisições

//npx prisma generate (sincroniza novamente com o banco)
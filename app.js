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
    let genero= await controllerGenero.buscarGenero(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

app.delete('/v1/controle-filmes/genero/delete/:id', cors(), async function (request, response){
    let idGenero = request.params.id
    let resultGenero = await controllerGenero.excluirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.put('/v1/controle-filmes/genero/put/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let idGenero = request.params.id
    //body da requisição
    let dadosBody=request.body
    let resultGenero= await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})



/*******************************************************************************************************************
 * 
 *                                  iNDICATIVA
 * 
 ********************************************************************************************************************/




app.post('/v1/controle-filmes/indicativapost', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados
    let dadosBody=request.body
    let resultIndicativa= await controllerIndicativa.inserirIndicativa(dadosBody,contentType)
    response.status(resultIndicativa.status_code)
    response.json(resultIndicativa)
})

app.get('/v1/controle-filmes/indicativalistar', cors(), async function (request, response) {
    let resultIndicativa= await controllerIndicativa.listarIndicativa()
    response.status(resultIndicativa.status_code)
    response.json(resultIndicativa)
})

app.get('/v1/controle-filmes/indicativa/:id', cors(), async function (request, response) {
    let idIndicativa=request.params.id
    let resultIndicativa= await controllerIndicativa.buscarIndicativa(idIndicativa)
    response.status(resultIndicativa.status_code)
    response.json(resultIndicativa)
})

app.delete('/v1/controle-filmes/indicativa/delete/:id', cors(), async function (request, response){
    let idIndicativa = request.params.id
    let resultIndicativa = await controllerIndicativa.excluirIndicativa(idIndicativa)

    response.status(resultIndicativa.status_code)
    response.json(resultIndicativa)
})

app.put('/v1/controle-filmes/indicativa/put/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let idIndicativa = request.params.id
    //body da requisição
    let dadosBody=request.body
    let resultIndicativa= await controllerIndicativa.atualizarIndicativa(idIndicativa, dadosBody, contentType)

    response.status(resultIndicativa.status_code)
    response.json(resultIndicativa)
})


/*******************************************************************************************************************
 * 
 *                                  LEGENDA
 * 
 ********************************************************************************************************************/

app.post('/v1/controle-filmes/legendapost', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados
    let dadosBody=request.body
    let resultLegenda= await controllerLegenda.inserirLegenda(dadosBody,contentType)
    response.status(resultLegenda.status_code)
    response.json(resultLegenda)
})

app.get('/v1/controle-filmes/legendalistar', cors(), async function (request, response) {
    let resultLegenda= await controllerLegenda.listarLegenda()
    response.status(resultLegenda.status_code)
    response.json(resultLegenda)
})

app.get('/v1/controle-filmes/legenda/:id', cors(), async function (request, response) {
    let idLegenda=request.params.id
    let resultLegenda= await controllerLegenda.buscarLegenda(idLegenda)
    response.status(resultLegenda.status_code)
    response.json(resultLegenda)
})

app.delete('/v1/controle-filmes/legenda/delete/:id', cors(), async function (request, response){
    let idLegenda = request.params.id
    let resultLegenda = await controllerLegenda.excluirLegenda(idLegenda)

    response.status(resultLegenda.status_code)
    response.json(resultLegenda)
})

app.put('/v1/controle-filmes/legenda/put/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let idLegenda = request.params.id
    //body da requisição
    let dadosBody=request.body
    let resultLegenda= await controllerLegenda.atualizarLegenda(idLegenda, dadosBody, contentType)

    response.status(resultLegenda.status_code)
    response.json(resultLegenda)
})


/*******************************************************************************************************************
 * 
 *                                  NACIONALIDADE
 * 
 ********************************************************************************************************************/

app.post('/v1/controle-filmes/nacionalidadepost', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados
    let dadosBody=request.body
    let resultNacionalidade= await controllerNacionalidade.inserirNacionalidade(dadosBody,contentType)
    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

app.get('/v1/controle-filmes/nacionalidadelistar', cors(), async function (request, response) {
    let resultNacionalidade= await controllerNacionalidade.listarNacionalidade()
    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

app.get('/v1/controle-filmes/nacionalidade/:id', cors(), async function (request, response) {
    let idNacionalidade=request.params.id
    let resultNacionalidade= await controllerNacionalidade.buscarNacionalidade(idNacionalidade)
    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

app.delete('/v1/controle-filmes/nacionalidade/delete/:id', cors(), async function (request, response){
    let idNacionalidade = request.params.id
    let resultNacionalidade = await controllerNacionalidade.excluirNacionalidade(idNacionalidade)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

app.put('/v1/controle-filmes/nacionalidade/put/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let idNacionalidade = request.params.id
    //body da requisição
    let dadosBody=request.body
    let resultNacionalidade= await controllerNacionalidade.atualizarNacionalidade(idNacionalidade, dadosBody, contentType)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})


/*******************************************************************************************************************
 * 
 *                                  Plataforma
 * 
 ********************************************************************************************************************/

app.post('/v1/controle-filmes/plataormapost', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados
    let dadosBody=request.body
    let resultPlataforma= await controllerPlataforma.inserirPlataforma(dadosBody,contentType)
    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})

app.get('/v1/controle-filmes/plataformalistar', cors(), async function (request, response) {
    let resultPlataforma= await controllerPlataforma.listarPlataforma()
    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})

app.get('/v1/controle-filmes/plataforma/:id', cors(), async function (request, response) {
    let idPlataforma=request.params.id
    let resultNacionalidade= await controllerPlataforma.buscarPlataforma(idPlataforma)
    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

app.delete('/v1/controle-filmes/plataforma/delete/:id', cors(), async function (request, response){
    let idPlataforma = request.params.id
    let resultPlataforma = await controllerPlataforma.excluirPlataforma(idPlataforma)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})

app.put('/v1/controle-filmes/plataforma/put/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let idPlataforma = request.params.id
    //body da requisição
    let dadosBody=request.body
    let resultPlataforma= await controllerPlataforma.atualizarPlataforma(idPlataforma, dadosBody, contentType)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})


/*******************************************************************************************************************
 * 
 *                                  PREMIACAO
 * 
 ********************************************************************************************************************/

app.post('/v1/controle-filmes/premiacaopost', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados
    let dadosBody=request.body
    let resultPremiacao= await controllerPremiacao.inserirPremiacao(dadosBody,contentType)
    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.get('/v1/controle-filmes/premiacaolistar', cors(), async function (request, response) {
    let resultPremiacao= await controllerPremiacao.listarPremiacao()
    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.get('/v1/controle-filmes/premiacao/:id', cors(), async function (request, response) {
    let idPremiacao=request.params.id
    let resultPremiacao= await controllerPremiacao.buscarPremiacao(idPremiacao)
    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.delete('/v1/controle-filmes/premiacao/delete/:id', cors(), async function (request, response){
    let idPremiacao = request.params.id
    let resultPremiacao = await controllerPremiacao.excluirPremiacao(idPremiacao)

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.put('/v1/controle-filmes/premiacao/put/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let idPremiacao = request.params.id
    //body da requisição
    let dadosBody=request.body
    let resultPremiacao= await controllerPremiacao.atualizarPremiacao(idPremiacao, dadosBody, contentType)

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)



})

/*******************************************************************************************************************
 * 
 *                                  SEXO
 * 
 ********************************************************************************************************************/

app.post('/v1/controle-filmes/sexopost', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados
    let dadosBody=request.body
    let resultSexo= await controllerSexo.inserirSexo(dadosBody,contentType)
    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.get('/v1/controle-filmes/sexolistar', cors(), async function (request, response) {
    let resultSexo= await controllerSexo.listarSexo()
    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.get('/v1/controle-filmes/sexo/:id', cors(), async function (request, response) {
    let idSexo=request.params.id
    let resultSexo= await controllerSexo.buscarSexo(idSexo)
    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.delete('/v1/controle-filmes/sexo/delete/:id', cors(), async function (request, response){
    let idSexo = request.params.id
    let resultSexo = await controllerSexo.excluirSexo(idSexo)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.put('/v1/controle-filmes/sexo/put/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let idSexo = request.params.id
    //body da requisição
    let dadosBody=request.body
    let resultSexo= await controllerSexo.atualizarSexo(idSexo, dadosBody, contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)



})
app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições..')
})
//configurando a porta que a api vai rodar, executa a api e faz com que fique aguardando novas aquisições

//npx prisma generate (sincroniza novamente com o banco)
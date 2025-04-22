
const {PrismaClient}=require('@prisma/client')

const prisma = new PrismaClient()

const insertpremiacao = async (premiacao) => {
    try {
        let sql = `insert into tbl_premiacao set
                    premiacao = '${premiacao.premiacao}',
                    descricao = '${premiacao.descricao}'
                    `
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}
const selectByIdPremiacao= async function(id) {
    try {
        let sql= `select * from tbl_premiacao where id_premiacao= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllPremiacao= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_premiacao order by id_premiacao desc'
        //Executa o script no bd e aguarda o retorno dos dados
        let result= await prisma.$queryRawUnsafe(sql)
        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}
const deletePremiacao = async function(id){
    try {
        let sql = `delete from tbl_premiacao where id_premiacao = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updatePremiacao= async function(premiacao) {
    try {
            let sql = `update tbl_premiacao set 
            premiacao = '${premiacao.premiacao}',
            descricao= '${premiacao.descricao}'
            where id_premiacao = '${premiacao.id}'`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports={
    insertpremiacao,
    selectByIdPremiacao,
    selectAllPremiacao,
    deletePremiacao,
    updatePremiacao
}
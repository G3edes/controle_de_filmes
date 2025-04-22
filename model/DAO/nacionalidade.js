const {PrismaClient}=require('@prisma/client')

const prisma = new PrismaClient()


const insertnacionalidade= async (nacionalidade) => {
    try {
        let sql = `insert into tbl_nacionalidade set nacionalidade = '${nacionalidade.nacionalidade}'`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdNacionalidade= async function(id) {
    try {
        let sql= `select * from tbl_nacionalidade where id_nacionalidade= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllNacionalidade= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_nacionalidade order by id_nacionalidade desc'
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
const deleteNacionalidade = async function(id){
    try {
        let sql = `delete from tbl_nacionalidade where id_nacionalidade = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateNacionalidade= async function(nacionalidade) {
    try {
            let sql = `update tbl_nacionalidade set 
            nacionalidade = '${nacionalidade.nacionalidade}'
            where id_nacionalidade = '${nacionalidade.id}'`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports={
    insertnacionalidade,
    selectByIdNacionalidade,
    selectAllNacionalidade,
    deleteNacionalidade,
    updateNacionalidade
}
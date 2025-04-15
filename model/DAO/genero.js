
const {PrismaClient}=require('@prisma/client')

const prisma = new PrismaClient()

const insertgenero= async (genero) => {
    console.log(genero)
    try {
        let sql = `insert into tbl_genero set genero = '${genero.genero}'`

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
const selectByIdGenero= async function(id) {
    try {
        let sql= `select * from tbl_genero where id= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}
const selectAllGenero= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_genero order by id_genero desc'
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
const deleteGenero = async function(id){
    try {
        let sql = `delete from tbl_genero where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateGenro= async function(genero) {
    try {
            let sql = `update tbl_genero set 
            genero = '${genero.genero}',
            where id = '${genero.id}'`
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
    insertgenero,
    selectByIdGenero,
    selectAllGenero,
    deleteGenero,
    updateGenro
}

const {PrismaClient}=require('@prisma/client')

const prisma = new PrismaClient()

const insertsexo= async (sexo) => {
    try {
        let sql = `insert into tbl_sexo set
                    sexo = '${sexo.sexo}'`
                    
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdSexo= async function(id) {
    try {
        let sql= `select * from tbl_sexo where id_sexo= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllSexo= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_sexo order by id_sexo desc'
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
const deleteSexo = async function(id){
    try {
        let sql = `delete from tbl_sexo where id_sexo = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateSexo= async function(sexo) {
    try {
            let sql = `update tbl_sexo set 
            sexo = '${sexo.sexo}'
            where id_sexo = '${sexo.id}'`
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
    insertsexo,
    selectByIdSexo,
    selectAllSexo,
    deleteSexo,
    updateSexo
}
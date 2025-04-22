
const {PrismaClient}=require('@prisma/client')

const prisma = new PrismaClient()

const insertindicativa= async (indicativa) => {
    try {
        let sql = `insert into tbl_indicativa set indicativa = '${indicativa.indicativa}'`
                    
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
const selectByIdIndicativa= async function(id) {
    try {
        let sql= `select * from tbl_indicativa where id_indicativa = ${id}`
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
const selectAllIndicativa= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_indicativa order by id_indicativa desc'
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
const deleteIndicativa = async function(id){
    try {
        let sql = `delete from tbl_indicativa where id_indicativa = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateIndicativa= async function(indicativa) {
    try {
            let sql = `update tbl_indicativa set 
            indicativa = '${indicativa.indicativa}'
            where id_indicativa = '${indicativa.id}'`
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
    insertindicativa,
    selectByIdIndicativa,
    selectAllIndicativa,
    deleteIndicativa,
    updateIndicativa
}
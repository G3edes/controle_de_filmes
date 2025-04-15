const insertlegenda= async (legenda) => {
    try {
        let sql = `insert into tbl_nacionalidade(
                    legenda = '${legenda.legenda}'`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdLegenda= async function(id) {
    try {
        let sql= `select * from tbl_legenda where id= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllLegenda= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_legenda order by id desc'
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
const deleteLegenda = async function(id){
    try {
        let sql = `delete from tbl_legenda where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateLegenda= async function(legenda) {
    try {
            let sql = `update tbl_legenda set 
            legenda = '${legenda.legenda}',
            where id = '${legenda.id}'`
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
    insertlegenda,
    selectByIdLegenda,
    selectAllLegenda,
    deleteLegenda,
    updateLegenda
}
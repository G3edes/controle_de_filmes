const insertdublagem= async (dublagem) => {
    try {
        let sql = `insert into tbl_dublagem(
                    legenda = '${dublagem.dublagem}'`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdDublagem= async function(id) {
    try {
        let sql= `select * from tbl_dublagem where id= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllDublagem= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_dublagem order by id desc'
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
const deleteDublagem = async function(id){
    try {
        let sql = `delete from tbl_dublagem where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateDublagem= async function(dublagem) {
    try {
            let sql = `update tbl_dublagem set 
            dublagem = '${dublagem.legenda}',
            where id = '${dublagem.id}'`
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
    insertdublagem,
    selectByIdDublagem,
    selectAllDublagem,
    deleteDublagem,
    updateDublagem
}
const insertplataforma = async (plataforma) => {
    try {
        let sql = `insert into tbl_plataforma(
                    plataforma = '${plataforma.plataforma}',
                    link_plataforma = '${plataforma.link_plataforma}'
                    `
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdPlataforma= async function(id) {
    try {
        let sql= `select * from tbl_plataforma where id= ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) 
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllPlataforma= async function() {
    try {
        //Script Sql para retornar todos os dados
        let sql='select * from tbl_premiacao order by id desc'
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
const deletePlataforma = async function(id){
    try {
        let sql = `delete from tbl_plataforma where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updatePlataforma= async function(plataforma) {
    try {
            let sql = `update tbl_plataforma set 
            plataforma = '${plataforma.plataforma}',
            where id = '${plataforma.id}'`
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
    insertplataforma,
    selectByIdPlataforma,
    selectAllPlataforma,
    deletePlataforma,
    updatePlataforma
}
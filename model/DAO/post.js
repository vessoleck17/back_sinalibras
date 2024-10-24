/**************************************************
 * objetivo: crud post
 * data: 24/09
 * autor: Paloma Vessoleck
 * versão 1.0
 */

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const insertPost = async function (dadosPost){
    let sql 
    try{
        if(
            dadosPost.foto_postagem != null &&
            dadosPost.foto_postagem != "" &&
            dadosPost.foto_postagem != undefined
        ){
            sql = `insert into tbl_post (
                texto,
                foto_postagem
                id_professor
            ) values (
                '${dadosPost.texto}',
                '${dadosPost.foto_postagem}',
                '${dadosPost.id_professor}'
            )`

        }else{
            sql = `insert into tbl_post (
                texto,
                foto_postagem,
                id_professor
            ) values (
                '${dadosPost.texto}',
                null,
                '${dadosPost.id_professor}'
            )`
        }

        let rsPost = await prisma.$executeRawUnsafe(sql)

           if(rsPost)
           return true
       
    } catch (error){
        return false 
    }
}

const updatePost = async function (id, dadosPost){

    let sql 
    

    try{
        if(
            dadosPost.foto_postagem != null &&
            dadosPost.foto_postagem != "" &&
            dadosPost.foto_postagem != undefined
        
        ){

                sql = `update tbl_post set
                texto = '${dadosPost.texto}', 
                foto_postagem = '${dadosPost.foto_postagem}',
                id_profesor = '${dadosPost.id_professor}'

                where id_post = ${id}`

            }else{
                sql = `update tbl_post set
                texto = '${dadosPost.texto}', 
                foto_postagem = null,
                id_professor = '${dadosPost.id_professor}'
                
                where id_post = ${id}`

            }

            let rsPost = await prisma.$executeRawUnsafe(sql)

            if(rsPost)
                return true
          
    } catch (error){
        return false
    }
}

const deletePost = async function (id){

       try{
        let sql = `delete from tbl_post where id_post = ${id}`

        let rsPost = await prisma.$executeRawUnsafe(sql)

        if(rsPost)
           return true
      

       }catch(error){
        return false
       }
    
}

const selectAllPost = async function (){

     try{

        let sql = `select  * from tbl_post order by data desc;`

        let rsPost = await prisma.$queryRawUnsafe(sql)

      

        if(rsPost.length > 0)
            return rsPost
    

     }catch(error){
        return false
     }

     
}

const selectPostById = async function (id){
    try{

        let sql = `select * from tbl_post where id_post = ${id}`
        let rsPost = await prisma.$queryRawUnsafe(sql)

        if(rsPost)
            return rsPost
    
    }catch(error){
        return false
    }
}


const selectUltimoId = async function (){
    try{
       let sql = `select cast(last_insert_id()as DECIMAL) as id from tbl_postlimit 1;`

       let rsPost = await prisma.$queryRawUnsafe(sql);
       return rsPost

       
    } catch (error) {
       return false
   }
}

module.exports = {
    insertPost,
    updatePost,
    deletePost,
    selectAllPost,
    selectPostById,
    selectUltimoId
}
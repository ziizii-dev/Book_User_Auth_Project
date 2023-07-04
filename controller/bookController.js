const db = require('../lib/db');

const index = (req, res) => {
    const query = 'select * from books where status = 1';

    try {
        db.execute(query, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            res.status(200).json({
                error: false,
                message: 'books list',
                data: result,
            });
        });
    } catch (error) {
        console.log(error);
        throw new Error('Unable to retrieve books');
    }
};

const store = (req, res) => {

    const query =
        'insert into books (title,author,release_year) values (?,?,?)';
       

    db.execute(
        query,
        [req.body.title, req.body.author, req.body.release_year],
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            res.status(200).json({
                error: false,
                message: 'books list',
                data: {
                    id: result.insertId,
                    ...req.body,
                },
            });
        }
    );
};


////Update Section
const update = (req,res)=>{
    const { id } = req.params;
    const query =
    'UPDATE books SET title = ?, author = ?, release_year = ? WHERE id = ?';
    db.execute(
        query, [req.body.title, req.body.author,req.body.release_year, req.params.id], (err, results) =>{
            // return query;
            if(err){
                    console.error('Error updating data: ', err);
                    res.status(500);
                    return;
                  }
                  res.status(200).json({
                        error:false,
                        message:"Update Successfully",
                          id:id,
                           data:{
                            title:req.body.title,
                            author:req.body.author,
                            release_year:req.body.release_year
                           }
                     
                      });
        }
    )

}
/////////
//Delete Section
const deleteBook = (req,res)=>{
    const {id} = req.params;
    const query =
    'UPDATE books SET status = 0 WHERE id = ?';
    db.execute(
        query,
        [id],(err,result)=>{
            if(err){
                console.error("Error Deleting Data:",err);
                res.sendStatus(500);
                return;
            }
            res.status(200).json({
                error:false,
                message:"Deleted Successfully",
                id:id,
                data:true
            })
        }
    )
}
module.exports = {index, store,update,deleteBook};

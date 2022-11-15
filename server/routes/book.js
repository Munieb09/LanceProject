let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect with book model

let Book = require('../models/books');

/* CRUD Operation */
/* Read Operation */
/* Get route for the book list */

router.get('/', (req,res,next)=>{
    Book.find((err, booklist)=>{
        if(err){
            return console.error(err);
        }
        else{
            res.render('book/list', {title: 'Books',
            Booklist: booklist})
        }
    });
});

/* Add Operation */
/* Get route for displaying the Add-Page -- Create Operation */
router.get('/add', (req,res,next)=> {
    res.render('book/add', {title: 'Add Book'})
});
/* Post route for processing the Add-Page -- Create Operation */
router.post('/add', (req,res,next)=> {
    let newBook = Book ({
        "name":req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price
    });
    Book.create(newBook,(err,Book) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/book-list');
        }
    });
});

/* Edit Operation */
/* Get route for displaying the Edit Operation -- Update Operation */
/*router.get('/edit/:id', (req,res,next)=> {
    let id = req.params.id;
    Book.findById(id,(err, bookToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.render('book/edit', {title: 'Edit Book', book: bookToEdit});
        }
    })
});*/
/* Post route for displaying the Edit Operation -- Update Operation */
/*router.post('/edit/:id', (req,res,next)=> {
    let id = req.params.id;
    let updateBook = Book({
        "_id":id,
        "name":req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price
    })
    Book.updateOne({_id:id},updateBook,(err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/book-list');
        }
    })
});
*/
/* Delete Operation */
/* Get to perform Delete Operation -- Dletion */

router.get('/delete/:id', (req,res,next)=> {
    let id = req.params.id;
    Book.deleteMany({_id:id}, (err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/book-list');
        }
    })
});


module.exports=router;

//Add func wont work, ask about that tmr for OH,
//Also ask about the "module.exports=router;" if we need this line of code
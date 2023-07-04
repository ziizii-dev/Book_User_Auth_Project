const express = require('express');
const router = express();
const {index, store,update,deleteBook} = require('../controller/bookController');

router.route('/books').get(index).post(store);
router.route('/books/:id').put(update).delete(deleteBook);

exports.default = (app) => {
    app.use('/api', router);
};
const express = require('express');
const bookRouter = require('./router/bookRouter');
const userRouter = require('./router/userRouter');
const cors =  require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const glob = require('glob');
// const checkToken = require('./middleware/checkToken');

const app = express();
const PORT = 8080;
app.use(express.json());
//app.use('/api', bookRouter);
// app.use('/api/register', bookRouter);
// app.use('/api/login', bookRouter);
app.use(cors());
app.use(helmet());
app.use(morgan());
app.use(compression());
// app.use(checkToken);
const routes = glob.sync(__dirname + '/router/*.js');
routes.forEach((item) => {
    //console.log(item);
    require(item).default(app);
});
app.listen(PORT, () =>
    console.log(`Server is runnig on port ${PORT}`)
);



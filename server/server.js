const app = require('./app');
const connectDb = require('./mongo/mongo');

const port = process.env.PORT || 8000;
connectDb();
app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
})
const express = require('express');

const connectDB = require('./config/db')

const app = express();

const path = require('path')

//connect DB
connectDB();

//Init middleware
app.use(express.json({extended: false}));

/*app.get('/', (req,res) => res.json({msg: 'Welcome to Book log'}))*/



//routes
app.use('/api/logs', require('./routes/logs'));
app.use('/api/loggers', require('./routes/loggers'));

//serve static assets in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('bookStoreInventory/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'bookStoreInventory', 'build', 'index.html')));
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server started'));
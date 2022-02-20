const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use('/api/auth', require('./routes/auth_routes'));


const PORT = config.get('port') || 5000;

async function start() {
    try {
        // await mongoose.connect(config.get('mongoUri'), { 
        //     useNewUrlParser: true,       // теперь так расписывать неактуально
        //     useUnifiedTopology: true,    // значения этих функций по умолчаню true
        //     useCreateIndex: true         // поэтому запись сокращаем
        // });
        await mongoose.connect(config.get('mongoUri'));

        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}...`);
        }); 

    } catch(err) {
        console.log('Server Error', err.message);
        process.exit(1);
    }
}
start();
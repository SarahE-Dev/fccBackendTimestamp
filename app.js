const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors({ optionsSuccessStatus: 200 }));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + 'index.html')
})

app.get('/api/:date?', (req, res)=>{
    
        const dateGiven = req.params.date;
        let date;

        if(!dateGiven){
            date = new Date()
        }else{
            const unixCheck = dateGiven * 1;
            if(isNaN(unixCheck)){
                date = new Date(dateGiven)
            }else{
                date = new Date(unixCheck)
            }
        }

        const unix = date.getTime();
        const utc = date.toUTCString();
        res.json({unix, utc})

        if(date === 'Invalid Date'){
            res.json({'error': 'Invalid Date'})
        }
    
    

    
    
        
    
})



app.listen(3000, ()=>{
    console.log('Server started on Port: 3000');
})
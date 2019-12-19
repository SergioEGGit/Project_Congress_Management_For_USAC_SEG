const express = require('express');
const morgan = require('morgan');
const app = express();

app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);


app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./routes'));
app.use('/api/usuarios' ,require('./routes/usuarios'))

app.listen(app.get('port'), () => {
   console.log(`Server on port ${app.get('port')}`);
})
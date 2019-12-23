const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

app.set('port', process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.set('json spaces', 2);


app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./routes'));
app.use('/api/usuarios' ,require('./routes/usuarios'));
app.use('/api/productos' ,require('./routes/productos'));
app.use('/api/contactos' ,require('./routes/contactos'));
app.use('/api/cursos' ,require('./routes/cursos'));
app.use('/api/asignacioncurso' ,require('./routes/asignacioncurso'));
app.use('/api/variables' ,require('./routes/variables'));



app.listen(app.get('port'), () => {
   console.log(`Server on port ${app.get('port')}`);
});
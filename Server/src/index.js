const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.set('port', process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.set('json spaces', 2);


//app.use(bodyParser.json());
app.use(morgan('dev'));
//app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./routes'));
app.use('/api/usuarios' ,require('./routes/usuarios'));
app.use('/api/productos' ,require('./routes/productos'));
app.use('/api/contactos' ,require('./routes/contactos'));
app.use('/api/cursos' ,require('./routes/cursos'));
app.use('/api/asignacioncurso' ,require('./routes/asignacioncurso'));
app.use('/api/variables' ,require('./routes/variables'));
app.use('/api/noticias' ,require('./routes/noticias'));
app.use('/api/actividades' ,require('./routes/actividades'));
app.use('/api/gastoseingresos' ,require('./routes/gastoseingresos'));
app.use('/api/mensajes' ,require('./routes/mensajes'));
app.use('/api/peticionmensaje' ,require('./routes/peticionmensaje'));
app.use('/api/asignacionactividades' ,require('./routes/asignacionactividades'));
app.use('/api/variablesglobales' ,require('./routes/variablesglobales'));
app.use('/api/comentarios' ,require('./routes/comentarios'));
app.use('/api/dashboard' ,require('./routes/dashboard'));
app.use('/api/coffebreak' ,require('./routes/coffebreak'));




app.listen(app.get('port'), () => {
   console.log(`Server on port ${app.get('port')}`);
});
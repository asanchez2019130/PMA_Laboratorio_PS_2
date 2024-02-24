const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.studentPath = '/api/student'
        this.cursosPath = '/api/cursos'
        this.teacherPath = '/api/teacher'

        this.connectarDB();
        this.middlewares();
        this.routes();

    }


    async connectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.studentPath, require('../routes/student.routes'));
        this.app.use(this.cursosPath, require('../routes/curso.routes'));
        this.app.use(this.teacherPath, require('../routes/teacher.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutado y escuchado');
        })
    }
}

module.exports = Server;
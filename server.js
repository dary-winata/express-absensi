const express = require('express');
const cors = require('cors');
const usersEndpoint = require('./routes/users');
const absensiEndpoint = require('./routes/absensi');
const sequelize = require('./db.config');
const port = 6969

sequelize.sync().then ( () => console.log('Database connected!') );

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', usersEndpoint);
app.use('/absensi', absensiEndpoint);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
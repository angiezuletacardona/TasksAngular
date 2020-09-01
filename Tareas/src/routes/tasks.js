const router = require('express').Router();
const mysql = require('mysql');

const mysqlConection = require('../database');


router.get('/tasks', (req, res) => {
    mysqlConection.query('CALL getTask()', (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'OK', data: rows[0] });
        } else {
            res.json({ status: 'ERROR', data: err });
        }
    })
});

router.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    mysqlConection.query('SELECT * FROM tarea WHERE id = ?', [id], (err,
        rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//crear nuevos datos
router.post('/InsertTasks', (req, res) => {
    const { nombre, descripcion } = req.body;
    if (nombre != null && descripcion != null && nombre != '' && descripcion != '' ) {
        const query = `CALL AddEdit(?, ?);`;
        mysqlConection.query(query, [nombre, descripcion], (err, rows, fields) => {
            if (!err) {
                res.json({ status: 'OK', data: rows[0] });
            } else {
                res.json({ status: 'ERROR', data: err });
                console.log(err);
            }
        });
    } else {
        res.json({ status: 'ERROR', data: 'datos vacios' });
    }
});

router.put('/UpdateTasks/:id', (req, res) => {
    const { nombre, descripcion } = req.body;
    const { id } = req.params;
    const query = `CALL AddEdit(?, ?, ?);`;
    mysqlConection.query(query, [id, nombre, descripcion], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'tarea actualizada' });
        } else {
            console.log(err);
        }
    });
});

router.delete('/DeleteTasks/:id', (req, res) => {
    const { id } = req.params;
    mysqlConection.query(`DELETE FROM tarea WHERE id=?`, [id], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'tarea eliminada' });
        } else {
            console.log(err);
        }
    });
});

module.exports = router
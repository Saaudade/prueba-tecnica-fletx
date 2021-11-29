const db = require('../db/db.json');

function create(req, res) {
    const body = req.body;
    db.push(body);
    return res.json(db);
}

function getAll(req, res) {
    return res.json(db);
}

// Busqueda por palabra clave
function findByWord(req, res) {
    let {word} = req.params;
    let result = [];

    if(word === ':word') {
        res.status(400);
        let message = "Por favor introduzca una palabra clave";
        return res.json({
            status: 400,
            message
        })
    }

    result = [
        ...db.filter((efemeride) => efemeride.texto.includes(word))
    ];

    return res.json(result);
}

function findByDate(req, res) {
    let {fecha} = req.params;
    let result = [];
    if(fecha === ':fecha') {
        let dateCurrently = new Date();
        fecha = `${dateCurrently.getMonth()+1}-${dateCurrently.getDate()}`; 
    }

    result = [
        ...db.filter((efemeride) => efemeride.fecha === fecha)
    ];

    let obj = {
        msj: `Fecha introducida: ${fecha}`,
        resultados: result
    }
    return res.json(obj);
}

function update(req, res) {
    const {fecha} = req.params;
    const efemeride = req.body;

    const exist = db.findIndex((efemeride) => efemeride.fecha === fecha);

    if(exist < 0) {
        res.status(400);
        return res.json({
            status: 400,
            message: `No se encontró en la bd la fecha introducida: ${fecha}` 
        });
    }

    db[exist] = {
        ...db[exist],
        ...efemeride
    };

    return res.json(db);
}

function remove(req, res) {
    const {fecha} = req.params;

    let response = [];
    
    const exist = db.filter((efemeride) => efemeride.fecha === fecha);

    console.log(exist);

    if(exist.length === 0) {
        res.status(400);
        return res.json({
            status: 400,
            message: `No se encontró en la bd la fecha introducida: ${fecha}` 
        });
    }

    db.forEach(efemeride => {
        if(efemeride.fecha === fecha) {
            efemeride.estado = false;
            response.push(efemeride);
        }
    });

    return res.json(response);
}


module.exports = {
    create,
    getAll,
    findByDate,
    findByWord,
    update,
    remove,
};
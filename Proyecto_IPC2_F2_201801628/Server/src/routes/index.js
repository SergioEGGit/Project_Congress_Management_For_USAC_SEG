const { Router } = require('express');

const router = new Router();

router.get('/test', (req, res) => {
    const data = {
        name: 'Sergio',
        website: 'Proyecto'
    };
    res.json(data);
});

module.exports = router;
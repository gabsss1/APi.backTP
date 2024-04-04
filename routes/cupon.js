const express = require('express');
const router = express.Router();

const cuponController = require('../controllers/cuponController');
const auth = require('../middlewares/authenticate');

router.post('/registro_cupon_admin',auth.auth,cuponController.registro_cupon_admin);
router.get('/listar_cupones_admin/:filtro?',auth.auth,cuponController.listar_cupones_admin);
router.get('/obtener_cupon_admin/:id',auth.auth,cuponController.obtener_cupon_admin);
router.put('/actualizar_cupon_admin/:id',auth.auth,cuponController.actualizar_cupon_admin);
router.delete('/eliminar_cupon_admin/:id',auth.auth,cuponController.eliminar_cupon_admin);
router.get('/validar_cupon_admin/:cupon',auth.auth,cuponController.validar_cupon_admin);

module.exports = router;
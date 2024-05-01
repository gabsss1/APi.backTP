const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/authenticate');

router.post('/registro_cliente',usuarioController.registro_cliente);
router.post('/login_cliente',usuarioController.login_cliente);
router.get('/listar_clientes_filtro_admin/:tipo/:filtro',auth.auth,usuarioController.listar_clientes_filtro_admin);
router.post('/registro_cliente_admin',auth.auth,usuarioController.registro_cliente_admin);
router.get('/obtener_cliente_admin/:id',auth.auth,usuarioController.obtener_cliente_admin);
router.put('/actualizar_cliente_admin/:id',auth.auth,usuarioController.actualizar_cliente_admin);
router.delete('/eliminar_cliente_admin/:id',auth.auth,usuarioController.eliminar_cliente_admin);
router.post('/registro_admin',usuarioController.registro_admin);
router.post('/login_admin',usuarioController.login_admin);
router.get('/obtener_cliente_guest/:id',auth.auth,usuarioController.obtener_cliente_guest);
router.put('/actualizar_perfil_cliente_guest/:id',auth.auth,usuarioController.actualizar_perfil_cliente_guest);

module.exports = router;
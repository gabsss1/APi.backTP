const Cupon = require ("../models/Cupon");

exports.registro_cupon_admin = async (req,res) => {
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body;
            let reg = await Cupon.create(data);
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'No tiene acceso'});
        }
    }else{
        res.status(500).send({message: 'No tiene acceso'});
    }
};

exports.listar_cupones_admin= async (req,res) =>{
    if (req.user) {
        if (req.user.role=='admin') {
            var filtro = req.params['filtro'];
            let reg = await Cupon.find({codigo: new RegExp(filtro, 'i')}).sort({createdAt: -1});
            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message: 'No tiene acceso'});
        }
    }else{
        res.status(500).send({message: 'No tiene acceso'});
    }
};

exports.obtener_cupon_admin= async (req,res) =>{
    if (req.user) {
        if (req.user.role == 'admin') {
            var id = req.params['id'];

            try {
                var reg = await Cupon.findById({_id:id});
                res.status(200).send({data:reg});
            } catch (error) {
                res.status(200).send({data:undefined});
            }
        }else{
            res.status(500).send({message: 'No tiene acceso'});
        }
    }else{
        res.status(500).send({message: 'No tiene acceso'});
    }
};

exports.actualizar_cupon_admin= async (req,res) =>{
    if (req.user) {
        if (req.user.role == 'admin') {
            var data = req.body;
            var id = req.params['id'];

            let reg = await Cupon.findByIdAndUpdate({_id:id},{
                codigo: data.codigo,
                tipo: data.tipo,
                valor: data.valor,
                limite: data.limite
            });
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'No tiene acceso'});
        }
    }else{
        res.status(500).send({message: 'No tiene acceso'});
    }
};

exports.eliminar_cupon_admin = async (req,res) =>{
    if (req.user) {
        if (req.user.role == 'admin') {
            var id = req.params['id'];
            let reg = await Cupon.findByIdAndDelete({_id:id});
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'No tiene acceso'});
        }
    }else{
        res.status(500).send({message: 'No tiene acceso'});
    }
};

exports.validar_cupon_admin = async (req,res) => {
    if (req.user) {
        var cupon = req.params['cupon'];
        var data = await Cupon.findOne({codigo: cupon});
        if (data) {
            if (data.limite==0) {
                res.status(200).send({data:undefined});
            }else{
                res.status(200).send({data:data});
            }
        }else{
            res.status(200).send({data:undefined});
        }
    }else{
        res.status(500).send({message: 'No tiene acceso'});
    }
};
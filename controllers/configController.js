const Config = require ("../models/Config");
var fs = require('fs');
var path = require('path');

exports.obtener_config_admin = async (req,res) => {
    if (req.user) {
        if (req.user.role == ('admin')) {

            let reg = await Config.findById({_id:'653df703f9fc0b9b80d2cd49'});

            res.status(200).send({data:reg});
        } 

        else {
            res.status(500).send({message:'No tiene acceso'});
        }
    }

    else {
        res.status(500).send({message:'No tiene acceso'});
    }
};

exports.actualiza_config_admin = async (req,res) => {
    if (req.user) {
        if(req.user.role == ('admin')){

            let data = req.body;

            if(req.files){
                var img_path = req.files.logo.path;
                var name = img_path.split('\\');
                var logo_name = name[2];

                let reg = await Config.findByIdAndUpdate({_id:'653df703f9fc0b9b80d2cd49'},{
                    categoria:JSON.parse(data.categoria),
                    titulo: data.titulo,
                    serie: data.serie,
                    logo: logo_name,
                    correlativo: data.correlativo
                });

                fs.stat('./uploads/configuraciones/'+reg.logo,function(err){
                    if (!err) {
                        fs.unlink('./uploads/configuraciones/'+reg.logo,(err)=>{
                            if (err) throw err;
                        });
                    }
                });

                res.status(200).send({data:reg});
            } 
            else {
                let reg = await Config.findByIdAndUpdate({_id:'653df703f9fc0b9b80d2cd49'},{
                    categoria: data.categoria,
                    titulo: data.titulo,
                    serie: data.serie,
                    correlativo: data.correlativo
                });

                res.status(200).send({data:reg});
            }

        }

        else {
            res.status(500).send({message:'No tiene acceso'});
        }
    }

    else {
        res.status(500).send({message:'No tiene acceso'});
    }
};

exports.obtener_logo = async(req,res) => {
    var img = req.params['img'];
    
    fs.stat('./uploads/configuraciones/'+img,function(err){
        if(!err)
        {
            let path_img = './uploads/configuraciones/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }

        else {
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
};

exports.obtener_config_publico = async (req,res) => {
    let reg = await Config.findById({_id:'653df703f9fc0b9b80d2cd49'});

    res.status(200).send({data:reg});
};

const Admin = require ("../models/Admin");
const Cliente = require ("../models/Cliente");
const bcrypt = require('bcrypt');
const jwt = require('../helpers/jwt');

exports.registro_cliente = async (req, res) => {
    try {
        const data = req.body;
        const clientesArr = await Cliente.find({ email: data.email });

        if (clientesArr.length === 0) {
            // Si el correo no existe en la base de datos, procede con el registro
            if (data.password) {
                // Hashea la contraseña
                const hashedPassword = await bcrypt.hash(data.password, 10); // Cambia el valor de salt según tus necesidades

                // Actualiza la contraseña en los datos antes de crear el cliente
                data.password = hashedPassword;

                // Crea el cliente
                const newCliente = await Cliente.create(data);

                res.status(200).json({ data: newCliente });
            } else {
                res.status(400).json({ message: 'No se proporcionó una contraseña', data: undefined });
            }
        } else {
            res.status(400).json({ message: 'El correo ya existe en la base de datos', data: undefined });
        }
    } catch (error) {
        console.error('Error al registrar el cliente:', error);
        res.status(500).json({ message: 'Error del servidor', data: undefined });
    }
};

exports.login_cliente = async (req,res) => {
    var data = req.body;
    //creando arreglo de cliente
    var cliente_arr = [];
    //buscando email con la bd
    cliente_arr = await Cliente.find({email:data.email});
    if (cliente_arr == 0) {
        // no hay correo en bd
        res.status(200).send({message: 'No se encontro el correo', data:undefined});
    }else{
        //si hay email que coincide = login
        let user = cliente_arr[0];
        //desenceriptando password
        bcrypt.compare(data.password, user.password, async function(error, check) {
            if (check) {
                //login
                //si esta bien el pass manda data
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message: 'La contraseña no coincide', data:undefined});
            }
        });
    }
    
};

exports.listar_clientes_filtro_admin = async (req,res) => {

    if (req.user) {
        if (req.user.role == 'admin') {
            let tipo = req.params['tipo'];
            let filtro = req.params['filtro'];

            console.log(tipo);

            if (tipo == null || tipo == 'null') {
                let reg = await Cliente.find();
                res.status(200).send({data:reg});
            }

            else {
                //Filtro
                if (tipo == 'apellidos') {
                    let reg = await Cliente.find({apellidos: new RegExp(filtro,'i')});
                    res.status(200).send({data:reg});
                }
                else if (tipo == 'correo') {
                    let reg = await Cliente.find({email: new RegExp(filtro,'i')});
                    res.status(200).send({data:reg});
                }
            }
        }

        else {
                res.status(500).send({message: 'No tiene acceso'});
        }
    }

    else {
        res.status(500).send({message: 'No tiene acceso'});
    }
};

exports.registro_cliente_admin = async function (req, res) {
    if (req.user) {
      if (req.user.role == 'admin') {
        var data = req.body;
  
        try {
          // Generate a password hash using bcrypt with 10 salt rounds
          const hash = await bcrypt.hash('123456789', 10);
  
          data.password = hash;
  
          // Create a new Cliente with the hashed password
          const reg = await Cliente.create(data);
          res.status(200).send({ data: reg });
        } catch (err) {
          // Handle errors, e.g., validation errors or database issues
          res.status(200).send({ message: 'Hubo un error en el servidor', data: undefined });
        }
      } else {
        res.status(500).send({ message: 'No tiene acceso' });
      }
    } else {
      res.status(500).send({ message: 'No tiene acceso' });
    }
  };


exports.obtener_cliente_admin = async (req,res) => {
     if (req.user) {
      if (req.user.role == 'admin') {
        
        var id = req.params['id'];

        try {
            var reg = await Cliente.findById({_id:id});

            res.status(200).send({data:reg});

        }

        catch (err) {
            res.status(200).send({data:undefined});
        }

      } else {
        res.status(500).send({ message: 'No tiene acceso' });
      }
    } else {
      res.status(500).send({ message: 'No tiene acceso' });
    }
};

exports.actualizar_cliente_admin = async (req,res) => {
    if (req.user) {
        if (req.user.role == 'admin') {
          
          var id = req.params['id'];
          var data = req.body;
  
          var reg = await Cliente.findByIdAndUpdate({_id:id},{
            nombres: data.nombres,
            apellidos: data.apellidos,
            email : data.email,
            telefono: data.telefono,
            f_nacimiento: data.f_nacimiento,
            dni: data.dni,
            genero: data.genero            
          })

          res.status(200).send({data:reg});
  
        } else {
          res.status(500).send({ message: 'No tiene acceso' });
        }
      } else {
        res.status(500).send({ message: 'No tiene acceso' });
      }
};

exports.eliminar_cliente_admin = async (req,res) => {
    if (req.user) {
        if (req.user.role == 'admin') {
          
          var id = req.params['id'];

          let reg = await Cliente.findByIdAndRemove({_id:id});

          res.status(200).send({data:reg});

        } else {
          res.status(500).send({ message: 'No tiene acceso' });
        }
      } else {
        res.status(500).send({ message: 'No tiene acceso' });
      }
};

exports.registro_admin = async (req, res) => {
    try {
        const data = req.body;
        const adminArr = await Admin.find({ email: data.email });

        if (adminArr.length === 0) {
            // Si el correo no existe en la base de datos, procede con el registro
            if (data.password) {
                // Hashea la contraseña
                const hashedPassword = await bcrypt.hash(data.password, 10); // Cambia el valor de salt según tus necesidades

                // Actualiza la contraseña en los datos antes de crear el administrador
                data.password = hashedPassword;

                // Crea el administrador
                const newAdmin = await Admin.create(data);

                res.status(200).json({ data: newAdmin });
            } else {
                res.status(400).json({ message: 'No se proporcionó una contraseña', data: undefined });
            }
        } else {
            res.status(400).json({ message: 'El correo ya existe en la base de datos', data: undefined });
        }
    } catch (error) {
        console.error('Error al registrar el administrador:', error);
        res.status(500).json({ message: 'Error del servidor', data: undefined });
    }
};

exports.login_admin = async (req,res) => {
    var data = req.body;
    //creando arreglo de admin
    var admin_arr = [];
    //buscando email con la bd
    admin_arr = await Admin.find({email:data.email});
    if (admin_arr == 0) {
        // no hay correo en bd
        res.status(200).send({message: 'No se encontro el correo', data:undefined});
    }else{
        //si hay email que coincide = login
        let user = admin_arr[0];
        //desenceriptando password
        bcrypt.compare(data.password, user.password, async function(error, check) {
            if (check) {
                //login
                //si esta bien el pass manda data
                res.status(200).send({
                    data:user,
                    //genera token
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message: 'La contraseña no coincide', data:undefined});
            }
        });
    }
    
};


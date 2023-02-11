const axios = require("axios");
const {Product} = require("../../db.js");
const cloudinary = require("../../cloudinaryConfig/cloudinaryConfig");
const {Op} = require("sequelize");

const getProducts = async (nameP) => {
  try {
    //ACA SE BUSCA SI HAY PRODUCTO EN LA DB HACIENDO UNA BUSQUEDA SIMPLE SOLO PARA SABER SI HAY PRODUCTOS
    const hayProduct = await Product.findOne();
    //EN CASO DE NO HABER REALIZA EL IF Y GUARDA LOS PRODUCTOS EN LA DB
    if(!hayProduct){
        const api = await axios.get(
          `https://veterinaria-634d6-default-rtdb.firebaseio.com/productosDB.json`
        );
      
        await api.data.forEach(async (p) => {
          const obj = {            
            name: p.nombre,
            unit_price: p.precio,
            description: p.descripcion,
            stock: p.stock,
            petSize: Array.isArray(p.breed) ? p.breed : [p.breed],
            breedType:Array.isArray(p.tipo) ? p.tipo : [p.tipo]  
          };
          const created = await Product.create(obj)
          
          await cloudinary.uploader.upload(
            p.image, 
            {public_id: created.image_url}
          )
        
        });
    }
    const allProducts = await Product.findAll();   
    //DESPUES DE QUE SE GUARDAN O NO (PORQUE YA EXISTIAN), HACE UNA BUSQUEDA MAS COMPLEJA
    return nameP ? await Product.findAll({
      where: {
        name: {
          [Op.or]: [
            { [Op.iLike]: nameP + "%" },
            { [Op.substring]: nameP },
            { [Op.endsWith]: nameP }
          ] 
        }
      }
    }) 
    :
    await Product.findAll();
     
  } catch (err) {
    throw new Error(err.message)
  }
};

module.exports = { getProducts };
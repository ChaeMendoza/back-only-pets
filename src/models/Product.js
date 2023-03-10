const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("product", {
   codProduct: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    }, 
    num:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    petSize: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    breedType: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    image_url: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    url: {
        type: DataTypes.STRING,
        allowFalse: false
    },
    unsubscribe: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }  
  },{
    // Opciones de tu modelo
    paranoid: true // Habilita eliminación suave eliminacion logica
  });
};

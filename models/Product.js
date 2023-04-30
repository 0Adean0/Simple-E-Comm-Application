// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
  id:{
    type: DataTypes.INTERGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name:{
    trype: Datatypes.STRING,
    allowNull: false
  },
  price:{
    type: DataTypes.DECIMAL(10,5),
    allowNull: false,
    validate:{
      isFloat: true
    },
    stock:{
      type:DataTypes.INTERGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
      category_id: {
        type: DataTypes.INTERGER,
        references: {
          model: 'category',
          key: 'id',
        }
      }
    }
  }
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
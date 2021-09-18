
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreignKey: 'catagory_id',
  onDelete: "CASCADE",
});

Category.hasMany(Category, {
foreignKey: 'catagory_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

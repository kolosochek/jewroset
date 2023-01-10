const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, unique: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    firstname: {type: DataTypes.STRING, unique: false, allowNull: true},
    lastname: {type: DataTypes.STRING, unique: false, allowNull: true},
    addressone: {type: DataTypes.STRING, unique: false, allowNull: true},
    addresstwo: {type: DataTypes.STRING, unique: false, allowNull: true},
    phone: {type: DataTypes.STRING, unique: false, allowNull: true},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING, unique: false, allowNull: false},
})

const BasketDevice = sequelize.define('basket_device',{
    quantity: {type: DataTypes.INTEGER, defaultValue: 1}
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const CategoryBrand = sequelize.define('category_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// db relations
User.hasMany(Rating)
Rating.belongsTo(User)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

Category.hasMany(Device, {as: 'category'})
Device.belongsTo(Category)

Brand.hasMany(Device, {as: 'brand'})
Device.belongsTo(Brand)

Category.belongsToMany(Brand, {through: CategoryBrand})
Brand.belongsToMany(Category, {through: CategoryBrand})

// basket
User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Basket.belongsToMany(Device, {through: BasketDevice, onDelete: 'CASCADE'})
Device.belongsToMany(Basket, {through: BasketDevice, onDelete: 'CASCADE'})

// order
Order.hasOne(Basket)
Basket.belongsTo(Order)

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Category,
    Brand,
    Rating,
    DeviceInfo
}

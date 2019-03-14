const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menu_itemSchema = new Schema({
	restaurant_owner: String,
	name: String
});

const Menu_item = mongoose.model('menu_item', menu_itemSchema);

module.exports = Menu_item;
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const users = require('./models/users.js')(sequelize, Sequelize.DataTypes);
const currencyShop = require('./models/currencyShop.js')(sequelize, Sequelize.DataTypes);
const userItems = require('./models/userItems.js')(sequelize, Sequelize.DataTypes);

userItems.belongsTo(currencyShop, { foreignKey: 'item_id', as: 'item' });

Reflect.defineProperty(users.prototype, 'addItem', {
	value: async item => {
		const userItem = await userItem.findOne({
			where: { user_id: this.user_id, item_id: item.id },
		});
		if (userItem) {
			userItem.amount += 1;
			return userItem.save();
		}
		return userItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
	},
});

Reflect.defineProperty(users.prototype, 'getItems', {
	value: () => {
		return userItems.findAll({
			where: { user_id: this.user_id },
			include: ['item'],
		});
	},
});

module.exports = { 
	users, currencyShop, userItems 
};
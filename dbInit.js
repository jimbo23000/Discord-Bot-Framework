const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const currencyShop = require('./databases/currencyShop.js')(sequelize, Sequelize.DataTypes);
require('./databases/users.js')(sequelize, Sequelize.DataTypes);
require('./databases/userItems.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		// Need to update with items for the users
		currencyShop.upsert({ name: '', cost:  ''}),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);
import { Asset } from '../models/asset';
import { Catalog } from '../models/catalog';
import { User } from '../models/User';
import { sequelize } from './connection';

async function seedData() {
    try {
        await sequelize.sync({ force: true }); // Drop and recreate tables

        await Catalog.bulkCreate([
            {
                name: 'first',
                description: "description1",
                url: "url",
                cost1: 11,
                cost2: 12,
                cost3: 14,
                req1: 15,
                req2: 16,
                req3: 17,
                category: 1,
            },

            {
                name: 'second',
                description: "description2",
                url: "url",
                cost1: 4,
                cost2: 5,
                cost3: 6,
                req1: 7,
                req2: 8,
                req3: 9,
                category: 2,
            }
        ]);

        await User.bulkCreate([
            {
                address: 'address1',
                cash1: 1,
                cash2: 2,
                cash3: 3
            },
            {
                address: 'address2',
                cash1: 50,
                cash2: 50,
                cash3: 50
            },
        ]
        );

        await Asset.bulkCreate([
            {
                type: 1,
                level: 1,
                address: 'address1'
            },
            {
                type: 1,
                level: 2,
                address: 'address2'
            }
        ],
        );
    } catch (error) {
        throw error;
    } finally {
        await sequelize.close();
    }
}

seedData();

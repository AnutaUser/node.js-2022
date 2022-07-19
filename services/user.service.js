const {User} = require('../dataBase');

module.exports = {

    findAllWithPagination: async (query = {}) => {

        const {page = 1, perPage = 20, ...otherFilters} = query;

        const searchObject = {};

        if (otherFilters.search) {
            Object.assign(searchObject, {
                $or: [
                    {name: {$regex: otherFilters.search, $options: 'i'}},
                    {email: {$regex: otherFilters.search, $options: 'i'}}
                ]
            });
        }

        if (otherFilters.ageGte) {
            Object.assign(searchObject, {
                age: {$gte: +otherFilters.ageGte}
            });
        }

        if (otherFilters.ageLte) {
            Object.assign(searchObject, {
                age: {
                    ...searchObject.age || {},
                    $lte: +otherFilters.ageLte
                }
            });
        }

        console.log(JSON.stringify(searchObject, null, 2));

        const skip = (page - 1) * perPage;

        const users = await User.find(searchObject).skip(skip).limit(perPage);
        const count = await User.countDocuments(searchObject);

        return {
            ...query,
            data: users,
            count
        };
    },

    createOne: async (user) => {
        return User.create(user);
    },

    findOne: async (params = {}) => {
        return User.findOne(params);
    },

    updateOne: async (params, userData, options = {new: true}) => {
        return User.findOneAndUpdate(params, userData, options);
    },

    deleteOne: async (params = {}) => {
        return User.deleteOne(params);
    }

};

// const _getUserFilterQuery = (otherFilters) => {
//     const searchObject = {};
//
//     if (otherFilters.search) {
//         Object.assign(searchObject, {
//             $or: [
//                 {name: {$regex: otherFilters.search, $options: 'i'}},
//                 {email: {$regex: otherFilters.search, $options: 'i'}}
//             ]
//         });
//     }
//
//     if (otherFilters.ageGte) {
//         Object.assign(searchObject, {
//             age: {$gte: +otherFilters.ageGte}
//         });
//     }
//
//     if (otherFilters.ageLte) {
//         Object.assign(searchObject, {
//             age: {
//                 ...searchObject.age || {},
//                 $lte: +otherFilters.ageLte
//             }
//         });
//     }
//
//     console.log(JSON.stringify(searchObject, null, 2));
//
//     return otherFilters;
// }


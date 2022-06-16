const {carService} = require('../services');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const cars = await carService.reader();
            res.json(cars);
        } catch (e) {
            res.status(400).json(e.message || 'Unknown Error');
        }

    },

    createCar: async (req, res) => {
        try {
            const {model, price, year} = req.body;

            if (!model || model.length < 3) {
                return res.status(400).json('Enter valid name!');
            }
            if (!price || !Number.isInteger(price) || price > 1000000 || price < 0) {
                return res.status(400).json('Enter valid price!');
            }
            if (!year || !Number.isInteger(year) || year < 1990 || year > 2022) {
                return res.status(400).json('Enter valid year!');
            }

            const cars = await carService.reader();

            const newCar = {...req.body, id: cars.length ? cars[cars.length - 1].id + 1 : 1};

            await carService.writer([...cars, newCar]);

            res.status(204).json(newCar);

        } catch (e) {
            res.status(400).json(e.message || 'Unknown Error');
        }
    },

    getCarById: async (req, res) => {
        try {
            const {carId} = req.params;

            const cars = await carService.reader();

            const car = cars.find((car) => car.id === +carId);

            if (!car) {
                res.status(400).json(`Car with id ${carId} not exist!`);
            }

            res.json(car);

        } catch (e) {
            res.status(400).json(e.message || 'Unknown Error');
        }
    },

    updateCar: async (req, res) => {
        try {
            const {model, price, year} = req.body;
            const {carId} = req.params;

            if (model && model.length < 3) {
                return res.status(400).json('Enter valid name for update!');
            }
            if (price && !Number.isInteger(price) || price > 1000000 || price < 0) {
                return res.status(400).json('Enter valid price for update!');
            }
            if (year && !Number.isInteger(year) || year > 2022 || year < 1990) {
                return res.status(400).json('Enter valid year for update!');
            }

            const cars = await carService.reader();

            const index = cars.findIndex((car) => car.id === +carId);

            if (index === -1) {
                return res.status(400).json(`User with id ${userId} not found`);
            }

            const updateCar = Object.assign(cars[index], req.body);
            // const updateCar = {...cars[index], ...req.body};

            cars.splice(index, 1);

            await carService.writer([...cars, updateCar]);

            res.status(201).json(updateCar);

        } catch (e) {
            res.status(400).json(e.message || 'Unknown Error');
        }
    },

    deleteCar: async (req, res) => {
        try {
            const {carId} = req.params;

            const cars = await carService.reader();

            const index = cars.findIndex((car) => car.id === +carId);

            if (index === -1) {
                res.status(400).json(`Car with id ${carId} not exist!`);
            }

            cars.splice(index, 1);

            await carService.writer(cars);

            res.sendStatus(204);

        } catch (e) {
            res.status(400).json(e.message || 'Unknown Error');
        }
    }

};



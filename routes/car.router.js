const carRouter = require('express').Router();

const carController = require('../controllers/car.controller');

carRouter.get('/', carController.getAllCars);
carRouter.post('/', carController.createCar);
carRouter.get('/:carId', carController.getCarById);
carRouter.put('/:carId', carController.updateCar);
carRouter.delete('/:carId', carController.deleteCar);

module.exports = carRouter;
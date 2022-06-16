const router = require('express').Router();

const carController = require('../controllers/car.controller');

router.get('/', carController.getAllCars);
router.post('/', carController.createCar);

router.get('/:carId', carController.getCarById);
router.put('/:carId', carController.updateCar);
router.delete('/:carId', carController.deleteCar);

module.exports = router;
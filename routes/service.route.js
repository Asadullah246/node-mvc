const router = require("express").Router();

/* import controller */
const serviceController = require("../controllers/service.controller");
const AuthGuard = require("../middlewares/AuthGuard");

// @route POST api/services/save
// @desc Save service for this App
// @access secure
router.post("/save", AuthGuard, serviceController.saveService);

// @route GET api/services
// @desc Get all services
// @access secure
router.get("/user/all", AuthGuard, serviceController.getAllServices);

// @route GET api/services/:id
// @desc Get service by id
// @access secure
router.get("/service/:id", AuthGuard, serviceController.getServiceById);

// @route DELETE api/services/:id
// @desc Delete service by id
// @access secure
router.delete("/service/:id", AuthGuard, serviceController.deleteService);

// @route PUT api/services/:id
// @desc Update service by id
// @access secure
router.put("/service/:id", AuthGuard, serviceController.updateService);






//exports
module.exports = router;

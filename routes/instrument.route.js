const router = require("express").Router();

const instrumentController = require("../controllers/instrument.controller");

// @route POST api/instruments/save
// @desc Save instrument for this App
// @access secure
router.post("/save", instrumentController.saveInstrument);


// @route GET api/instruments
// @desc Get all instruments
// @access secure
//router.get("/user/all", instrumentController.getAllInstruments);



/* import */
module.exports = router;
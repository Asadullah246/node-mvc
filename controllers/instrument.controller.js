/* save instrument */
const saveInstrument = async (req, res) => {
  res.send({
    success: true,
    message: "Instrument saved",
  });
};

/* export */
module.exports = {
  saveInstrument,
};

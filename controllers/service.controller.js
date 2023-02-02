const Service = require("../models/serviceModel");

/* for save service */
const saveService = async (req, res) => {
  const userId = req.user._id;
  const { name, price, description } = req.body;
  if (!name || !price || !description) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const newService = new Service({
      user: userId,
      name,
      price,
      description,
    });
    const savedService = await newService.save();
    res.json({
      success: true,
      message: "Service Saved successfully done",
      service: savedService,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* for get all services */
const getAllServices = async (req, res) => {
  try {
    const userId = req.user._id;
    const { q, limit, page } = req.query;
    const filter = { user: userId };
    const options = {};
    if (q) {
      filter.name = new RegExp(q, "i");
    }

    if (limit || page) {
      const skip = (page - 1) * limit;
      options.limit = parseInt(limit);
      options.skip = parseInt(skip);
    }

    const services = await Service.find(filter)
      .skip(options.skip)
      .limit(options.limit);
    const total = await Service.countDocuments({ user: userId });
    if (!services) throw Error("No services");

    res.status(200).json({
      success: true,
      message: "Fetched all the services",
      services,
      count: total,
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

/* for get service by id */
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) throw Error("No service found");
    res
      .status(200)
      .json({ success: true, message: "Get Single Service", service });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

/* for delete service by id */
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) throw Error("No service found");
    const removed = await service.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the service");
    res.status(200).json({ success: true, message: "Service deleted" });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
};

/* for update service by id */
const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service)
      throw Error("Something went wrong while trying to update the service");
    res
      .status(200)
      .json({ success: true, message: "Service updated", service: service });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
};

/* import */
module.exports = {
  saveService,
  getAllServices,
  getServiceById,
  deleteService,
  updateService,
};

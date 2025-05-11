import bookingModel from "../models/bookingModel.js";

const list = async (req, res) => {
  try {
    const bookings = await bookingModel.list(req.user.userId);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const addOrUpdate = async (req, res) => {
  try {
    const data = {
      ...req.body,
      CreatedBy: req.user.userId,
    };
    const result = await bookingModel.addOrUpdate(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const booking = await bookingModel.getById(req.params.id, req.user.userId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const result = await bookingModel.delete(req.params.id, req.user.userId);
    if (result.affectedRows === 0) {
      return res
        .status(403)
        .json({ error: "Not allowed to delete this booking" });
    }
    res.status(200).json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default { list, addOrUpdate, getById, delete: deleteBooking };

import pool from "../config/db.js";

const list = async (userId) => {
  const [rows] = await pool.query("CALL spGetBookings(?)", [userId]);
  return rows[0];
};

const addOrUpdate = async (data) => {
  const [rows] = await pool.query(
    "CALL spAddUpdateBooking(?,?,?,?,?,?,?,?,?)",
    [
      data.BookingId || null,
      data.CustomerName,
      data.CustomerEmail,
      data.BookingDate,
      data.BookingType,
      data.BookingSlot || null,
      data.FromTime || null,
      data.ToTime || null,
      data.CreatedBy,
    ]
  );
  return rows[0];
};

const deleteBooking = async (bookingId, userId) => {
  const [rows] = await pool.query("CALL spDeleteBooking(?, ?)", [
    bookingId,
    userId,
  ]);
  return rows.affectedRows ? rows[0] : [];
};

export default { list, addOrUpdate, delete: deleteBooking };

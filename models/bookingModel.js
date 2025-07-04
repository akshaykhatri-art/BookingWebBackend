import pool from "../config/db.js";

const list = async (userId) => {
  const [rows] = await pool.query("CALL spGetBookingList(?)", [userId]);
  return rows[0];
};

const addOrUpdate = async (data) => {
  const [rows] = await pool.query(
    "CALL spAddUpdateBooking(?,?,?,?,?,?,?,?,?)",
    [
      data.BookingId ?? null,
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

const getById = async (bookingId, userId) => {
  const [rows] = await pool.query("CALL spGetBookingById(?, ?)", [
    bookingId,
    userId,
  ]);
  return rows[0][0];
};

const deleteBooking = async (bookingId, userId) => {
  const [resultSets] = await pool.query("CALL spDeleteBooking(?, ?)", [
    bookingId,
    userId,
  ]);

  const [check] = await pool.query(
    "SELECT Status FROM booking WHERE BookingId = ?",
    [bookingId]
  );

  return check[0]?.Status === "Inactive";
};

export default { list, addOrUpdate, getById, delete: deleteBooking };

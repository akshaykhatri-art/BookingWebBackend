import { body } from "express-validator";

export const bookingValidation = [
  body("CustomerName").notEmpty().withMessage("Customer Name is required"),
  body("CustomerEmail").isEmail().withMessage("Valid email is required"),
  body("BookingDate").notEmpty().withMessage("Booking Date is required"),
  body("BookingType")
    .isIn(["Full Day", "Half Day", "Custom"])
    .withMessage("Invalid Booking Type"),
  body("BookingSlot").custom((value, { req }) => {
    if (req.body.BookingType === "Half Day" && !value) {
      throw new Error("Booking Slot is required for Half Day");
    }
    return true;
  }),
  body("FromTime").custom((value, { req }) => {
    if (req.body.BookingType === "Custom") {
      if (!value) throw new Error("From Time is required for Custom booking");
      if (!/^\d{2}:\d{2}(:\d{2})?$/.test(value))
        throw new Error("Invalid FromTime format");
    }
    return true;
  }),
  body("ToTime").custom((value, { req }) => {
    if (req.body.BookingType === "Custom") {
      if (!value) throw new Error("To Time is required for Custom booking");
      if (!/^\d{2}:\d{2}(:\d{2})?$/.test(value))
        throw new Error("Invalid ToTime format");
    }
    return true;
  }),
];

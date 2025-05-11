import express from "express";
import bookingController from "../controllers/bookingController.js";
import authenticate from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { bookingValidation } from "../validations/bookingValidation.js";
import checkAllowedFields from "../middlewares/checkAllowedFields.js";

const router = express.Router();

router.use(express.json());
router.use(authenticate);

router.get("/", bookingController.list);
router.get("/:id", bookingController.getById);
router.post(
  "/",
  checkAllowedFields([
    "CustomerName",
    "CustomerEmail",
    "BookingDate",
    "BookingType",
    "BookingSlot",
    "FromTime",
    "ToTime",
    "BookingId",
  ]),
  bookingValidation,
  validate,
  bookingController.addOrUpdate
);
router.delete("/:id", bookingController.delete);

export default router;

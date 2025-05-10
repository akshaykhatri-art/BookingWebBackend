import pool from "../config/db.js";

const register = async (data) => {
  const [rows] = await pool.query("CALL spRegisterUser(?,?,?,?,?)", [
    data.firstName,
    data.lastName,
    data.email,
    data.password,
    data.token,
  ]);
  return rows;
};

const verify = async (token) => {
  const [rows] = await pool.query("CALL spVerifyUser(?)", [token]);
  return rows;
};

const login = async (email) => {
  const [rows] = await pool.query("CALL spLoginUser(?)", [email]);
  return rows[0][0];
};

export default { register, verify, login };

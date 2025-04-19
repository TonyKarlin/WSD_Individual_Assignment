'use strict';
import promisePool from '../../utils/database.js';

const login = async (user) => {
  const sql = `SELECT * FROM wsk_users WHERE username = ?`;

  const [rows] = await promisePool.execute(sql, [user]);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {login};

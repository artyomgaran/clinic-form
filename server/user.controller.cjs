const User = require("./models/user.model.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("./constans.cjs");

async function loginUser(email, password) {
  if (!email || !password) {
    throw new Error("Почта и пароль обязательны");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Неверный пароль");
  }

  return jwt.sign({ email }, JWT_TOKEN, { expiresIn: "30d" });
}

module.exports = loginUser;

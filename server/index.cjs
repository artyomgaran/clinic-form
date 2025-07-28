const express = require("express");
const port = 3040;
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { JWT_TOKEN } = require("./constans.cjs");

app.use(
  cors({
    origin: "http://localhost:5173", // адрес фронта
    credentials: true, // чтобы можно было принимать/отправлять куки
  })
);
app.use(express.json());
app.use(cookieParser());

// Модели
const User = require("./models/user.model.cjs");
const Bids = require("./models/bids.model.cjs");

// Контроллеры
const loginUser = require("./user.controller.cjs");

//Маршрут получение заявок
app.get("/bids", async (req, res) => {
  console.log(chalk.green(">>> Получен запрос на /bids"));
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Нет токена. Доступ запрещён." });
  }

  try {
    // Расшифровка токена
    const decoded = jwt.verify(token, JWT_TOKEN);

    // Если всё хорошо — отдаём заявки
    const bids = await Bids.find();
    res.json(bids);
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Неверный токен. Доступ запрещён." });
  }
});

// Маршрут для создания заявки
app.post("/form", async (req, res) => {
  console.log(chalk.green(">>> Получен запрос на /form"));
  const { name, phone, problem } = req.body;

  // Проверка наличия обязательных полей
  if (!name || !phone) {
    return res.status(400).json({ error: "Имя и телефон обязательны" });
  }

  try {
    const newBid = new Bids({ name, phone, problem });
    await newBid.save();
    res.status(201).json(newBid);
  } catch (error) {
    console.error(chalk.red("Ошибка при создании заявки:", error));
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Маршрут авторизации
app.post("/login", async (req, res) => {
  try {
    console.log(chalk.green(">>> Получен запрос на /login"));
    const token = await loginUser(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Включение сервера
mongoose
  .connect(
    "mongodb+srv://artyomgaran:Qweqwe123@cluster0.3zsgjur.mongodb.net/clinic-form?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.bgGreen(`Server on port ${port} started...`));
    });
  });

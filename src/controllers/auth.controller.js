import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.get("/register", (req, res) => {
    res.render("users/register", { pageTitle: "Register" });
});

authController.post("/register", async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    await authService.registerUser({ email, password, repeatPassword });

    res.redirect("/auth/login");
});

authController.get("/login", (req, res) => {
    res.render("users/login", { pageTitle: "Login" });
});

authController.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.loginUser({ email, password });

    res.cookie('auth', token, { httpOnly: true });

    res.redirect("/");
});
export default authController;
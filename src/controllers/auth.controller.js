import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.get("/register", (req, res) => {
    res.render("users/register", { pageTitle: "Register" });
});

authController.post("/register", async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    await authService.registerUser({ email, password, repeatPassword });

    res.redirect("/");
});


export default authController;
import { Router } from "express";
import authService from "../services/authService.js";
import { isAuthenticated, isGuest } from "../middlewares/auth.middleware.js";
import createUserSchema from "../schemas/userSchema.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router();

authController.get("/register", isGuest, (req, res) => {
    res.render("users/register", { pageTitle: "Register" });
});

authController.post("/register", isGuest, async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    try {
        
        const userData = await createUserSchema.parseAsync(req.body);
        const token = await authService.registerUser(userData);
    
        res.cookie('auth', token, { httpOnly: true });
        res.redirect("/auth/login");

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render("users/register", {error: errorMessage});
    }

});

authController.get("/login", isGuest, (req, res) => {
    res.render("users/login", { pageTitle: "Login" });
});

authController.post("/login", isGuest, async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.loginUser({ email, password });

    res.cookie('auth', token, { httpOnly: true });

    res.redirect("/");
});

authController.get("/logout", isAuthenticated, (req, res) => {
    res.clearCookie('auth');
    res.redirect("/");
});


export default authController;
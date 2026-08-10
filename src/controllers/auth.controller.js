import { Router } from "express";

const authController = Router();

authController.get("/register", (req, res) => {
    res.render("users/register", { pageTitle: "Register" });
});

export default authController;
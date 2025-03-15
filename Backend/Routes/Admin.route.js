import express from "express";
import { loginAdmin } from "../Controllers/Admin.controller.js";

const route = express.Router();

route.post("/adminLogin", loginAdmin);

export default route;

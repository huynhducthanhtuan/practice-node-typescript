import express, { Express } from "express";
import { errorHandler } from "./types";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cookieParse from "cookie-parser";
import routing from "./routes";
import connectDatabase from "./configs/connectDatabase";

dotenv.config();
const app: Express = express();
const PORT: Number = Number(process.env.PORT) || 4000;

// Config Swagger
const swaggerOptions: Object = {
	definition: {
		openapi: "3.0.3",
		info: {
			title: "SwaggerUI",
			version: "1.0.0",
			description: "A simple Express Library API"
		},
		servers: [
			{
				url: "http://localhost:4000/",
				description: "Development"
			},
			{
				url: "https://trackscan.azurewebsites.net/",
				description: "Production"
			}
		]
	},
	apis: ["**/*.yaml"]
};
const swaggerSpecs: Object = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParse());
app.use(errorHandler);

connectDatabase();

routing(app);

app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}/`);
	console.log(`API Documentation: http://localhost:${PORT}/api-docs/`);
});

// Testing ...
// import InvestorModel from "./models/Investor";
// console.log(InvestorModel);

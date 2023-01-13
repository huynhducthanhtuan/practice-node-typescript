const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cookieParse = require("cookie-parser");
const routing = require("./routes");
const { connectDatabase } = require("./configs/connectDatabase");
const PORT = process.env.PORT || 4000;

const app = express();
dotenv.config();

// Config Swagger
const swaggerOptions = {
	definition: {
		openapi: "3.0.3",
		info: {
			title: "SwaggerUI",
			version: "1.0.0",
			description: "A simple Express Library API"
		},
		servers: [
			{
				url: "http://localhost:4000/"
			}
		]
	},
	apis: [
		"src/routes/auth.js",
		"src/routes/forgotPassword.js",
		"src/routes/display.js",
		"src/routes/user.js",
		"src/routes/admin.js"
	]
};
const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParse());

connectDatabase();

routing(app);

app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}/`);
	console.log(`API Documentation: http://localhost:${PORT}/api-docs/`);
});

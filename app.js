const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require("./routers/userRouter");
const dotenv = require("dotenv");
const sessionRouter = require("./routers/sessionRouter");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const log = require("./middlewares/log");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
const serverAddr = `http://${host}:${port}`;

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    app.use(log);
    const options = {
        definition: {
            openapi: "3.1.0",
            info: {
                title: "AuthService",
                version: "0.1.0",
                description:
                    "AuthService is a micro service to manage user session of other application",
                license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                },
            },
            servers: [
                {
                    url: serverAddr,
                },
            ],
            components: {
                securitySchemes: {
                    BearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        },
        apis: ["./routes/*.js"],
    };

    const specs = swaggerJsdoc(options);

    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true })
    );
}

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter);
app.use(sessionRouter);

app.get("/", (req, res) => {
    res.json({message: 'Auth service online'});
});

app.listen(3000, () => {
    console.log(`Server started on port 3000. Go to ${serverAddr}/api-docs/ to get documentation (only in development environment)`);
});

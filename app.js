const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const express = require('express');
const helmet = require('helmet');
const log = require("./middlewares/log");
const sessionRouter = require("./routers/sessionRouter");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const userRouter = require("./routers/userRouter");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
const serverAddr = `http://${host}:${port}`;

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    console.log("Development mode is set");
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use(userRouter);
app.use(sessionRouter);

app.get("/", (req, res) => {
    res.json({message: 'Auth service online'});
});

app.listen(port, host,() => {
    console.log(`Server started on port ${port}. Go to ${serverAddr}/api-docs/ to get documentation (only in development environment)`);
});

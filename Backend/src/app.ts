import cors from "cors";
import express, { Express } from "express";
import { appConfig } from "./2-utils/app-config";
import { budgetController } from "./5-controllers/budget-controller";
import { expenseController } from "./5-controllers/expense-controller";
import { userController } from "./5-controllers/user-controller";
import { errorMiddleware } from "./6-middleware/error-middleware";
import { logger } from "./6-middleware/logger";
import { securityMiddleware } from "./6-middleware/security-middleware";


class App {

    private server: Express;

    public start(): void {

        // Initialize express app
        this.server = express();

        this.server.use(express.json());
        this.server.use(cors());

        // Log requests to console and requests.log
        this.server.use(logger.logRequests);
        this.server.use(securityMiddleware.preventXssAttack); // using striptags

        // this.server.use(securityMiddleware.validateToken);



        // Register routes
        this.server.use("/api", userController.router)
        this.server.use("/api", securityMiddleware.validateToken, expenseController.router)
        this.server.use("/api", securityMiddleware.validateToken, budgetController.router)


        // Register route not found middleware:
        this.server.use("*", errorMiddleware.routeNotFound);

        // Register catch-all error middleware (error handling and logging)
        this.server.use(errorMiddleware.catchAll);

        // Start the server
        this.server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));
    }

}

const app = new App();
app.start();

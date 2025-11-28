import { Router } from "express";
import { getNotifications, markNotificationRead } from "../controller/user.controller";
import { authenticate } from "../middleware/auth";
import { authorizeRoles } from "../middleware/roles";
import { Role } from "../model/User";

const notificationRouter = Router();;

notificationRouter.get("/test-notifications", authenticate,authorizeRoles([Role.USER]) , getNotifications);
notificationRouter.patch("/:id/read", authenticate, authorizeRoles([Role.USER]), markNotificationRead);

// TEST route to create notifications locally
// notificationRouter.get("/test-create",authenticate,authorizeRoles([Role.USER]),
//     async (req, res) => {
//         try {
//             await checkExpiryNotifications();
//             res.json({ success: true, message: "Notifications checked and emails sent (if any)" });
//         } catch (error) {
//             res.status(500).json({ success: false, message: "Failed", error });
//         }
//     }
// );

export default notificationRouter;
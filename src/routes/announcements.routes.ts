import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { authorizeRoles } from "../middleware/roles";
import { Role } from "../model/User";
import { save_announcement } from "../controller/Popups.admin/announcement.controller";
import { upload } from "../middleware/upload"
import { welcome } from "../controller/welcome.controller";
import { loadAllAnnouncements } from "../controller/admin.announcements.controller";

const announcementsRouter = Router();

announcementsRouter.post("/saveAnnouncement", authenticate, authorizeRoles([Role.ADMIN]), upload.single("image"), save_announcement)
announcementsRouter.get("/", welcome)
announcementsRouter.get("/admin", authenticate, authorizeRoles([Role.ADMIN]), loadAllAnnouncements)

// announcementsRouter.put("/updateAnnouncement",authenticate,authorizeRoles([Role.ADMIN]))
// announcementsRouter.patch("/unpusblishAnnouncement",authenticate,authorizeRoles([Role.ADMIN]))

export default announcementsRouter;
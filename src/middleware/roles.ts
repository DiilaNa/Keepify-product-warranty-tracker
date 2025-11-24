import { NextFunction, Response } from "express";
import { Role } from "../model/User";
import { AuthRequest } from "./auth";

export const authorizeRoles = (roles:Role[]) => {

    return(req:AuthRequest,res:Response,next:NextFunction)=>{
        if(!req.user){
            return res.status(401).json({
                message:"Unathorized"
            })
        }

        const hasRole = roles.some(role => req.user?.role === role);

        if(!hasRole){
            return res.status(403).json({
            message: `Require ${roles} role`
            })
        } 
        next();  
    } 
};
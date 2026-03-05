import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/userModel";
import connectDB from "./src/config/db";

dotenv.config();

const repairRoles = async () => {
    try {
        await connectDB();
        console.log("Connected to database for role repair...");

        // 1. Fix 'admin' user
        const adminUser = await User.findOne({ username: "admin" });
        if (adminUser) {
            console.log(`Found admin user. Current role: ${adminUser.role}`);
            adminUser.role = "admin";
            await adminUser.save();
            console.log("Admin user role fixed to 'admin'");
        } else {
            console.log("Admin user not found. Please ensure you have an account named 'admin'.");
        }

        // 2. Fix any other users with missing roles
        const result = await User.updateMany(
            { role: { $exists: false } },
            { $set: { role: "user" } }
        );
        console.log(`Updated ${result.modifiedCount} users missing the role field to 'user'.`);

        // 3. Fix users where role is null
        const resultNull = await User.updateMany(
            { role: null },
            { $set: { role: "user" } }
        );
        console.log(`Updated ${resultNull.modifiedCount} users with null role to 'user'.`);

        console.log("Role repair completed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Repair failed:", err);
        process.exit(1);
    }
};

repairRoles();

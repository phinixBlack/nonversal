import mongoose from "mongoose";
export async function connect() {
    try {
        const url =process.env.MONGO_URL;
        mongoose.connect(url !);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MOngo sucess");
        })
        connection.on('error', () => {
            console.log("MOngo error");
        })
    } catch (error) {

    }
}

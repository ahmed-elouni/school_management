import mongoose from "mongoose";
export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"gestionecole",
    })
    .then(()=>{
        console.log("Connectée à la base de donnée");
    })
    .catch((error) => {
        console.log("Erreur de connexion à la base de donnée")
    });
};
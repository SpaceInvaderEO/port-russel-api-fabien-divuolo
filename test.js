const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB connecté");
 
        const testUser = new User({
            username: "personnagedetest",
            email: "personnagetest@test.com",
            password: "tsetedegannosrep"
        });

        await testUser.save();
        console.log("User créé :", testUser);

        mongoose.connection.close();
    })
    .catch(err => console.error(err));
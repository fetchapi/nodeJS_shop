import express from 'express'
import dotenv from 'dotenv';
import InitRouter from './Routes/init.router.js'
import UserRouter from './Routes/user.router.js'
import { router as AuthRouter } from './Routes/auth.router.js'

dotenv.config();
const port = process.env.PORT || 4242

const app = express();


app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
    res.send('☺');
});

app.use(InitRouter)
app.use(UserRouter)
app.use(AuthRouter);


app.listen(port, () => {
    console.log(`webserver running on http://localhost:${port}`);
});
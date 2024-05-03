import express from 'express';
const router = express.Router();
router.get('/a', (req, res) => {
    res.status(200).send({mes: "This is from the get request"});
})
export { router }
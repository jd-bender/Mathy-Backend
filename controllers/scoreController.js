import Score from "../models/scoreModel.js";

const getScore = async (req, res) => {
    try {
        const score = await Score.findById(req.params.id);

        res.status(200).json({
            status: 'success', 
            data: {
                score
            }
        });
    } catch(e) {
        res.status(400).json({
            status: 'error',
            message: e
        });
    }
};

const getAllScores = async (req, res) => {
    try {
        const scores = await Score.find();

        res.status(200).json({
            status: 'success', 
            results: scores.length,
            data: {
                scores
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'error',
            message: e
        });
    }
};

const addScore = async (req, res) => {
    try {
        const newScore = await Score.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                score: newScore
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'error',
            message: e
        });
    }
};

export {
    getScore,
    getAllScores,
    addScore
};
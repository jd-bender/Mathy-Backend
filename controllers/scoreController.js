import Score from "../models/scoreModel.js";

const getScore = (req, res) => {
    res.status(200).json({
        status: 'success', 
        data: {
            addition: {
                streakRecord: 7
            },
            subtraction: {
                streakRecord: 5
            }
        }
    });
};

const getAllScores = (req, res) => {
    res.status(200).json({
        status: 'success', 
        data: {
            addition: {
                streakRecord: 7
            },
            subtraction: {
                streakRecord: 5
            }
        }
    });
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
const Trans = require('../models/doc');

exports.addDocument = async (req, res, next) => {
    console.log(req.body);
    const trans = await Trans.create(req.body);
    res.status(201).json({
        status: 'success',
        data: trans,
    });
};

exports.getDocument = async (req, res, next) => {
    const getDocument = await Trans.find({});
    res.json({
        data: getDocument,
    });
};

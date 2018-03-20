const Pooja = require('../models/poojaDetails');
const constants = require('../constants/constants');
const populateModel = function (model, reqBody, id) {
    if (!checkReqBody(model, reqBody))
        return null;
    return new model({ ...reqBody, id });
}
const getModel = (collection) => {
    switch (collection) {
        case constants.Poojas:
            return Pooja;
        default:
            return null;
    }
}
const checkReqBody = function (model, reqBody) {
    const modelProps = getModelProps(model).filter(prop=>prop!=='id');
    return modelProps.filter(prop => reqBody.hasOwnProperty(prop)).length === modelProps.length;
}
const getModelProps = (model) => Object.getOwnPropertyNames(model.schema.obj);
exports.entity = function (collection) {
    let model = getModel(collection);
    return {
        add: function (req, res, next) {
            let newId;
            const getCount= async ()=>await model.count({}, function(err, count){
                if (err)
                    res.json({ error: err });
                newId = count + 1;
            });
            getCount();
            let entity = populateModel(model, req.body, newId);
            if (entity === null) {
                let modelProps = getModelProps(model);
                return res.status(422).send({ error: `You must provide ${modelProps.slice(0, modelProps.length - 1).join(', ')} and ${modelProps[modelProps.length - 1]}` });
            }
            //save it to the db
            entity.save(function (err) {
                if (err) { return next(err); }
                //Respond to request indicating the pooja was created
                res.json({ message: `${collection.slice(0, collection.length - 1)} was added successfully` });
            });
        },
        get: function (req, res, next) {
            model.find().exec((err, data) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({ data });
            });
        },
        delete: function (req, res, next) {
            // model.findById(req.params.id,(err,record)=>{
            //     if(err){
            //         res.status(404).send(err);
            //     }
            //     record.remove();
            //     res.status(200).send(`${collection.slice(0, collection.length - 1)} was deleted successfully`);
            // });
            model.remove({ id: req.params.id }, function (error) {
                res.json({ error: error });
            });
            res.status(200).send(`${collection.slice(0, collection.length - 1)} was deleted successfully`);
        },
        update: function (req, res, next) {
            model.findOneAndUpdate({ id: req.params.id }, req.body, function (error) {
                res.json({ error: error });
            });
            res.status(200).send(`${collection.slice(0, collection.length - 1)} was updated successfully`);
        }
    }
}

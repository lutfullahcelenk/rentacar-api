"use strict";

const Token = require("../models/user.model");

module.exports = {
    list: async (req, res) => {
        // #swagger.ignore = true

        const data = await res.getModelList(Token);
        res.status(200).send({
            error: false,
            message: "Listed",
            details: await res.getModelListDetails(Token),
            data,
        });
    },

    create: async (req, res) => {
        // #swagger.ignore = true

        const data = await Token.create(req.body);
        res.status(201).send({
            error: false,
            message: "Created",
            data,
        });
    },

    read: async (req, res) => {
        // #swagger.ignore = true

        const data = await Token.findOne({ _id: req.params.id });
        res.status(200).send({
            error: false,
            message: "Listed The One",
            data,
        });
    },

    update: async (req, res) => {
        // #swagger.ignore = true

        const data = await Token.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });
        res.status(200).send({
            error: false,
            message: "Updated",
            data,
            updatedData: await Token.findOne({ _id: req.params.id }),
        });
    },

    delete: async (req, res) => {
        // #swagger.ignore = true

        const data = await Token.deleteOne({ _id: req.params.id });
        res.status(data.deletedCount > 0 ? 204 : 404).send({
            error: !data.deletedCount,
            message: "Deleted",
            data,
        });
    },
};

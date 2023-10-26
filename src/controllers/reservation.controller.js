"use strict";

const Reservartion = require("../models/reservartion.model");

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ["Reservartions"]
            #swagger.summary = "List Reservartions"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        const data = await res.getModelList(Reservartion);
        res.status(200).send({
            error: false,
            message: "Listed",
            details: await res.getModelListDetails(Reservartion),
            data,
        });
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                }
            }
        */

        const data = await Reservartion.create(req.body);
        res.status(201).send({
            error: false,
            message: "Created",
            data,
        });
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Reservartions"]
            #swagger.summary = "Get Single Reservartion"
        */

        const data = await Reservartion.findOne({ _id: req.params.id });
        res.status(200).send({
            error: false,
            message: "Listed The One",
            data,
        });
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Reservartions"]
            #swagger.summary = "Update Reservartion"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                }
            }
        */

        const data = await Reservartion.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });
        res.status(200).send({
            error: false,
            message: "Updated",
            data,
            updatedData: await Reservartion.findOne({ _id: req.params.id }),
        });
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Reservartions"]
            #swagger.summary = "Delete Reservartion"
        */

        const data = await Reservartion.deleteOne({ _id: req.params.id });
        res.status(data.deletedCount > 0 ? 204 : 404).send({
            error: !data.deletedCount,
            message: "Deleted",
            data,
        });
    },
};

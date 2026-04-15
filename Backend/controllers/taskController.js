import taskModel from "../models/taskModel.js";

export const createTask = async (req, res) => {
    try {
        const {title, description} = req.body;

        if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All details are required",
      });
    }

        const task = await taskModel.create({
            title,
            description
        })

        return res.status(201).json({success : true, message : "Created task successfully.", data: task})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, message: "Error in creating task"})
    }
}

export const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find().sort({createdAt: -1});

        return res.status(200).json({success: true, message: "Tasks fetched successfully.", data: tasks})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: "Error while fetching tasks."})
    }
}
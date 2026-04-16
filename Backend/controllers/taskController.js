import taskModel from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "All details are required",
      });
    }

    const task = await taskModel.create({
      title,
      description,
      dueDate,
      userId: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Created task successfully.",
      data: task,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in creating task" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel
      .find({ userId: req.userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully.",
      data: tasks,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error while fetching tasks." });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await taskModel.findOne({
      _id: req.params.taskId,
      userId: req.userId,
    });

    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await taskModel.findOneAndDelete({
      _id: req.params.taskId,
      userId: req.userId,
    });

    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error while deleting task." });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updatedTask = await taskModel.findOneAndUpdate(
      {
        _id: req.params.taskId,
        userId: req.userId,
      },
      req.body,
      {
        returnDocument: "after",
      },
    );

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error while updating task." });
  }
};

export const toggleTask = async (req, res) => {
  try {
    const task = await taskModel.findOne({
      _id: req.params.taskId,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error toggling task",
    });
  }
};

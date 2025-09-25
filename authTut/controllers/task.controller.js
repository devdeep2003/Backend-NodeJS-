//fetch task by id
export const fetchTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await taskModel.findById(id);
    if (!data) {
      res.json({
        message: "No task found by the given id",
      });
    }
    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error in fetching task",
    });
  }
};

//create task by id
export const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newEntry = new taskModel({ title, description });
    newEntry.save();
    res.status(201).json({
      success: true,
      data: newEntry,
      message: "Task created successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error in creating task",
    });
  }
};

//update task by id
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedEntry = await taskModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedEntry) {
      return res.json({
        success: false,
        message: "Error in updating task",
      });
    }
    res.json({
      success: true,
      data: updatedEntry,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error in updating task",
    });
  }
};

//delete task by id
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEntry = await taskModel.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.json({
        success: false,
        message: "Error in deleting task",
      });
    }
    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error in deleting task",
    });
  }
};

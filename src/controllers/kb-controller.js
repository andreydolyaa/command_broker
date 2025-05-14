import { Kb } from "../models/kb-model.js";

// get all the scans
export const getAllCommands = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;

  const searchQuery = {};

  if (req.query.search) {
    const searchRegex = { $regex: req.query.search, $options: "i" };
    searchQuery.$or = [
      { target: searchRegex },
      { scanType: searchRegex },
      { states: searchRegex },
    ];
  }

  try {
    const commands = await Kb.find({ ...searchQuery })
      .skip(skip)
      .limit(limit)
      .sort({ startTime: -1 });

    if (!commands) throw new Error();

    const totalCommands = await Kb.countDocuments({
      ...searchQuery,
      userId: req.userId,
    });
    const totalPages = Math.ceil(totalCommands / limit);
    const responseData = {
      commands,
      totalPages,
      currentPage: page,
    };

    res.status(200).send({ data: responseData });
  } catch (error) {
    res.status(400).send({ message: "No commands found", error });
  }
};

// find scan by id
export const getCommandById = async (req, res) => {
  try {
    const command = await Kb.findOne({ _id: req.params.id });
    res.status(200).send({});
  } catch (error) {
    res.status(400).send({ message: "Could not get command by id", error });
  }
};

export const addCommand = async (req, res) => {
  try {
    const command = await Kb.create({ ...req.body });
    res.status(200).send({ message: "command added", command });
  } catch (error) {
    res.status(400).send({ message: "Failed to add command", error });
  }
};

export const addBulkCommands = async (req, res) => {
  try {
    const commands = await Kb.insertMany(req.body);
    res.status(200).send({ message: "commands bulk added", commands });
  } catch (error) {
    res.status(400).send({ message: "Failed to add bulk commands", error });
  }
};



// export const deleteScan = async (req, res)F => {
//   try {
//     const scan = await Kb.findOneAndDelete({ id: req.params.id });
//     scan.status = PROC_STATUS.DELETED;
//     HttpActions.notify(subscriptionPaths.NMAP_ALL, scan, "toast", req.userId);
//     res.status(200).send({ message: "Scan deleted", id: req.params.id });
//   } catch (error) {
//     res.status(400).send({ message: "Failed to delete scan", error });
//   }
// };

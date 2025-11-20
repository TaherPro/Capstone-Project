import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const { userId, itemsRequested } = req.body;

    const request = await Request.create({
      userId,
      itemsRequested,
      status: "pending",
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.params.userId });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate("userId", "name email");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

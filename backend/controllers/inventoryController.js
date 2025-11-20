import Inventory from "../models/Inventory.js";

export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const addItem = async (req, res) => {
  try {
    const { itemName, quantity, expirationDate } = req.body;

    const item = await Inventory.create({
      itemName,
      quantity,
      expirationDate,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateItem = async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

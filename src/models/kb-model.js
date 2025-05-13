import mongoose from "mongoose";

const KbModel = new mongoose.Schema(
  {
    command: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    examples: {
      type: [Object],
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: function () {
        return this._id;
      },
      index: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Kb = mongoose.model("Kb", KbModel);

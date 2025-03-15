import { Schema, model } from "mongoose";

const GroupSchema = new Schema({
  createTime: { type: Date, default: Date.now },

  Groupname: {
    type: String,
    trim: true,
    required: true,
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "GroupMessage",
    },
  ],
  // isDefault: {
  //   type: Boolean,
  //   default: false,
  // },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
const Group = model("Group", GroupSchema);
export default Group;

const mongoose = require("mongoose");

// Define the Profile Schema
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
      unique: true, // Ensure each user has only one profile
    },
    avatar: {
      type: String, // URL or file path to the profile picture
      default: "", // Default can be a placeholder URL
    },
    role: {
      type: String,
      maxlength: 50, // Optional bio field with a character limit
    },
    location: {
        type: String, // Optional field for user's location
        maxlength: 100,
      },
    socialLinks: {
      website: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },

      twitter: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
    },

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
        }
    ],
    
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", // Reference to the Post model
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", // Reference to the Post model
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment", // Reference to the Comment model
        }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Profile Model
module.exports = mongoose.model("Profile", profileSchema);

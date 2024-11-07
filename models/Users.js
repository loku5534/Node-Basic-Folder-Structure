const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
SALT_WORK_FACTOR = 10;

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    OTP: {
      type: String,
    },
  },
  { timestamps: true }
);

usersSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

usersSchema.methods.comparePassword = async function (candidatePassword, cb) {
  const passwordMatch = await bcrypt.compare(candidatePassword, this.password);
  if (passwordMatch) {
    console.log("Password matches!");
  } else {
    console.log("Password mismatch!");
  }
  return passwordMatch;
};

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;

const mongoose = require('mongoose');

const { Schema } = mongoose;

const fetchCopSchema = new Schema(
  {
    userId: String,
    displayName: String,
    phone: String,
    email: String,
    location: {
      type: { type: String },
      coordinates: []
    }
  },
  { timestamps: true }
);
fetchCopSchema.index({ location: '2dsphere' });

mongoose.model('cops', fetchCopSchema);

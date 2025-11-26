import mongoose from "mongoose";

const sonySchema = new mongoose.Schema({
  producto: {
    type: String,
    required: [true, "El producto es obligatorio"]
  },
  precio: {
    type: Number,
    required: [true, "El precio es obligatorio"]
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, "El stock no puede ser negativo"]
  },
  imagen: {
    type: String,
    required: [true, "La imagen es obligatoria"]
  }
});

const Sony = mongoose.model("Sony", sonySchema);

export default Sony;

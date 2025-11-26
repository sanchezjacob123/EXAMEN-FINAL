import Sony from '../models/sony.model.js';
import mongoose from 'mongoose';
import express from 'express';


export const getAllSony = async (req, res) => {
  console.log('🎮 Obtener todas las producciones de Sony');
  try {
    const productos = await Sony.find({}, { __v: 0 });
    if (productos.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron productos de Sony'
      });
    }

    return res.status(200).json({
      productos
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener los productos de Sony'
    });
  }
};

export const getSonyById = async (req, res) => {
  console.log('📦 Obtener producto de Sony por ID');
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID no válido'
      });
    }

    const producto = await Sony.findById(id);

    if (!producto) {
      return res.status(404).json({
        msg: 'Producto de Sony no encontrado'
      });
    }

    return res.status(200).json({
      producto
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener el producto de Sony'
    });
  }
};

export const postSony = async (req, res) => {
  console.log('🆕 Agregar nuevo producto de Sony');

  const body = req.body;
  const nuevoProducto = new Sony(body);

  try {
    const validationError = nuevoProducto.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(
        (error) => error.message
      );
      return res.status(400).json({
        errores: errorMessages
      });
    }

    await nuevoProducto.save();

    return res.status(201).json({
      msg: 'Producto de Sony agregado exitosamente',
      producto: nuevoProducto
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al guardar el producto de Sony'
    });
  }
};

export const putSony = async (req, res) => {
  console.log('✏️ Actualizar producto de Sony');
  const id = req.params.id;
  const body = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID no válido'
      });
    }

    const producto = await Sony.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    if (!producto) {
      return res.status(404).json({
        msg: 'Producto de Sony no encontrado'
      });
    }

    return res.status(200).json({
      msg: 'Producto de Sony actualizado correctamente',
      producto
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar el producto de Sony'
    });
  }
};

export const deleteSony = async (req, res) => {
  console.log('🗑️ Eliminar producto de Sony');
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID no válido'
      });
    }

    const producto = await Sony.findByIdAndDelete(id);

    if (!producto) {
      return res.status(404).json({
        msg: 'Producto de Sony no encontrado'
      });
    }

    return res.status(200).json({
      msg: 'Producto de Sony eliminado correctamente',
      producto
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al eliminar el producto de Sony'
    });
  }
};

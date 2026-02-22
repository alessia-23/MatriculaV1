import mongoose from "mongoose";

const estudianteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
cedula: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
        validator: function(v) {
            return v.length === 10 && !isNaN(v);
        },
        message: "La cédula debe tener exactamente 10 números"
    }
},
    fecha_nacimiento: {
        type: Date,
        required: true
    },

    ciudad: {
        type: String,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
telefono: {
    type: String,
    required: true,
    trim: true,
    validate: {
        validator: function(v) {
            return v.length === 10 && !isNaN(v);
        },
        message: "El teléfono debe tener exactamente 10 números"
    }
},
    email: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model("Estudiante", estudianteSchema);

import mongoose from "mongoose";

// Para hacer las relaciones del estudiante y de la materia con la matricula, se utiliza el tipo ObjectId y se referencia a los modelos correspondientes.

const matriculaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Estudiante",
        required: true
    },
    materia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Materia",
        required: true
    }
}, {
    timestamps: true
});


// Para hacer la parte de la referecniación se le coloca la parte de "ref"
// y posterior a eso se hace de colocar a cual de los modelos se va a referenciar, en este caso se hace referencia al modelo de estudiante y al modelo de materia.
export default mongoose.model("Matricula", matriculaSchema);

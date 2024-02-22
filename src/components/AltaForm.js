import { useRef,useState } from "react";
import { postGame } from "../api/GamesApi";
import "./AltaForm.css;"

const AltaForm = ({plataformas, categorias, onSaveGame}) => {

    const [inputValue, setInputValue] = useState({
        nombre: "",
        descripcion: "",
        fecha_lanza: "",
        compania: "",
        plataformas: [],
        categorias: [],
        precio: 0.0,
        imagen: "",
        video: ""
    })

    const [errors, setErrors] = useState({
        nombre: {error: false, message: ""},
        descripcion: {error: false, message: ""},
        fecha_lanza: {error: false, message: ""},
        compania: {error: false, message: ""},
        plataformas: {error: false, message: ""},
        categorias: {error: false, message: ""},
        precio: {error: false, message: ""},
        imagen: {error: false, message: ""},
        video: {error: false, message: ""}
    });
    const [serverError, setServerError] = useState({error: false, message: ""});
    const nombreRef = useRef();

    const resetForm = () => {
        setInputValue({
            nombre: "",
            descripcion: "",
            fecha_lanza: "",
            compania: "",
            plataformas: [],
            categorias: [],
            precio: 0.0,
            imagen: "",
            video: ""
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (nombreRef.current.value.length > 0) {
            const response = await postGame(inputValue);
            if (!response.error) {
                onSaveGame(response.data);
                resetForm();
            } else {
                setServerError({error: true, message: "No se ha podido guaradar el libro"})
            }
        } else {
            setErrors({
                ...errors,
                nombre: {
                    error: true,
                    message: "El campo nombre es obligatorio"
                }
            })
        }
    }

    const handleChange = (event) => {
        let {name, value} = event.target;
        console.log(name, value);
        switch (name) {
            case "nombre":
                if (value.length === 0) {
                    setErrors({
                        ...errors,
                        title: {error: true, message: "El título del libro es obligatorio."}
                    })
                } else {
                    setErrors({
                        ...errors,
                        title: {error: false, message: ""}
                    })
                }
                break;
            case "video":
                if (value.length > 0 && !isNaN(value)) {
                    setErrors({
                        ...errors,
                        author: {error: true, message: "El video es obligatorio"}
                    })
                } else {
                    setErrors({
                        ...errors,
                        author: {error: false, message: ""}
                    })
                }
                break;
            case "fecha_lanza":
                if (value.length === 0) {
                    setErrors({
                        ...errors,
                        description: {error: true, message: "El la fecha de lanzamiento es obligatorio."}
                    })
                } else {
                    setErrors({
                        ...errors,
                        description: {error: false, message: ""}
                    })
                }
                break;
            case "category":
                value = parseInt(value);
                break;
            default:
                break;
        }

        setInputValue({
            ...inputValue,
            [name]: value
        });
        setServerError({error: false, message: ""});
    }


    return (
        <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
            <span>Nombre: </span>
            <input  type="text"
                    name="nombre"
                    ref={nombreRef}
                    value={inputValue.nombre}
                    onChange={handleChange}
            />
            {
            errors.nombre.error ? 
                <div className="error">{errors.nombre.message}</div>
                : null
            }
        </div>
        <div className="form-group">
            <span>Descripción: </span>
            <input  type="text"
                    name="descripcion"
                    value={inputValue.descripcion}
                    onChange={handleChange}
            />
           {
            errors.descripcion.error ? 
                <div className="error">{errors.descripcion.message}</div>
                : null
            }
        </div>
        <div className="form-group">
            <span>Fecha de lanzamiento: </span>
            <input  type="text"
                    name="fecha_lanza"
                    value={inputValue.fecha_lanza}
                    onChange={handleChange}
            />
            {
            errors.fecha_lanza.error ? 
                <div className="error">{errors.fecha_lanza.message}</div>
                : null
            }
        </div>
        <div className="form-group">
            <span>Compañia: </span>
            <input  type="text"
                    name="cover"
                    value={inputValue.compania}
                    onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <span>Categoría</span>
            <select
                name="category"
                value={inputValue.category}
                onChange={handleChange}
            >   
                {
                    categories.map((category)=><option key={category.id} value={category.id}>{category.name}</option>)
                }
            </select>
        </div>
        <div className="form-group">
            { serverError.error ? serverError.message: "" }
        </div>
        <div className="form-group">
            <button type="submit">Alta</button>
        </div>
        <div className="error">

        </div>
        </form>
    )

}

export default AltaForm;
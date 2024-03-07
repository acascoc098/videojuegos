import { useRef,useState } from "react";
import { postGame } from "../api/GamesApi";
import './AltaForm.css';

const AltaForm = ({plataformass, categoriass, onSaveGame}) => {

    const [selectedPlataforma, setSelectedPlataforma] = useState('');
    const [selectedCategoria, setSelectedCategoria] = useState('');
    //console.log(categoriass)

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
                        nombre: {error: true, message: "El nombre del juego es obligatorio."}
                    })
                } else {
                    setErrors({
                        ...errors,
                        nombre: {error: false, message: ""}
                    })
                }
                break;
            case "video":
                if (value.length === 0) {
                    setErrors({
                        ...errors,
                        video: {error: true, message: "El video es obligatorio"}
                    })
                } else {
                    setErrors({
                        ...errors,
                        video: {error: false, message: ""}
                    })
                }
                break;
            case "fecha_lanza":
                if (value.length === 0) {
                    setErrors({
                        ...errors,
                        fecha_lanza: {error: true, message: "El la fecha de lanzamiento es obligatorio."}
                    })
                } else {
                    setErrors({
                        ...errors,
                        fecha_lanza: {error: false, message: ""}
                    })
                }
                break;
            case "plataforma":
                setSelectedPlataforma(value);
                break;
            case "categoria":
                setSelectedCategoria(value);
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
            <input  type="date"
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
                    name="compania"
                    value={inputValue.compania}
                    onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <span>Precio: </span>
            <input  type="number"
                    name="precio"
                    value={inputValue.precio}
                    onChange={handleChange}/>
        </div>
        <div className="form-group">
            <span>Categoría</span>
            <select
                name="categoria"
                value={selectedCategoria}
                onChange={(e) => handleChange(e, "categoria")}
            >
                {categoriass?.map((category) => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                ))}
            </select>
        </div>
        <div className="form-group">
            <span>Plataforma</span>
            <select
                name="plataforma"
                value={selectedPlataforma}
                onChange={(e) => handleChange(e, "plataforma")}
            >
                {plataformass?.map((plataform) => (
                    <option key={plataform.id} value={plataform.id}>{plataform.title}</option>
                ))}
            </select>
        </div>
        
            <div className="form-group">
            <span>Video: </span>
            <input  type="text"
                    name="video"
                    value={inputValue.video}
                    onChange={handleChange}
            />
            {
            errors.video.error ? 
                <div className="error">{errors.video.message}</div>
                : null
            }
        </div>
            <div className="form-group">
            <span>Imagen: </span>
            <input  type="text"
                    name="imagen"
                    value={inputValue.imagen}
                    onChange={handleChange}
            />
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
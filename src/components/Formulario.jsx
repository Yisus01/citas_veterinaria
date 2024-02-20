import {useState, useEffect} from 'react';
import Error from './Error';
function Formulario({ pacientes, setPacientes, paciente, setPaciente}) {

    const [nombre, setNombre] = useState('');
    const [dueño, setDueño] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false)

    useEffect(()=>{
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setDueño(paciente.dueño)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }

    },[paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36)
        return random + fecha
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

    //validacion formulario
    if([nombre, dueño, email, fecha, sintomas] .includes("")){
        console.log("Hay al menos un campo vacio")
        setError(true)
        return
    }
    setError(false)


    //Objecto de Paciente
    const objectoPaciente={
        nombre,
        dueño,
        email,
        fecha,
        sintomas
    }

    if(paciente.id){
        // EDITANTO ELR REGISTRO
        objectoPaciente.id = paciente.id
        const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objectoPaciente : pacienteState)
        setPacientes(pacientesActualizados)
        setPaciente({})
    }else{
        //NUEVOR REGISTRO
        objectoPaciente.id= generarId()
        setPacientes([...pacientes, objectoPaciente])
    }
    // setPacientes([...pacientes, objectoPaciente])
    // console.log(objectoPaciente)

    //reiniciar el form
    setNombre("")
    setDueño("")
    setEmail("")
    setFecha("")
    setSintomas("")


  }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5" >

        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10" >Añadir Pacientes y {""} <span className="text-green-600 font-bold text-lg">Administralos</span></p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" > 
            
            {error && <Error mensaje="Todos los campos son obligatorios"/>}

            <div className="mb-5">
                <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>

                <input id="mascota" type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Ejem: Don Gato" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            </div>

            <div className="mb-5">
                <label htmlFor="dueño" className="block text-gray-700 uppercase font-bold">Nombre del Dueño</label>

                <input id="dueño" type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Ejem: Jonh Doe" value={dueño} onChange={(e) => setDueño(e.target.value)}/>
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>

                <input id="email" type="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Ejem: JonhDoe@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="mb-5">
                <label htmlFor="Alta" className="block text-gray-700 uppercase font-bold">Alta</label>

                <input id="Alta" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={fecha} onChange={(e) => setFecha(e.target.value)}/>
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Sintomas</label>

                <textarea id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Ejem:  Vomito, diarrea, Poco apetito, etc" value={sintomas} onChange={(e) => setSintomas(e.target.value)}></textarea>
            </div>

        <input type="submit" className="bg-green-600  w-full p-3 text-white font-bold uppercase hover:bg-green-700 cursor-pointer transition-all" value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}/>

        </form>

    </div>
  )
}

export default Formulario


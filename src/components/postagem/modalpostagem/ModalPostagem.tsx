import Popup from 'reactjs-popup';
import FormPostagem from "../formpostagem/FormPostagem";

 function ModalPostagem() {
  return (
   <>
    <Popup trigger={
    <button className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800">
     Nova Postagem
    </button>
    } modal 
      contentStyle={{
        borderRadius: '1rem',
        paddingBottom: '2rem',
        backgroundColor: '#ffffff',
        width: '90%',
        maxWidth: '600px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
      }}
      overlayStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <FormPostagem/>
    </Popup>
   </>    
  );
}


export default ModalPostagem;
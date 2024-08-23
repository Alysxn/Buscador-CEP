import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert("Preencha com algum CEP.");
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');

    }catch{
      alert("Erro ao buscar o CEP.");
      setInput('');
    }
  }

  // Função para lidar com o pressionamento da tecla Enter
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  // Função para filtrar apenas números no input
  function handleInputChange(e) {
    const value = e.target.value;
    // Permitir apenas números
    if (/^\d{0,8}$/.test(value)) {
      setInput(value);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Busca CEP</h1>

      <div className="containerInput">
        <input
          type="text" 
          placeholder="Digite seu cep..."
          value={input}
          onChange={handleInputChange} 
          onKeyDown={handleKeyDown} 
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>   
      )}
    </div>
  );
}

export default App;

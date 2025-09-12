import { useState } from "react";
import { AiFillPayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    value={value}
    step="0.01"
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Simulando o carregamento
    setLoading(true);

    // Aqui seria onde a lógica de envio da transação ocorre
    setTimeout(() => {
      setLoading(false); // Finaliza o carregamento após 2 segundos (simulação)
    }, 2000);
  };

  const connectWallet = async () => {
    // Função de conexão com a carteira
  };

  return (
    <div className="flex w-full h-screen justify-center items-center gradient-bg-welcome">
      <div className="flex flex-col md:flex-row items-center justify-between md:p-20 py-12 px-4 w-full">
        {/* Esquerda - Texto e Botão */}
        <div className="flex flex-col justify-start items-start flex-1">
          <h1 className="text-5xl sm:text-5xl text-white font-semibold py-1">
            Envoyez des crypto <br />
            partout dans le monde!
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explorez le monde des cryptos ! Achetez et vendez des cryptomonnaies facilement avec Krypt!
          </p>
          <button
            type="button"
            onClick={connectWallet}
            className="flex justify-center items-center my-5 bg-[#b53a41] p-3 rounded-full cursor-pointer hover:bg-[#f71524] w-full text-white text-lg font-semibold"
          >
            Connecter le portefeuille
          </button>

          {/* Características */}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10 gap-4">
            <div
              className={`cursor-pointer hover:bg-[#146a92] ${commonStyles}`}
            >
              Sécurité
            </div>
            <div
              className={`cursor-pointer hover:bg-[#146a92] ${commonStyles}`}
            >
              Web 3.0
            </div>
            <div
              className={`cursor-pointer hover:bg-[#146a92] ${commonStyles}`}
            >
              Rapidité
            </div>
            <div
              className={`cursor-pointer hover:bg-[#146a92] ${commonStyles}`}
            >
              Frais Attractifs
            </div>
            <div
              className={`cursor-pointer hover:bg-[#146a92] ${commonStyles}`}
            >
              Ethereum
            </div>
            <div
              className={`cursor-pointer hover:bg-[#146a92] ${commonStyles}`}
            >
              Metamask
            </div>
          </div>
        </div>

        {/* Direita - Cartão Gradiente */}
        <div className="flex flex-1 justify-center items-center md:mt-0 mt-10 ">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={24} color="#fff" />
                </div>
                <BsInfoCircle fontSize={20} color="#ffff" />
              </div>
              <p className="text-white font-light text-sm">Adresse</p>
              <p className="text-white font-semibold text-lg mt-1">Ethereum</p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="p-14 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
          <Input
            placeholder="Adresse de réception"
            name="AddressTo"
            type="text"
            handleChange={() => {}}
          />
          <Input
            placeholder="Montant (ETH)"
            name="amount"
            type="number"
            handleChange={() => {}}
          />
          <Input
            placeholder="Mot-clé (Gif)"
            name="keyword"
            type="text"
            handleChange={() => {}}
          />
          <Input
            placeholder="Entrez le message"
            name="message"
            type="text"
            handleChange={() => {}}
          />

          {/* Loader ou botão */}
          <div className="h-[1px] w-full bg-gray-400 my-4">
            {loading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-4 border-[1px] border-white cursor-pointer hover:bg-[#c445e4] rounded-full "
              >
                Envoyer maintenant
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.4.25 <0.9.0;

contract Shipping{
    // Nossos valores predefinidos para envio listados como enums
    enum ShippingStatus
    { 
        Pending,
        Shipped,
        Delivered
    }
    // Salva o enum ShippingStatus no status da variável
    ShippingStatus public status;

    // Evento a ser lançado quando o pacote chegar
    event LogNewAlert(string description);

    // Isso inicializa nosso estado de contrato (define enum como Pendente assim que o programa for iniciado)
    constructor() public 
    {
        status = ShippingStatus.Pending;
    }

    //Função para mudar para Enviado
    function Shipped() public 
    {
        status = ShippingStatus.Shipped;
        emit LogNewAlert("O pacote foi enviado!");
    }

    //Função para mudar para Entregue
    function Delivered() public 
    {
        status = ShippingStatus.Delivered;
        emit LogNewAlert("O pacote foi entregue!");
    }

    //Função para verificar o status atual
    function getStatus(ShippingStatus _status) internal pure returns (string memory) {
     // Check the current status and return the correct name
     if (ShippingStatus.Pending == _status) return "Pending";
     if (ShippingStatus.Shipped == _status) return "Shipped";
     if (ShippingStatus.Delivered == _status) return "Delivered";
    }

    //Obtém o status do seu item enviado
      function Status() public view returns (string memory) {
         ShippingStatus _status = status;
         return getStatus(_status);
    }

}
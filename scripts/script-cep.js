const cep = document.querySelector('#txtCEP');
const end = document.querySelector('#txtRua');
const bairro = document.querySelector('#txtBairro');
const cidade = document.querySelector('#txtCidade');
const estado = document.querySelector('#txtEstado');
const buscarCep = document.getElementById("btn-Buscar");
const mensagem = document.getElementById("mensagem");
mensagem
buscarCep.addEventListener ("click", async () => {
    
    try {
        const onlyNumbers = /^[0-9]+$/; /* Garante que terá apenas numeros*/
        const cepValid = /^[0-9]{8}$/; /* Garante que terá 8 caracteres*/
        if (!onlyNumbers.test(cep.value) || !cepValid.test(cep.value)) {
            throw { cep_error: "CEP invalido"};
        }

        const response = await fetch (`https://viacep.com.br/ws/${cep.value}/json/`)
        if (!response.ok) {
            throw await response.json();
        } else {
            const responseCep = await response.json();
            end.value = responseCep.logradouro;
            bairro.value = responseCep.bairro;
            cidade.value = responseCep.localidade;
            estado.value = responseCep.uf;
        }

    } catch (error) {
        if(error?.cep_error){
            mensagem.textContent = error.cep_error; /*Apresenta mensagem de erro*/
            setTimeout(() => {
                mensagem.textContent = "";
            }, 2000); /*Tira a mensagem de erro após 2s*/
        }
    }
});

/* Função Limpar */
const limpar = document.getElementById("btn-Limpar");

function limparCampos () {
    cep.value = "";
    end.value = "";
    bairro.value = "";
    cidade.value = "";
    estado.value = "";
}

limpar.addEventListener ("click", limparCampos);
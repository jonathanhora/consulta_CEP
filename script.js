const cep = document.querySelector('.cep');

cep.addEventListener("input", () =>{
    cep.value = cep.value.replace(/[^0-9]/g, '');
});

cep.addEventListener("blur", () =>{

    if(cep.value.length === 8){
        const url = `https://viacep.com.br/ws/${cep.value}/json/`;

        fetch (url)
        .then (response => {
            if(!response.ok){
                alert('CEP não encontrado!');
                throw new Error ('Erro no Serviço: ' + response.status);            
            }
            return response.json()
        })
        .then (data => {
            if(data.erro){
             alert('CEP não encontrado!');
                throw new Error ('CEP não encontrado!');
            }else{

                for(chave in data){
                    if(document.querySelector("#" + chave)){
                        document.querySelector("#" + chave).value = data[chave];
                        document.querySelector("#" + chave).removeAttribute("readonly");
                    }
                }
            }
        
        })
        .catch (error => {
            console.error('Erro ao buscar o CEP:', error);
        });
    }
});


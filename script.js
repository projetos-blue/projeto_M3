
const baseUrl = "https://el-geladon-backend-by-ip.herokuapp.com/paletas"

// Read ALL
async function findAllPaletas() {

    const response = await fetch(`${baseUrl}/find-paletas`)
    
    console.log("response:", response)

    const paletas = await response.json()
    console.log("paletas:", paletas)

    const paletaDivElement = document.getElementById("paletaList")

    const isEdit = true

    // *****Exibir uma lista 
    paletas.map(function(paleta) {
        console.log("id", paleta._id)
        return document.getElementById("paletaList").insertAdjacentHTML("beforeend", 
        `
        <div class="PaletaListaItem" id="PaletaListaItem_${paleta._id}">
            <div>
                <div id="paletaId" class="PaletaListaItem__id">${paleta._id}</div>
                <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
                <div class="PaletaListaItem__preco">R$ ${paleta.preco},00</div>
                <div class="PaletaListaItem__descricao">${paleta.descricao}</div>

                <div class="PaletaListaItem__acoes Acoes">
                    <button class="Acoes__editar btn"onclick="editPaleta(${paleta.id})">EDITAR</button> 
                    <button class="Acoes__apagar btn" onclick="deletePaleta(${paleta.id})">APAGAR</button> 
                </div>
            
            </div>
            <img class="PaletaListaItem__foto" src=${paleta.foto} alt="Paleta de ${paleta.sabor}" />
            
        </div>
        `
        )
    })
}



findAllPaletas()


async function fetchOnePaleta (id){
    const response = await fetch(`${baseUrl}/one-paleta/${id}`)
    const paleta = await response.json()
    console.log("paleta:", paleta)

    return paleta 
}

// Read One
async function findOnePaleta() {
    
    const inputElement = document.querySelector("#idPaleta")
    console.log("inputElement", inputElement)

    const id = inputElement.value

    console.log("id", id)

    const response = await fetch(`${baseUrl}/find-paleta/${id}`) 

    const paleta = await response.json()
    console.log("paleta:", paleta)

    const divPaletaEscolhidaElement = document.getElementById("paletaEscolhida")

    console.log("divPaletaEscolhidaElement", divPaletaEscolhidaElement)

    divPaletaEscolhidaElement.innerHTML = 
        ` 
        <div class="PaletaListaItem">
            <div>
                <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
                <div class="PaletaListaItem__preco">R$ ${paleta.preco},00</div>
                <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
            </div>
            <img class="PaletaListaItem__foto" src=${paleta.foto} alt="${paleta.sabor}" />
        </div>
        `

}

const modalElement = document.querySelector("#overlay")

function abrirModal(isEdit=false){
    const paletaId = document.querySelector("#paletaId").innerText
    console.log(paletaId)

    console.log("isEdit", isEdit)

    modalElement.style.display = "flex"

    const headerModal = document.querySelector("#header-modal")
    console.log(headerModal)
   
    isEdit 
        ? headerModal.innerText = "Atualizar uma paleta"
        : headerModal.innerText = "Cadastrar uma paleta"
}

function fecharModalCadastro(){

   modalElement.style.display = "none"

}

// Create 

async function createPaleta() {

    const sabor =  document.getElementById("sabor").value
    const preco = document.getElementById("preco").value
    const descricao = document.getElementById("descricao").value
    const foto = document.getElementById("foto").value

    const paleta = {sabor, preco, descricao, foto}
    console.log("paleta dentro do create", paleta)

    const response = await fetch(`${baseUrl}/create`, 
        {
            method: "post",
            headers: {"Content-Type": "application/json"}, 
            mode: "cors", 
            body: JSON.stringify(paleta)        
        }
    ) 
    
    const novaPaleta = await response.json() 
    console.log("novaPaleta:", novaPaleta)

    fecharModalCadastro()
    findAllPaletas() 
}

const updatePaleta = async (id) => {
    const response = await fetch(`${baseUrl}/find-paleta/${id}`);
  
    const paleta = await response.json();
  
    document.getElementById("id").value = paleta.id;
    document.getElementById("sabor").value = paleta.sabor;
    document.getElementById("descricao").value = paleta.descricao;
    document.getElementById("foto").value = paleta.foto;
    document.getElementById("preco").value = paleta.preco;
  };

// DELETE

const deletePaleta = async (id) => {
    const response = await fetch(`${baseUrl}/find-paleta/${id}`);

  const paleta = await response.json();

  document.getElementById("id").value = paleta.id;
  document.getElementById("sabor").value = paleta.sabor;
  document.getElementById("descricao").value = paleta.descricao;
  document.getElementById("foto").value = paleta.foto;
  document.getElementById("preco").value = paleta.preco;
};
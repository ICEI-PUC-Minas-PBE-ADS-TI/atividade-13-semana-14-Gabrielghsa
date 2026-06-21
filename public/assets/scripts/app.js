const db_URL = "http://localhost:3000/mangas"
async function fetchItens() {
    try {
        const response = await fetch(db_URL)
        if (!response.ok) {
            throw new Error("Erro ao buscar as informações")
        }
        return await response.json()
    }
    catch (error) {
        console.error(error)
        return []
    }
}

function createCard(item) {
    const col = document.createElement("div");
    col.classList.add("col-md-6", "col-lg-3");
    col.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img
                src="${item.imagem}"
                class="card-img-top"
                alt="${item.nome}"
                
            >
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${item.nome}</h5>
                <p class="card-text">
                    ${item.descricaoCurta}
                </p>
                <p>
                    <span class="badge bg-primary">
                        ${item.categoria}
                    </span>
                </p>
                <p class="fw-bold">
                    Nota: ${item.nota}
                </p>
                <a
                    href="detalhes.html?id=${item.id}"
                    class="btn btn-dark mt-auto"
                >
                    Ver detalhes
                </a>
            </div>
        </div>
    `;
    return col;
}

 function renderCards(items){
    const lista = document.getElementById("lista-mangas")
    lista.innerHTML = ""
    items.forEach(item =>{lista.appendChild(createCard(item))})
 }
 
 async function init() {
    const items = await fetchItens()
    renderCards(items)
 }
 init()

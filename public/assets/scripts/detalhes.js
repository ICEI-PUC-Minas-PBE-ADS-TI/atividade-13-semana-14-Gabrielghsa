const db_URL = "http://localhost:3000/mangas";
async function fetchItem(id) {
    try {
        const response = await fetch(`${db_URL}/${id}`);
        if (!response.ok) {
            throw new Error("Mangá não encontrado.");
        }
        return await response.json();
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

function renderItem(item) {
    const detalhes = document.getElementById("detalhes");
    detalhes.innerHTML = `
        <div class="card shadow">
            <img
                src="${item.imagem}"
                class="card-img-top"
                alt="${item.nome}"
            >

            <div class="card-body">

                <h1 class="card-title mb-3">
                    ${item.nome}
                </h1>

                <p>
                    <span class="badge bg-primary">
                        ${item.categoria}
                    </span>
                </p>

                <h5 class="text-success">
                    Nota: ${item.nota}
                </h5>

                <hr>

                <h4>Descrição</h4>

                <p>
                    ${item.descricaoCompleta}
                </p>

                <h4>Tags</h4>

                <div>
                    ${item.tags.map(tag =>
                        `<span class="badge bg-secondary me-2">${tag}</span>`).join("")}
                </div>

                <a href="index.html" class="btn btn-dark mt-4">
                    Voltar
                </a>

            </div>

        </div>
    `;
}

function showMessage(message) {
    const detalhes = document.getElementById("detalhes");
    detalhes.innerHTML = `
        <div class="alert alert-warning text-center">
            ${message}
        </div>

        <div class="text-center">
            <a href="index.html" class="btn btn-dark">
                Voltar para Home
            </a>
        </div>
    `;
}

async function init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
        showMessage("Nenhum ID foi informado na URL.");
        return;
    }
    const item = await fetchItem(id);
    if (!item) {
        showMessage("O mangá solicitado não foi encontrado.");
        return;
    }
    renderItem(item);
}
init();

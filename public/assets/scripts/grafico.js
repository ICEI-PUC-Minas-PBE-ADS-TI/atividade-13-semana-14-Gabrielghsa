const db_URL = "http://localhost:3000/mangas";
async function fetchMangas()
{
    const response = await fetch(db_URL);
    return await response.json();
}

function contarCategorias(mangas)
{
    const categorias = {};
    mangas.forEach(manga =>
    {
        const categoria = manga.categoria;
        if(categorias[categoria])
        {
            categorias[categoria]++;
        }
        else
        {
            categorias[categoria] = 1;
        }
    });
    return categorias;
}

function criarGrafico(categorias)
{
    const ctx = document.getElementById("graficoGenero");
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: Object.keys(categorias),
            datasets: [
                {
                    label: "Mangás",
                    data:
                        Object.values(categorias)
                }
            ]
        }
    });
}

async function init()
{
    const mangas = await fetchMangas();
    const categorias = contarCategorias(mangas);
    criarGrafico(categorias);
}

init();
// 1. Seleciona a tag <main> lá do HTML onde os cards vão aparecer
const container = document.getElementById('container-cards');

// 2. Função principal para buscar os dados na API
async function carregarPersonagens() {
    const url = 'https://rickandmortyapi.com/api/character';

    try {
        // O "fetch" vai até a URL buscar os dados
        const resposta = await fetch(url);
        
        // Convertemos a resposta bruta para o formato JSON (objeto JavaScript)
        const dados = await resposta.json();
        
        // A API do Rick and Morty guarda a lista de personagens dentro de "results"
        const personagens = dados.results;

        // Fazemos um loop: para cada personagem recebido, chamamos a função de criar card
        personagens.forEach(personagem => {
            criarCard(personagem);
        });
        
    } catch (erro) {
        console.error("Erro ao buscar dados da API:", erro);
    }
}

// 3. Função que constrói o HTML dinamicamente (Manipulação do DOM)
function criarCard(personagem) {
    // --- CRIANDO OS ELEMENTOS NA MEMÓRIA ---
    
    // Cria a div principal do card
    const card = document.createElement('div');
    card.classList.add('card'); // Adiciona a classe que estilizamos no CSS

    // Cria a imagem
    const img = document.createElement('img');
    img.src = personagem.image; // Pega o link da foto direto da API
    img.alt = personagem.name;

    // Cria a div que vai guardar os textos
    const info = document.createElement('div');
    info.classList.add('card-info');

    // Cria o título (h3) com o nome
    const nome = document.createElement('h3');
    nome.textContent = personagem.name;

    // Cria o parágrafo (p) com status e espécie
    const detalhes = document.createElement('p');
    
    // Pequeno truque para traduzir o status para o português com um ícone
    let statusIcone = '⚪';
    if (personagem.status === 'Alive') statusIcone = '🟢';
    if (personagem.status === 'Dead') statusIcone = '🔴';
    
    detalhes.textContent = `${statusIcone} ${personagem.status} - ${personagem.species}`;

    // --- MONTANDO A ESTRUTURA (APPENDCHILD) ---
    // A ordem importa! Colocamos um elemento dentro do outro.

    // Coloca o nome e os detalhes dentro da div de info
    info.appendChild(nome);
    info.appendChild(detalhes);

    // Coloca a imagem e a div de info dentro do card
    card.appendChild(img);
    card.appendChild(info);

    // Finalmente, injeta o card completo dentro do container principal na tela
    container.appendChild(card);
}

// 4. Dispara a função quando o arquivo for lido pelo navegador
carregarPersonagens();
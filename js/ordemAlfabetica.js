import { verificaCampos, verificaSeCampoENumber } from "./calculo.js";

const btnOganizarDados = document.querySelector('.btnO');

btnOganizarDados.addEventListener('click', () => {

    const qtdAlunos = document.querySelectorAll('.trbody');

    if(verificaCampos(qtdAlunos) === true) return alert('Algum campo está vázio');

    if(verificaSeCampoENumber(qtdAlunos) === true) return alert('No campo nota é aceito apenas números');

    adicionarDados(qtdAlunos);
    
});

const adicionarDados = (Alunos) => {
    // esse array vai armazenar todos os elementos tr que estão dentro da tabela, cada index vai ser um tr
    
    const alunos = [];
    // esse array vai armazenar os nomes dos alunos e depois organizar em ordem alfabética
    const alunosAux = [];

    // esse array vai armazenar os dados já organizados em ordem alfábetica
    const alunosOrganizado = [];

    for (let i = 0; i < Alunos.length; i++) {
        alunos.push(Alunos[i].children);
    }

    for(let i = 0; i < alunos.length; i++) {   
        alunosAux.push(alunos[i][1].children.item(0).value);
    }

    alunosAux.sort();

    let count = 0;
    
    // esse for vai ser responsável por 'procurar' o nome do aluno na lista alunoAux e verificar se os nomes são iguais, caso sejam, os dados do aluno vão ser adiciondos no array 'alunosOrganizado'  
    for (let i = 0; i < Alunos.length; i++) {
        
        // enquanto o nome for diferente, ele vai ficar 'rodando' até achar o nome igual
        while(alunosAux[i] !== alunos[count][1].children.item(0).value) {
            // vai ajudar a percorrer pelo array aluno, lembrando que cada index é um elemento tr 
            count++;
        }

        alunosOrganizado.push(alunos[count]);
        alunos.splice(count, 1);
        
        // quando os nomes forem iguais, ele vai zerar o count e tentar 'achar' os nomes restantes
        count = 0;
    }

    gerarTabela(alunosOrganizado);
} 

const gerarTabela = (alunosOrganizado) => {
    const tbody = document.querySelector('tbody');

    tbody.innerHTML = `
        ${gerarCampos(alunosOrganizado)}
    `;
}

// gera os campos da tabela, nome, notas, media e situação
const gerarCampos = (alunosOrganizado) => {
    let tabelaCampos = '';

    for (let i = 0; i < alunosOrganizado.length; i++) {
        tabelaCampos += `
        <tr class='trbody'>
            <th>${i + 1}</th>
            <td><input type="text" class="form-control" id="" value="${alunosOrganizado[i][1].children.item(0).value}"></td>
            ${gerarCampoNota(alunosOrganizado, i)}
            <td><output>${alunosOrganizado[i][alunosOrganizado[i].length - 2].children.item(0).value}</output></td>
            <td><output>${alunosOrganizado[i][alunosOrganizado[i].length - 1].children.item(0).value}</output></td>
        </tr>
        `;
    }
    return tabelaCampos;
}

// gerar os campos das notas com os valores organizados
const gerarCampoNota = (alunosOrganizado, i) => {
    let campoNotas = '';

    for (let j = 2; j < alunosOrganizado[i].length - 2; j++) {
        campoNotas += `
        <td><input type='text' class='form-control' value="${alunosOrganizado[i][j].children.item(0).value}"></td>
        `;
    }
    return campoNotas;
}
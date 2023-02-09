import { verificaCampos, verificaSeCampoENumber } from "./calculo.js";

const btnMediaCrescente = document.querySelector('.btnOMediaC');

btnMediaCrescente.addEventListener('click', () => {
    const qtdAlunos = document.querySelectorAll('.trbody');

    if(verificaCampos(qtdAlunos) === true) return alert('Algum campo está vázio');

    if(verificaSeCampoENumber(qtdAlunos) === true) return alert('No campo nota é aceito apenas números');

    if(verificarCampoMedia(qtdAlunos) === true) return alert('A média precisa ser calculada primeiro');
    
    adicionarDados(qtdAlunos);
}); 

// essa função verifica se a média foi calculada, se não foi calculada, a orgarnização da média não pode ocorrer
const verificarCampoMedia = (Alunos) => {
    if (!Alunos[0].children.item(Alunos[0].children.length - 2).children.item(0).value) return true;
}

const adicionarDados = (Alunos) => {
    const alunos = [];

    const alunosAux = [];

    const alunosOrganizado = [];

    for (let i = 0; i < Alunos.length; i++) {
        alunos.push(Alunos[i].children);
    }

    for (let i = 0; i < alunos.length; i++) {   
        alunosAux.push(alunos[i][alunos[i].length - 2].children.item(0).value);
    }

    alunosAux.sort();

    let count = 0;

    console.log(alunos[0][alunos[0].length - 2].children.item(0).value);

    for (let i = 0; i < Alunos.length; i++) {
        
        while(alunosAux[i] !== alunos[count][alunos[count].length - 2].children.item(0).value) {

            count++;
        }

        alunosOrganizado.push(alunos[count]);
        alunos.splice(count, 1);
        
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
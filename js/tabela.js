let qtdAlunos = 2;
let qtdNotas = 2;

const btnNotas = document.querySelector('.btnN');

const btnAlunos = document.querySelector('.btnA');

btnAlunos.addEventListener('click', () => {
    if(qtdAlunos === 10) btnAlunos.remove();

    gerarLinhaAluno();
});

const gerarLinhaAluno = () => {
    const tbody = document.querySelector('tbody');
    
    qtdAlunos++;
    
    tbody.innerHTML = `
        ${gerarCampoNota()}
    `;

}

const gerarCampoNota = () => {
    
    let tabelaNota = '';
    
    for (let i = 1; i < qtdAlunos; i++) {
        tabelaNota += `
        <tr class="trbody">
        <th>${i}</th>
        <td><input type="text" class="form-control" id="" placeholder="nome"></td>
        ${gerarColunaNota()}
        <td><output></output></td>
        <td><output></output></td>
      </tr>
        
        `;
    }
    return tabelaNota;
}

const gerarColunaNota = () => {
    let colunaNota = '';
    for (let i = 1; i < qtdNotas; i++) {
        colunaNota += `<td><input type='text' class='form-control'></td>`;
    }
    return colunaNota;
}


btnNotas.addEventListener('click', () => {    
    qtdNotas++;
    
    const thead = document.querySelector('thead');

    thead.innerHTML = `<tr">
    <th scope="col">#</th>
    <th scope="col">Nome</th>
    ${gerarTHead()}
    <th scope="col" class="lblMedia">Média</th>
    <th scope="col">Situação</th>
    </tr>
    `;

    const tbody = document.querySelector('tbody');
    
    tbody.innerHTML = `${gerarCampoNota()}`;

    if(qtdNotas === 7) {
        btnNotas.remove();
    }

});

const gerarTHead = () => {
    let labelNota = '';

    for (let i = 1; i <  qtdNotas; i++) {
        labelNota += `<th>Nota ${i}</th>`;
    }
    return labelNota;
}
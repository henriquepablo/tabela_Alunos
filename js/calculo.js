const btnCalcular = document.querySelector('.btnV');


btnCalcular.addEventListener('click', () => {
        
    const qtdAlunos = document.querySelectorAll('.trbody');

    if(verificaCampos(qtdAlunos) === true) return alert('Algum campo está vázio');
    if(verificaSeCampoENumber(qtdAlunos) === true) return alert('No campo nota é aceito apenas números');
    quantidadeNotas(qtdAlunos);
});

const verificaCampos = (qtdAlunos) => {
    
    for (let i = 0; i < qtdAlunos.length; i++) {
        for (let j = 1; j < qtdAlunos[i].children.length - 2; j++) {
            if(!qtdAlunos[i].children.item(j).children.item(0).value) return true;
        }
    }   
}

const verificaSeCampoENumber = (qtdAlunos) => {
    for (let i = 0; i < qtdAlunos.length; i++) {
        for (let j = 2; j < qtdAlunos[i].children.length - 2; j++) {
            if(isNaN(qtdAlunos[i].children.item(j).children.item(0).value)) return true;
        }
    } 
}


const quantidadeNotas = (Alunos) => {
    // vai armazenar a quantidade de notas
    let count = 0;

    // faz a contagem da quantidade de notas
    for (let i = Alunos.length - 1; i < Alunos.length; i++) {
        for(let j = 2; j < Alunos[i].children.length - 2; j++) {
            count++;
        }
    }

    calcularMedia(count, Alunos);
    // console.log(qtdAlunos[0][2].children.item(0).value);

}

const calcularMedia = (count, Alunos) => {
    for (let i = 0; i < Alunos.length; i++) {
        
        let notas = 0;
        
        let media = 0;

        for(let j = 2; j < Alunos[i].children.length - 2; j++) {
            notas += Number(Alunos[i].children.item(j).children.item(0).value);
            
        }

        media = notas / count;

        Alunos[i].children.item(Alunos[i].children.length - 2).children.item(0).value = media.toFixed(1);

        if(media < 50) {
            Alunos[i].children.item(Alunos[i].children.length - 1).children.item(0).value = 'Reprovado';

            Alunos[i].children.item(Alunos[i].children.length - 1).children.item(0).style.backgroundColor = 'red';
        }

        else if(media >= 50 && media < 70) {
            Alunos[i].children.item(Alunos[i].children.length - 1).children.item(0).value = 'Recuperação';

            Alunos[i].children.item(Alunos[i].children.length - 1).children.item(0).style.backgroundColor = 'yellow';
        }

        else {
            Alunos[i].children.item(Alunos[i].children.length - 1).children.item(0).value = 'Aprovado';

            Alunos[i].children.item(Alunos[i].children.length - 1).children.item(0).style.backgroundColor = 'green';
        }
    }

    mediaGeral(Alunos);

}

const mediaGeral = (Alunos) => {

    let notas = 0;

    let media = 0;
    
    let quantidadeNotas = 0;

    for (let i = 0; i < Alunos.length; i++) {
        
        for(let j = 2; j < Alunos[i].children.length - 2; j++) {
        
            notas += Number(Alunos[i].children.item(j).children.item(0).value);

            quantidadeNotas++;   
        }
    }     

    media = notas / quantidadeNotas;

    document.querySelector('.mediaResultado').innerHTML = `${media.toFixed(3)}`;

}

export {verificaCampos, verificaSeCampoENumber};
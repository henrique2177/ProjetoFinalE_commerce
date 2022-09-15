let xhttp = new XMLHttpRequest();
function gravar() {
    let nome = document.getElementById('nome').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;
    let imagem = document.getElementById('imagem').value;

    let id = document.getElementById('id').value;
    let metodo = "";
    if(id != ""){
        metodo = "PUT";
        id = `"id":"${id}",`
    }else{
        metodo = "POST";
        id = "";
    }

    let produto = `{${id} "nome":"${nome}",  "descricao":"${descricao}" ,"valor":"${valor}", "imagem":"${imagem}"}`;
    console.log(produto);

    xhttp.open(metodo, "https://loja-senai.herokuapp.com/produto/");

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(produto);
    xhttp.onload = function () {
        console.log(this.response);
        burcarProduto();
    }

}

let lsProduto = [];
function burcarProduto() {
    xhttp.open("GET", "https://loja-senai.herokuapp.com/produto/");
    xhttp.send();
    xhttp.onload = function () {
        lsProduto = this.response;
        lsProduto = JSON.parse(lsProduto);
        let i = 0;
        let corpoTb = "";
        for (p of lsProduto) {
            corpoTb += `<tr onclick="editar(${i})"><td><img src='${p.imagem}'></td><td>${p.nome}</td><td>${p.descricao}</td><td>R$: ${p.valor}</td></tr>`;
            i++;
        }
        document.getElementById("corpoTb").innerHTML = corpoTb;
    }
    novo();
}

function editar(i) {
    let p = lsProduto[i];
    document.getElementById('nome').value = p.nome;
    document.getElementById('descricao').value = p.descricao;
    document.getElementById('valor').value = p.valor;
    document.getElementById('imagem').value = p.imagem;
    document.getElementById('id').value = p.id;
}

function novo() {
    document.getElementById('nome').value = "";
    document.getElementById('descricao').value = "";
    document.getElementById('valor').value = "";
    document.getElementById('imagem').value = "";
    document.getElementById('id').value = "";
}

function apagar() {
    let id = document.getElementById('id').value;
    xhttp.open("DELETE", `https://loja-senai.herokuapp.com/produto/${id}`);
    xhttp.send();
    xhttp.onload = function () {
        burcarProduto();
    }
}

burcarProduto();
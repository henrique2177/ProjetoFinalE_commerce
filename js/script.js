let xhttp = new XMLHttpRequest();
let lsProduto = [];
function burcarProduto() {
    xhttp.open("GET", "https://loja-senai.herokuapp.com/produto/");
    xhttp.send();
    xhttp.onload = function () {
        lsProduto = this.response;
        lsProduto = JSON.parse(lsProduto);
        montarListaProdutosHtml(lsProduto);
        marcarProdutosSelecionadosLocalStorage();
    }
}

function montarListaProdutosHtml(lsProduto) {
    let listaProduto = "";
    let i = 0;
    for (produto of lsProduto) {
        listaProduto += `
        <div class="anuncio"">
            <div class="produto">
                <img src="${produto.imagem}" alt="">
                <h3> ${produto.nome}
                <p>${produto.descricao}
                    <span class="valor">R$: ${produto.valor.toFixed(2)}</span>
                </p>
                <i class="fa fa-shopping-cart carrinho" style="font-size:40px" onclick="addProdutoCarrinho(${i})" ></i>
                
            </div>
        </div>
        `;
        produto.carrinho = false;
        i++;
    }
    document.getElementById("principal").innerHTML = listaProduto;
    document.getElementById("formulario").style.display = "none"; 
}

function marcarProdutosSelecionadosLocalStorage(){
    let lista = localStorage.getItem("principalLocalStorage");
    lista = JSON.parse(lista);
    for (i in lista) {
        if(lista[i].carrinho){
            addProdutoCarrinho(i);
        }
    }
}

function addProdutoCarrinho(i) {
    let produto = lsProduto[i];
    if(produto.carrinho == false){
        produto.carrinho = true;
        document.getElementsByClassName("carrinho")[i].style.color = "blue";
    }else{
        
        produto.carrinho = false;
        document.getElementsByClassName("carrinho")[i].style.color = "";
    }
    localStorage.setItem("principalLocalStorage",JSON.stringify(lsProduto));
}


let verCarrinho = false;

function verListaProdutoSelecionado() {
    if(verCarrinho){
        burcarProduto();
        verCarrinho = false;
    }else{
        verCarrinho = true;
    }
    let listaProduto = "";
    document.getElementById("principal").innerHTML = "";
    let i = 0;
    let j = 0;
    for ( produto of lsProduto) {
        if(produto.carrinho){
            produto.quantidade = 1;
            listaProduto += `
                 
            <div class="anuncio"">
                <div class="produto">
                    <img src="${produto.imagem}" alt="">
                      <p style="font-weight: bold;"> ${produto.nome}
                      <p> ${produto.descricao}
                   
                        <span class="valor" style="margin-top:60px">R$: ${produto.valor.toFixed(2)}</span>
          
                    </p>
                    <span class="btMaisMenos">
                        <span class="btMais" onclick="add(1,${i},${j})" >+</span>
                        <span class="btMenos" onclick="add(-1,${i},${j})" >-</span>
                    </span>
                    <span class="quantidade">${produto.quantidade}</span>
                </div>
                
            </div>
            `;
            i++;
        }
        j++;
    }
    document.getElementById("principal").innerHTML = listaProduto; 
    document.getElementById("formulario").style.display = "grid"; 
}

function add(qt, i, j) {
    // console.log(qt+" "+i);
    // console.log(lsProduto[j]);
    lsProduto[j].quantidade += qt;
    if(lsProduto[j].quantidade == 0){
        lsProduto[j].quantidade = 1;
        return;
    }
    document.getElementsByClassName("quantidade")[i].innerHTML = lsProduto[j].quantidade;
}

function enviarPedido() {
    let pedido = '';
    let total = 0;
    for ( produto of lsProduto) {
        if(produto.carrinho){
            let subtotal = produto.quantidade * produto.valor;
            pedido += `${produto.nome} ${produto.quantidade} x ${produto.valor} = ${subtotal}\n`;
            total += subtotal;
        }
    }
    let nome = document.getElementById('nome').value;
    let endereco = document.getElementById('endereco').value;
    let formaPagamento = document.getElementById('pagamento').value;
    let msg = `BORA BILL, gostaria de fazer o seguinte pedido:\n${pedido} \nTotal: ${total} \nNome: ${nome} \nEndereÃ§o: ${endereco} \nForma de Pagamento: ${formaPagamento}`;
    msg = encodeURI(msg);
    console.log(msg)
    let fone = '556186512311';
    link = `https://api.whatsapp.com/send?phone=${fone}&text=${msg}`;
    window.open(link,'_blank');
}

burcarProduto();
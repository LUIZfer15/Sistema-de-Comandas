//Selecionar itens do menu lateral

var menuItem = document.querySelectorAll('.item-lateral');

function selectLink(){
    menuItem.forEach((item)=>
        item.classList.remove('ativo')
    );
    this.classList.add('ativo');
}

menuItem.forEach((item)=>
    item.addEventListener('click', selectLink)
);

//Expandir menu lateral

var btnExp = document.querySelector('#btn-exp');
var menuSide = document.querySelector('.menu-lateral');

btnExp.addEventListener('click', function(){
    menuSide.classList.toggle('expandir');
})
window.addEventListener('DOMContentLoaded', () => { //когда загрузится документ исполняем функцию

const cartWrapper = document.querySelector('.cart__wrapper'),      //Получаем элемент со страницы с помощью селектора
    cart = document.querySelector('.cart'),
    close = document.querySelector('.cart__close'),
    open = document.querySelector('#cart'),
    goodsBtn = document.querySelectorAll('.goods__btn'),
    products = document.querySelectorAll('.goods__item'),
    confirm = document.querySelector('.confirm'),
    badge = document.querySelector('.nav__badge'),
    totalCost = document.querySelector('.cart__total > span'),
    titles = document.querySelectorAll('.goods__title');

function openCart() {
    cart.style.display = 'block';
    document.body.style.overflow = 'hidden';       //При открытии корзины страница не прокручивается
}

function closeCart() {
    cart.style.display = 'none';
    document.body.style.overflow = '';       //Страница прокручивается
}

open.addEventListener('click', openCart);
close.addEventListener('click', closeCart);

goodsBtn.forEach(function(btn, i) {      //перебираем все элементы(кнопки) по порядку
    btn.addEventListener('click', () => {   //навешиваем клик на все кнопки
        let item = products[i].cloneNode(true),  // Обьявляем глобальную переменую item и клонируем по порядку карточки
            trigger = item.querySelector('button'),  // Получаем кнопку из item в trigger
            removeBtn = document.createElement('div'), // Создаем блок и записываем в переменную removeBtn
            empty = cartWrapper.querySelector('.empty'); // Получаем сообщение о том что корзина пуста

        trigger.remove(); //удаляем кнопку

        removeBtn.classList.add('goods__item-remove');  //добавляем класс
        removeBtn.innerHTML = '&times'; // &times добавляет крестик
        item.appendChild(removeBtn); 

        cartWrapper.appendChild(item); //Помещаем item в cartWrapper
        if (empty) {     //если есть сообщение в empty
            empty.remove(); // удаляем empty
        }
    });
});

});



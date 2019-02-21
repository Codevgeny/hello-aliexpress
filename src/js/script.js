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

        showConfirm();  //фенкция всплывающей корзины
        calcGoods(1);

        removeBtn.classList.add('goods__item-remove');  //добавляем класс
        removeBtn.innerHTML = '&times'; // &times добавляет крестик
        item.appendChild(removeBtn); //Помещаем removeBtn в item

        cartWrapper.appendChild(item); //Помещаем item в cartWrapper
        
        //if (empty) {     //если есть сообщение в empty
            // empty.remove(); // удаляем empty
            //empty.style.display = 'none';
        //} 

        calcTotal();
        removeFromCart(); //вызываем удаление карточки после вызова крестика
    });
});

function sliceTitle() {
    titles.forEach(function(item) {
        if (item.textContent.len < 70) {    // Если кол-во символов текста < 70 оставляем как есть
            return;
        } else {
            const str = item.textContent.slice(0, 71) + '...'; 
            // const str = `${item.textContent.slice(0, 71)} ...`; 
            
            item.textContent = str;
        }
    });
}
sliceTitle ();

//Функция анимации
function showConfirm() {
    confirm.style.display = 'block';
    let counter = 100;  // let потому что переменная изменяется
    // [1223434]
    const id = setInterval(frame,10); // вызваем функцию frame кадлые 10 мс c помощью переменной id 
    function frame() {
        if (counter == 10) {
            clearInterval(id); //останавливает функцию frame по id
            confirm.style.display = 'none';
        } else {
            counter--;  // Оператор декремент (--) уменьшает кол-во счетчика counter на 1
            // Прописываем блоку confirm стиль transform, который сдвигает блок по осиY (translateY(-px)) вниз, если вверх то +
            // Переменная counter вставляется между - и px с помощью знака $ и фигурных скобок {} и определяет кол-во пикселей
            confirm.style.transform = `translateY(-${counter}px)`;
            confirm.style.opacity ='.' + counter; //назначием блоку прозрачность opacity ,значение которого тоже определяется счетчиком
            // setInterval(sliceTitle, 100) позволяет запускать скрипт каждые 100 мс
            // setTimeout(sliceTitle, 100) позволяет запускать скрипт одноразово раз в 100 мс
        }
        
    }

}

function calcGoods(i) {
    const items = cartWrapper.querySelectorAll('.goods__item'); // Получаем кол-во товаров
    badge.textContent = items.length + i; // Записываем кол-во товаров в бэйдж + 1

}

function calcTotal() {
    const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
    let total = 0;
    prices.forEach(function(item) {
        total += +item.textContent; // += заменяет total = total + ...  "+" перед item.textContent меняет строку на число
    });
    totalCost.textContent = total;
}

function removeFromCart() {
    const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
    removeBtn.forEach(function(btn) {
        btn.addEventListener('click',() => {
            btn.parentElement.remove();       //удаление родительского элемента крестика
            calcGoods(0);
            calcTotal();
        });
    });
}
console.log(calcGoods())
});



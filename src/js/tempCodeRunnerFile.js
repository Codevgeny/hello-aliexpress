function calcGoods(i) {
    const items = cartWrapper.querySelectorAll('.goods__item'); // Получаем кол-во товаров
    badge.textContent = items.length + i; // Записываем кол-во товаров в бэйдж + 1
    if (i == 0) {
        empty.style.display = 'block';   
    }
    console.log (i)

}
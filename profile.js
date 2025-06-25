// profile.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Профиль пользователя ---
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const editBtn = document.getElementById('edit-profile-btn');
    const profileForm = document.getElementById('profile-form');
    const inputName = document.getElementById('input-name');
    const inputEmail = document.getElementById('input-email');
    const logoutBtn = document.getElementById('logout-btn');

    // Загрузка профиля
    function loadProfile() {
        const user = JSON.parse(localStorage.getItem('userProfile') || '{}');
        profileName.textContent = user.name || 'Имя пользователя';
        profileEmail.textContent = 'E-mail: ' + (user.email || '—');
        inputName.value = user.name || '';
        inputEmail.value = user.email || '';
    }

    // Сохранение профиля
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = {
            name: inputName.value.trim(),
            email: inputEmail.value.trim()
        };
        localStorage.setItem('userProfile', JSON.stringify(user));
        loadProfile();
        profileForm.classList.remove('active');
    });

    // Показать/скрыть форму редактирования
    editBtn.addEventListener('click', function() {
        profileForm.classList.toggle('active');
        inputName.focus();
    });

    // Выйти (очистить профиль и историю заказов)
    logoutBtn.addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите выйти? Все данные будут удалены.')) {
            localStorage.removeItem('userProfile');
            localStorage.removeItem('orderHistory');
            loadProfile();
            renderOrders();
        }
    });

    loadProfile();

    // --- История заказов ---
    const ordersBody = document.getElementById('orders-body');

    function renderOrders() {
        const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        ordersBody.innerHTML = '';
        if (!orders.length) {
            ordersBody.innerHTML = '<tr class="no-orders"><td colspan="3">Заказов пока нет</td></tr>';
            return;
        }
        orders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${order.date}</td>
                <td>${order.items.map(item => `${item.name} (${item.quantity} шт.)`).join('<br>')}</td>
                <td>${order.total}</td>
            `;
            ordersBody.appendChild(tr);
        });
    }

    renderOrders();
}); 
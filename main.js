/* --- SHARK SELECTIONS JS --- */

// [1] غرفة التحكم: غير الصور والأسماء هنا بس يا محمود
const sharkProducts = [
    { name: "زلط أبيض ملكي", img: "white-stone.jpg", link: "white-stone.html" },
    { name: "زلط أسود بازلت", img: "black-stone.jpg", link: "black-stone.html" },
    { name: "زلط أحمر بركاني", img: "red-stone.jpg", link: "red-stone.html" },
    { name: "زلط ميكس طبيعي", img: "mix-stone.jpg", link: "mix-stone.html" },
    { name: "رخام جلالة", img: "galala.jpg", link: "galala.html" },
    { name: "ميكا حمراء", img: "red-mica.jpg", link: "red-mica.html" }
];

// [2] بناء العمود الجانبي برمجياً
function initSharkSelections() {
    // إنشاء العمود
    const sidebar = document.createElement('div');
    sidebar.className = 'shark-sidebar';
    sidebar.innerHTML = `<h3 style="color:#d4af37; text-align:center; font-size:16px;">SHARK SELECTIONS</h3><hr style="border-color:#333">`;

    // إضافة المنتجات من غرفة التحكم
    sharkProducts.forEach(prod => {
        const item = document.createElement('div');
        item.className = 'shark-item';
        item.innerHTML = `
            <a href="${prod.link}" style="text-decoration:none;">
                <img src="${prod.img}" alt="${prod.name}">
                <p>${prod.name}</p>
            </a>
        `;
        sidebar.appendChild(item);
    });

    document.body.appendChild(sidebar);

    // [3] تايمر الـ 10 ثواني للظهور
    setTimeout(() => {
        sidebar.classList.add('visible');
    }, 10000);

    // [4] فتح وقفل العمود عند اللمس
    sidebar.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // [5] إضافة زر المود الليلي
    const nightBtn = document.createElement('div');
    nightBtn.className = 'night-mode-toggle';
    nightBtn.innerHTML = '🌙';
    document.body.appendChild(nightBtn);

    nightBtn.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        nightBtn.innerHTML = document.body.classList.contains('night-mode') ? '☀️' : '🌙';
    });
}

// تشغيل السيستم أول ما الصفحة تفتح
window.onload = initSharkSelections;

/* =========================================
   Habib Store - Main Core Logic (v3.0)
   ========================================= */

// 1. مصفوفة ترشيحات "حبيب ستور" للنخبة (تظهر فوق الواتساب)
const eliteSelections = [
    {
        title: "Habib White Zalat",
        img: "assets/images/zalat/white-zalat.jpg",
        link: "products/zalat.html?id=white-zalat"
    },
    {
        title: "Istanbul Lush 40mm",
        img: "assets/images/nageel-details/Habib-Istanbul-Lush-40mm.jpg",
        link: "products/product.html?id=40-12"
    },
    {
        title: "Crystal White Marble",
        img: "assets/images/marble/marble-crystal-white.jpg",
        link: "products/stones.html?id=41"
    }
];

// 2. تحديث عدّاد السلة في الهيدر
function updateGlobalCartCount() {
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        cartBadge.textContent = totalItems;
        
        // تأثير نبض خفيف لو السلة فيها حاجات
        if(totalItems > 0) {
            cartBadge.style.transform = "scale(1.2)";
            setTimeout(() => cartBadge.style.transform = "scale(1)", 200);
        }
    }
}

// 3. إنشاء الأيقونات الطايرة فوق الواتساب (Elite Icons)
function initFloatingIcons() {
    // نأكد إننا مش بنكررهم لو الملف استدعي مرتين
    if (document.getElementById('habibFloatingIcons')) return;

    const container = document.createElement('div');
    container.id = 'habibFloatingIcons';

    // ستايل الأيقونات الطايرة (رأسياً فوق الواتساب)
    const style = document.createElement('style');
    style.innerHTML = `
        #habibFloatingIcons {
            position: fixed;
            bottom: 120px; 
            right: 25px; 
            display: flex;
            flex-direction: column;
            gap: 15px;
            z-index: 1500;
            opacity: 0;
            transform: translateY(30px);
            transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            pointer-events: none;
        }
        #habibFloatingIcons.active {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }
        .floating-icon {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            transition: 0.3s;
        }
        .floating-icon:hover { transform: translateX(-5px); }
        .floating-icon img {
            width: 52px; height: 52px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #c5a059;
            box-shadow: 0 5px 15px rgba(0,0,0,0.15);
            background: #fff;
        }
        .floating-icon span {
            background: rgba(255, 255, 255, 0.95);
            color: #1a3c34;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.75rem;
            font-weight: 700;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            opacity: 0;
            transform: translateX(10px);
            transition: 0.3s;
            white-space: nowrap;
        }
        .floating-icon:hover span { opacity: 1; transform: translateX(0); }
        @media (max-width: 768px) {
            #habibFloatingIcons { bottom: 100px; right: 20px; }
            .floating-icon img { width: 45px; height: 45px; }
            .floating-icon span { display: none; }
        }
    `;
    document.head.appendChild(style);

    let content = '';
    eliteSelections.forEach(item => {
        // استخدام المسار النسبي عشان يشتغل معاك في السيرفر المحلي والـ GitHub
        const baseUrl = "https://elhbebclean.github.io/habib-store/";
        const fullImg = baseUrl + item.img;
        const fullLink = baseUrl + item.link;

        content += `
            <a href="${fullLink}" class="floating-icon">
                <img src="${fullImg}" alt="${item.title}">
                <span>${item.title}</span>
            </a>
        `;
    });

    container.innerHTML = content;
    document.body.appendChild(container);

    // ظهور وقور للأيقونات وللشريط الزجاجي (لو موجود في الصفحة)
    setTimeout(() => {
        container.classList.add('active');
        
        // تشغيل شريط النخبة الزجاجي اللي في النص لو موجود
        const eliteBar = document.getElementById('eliteGlassBar');
        if(eliteBar) eliteBar.classList.add('active');
    }, 5000);
}

// 4. تشغيل كل الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    updateGlobalCartCount();
    initFloatingIcons();
    
    // مراقبة الـ localStorage عشان لو السلة اتحدثت في تابة تانية
    window.addEventListener('storage', updateGlobalCartCount);
});

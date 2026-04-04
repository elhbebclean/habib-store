// مصفوفة ترشيحات "حبيب ستور" للنخبة
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

function initFloatingIcons() {
    const container = document.createElement('div');
    container.id = 'habibFloatingIcons';

    // ستايل الأيقونات الطايرة (رأسياً فوق الواتساب)
    const style = document.createElement('style');
    style.innerHTML = `
        #habibFloatingIcons {
            position: fixed;
            bottom: 110px; /* مرفوع فوق زرار الواتساب بمسافة أمان */
            right: 25px; /* نفس محاذاة الواتساب */
            display: flex;
            flex-direction: column; /* الترتيب رأسي فوق بعض */
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
            flex-direction: row-reverse; /* الصورة يمين والنص شمالها */
            align-items: center;
            gap: 12px;
            text-decoration: none;
            transition: 0.3s;
        }
        .floating-icon:hover {
            transform: translateX(-5px);
        }
        .floating-icon img {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--gold, #c5a059);
            box-shadow: 0 5px 15px rgba(0,0,0,0.15);
            background: #fff;
        }
        .floating-icon span {
            background: rgba(255, 255, 255, 0.95);
            color: var(--royal-green, #1a3c34);
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.75rem;
            font-weight: 700;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            opacity: 0; /* النص مخفي وبيظهر بس لما العميل يلمس الصورة */
            transform: translateX(10px);
            transition: 0.3s;
        }
        .floating-icon:hover span {
            opacity: 1;
            transform: translateX(0);
        }
        /* تظبيط الموبايل عشان الزحمة */
        @media (max-width: 768px) {
            #habibFloatingIcons {
                bottom: 90px;
                right: 20px;
            }
            .floating-icon img {
                width: 48px;
                height: 48px;
            }
            .floating-icon span {
                display: none; /* إخفاء النص في الموبايل والاعتماد على الصور الدائرية فقط */
            }
        }
    `;
    document.head.appendChild(style);

    // بناء محتوى الأيقونات باستخدام مساراتك الكاملة
    let content = '';
    eliteSelections.forEach(item => {
        const fullImg = "https://elhbebclean.github.io/habib-store/" + item.img;
        const fullLink = "https://elhbebclean.github.io/habib-store/" + item.link;

        content += `
            <a href="${fullLink}" class="floating-icon">
                <img src="${fullImg}" alt="${item.title}">
                <span>${item.title}</span>
            </a>
        `;
    });

    container.innerHTML = content;
    document.body.appendChild(container);

    // ظهور وقور بتأثير الفايد بعد 5 ثوانٍ
    setTimeout(() => {
        container.classList.add('active');
    }, 5000);
}

// التشغيل عند جاهزية الصفحة
document.addEventListener('DOMContentLoaded', initFloatingIcons);

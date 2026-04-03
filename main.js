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

function initEliteGlassBar() {
    const bar = document.createElement('div');
    bar.id = 'eliteGlassBar';

    // بناء محتوى الشريط الزجاجي
    let content = `
        <div class="glass-header">
            <h3>SHARK SELECTIONS</h3>
            <span>Elite Edition</span>
        </div>
        <div class="glass-items">
    `;

    eliteSelections.forEach(item => {
        // نستخدم المسار الكامل لضمان ظهور الصور في كل الصفحات
        const fullImg = "https://elhbebclean.github.io/habib-store/" + item.img;
        const fullLink = "https://elhbebclean.github.io/habib-store/" + item.link;

        content += `
            <a href="${fullLink}" class="glass-card">
                <img src="${fullImg}" alt="${item.title}">
                <span>${item.title}</span>
            </a>
        `;
    });

    content += `</div>`;
    bar.innerHTML = content;
    document.body.appendChild(bar);

    // ظهور وقور بتأثير الفايد بعد 10 ثوانٍ
    setTimeout(() => {
        bar.classList.add('active');
    }, 10000);
}

// التشغيل عند جاهزية الصفحة
document.addEventListener('DOMContentLoaded', initEliteGlassBar);

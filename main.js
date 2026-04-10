/* =========================================
   Habib Store | Premium Selection
   Main Core Logic - v3.6 (Professional Edition + VIP Cloudinary)
   ========================================= */

// 1. تحديث عدّاد المقايسة (السلة)
function updateGlobalCartCount() {
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        cartBadge.textContent = totalItems;
        
        // تأثير نبض خفيف عند التحديث
        cartBadge.style.transform = "scale(1.3)";
        setTimeout(() => cartBadge.style.transform = "scale(1)", 300);
    }
}

// 2. إظهار شريط التنقل الذكي (Smart Glass Bar)
function handleEliteBarAppearance() {
    setTimeout(() => {
        const eliteBar = document.getElementById('smartGlassSlider') || document.getElementById('eliteGlassBar');
        if (eliteBar) {
            eliteBar.classList.add('visible');
            eliteBar.classList.add('active');
        }
    }, 4000); 
}

// 3. التشغيل الأساسي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    updateGlobalCartCount();
    handleEliteBarAppearance();
    window.addEventListener('storage', updateGlobalCartCount);
});

/* =========================================
   🔥 محرك المبيعات والكتالوج الذكي
   ========================================= */

// 4. الإضافة السريعة للمقايسة (مع دعم الصور)
function quickAddToCart(productId, productName, category = 'general') {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // محاولة تخمين مسار الصورة بناءً على الفئة
    let imgPath = `assets/images/${category}/${productId}.jpg`; 
    if (category === 'zalat') imgPath = `assets/images/zalat/${productId}.jpg`;

    let existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            id: productId, 
            title: productName, 
            img: imgPath,
            category: category,
            quantity: 1 
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateGlobalCartCount();
    
    // تنبيه احترافي للعميل
    console.log(`✅ تم إضافة ${productName} لقائمة المقايسة`);
}

// 5. محرك الكتالوج (سابقة الأعمال VIP السحابية)
let catalogImages = [];
let currentImageIndex = 0;
let currentCategoryName = '';

// قاعدة بيانات Cloudinary المركزية لجميع أقسام البوتيك بالأوصاف
const portfolioData = {
    'nageel': {
        nameAr: 'النجيل الصناعي',
        media: [
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828245/Habib_Emerald_fzsejd.jpg", desc: "نجيل حبيب الزمرد (Emerald) - فخامة ملكية ولمسة حريرية" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828246/nageel-11mm_c4lq7h.jpg", desc: "النجيل الصناعي 11 ملم (Contract Pro) - قوة تحمل فائقة للممرات" },
            { url: "https://res.cloudinary.com/dwa0e5sup/video/upload/q_auto/f_auto/v1775693479/habib-boutique-real-projects_mebxrx.mp4", desc: "نظرة عامة على مشاريع Habib Boutique الحقيقية" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775822184/Habib_Bosphorus_Green_50mm_vp0f4p.jpg", desc: "قصر البوسفور بنجيل 50 ملم - كثافة وعزل ممتاز" },
            { url: "https://res.cloudinary.com/dwa0e5sup/video/upload/q_auto/f_auto/v1775693494/premium-artificial-grass-shimmer_yvcktl.mp4", desc: "استمتع بلمعان النجيل الفاخر (Premium Shimmer)" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828246/Pure_Meadow_fsfkqc.jpg", desc: "مروج Pure Meadow - تداخل طبيعي ساحر" },
            { url: "https://res.cloudinary.com/dwa0e5sup/video/upload/q_auto/f_auto/v1775686076/videoplayback_4_v5j6ev.mp4", desc: "استعراض سينمائي لجودة ومرونة النجيل الصناعي" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828245/Estimasi_Pembuatan_Lapangan_Mini_Soccer_2022_ac4xcw.jpg", desc: "تجهيز ملاعب ميني سوكر (Mini Soccer) باحترافية" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828245/EverGreen_Pro_p71o91.jpg", desc: "إيفر جرين برو (EverGreen Pro) - ديمومة وجمال مستمر" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828245/%D8%AA%D8%B5%D9%85%D9%8A%D9%85_%D9%88%D8%AA%D9%86%D9%81%D9%8A%D8%B0_%D8%AD%D8%AF%D8%A7%D8%A6%D9%82_%D9%85%D9%86%D8%B2%D9%84%D9%8A%D9%87_yeopv0.jpg", desc: "تصميم وتنفيذ حدائق منزلية بمستوى القصور" }
        ]
    },
    'marble': {
        nameAr: 'الرخام والميكا',
        media: [
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828656/marble-sandstone_x2lwm2.jpg", desc: "أناقة الساند ستون (Marble Sandstone) - لمسة كلاسيكية" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828657/stone-mica-grey_ydczzj.jpg", desc: "سحر الميكا الرمادي (Mica Grey) - وقار وعصرية" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828657/marble-spanish-black_qotril.jpg", desc: "الأسود الإسباني (Spanish Black) - ملك الأناقة" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828655/marble-galala_bfrlgm.jpg", desc: "رخام الجلالة (Galala) - أصالة مصرية بمقاييس عالمية" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828656/marble-emperador_mjteik.jpg", desc: "إمبرادور (Emperador) - فخامة بنية عميقة" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828654/marble-crystal-white_pgwl6u.jpg", desc: "كريستال وايت (Crystal White) - قمة النقاء" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828656/marble-milli-brown_gm9oah.jpg", desc: "ميلي براون (Milli Brown) - روح دافئة وترابية" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828657/marble-red-carrara-spanish-black_yssppd.jpg", desc: "دمج الكاريرا الأحمر مع الأسود الإسباني - جرأة وتميز" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828655/marble-carrara-milli-brown0_h8uli6.jpg", desc: "توازن راقي بين الكاريرا والميلي براون" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828653/marble-carrara-milli-brown_jil1x2.jpg", desc: "تصميم هندسي متكامل بالرخام الطبيعي" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828652/m5_zfxydn.jpg", desc: "جداريات رخامية بتصميم VIP (نموذج M5)" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828646/m4_ayob4d.jpg", desc: "تشكيل حجري فاخر للواجهات (نموذج M4)" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828646/m3_i7gt04.jpg", desc: "تداخل فني بين الرخام والمحيط (نموذج M3)" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828645/m1_zoyqwm.jpg", desc: "قوة وجمال الرخام في أبسط أشكاله (نموذج M1)" }
        ]
    },
    'zalat': {
        nameAr: 'الزلط والأحجار',
        media: [
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828577/zalat-mix-colors__visent.jpg", desc: "الزلط الملون - يضفي حيوية وروح للاندسكيب" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828696/z2_ixj65v.jpg", desc: "تنسيق ممرات الزلط بتصميمات هندسية راقية" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828713/z3_vbfoc3.jpg", desc: "دمج الزلط مع المساحات الخضراء للحدائق" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828713/z5_tkiavv.jpg", desc: "تشكيلات حجرية وزلط أبيض لمداخل الفلل" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828246/Pure_Meadow_fsfkqc.jpg", desc: "مروج Pure Meadow مع لمسات الزلط" },
            { url: "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828245/%D8%AA%D8%B5%D9%85%D9%8A%D9%85_%D9%88%D8%AA%D9%86%D9%81%D9%8A%D8%B0_%D8%AD%D8%AF%D8%A7%D8%A6%D9%82_%D9%85%D9%86%D8%B2%D9%84%D9%8A%D9%87_yeopv0.jpg", desc: "تصميم وتنفيذ متكامل شامل الأحجار الديكورية" }
        ]
    }
};

function openCatalog(category) {
    const data = portfolioData[category];
    if (!data) return;

    currentCategoryName = data.nameAr;
    catalogImages = data.media; // مصفوفة الكائنات {url, desc}
    currentImageIndex = 0;
    
    const lightbox = document.getElementById('catalogLightbox') || document.getElementById('zalatLightbox');
    if (!lightbox) return;
    
    lightbox.style.display = 'flex'; // إظهار النافذة فوراً
    lightbox.classList.add('active');
    
    updateCatalogView();
}

function updateCatalogView() {
    const mainImg = document.getElementById('catalogMainImage') || document.getElementById('zalatMainImage');
    const descElement = document.getElementById('catalogDescription');
    
    if (!mainImg || catalogImages.length === 0) return;

    const currentMedia = catalogImages[currentImageIndex];
    const mediaUrl = currentMedia.url;
    const mediaDesc = currentMedia.desc;
    
    const isVideo = mediaUrl.includes('.mp4') || mediaUrl.includes('/video/');
    const parent = mainImg.parentElement;

    // تحديث الوصف إذا كان العنصر موجوداً
    if (descElement) {
        descElement.innerText = mediaDesc;
        descElement.style.display = mediaDesc ? 'block' : 'none';
    }

    // تنظيف أي فيديو معروض سابقاً
    const existingVideo = document.getElementById('catalogMainVideo');
    if (existingVideo) existingVideo.remove();

    if (isVideo) {
        mainImg.style.display = 'none';
        const videoEl = document.createElement('video');
        videoEl.id = 'catalogMainVideo';
        videoEl.src = mediaUrl;
        videoEl.autoplay = true;
        videoEl.loop = true;
        videoEl.muted = true;
        videoEl.controls = true;
        videoEl.style.width = '100%';
        videoEl.style.maxHeight = '80vh';
        videoEl.style.objectFit = 'contain';
        videoEl.style.borderRadius = '12px';
        parent.insertBefore(videoEl, mainImg);
    } else {
        mainImg.style.display = 'block';
        mainImg.src = mediaUrl;
    }
}

function nextCatalogImage() {
    if (catalogImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % catalogImages.length;
    updateCatalogView();
}

function prevCatalogImage() {
    if (catalogImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + catalogImages.length) % catalogImages.length;
    updateCatalogView();
}

function closeCatalog(event) {
    const lightbox = document.getElementById('catalogLightbox') || document.getElementById('zalatLightbox');
    if (!event || event.target === lightbox || event.target.classList.contains('close-btn')) {
        if (lightbox) {
            lightbox.classList.remove('active');
            lightbox.style.display = 'none';
            // إيقاف الفيديو عند الإغلاق
            const existingVideo = document.getElementById('catalogMainVideo');
            if (existingVideo) existingVideo.remove();
        }
    }
}

// 6. طلب تنفيذ تصميم محدد من سابقة الأعمال عبر واتساب
function orderCurrentDesign() {
    if (catalogImages.length === 0) return;
    const mediaUrl = catalogImages[currentImageIndex].url;
    const imageName = mediaUrl.split('/').pop().split('.')[0]; 
    
    const message = `*طلب تنفيذ تصميم محدد - Habib Store* 🦈\n--------------------------------\nمرحباً محمود، أعجبني هذا التصميم من سابقة أعمال ${currentCategoryName}.\n(كود الصورة: ${imageName})\n\nأريد الاستفسار عن تفاصيل تنفيذه ومقايسته.`;
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/201145393026?text=${encodedMessage}`, '_blank');
}

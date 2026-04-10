/* =========================================
   Habib Store | Premium Selection
   Main Core Logic - v4.0 (VIP Cloudinary Edition)
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
   🔥 محرك المبيعات
   ========================================= */

// 4. الإضافة السريعة للمقايسة
function quickAddToCart(productId, productName, category = 'general') {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // صورة افتراضية للمقايسة السريعة (يمكن تحديثها لاحقاً لروابط كلاوديناري)
    let imgPath = `assets/images/${category}/${productId}.jpg`; 

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
    
    console.log(`✅ تم إضافة ${productName} لقائمة المقايسة`);
}

/* =========================================
   💎 الكتالوج الذكي (سابقة الأعمال VIP)
   ========================================= */

let catalogImages = [];
let currentImageIndex = 0;
let currentCategoryName = '';

// قاعدة بيانات Cloudinary المركزية لجميع أقسام البوتيك
const portfolioData = {
    'nageel': {
        nameAr: 'النجيل الصناعي',
        media: [
            "https://res.cloudinary.com/dwa0e5sup/video/upload/q_auto/f_auto/v1775693479/habib-boutique-real-projects_mebxrx.mp4",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775822184/Habib_Bosphorus_Green_50mm_vp0f4p.jpg",
            "https://res.cloudinary.com/dwa0e5sup/video/upload/q_auto/f_auto/v1775693494/premium-artificial-grass-shimmer_yvcktl.mp4",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828246/Pure_Meadow_fsfkqc.jpg",
            "https://res.cloudinary.com/dwa0e5sup/video/upload/q_auto/f_auto/v1775686076/videoplayback_4_v5j6ev.mp4",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828245/Estimasi_Pembuatan_Lapangan_Mini_Soccer_2022_ac4xcw.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828245/EverGreen_Pro_p71o91.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828245/%D8%AA%D8%B5%D9%85%D9%8A%D9%85_%D9%88%D8%AA%D9%86%D9%81%D9%8A%D8%B0_%D8%AD%D8%AF%D8%A7%D8%A6%D9%82_%D9%85%D9%86%D8%B2%D9%84%D9%8A%D9%87_yeopv0.jpg"
        ]
    },
    'marble': {
        nameAr: 'الرخام والميكا',
        media: [
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828656/marble-sandstone_x2lwm2.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828657/stone-mica-grey_ydczzj.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828657/marble-spanish-black_qotril.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828655/marble-galala_bfrlgm.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828656/marble-emperador_mjteik.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828654/marble-crystal-white_pgwl6u.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828656/marble-milli-brown_gm9oah.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828657/marble-red-carrara-spanish-black_yssppd.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828655/marble-carrara-milli-brown0_h8uli6.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828653/marble-carrara-milli-brown_jil1x2.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828652/m5_zfxydn.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828646/m4_ayob4d.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828646/m3_i7gt04.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828645/m1_zoyqwm.jpg"
        ]
    },
    'zalat': {
        nameAr: 'الزلط والأحجار الديكورية',
        media: [
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828577/zalat-mix-colors__visent.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828696/z2_ixj65v.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828713/z3_vbfoc3.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828713/z5_tkiavv.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828246/Pure_Meadow_fsfkqc.jpg",
            "https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775828245/%D8%AA%D8%B5%D9%85%D9%8A%D9%85_%D9%88%D8%AA%D9%86%D9%81%D9%8A%D8%B0_%D8%AD%D8%AF%D8%A7%D8%A6%D9%82_%D9%85%D9%86%D8%B2%D9%84%D9%8A%D9%87_yeopv0.jpg"
        ]
    }
};

// 5. فتح الكتالوج الذكي (بدون الحاجة لفحص وجود الصور لأنها مرفوعة ومؤكدة)
function openCatalog(category) {
    const data = portfolioData[category];
    if (!data || data.media.length === 0) return;

    currentCategoryName = data.nameAr;
    catalogImages = data.media;
    currentImageIndex = 0;
    
    const lightbox = document.getElementById('catalogLightbox') || document.getElementById('zalatLightbox');
    if (!lightbox) return;
    
    lightbox.style.display = 'flex'; 
    lightbox.classList.add('active');
    
    updateCatalogView();
}

// التحديث الذكي لعرض الصور أو الفيديوهات
function updateCatalogView() {
    const mainImg = document.getElementById('catalogMainImage') || document.getElementById('zalatMainImage');
    if (!mainImg || catalogImages.length === 0) return;

    const currentMedia = catalogImages[currentImageIndex];
    const isVideo = currentMedia.includes('.mp4') || currentMedia.includes('/video/');
    const parent = mainImg.parentElement;

    // تنظيف أي فيديو قديم معروض
    const existingVideo = document.getElementById('catalogMainVideo');
    if (existingVideo) existingVideo.remove();

    if (isVideo) {
        // إخفاء الصورة وعرض مشغل الفيديو
        mainImg.style.display = 'none';
        const videoEl = document.createElement('video');
        videoEl.id = 'catalogMainVideo';
        videoEl.src = currentMedia;
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
        // عرض الصورة العادية
        mainImg.style.display = 'block';
        mainImg.src = currentMedia;
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
    // إغلاق المعرض إذا تم النقر خارج الصورة أو على زر الإغلاق
    if (!event || event.target === lightbox || event.target.classList.contains('close-btn')) {
        if (lightbox) {
            lightbox.classList.remove('active');
            lightbox.style.display = 'none';
            // إيقاف أي فيديو شغال عند الإغلاق
            const existingVideo = document.getElementById('catalogMainVideo');
            if (existingVideo) existingVideo.remove();
        }
    }
}

// 6. طلب تنفيذ تصميم محدد من سابقة الأعمال عبر واتساب
function orderCurrentDesign() {
    if (catalogImages.length === 0) return;
    const currentImagePath = catalogImages[currentImageIndex];
    // استخراج اسم أو كود الملف من الرابط
    const imageName = currentImagePath.split('/').pop().split('.')[0]; 
    
    const message = `*طلب تنفيذ تصميم محدد - Habib Store* 🦈\n--------------------------------\nمرحباً، أعجبني هذا التصميم من سابقة أعمال ${currentCategoryName}.\n(كود المرجع: ${imageName})\n\nأريد الاستفسار عن تفاصيل تنفيذه ومقايسته.`;
    const encodedMessage = encodeURIComponent(message);
    
    // توجيه العميل للرقم المعتمد للمقايسات 
    window.open(`https://wa.me/201145393026?text=${encodedMessage}`, '_blank');
}

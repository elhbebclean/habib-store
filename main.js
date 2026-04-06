/* =========================================
   Habib Store | Premium Selection
   Main Core Logic - v3.5 (Professional Edition)
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

// 5. محرك الكتالوج (سابقة الأعمال) - نسخة تصحيح المسارات
let catalogImages = [];
let currentImageIndex = 0;
let currentCategoryName = '';

const portfolioSettings = {
    'nageel': { prefix: 'n', ext: 'jpg', nameAr: 'النجيل الصناعي' },
    'marble': { prefix: 'm', ext: 'jpeg', nameAr: 'الرخام الطبيعي' },
    'zalat': { prefix: 'z', ext: 'jpeg', nameAr: 'الزلط والأحجار' }
};

// التأكد من وجود الصورة قبل عرضها
function checkImageExists(url) {
    return new Promise(resolve => {
        let img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// تحديد المسار الصحيح (لو في products يرجع خطوة ويدخل assets)
function getBasePath() {
    return window.location.pathname.includes('/products/') ? '../' : './';
}

async function openCatalog(category) {
    const settings = portfolioSettings[category];
    if (!settings) return;

    currentCategoryName = settings.nameAr;
    catalogImages = [];
    
    const lightbox = document.getElementById('catalogLightbox') || document.getElementById('zalatLightbox');
    if (!lightbox) return;
    
    lightbox.style.display = 'flex'; // إظهار النافذة فوراً
    lightbox.classList.add('active');
    
    const basePath = getBasePath();
    
    // تحميل أول 10 صور محتملة (z1, z2, z3...)
    for (let i = 1; i <= 10; i++) {
        let imgUrl = `${basePath}assets/images/portfolio/${settings.prefix}${i}.${settings.ext}`;
        let exists = await checkImageExists(imgUrl);
        
        if (exists) {
            catalogImages.push(imgUrl);
            if (catalogImages.length === 1) {
                currentImageIndex = 0;
                updateCatalogView();
            }
        } else {
            if (i > 1) break; // لو مفيش غير صورة واحدة أو خلصنا الصور
        }
    }
}

function updateCatalogView() {
    const mainImg = document.getElementById('catalogMainImage') || document.getElementById('zalatMainImage');
    if (mainImg && catalogImages.length > 0) {
        mainImg.src = catalogImages[currentImageIndex];
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
        }
    }
}

// 6. طلب تنفيذ تصميم محدد من سابقة الأعمال عبر واتساب
function orderCurrentDesign() {
    if (catalogImages.length === 0) return;
    const currentImagePath = catalogImages[currentImageIndex];
    const imageName = currentImagePath.split('/').pop(); 
    
    const message = `*طلب تنفيذ تصميم محدد - Habib Store* 🦈\n--------------------------------\nمرحباً محمود، أعجبني هذا التصميم من سابقة أعمال ${currentCategoryName}.\n(كود الصورة: ${imageName})\n\nأريد الاستفسار عن تفاصيل تنفيذه ومقايسته.`;
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/201016961497?text=${encodedMessage}`, '_blank');
}

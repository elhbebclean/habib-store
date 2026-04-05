/* =========================================
   Habib Store | Premium Selection
   Main Core Logic - v3.2 (Clean Elite Version)
   ========================================= */

// 1. تحديث عدّاد السلة في كل صفحات الموقع
function updateGlobalCartCount() {
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
        // بنقرأ من السلة الموحدة باسم 'cart'
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        cartBadge.textContent = totalItems;
        
        // تأثير نبض خفيف عند التحديث
        cartBadge.style.transform = "scale(1.2)";
        setTimeout(() => cartBadge.style.transform = "scale(1)", 200);
    }
}

// 2. وظيفة إظهار "شريط النخبة الزجاجي" (الموجود في منتصف الشاشة أسفل)
function handleEliteBarAppearance() {
    setTimeout(() => {
        const eliteBar = document.getElementById('eliteGlassBar');
        if (eliteBar) {
            // إضافة كلاس active اللي إحنا مبرمجينه في الـ CSS عشان يرفع الشريط
            eliteBar.classList.add('active');
        }
    }, 5000); // يظهر بعد 5 ثواني من فتح الصفحة
}

// 3. تشغيل المحركات الأساسية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // تشغيل العداد
    updateGlobalCartCount();
    
    // تشغيل حركة الشريط الزجاجي
    handleEliteBarAppearance();
    
    // مراقبة التغييرات في السلة (لو الزبون فاتح أكتر من تابة)
    window.addEventListener('storage', updateGlobalCartCount);
});

// ملاحظة لـ "أبو حبيب": تم حذف الأيقونات الطايرة فوق الواتساب بناءً على طلبك لضمان تجربة مستخدم Elite.

/* =========================================
   🔥 الإضافات الجديدة (منظومة المبيعات والكتالوج)
   ========================================= */

// 4. الإضافة السريعة للسلة (من كروت المعرض مباشرة)
function quickAddToCart(productId, productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // التحقق إذا كان المنتج موجود نزود الكمية
    let existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // السعر هنا هيكون "مرن" زي ما اتفقنا
        cart.push({ id: productId, name: productName, price: "يحدد بدقة عند المعاينة", quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateGlobalCartCount();
    
    // رسالة نجاح سريعة وشيك
    alert(`تم إضافة "${productName}" إلى السلة بنجاح 🛒`);
}

// 5. محرك الكتالوج الذكي (Lightbox Slider)
let catalogImages = [];
let currentImageIndex = 0;
let currentCategoryName = '';

// بيانات الفولدرات والصيغ زي ما رفعناها على جيت هب بالظبط
const portfolioSettings = {
    'nageel': { prefix: 'n', count: 8, ext: 'jpg', nameAr: 'النجيل' },
    'marble': { prefix: 'm', count: 5, ext: 'jpeg', nameAr: 'الرخام' },
    'zalat': { prefix: 'z', count: 5, ext: 'jpeg', nameAr: 'الزلط' }
};

function openCatalog(category) {
    const settings = portfolioSettings[category];
    if (!settings) return;

    currentCategoryName = settings.nameAr;
    catalogImages = [];
    
    // تجهيز مسارات الصور أوتوماتيك (كسول: مش هتحمل غير لما تتفتح)
    for (let i = 1; i <= settings.count; i++) {
        catalogImages.push(`../assets/images/portfolio/${category}/${settings.prefix}${i}.${settings.ext}`);
    }

    currentImageIndex = 0;
    updateCatalogView();
    
    // إظهار النافذة المنبثقة
    document.getElementById('catalogLightbox').classList.add('active');
}

function updateCatalogView() {
    const mainImg = document.getElementById('catalogMainImage');
    if (mainImg && catalogImages.length > 0) {
        mainImg.src = catalogImages[currentImageIndex];
    }
}

function nextCatalogImage() {
    currentImageIndex = (currentImageIndex + 1) % catalogImages.length;
    updateCatalogView();
}

function prevCatalogImage() {
    currentImageIndex = (currentImageIndex - 1 + catalogImages.length) % catalogImages.length;
    updateCatalogView();
}

function closeCatalog(event) {
    // يقفل لو داس على علامة (X) أو داس في أي حتة بره الصورة
    if (!event || event.target.id === 'catalogLightbox' || event.target.classList.contains('close-btn')) {
        document.getElementById('catalogLightbox').classList.remove('active');
    }
}

// 6. زر الواتساب الذكي للكتالوج (مع حل مشكلة التشفير العربي)
function orderCurrentDesign() {
    const currentImagePath = catalogImages[currentImageIndex];
    // استخراج اسم الصورة (مثال: n3.jpg)
    const imageName = currentImagePath.split('/').pop(); 
    
    // رسالة الواتساب وتشفيرها (encodeURIComponent) عشان العربي يوصل سليم وميضربش
    const message = `مرحباً، أريد تنفيذ هذا التصميم من سابقة أعمال ${currentCategoryName}.\n(كود الصورة: ${imageName})`;
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/201016961497?text=${encodedMessage}`, '_blank');
}

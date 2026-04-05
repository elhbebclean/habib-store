/* =========================================
   Habib Store | Premium Selection
   Main Core Logic - v3.4 (Smart Paths Edition)
   ========================================= */

// 1. تحديث عدّاد السلة
function updateGlobalCartCount() {
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        cartBadge.textContent = totalItems;
        
        cartBadge.style.transform = "scale(1.2)";
        setTimeout(() => cartBadge.style.transform = "scale(1)", 200);
    }
}

// 2. إظهار "شريط النخبة"
function handleEliteBarAppearance() {
    setTimeout(() => {
        const eliteBar = document.getElementById('eliteGlassBar');
        if (eliteBar) {
            eliteBar.classList.add('active');
        }
    }, 5000); 
}

// 3. التشغيل الأساسي
document.addEventListener('DOMContentLoaded', () => {
    updateGlobalCartCount();
    handleEliteBarAppearance();
    window.addEventListener('storage', updateGlobalCartCount);
});

/* =========================================
   🔥 الإضافات الجديدة (المبيعات والكتالوج الذكي)
   ========================================= */

// 4. الإضافة السريعة للسلة
function quickAddToCart(productId, productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: "يحدد بدقة عند المعاينة", quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateGlobalCartCount();
    alert(`تم إضافة "${productName}" إلى السلة بنجاح 🛒`);
}

// 5. محرك الكتالوج الذكي (نسخة تصحيح المسارات)
let catalogImages = [];
let currentImageIndex = 0;
let currentCategoryName = '';

const portfolioSettings = {
    'nageel': { prefix: 'n', ext: 'jpg', nameAr: 'النجيل' },
    'marble': { prefix: 'm', ext: 'jpeg', nameAr: 'الرخام' },
    'zalat': { prefix: 'z', ext: 'jpeg', nameAr: 'الزلط' }
};

function checkImageExists(url) {
    return new Promise(resolve => {
        let img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// الدالة دي بتعرف إحنا في الصفحة الرئيسية ولا في فولدر products وتظبط المسار لوحدها
function getBasePath() {
    return window.location.pathname.includes('/products/') ? '../' : './';
}

async function openCatalog(category) {
    const settings = portfolioSettings[category];
    if (!settings) return;

    currentCategoryName = settings.nameAr;
    catalogImages = [];
    
    const lightbox = document.getElementById('catalogLightbox');
    lightbox.classList.add('active');
    
    const basePath = getBasePath(); // استخدام المسار الذكي
    
    let i = 1;
    while (true) {
        let imgUrl = `${basePath}assets/images/portfolio/${settings.prefix}${i}.${settings.ext}`;
        let exists = await checkImageExists(imgUrl);
        
        if (exists) {
            catalogImages.push(imgUrl);
            if (i === 1) {
                currentImageIndex = 0;
                updateCatalogView();
            }
            i++;
        } else {
            break; 
        }
    }
}

function updateCatalogView() {
    const mainImg = document.getElementById('catalogMainImage');
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
    if (!event || event.target.id === 'catalogLightbox' || event.target.classList.contains('close-btn')) {
        document.getElementById('catalogLightbox').classList.remove('active');
    }
}

// 6. زر الواتساب الذكي للكتالوج
function orderCurrentDesign() {
    if (catalogImages.length === 0) return;
    const currentImagePath = catalogImages[currentImageIndex];
    const imageName = currentImagePath.split('/').pop(); 
    
    const message = `مرحباً، أريد تنفيذ هذا التصميم من سابقة أعمال ${currentCategoryName}.\n(كود الصورة: ${imageName})`;
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/201016961497?text=${encodedMessage}`, '_blank');
}

/* =========================================
   Habib Landscape Boutique | Premium Selection
   Main Core Logic - Optimized Version
   ========================================= */

// أدوات مساعدة آمنة
function safeGetCart() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart'));
        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        return [];
    }
}

function safeSetCart(cart) {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Failed to save cart:', error);
    }
}

// 1. تحديث عدّاد المقايسة
function updateGlobalCartCount() {
    const cartBadge = document.getElementById('cartCount');
    if (!cartBadge) return;

    const cart = safeGetCart();
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    cartBadge.textContent = totalItems;

    cartBadge.style.transform = 'scale(1.18)';
    setTimeout(() => {
        cartBadge.style.transform = 'scale(1)';
    }, 220);
}

// 2. إظهار الشريط الذكي
function handleEliteBarAppearance() {
    setTimeout(() => {
        const eliteBar =
            document.getElementById('smartGlassSlider') ||
            document.getElementById('eliteGlassBar');

        if (eliteBar) {
            eliteBar.classList.add('visible');
            eliteBar.classList.add('active');
        }
    }, 2500);
}

// 3. فتح وقفل القائمة الجانبية
function toggleMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    if (!overlay) return;

    const isActive = overlay.classList.toggle('active');
    overlay.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    document.body.style.overflow = isActive ? 'hidden' : '';
}

// إغلاق القائمة بالضغط على الخلفية
document.addEventListener('click', function (event) {
    const overlay = document.getElementById('mobileMenuOverlay');
    if (!overlay || !overlay.classList.contains('active')) return;

    if (event.target === overlay) {
        toggleMobileMenu();
    }
});

// إغلاق القائمة بزر Escape
document.addEventListener('keydown', function (event) {
    const overlay = document.getElementById('mobileMenuOverlay');
    if (!overlay || !overlay.classList.contains('active')) return;

    if (event.key === 'Escape') {
        toggleMobileMenu();
    }
});

// 4. التشغيل الأساسي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    updateGlobalCartCount();
    handleEliteBarAppearance();

    window.addEventListener('storage', updateGlobalCartCount, { passive: true });
});

/* =========================================
   محرك المبيعات والكتالوج الذكي
   ========================================= */

// 5. الإضافة السريعة للمقايسة (تم التحديث ليدعم Cloudinary)
// أضفنا imgUrl كمتغير رابع لاستقبال رابط الصورة مباشرة
function quickAddToCart(productId, productName, category = 'general', imgUrl = 'assets/images/placeholder.jpg') {
    const cart = safeGetCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            title: productName,
            img: imgUrl, // تخزين رابط Cloudinary مباشرة
            category: category,
            quantity: 1
        });
    }

    safeSetCart(cart);
    updateGlobalCartCount();

    console.log(`✅ تم إضافة ${productName} لقائمة المقايسة`);
}

// 6. محرك سابقة الأعمال الموحد
let catalogImages = [];
let currentImageIndex = 0;
let currentCategoryName = 'سابقة أعمالنا';
let catalogHistoryPushed = false;

const brandLogoUrl =
    'https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775695027/My%20Brand/Habib_Landscape_Boutique_lfd7am.png';

// سابقة أعمال موحدة
const signaturePortfolioData = {
    nameAr: 'سابقة أعمالنا',
    media: [
        {
            url: 'https://res.cloudinary.com/dwa0e5sup/video/upload/q_auto/f_auto/v1775693488/premium-grass-texture-view_jr9iru.mp4',
            desc: 'تفاصيل خامة النجيل الفاخر بلمسة راقية'
        },
        {
            url: 'https://res.cloudinary.com/dwa0e5sup/video/upload/q_auto/f_auto/v1775693481/habib-outdoor-luxury-vibes_grcz5f.mp4',
            desc: 'أجواء لاند سكيب فاخرة بمستوى Luxury Villa'
        },
        {
            url: 'https://res.cloudinary.com/dwa0e5sup/video/upload/q_auto/f_auto/v1775693447/habib-landscape-luxury-design_qzbdi3.mp4',
            desc: 'تنسيق خارجي راقٍ يعكس هوية Habib Landscape Boutique'
        },
        {
            url: 'https://res.cloudinary.com/dwa0e5sup/video/upload/q_auto/f_auto/v1775693440/decorative-white-pebbles-finish_nc4acd.mp4',
            desc: 'تشطيبات زلط ديكوري أبيض بإحساس عصري فاخر'
        },
        {
            url: 'https://res.cloudinary.com/dwa0e5sup/video/upload/q_auto/f_auto/v1775686076/videoplayback_4_v5j6ev.mp4',
            desc: 'لقطات حقيقية من تنفيذاتنا الراقية في المساحات الخارجية'
        }
    ]
};

function getCatalogLightbox() {
    return document.getElementById('catalogLightbox');
}

function getCatalogMainImage() {
    return document.getElementById('catalogMainImage');
}

function ensureCatalogBrandMark(parent) {
    if (!parent) return;

    let logoEl = document.getElementById('catalogBrandMark');

    if (!logoEl) {
        logoEl = document.createElement('img');
        logoEl.id = 'catalogBrandMark';
        logoEl.alt = 'Habib Landscape Boutique';
        logoEl.style.position = 'absolute';
        logoEl.style.top = '18px';
        logoEl.style.left = '18px';
        logoEl.style.width = '120px';
        logoEl.style.zIndex = '6';
        logoEl.style.pointerEvents = 'none';
        parent.appendChild(logoEl);
    }

    logoEl.src = brandLogoUrl;
}

function cleanupCatalogMedia() {
    const existingVideo = document.getElementById('catalogMainVideo');
    if (existingVideo) {
        try {
            existingVideo.pause();
            existingVideo.removeAttribute('src');
            existingVideo.load();
        } catch (error) {}
        existingVideo.remove();
    }
}

function openCatalog() {
    const lightbox = getCatalogLightbox();
    if (!lightbox) return;

    catalogImages = signaturePortfolioData.media;
    currentImageIndex = 0;

    lightbox.style.display = 'flex';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (!catalogHistoryPushed) {
        history.pushState({ catalogOpen: true }, '');
        catalogHistoryPushed = true;
    }

    updateCatalogView();
}

function updateCatalogView() {
    const mainImg = getCatalogMainImage();
    const descElement = document.getElementById('catalogDescription');

    if (!mainImg) return;

    const currentItem = catalogImages[currentImageIndex];
    const isVideo = currentItem.url.includes('.mp4');
    const parent = mainImg.parentElement;

    ensureCatalogBrandMark(parent);
    cleanupCatalogMedia();

    if (descElement) {
        descElement.innerText = currentItem.desc;
    }

    if (isVideo) {
        mainImg.style.display = 'none';

        const video = document.createElement('video');
        video.id = 'catalogMainVideo';
        video.src = currentItem.url;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.controls = true;
        video.style.width = '100%';

        parent.insertBefore(video, mainImg);
    } else {
        mainImg.style.display = 'block';
        mainImg.src = currentItem.url;
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

function closeCatalog(event, fromPopState = false) {
    const lightbox = getCatalogLightbox();
    if (!lightbox) return;

    const isOverlay = event && event.target === lightbox;
    const isBtn = event && event.target.classList.contains('close-btn');

    if (!event || isOverlay || isBtn || fromPopState) {
        lightbox.classList.remove('active');
        lightbox.style.display = 'none';
        document.body.style.overflow = '';

        cleanupCatalogMedia();

        if (catalogHistoryPushed && !fromPopState) {
            catalogHistoryPushed = false;
            history.back();
        } else {
            catalogHistoryPushed = false;
        }
    }
}

// رجوع الموبايل
window.addEventListener('popstate', function () {
    const lightbox = getCatalogLightbox();
    if (lightbox && lightbox.classList.contains('active')) {
        closeCatalog(null, true);
    }
});

// Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeCatalog();
    }
});

// واتساب
function orderCurrentDesign() {
    const item = catalogImages[currentImageIndex];
    const msg = encodeURIComponent("عايز التصميم ده");
    window.open(`https://wa.me/201145393026?text=${msg}`, '_blank');
}

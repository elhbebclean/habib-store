/* =========================================
   Habib Store | Premium Selection
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

// 5. الإضافة السريعة للمقايسة
function quickAddToCart(productId, productName, category = 'general') {
    const cart = safeGetCart();

    let imgPath = `assets/images/${category}/${productId}.jpg`;
    if (category === 'zalat') {
        imgPath = `assets/images/zalat/${productId}.jpg`;
    }

    const existingItem = cart.find(item => item.id === productId);

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

    safeSetCart(cart);
    updateGlobalCartCount();

    console.log(`✅ تم إضافة ${productName} لقائمة المقايسة`);
}

// 6. محرك سابقة الأعمال الموحد
let catalogImages = [];
let currentImageIndex = 0;
let currentCategoryName = 'سابقة أعمالنا';

const brandLogoUrl =
    'https://res.cloudinary.com/dwa0e5sup/image/upload/q_auto/f_auto/v1775695027/My%20Brand/Habib_Landscape_Boutique_lfd7am.png';

// سابقة أعمال موحدة تظهر في كل المعارض
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
    return (
        document.getElementById('catalogLightbox') ||
        document.getElementById('zalatLightbox')
    );
}

function getCatalogMainImage() {
    return (
        document.getElementById('catalogMainImage') ||
        document.getElementById('zalatMainImage')
    );
}

function ensureCatalogBrandMark(parent) {
    if (!parent) return;

    let logoEl = document.getElementById('catalogBrandMark');

    if (!logoEl) {
        logoEl = document.createElement('img');
        logoEl.id = 'catalogBrandMark';
        logoEl.alt = 'Habib Landscape Boutique';
        logoEl.loading = 'eager';
        logoEl.decoding = 'async';
        logoEl.style.position = 'absolute';
        logoEl.style.top = '18px';
        logoEl.style.left = '18px';
        logoEl.style.width = '120px';
        logoEl.style.maxWidth = '28vw';
        logoEl.style.height = 'auto';
        logoEl.style.zIndex = '6';
        logoEl.style.pointerEvents = 'none';
        logoEl.style.opacity = '0.92';
        logoEl.style.filter = 'drop-shadow(0 4px 16px rgba(0,0,0,0.35))';

        const computedPosition = window.getComputedStyle(parent).position;
        if (!computedPosition || computedPosition === 'static') {
            parent.style.position = 'relative';
        }

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
        } catch (error) {
            console.warn('Video cleanup warning:', error);
        }
        existingVideo.remove();
    }
}

function openCatalog(category) {
    const lightbox = getCatalogLightbox();
    if (!lightbox) return;

    // بغض النظر عن الصفحة أو المعرض، نظهر نفس سابقة الأعمال
    currentCategoryName = signaturePortfolioData.nameAr;
    catalogImages = signaturePortfolioData.media;
    currentImageIndex = 0;

    lightbox.style.display = 'flex';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    updateCatalogView();
}

function updateCatalogView() {
    const mainImg = getCatalogMainImage();
    const descElement = document.getElementById('catalogDescription');

    if (!mainImg || catalogImages.length === 0) return;

    const currentItem = catalogImages[currentImageIndex];
    const mediaUrl = currentItem.url;
    const mediaDesc = currentItem.desc || '';
    const isVideo = mediaUrl.includes('.mp4') || mediaUrl.includes('/video/');
    const parent = mainImg.parentElement;

    if (!parent) return;

    ensureCatalogBrandMark(parent);

    if (descElement) {
        descElement.innerText = mediaDesc;
        descElement.style.display = mediaDesc ? 'block' : 'block';
    }

    cleanupCatalogMedia();

    if (isVideo) {
        mainImg.style.display = 'none';

        const videoEl = document.createElement('video');
        videoEl.id = 'catalogMainVideo';
        videoEl.src = mediaUrl;
        videoEl.autoplay = true;
        videoEl.loop = true;
        videoEl.muted = true;
        videoEl.controls = true;
        videoEl.preload = 'metadata';
        videoEl.playsInline = true;
        videoEl.setAttribute('playsinline', 'true');
        videoEl.setAttribute('webkit-playsinline', 'true');
        videoEl.style.width = '100%';
        videoEl.style.maxHeight = '80vh';
        videoEl.style.objectFit = 'contain';
        videoEl.style.borderRadius = '12px';
        videoEl.style.background = '#000';

        parent.insertBefore(videoEl, mainImg);
    } else {
        mainImg.style.display = 'block';
        mainImg.loading = 'lazy';
        mainImg.decoding = 'async';
        mainImg.src = mediaUrl;
        mainImg.alt = mediaDesc || currentCategoryName;
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
    const lightbox = getCatalogLightbox();
    if (!lightbox) return;

    const clickedCloseButton =
        event && event.target && event.target.classList.contains('close-btn');
    const clickedOverlay = event && event.target === lightbox;

    if (!event || clickedOverlay || clickedCloseButton) {
        // إخفاء فوري لتخفيف الإحساس بالثقل
        lightbox.classList.remove('active');
        lightbox.style.display = 'none';
        document.body.style.overflow = '';

        const mainImg = getCatalogMainImage();
        if (mainImg) {
            mainImg.removeAttribute('src');
            mainImg.style.display = 'block';
        }

        // تنظيف الفيديو بعد الإخفاء مباشرة
        setTimeout(() => {
            cleanupCatalogMedia();
        }, 0);
    }
}

// إغلاق الكتالوج بزر Escape
document.addEventListener('keydown', function (event) {
    const lightbox = getCatalogLightbox();
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (event.key === 'Escape') {
        closeCatalog();
    }
});

// 7. طلب تنفيذ تصميم محدد
function orderCurrentDesign() {
    if (catalogImages.length === 0) return;

    const mediaUrl = catalogImages[currentImageIndex].url;
    const fileNameWithParams = mediaUrl.split('/').pop() || '';
    const imageName = fileNameWithParams.split('.')[0] || 'signature-project';

    const message =
        `*طلب تنفيذ تصميم محدد - Habib Landscape Boutique* 🦈\n` +
        `--------------------------------\n` +
        `مرحباً، أعجبني هذا التصميم من ${currentCategoryName}.\n` +
        `(كود الملف: ${imageName})\n\n` +
        `أرغب في الاستفسار عن تفاصيل التنفيذ والمعاينة.`; 

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/201145393026?text=${encodedMessage}`, '_blank', 'noopener');
}

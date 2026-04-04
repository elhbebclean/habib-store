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

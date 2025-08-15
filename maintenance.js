// نظام الصيانة التلقائي لموقع صفقاتي - الإصدار الاحترافي
// تم إنشاؤه تلقائياً من لوحة التحكم في 15‏/8‏/2025 6:33:27 ص

(function() {
  'use strict';
  
  console.log('🚀 تم تحميل نظام الصيانة الاحترافي - 2025-08-15T03:33:27.402Z');
  
  const MAINTENANCE_CONFIG = {
  "is_maintenance_mode": false,
  "maintenance_message": "الموقع قيد الصيانة، سنعود قريباً",
  "site_title": "صفقاتي",
  "site_description": "منصة الصفقات الرائدة"
};
  const SUPABASE_URL = 'https://pwzkdkmaotctabqdbcic.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3emtka21hb3RjdGFicWRiY2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MDI4MTIsImV4cCI6MjA1MjQ3ODgxMn0.4xKMXYjKvKGVZKQjKvKGVZKQjKvKGVZKQjKvKGVZKQj';

  // فحص فوري للصيانة
  if (MAINTENANCE_CONFIG.is_maintenance_mode) {
    console.log('🔧 وضع الصيانة مفعل - عرض صفحة الصيانة فوراً');
    showMaintenancePage(MAINTENANCE_CONFIG);
    return;
  }

  // التحقق من حالة الصيانة
  async function checkMaintenanceStatus() {
    try {
      console.log('🔍 فحص حالة الصيانة من الخادم...');
      
      const response = await fetch(SUPABASE_URL + '/rest/v1/site_config?select=*&limit=1', {
        headers: {
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const config = data && data.length > 0 ? data[0] : MAINTENANCE_CONFIG;
        console.log('📊 حالة الصيانة:', config);
        
        if (config.is_maintenance_mode) {
          console.log('🚨 تفعيل وضع الصيانة!');
          showMaintenancePage(config);
        } else {
          console.log('✅ الموقع يعمل بشكل طبيعي');
        }
      } else {
        console.log('⚠️ فشل في جلب البيانات، استخدام الإعدادات المحفوظة');
        if (MAINTENANCE_CONFIG.is_maintenance_mode) {
          showMaintenancePage(MAINTENANCE_CONFIG);
        }
      }
    } catch (error) {
      console.warn('خطأ في فحص الصيانة:', error);
      if (MAINTENANCE_CONFIG.is_maintenance_mode) {
        showMaintenancePage(MAINTENANCE_CONFIG);
      }
    }
  }

  // عرض صفحة الصيانة
  function showMaintenancePage(config) {
    // التحقق من أن المستخدم ليس في لوحة التحكم
    if (window.location.hostname.includes('admin') || 
        window.location.pathname.includes('admin') ||
        window.location.hostname.includes('localhost') ||
        window.location.port === '5173') {
      console.log('🚫 تجاهل الصيانة - صفحة إدارية');
      return;
    }

    console.log('🎨 عرض صفحة الصيانة...');
    
    document.body.innerHTML = `[صفحة الصيانة HTML هنا]`;
  }

  // تشغيل التحقق
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(checkMaintenanceStatus, 1000);
    });
  } else {
    setTimeout(checkMaintenanceStatus, 1000);
  }

  // التحقق الدوري
  setInterval(checkMaintenanceStatus, 60000);
})();
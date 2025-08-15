
// نظام الصيانة التلقائي لموقع صفقاتي
// تم إنشاؤه تلقائياً من لوحة التحكم في 15‏/8‏/2025 6:01:26 ص

(function() {
  'use strict';
  
  const MAINTENANCE_CONFIG = {
  "id": "default-1755226885866",
  "is_maintenance_mode": false,
  "maintenance_message": "الموقع قيد الصيانة، سنعود قريباً",
  "site_title": "صفقاتي",
  "site_description": "منصة الصفقات الرائدة",
  "updated_at": "2025-08-15T03:01:25.866Z"
};
  const SUPABASE_URL = 'https://pwzkdkmaotctabqdbcic.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3emtka21hb3RjdGFicWRiY2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMjI4MTIsImV4cCI6MjA3MDU5ODgxMn0.4xKMXYjKvKGVZKQjKvKGVZKQjKvKGVZKQjKvKGVZKQj';
  
  // التحقق من حالة الصيانة
  async function checkMaintenanceStatus() {
    try {
      console.log('🔄 بدء التحقق من حالة الصيانة...');
      
      // استخدام الإعدادات المحفوظة أولاً
      console.log('📋 الإعدادات المحفوظة:', MAINTENANCE_CONFIG);
      
      // التحقق من الإعدادات المحفوظة أولاً
      if (MAINTENANCE_CONFIG && MAINTENANCE_CONFIG.is_maintenance_mode) {
        console.log('🔧 وضع الصيانة مفعل في الإعدادات المحفوظة');
        handleMaintenance(MAINTENANCE_CONFIG);
      }
      
      // ثم محاولة جلب أحدث البيانات
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
        console.log('📡 البيانات من الخادم:', config);
        handleMaintenance(config);
      } else {
        console.log('⚠️ فشل في جلب البيانات من الخادم، استخدام الإعدادات المحفوظة');
        handleMaintenance(MAINTENANCE_CONFIG);
      }
      
    } catch (error) {
      console.warn('تحذير: خطأ في التحقق من حالة الصيانة، استخدام الإعدادات المحفوظة:', error);
      handleMaintenance(MAINTENANCE_CONFIG);
    }
  }

  // معالجة حالة الصيانة
  function handleMaintenance(config) {
    // تسجيل حالة الصيانة للتشخيص
    console.log('🔍 فحص حالة الصيانة:', config);
    
    if (!config) {
      console.log('⚠️ لا توجد إعدادات');
      return;
    }
    
    if (!config.is_maintenance_mode) {
      console.log('✅ الموقع يعمل بشكل طبيعي');
      return;
    }
    
    console.log('🔧 تفعيل وضع الصيانة...');

    // التحقق من أن المستخدم ليس في لوحة التحكم
    if (window.location.hostname.includes('admin') || 
        window.location.pathname.includes('admin') ||
        window.location.hostname.includes('localhost') ||
        window.location.hostname.includes('127.0.0.1') ||
        window.location.port === '5173' ||
        window.location.hostname === 'localhost') {
      console.log('🚫 تجاهل الصيانة - صفحة إدارية');
      return;
    }

    console.log('🚀 عرض صفحة الصيانة...');
    // عرض صفحة الصيانة
    showMaintenancePage(config);
  }

  // عرض صفحة الصيانة
  function showMaintenancePage(config) {
    console.log('🎨 إنشاء صفحة الصيانة...');
    
    document.body.innerHTML = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>صيانة - ${config.site_title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Tajawal', 'Arial', sans-serif;
            background: linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #dc2626 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            overflow: hidden;
          }
          
          .maintenance-container {
            max-width: 700px;
            padding: 3rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 30px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            animation: fadeInUp 1s ease-out;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .maintenance-icon {
            font-size: 5rem;
            margin-bottom: 2rem;
            animation: pulse 2s infinite;
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
          }
          
          @keyframes pulse {
            0%, 100% { 
              transform: scale(1);
              opacity: 1;
            }
            50% { 
              transform: scale(1.1);
              opacity: 0.8;
            }
          }
          
          .maintenance-title {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
            background: linear-gradient(45deg, #ffffff, #f0f9ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .maintenance-message {
            font-size: 1.5rem;
            margin-bottom: 2.5rem;
            opacity: 0.95;
            line-height: 1.8;
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
          }
          
          .maintenance-info {
            background: rgba(255, 255, 255, 0.15);
            padding: 2.5rem;
            border-radius: 20px;
            margin-top: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .loading-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1.5rem;
          }
          
          .loading-dots {
            display: flex;
            gap: 0.3rem;
          }
          
          .loading-dot {
            width: 10px;
            height: 10px;
            background: #fbbf24;
            border-radius: 50%;
            animation: loadingDots 1.5s infinite;
          }
          
          .loading-dot:nth-child(2) {
            animation-delay: 0.2s;
          }
          
          .loading-dot:nth-child(3) {
            animation-delay: 0.4s;
          }
          
          @keyframes loadingDots {
            0%, 80%, 100% {
              transform: scale(0.8);
              opacity: 0.5;
            }
            40% {
              transform: scale(1.2);
              opacity: 1;
            }
          }
          
          @media (max-width: 768px) {
            .maintenance-container {
              margin: 1rem;
              padding: 2rem;
            }
            
            .maintenance-title {
              font-size: 2.5rem;
            }
            
            .maintenance-message {
              font-size: 1.2rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="maintenance-container">
          <div class="maintenance-icon">🔧</div>
          <h1 class="maintenance-title">${config.site_title}</h1>
          <p class="maintenance-message">${config.maintenance_message}</p>
          
          <div class="maintenance-info">
            <h3 style="color: #fbbf24; margin-bottom: 1rem;">🚀 نعمل على تطوير الموقع</h3>
            <p style="margin-bottom: 0.8rem;">نقوم حالياً بتحديث وتطوير الموقع لتقديم تجربة أفضل</p>
            <p style="margin-bottom: 0.8rem;">سنعود قريباً بمميزات جديدة ومحسنة</p>
            
            <div class="loading-container">
              <span style="font-size: 1.1rem;">جاري العمل</span>
              <div class="loading-dots">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
              </div>
            </div>
          </div>
          
          <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(0, 0, 0, 0.2); border-radius: 15px;">
            <p><strong>📧 للاستفسارات:</strong> info@safgati.com</p>
            <p style="margin-top: 0.5rem; opacity: 0.8;">شكراً لكم على الثقة والدعم</p>
          </div>
        </div>
        
        <script>
          console.log('🔄 بدء مراقبة حالة الصيانة...');
          
          // إعادة التحقق كل 30 ثانية
          setInterval(async function() {
            try {
              console.log('🔍 فحص دوري لحالة الصيانة...');
              const response = await fetch('${SUPABASE_URL}/rest/v1/site_config?select=*&limit=1', {
                headers: {
                  'Authorization': 'Bearer ${SUPABASE_ANON_KEY}',
                  'apikey': '${SUPABASE_ANON_KEY}',
                  'Content-Type': 'application/json',
                },
              });
              
              if (response.ok) {
                const data = await response.json();
                const config = data[0];
                console.log('📊 حالة الصيانة الحالية:', config);
                
                if (config && !config.is_maintenance_mode) {
                  console.log('✅ تم إيقاف الصيانة، إعادة تحميل الصفحة...');
                  window.location.reload();
                }
              } else {
                console.log('⚠️ فشل في الفحص الدوري');
              }
            } catch (error) {
              console.warn('خطأ في التحقق من الصيانة:', error);
            }
          }, 30000);
        </script>
      </body>
      </html>
    `;
  }

  // تشغيل التحقق عند تحميل الصفحة
  console.log('🚀 تهيئة نظام الصيانة...');
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('📄 الصفحة جاهزة، بدء التحقق...');
      setTimeout(checkMaintenanceStatus, 1000);
    });
  } else {
    console.log('📄 الصفحة محملة بالفعل، بدء التحقق...');
    setTimeout(checkMaintenanceStatus, 1000);
  }

  // التحقق الدوري كل دقيقة
  console.log('⏰ تفعيل الفحص الدوري كل دقيقة');
  setInterval(checkMaintenanceStatus, 60000);
})();

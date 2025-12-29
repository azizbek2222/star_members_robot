// Firebase Sozlamalari
const firebaseConfig = {
    apiKey: "AIzaSyA7VLHdjPqf_tobSiBczGbN8H7YlFwq9Wg",
    authDomain: "magnetic-alloy-467611-u7.firebaseapp.com",
    databaseURL: "https://magnetic-alloy-467611-u7-default-rtdb.firebaseio.com",
    projectId: "magnetic-alloy-467611-u7",
    storageBucket: "magnetic-alloy-467611-u7.firebasestorage.app",
    messagingSenderId: "589500919880",
    appId: "1:589500919880:web:7b82d037c5e7396d51687d"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Telegram WebApp obyektini yuklash
const tg = window.Telegram.WebApp;

// Ilovani tayyor holatga keltirish va kengaytirish
tg.ready();
tg.expand();

function loadUserData() {
    const user = tg.initDataUnsafe?.user;

    if (user) {
        // Ism va familiyani chiqarish
        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
        document.getElementById('user-name').innerText = fullName || "Ismsiz foydalanuvchi";
        
        // Telegram ID ni chiqarish
        document.getElementById('user-id').innerText = user.id;

        // Profil rasmiga ishlov berish
        const photoImg = document.getElementById('user-photo');
        if (user.photo_url) {
            photoImg.src = user.photo_url;
        } else {
            // Agar rasm bo'lmasa, foydalanuvchi ismining bosh harflari bilan rasm yaratish
            photoImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=01875f&color=fff`;
        }

        // Firebase-da foydalanuvchini saqlash yoki yangilash
        db.ref('users/' + user.id).update({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            username: user.username || 'noma'lum',
            photo: user.photo_url || '',
            last_login: new Date().toLocaleString()
        });

    } else {
        // Agar Telegram ichida bo'lmasa (Brauzerda test uchun)
        document.getElementById('user-name').innerText = "Brauzer Rejimi";
        document.getElementById('user-id').innerText = "Test_ID_12345";
        console.warn("Telegram Mini App ma'lumotlari topilmadi.");
    }
}

// Sahifa yuklanishi bilan funksiyani ishga tushirish
document.addEventListener('DOMContentLoaded', loadUserData);

// Telegram temasi ranglarini qo'llash
document.body.style.backgroundColor = tg.backgroundColor;
document.body.style.color = tg.textColor;

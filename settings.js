// Firebase Sozlamalari (index.html dagi bilan bir xil bo'lishi kerak)
const firebaseConfig = {
    apiKey: "AIzaSyA7VLHdjPqf_tobSiBczGbN8H7YlFwq9Wg",
    authDomain: "magnetic-alloy-467611-u7.firebaseapp.com",
    databaseURL: "https://magnetic-alloy-467611-u7-default-rtdb.firebaseio.com",
    projectId: "magnetic-alloy-467611-u7",
    storageBucket: "magnetic-alloy-467611-u7.firebasestorage.app",
    messagingSenderId: "589500919880",
    appId: "1:589500919880:web:7b82d037c5e7396d51687d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Telegram WebApp API orqali foydalanuvchini olish
const tg = window.Telegram.WebApp;
tg.expand(); // Ilovani to'liq ekranga yoyish

document.addEventListener('DOMContentLoaded', function() {
    const user = tg.initDataUnsafe?.user;

    if (user) {
        // Foydalanuvchi ma'lumotlarini ekranga chiqarish
        document.getElementById('user-name').innerText = `${user.first_name} ${user.last_name || ''}`;
        document.getElementById('user-id').innerText = user.id;

        // Agar profil rasmi bo'lsa
        if (user.photo_url) {
            document.getElementById('user-photo').src = user.photo_url;
        }

        // Ma'lumotlarni Firebase'da yangilab qo'yish (ixtiyoriy)
        db.ref('users/' + user.id).update({
            name: user.first_name,
            username: user.username || 'Noma'lum',
            last_seen: new Date().toISOString()
        });
    } else {
        // Agar Telegram tashqarisida ochilgan bo'lsa (test uchun)
        document.getElementById('user-name').innerText = "Mehmon";
        document.getElementById('user-id').innerText = "Noma'lum";
    }
});

// Telegram ranglariga moslashish
document.body.style.backgroundColor = tg.backgroundColor;
document.body.style.color = tg.textColor;

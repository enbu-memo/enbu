function InitHeaderNavActive() {
    // 現在ページのリンクと親ドロップダウンにactiveクラスを付与
    var current = location.pathname.split('/').pop();
    var navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(function(link){
        if(link.getAttribute('href') === current){
            link.classList.add('active');
            var parentDropdown = link.closest('.dropdown');
            if(parentDropdown){
                var btn = parentDropdown.querySelector('.dropbtn');
                if(btn) btn.classList.add('active');
            }
        }
    });
    // スマホ用: トグルで左からメニュー表示、サブメニューはタップで展開
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(function(drop){
        const btn = drop.querySelector('.dropbtn');
        if (btn) {
            btn.addEventListener('click', function(e){
                if(window.innerWidth <= 768){
                    e.preventDefault();
                    if (drop.classList.contains('open')) {
                        drop.classList.remove('open');
                    } else {
                        dropdowns.forEach(function(d){
                            if (d !== drop) d.classList.remove('open');
                        });
                        drop.classList.add('open');
                    }
                }
            });
        }
    });
}
// 共通関数: ヘッダー・著作権・一番上に戻るボタン

function Disp_backToTop() {
    // 一番上に戻るボタンの表示・動作
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function Load_header() {
    // header.htmlを読み込んで挿入し、ヘッダー内のスクリプトも再実行
    fetch('header.html')
    .then(res => res.text())
    .then(data => {
        const headerDiv = document.getElementById('header-include');
        headerDiv.innerHTML = data;
        InitHeaderNavActive();
    });
}

function Load_copyright() {
    fetch('copyright.html')
        .then(res => res.text())
        .then(data => {
            const el = document.getElementById('copyright-include');
            if (el) el.innerHTML = data;
        });
}

// 他画面でも利用可能なようにwindowへ登録
window.Disp_backToTop = Disp_backToTop;
window.Load_header = Load_header;
window.Load_copyright = Load_copyright;

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
        // ヘッダー内のスクリプトを再実行
        const scripts = headerDiv.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            document.body.appendChild(newScript);
        });
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

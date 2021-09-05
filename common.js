


//============================== ヘッダー =====================================
const documentHeader=
`
<a href="index.html" class="link-white">
    <h1 class="center">RPGツクールMVプラグイン</h1>
    <p class="center">公開中のRPGツクールMV用プラグイン一覧</p>
</a>
`
;
let elementHeader = document.getElementById('header');
elementHeader.insertAdjacentHTML('beforeend', documentHeader);


//============================== フッター =====================================
const documentFooter=
`
<footer id=footer>
    <div id="license">
        <div style="width:100px;height:99px;background-image:url(image/napiiey_round.png);background-size:cover;float:left"></div>
        <p>
            制作者：なぴぃ<br>
            Twitter：<a href="https://twitter.com/napiiey">@napiiey</a><br>
            MITライセンスの元、自由にお使いいただけます。<br>
            <a href="license.html">MITライセンスについて <span class="material-icons icon-small">open_in_new</span></a>
        </p>
    </div>
</footer>
`
;
let elementFooter = document.getElementById('footer');
elementFooter.insertAdjacentHTML('beforeend', documentFooter);


//============================== ヘッダー =====================================

const documentHeader=
`
<a href="index.html" class="link-white">
    <h1 class="center">RPGツクールMVプラグイン</h1>
    <p class="center">なぴぃが公開中のRPGツクールMV用プラグイン一覧</p>
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
            MITライセンスの下ご自由にお使いいただけます。<br>
            <a href="license.html">MITライセンスについて <span class="material-icons icon-small">open_in_new</span></a>
        </p>
    </div>
</footer>
`
;
let elementFooter = document.getElementById('footer');
elementFooter.insertAdjacentHTML('beforeend', documentFooter);


//============================== プラグインリスト =====================================

if(document.getElementById("plugin_list") != null){
    beforeDownload = `
    <section class="underline">
            <a class="dl-button" href="https://raw.githubusercontent.com/napiiey/rpgmaker-plugins/master/`;
    afterDownload = `.js">Download<span class="material-icons icon-big">download_for_offline</span></a>
            <a class="link-gray" href="`;
    afterDetail = `.html">
                <section class="plugin_name_box">
                    <span class="material-icons icon-large">extension</span>
                    <div>
                        <h2>`;
    afterName = `</h2>
                        <p>
    `;
    afterDesc = `</p>
        </div>
    </section>
    <p style="white-space:pre-wrap">`;
    afterText = `\n使用方法・詳細 <span class="material-icons icon-small">open_in_new</span></p>
    </a>
    </section>
    `;

    let pluginList = plugin_list.innerHTML;
    let pluginListResult = "";

    while(pluginList.indexOf("\n\n") !== -1){
        const nameStart = pluginList.indexOf("\n")+1;
        const descStart = pluginList.indexOf("\n",nameStart)+1;
        const textStart = pluginList.indexOf("\n",descStart)+1;
        const textEnd = pluginList.indexOf("\n\n",textStart);

        const name = pluginList.slice(nameStart,descStart);
        const desc = pluginList.slice(descStart,textStart);
        const text = pluginList.slice(textStart,textEnd);

        pluginListResult = pluginListResult+beforeDownload+name+afterDownload+name.toLowerCase()+afterDetail+name+afterName+desc+afterDesc+text+afterText;
        pluginList = pluginList.slice(textEnd+1);
    };
    console.log(pluginListResult);
    plugin_list.innerHTML = '<div style="white-space:normal">'+pluginListResult+'</div>';
};

//============================== ヘルプ文章 =====================================
let pluginName="";

if(document.getElementById("helpdocument") != null){
    const beforeDownload = `<article>
    <section>
    <a class="dl-button" href="https://raw.githubusercontent.com/napiiey/rpgmaker-plugins/master/`

    const afterDownload = `.js" onclick="ga('send','event','plugindl','click','`

    const afterGa = `', 1);">
    <strong>Download</strong><span class="material-icons icon-big">download_for_offline</span></a>
<section class="plugin_name_box">
    <span class="material-icons icon-large">extension</span>
    <div>
        <h2 id="plugin_name"></h2>
        <p id="plugin_desc"></p>
    </div>
</section>`

    const mainBeforeEnd = `</section>
    </article>`;


    let helpDoc = helpdocument.innerHTML;

    const pluginNameEnd = helpDoc.indexOf(".js");
    const pluginNameStart = helpDoc.lastIndexOf("// ",pluginNameEnd)+3;
    pluginName = helpDoc.slice(pluginNameStart,pluginNameEnd);

    main.insertAdjacentHTML('afterbegin',
    beforeDownload+pluginName+afterDownload+pluginName+afterGa);
    main.insertAdjacentHTML('beforeend', mainBeforeEnd);
    // console.log(main.innerHTML);
    
    const pluginDescStart = helpDoc.indexOf("@plugindesc")+12;
    const pluginDescEnd = helpDoc.indexOf("\n",pluginDescStart);
    const pluginDesc = helpDoc.slice(pluginDescStart,pluginDescEnd);
    
    const headTitleDesc = "<title>"+pluginName+"</title>"
    +'<meta name="description" content="'+pluginDesc+'">';
    document.head.insertAdjacentHTML("beforeend",headTitleDesc);

    plugin_name.innerHTML=pluginName;
    plugin_desc.innerHTML=pluginDesc;

    helpDoc = helpDoc.replace("/*:","").replace(/ \* /g,"");
    
    const helpOverviewStart = helpDoc.indexOf("@help")+6;
    const helpOverviewEnd = helpDoc.indexOf("\n\n",helpOverviewStart);
    const helpOverview = helpDoc.slice(helpOverviewStart,helpOverviewEnd);

    helpDoc = helpDoc.slice(helpOverviewStart);

    while(helpDoc.indexOf("●") !== -1){
        const indexCount = helpDoc.indexOf("●");
        const indexCountEnd = helpDoc.indexOf("\n",indexCount);
        const h3Before = helpDoc.slice(0,indexCount);
        const h3Core = helpDoc.slice(indexCount,indexCountEnd);
        const h3After = helpDoc.slice(indexCountEnd+1);
        helpDoc = h3Before+h3Core+"</h3>"+h3After;
        helpDoc = helpDoc.replace("●",'<h3 class="helpCaption">');
    };

    helpDoc = helpDoc.replace("@plugindesc ","")
    .replace("@author ","作者:").replace("@help","");
    helpdocument.innerHTML = helpDoc;

};

//============================== コメント欄 =====================================

const commentHtml = `
<form id="commentForm">
<h4><span class="material-icons">forum</span>コメント</h4>
ご質問やご要望、不具合報告等はこちらへお願いします。<br>
<textarea id="commentInput" placeholder="コメント" required></textarea><br>
<input type="button" value="書き込む" onclick="postForm();"/>
</form>
<div id="comments"></div>`

let elementComment = document.getElementById('commentArea');
elementComment.insertAdjacentHTML('beforeend', commentHtml);

//user
userId = "";
fetch('https://ipinfo.io?callback')
  .then(res => res.json())
  .then(json => userId=json.ip)

function postForm() {
    //テキストエリアの中身とuserとターゲットを送信
    let commentInput = document.getElementById('commentInput').value;
    console.log(commentInput);
 
    const form = document.createElement('form');
    const comment = document.createElement('input');
    const target = document.createElement('input');
    const user = document.createElement('input');
 
    form.method = 'POST';
    form.action = 'https://script.google.com/macros/s/AKfycbyBm9qNvz5kDGlEQk0YJr0ibC_ZoIvoAXszHA4ykltQ4cWN77m_cU_3nXbW61NAcDho/exec';
 
    comment.type = 'hidden'; //入力フォームが表示されないように
    comment.name = 'comment';
    comment.value = commentInput;

    target.type = 'hidden'; //入力フォームが表示されないように
    target.name = 'target';
    target.value = pluginName;

    user.type = 'hidden'; //入力フォームが表示されないように
    user.name = 'user';
    user.value = userId;
 
    form.appendChild(comment);
    form.appendChild(target);
    form.appendChild(user);
    document.body.appendChild(form);

    if(commentInput!==""){form.submit();
    }else{alert("コメントを入力して下さい。")};
};


//GASのAPIのURL
const endpoint = "https://script.google.com/macros/s/AKfycbyBm9qNvz5kDGlEQk0YJr0ibC_ZoIvoAXszHA4ykltQ4cWN77m_cU_3nXbW61NAcDho/exec";
    
//APIを使って非同期データを取得する
fetch(endpoint)
.then(response => response.json())
/*成功した処理*/
.then(data => {
    //JSONから配列に変換
    const obj = data;
    

    let documentComments = "";
    let countNumber=0;
    obj.forEach((element,index)=> {
        if(element.target===pluginName){
            countNumber=countNumber+1;
            const isoDate = new Date(element.date);
            const localeDate=isoDate.toLocaleDateString('ja-JP', {timeZone:'Asia/Tokyo',hour:'numeric',minute:'numeric',second:'numeric'});
            const convertComment=element.comment.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
            documentComments='<span class="comment-number">'+countNumber+"</span>"+'<span class="comment-date">'+localeDate+"</span>"
            +"<br>"+'<div class="comment-text">'+convertComment+"</div>"+documentComments;
        };
        
    });

    let elementComments = document.getElementById('comments');
    elementComments.insertAdjacentHTML('beforeend', documentComments);
});


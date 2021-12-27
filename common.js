

//============================== ヘッダー =====================================

const documentHeader=
`
<a href="index.html" class="link-white">
    <h1 class="center">RPGツクールプラグイン</h1>
    <p class="center">なぴぃが公開中のRPGツクールMV/MZ用プラグイン一覧</p>
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

//============================== プラグインリスト ===========================
let version = document.getElementById("select_version");
let category = document.getElementById("select_category");
let serch = document.getElementById("search_text");
if(version){
    beforeDownload = `
    <section class="underline">
            <a class="dl-button" href="https://raw.githubusercontent.com/napiiey/rpgmaker-plugins/master/`;
    afterDownload = `.js">Download<span class="material-icons icon-big dlspan">download_for_offline</span></a>`;
    afterDetail = `<section class="plugin_name_box">
                    <span class="material-icons icon-large namespan">extension</span>
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
    let sortedArray=[];
    let pluginListResult = "";
    let pluginListArray = pluginList.split("\n\n");
    pluginListArray=pluginListArray.map(e=>e.split("\n"));
    pluginListArray[0].shift();
    pluginListArray=pluginListArray.map(e=>{
        e[7]=e[1];
        return e
    });

    const mvmzSplit=function(mvmz){
        let array=mvmz.split("-");
        array=array.map(e=>{
            let res="error";
            if(e.includes("MV")){res='<span class="mv">'+e+'</span>'};
            if(e.includes("MZ")){res='<span class="mz">'+e+'</span>'};
            return res;
        });
        result=array.join('');
        return result;
    }

    const showList=function(list){
        pluginListResult = "";
        list.forEach(e=>{
            const mvmz=mvmzSplit(e[4]);
            const cat='<span class="category">'+e[5]+'</span>'
            pluginListResult=pluginListResult+beforeDownload+e[7]+afterDownload+e[0]+afterDetail
            +e[1]+afterName+e[2]+mvmz+cat+afterDesc+e[3]+afterText;
        });
        //0tag 1name 2desc 3text 4target 5category 6tag 7namecopy
        plugin_list.innerHTML = '<div style="white-space:normal">'+pluginListResult+'</div>';
    };
    showList(pluginListArray);

    //============================== カテゴリーリスト =====================================
    const categoryList=[];
    let addCategory="";
    pluginListArray.forEach(e=>{
        if(!categoryList.includes(e[5])){categoryList.push(e[5])};
    });
    categoryList.forEach(e=>{
        addCategory=addCategory+'<option>'+e+'</option>'+'\n';
    });
    category.insertAdjacentHTML('beforeend', addCategory);

    //============================== ソート =====================================
    version.addEventListener('change',function(){showSortList()},false);
    category.addEventListener('change',function(){showSortList()},false);
    serch.addEventListener('input',function(){showSortList()},false);
    const showSortList=function(){
        sortedArray=[];
        pluginListArray.forEach(e=>{
            if((version.value==="all"||version.value===e[4]||e[4]==="MV-MZ")
                &&(category.value==="全てのカテゴリー"||category.value===e[5])){
                let change=false;
                let colored=e;
                if(serch.value===""){change=true
                }else{
                    colored=colored.map((line,index)=>{
                        let result=line;
                        if(index===1||index===2||index===3||index===4||index===5){
                            const regex = new RegExp(serch.value,'gi');
                            result=line.replace(regex,text=>{
                                change=true;
                                return '<b class="serch_colored">'+text+'</b>'
                            });
                        };
                        return result;
                    });
                };
                if(change){sortedArray.push(colored);};
            };    
        });
        showList(sortedArray);
    };

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
    <span class="material-icons icon-large namespan">extension</span>
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
if(elementComment){elementComment.insertAdjacentHTML('beforeend', commentHtml);};


//user
userId = "";
fetch('https://ipinfo.io?callback')
  .then(res => res.json())
  .then(json => userId=json.ip)

function postForm() {
    //テキストエリアの中身とuserとターゲットを送信
    let commentInput = document.getElementById('commentInput').value;
    // console.log(commentInput);
 
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
    if(elementComments){elementComments.insertAdjacentHTML('beforeend', documentComments);};
    
});




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

if(document.getElementById("helpdocument") != null){
    const beforeDownload = `<article>
    <section>
    <a class="dl-button" href="https://raw.githubusercontent.com/napiiey/rpgmaker-plugins/master/`

    const afterDownload = `.js">
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
    const pluginName = helpDoc.slice(pluginNameStart,pluginNameEnd);

    main.insertAdjacentHTML('afterbegin', beforeDownload+pluginName+afterDownload);
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


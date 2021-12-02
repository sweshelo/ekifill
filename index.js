google.charts.load('current', {
    'packages':['corechart','geochart']
});

var prefectures = [];

fetch('https://scripts.sweshelo.jp/stations.json').then(res=>res.json()).then((res)=>{
    const list = document.getElementById('stations-list');

    console.log(res);
    prefectures = res.prefectures;
    res.prefectures.forEach((obj)=>{
        const child = document.createElement('li');
        child.innerHTML = '<div class="pref"><p class="pref-name" OnClick="document.getElementById(\'pref-'+obj.code+'\').value = '+obj.count+'">'+obj.name+'</p><input type="number" class="pref-count" id="pref-'+obj.code+'" max='+obj.count+' min="0" value="0"></input><span class="maxcnt"> / '+obj.count+'</span></div>';
        list.appendChild(child);
    });
})
google.charts.setOnLoadCallback(drawMap);


function toHex(v) {
    return ('00' + v.toString(16).toUpperCase()).substr(-2);
}

function gradient(){
    const color = [];
    for(let i=0;i<420;i++){
        color.push('#'+toHex(Math.round(210-i/2))+toHex(220)+toHex(Math.round(210-i/2)));
    }
    color.push('gold');
    return color;
}

function getData(){
    const data = [['都道府県名','取得率(%)']];
    prefectures.forEach((pref)=>{
        let cnt = document.getElementById('pref-'+pref.code).value;
        data.push([pref.name, cnt/pref.count*100])
    });
    console.log(data);
    return data;
}

function drawMap() {
    //都道府県単位のデータ
    var rawData = getData();
    var data = google.visualization.arrayToDataTable(rawData);

    var options = {
        title: '駅取得率',
        region: 'JP',  //地域
        displayMode: 'regions', // regions=塗りつぶし, markers=マーカー 
        backgroundColor: '#ebf7fe', //背景色
        resolution: 'provinces',
        colorAxis:{
            minValue : 0,
            maxValue : 100,
            colors : gradient(),
        },
    };

    var chart = new google.visualization.GeoChart(document.getElementById('map'));
    chart.draw(data, options);
}

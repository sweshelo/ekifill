google.charts.load('current', {
    'packages':['corechart','geochart']
});

fetch('./stations.json').then(res=>res.json()).then((res)=>{
    const list = document.getElementById('stations-list');

    res.forEach((obj)=>{
        const child = document.createElement('li');
        child.innerHTML = '<span>'+obj.name+'</span><input type="number" id="sta-'+code+'" max='+obj.count+'></input><span> / '+obj.count+'</span>';
        list.appendChild(child);
    });
})

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
    //    document.getElementById('');
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

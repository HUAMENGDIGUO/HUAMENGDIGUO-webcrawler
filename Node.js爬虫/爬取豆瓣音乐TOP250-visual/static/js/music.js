// echarts
const chartStore = {
    pie: null,
    bar: null,
    line: null,
}

const optionForPie = function(data) {
    var option = {
        title: {
            text: '豆瓣音乐top250类型占比',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: '类型占比',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    return option
}

const optionForTypePie = function(type) {
    const data = _.map(type, (v, k) => {
        const o = {
            name: k,
            value: v.length,
        }
        log('v', v);
        log('k', k);
        return o
    })
    const option = optionForPie(data)
    return option
}

const optionForBar = function(data) {
    const option = {
        title: {
            text: '豆瓣音乐 top250 按年份划分',
        },
        xAxis: {
            data: data.axis,
            name: '发布年份',
            nameLocation: 'end',
            axisLabel: {
                textStyle: {
                    color: '#000'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            name: '音乐数量',
            axisLine: {
                show: false
            },
            axisTick: {
                show: true
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        series: [
            {
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}

                },
                barGap:'-100%',
                barCategoryGap:'40%',
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
                data: data.data
            }
        ]
    }
    return option
}

const optionForYearBar = function(year) {
    const data = {
        axis: [],
        data: [],
    }
    _.each(year, (v, k) => {
        data.axis.push(k)
        data.data.push(v.length)
    })
    const option = optionForBar(data)
    return option
}

const optionForLine = function(data) {
    const option = {
        title: {
            text: '豆瓣音乐 top250 平均分数'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0]
                var value = params.value
                var s = value[0] + ': ' + value[1]
                return s
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            name: '发布时间',
            type: 'value',
            splitLine: {
                show: false
            },
            max: 2017,
            min: 1965,
            splitNumber: 10,
        },
        yAxis: {
            type: 'value',
            name: '平均分',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            min: 8,
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };
    return option
}

const optionForYearLine = function(year) {
    const data = _.map(year, (v, k) => {
        const avg = _.meanBy(v, function(o) { return Number(o.score); })
        const o = {
            name: k,
            value: [k, avg.toFixed(1)],
        }
        return o
    })
    const option = optionForLine(data)
    return option
}

const renderChart = function(d) {
    const data = d

    const typePie = _.groupBy(data, 'type')
    const areaOption = optionForTypePie(typePie)
    const pie = chartStore.pie
    pie.setOption(areaOption)

    const yearBar = _.groupBy(data, 'year')
    const typeOption = optionForYearBar(yearBar)
    const bar = chartStore.bar
    bar.setOption(typeOption)

    const yearLine = _.groupBy(data, 'year')
    const yearOption = optionForYearLine(yearLine)
    const line = chartStore.line
    line.setOption(yearOption)
}

const musicJSON = function() {
    var d = [
    {
    "songName": "We Sing. We Dance. We Steal Things.",
    "singerName": "Jason Mraz",
    "score": "9.1",
    "coverUrl": "https://img3.doubanio.com/spic/s2967252.jpg",
    "year": "2008",
    "type": " 民谣",
    "comments": "100490人评价"
    },
    {
    "songName": "Viva La Vida",
    "singerName": "Coldplay",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s3054604.jpg",
    "year": "2008",
    "type": " 摇滚",
    "comments": "77347人评价"
    },
    {
    "songName": "华丽的冒险",
    "singerName": "陈绮贞",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s1441645.jpg",
    "year": "2005",
    "type": " 流行",
    "comments": "72972人评价"
    },
    {
    "songName": "范特西",
    "singerName": "周杰伦",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s3750422.jpg",
    "year": "2001",
    "type": " 流行",
    "comments": "73375人评价"
    },
    {
    "songName": "後。青春期的詩",
    "singerName": "五月天",
    "score": "8.8",
    "coverUrl": "https://img1.doubanio.com/spic/s3316597.jpg",
    "year": "2008",
    "type": " 摇滚",
    "comments": "72083人评价"
    },
    {
    "songName": "是时候",
    "singerName": "孙燕姿",
    "score": "8.6",
    "coverUrl": "https://img1.doubanio.com/spic/s4653287.jpg",
    "year": "2011",
    "type": " 流行",
    "comments": "69044人评价"
    },
    {
    "songName": "Lenka",
    "singerName": "Lenka",
    "score": "8.5",
    "coverUrl": "https://img3.doubanio.com/spic/s3259484.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "68899人评价"
    },
    {
    "songName": "Start from Here",
    "singerName": "王若琳",
    "score": "8.7",
    "coverUrl": "https://img1.doubanio.com/spic/s2874587.jpg",
    "year": "2008",
    "type": " 爵士",
    "comments": "63973人评价"
    },
    {
    "songName": "旅行的意义",
    "singerName": "陈绮贞",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s1430722.jpg",
    "year": "2004",
    "type": " 流行",
    "comments": "62124人评价"
    },
    {
    "songName": "太阳",
    "singerName": "陈绮贞",
    "score": "8.6",
    "coverUrl": "https://img3.doubanio.com/spic/s3510113.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "63958人评价"
    },
    {
    "songName": "Once (Soundtrack)",
    "singerName": "Glen Hansard...",
    "score": "9.1",
    "coverUrl": "https://img3.doubanio.com/spic/s2821080.jpg",
    "year": "2007",
    "type": " 原声",
    "comments": "61097人评价"
    },
    {
    "songName": "Not Going Anywhere",
    "singerName": "Keren Ann",
    "score": "8.9",
    "coverUrl": "https://img1.doubanio.com/spic/s1431228.jpg",
    "year": "2004",
    "type": " 民谣",
    "comments": "59758人评价"
    },
    {
    "songName": "American Idiot",
    "singerName": "Green Day",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s1485602.jpg",
    "year": "2004",
    "type": " 摇滚",
    "comments": "59337人评价"
    },
    {
    "songName": "OK",
    "singerName": "张震岳",
    "score": "8.8",
    "coverUrl": "https://img1.doubanio.com/spic/s2591057.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "53987人评价"
    },
    {
    "songName": "無與倫比的美麗",
    "singerName": "苏打绿",
    "score": "8.6",
    "coverUrl": "https://img3.doubanio.com/spic/s2757483.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "52951人评价"
    },
    {
    "songName": "亲爱的...我还不知道",
    "singerName": "张悬",
    "score": "8.5",
    "coverUrl": "https://img3.doubanio.com/spic/s2604331.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "52514人评价"
    },
    {
    "songName": "城市",
    "singerName": "张悬",
    "score": "8.3",
    "coverUrl": "https://img3.doubanio.com/spic/s3786340.jpg",
    "year": "2009",
    "type": " 摇滚",
    "comments": "51590人评价"
    },
    {
    "songName": "O",
    "singerName": "Damien Rice",
    "score": "9.1",
    "coverUrl": "https://img1.doubanio.com/spic/s2838077.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "48016人评价"
    },
    {
    "songName": "Wake Me Up When September Ends",
    "singerName": "Green Day",
    "score": "9.3",
    "coverUrl": "https://img1.doubanio.com/spic/s3572868.jpg",
    "year": "2005",
    "type": " 摇滚",
    "comments": "46557人评价"
    },
    {
    "songName": "叶惠美",
    "singerName": "周杰伦",
    "score": "8.5",
    "coverUrl": "https://img3.doubanio.com/spic/s1425762.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "49543人评价"
    },
    {
    "songName": "七里香",
    "singerName": "周杰伦",
    "score": "8.1",
    "coverUrl": "https://img3.doubanio.com/spic/s3737076.jpg",
    "year": "2004",
    "type": " 流行",
    "comments": "51234人评价"
    },
    {
    "songName": "21",
    "singerName": "Adele",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s4527315.jpg",
    "year": "2011",
    "type": " 流行",
    "comments": "46340人评价"
    },
    {
    "songName": "My Life Will...",
    "singerName": "张悬",
    "score": "8.6",
    "coverUrl": "https://img1.doubanio.com/spic/s1884457.jpg",
    "year": "2006",
    "type": " 流行",
    "comments": "47266人评价"
    },
    {
    "songName": "寓言",
    "singerName": "王菲",
    "score": "9.3",
    "coverUrl": "https://img3.doubanio.com/spic/s3336480.jpg",
    "year": "2000",
    "type": " 流行",
    "comments": "45387人评价"
    },
    {
    "songName": "你在烦恼什么",
    "singerName": "苏打绿",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s6987806.jpg",
    "year": "2011",
    "type": " 流行",
    "comments": "45781人评价"
    },
    {
    "songName": "感官/世界",
    "singerName": "林宥嘉",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s4039591.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "47167人评价"
    },
    {
    "songName": "Nevermind",
    "singerName": "Nirvana",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s1632580.jpg",
    "year": "1991",
    "type": " 摇滚",
    "comments": "43654人评价"
    },
    {
    "songName": "八度空间",
    "singerName": "周杰伦",
    "score": "8.5",
    "coverUrl": "https://img3.doubanio.com/spic/s4598636.jpg",
    "year": "2002",
    "type": " 流行",
    "comments": "45694人评价"
    },
    {
    "songName": "Jay",
    "singerName": "周杰伦",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s3120265.jpg",
    "year": "2000",
    "type": " 流行",
    "comments": "44024人评价"
    },
    {
    "songName": "Parachutes",
    "singerName": "Coldplay",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s1400723.jpg",
    "year": "2000",
    "type": " 流行",
    "comments": "43063人评价"
    },
    {
    "songName": "我要的幸福",
    "singerName": "孙燕姿",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s3524071.jpg",
    "year": "2000",
    "type": " 流行",
    "comments": "42208人评价"
    },
    {
    "songName": "还是会寂寞",
    "singerName": "陈绮贞",
    "score": "9.0",
    "coverUrl": "https://img1.doubanio.com/spic/s27076587.jpg",
    "year": "2000",
    "type": " 流行",
    "comments": "41518人评价"
    },
    {
    "songName": "Let Go",
    "singerName": "Avril Lavigne",
    "score": "8.8",
    "coverUrl": "https://img3.doubanio.com/spic/s2652911.jpg",
    "year": "2002",
    "type": " 摇滚",
    "comments": "42262人评价"
    },
    {
    "songName": "十一月的萧邦",
    "singerName": "周杰伦",
    "score": "7.9",
    "coverUrl": "https://img3.doubanio.com/spic/s1456874.jpg",
    "year": "2005",
    "type": " 流行",
    "comments": "45838人评价"
    },
    {
    "songName": "橙月",
    "singerName": "方大同",
    "score": "8.5",
    "coverUrl": "https://img1.doubanio.com/spic/s3405037.jpg",
    "year": "2008",
    "type": " 放克",
    "comments": "42508人评价"
    },
    {
    "songName": "小宇宙",
    "singerName": "苏打绿 Sodagreen",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s1883654.jpg",
    "year": "2006",
    "type": " 流行",
    "comments": "41512人评价"
    },
    {
    "songName": "若你碰到他",
    "singerName": "蔡健雅",
    "score": "8.0",
    "coverUrl": "https://img3.doubanio.com/spic/s3942165.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "44104人评价"
    },
    {
    "songName": "Lady & Bird",
    "singerName": "Lady & Bird",
    "score": "8.8",
    "coverUrl": "https://img3.doubanio.com/spic/s2376100.jpg",
    "year": "2003",
    "type": " 民谣",
    "comments": "41039人评价"
    },
    {
    "songName": "万能青年旅店",
    "singerName": "万能青年旅店",
    "score": "9.1",
    "coverUrl": "https://img1.doubanio.com/spic/s4614409.jpg",
    "year": "2010",
    "type": " 摇滚",
    "comments": "41662人评价"
    },
    {
    "songName": "Meteora",
    "singerName": "Linkin Park",
    "score": "9.0",
    "coverUrl": "https://img1.doubanio.com/spic/s1401378.jpg",
    "year": "2003",
    "type": " 摇滚",
    "comments": "40048人评价"
    },
    {
    "songName": "Back To Bedlam",
    "singerName": "James Blunt",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s1461123.jpg",
    "year": "2004",
    "type": " 流行",
    "comments": "39959人评价"
    },
    {
    "songName": "苏打绿",
    "singerName": "苏打绿...",
    "score": "8.6",
    "coverUrl": "https://img3.doubanio.com/spic/s2360790.jpg",
    "year": "2005",
    "type": " 流行",
    "comments": "40827人评价"
    },
    {
    "songName": "静茹&情歌 别再为他流泪",
    "singerName": "梁静茹",
    "score": "8.4",
    "coverUrl": "https://img3.doubanio.com/spic/s3551584.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "41471人评价"
    },
    {
    "songName": "美妙生活",
    "singerName": "林宥嘉",
    "score": "8.6",
    "coverUrl": "https://img3.doubanio.com/spic/s6201192.jpg",
    "year": "2011",
    "type": " 流行",
    "comments": "40276人评价"
    },
    {
    "songName": "Le Fabuleux destin d'Amélie Poulain",
    "singerName": "Yann Tiersen",
    "score": "9.3",
    "coverUrl": "https://img1.doubanio.com/spic/s2881998.jpg",
    "year": "2001",
    "type": " 原声",
    "comments": "37578人评价"
    },
    {
    "songName": "Joanna & 王若琳",
    "singerName": "王若琳",
    "score": "8.1",
    "coverUrl": "https://img3.doubanio.com/spic/s3550503.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "40172人评价"
    },
    {
    "songName": "A Plea En Vendredi",
    "singerName": "Tamas Wells",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s2783063.jpg",
    "year": "2006",
    "type": " 民谣",
    "comments": "37230人评价"
    },
    {
    "songName": "To Hebe",
    "singerName": "田馥甄（Hebe）",
    "score": "8.0",
    "coverUrl": "https://img3.doubanio.com/spic/s4466905.jpg",
    "year": "2010",
    "type": " 流行",
    "comments": "40118人评价"
    },
    {
    "songName": "逆光",
    "singerName": "孙燕姿",
    "score": "8.3",
    "coverUrl": "https://img3.doubanio.com/spic/s2333326.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "39329人评价"
    },
    {
    "songName": "只爱陌生人",
    "singerName": "王菲",
    "score": "9.3",
    "coverUrl": "https://img1.doubanio.com/spic/s3390958.jpg",
    "year": "1999",
    "type": " 流行",
    "comments": "36172人评价"
    },
    {
    "songName": "Music For Tourists",
    "singerName": "Chris Garneau",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s1989094.jpg",
    "year": "2007",
    "type": " 民谣",
    "comments": "37165人评价"
    },
    {
    "songName": "The Moment",
    "singerName": "孙燕姿",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s2794840.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "36271人评价"
    },
    {
    "songName": "七",
    "singerName": "陈奕迅",
    "score": "9.4",
    "coverUrl": "https://img3.doubanio.com/spic/s3169796.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "35457人评价"
    },
    {
    "songName": "春·日光",
    "singerName": "苏打绿",
    "score": "8.0",
    "coverUrl": "https://img1.doubanio.com/spic/s3763169.jpg",
    "year": "2009",
    "type": " 摇滚",
    "comments": "38747人评价"
    },
    {
    "songName": "100种生活",
    "singerName": "盧廣仲",
    "score": "8.3",
    "coverUrl": "https://img1.doubanio.com/spic/s3128207.jpg",
    "year": "2008",
    "type": " 民谣",
    "comments": "37833人评价"
    },
    {
    "songName": "崇拜",
    "singerName": "梁静茹",
    "score": "8.4",
    "coverUrl": "https://img1.doubanio.com/spic/s2758489.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "37446人评价"
    },
    {
    "songName": "陈绮贞精选",
    "singerName": "陈绮贞",
    "score": "9.2",
    "coverUrl": "https://img1.doubanio.com/spic/s1967258.jpg",
    "year": "2005",
    "type": " 民谣",
    "comments": "34542人评价"
    },
    {
    "songName": "菊次郎の夏",
    "singerName": "Joe Hisaishi",
    "score": "9.4",
    "coverUrl": "https://img3.doubanio.com/spic/s3272681.jpg",
    "year": "1999",
    "type": " 原声",
    "comments": "33909人评价"
    },
    {
    "songName": "Fearless",
    "singerName": "Taylor Swift",
    "score": "8.4",
    "coverUrl": "https://img3.doubanio.com/spic/s3315133.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "36908人评价"
    },
    {
    "songName": "Life In Cartoon Motion",
    "singerName": "Mika",
    "score": "8.8",
    "coverUrl": "https://img3.doubanio.com/spic/s2657592.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "35292人评价"
    },
    {
    "songName": "H³M",
    "singerName": "陈奕迅",
    "score": "8.5",
    "coverUrl": "https://img3.doubanio.com/spic/s3666735.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "36285人评价"
    },
    {
    "songName": "神秘嘉宾",
    "singerName": "林宥嘉",
    "score": "8.4",
    "coverUrl": "https://img3.doubanio.com/spic/s3113075.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "36683人评价"
    },
    {
    "songName": "Les Choristes",
    "singerName": "Bruno Coulais",
    "score": "9.4",
    "coverUrl": "https://img3.doubanio.com/spic/s1400055.jpg",
    "year": "2004",
    "type": " 原声",
    "comments": "33486人评价"
    },
    {
    "songName": "赤子",
    "singerName": "范晓萱&100%",
    "score": "8.1",
    "coverUrl": "https://img3.doubanio.com/spic/s3902012.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "37090人评价"
    },
    {
    "songName": "9",
    "singerName": "Damien Rice",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s1831581.jpg",
    "year": "2006",
    "type": " 民谣",
    "comments": "34609人评价"
    },
    {
    "songName": "将爱",
    "singerName": "王菲",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s2726841.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "35527人评价"
    },
    {
    "songName": "遇见我",
    "singerName": "曹方",
    "score": "8.4",
    "coverUrl": "https://img3.doubanio.com/spic/s1462740.jpg",
    "year": "2005",
    "type": " 流行",
    "comments": "36100人评价"
    },
    {
    "songName": "梵高先生",
    "singerName": "李志",
    "score": "8.9",
    "coverUrl": "https://img1.doubanio.com/spic/s3743777.jpg",
    "year": "2007",
    "type": " 民谣",
    "comments": "35109人评价"
    },
    {
    "songName": "Timeless 可啦思刻",
    "singerName": "方大同",
    "score": "8.3",
    "coverUrl": "https://img3.doubanio.com/spic/s27078161.jpg",
    "year": "2009",
    "type": " 放克",
    "comments": "35572人评价"
    },
    {
    "songName": "依然范特西",
    "singerName": "周杰伦",
    "score": "7.7",
    "coverUrl": "https://img3.doubanio.com/spic/s1943885.jpg",
    "year": "2006",
    "type": " 流行",
    "comments": "38020人评价"
    },
    {
    "songName": "风筝",
    "singerName": "孙燕姿",
    "score": "8.8",
    "coverUrl": "https://img3.doubanio.com/spic/s6569456.jpg",
    "year": "2001",
    "type": " 流行",
    "comments": "34154人评价"
    },
    {
    "songName": "完美的一天",
    "singerName": "孙燕姿",
    "score": "8.1",
    "coverUrl": "https://img3.doubanio.com/spic/s3524062.jpg",
    "year": "2005",
    "type": " 流行",
    "comments": "35872人评价"
    },
    {
    "songName": "Say I Am You",
    "singerName": "The Weepies",
    "score": "8.5",
    "coverUrl": "https://img1.doubanio.com/spic/s4043738.jpg",
    "year": "2006",
    "type": " 民谣",
    "comments": "34259人评价"
    },
    {
    "songName": "黑色柳丁",
    "singerName": "陶喆",
    "score": "8.8",
    "coverUrl": "https://img1.doubanio.com/spic/s27077858.jpg",
    "year": "2002",
    "type": " 流行",
    "comments": "33518人评价"
    },
    {
    "songName": "Under My Skin",
    "singerName": "Avril Lavigne",
    "score": "8.5",
    "coverUrl": "https://img1.doubanio.com/spic/s4716897.jpg",
    "year": "2004",
    "type": " 摇滚",
    "comments": "34137人评价"
    },
    {
    "songName": "Stefanie",
    "singerName": "孙燕姿",
    "score": "8.6",
    "coverUrl": "https://img3.doubanio.com/spic/s1418840.jpg",
    "year": "2004",
    "type": " 流行",
    "comments": "33642人评价"
    },
    {
    "songName": "The Fame",
    "singerName": "Lady Gaga",
    "score": "8.3",
    "coverUrl": "https://img3.doubanio.com/spic/s3224590.jpg",
    "year": "2008",
    "type": " 电子",
    "comments": "34502人评价"
    },
    {
    "songName": "Mr. A-Z",
    "singerName": "Jason Mraz",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s2761461.jpg",
    "year": "2005",
    "type": " 流行",
    "comments": "32037人评价"
    },
    {
    "songName": "为爱而生",
    "singerName": "五月天",
    "score": "8.4",
    "coverUrl": "https://img3.doubanio.com/spic/s1959251.jpg",
    "year": "2006",
    "type": " 流行",
    "comments": "33134人评价"
    },
    {
    "songName": "Daniel Powter",
    "singerName": "Daniel Powter",
    "score": "8.6",
    "coverUrl": "https://img1.doubanio.com/spic/s1661548.jpg",
    "year": "2006",
    "type": " 流行",
    "comments": "32241人评价"
    },
    {
    "songName": "I'm Yours",
    "singerName": "Jason Mraz",
    "score": "9.4",
    "coverUrl": "https://img3.doubanio.com/spic/s9074663.jpg",
    "year": "2008",
    "type": " 雷鬼",
    "comments": "30565人评价"
    },
    {
    "songName": "在动物园散步才是正经事",
    "singerName": "My Little Airport",
    "score": "8.2",
    "coverUrl": "https://img3.doubanio.com/spic/s2552894.jpg",
    "year": "2004",
    "type": " 流行",
    "comments": "33832人评价"
    },
    {
    "songName": "时光漫步",
    "singerName": "许巍",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s3839391.jpg",
    "year": "2002",
    "type": " 流行",
    "comments": "31633人评价"
    },
    {
    "songName": "生如夏花",
    "singerName": "朴树",
    "score": "8.6",
    "coverUrl": "https://img1.doubanio.com/spic/s1966937.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "32445人评价"
    },
    {
    "songName": "我很忙",
    "singerName": "周杰伦",
    "score": "7.3",
    "coverUrl": "https://img3.doubanio.com/spic/s2753832.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "36071人评价"
    },
    {
    "songName": "夏 / 狂热",
    "singerName": "苏打绿",
    "score": "8.3",
    "coverUrl": "https://img3.doubanio.com/spic/s3967123.jpg",
    "year": "2009",
    "type": " 摇滚",
    "comments": "32224人评价"
    },
    {
    "songName": "绝世名伶",
    "singerName": "范晓萱",
    "score": "8.8",
    "coverUrl": "https://img3.doubanio.com/spic/s11363103.jpg",
    "year": "2001",
    "type": " 爵士",
    "comments": "30943人评价"
    },
    {
    "songName": "哼一首歌 等日落",
    "singerName": "曹方",
    "score": "8.1",
    "coverUrl": "https://img3.doubanio.com/spic/s4052811.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "32116人评价"
    },
    {
    "songName": "未完成",
    "singerName": "孙燕姿",
    "score": "8.6",
    "coverUrl": "https://img3.doubanio.com/spic/s3524013.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "30635人评价"
    },
    {
    "songName": "OK Computer",
    "singerName": "Radiohead",
    "score": "9.2",
    "coverUrl": "https://img1.doubanio.com/spic/s2789048.jpg",
    "year": "1997",
    "type": " 摇滚",
    "comments": "29969人评价"
    },
    {
    "songName": "Born to Die",
    "singerName": "Lana Del Rey",
    "score": "8.5",
    "coverUrl": "https://img1.doubanio.com/spic/s7047247.jpg",
    "year": "2012",
    "type": " 流行",
    "comments": "31335人评价"
    },
    {
    "songName": "The Wall",
    "singerName": "Pink Floyd",
    "score": "9.1",
    "coverUrl": "https://img3.doubanio.com/spic/s2413665.jpg",
    "year": "1979",
    "type": " 摇滚",
    "comments": "29306人评价"
    },
    {
    "songName": "不要停止我的音乐",
    "singerName": "痛仰",
    "score": "8.6",
    "coverUrl": "https://img3.doubanio.com/spic/s3523286.jpg",
    "year": "2008",
    "type": " 摇滚",
    "comments": "30063人评价"
    },
    {
    "songName": "Hybrid Theory",
    "singerName": "Linkin Park",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s2838195.jpg",
    "year": "2000",
    "type": " 摇滚",
    "comments": "29039人评价"
    },
    {
    "songName": "MTV Unplugged in New York",
    "singerName": "Nirvana",
    "score": "9.5",
    "coverUrl": "https://img3.doubanio.com/spic/s3158430.jpg",
    "year": "1994",
    "type": " 摇滚",
    "comments": "27578人评价"
    },
    {
    "songName": "After 17",
    "singerName": "陈绮贞",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s4711982.jpg",
    "year": "2004年12月",
    "type": " 流行",
    "comments": "27973人评价"
    },
    {
    "songName": "In Between Dreams",
    "singerName": "Jack Johnson",
    "score": "9.0",
    "coverUrl": "https://img1.doubanio.com/spic/s4346679.jpg",
    "year": "2005",
    "type": " 民谣",
    "comments": "28211人评价"
    },
    {
    "songName": "神的孩子都在跳舞",
    "singerName": "五月天",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s3586961.jpg",
    "year": "2004",
    "type": " 摇滚",
    "comments": "28508人评价"
    },
    {
    "songName": "离开地球表面Jump!",
    "singerName": "五月天",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s27078194.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "28813人评价"
    },
    {
    "songName": "不想放手",
    "singerName": "陈奕迅",
    "score": "8.3",
    "coverUrl": "https://img3.doubanio.com/spic/s3146476.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "29751人评价"
    },
    {
    "songName": "我的歌声里",
    "singerName": "曲婉婷",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s9127241.jpg",
    "year": "2010",
    "type": " 流行",
    "comments": "27754人评价"
    },
    {
    "songName": "The Legend of 1900",
    "singerName": "Ennio Morricone",
    "score": "9.4",
    "coverUrl": "https://img3.doubanio.com/spic/s1426141.jpg",
    "year": "1999",
    "type": " 原声",
    "comments": "27218人评价"
    },
    {
    "songName": "孤独的人是可耻的",
    "singerName": "张楚",
    "score": "9.1",
    "coverUrl": "https://img3.doubanio.com/spic/s3266121.jpg",
    "year": "1994",
    "type": " 摇滚",
    "comments": "28159人评价"
    },
    {
    "songName": "徐佳瑩La La首张创作专辑",
    "singerName": "徐佳莹",
    "score": "8.2",
    "coverUrl": "https://img3.doubanio.com/spic/s3819180.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "29890人评价"
    },
    {
    "songName": "The Best Damn Thing",
    "singerName": "Avril Lavigne",
    "score": "7.7",
    "coverUrl": "https://img3.doubanio.com/spic/s2362973.jpg",
    "year": "2007",
    "type": " 摇滚",
    "comments": "31241人评价"
    },
    {
    "songName": "知足 just my pride 最真杰作选",
    "singerName": "五月天",
    "score": "9.1",
    "coverUrl": "https://img3.doubanio.com/spic/s1443616.jpg",
    "year": "2005",
    "type": " 摇滚",
    "comments": "27393人评价"
    },
    {
    "songName": "1",
    "singerName": "The Beatles",
    "score": "9.4",
    "coverUrl": "https://img3.doubanio.com/spic/s1400070.jpg",
    "year": "2000",
    "type": " 摇滚",
    "comments": "26805人评价"
    },
    {
    "songName": "魔杰座",
    "singerName": "周杰伦",
    "score": "6.9",
    "coverUrl": "https://img3.doubanio.com/spic/s3292023.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "33781人评价"
    },
    {
    "songName": "X&Y",
    "singerName": "Coldplay",
    "score": "8.4",
    "coverUrl": "https://img3.doubanio.com/spic/s1400630.jpg",
    "year": "2005",
    "type": " 摇滚",
    "comments": "28848人评价"
    },
    {
    "songName": "19",
    "singerName": "Adele",
    "score": "8.3",
    "coverUrl": "https://img3.doubanio.com/spic/s2841982.jpg",
    "year": "2008",
    "type": " 放克",
    "comments": "28765人评价"
    },
    {
    "songName": "我们在炎热与抑郁的夏天，无法停止抽烟",
    "singerName": "My Little Airport",
    "score": "8.1",
    "coverUrl": "https://img3.doubanio.com/spic/s2722802.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "29511人评价"
    },
    {
    "songName": "时光机",
    "singerName": "五月天",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s4718016.jpg",
    "year": "2003",
    "type": " 摇滚",
    "comments": "27233人评价"
    },
    {
    "songName": "Yan Zi",
    "singerName": "孙燕姿",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s4067651.jpg",
    "year": "2000",
    "type": " 流行",
    "comments": "27079人评价"
    },
    {
    "songName": "Time Flies",
    "singerName": "陈奕迅",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s4217513.jpg",
    "year": "2010",
    "type": " 流行",
    "comments": "27586人评价"
    },
    {
    "songName": "失败者的飞翔",
    "singerName": "陈绮贞",
    "score": "8.6",
    "coverUrl": "https://img1.doubanio.com/spic/s3164468.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "27652人评价"
    },
    {
    "songName": "My Love",
    "singerName": "田馥甄",
    "score": "8.0",
    "coverUrl": "https://img3.doubanio.com/spic/s6884320.jpg",
    "year": "2011",
    "type": " 流行",
    "comments": "28532人评价"
    },
    {
    "songName": "亲亲",
    "singerName": "梁静茹",
    "score": "8.1",
    "coverUrl": "https://img1.doubanio.com/spic/s1876827.jpg",
    "year": "2006",
    "type": " 流行",
    "comments": "28323人评价"
    },
    {
    "songName": "你王菲所以我王菲",
    "singerName": "王菲",
    "score": "9.4",
    "coverUrl": "https://img1.doubanio.com/spic/s2951748.jpg",
    "year": "2002",
    "type": " 流行",
    "comments": "25811人评价"
    },
    {
    "songName": "Stranger Under My Skin",
    "singerName": "陈奕迅",
    "score": "8.6",
    "coverUrl": "https://img3.doubanio.com/spic/s4644120.jpg",
    "year": "2011",
    "type": " 流行",
    "comments": "27105人评价"
    },
    {
    "songName": "Come Away with Me",
    "singerName": "Norah Jones",
    "score": "8.8",
    "coverUrl": "https://img1.doubanio.com/spic/s4714568.jpg",
    "year": "2002",
    "type": " 爵士",
    "comments": "26543人评价"
    },
    {
    "songName": "平凡之路",
    "singerName": "朴树",
    "score": "8.9",
    "coverUrl": "https://img1.doubanio.com/spic/s27326029.jpg",
    "year": "2014",
    "type": " 流行",
    "comments": "27436人评价"
    },
    {
    "songName": "认了吧",
    "singerName": "陈奕迅",
    "score": "8.7",
    "coverUrl": "https://img1.doubanio.com/spic/s3947069.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "26746人评价"
    },
    {
    "songName": "21st Century Breakdown",
    "singerName": "Green Day",
    "score": "8.5",
    "coverUrl": "https://img3.doubanio.com/spic/s3727625.jpg",
    "year": "2009",
    "type": " 摇滚",
    "comments": "26532人评价"
    },
    {
    "songName": "神的游戏",
    "singerName": "張懸",
    "score": "8.7",
    "coverUrl": "https://img1.doubanio.com/spic/s11174008.jpg",
    "year": "2012",
    "type": " 流行",
    "comments": "26501人评价"
    },
    {
    "songName": "唱游",
    "singerName": "王菲",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s2749634.jpg",
    "year": "1998",
    "type": " 流行",
    "comments": "25711人评价"
    },
    {
    "songName": "花的姿态：演唱会经典实录",
    "singerName": "陈绮贞",
    "score": "9.2",
    "coverUrl": "https://img1.doubanio.com/spic/s2377978.jpg",
    "year": "2007",
    "type": " CD",
    "comments": "24826人评价"
    },
    {
    "songName": "我去2000年",
    "singerName": "朴树",
    "score": "9.1",
    "coverUrl": "https://img1.doubanio.com/spic/s4715377.jpg",
    "year": "1999",
    "type": " 流行",
    "comments": "25843人评价"
    },
    {
    "songName": "Young For You",
    "singerName": "GALA",
    "score": "8.7",
    "coverUrl": "https://img1.doubanio.com/spic/s1629838.jpg",
    "year": "2004",
    "type": " 摇滚",
    "comments": "25877人评价"
    },
    {
    "songName": "自选集",
    "singerName": "孙燕姿",
    "score": "8.9",
    "coverUrl": "https://img1.doubanio.com/spic/s3151869.jpg",
    "year": "2002",
    "type": " 流行",
    "comments": "25306人评价"
    },
    {
    "songName": "理性与感性作品音乐会",
    "singerName": "李宗盛",
    "score": "9.5",
    "coverUrl": "https://img3.doubanio.com/spic/s2891182.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "24242人评价"
    },
    {
    "songName": "比天空还远",
    "singerName": "曹方",
    "score": "8.5",
    "coverUrl": "https://img3.doubanio.com/spic/s2755385.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "26044人评价"
    },
    {
    "songName": "黑梦",
    "singerName": "窦唯",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s3081692.jpg",
    "year": "1994",
    "type": " 摇滚",
    "comments": "25257人评价"
    },
    {
    "songName": "介乎法國與旺角的詩意",
    "singerName": "My Little Airport",
    "score": "8.1",
    "coverUrl": "https://img3.doubanio.com/spic/s4057285.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "26879人评价"
    },
    {
    "songName": "不能说的秘密",
    "singerName": "周杰倫...",
    "score": "8.7",
    "coverUrl": "https://img1.doubanio.com/spic/s2652097.jpg",
    "year": "2007",
    "type": " 原声",
    "comments": "25712人评价"
    },
    {
    "songName": "丝路",
    "singerName": "梁静茹",
    "score": "8.2",
    "coverUrl": "https://img3.doubanio.com/spic/s27986033.jpg",
    "year": "2005",
    "type": " 流行",
    "comments": "25920人评价"
    },
    {
    "songName": "All The Lost Souls",
    "singerName": "James Blunt",
    "score": "8.5",
    "coverUrl": "https://img3.doubanio.com/spic/s2609413.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "25038人评价"
    },
    {
    "songName": "F.I.R.",
    "singerName": "F.I.R....",
    "score": "8.6",
    "coverUrl": "https://img3.doubanio.com/spic/s4124010.jpg",
    "year": "2004",
    "type": " 流行",
    "comments": "25325人评价"
    },
    {
    "songName": "上五楼的快活",
    "singerName": "陈奕迅",
    "score": "7.7",
    "coverUrl": "https://img3.doubanio.com/spic/s3969572.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "26938人评价"
    },
    {
    "songName": "Minutes to Midnight",
    "singerName": "Linkin Park",
    "score": "8.2",
    "coverUrl": "https://img3.doubanio.com/spic/s2665031.jpg",
    "year": "2007",
    "type": " 摇滚",
    "comments": "25225人评价"
    },
    {
    "songName": "GOODBYE & HELLO",
    "singerName": "蔡健雅...",
    "score": "8.6",
    "coverUrl": "https://img1.doubanio.com/spic/s27067658.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "24652人评价"
    },
    {
    "songName": "Someone Like You",
    "singerName": "Adele",
    "score": "9.5",
    "coverUrl": "https://img3.doubanio.com/spic/s4689205.jpg",
    "year": "2011",
    "type": " 流行",
    "comments": "23150人评价"
    },
    {
    "songName": "迟到千年",
    "singerName": "苏打绿",
    "score": "8.8",
    "coverUrl": "https://img3.doubanio.com/spic/s4567536.jpg",
    "year": "2006",
    "type": " 流行",
    "comments": "23573人评价"
    },
    {
    "songName": "The Dark Side of the Moon",
    "singerName": "Pink Floyd",
    "score": "9.1",
    "coverUrl": "https://img3.doubanio.com/spic/s1476691.jpg",
    "year": "1973",
    "type": " 摇滚",
    "comments": "23845人评价"
    },
    {
    "songName": "王菲 2001",
    "singerName": "王菲",
    "score": "9.1",
    "coverUrl": "https://img3.doubanio.com/spic/s27066361.jpg",
    "year": "2001",
    "type": " 流行",
    "comments": "23410人评价"
    },
    {
    "songName": "夜空中最亮的星",
    "singerName": "逃跑计划",
    "score": "9.5",
    "coverUrl": "https://img3.doubanio.com/spic/s7050455.jpg",
    "year": "2011",
    "type": " 流行",
    "comments": "23025人评价"
    },
    {
    "songName": "追梦痴子心",
    "singerName": "GALA",
    "score": "8.8",
    "coverUrl": "https://img1.doubanio.com/spic/s26743139.jpg",
    "year": "2011",
    "type": " 流行",
    "comments": "23841人评价"
    },
    {
    "songName": "宝贝",
    "singerName": "莫文蔚",
    "score": "7.9",
    "coverUrl": "https://img3.doubanio.com/spic/s4425103.jpg",
    "year": "2010",
    "type": " 流行",
    "comments": "25045人评价"
    },
    {
    "songName": "黑白灰",
    "singerName": "陈奕迅",
    "score": "9.1",
    "coverUrl": "https://img3.doubanio.com/spic/s4088274.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "22787人评价"
    },
    {
    "songName": "安和桥北",
    "singerName": "宋冬野",
    "score": "8.7",
    "coverUrl": "https://img1.doubanio.com/spic/s27029428.jpg",
    "year": "2013",
    "type": " 民谣",
    "comments": "24467人评价"
    },
    {
    "songName": "Prisoner of Love",
    "singerName": "宇多田ヒカル",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s3104656.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "22308人评价"
    },
    {
    "songName": "Groupies 吉他手",
    "singerName": "陈绮贞",
    "score": "9.1",
    "coverUrl": "https://img3.doubanio.com/spic/s3268875.jpg",
    "year": "2002",
    "type": " 流行",
    "comments": "22523人评价"
    },
    {
    "songName": "Now The Day Is Over",
    "singerName": "The Innocence Mission",
    "score": "8.4",
    "coverUrl": "https://img3.doubanio.com/spic/s1506405.jpg",
    "year": "2004",
    "type": " 民谣",
    "comments": "23739人评价"
    },
    {
    "songName": "Apologize",
    "singerName": "Timbaland...",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s6780751.jpg",
    "year": "2007",
    "type": " 摇滚",
    "comments": "22600人评价"
    },
    {
    "songName": "阿菲正传",
    "singerName": "王菲",
    "score": "9.4",
    "coverUrl": "https://img3.doubanio.com/spic/s3850703.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "22011人评价"
    },
    {
    "songName": "跨时代",
    "singerName": "周杰伦",
    "score": "7.0",
    "coverUrl": "https://img1.doubanio.com/spic/s4364499.jpg",
    "year": "2010",
    "type": " 雷鬼",
    "comments": "26870人评价"
    },
    {
    "songName": "Leave",
    "singerName": "孙燕姿",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s2693584.jpg",
    "year": "2002",
    "type": " 流行",
    "comments": "22853人评价"
    },
    {
    "songName": "被禁忌的游戏",
    "singerName": "李志",
    "score": "8.8",
    "coverUrl": "https://img1.doubanio.com/spic/s2650727.jpg",
    "year": "2005",
    "type": " 民谣",
    "comments": "22967人评价"
    },
    {
    "songName": "What's Going On....?",
    "singerName": "陈奕迅",
    "score": "9.1",
    "coverUrl": "https://img3.doubanio.com/spic/s1933423.jpg",
    "year": "2006",
    "type": " 流行",
    "comments": "22103人评价"
    },
    {
    "songName": "第二人生 末日版",
    "singerName": "五月天",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s7021494.jpg",
    "year": "2011",
    "type": " 流行",
    "comments": "22211人评价"
    },
    {
    "songName": "樂之路",
    "singerName": "陶喆",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s3522345.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "21987人评价"
    },
    {
    "songName": "It Won't Be Soon Before Long",
    "singerName": "Maroon 5",
    "score": "8.2",
    "coverUrl": "https://img3.doubanio.com/spic/s2374986.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "23113人评价"
    },
    {
    "songName": "如果你冷",
    "singerName": "张悬",
    "score": "8.3",
    "coverUrl": "https://img1.doubanio.com/spic/s3321977.jpg",
    "year": "2008",
    "type": " 民谣",
    "comments": "23210人评价"
    },
    {
    "songName": "陌生人",
    "singerName": "蔡健雅 Tanya Chua",
    "score": "8.7",
    "coverUrl": "https://img1.doubanio.com/spic/s1647637.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "22483人评价"
    },
    {
    "songName": "浮躁",
    "singerName": "王菲",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s3631071.jpg",
    "year": "1996",
    "type": " 摇滚",
    "comments": "22348人评价"
    },
    {
    "songName": "C'est La Vie",
    "singerName": "自然卷",
    "score": "8.2",
    "coverUrl": "https://img3.doubanio.com/spic/s1446010.jpg",
    "year": "2004",
    "type": " 民谣",
    "comments": "23267人评价"
    },
    {
    "songName": "在一起",
    "singerName": "刘若英",
    "score": "7.8",
    "coverUrl": "https://img3.doubanio.com/spic/s4305186.jpg",
    "year": "2010",
    "type": " 流行",
    "comments": "23746人评价"
    },
    {
    "songName": "These Friends Of Mine",
    "singerName": "Rosie Thomas",
    "score": "8.7",
    "coverUrl": "https://img1.doubanio.com/spic/s2674348.jpg",
    "year": "2007",
    "type": " 民谣",
    "comments": "22112人评价"
    },
    {
    "songName": "陪我歌唱",
    "singerName": "苏打绿",
    "score": "9.1",
    "coverUrl": "https://img3.doubanio.com/spic/s3076261.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "21282人评价"
    },
    {
    "songName": "It's Not Me, It's You",
    "singerName": "Lily Allen",
    "score": "8.5",
    "coverUrl": "https://img3.doubanio.com/spic/s4716636.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "23009人评价"
    },
    {
    "songName": "The Rose~I Love Cinemas~",
    "singerName": "手嶌葵",
    "score": "9.2",
    "coverUrl": "https://img1.doubanio.com/spic/s2969728.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "21012人评价"
    },
    {
    "songName": "我爱南京",
    "singerName": "李志",
    "score": "8.6",
    "coverUrl": "https://img3.doubanio.com/spic/s4008894.jpg",
    "year": "2009",
    "type": " 民谣",
    "comments": "22125人评价"
    },
    {
    "songName": "消失的光年",
    "singerName": "大乔小乔",
    "score": "8.2",
    "coverUrl": "https://img1.doubanio.com/spic/s2616588.jpg",
    "year": "2007",
    "type": " 民谣",
    "comments": "22102人评价"
    },
    {
    "songName": "还有别的办法吗",
    "singerName": "范晓萱",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s3636124.jpg",
    "year": "2004",
    "type": " 流行",
    "comments": "21242人评价"
    },
    {
    "songName": "日光倾城",
    "singerName": "卡奇社",
    "score": "8.1",
    "coverUrl": "https://img3.doubanio.com/spic/s2378153.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "22274人评价"
    },
    {
    "songName": "A Little Love",
    "singerName": "冯曦妤",
    "score": "8.4",
    "coverUrl": "https://img3.doubanio.com/spic/s3350764.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "21477人评价"
    },
    {
    "songName": "Yellow",
    "singerName": "Coldplay",
    "score": "9.3",
    "coverUrl": "https://img3.doubanio.com/spic/s4087364.jpg",
    "year": "2000",
    "type": " 摇滚",
    "comments": "20798人评价"
    },
    {
    "songName": "Hopes And Fears",
    "singerName": "Keane",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s1492974.jpg",
    "year": "2004",
    "type": " 摇滚",
    "comments": "20662人评价"
    },
    {
    "songName": "U87",
    "singerName": "陈奕迅",
    "score": "9.3",
    "coverUrl": "https://img3.doubanio.com/spic/s3856032.jpg",
    "year": "2005",
    "type": " 流行",
    "comments": "20292人评价"
    },
    {
    "songName": "Lady Sleep",
    "singerName": "Maximilian Hecker",
    "score": "8.8",
    "coverUrl": "https://img1.doubanio.com/spic/s1794177.jpg",
    "year": "2005",
    "type": " 民谣",
    "comments": "20679人评价"
    },
    {
    "songName": "天空の城ラピュタ サウンドトラック 飛行石の謎",
    "singerName": "久石譲(Joe Hisaishi)...",
    "score": "9.5",
    "coverUrl": "https://img3.doubanio.com/spic/s1489321.jpg",
    "year": "1993",
    "type": " 原声",
    "comments": "19514人评价"
    },
    {
    "songName": "新长征路上的摇滚",
    "singerName": "崔健",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s8868552.jpg",
    "year": "1989",
    "type": " 摇滚",
    "comments": "20329人评价"
    },
    {
    "songName": "小飞行",
    "singerName": "棉花糖...",
    "score": "7.9",
    "coverUrl": "https://img3.doubanio.com/spic/s4715963.jpg",
    "year": "2009",
    "type": " 民谣",
    "comments": "21886人评价"
    },
    {
    "songName": "春生",
    "singerName": "好妹妹乐队",
    "score": "8.8",
    "coverUrl": "https://img1.doubanio.com/spic/s11095208.jpg",
    "year": "2012",
    "type": " 民谣",
    "comments": "20478人评价"
    },
    {
    "songName": "讓我想一想",
    "singerName": "陈绮贞",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s3821060.jpg",
    "year": "1998",
    "type": " 民谣",
    "comments": "20050人评价"
    },
    {
    "songName": "未来",
    "singerName": "方大同",
    "score": "8.3",
    "coverUrl": "https://img3.doubanio.com/spic/s2839973.jpg",
    "year": "2007",
    "type": " 放克",
    "comments": "21060人评价"
    },
    {
    "songName": "爱爱爱",
    "singerName": "方大同",
    "score": "8.6",
    "coverUrl": "https://img3.doubanio.com/spic/s1981880.jpg",
    "year": "2006",
    "type": " 流行",
    "comments": "20431人评价"
    },
    {
    "songName": "世界",
    "singerName": "逃跑计划",
    "score": "9.0",
    "coverUrl": "https://img1.doubanio.com/spic/s28104019.jpg",
    "year": "2011",
    "type": " 摇滚",
    "comments": "20051人评价"
    },
    {
    "songName": "七天",
    "singerName": "卢广仲",
    "score": "7.8",
    "coverUrl": "https://img3.doubanio.com/spic/s4039256.jpg",
    "year": "2009",
    "type": " 说唱",
    "comments": "21594人评价"
    },
    {
    "songName": "Nirvana",
    "singerName": "Nirvana",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s3020073.jpg",
    "year": "2002",
    "type": " 摇滚",
    "comments": "19230人评价"
    },
    {
    "songName": "A Rush of  Blood to the Head",
    "singerName": "Coldplay",
    "score": "8.6",
    "coverUrl": "https://img3.doubanio.com/spic/s8904216.jpg",
    "year": "2002",
    "type": " 流行",
    "comments": "20229人评价"
    },
    {
    "songName": "The Velvet Underground & Nico",
    "singerName": "The Velvet Underground...",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s1883423.jpg",
    "year": "1967",
    "type": " 摇滚",
    "comments": "19984人评价"
    },
    {
    "songName": "Love The Way You Lie",
    "singerName": "Eminem...",
    "score": "9.3",
    "coverUrl": "https://img1.doubanio.com/spic/s4420058.jpg",
    "year": "2010",
    "type": " 说唱",
    "comments": "19351人评价"
    },
    {
    "songName": "天空",
    "singerName": "王菲",
    "score": "9.3",
    "coverUrl": "https://img3.doubanio.com/spic/s3681285.jpg",
    "year": "1994",
    "type": " 流行",
    "comments": "19366人评价"
    },
    {
    "songName": "The Boat That Rocked",
    "singerName": "Original Soundtrack",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s4194004.jpg",
    "year": "2009",
    "type": " CD",
    "comments": "18959人评价"
    },
    {
    "songName": "(What's The Story) Morning Glory?",
    "singerName": "Oasis",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s1944493.jpg",
    "year": "1995",
    "type": " 摇滚",
    "comments": "19424人评价"
    },
    {
    "songName": "PUSSY",
    "singerName": "陈绮贞",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s2144095.jpg",
    "year": "2007",
    "type": " 民谣",
    "comments": "19737人评价"
    },
    {
    "songName": "呼吸",
    "singerName": "Salyu",
    "score": "9.0",
    "coverUrl": "https://img1.doubanio.com/spic/s2714357.jpg",
    "year": "2001",
    "type": " 原声",
    "comments": "19278人评价"
    },
    {
    "songName": "Fallen",
    "singerName": "Evanescence",
    "score": "8.5",
    "coverUrl": "https://img3.doubanio.com/spic/s2189392.jpg",
    "year": "2003",
    "type": " 摇滚",
    "comments": "20002人评价"
    },
    {
    "songName": "黑豹",
    "singerName": "黑豹",
    "score": "9.1",
    "coverUrl": "https://img3.doubanio.com/spic/s1401153.jpg",
    "year": "1992",
    "type": " 摇滚",
    "comments": "19285人评价"
    },
    {
    "songName": "十年一刻",
    "singerName": "苏打绿",
    "score": "8.8",
    "coverUrl": "https://img1.doubanio.com/spic/s4424848.jpg",
    "year": "2010",
    "type": " 流行",
    "comments": "19503人评价"
    },
    {
    "songName": "恋爱的力量",
    "singerName": "梁静茹",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s3530552.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "19261人评价"
    },
    {
    "songName": "Suede",
    "singerName": "Suede",
    "score": "8.9",
    "coverUrl": "https://img3.doubanio.com/spic/s1496506.jpg",
    "year": "1993",
    "type": " 流行",
    "comments": "19493人评价"
    },
    {
    "songName": "The Bends",
    "singerName": "Radiohead",
    "score": "9.1",
    "coverUrl": "https://img1.doubanio.com/spic/s4713649.jpg",
    "year": "1995",
    "type": " 摇滚",
    "comments": "19372人评价"
    },
    {
    "songName": "琵琶相",
    "singerName": "林海",
    "score": "9.3",
    "coverUrl": "https://img3.doubanio.com/spic/s4716282.jpg",
    "year": "2004",
    "type": " 轻音乐",
    "comments": "18653人评价"
    },
    {
    "songName": "？",
    "singerName": "陈奕迅",
    "score": "8.0",
    "coverUrl": "https://img1.doubanio.com/spic/s6988468.jpg",
    "year": "2011",
    "type": " 流行",
    "comments": "20810人评价"
    },
    {
    "songName": "少年故事",
    "singerName": "彭坦",
    "score": "8.0",
    "coverUrl": "https://img3.doubanio.com/spic/s2616115.jpg",
    "year": "2007",
    "type": " 流行",
    "comments": "20383人评价"
    },
    {
    "songName": "黑暗之光",
    "singerName": "雷光夏",
    "score": "8.8",
    "coverUrl": "https://img3.doubanio.com/spic/s1960062.jpg",
    "year": "2006",
    "type": " 民谣",
    "comments": "19180人评价"
    },
    {
    "songName": "我要我们在一起",
    "singerName": "范晓萱",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s1432740.jpg",
    "year": "1999",
    "type": " 流行",
    "comments": "18638人评价"
    },
    {
    "songName": "人生海海",
    "singerName": "五月天",
    "score": "9.2",
    "coverUrl": "https://img1.doubanio.com/spic/s1945209.jpg",
    "year": "2001",
    "type": " 摇滚",
    "comments": "18540人评价"
    },
    {
    "songName": "Maybe I'm Dreaming",
    "singerName": "Owl City",
    "score": "8.4",
    "coverUrl": "https://img3.doubanio.com/spic/s3409351.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "19456人评价"
    },
    {
    "songName": "工体东路没有人",
    "singerName": "李志",
    "score": "9.0",
    "coverUrl": "https://img1.doubanio.com/spic/s3561838.jpg",
    "year": "2009",
    "type": " 民谣",
    "comments": "18749人评价"
    },
    {
    "songName": "Let It Be",
    "singerName": "The Beatles",
    "score": "9.3",
    "coverUrl": "https://img3.doubanio.com/spic/s1410146.jpg",
    "year": "1990",
    "type": " 摇滚",
    "comments": "18094人评价"
    },
    {
    "songName": "Alright,Still",
    "singerName": "Lily Allen",
    "score": "8.3",
    "coverUrl": "https://img3.doubanio.com/spic/s2824792.jpg",
    "year": "2006",
    "type": " 流行",
    "comments": "19331人评价"
    },
    {
    "songName": "大小說家",
    "singerName": "林宥嘉",
    "score": "7.9",
    "coverUrl": "https://img1.doubanio.com/spic/s10385947.jpg",
    "year": "2012",
    "type": " 流行",
    "comments": "19954人评价"
    },
    {
    "songName": "越长大越孤单",
    "singerName": "牛奶@咖啡",
    "score": "7.6",
    "coverUrl": "https://img3.doubanio.com/spic/s2975545.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "20601人评价"
    },
    {
    "songName": "燕尾蝶",
    "singerName": "梁静茹",
    "score": "8.0",
    "coverUrl": "https://img1.doubanio.com/spic/s3595798.jpg",
    "year": "2004",
    "type": " 流行",
    "comments": "19956人评价"
    },
    {
    "songName": "原谅我就是这样的女生",
    "singerName": "戴佩妮",
    "score": "7.6",
    "coverUrl": "https://img3.doubanio.com/spic/s3780711.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "20489人评价"
    },
    {
    "songName": "传奇",
    "singerName": "王菲",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s4185764.jpg",
    "year": "2010",
    "type": " 民谣",
    "comments": "18149人评价"
    },
    {
    "songName": "Under the Radar",
    "singerName": "Daniel Powter",
    "score": "8.3",
    "coverUrl": "https://img1.doubanio.com/spic/s3273497.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "18953人评价"
    },
    {
    "songName": "知足 MV / Karaoke DVD",
    "singerName": "五月天",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s4713371.jpg",
    "year": "2006",
    "type": " 流行",
    "comments": "17722人评价"
    },
    {
    "songName": "我的歌声里",
    "singerName": "曲婉婷",
    "score": "7.7",
    "coverUrl": "https://img3.doubanio.com/spic/s11176273.jpg",
    "year": "2012",
    "type": " 流行",
    "comments": "18612人评价"
    },
    {
    "songName": "王菲",
    "singerName": "王菲",
    "score": "9.2",
    "coverUrl": "https://img3.doubanio.com/spic/s3336530.jpg",
    "year": "1997",
    "type": " 流行",
    "comments": "18356人评价"
    },
    {
    "songName": "信仰在空中飘扬",
    "singerName": "汪峰",
    "score": "8.7",
    "coverUrl": "https://img1.doubanio.com/spic/s3910069.jpg",
    "year": "2009",
    "type": " 摇滚",
    "comments": "18413人评价"
    },
    {
    "songName": "[i]",
    "singerName": "莫文蔚",
    "score": "8.7",
    "coverUrl": "https://img1.doubanio.com/spic/s3944348.jpg",
    "year": "2002",
    "type": " 流行",
    "comments": "18514人评价"
    },
    {
    "songName": "Songs About Jane",
    "singerName": "Maroon 5",
    "score": "8.5",
    "coverUrl": "https://img3.doubanio.com/spic/s3377025.jpg",
    "year": "2002",
    "type": " 流行",
    "comments": "18453人评价"
    },
    {
    "songName": "Back To Black",
    "singerName": "Amy Winehouse",
    "score": "8.5",
    "coverUrl": "https://img3.doubanio.com/spic/s2146936.jpg",
    "year": "2006",
    "type": " 放克",
    "comments": "18467人评价"
    },
    {
    "songName": "Demo 3",
    "singerName": "陈绮贞",
    "score": "9.1",
    "coverUrl": "https://img1.doubanio.com/spic/s4571919.jpg",
    "year": "2001",
    "type": " 流行",
    "comments": "17563人评价"
    },
    {
    "songName": "克卜勒",
    "singerName": "孙燕姿",
    "score": "8.4",
    "coverUrl": "https://img1.doubanio.com/spic/s27220328.jpg",
    "year": "2014",
    "type": " 流行",
    "comments": "18579人评价"
    },
    {
    "songName": "E=MC²",
    "singerName": "Mariah Carey",
    "score": "8.5",
    "coverUrl": "https://img1.doubanio.com/spic/s2982879.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "18180人评价"
    },
    {
    "songName": "9 Crimes",
    "singerName": "Damien Rice",
    "score": "9.4",
    "coverUrl": "https://img3.doubanio.com/spic/s3341606.jpg",
    "year": "2006",
    "type": " 民谣",
    "comments": "16912人评价"
    },
    {
    "songName": "如果有一件事是重要的",
    "singerName": "陈珊妮",
    "score": "8.2",
    "coverUrl": "https://img3.doubanio.com/spic/s3285190.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "18439人评价"
    },
    {
    "songName": "赤裸裸",
    "singerName": "郑钧",
    "score": "8.8",
    "coverUrl": "https://img3.doubanio.com/spic/s9105445.jpg",
    "year": "1994",
    "type": " 摇滚",
    "comments": "17695人评价"
    },
    {
    "songName": "阿岳正传",
    "singerName": "张震岳",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s3899296.jpg",
    "year": "2004",
    "type": " 流行",
    "comments": "17218人评价"
    },
    {
    "songName": "3颗猫饼干",
    "singerName": "朱玫玲...",
    "score": "9.1",
    "coverUrl": "https://img1.doubanio.com/spic/s1416778.jpg",
    "year": "2004",
    "type": " CD",
    "comments": "16852人评价"
    },
    {
    "songName": "21 Guns",
    "singerName": "Green Day",
    "score": "9.2",
    "coverUrl": "https://img1.doubanio.com/spic/s4468079.jpg",
    "year": "2009",
    "type": " 摇滚",
    "comments": "16967人评价"
    },
    {
    "songName": "看我72变",
    "singerName": "蔡依林",
    "score": "8.2",
    "coverUrl": "https://img1.doubanio.com/spic/s3848098.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "19235人评价"
    },
    {
    "songName": "第二人生 明日版",
    "singerName": "五月天",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s7018733.jpg",
    "year": "2011",
    "type": " 流行",
    "comments": "16978人评价"
    },
    {
    "songName": "Definitely Maybe",
    "singerName": "Oasis",
    "score": "9.0",
    "coverUrl": "https://img3.doubanio.com/spic/s4714001.jpg",
    "year": "1994",
    "type": " 摇滚",
    "comments": "17287人评价"
    },
    {
    "songName": "First Love",
    "singerName": "宇多田ヒカル",
    "score": "9.1",
    "coverUrl": "https://img1.doubanio.com/spic/s1490767.jpg",
    "year": "1999",
    "type": " 流行",
    "comments": "17057人评价"
    },
    {
    "songName": "阿密特",
    "singerName": "张惠妹",
    "score": "7.7",
    "coverUrl": "https://img3.doubanio.com/spic/s3856684.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "18867人评价"
    },
    {
    "songName": "心跳",
    "singerName": "王力宏",
    "score": "7.1",
    "coverUrl": "https://img3.doubanio.com/spic/s3485794.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "19765人评价"
    },
    {
    "songName": "xx",
    "singerName": "The xx",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s3962066.jpg",
    "year": "2009",
    "type": " 摇滚",
    "comments": "17465人评价"
    },
    {
    "songName": "回蔚",
    "singerName": "莫文蔚",
    "score": "8.0",
    "coverUrl": "https://img3.doubanio.com/spic/s3885892.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "18241人评价"
    },
    {
    "songName": "如果看見地獄，我就不怕魔鬼",
    "singerName": "Tizzy Bac",
    "score": "8.1",
    "coverUrl": "https://img3.doubanio.com/spic/s3751353.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "17997人评价"
    },
    {
    "songName": "我们是五月天",
    "singerName": "五月天",
    "score": "9.3",
    "coverUrl": "https://img1.doubanio.com/spic/s27076627.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "16407人评价"
    },
    {
    "songName": "王妃",
    "singerName": "萧敬腾",
    "score": "7.7",
    "coverUrl": "https://img1.doubanio.com/spic/s3885797.jpg",
    "year": "2009",
    "type": " 流行",
    "comments": "18251人评价"
    },
    {
    "songName": "Poker Face",
    "singerName": "Lady Gaga",
    "score": "8.7",
    "coverUrl": "https://img3.doubanio.com/spic/s3598342.jpg",
    "year": "2008",
    "type": " 流行",
    "comments": "17092人评价"
    },
    {
    "songName": "唐朝",
    "singerName": "唐朝",
    "score": "9.0",
    "coverUrl": "https://img1.doubanio.com/spic/s8903729.jpg",
    "year": "1992",
    "type": " 摇滚",
    "comments": "16731人评价"
    },
    {
    "songName": "寻找周杰伦",
    "singerName": "周杰伦",
    "score": "8.5",
    "coverUrl": "https://img1.doubanio.com/spic/s3726558.jpg",
    "year": "2003",
    "type": " 流行",
    "comments": "17371人评价"
    },
    {
    "songName": "她说",
    "singerName": "林俊杰",
    "score": "7.7",
    "coverUrl": "https://img3.doubanio.com/spic/s4550552.jpg",
    "year": "2010",
    "type": " 流行",
    "comments": "18412人评价"
    }
]
    return d
}

const fetchMusic = function() {
    // 直接使用 JSON 数据 不从后台获取
    var d = musicJSON()
    renderChart(d)
}

const initedChart = function() {
    _.each(chartStore, (v, k) => {
        const element = document.getElementById(k)
        const chart = echarts.init(element)
        chartStore[k] = chart
    })
}

const __main = function() {
    initedChart()
    fetchMusic()
}

// 页面内容(只包括元素, 不包括元素引用的图片)载入完毕之后的回调事件
$(document).ready(function() {
    __main()
})

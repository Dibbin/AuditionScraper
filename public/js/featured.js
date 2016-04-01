var liveFeedIndex = 1;
var ids = new Array();
var nextFactCounter = 0;
var factsArray = new Array('any vessel size','any batch size','beer, wine, cider','gravity & temperature','celsius & fahrenheit');
var active = 1;
var chart1, chart2;

function postGraphs(idx, rangex)
{
	$('#gravity').hide();
	$(function () {
		$.ajax({
			type: "POST",
			dataType: "json",
			url: '//www.thebeerbug.com/assets/lib/graph.php',
			data: {action: "getGraph", id:idx, range:rangex},
			beforeSend: function()
			{
				$('#container1').html("LOADING...");
				$('#container1Mobile').html("LOADING...");
			},
			success: function(data)
			{
				if (data.success)
				{
					if(data.dates.length == 0)
					{
						$('#container1').html("no data...");
						$('#container1Mobile').html("no data...");
					}
					else
					{
						var sgData = new Array();
						var tempData = new Array();
						var alData = new Array();
						var i = 0;
						for(i = 0; i<data.dates.length; i++)
						{
							var d = data.dates[i].split(",");
							var actualDate = Date.UTC(d[0],d[1],d[2],d[3],d[4],d[5]);
							var dataArray = new Array(actualDate,parseFloat(data.sg[i]));
							var dataArray2 = new Array(actualDate,parseFloat(data.temp[i]));
							var dataArray3 = new Array(actualDate,parseFloat(data.al[i]));
							sgData[i] = dataArray;
							tempData[i] = dataArray2;
							alData[i] = dataArray3;
						}

						chart1 = new Highcharts.Chart({
							chart:
							{
								zoomType: 'x',
								renderTo: 'container1',
								spacingTop: 20,
								spacingRight: 20,
								spacingBottom: 9,
								marginLeft: 33,
								height: 150,
								backgroundColor: {
					                linearGradient: [0, 0, 0, 100],
					                stops: [
					                    [0, 'rgb(0, 230, 140)'],
					                    [1, 'rgb(1, 193, 116)']
					                    ]
					            },
								resetZoomButton: {
							        theme: {
							            display: 'none'
							        }
							    },
			   					zoomType: null
							},
							credits:
							{
								enabled: false
							},
							title:
							{
								text: ''
							},
							xAxis:
							{
								type: 'datetime',
								maxZoom: 50000,
								title:
								{
									text: null
								},
								labels: {
									style: {
										color: "rgba(255, 255, 255, 1)",
										fontSize: '7px'
									}
								},
								offset: -10,
								tickLength: 0
							},
							yAxis:
							{
								title:
								{
									text: ''
								},
								tickInterval: 0.025,
								labels: {
						            format: '{value:.3f}'
						        },
								labels: {
									style: {
										color: "rgba(255, 255, 255, 1)",
										fontSize: '7px'
									}
								},
								gridLineColor: '#FFFFFF',
								offset: -10,
							},
							tooltip:
							{
								enabled: false,
								formatter: function() {
						          return Highcharts.dateFormat("%a, %b %d, %H:%M:%S", this.x) + "<br/>SG: " + this.y.toFixed(4);
						        }
							},
							legend:
							{
								enabled: false
							},
							navigation:
							{
								buttonOptions:
								{
									enabled: false
								}
							},
							plotOptions:
							{
								area:
								{
									fillColor: {
				                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
				                        stops: [
				                            [0, '#007231'],
				                            [1, '#01C272']
				                        ]
				                    },
									lineWidth: 1.5,
									marker:
									{
										enabled: true,
										fillColor: '#FFFFFF',
										lineWidth: 0,
										radius: 2,
										lineColor: '#FFFFFF',
										states: {
				                        hover: {
												enabled: false,
					                            lineColor: '#FFFFFF'
					                        }
					                    }
									},
									shadow: false,
									threshold: null,
								},
								series: {
									lineColor: '#ffffff',
		        					lineWidth: 0,
								}
							},
							series:
							[{
								type: 'area',
								name: 'SG',
								pointInterval: 188000,
								data: sgData
							}]
						});

						chart2 = new Highcharts.Chart({
							chart:
							{
								zoomType: 'x',
								renderTo: 'container1Mobile',
								spacingTop: 20,
								spacingRight: 20,
								spacingBottom: 9,
								marginLeft: 33,
								height: 150,
								backgroundColor: {
					                linearGradient: [0, 0, 0, 100],
					                stops: [
					                    [0, 'rgb(0, 230, 140)'],
					                    [1, 'rgb(1, 193, 116)']
					                    ]
					            },
								resetZoomButton: {
							        theme: {
							            display: 'none'
							        }
							    },
			   					zoomType: null
							},
							credits:
							{
								enabled: false
							},
							title:
							{
								text: ''
							},
							xAxis:
							{
								type: 'datetime',
								maxZoom: 50000,
								title:
								{
									text: null
								},
								labels: {
									style: {
										color: "rgba(255, 255, 255, 1)",
										fontSize: '7px'
									}
								},
								offset: -10,
								tickLength: 0
							},
							yAxis:
							{
								title:
								{
									text: ''
								},
								tickInterval: 0.025,
								labels: {
						            format: '{value:.3f}'
						        },
								labels: {
									style: {
										color: "rgba(255, 255, 255, 1)",
										fontSize: '7px'
									}
								},
								gridLineColor: '#FFFFFF',
								offset: -10,
							},
							tooltip:
							{
								enabled: false,
								formatter: function() {
						          return Highcharts.dateFormat("%a, %b %d, %H:%M:%S", this.x) + "<br/>SG: " + this.y.toFixed(3);
						        }
							},
							legend:
							{
								enabled: false
							},
							navigation:
							{
								buttonOptions:
								{
									enabled: false
								}
							},
							plotOptions:
							{
								area:
								{
									fillColor: {
				                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
				                        stops: [
				                            [0, '#007231'],
				                            [1, '#01C272']
				                        ]
				                    },
									lineWidth: 1.5,
									marker:
									{
										enabled: true,
										fillColor: '#FFFFFF',
										lineWidth: 0,
										radius: 2,
										lineColor: '#FFFFFF',
										states: {
				                        hover: {
												enabled: false,
					                            lineColor: '#FFFFFF'
					                        }
					                    }
									},
									shadow: false,
									threshold: null,
								},
								series: {
									lineColor: '#ffffff',
		        					lineWidth: 0,
								}
							},
							series:
							[{
								type: 'area',
								name: 'SG',
								pointInterval: 188000,
								data: sgData
							}]
						});

						$("#latestSGTitle").html('Current Gravity');
						$("#latestSG").html(data.sg[data.dates.length-1].toFixed(3));
						$("#gravity").show();

						$("#latestSGTitleMobile").html('Current Gravity');
						$("#latestSGMobile").html(data.sg[data.dates.length-1].toFixed(3));
						$("#gravityMobile").show();
					}
				}
			}
		});
	});
}

function updateGraphs(id1)
{
	console.log("I got it...");
	postGraphs(id1,20);
	// setIDs(id1, id2, id3);
}

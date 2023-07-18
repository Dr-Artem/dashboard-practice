function loadChart() {
    const container = document.querySelector(".dataframe");
    const chartDrawer = new ChartDrawer(container);

    chartDrawer.drawHourlyChart();
    chartDrawer.drawDailyChart();
    chartDrawer.drawMonthlyChart();
    chartDrawer.drawSeasonalChart();
}

class ChartDrawer {
    constructor(container, link) {
        this.container = container;
        this.link = link;
        this.dataPromise = null;
    }

    fetchData() {
        if (!this.dataPromise) {
            this.dataPromise = fetch(
                "https://raw.githubusercontent.com/DATA212/WEB-SITE_DATA/main/output.json"
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.json();
                })
                .catch((error) => {
                    this.dataPromise = null; // Скидаємо проміс у випадку помилки
                    throw error;
                });
        }
        return this.dataPromise;
    }

    async drawHourlyChart() {
        const data = await this.fetchData();
        const hourlyData = this.calculateHourlyData(data);

        const chart = [
            {
                type: "scatter",
                x: Object.keys(hourlyData.winter),
                y: Object.values(hourlyData.winter).map((value) =>
                    value.toString()
                ),
                mode: "lines",
                name: "winter",
                line: {
                    color: "#ddd",
                    width: 2,
                },
                hoverlabel: {
                    bgcolor: "#000",
                    bordercolor: "000",
                    font: {
                        color: "#ddd",
                        size: 14,
                    },
                },
                hovertemplate: "%{x}</br></br>%{y:.0f} kWh<extra></extra>",
                xhoverformat: "%d %b",
            },
            {
                type: "scatter",
                x: Object.keys(hourlyData.spring),
                y: Object.values(hourlyData.spring).map((value) =>
                    value.toString()
                ),
                mode: "lines",
                name: "spring",
                line: {
                    color: "#0ce5cc",
                    width: 2,
                },
                hoverlabel: {
                    bgcolor: "#000",
                    bordercolor: "000",
                    font: {
                        color: "#ddd",
                        size: 14,
                    },
                },
                hovertemplate: "%{x}</br></br>%{y:.0f} kWh<extra></extra>",
                xhoverformat: "%d %b",
            },
            {
                type: "scatter",
                x: Object.keys(hourlyData.summer),
                y: Object.values(hourlyData.summer).map((value) =>
                    value.toString()
                ),
                mode: "lines",
                name: "summer",
                line: {
                    color: "#ca3b5a",
                    width: 2,
                },
                hoverlabel: {
                    bgcolor: "#000",
                    bordercolor: "000",
                    font: {
                        color: "#ddd",
                        size: 14,
                    },
                },
                hovertemplate: "%{x}</br></br>%{y:.0f} kWh<extra></extra>",
                xhoverformat: "%d %b",
            },
            {
                type: "scatter",
                x: Object.keys(hourlyData.autumn),
                y: Object.values(hourlyData.autumn).map((value) =>
                    value.toString()
                ),
                mode: "lines",
                name: "autumn",
                line: {
                    color: "#d3b246",
                    width: 2,
                },
                hoverlabel: {
                    bgcolor: "#000",
                    bordercolor: "000",
                    font: {
                        color: "#ddd",
                        size: 14,
                    },
                },
                hovertemplate: "%{x}</br></br>%{y:.0f} kWh<extra></extra>",
                xhoverformat: "%d %b",
            },
        ];

        const layout = {
            colorway: ["#FFC327"],
            margin: {
                b: 60,
                t: 60,
            },
            font: {
                color: "#ddd",
                size: 14,
            },
            title: {
                text: "Average Hourly Production",
                x: 0.05,
                font: {
                    color: "#ddd",
                    size: "18",
                },
            },
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",

            xaxis: {
                fixedrange: true,
                tickwidth: 1,
                titlefont: {
                    color: "white",
                    size: 12,
                    family: "Arial",
                    weight: "bold",
                },
                tickfont: {
                    color: "white",
                    size: 12,
                    family: "Arial",
                    weight: "bold",
                },
                gridcolor: "#3a3a3a",
            },
            yaxis: {
                autorange: true,
                tickwidth: 1,
                fixedrange: true,
                title: {
                    text: "kWh",
                    standoff: 2,
                    font: {
                        size: 12,
                    },
                },
                tickfont: {
                    color: "white",
                    size: 12,
                    family: "Arial",
                },
                gridcolor: "#3a3a3a",
            },
        };

        Plotly.newPlot("hourlyFrame", chart, layout, {
            responsive: true,
            displayModeBar: false,
        });
    }

    async drawDailyChart() {
        const data = await this.fetchData();
        const dailyData = this.calculateDailyData(data);

        const chart = [
            {
                x: Object.keys(dailyData),
                y: Object.values(dailyData).map((value) => value.toString()),
                type: "bar",
                marker: {
                    autocolorscale: true,
                    color: "#d3b246",
                },
                hoverlabel: {
                    bgcolor: "#000",
                    bordercolor: "000",
                    font: {
                        color: "#ddd",
                        size: 14,
                    },
                },
                hovertemplate: "%{x}</br></br>%{y:.0f} kWh<extra></extra>",
                xhoverformat: "%d %b",
            },
        ];

        const layout = {
            colorway: ["#FFC327"],
            margin: {
                b: 60,
                t: 60,
            },
            showlegend: false,
            font: {
                color: "#ddd",
                size: 14,
            },
            title: {
                text: "Daily energy production",
                x: 0.05,
                font: {
                    color: "#ddd",
                    size: "18",
                },
            },
            paper_bgcolor: "#333",
            plot_bgcolor: "transparent",

            xaxis: {
                tickwidth: 1,
                titlefont: {
                    color: "white",
                    size: 12,
                    family: "Arial",
                    weight: "bold",
                },
                tickfont: {
                    color: "white",
                    size: 12,
                    family: "Arial",
                    weight: "bold",
                },
                gridcolor: "#3a3a3a",
            },
            yaxis: {
                autorange: true,
                tickwidth: 1,
                fixedrange: true,
                title: {
                    text: "kWh",
                    standoff: 10,
                    font: {
                        size: 14,
                    },
                },
                tickfont: {
                    color: "white",
                    size: 12,
                    family: "Arial",
                },
                gridcolor: "#3a3a3a",
            },
        };

        Plotly.newPlot("dailyFrame", chart, layout, {
            scrollZoom: true,
            responsive: true,
            displayModeBar: true,
        });
    }

    async drawMonthlyChart() {
        const data = await this.fetchData();
        const monthlyData = this.calculateMonthlyData(data);

        const chart = [
            {
                x: Object.keys(monthlyData),
                y: Object.values(monthlyData).map((value) => value.toString()),
                type: "bar",
                marker: {
                    color: "#d3b246",
                    color: Object.values(monthlyData).map((value) =>
                        value.toString()
                    ),
                    colorscale: [
                        [0, "#F1F1F1"],
                        [1, "#FFC327"],
                    ],
                    showscale: false,
                },
                hoverlabel: {
                    bgcolor: "#000",
                    bordercolor: "000",
                    font: {
                        color: "#ddd",
                        size: 14,
                    },
                },
                hovertemplate: "%{x}</br></br>%{y:.0f} kWh<extra></extra>",
                xhoverformat: "%d %b",
            },
        ];

        const layout = {
            colorway: ["#FFC327"],
            margin: {
                b: 60,
                t: 60,
            },
            showlegend: false,
            font: {
                color: "#ddd",
                size: 14,
            },
            title: {
                text: "Monthly energy production",
                x: 0.05,
                font: {
                    color: "#ddd",
                    size: "18",
                },
            },
            paper_bgcolor: "#333",
            plot_bgcolor: "transparent",

            xaxis: {
                fixedrange: true,
                tickwidth: 1,
                titlefont: {
                    color: "white",
                    size: 12,
                    family: "Arial",
                    weight: "bold",
                },
                tickfont: {
                    color: "white",
                    size: 12,
                    family: "Arial",
                    weight: "bold",
                },
                gridcolor: "#3a3a3a",
            },
            yaxis: {
                autorange: true,
                tickwidth: 1,
                fixedrange: true,
                title: {
                    text: "kWh",
                    standoff: 10,
                    font: {
                        size: 14,
                    },
                },
                tickfont: {
                    color: "white",
                    size: 12,
                    family: "Arial",
                },
                gridcolor: "#3a3a3a",
            },
        };

        Plotly.newPlot("monthlyFrame", chart, layout, {
            responsive: true,
            displayModeBar: false,
        });
    }

    async drawSeasonalChart() {
        const data = await this.fetchData();
        const seasonalData = this.calculateSeasonalData(data);

        const chart = [
            {
                x: Object.keys(seasonalData),
                y: Object.values(seasonalData).map((value) => value.toString()),
                type: "bar",
                marker: {
                    color: "#d3b246",
                    color: Object.values(seasonalData).map((value) =>
                        value.toString()
                    ),
                    colorscale: [
                        [0, "#F1F1F1"],
                        [1, "#FFC327"],
                    ],
                    showscale: false,
                },
                hoverlabel: {
                    bgcolor: "#000",
                    bordercolor: "000",
                    font: {
                        color: "#ddd",
                        size: 14,
                    },
                },
                hovertemplate: "%{x}</br></br>%{y:.0f} kWh<extra></extra>",
                xhoverformat: "%d %b",
            },
        ];

        const layout = {
            colorway: ["#FFC327"],
            margin: {
                b: 60,
                t: 60,
            },
            showlegend: false,
            font: {
                color: "#ddd",
                size: 14,
            },
            title: {
                text: "Seasonal energy production",
                x: 0.05,
                font: {
                    color: "#ddd",
                    size: "18",
                    weight: "700",
                },
            },
            paper_bgcolor: "#333",
            plot_bgcolor: "transparent",

            xaxis: {
                fixedrange: true,
                tickwidth: 1,
                titlefont: {
                    color: "white",
                    size: 12,
                    family: "Arial",
                    weight: "bold",
                },
                tickfont: {
                    color: "white",
                    size: 12,
                    family: "Arial",
                    weight: "bold",
                },
                gridcolor: "#3a3a3a",
            },
            yaxis: {
                autorange: true,
                tickwidth: 1,
                fixedrange: true,
                title: {
                    text: "kWh",
                    standoff: 10,
                    font: {
                        size: 14,
                    },
                },
                tickfont: {
                    color: "white",
                    size: 12,
                    family: "Arial",
                },
                gridcolor: "#3a3a3a",
            },
        };

        Plotly.newPlot("seasonalFrame", chart, layout, {
            responsive: true,
            displayModeBar: false,
        });
    }

    calculateHourlyData(data) {
        const hourlyData = {};

        data.forEach((value) => {
            const datetime = new Date(value.datetime);
            const season = value.season;
            const hour = datetime.getHours().toString() + ":00";

            if (!hourlyData[season]) {
                hourlyData[season] = {};
            }
            if (!hourlyData[season][hour]) {
                hourlyData[season][hour] = [];
            }

            hourlyData[season][hour].push(parseFloat(value.generation_value));
        });

        Object.keys(hourlyData).forEach((season) => {
            Object.keys(hourlyData[season]).forEach((hour) => {
                const values = hourlyData[season][hour];
                const averageValue =
                    values.reduce((sum, value) => sum + value, 0) /
                    values.length;
                hourlyData[season][hour] = averageValue;
            });
        });

        return hourlyData;
    }

    calculateDailyData(data) {
        const dailyData = {};

        data.forEach((value) => {
            const date = value.date;
            const generation_value = parseFloat(value.generation_value);
            if (dailyData[date]) {
                dailyData[date] += generation_value;
            } else {
                dailyData[date] = generation_value;
            }
        });

        return dailyData;
    }

    calculateMonthlyData(data) {
        const monthlyData = {};

        data.forEach((value) => {
            const date = new Date(value.date);
            const year = date.getFullYear();
            const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            const month = monthNames[date.getMonth()];
            console.log(date.toDateString());

            const key = month + " " + year;
            const generation_value = parseFloat(value.generation_value);

            if (monthlyData[key]) {
                monthlyData[key] += generation_value;
            } else {
                monthlyData[key] = generation_value;
            }
        });

        return monthlyData;
    }

    calculateSeasonalData(data) {
        const seasonalData = {};

        data.forEach((value) => {
            const season = value.season;
            const generation_value = parseFloat(value.generation_value);
            const date = new Date(value.date);
            const year = date.getFullYear();

            const key = season + " " + year;
            if (seasonalData[key]) {
                seasonalData[key] += generation_value;
            } else {
                seasonalData[key] = generation_value;
            }
        });

        return seasonalData;
    }
}

loadChart();

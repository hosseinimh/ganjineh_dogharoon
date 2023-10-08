import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

import { BlankPage } from "../../components";
import { PageUtils } from "./PageUtils";
import { dashboardPage as strings } from "../../../constants/strings/fa";

const Dashboard = () => {
    const pageState = useSelector((state) => state.pageReducer);
    const pageUtils = new PageUtils();
    const [shares, setShares] = useState([0, 100]);
    const [sharesChartOptions, setSharesChartOptions] = useState(null);
    const [sharesSeries, setSharesSeries] = useState(null);

    useEffect(() => {
        setShares([pageState?.props?.totalShares ?? 0, 100]);
    }, [pageState]);

    useEffect(() => {
        setSharesChart();
    }, [shares]);

    const setSharesChart = () => {
        setSharesChartOptions({
            plotOptions: {
                pie: {
                    startAngle: 0,
                    donut: {
                        size: "70%",
                        labels: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        offset: 300,
                        minAngleToShowLabel: 30,
                    },
                },
            },
            dataLabels: {
                enabled: false,
            },
            labels: [strings.shared, strings.shares],
            fill: {
                width: 20,
                type: "solid",
                lineCap: "round",
                colors: [
                    getComputedStyle(document.documentElement).getPropertyValue(
                        "--success"
                    ),
                    getComputedStyle(document.documentElement).getPropertyValue(
                        "--light-body"
                    ),
                ],
            },
            stroke: {
                show: false,
            },
            grid: {
                padding: {
                    left: -20,
                    right: -20,
                },
            },
            legend: {
                show: false,
            },
            tooltip: {
                enabled: true,
            },
        });
        setSharesSeries(shares);
    };

    const renderSharesChart = () => {
        if (sharesChartOptions && sharesSeries) {
            return (
                <div className="chart">
                    <Chart
                        type="donut"
                        options={sharesChartOptions}
                        series={sharesSeries}
                        width={150}
                        height={150}
                    />
                </div>
            );
        }
        return <></>;
    };

    const renderSharesInfo = () => {
        return (
            <>
                <div className="block pd-20 basis400 d-flex align-center">
                    <div className="main-wallet d-flex-wrap align-center just-around grow-1">
                        <div className="info">
                            <div className="hd">
                                <h5>{strings.shares}</h5>
                                <span>
                                    {pageState?.props?.totalShares ?? 0}{" "}
                                    {strings.shared}
                                </span>
                            </div>
                        </div>
                        {renderSharesChart()}
                    </div>
                </div>
            </>
        );
    };

    return (
        <BlankPage pageUtils={pageUtils}>
            <div className="section d-flex-wrap fix-mr15">
                {renderSharesInfo()}
            </div>
        </BlankPage>
    );
};

export default Dashboard;

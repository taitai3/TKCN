import { useState, useEffect } from "react";
import iconSquare from "/imgs/Squares four 1.png";
import iconImport from "/imgs/Download.png";
import iconExport from "/imgs/Move up.png";


const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const dashboard = () => {
    const [overviewData, setOverviewData] = useState([]);
    const [reportData, setReportData] = useState([]);


    // Lấy dữ liệu tổng quan
    useEffect(() => {
        const loadOverviewData = async () => {
            const data = await fetchData("http://localhost:3000/overview");
            console.log('Fetched Data:', data);
            setOverviewData(data);
        };
        loadOverviewData();
    }, []);

    // Lấy dữ liệu báo cáo
    useEffect(() => {
        const loadReportData = async () => {
            const data = await fetchData("http://localhost:3000/table");
            console.log('Fetched Data:', data);
            setReportData(data);
        };
        loadReportData();
    }, []);



    return (
        <>
            <div className="p-6">
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <img src={iconSquare} alt="Icon Tổng Quan" className="w-5 h-5 mr-2" />
                        <span className="text-lg font-semibold text-gray-800">Overview</span>
                    </div>
                    <ul className="grid grid-cols-4 gap-4">
                        {overviewData.map((overview, index) => (
                            <li
                                key={overview.id}
                                className={`bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500 flex justify-between items-center`}
                            >
                                <div>
                                    <h4 className="text-sm text-gray-500">{overview.title}</h4>
                                    <h1 className="text-xl font-bold text-gray-800">${overview.value}</h1>
                                    <div className="text-sm text-green-500 mt-1">{overview.changePercent} period of change</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
        </>

    );



};
export default dashboard;

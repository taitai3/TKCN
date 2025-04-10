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
};

export default dashboard;

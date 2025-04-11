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
               
               
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-lg font-semibold text-gray-800">
                            <img src={iconSquare} alt="Icon Báo Cáo" className="w-5 h-5 mr-2" />
                            Detail report
                        </div>
                        <div className="space-x-2">
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-rose-300 bg-rose-50 text-rose-500 hover:bg-rose-100 transition"
                                onClick={() => {
                                    setCurrentItem({ name: "", company: "", orderValue: "", orderDate: "", status: "", img: "" });
                                    setIsCreatingNew(true);
                                    setModalOpen(true);
                                }}
                            >
                                <img src={iconImport} alt="Nhập" className="w-4 h-4" />
                                Nhập
                            </button>
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-rose-300 bg-rose-50 text-rose-500 hover:bg-rose-100 transition">
                                <img src={iconExport} alt="Xuất" className="w-4 h-4" />
                                Xuất
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                        <table className="min-w-full table-auto text-sm text-gray-800">
                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="p-3"><input type="checkbox" /></th>
                                    <th className="p-3">Customer Name</th>
                                    <th className="p-3">Company</th>
                                    <th className="p-3">Order value</th>
                                    <th className="p-3">Order Date</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((item) => (
                                    <tr key={item.id} className="border-t">
                                        <td className="p-3"><input type="checkbox" /></td>
                                        <td className="p-3 flex items-center gap-2">
                                            {item.img && <img src={item.img} alt="Avatar" className="w-8 h-8 rounded-full" />}
                                            {item.name}
                                        </td>
                                        <td className="p-3">{item.company}</td>
                                        <td className="p-3">{item.orderValue}</td>
                                        <td className="p-3">{item.orderDate}</td>
                                        <td className={`p-3 ${item.status === "Hoàn Thành" ? "text-green-600" : item.status === "Hủy" ? "text-red-600" : "text-yellow-500"}`}>
                                            {item.status}
                                        </td>
                                        <td className="p-3">
                                            <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700">
                                                <i className="fa fa-pen"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    );



};
export default dashboard;

import { useState, useEffect } from "react";
import iconSquare from "/imgs/Squares four 1.png";
import iconImport from "/imgs/Download.png";
import iconExport from "/imgs/Move up.png";
import { PencilIcon } from '@heroicons/react/24/solid';

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
    const [modalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);

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

    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsCreatingNew(false);
        setModalOpen(true);
    };
    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file" && files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentItem((prev) => ({ ...prev, img: reader.result }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setCurrentItem((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Lưu dữ liệu (tạo mới hoặc cập nhật)
    const handleSave = async () => {
        const method = isCreatingNew ? "POST" : "PUT";
        const url = isCreatingNew ? "http://localhost:3000/table" : `http://localhost:3000/table/${currentItem.id}`;

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentItem),
            });
            const savedItem = await response.json();
            setReportData((prev) =>
                isCreatingNew ? [...prev, savedItem] : prev.map((item) => (item.id === savedItem.id ? savedItem : item))
            );
            setModalOpen(false);
        } catch (error) {
            console.error("Save failed:", error);
        }
    };

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
                                            <PencilIcon className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {modalOpen && currentItem && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg w-[400px] space-y-4 shadow-xl">
                <h2 className="text-lg font-semibold">{isCreatingNew ? "Thêm Mới" : "Chỉnh Sửa"}</h2>
                <div className="space-y-2">
                  <label className="block">
                    Customer name
                    <input type="text" name="name" value={currentItem.name} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" />
                  </label>
                  <label className="block">
                    Company
                    <input type="text" name="company" value={currentItem.company} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" />
                  </label>
                  <label className="block">
                    Order Value
                    <input type="text" name="orderValue" value={currentItem.orderValue} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" />
                  </label>
                  <label className="block">
                    Order date
                    <input type="date" name="orderDate" value={currentItem.orderDate} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" />
                  </label>
                  <label className="block">
                    Status
                    <select name="status" value={currentItem.status} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded">
                      <option value="Hoàn Thành">Hoàn Thành</option>
                      <option value="Chờ Xử Lý">Chờ Xử Lý</option>
                      <option value="Hủy">Hủy</option>
                    </select>
                  </label>
                  <label className="block">
                    Avatar:
                    <input type="file" accept="image/*" onChange={handleInputChange} className="w-full mt-1 p-2" />
                  </label>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Lưu
                  </button>
                  <button onClick={() => setModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
            </div>
        </>

    );



};
export default dashboard;

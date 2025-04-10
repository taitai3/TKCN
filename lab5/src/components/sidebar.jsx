import square from "/imgs/Squares four 1.png";
import Projects from "/imgs/Folder.png";
import Integrations from "/imgs/Code.png";
import Teams from "/imgs/Groups.png";
import Analytics from "/imgs/Pie chart.png";
import Messages from "/imgs/Chat.png";
import logo from "/imgs/Image 1858.png";
import group from "/imgs/Group.png";

export default function Sidebar() {
    return (
        <div className="bg-white w-72 p-5 h-screen shadow-lg">

            <div className="flex items-center mb-10">
                <img src={logo} alt="Logo" className="w-30 h-12" />
            </div>

            <ul className="space-y-6">
                <li className="flex items-center text-sm text-gray-700 hover:bg-gray-100 py-3 px-4 rounded-lg cursor-pointer">
                    <img src={square} alt="Dashboard" className="w-5 h-5" />
                    <span className="ml-4">Dashboard</span>
                </li>
                <li className="flex items-center text-sm text-gray-700 hover:bg-gray-100 py-3 px-4 rounded-lg cursor-pointer">
                    <img src={Projects} alt="Projects" className="w-5 h-5" />
                    <span className="ml-4">Projects</span>
                </li>
                <li className="flex items-center text-sm text-gray-700 hover:bg-gray-100 py-3 px-4 rounded-lg cursor-pointer">
                    <img src={Teams} alt="Teams" className="w-5 h-5" />
                    <span className="ml-4">Teams</span>
                </li>
                <li className="flex items-center text-sm text-gray-700 hover:bg-gray-100 py-3 px-4 rounded-lg cursor-pointer">
                    <img src={Analytics} alt="Analytics" className="w-5 h-5" />
                    <span className="ml-4">Analytics</span>
                </li>
                <li className="flex items-center text-sm text-gray-700 hover:bg-gray-100 py-3 px-4 rounded-lg cursor-pointer">
                    <img src={Messages} alt="Messages" className="w-5 h-5" />
                    <span className="ml-4">Messages</span>
                </li>
                <li className="flex items-center text-sm text-gray-700 hover:bg-gray-100 py-3 px-4 rounded-lg cursor-pointer">
                    <img src={Integrations} alt="Integrations" className="w-5 h-5" />
                    <span className="ml-4">Integrations</span>
                </li>
            </ul>
            <div className="mt-auto bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                    <img className="w-100 h-50" src={group} alt="Group" />

                </div>
                <button className="bg-blue-500 text-white-50 py-2 px-4 m-5 rounded-lg hover:bg-blue-600">Try now</button>
            </div>
        </div>
    );
}

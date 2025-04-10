import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import Dashboard from "./dashboard"
export default function GridLayout() {
    return (
        <div className="flex h-screen">

            <Sidebar />

            <div className="flex flex-col flex-1">
                <Header />

                <main className="flex-1 bg-gray-50 p-4 overflow-auto">
                    <Dashboard/>
                </main>

                <Footer />
            </div>
        </div>
    );
}

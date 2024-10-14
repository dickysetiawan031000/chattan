import App from "@/Layouts/App";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}
Dashboard.layout = (page) => <App children={page} title="Dashboard" />

import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <header>HELLO Header</header>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <footer>HELLO Footer</footer>
    </div>
  );
}

export default MainLayout;

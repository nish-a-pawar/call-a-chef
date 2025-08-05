const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <h1 className="ml-15 font-bold text-xl">Call-A-Chef</h1>
      </div>

      <div className="flex-none gap-2 text-lg">
        <ul className="menu menu-horizontal px-4 gap-6 font-bold mr-30">
          <li>Home</li>
          <li>Chefs</li>
          <li>Orders</li>
        </ul>

        <button className="btn btn-secondary mr-20 font-bold"
        onClick={()=>document.getElementById('my_modal_1').showModal()}>Login</button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Login</h3>
            <p className="py-4 ">
             Login to get a cook for you!
            </p>
            <div className="modal-action">
              <form method="dialog">
                <input type="text"  placeholder="Enter your username" className="w-full p-2 outline-none mb-2 border border-gray-300"/>
                <input type="password" placeholder="Enter Your Password" className="w-full p-2 outline-none mb-2 border border-gray-300"/>

                <button className="btn btn-secondary px-4 py-2 rounded-lg w-full">Login</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};
export default Header;

import './DashBoard.css'


const Dashboard = (props) => {

  
    



  return (
    <section className="hero">
      <nav>
        <h2>Distributor Dashboard</h2>
        <button onClick={props.handleLogout}>Logout</button>
      </nav>
      <div class="night-sky"><div class="shooting-stars"></div></div>
    </section>
  );

 

};



export default Dashboard;

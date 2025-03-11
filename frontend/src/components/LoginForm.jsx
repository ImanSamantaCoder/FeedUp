function LoginForm() {
  return (
    <div className="card p-4 shadow rounded">
      <form className="row g-3">
        <div className="col-md-12">
          
          <input type="email" className="form-control" id="inputEmail4" placeholder="email"/>
        </div>
        <div className="col-md-12">
          
          <input type="password" className="form-control" id="inputPassword4" placeholder="password"/>
        </div>
        <div className="text-center">
        <button className="btn btn-success  fw-bold">
          Create new account
        </button>
      </div>
      <hr />
      <div className="text-center">
        <button className="btn btn-success  fw-bold">
          log in
        </button>
      </div>
      

      </form>
    </div>
  );
}
export default LoginForm;

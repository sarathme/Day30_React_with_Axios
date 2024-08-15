function UserForm({ onCloseModal }) {
  function handleCloseModal(e) {
    onCloseModal();
  }
  return (
    <form className="user-form">
      <div className="tab">
        <h3 className="secondary-heading">Create User</h3>
        <div className="cta">
          <button>
            <span
              className="material-symbols-outlined"
              onClick={handleCloseModal}>
              close
            </span>
          </button>
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="fname">First Name</label>
        <input type="text" id="fname" />
        <label htmlFor="lname">Last Name</label>
        <input type="text" id="lname" />
      </div>
      <div className="input-group">
        <label>Email</label>
        <input type="text" />
        <label>Phone</label>
        <input type="text" />
        <label>Website</label>
        <input type="text" />
        <label>Role</label>
        <input type="text" />
        <label>Company</label>
        <input type="text" />
      </div>
      <div className="cta-form">
        <button onClick={handleCloseModal}>Cancel</button>
        <button>Add User</button>
      </div>
    </form>
  );
}

export default UserForm;

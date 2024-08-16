function UserCard({ user, onDelete, onModalOpen, setEditUser }) {
  const companyName = user.company.name.replace("-", " ").toUpperCase();
  const role = user.company.bs.replace("-", " ").toUpperCase();

  function handleEditUser() {
    const editUser = {
      id: user.id,
      firstName: user.name.split(" ")[0],
      lastName: user.name.split(" ")[1],
      email: user.email,
      phone: user.phone,
      company: companyName,
      role,
      website: user.website,
    };

    setEditUser(editUser);
    onModalOpen();
  }

  return (
    <div className="user-card">
      <div className="user-details">
        <h3 className="tertiary-heading">{user.name.toUpperCase()}</h3>
        <p>
          <span className="material-symbols-outlined">work</span>
          {role}
        </p>
        <p>
          <span className="material-symbols-outlined">apartment</span>
          {companyName}
        </p>
      </div>
      <div className="user-contact">
        <p>
          <span className="material-symbols-outlined">mail</span>
          {user.email}
        </p>
        <p>
          <span className="material-symbols-outlined">smartphone</span>
          {user.phone}
        </p>
        <p>
          <span className="material-symbols-outlined">language</span>
          {user.website.length > 0 ? user.website : "-"}
        </p>
      </div>
      <div className="cta">
        <button>
          <span className="material-symbols-outlined" onClick={handleEditUser}>
            edit
          </span>
        </button>
        <button onClick={() => onDelete(user.id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
}

export default UserCard;

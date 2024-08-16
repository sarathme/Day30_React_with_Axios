import { useFormik } from "formik";

const validate = (values) => {
  let errors = {};
  console.log(!values.firstName);
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please provide a valid email address";
  }
  if (!values.phone) {
    errors.phone = "Required";
  } else if (
    !/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      values.phone
    )
  ) {
    errors.phone = "Please provide a valid phone number";
  }
  if (!values.role) {
    errors.role = "Required";
  }
  if (!values.company) {
    errors.company = "Required";
  }
  return errors;
};

function UserForm({
  onCloseModal,
  status,
  setStatus,
  onAddUser,
  edit,
  onEditUser,
}) {
  const isEdit = edit !== null;
  const initialValues =
    edit === null
      ? {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          role: "",
          website: "",
        }
      : edit;

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      const { firstName, lastName, email, company, website, role, phone } =
        values;
      const newUser = {
        name: firstName + " " + lastName,
        email,
        phone,
        website: website || "",
        company: {
          name: company,
          bs: role,
        },
      };
      if (isEdit) {
        onEditUser(edit.id, JSON.stringify({ ...newUser, id: edit.id }));
        setStatus("updatingUser");
        return;
      }
      onAddUser(JSON.stringify(newUser));
      setStatus("addingUser");
    },
  });

  console.log(formik.touched);
  function handleCloseModal(e) {
    e.preventDefault();
    onCloseModal();
  }
  return (
    <form className="user-form" onSubmit={formik.handleSubmit} noValidate>
      <div className="tab">
        <h3 className="secondary-heading text-center">
          {isEdit ? "Edit " : "Create New "}User
        </h3>
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
        <label htmlFor="fname">
          First Name
          {formik.touched.firstName && formik.errors.firstName ? (
            <span>{formik.errors.firstName}</span>
          ) : null}
        </label>

        <input
          type="text"
          id="fname"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="lname">
          Last Name
          {formik.touched.lastName && formik.errors.lastName ? (
            <span>{formik.errors.lastName}</span>
          ) : null}
        </label>
        <input
          type="text"
          id="lname"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">
          Email
          {formik.touched.email && formik.errors.email ? (
            <span>{formik.errors.email}</span>
          ) : null}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="phone">
          Phone
          {formik.touched.phone && formik.errors.phone ? (
            <span>{formik.errors.phone}</span>
          ) : null}
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="website">Website</label>
        <input
          type="text"
          name="website"
          id="website"
          value={formik.values.website}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="role">
          Role
          {formik.touched.role && formik.errors.role ? (
            <span>{formik.errors.role}</span>
          ) : null}
        </label>
        <input
          type="text"
          name="role"
          id="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="company">
          Company
          {formik.touched.company && formik.errors.company ? (
            <span>{formik.errors.company}</span>
          ) : null}
        </label>
        <input
          type="text"
          name="company"
          id="company"
          value={formik.values.company}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="cta-form">
        <button
          onClick={handleCloseModal}
          disabled={status === "addingUser" || status === "updatingUser"}>
          Cancel
        </button>
        {isEdit ? (
          <button type="submit" disabled={status === "updatingUser"}>
            {status === "updatingUser" ? "Updating User" : "Update User"}
          </button>
        ) : (
          <button type="submit" disabled={status === "addingUser"}>
            {status === "addingUser" ? "Adding User" : "Add User"}
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;

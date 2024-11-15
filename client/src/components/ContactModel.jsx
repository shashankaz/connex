import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

const ContactModel = ({ onClose, contacts, title, contact }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        jobTitle: contact.jobTitle,
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.phone || formData.phone.length !== 10)
      newErrors.phone = "Phone number must be 10 digits.";
    if (!formData.company) newErrors.company = "Company is required.";
    if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    if (title === "New") {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/contacts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              company: formData.company,
              jobTitle: formData.jobTitle,
            }),
          }
        );
        const data = await response.json();
        alert(data.message);
        setIsSubmitting(false);
        contacts((prevContacts) => [...prevContacts, data.contact]);
        onClose();
      } catch (error) {
        console.error(error.message);
        setIsSubmitting(false);
      }
    }

    if (title === "Edit") {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/contacts/${contact._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              company: formData.company,
              jobTitle: formData.jobTitle,
            }),
          }
        );
        const data = await response.json();
        alert(data.message);
        setIsSubmitting(false);
        contacts((prevContacts) =>
          prevContacts.map((c) => (c._id === contact._id ? formData : c))
        );
        onClose();
      } catch (error) {
        console.error(error.message);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title} Contact</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.company)}
            helperText={errors.company}
          />
          <TextField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.jobTitle)}
            helperText={errors.jobTitle}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={isSubmitting}
          startIcon={isSubmitting && <CircularProgress size={20} />}
        >
          {isSubmitting
            ? title === "New"
              ? "Creating..."
              : "Updating..."
            : title === "New"
            ? "Create Contact"
            : "Edit Contact"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactModel;

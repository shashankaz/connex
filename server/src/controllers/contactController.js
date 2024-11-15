import Contact from "../models/Contact.js";
import { errorHandler, validateRequiredFields } from "../utils/helper.js";

export const getAllContacts = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 20;

  if (isNaN(page) || page <= 0) {
    return res.status(400).json({
      message: "Page number must be a positive integer",
    });
  }

  try {
    const contacts = await Contact.find().sort({ _id: -1 });
    // .skip((page - 1) * limit)
    // .limit(limit);

    const totalContacts = await Contact.countDocuments();

    res.status(200).json({
      message: "All Contacts",
      contacts,
      totalPages: Math.ceil(totalContacts / limit),
      currentPage: page,
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const createContact = async (req, res) => {
  const { firstName, lastName, email, phone, company, jobTitle } = req.body;

  if (
    !validateRequiredFields([
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
    ])
  ) {
    return res.status(400).json({
      message:
        "All fields (firstName, lastName, email, phone, company, jobTitle) are required",
    });
  }

  try {
    const existingContact = await Contact.find({ email: email });
    if (existingContact.length > 0) {
      return res.status(400).json({
        message: "Contact with this email already exists",
      });
    }

    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
    });

    res.status(201).json({
      message: "Contact Created Successfully",
      contact,
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const getContact = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Contact ID is required",
    });
  }

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      message: "Contact Details",
      contact,
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, company, jobTitle } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Contact ID is required",
    });
  }

  if (
    !validateRequiredFields([
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
    ])
  ) {
    return res.status(400).json({
      message:
        "All fields (firstName,lastName, email, phone, company, jobTitle) are required",
    });
  }

  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        phone,
        company,
        jobTitle,
      },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      message: "Contact Updated Successfully",
      contact,
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Contact ID is required",
    });
  }

  try {
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      message: "Contact Deleted Successfully",
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

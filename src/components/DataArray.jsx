export const FormFields = [
  {
    name: "Department",
    label: "1. Department Name",
    type: "radio",
    options: [
      "Computer Science",
      "Electrical",
      "Electronics and Communication",
      "Mechanical",
      "Civil",
      "Architecture",
    ],
    required: true,
  },
  {
    name: "UGCurriculum",
    label: "2. UG Curriculum",
    type: "file",
    required: true,
  },
  {
    name: "PGCurriculum",
    label: "3. PG Curriculum",
    type: "file",
    required: true,
  },
  {
    name: "FacultyDetails",
    label: "4. Faculty Details",
    type: "subform",
    fields: [
      {
        name: "Number",
        label: "No",
        type: "number",
        required: true,
      },
      {
        name: "Name",
        label: "Name",
        type: "text",
        required: true,
      },
      {
        name: "Designation",
        label: "Designation",
        type: "select",
        options: ["Professor", "Associate Professor", "Assistant Professor"],
        required: true,
      },
      {
        name: "Specialization",
        label: "Specialization",
        type: "text",
        required: true,
      },
    ],
  },
  {
    name: "Laboratories",
    label: "5. Laboratories",
    type: "subform",
    fields: [
      {
        name: "Number",
        label: "No",
        type: "number",
        required: true,
      },
      {
        name: "NameofLab",
        label: "Name of Laboratory",
        type: "text",
        required: true,
      },
      {
        name: "Facilities",
        label: "Facilities in the Laboratory",
        type: "text",
        required: true,
      },
    ],
  },
  {
    name: "SponsoredProjects",
    label: "6. List of Sponsored Research Projects",
    type: "subform",
    fields: [
      {
        name: "PIName",
        label: "Principal Investigator",
        type: "text",
        required: true,
      },
      {
        name: "Co-InvestigatorName",
        label: "Co-Investigator (if any)",
        type: "text",
        required: false,
      },
      {
        name: "ProjectTitle",
        label: "Project Title",
        type: "text",
        required: true,
      },
      {
        name: "StartYear",
        label: "Year of Start",
        type: "date",
        required: true,
        validation: (value, formData, callback) => {
          if (
            formData.EndYear &&
            new Date(value) > new Date(formData.EndYear)
          ) {
            callback({
              type: "danger",
              msg: "StartYear should be earlier than EndYear",
            });
            return false;
          }
          return true;
        },
      },
      {
        name: "SponserAgency",
        label: "Sponsering Agency",
        type: "text",
        required: true,
      },
      {
        name: "Amount",
        label: "Amount Sanctioned",
        type: "number",
        required: true,
      },
    ],
  },
  {
    name: "ConsultancyProjects",
    label: "7. List of Consultancy Projects",
    type: "subform",
    fields: [
      {
        name: "PIName",
        label: "Principal Investigator",
        type: "text",
        required: true,
      },
      {
        name: "Co-InvestigatorName",
        label: "Co-Investigator (if any)",
        type: "text",
        required: false,
      },
      {
        name: "ProjectTitle",
        label: "Project Title",
        type: "text",
        required: true,
      },
      {
        name: "StartYear",
        label: "Year of Start",
        type: "date",
        required: true,
        validation: (value, formData, callback) => {
          if (
            formData.EndYear &&
            new Date(value) > new Date(formData.EndYear)
          ) {
            callback({
              type: "danger",
              msg: "StartYear should be earlier than EndYear",
            });
            return false;
          }
          return true;
        },
      },
      {
        name: "SponserAgency",
        label: "Sponsering Agency",
        type: "text",
        required: true,
      },
      {
        name: "Amount",
        label: "Amount Sanctioned",
        type: "number",
        required: true,
      },
    ],
  },
  {
    name: "ListofMoUs",
    label: "8. List of MoUs",
    type: "subform",
    fields: [
      {
        name: "Number",
        label: "No",
        type: "number",
        required: true,
      },
      {
        name: "Organization",
        label: "Organization",
        type: "text",
        required: true,
      },
      {
        name: "TermofMoU",
        label: "Term of MoU",
        type: "text",
        required: true,
      },
      {
        name: "HighlightsofMoU",
        label: "Highlights of MoU (50 words)",
        type: "text",
        required: true,
      },
    ],
  },
  {
    name: "PhDDetails",
    label: "9. PhD Details",
    type: "subform",
    fields: [
      {
        name: "Number",
        label: "No",
        type: "number",
        required: true,
      },
      {
        name: "ResearchName",
        label: "Name of Research Scholar",
        type: "text",
        required: true,
      },
      {
        name: "ResearchTitle",
        label: "PhD Research Title",
        type: "text",
        required: true,
      },
      {
        name: "Domain",
        label: "Domain",
        type: "text",
        required: true,
      },
      {
        name: "ResearchProjectName",
        label: "Name of the Research Project",
        type: "text",
        required: true,
      },
      {
        name: "StartYear",
        label: "Year of Registration",
        type: "date",
        required: true,
        validation: (value, formData, callback) => {
          if (
            formData.EndYear &&
            new Date(value) > new Date(formData.EndYear)
          ) {
            callback({
              type: "danger",
              msg: "Start Year should be earlier than End Year",
            });
            return false;
          }
          return true;
        },
      },
      {
        name: "EndYear",
        label: "Year of Completion",
        type: "date",
        required: true,
        validation: (value, formData, callback) => {
          if (
            formData.StartYear &&
            new Date(value) < new Date(formData.StartYear)
          ) {
            callback({
              type: "danger",
              msg: "The End Year should be later than Start Year",
            });
            return false;
          }
          return true;
        },
      },
    ],
  },
  {
    name: "ContactDetails",
    label: "10. Contact Details",
    type: "subform",
    fields: [
      {
        name: "Address",
        label: "Address",
        type: "text",
        required: true,
      },
      {
        name: "PhoneNo",
        label: "Phone no",
        type: "number",
        required: true,
      },
      {
        name: "EmailIDofDeptOffice",
        label: "Email ID of Dept Office",
        type: "number",
        required: true,
      },
    ],
  },
];

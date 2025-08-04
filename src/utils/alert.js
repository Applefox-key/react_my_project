import Swal from "sweetalert2";

export const sAlert = (config) => {
  return Swal.fire({
    ...config,
    customClass: {
      popup: "my-popup",
      title: "my-title",
      confirmButton: "my-confirm-btn",
      cancelButton: "my-cancel-btn",
      icon: "my-icon",
    },
  });
};

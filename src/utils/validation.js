import Swal from "sweetalert2";
import { statusIcons } from "../constants/statusConst";

export const isEmailValid = (value) => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return EMAIL_REGEXP.test(value);
};

/**
 * Validates whether the selected expressions can be changed to the target status.
 * Shows a modal with explanation if not all can be changed.
 * Offers to apply the change to valid items only.
 *
 * @param {string} targetStatus - The desired status to apply.
 * @param {Array<string|number>} selectedIds - Array of selected expression IDs.
 * @param {Array<object>} expressions - Full list of expressions (possibly grouped).
 * @param {function} onApply - Callback to execute if user confirms applying to valid items.
 */
export const validateAndApplyStatusChange = async (
  targetStatus,
  selectedIds,
  expressions,
  onApply
) => {
  // Flatten expressions if grouped by labels
  const flatList = expressions.flatMap((el) => (el.items ? el.items : [el]));

  // Filter selected expressions from the full list
  const selectedItems = flatList.filter((item) =>
    selectedIds.includes(item.id)
  );

  // Split into valid and invalid by targetStatus
  const validItems = [];
  const invalidItems = [];

  selectedItems.forEach((item) => {
    const allowed = statusIcons[item.status]?.possible || [];
    if (allowed.includes(targetStatus)) {
      validItems.push(item.id);
    } else {
      invalidItems.push({
        id: item.id,
        from: item.status,
        to: targetStatus,
      });
    }
  });

  // Case: all valid — proceed directly
  if (invalidItems.length === 0) {
    onApply(validItems);
    return;
  }

  // Case: none valid — show error and exit
  if (validItems.length === 0) {
    await Swal.fire({
      icon: "warning",
      title: "Cannot apply status change",
      html: `None of the selected expressions can be changed to <b>${targetStatus}</b>.`,
    });
    return;
  }

  // Case: partially valid — show confirmation dialog
  const result = await Swal.fire({
    icon: "info",
    title: "Some expressions cannot be updated",
    html: `
      <p>${invalidItems.length} of ${selectedItems.length} expressions cannot be changed to <b>${targetStatus}</b>.</p>
      <p>Do you want to apply the change only to the ${validItems.length} valid ones?</p>
    `,
    showCancelButton: true,
    confirmButtonText: "Yes, apply",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    onApply(validItems);
  }
};

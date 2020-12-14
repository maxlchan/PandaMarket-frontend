import Swal from 'sweetalert2';

export const alertError = async (text) => {
  try {
    const result = Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text,
      scrollbarPadding: true,
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const alertSuccess = async ({ title, text }) => {
  try {
    const result = await Swal.fire({
      icon: 'success',
      title: title || 'Success!',
      text,
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const alertWarn = async (text) => {
  try {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text,
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

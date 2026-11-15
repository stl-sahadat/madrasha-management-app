/**
 * SweetAlert2 helper utility matching madrasha.hostzonebd.com
 * Supports native window.Swal when loaded from CDN or SSR-safe fallback
 */

export const showSwal = async (options = {}) => {
  if (typeof window !== 'undefined' && window.Swal) {
    return window.Swal.fire({
      confirmButtonColor: '#106068',
      cancelButtonColor: '#d33',
      ...options
    });
  }

  // Graceful fallback if window.Swal is not yet loaded
  if (typeof window !== 'undefined') {
    if (options.showCancelButton) {
      const msg = (options.title ? `${options.title}\n\n` : '') +
                  (options.text || (options.html ? options.html.replace(/<[^>]+>/g, ' ') : ''));
      const confirmed = window.confirm(msg);
      return { isConfirmed: confirmed, isDismissed: !confirmed };
    } else {
      const msg = (options.title ? `${options.title}\n\n` : '') +
                  (options.text || (options.html ? options.html.replace(/<[^>]+>/g, ' ') : ''));
      window.alert(msg);
      return { isConfirmed: true };
    }
  }

  return { isConfirmed: true };
};

export const showSuccessAlert = (title, text) => {
  return showSwal({
    icon: 'success',
    title: title || 'সফল!',
    text: text || 'কার্যক্রম সফলভাবে সম্পন্ন হয়েছে।',
    confirmButtonText: 'ঠিক আছে'
  });
};

export const showErrorAlert = (title, text, html) => {
  return showSwal({
    icon: 'error',
    title: title || 'ত্রুটি!',
    text,
    html,
    confirmButtonText: 'ঠিক আছে'
  });
};

export const showWarningAlert = (title, text, html) => {
  return showSwal({
    icon: 'warning',
    title: title || 'সতর্কতা!',
    text,
    html,
    confirmButtonText: 'ঠিক আছে'
  });
};

export const showConfirmDialog = (title, html, confirmText = 'হ্যাঁ, পাঠান', cancelText = 'বাতিল') => {
  return showSwal({
    title,
    html,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true
  });
};

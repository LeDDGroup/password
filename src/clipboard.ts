export async function copy(text: string) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  if (fallbackCopyTextToClipboard(text)) return Promise.resolve();
  else return Promise.reject();
}

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let success = false;

  try {
    success = document.execCommand("copy");
  } catch (err) {
    console.error(err);
  }

  document.body.removeChild(textArea);
  return success;
}

declare global {
  interface Navigator {
    clipboard?: {
      writeText(text: string): Promise<void>;
    };
  }
}

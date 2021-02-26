import copy from "copy-text-to-clipboard";

function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      () => {},
      () => copy(text)
    );
  }
}

export { copyToClipboard };

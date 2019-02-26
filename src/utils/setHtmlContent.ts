export const setHtmlContent = ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const element = document.getElementById(id);
  if (element !== null) {
    element.innerHTML = content;
  } else {
    console.error('setHtmlContent(): Element with id %s is null', id);
  }
};

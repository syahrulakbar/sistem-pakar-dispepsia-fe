export default function Form({ ...rest }) {
  const { bodyContent, footer, title } = rest;
  return (
    <>
      <h1 className="font-semibold text-2xl text-center">{title}</h1>
      {bodyContent}
      {footer}
    </>
  );
}

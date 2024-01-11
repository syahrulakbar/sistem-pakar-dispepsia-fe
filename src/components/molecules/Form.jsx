export default function Form({ ...rest }) {
  const { body, footer, heading, handleSubmit } = rest;
  return (
    <form onSubmit={handleSubmit}>
      <div>{heading}</div>
      <div>{body}</div>
      <div></div>
      <div>{footer}</div>
    </form>
  );
}

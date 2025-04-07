/**
 * A functional React component that displays an error message.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.message] - The error message to display. If undefined or empty, the component will not render.
 * @returns {JSX.Element | null} A styled `div` containing the error message, or `null` if no message is provided.
 */
const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="w-full text-xs text-center bordered-nonhover rounded-md bg-redd ">
      {message}
    </div>
  );
};

export default ErrorMessage;

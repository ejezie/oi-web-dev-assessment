export const formatErrorResponse = (error) => {
  const message =
    (error.response && error.response.data && error.response.data.MESSAGE) ??
    error.data?.MESSAGE ??
    error.MESSAGE ??
    error.toString();
  return message;
};
